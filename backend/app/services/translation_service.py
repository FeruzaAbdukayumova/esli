import uuid
from typing import Any

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.card import Card


# Language codes for MyMemory API
SUPPORTED_LANGUAGES = {
    "es": "es",      # Spanish
    "zh": "zh-CN",   # Chinese (Simplified)
    "ru": "ru",      # Russian
    "ar": "ar",      # Arabic
    "ja": "ja",      # Japanese
    "ko": "ko",      # Korean
    "pt": "pt",      # Portuguese
    "fr": "fr",      # French
    "de": "de",      # German
    "hi": "hi",      # Hindi
    "tr": "tr",      # Turkish
    "vi": "vi",      # Vietnamese
    "uz": "uz",      # Uzbek
}

# Display names for the UI
LANGUAGE_NAMES = {
    "es": "Spanish",
    "zh": "Chinese (Simplified)",
    "ru": "Russian",
    "ar": "Arabic",
    "ja": "Japanese",
    "ko": "Korean",
    "pt": "Portuguese",
    "fr": "French",
    "de": "German",
    "hi": "Hindi",
    "tr": "Turkish",
    "vi": "Vietnamese",
    "uz": "Uzbek",
}

MYMEMORY_API_URL = "https://api.mymemory.translated.net/get"


async def get_card_by_id(db: AsyncSession, card_id: uuid.UUID) -> Card | None:
    """Get a card by its ID."""
    result = await db.execute(select(Card).where(Card.id == card_id))
    return result.scalar_one_or_none()


async def translate_text(text: str, target_language_code: str) -> str:
    """Translate text using MyMemory API (free).

    MyMemory offers:
    - 1000 words/day without API key
    - 10,000 words/day with free API key
    - No payment required
    """
    if not text.strip():
        return ""

    # Get the MyMemory language code
    mymemory_lang = SUPPORTED_LANGUAGES.get(target_language_code)
    if not mymemory_lang:
        raise ValueError(f"Unsupported language: {target_language_code}")

    params = {
        "q": text,
        "langpair": f"autodetect|{mymemory_lang}",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(MYMEMORY_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

        # Check for errors in response
        if data.get("responseStatus") != 200:
            error_msg = data.get("responseDetails", "Translation failed")
            print(f"[translation_service] MyMemory error: {error_msg}")
            return text  # Return original text as fallback

        translated_text = data.get("responseData", {}).get("translatedText", "")

        # MyMemory sometimes returns the original text in uppercase if translation fails
        if translated_text.upper() == text.upper():
            # Try to get from matches if available
            matches = data.get("matches", [])
            if matches:
                translated_text = matches[0].get("translation", translated_text)

        # If translation is empty, return original
        if not translated_text.strip():
            print(f"[translation_service] Empty translation for '{text}', using original")
            return text

        return translated_text
    except Exception as e:
        print(f"[translation_service] Error translating '{text}': {e}")
        return text  # Return original text as fallback


async def generate_translation(
    word: str,
    definition: str,
    target_language: str,
) -> str:
    """Generate translation for a card's back text (definition/answer)."""
    return await translate_text(definition, target_language)


async def get_card_translation(
    db: AsyncSession,
    card: Card,
    target_language: str,
) -> str:
    """Get translation for a card, using cache or generating new one."""
    # Return original back_text for English
    if target_language == "en":
        return card.back_text or ""

    # Check cache first
    if card.translations and target_language in card.translations:
        return card.translations[target_language]

    # Validate language is supported
    if target_language not in SUPPORTED_LANGUAGES:
        raise ValueError(f"Unsupported language: {target_language}")

    # Generate translation via free API
    translation = await generate_translation(
        word=card.front_text or "",
        definition=card.back_text or "",
        target_language=target_language,
    )

    # Save to database (cache for future users)
    if card.translations is None:
        card.translations = {}

    # Create new dict to trigger SQLAlchemy change detection for JSONB
    updated_translations = dict(card.translations)
    updated_translations[target_language] = translation
    card.translations = updated_translations

    await db.commit()
    await db.refresh(card)

    return translation


async def get_translated_card(
    db: AsyncSession,
    card_id: uuid.UUID,
    target_language: str,
) -> dict[str, Any] | None:
    """Get a card with its back_text translated to the target language."""
    print(f"[get_translated_card] card_id={card_id}, target_language={target_language}")

    card = await get_card_by_id(db, card_id)
    if not card:
        print(f"[get_translated_card] Card not found: {card_id}")
        return None

    print(f"[get_translated_card] Card found: front='{card.front_text}', back='{card.back_text}'")

    translated_back = await get_card_translation(db, card, target_language)
    print(f"[get_translated_card] translated_back='{translated_back}'")

    result = {
        "id": str(card.id),
        "deck_id": str(card.deck_id),
        "front_text": card.front_text,
        "back_text": card.back_text,
        "translated_back": translated_back,
        "front_image_url": card.front_image_url,
        "back_image_url": card.back_image_url,
        "translations": card.translations,
        "created_at": card.created_at.isoformat() if card.created_at else None,
        "updated_at": card.updated_at.isoformat() if card.updated_at else None,
    }
    print(f"[get_translated_card] Returning: {result}")
    return result


def get_supported_languages() -> dict[str, str]:
    """Return the dictionary of supported language codes and display names."""
    return LANGUAGE_NAMES.copy()
