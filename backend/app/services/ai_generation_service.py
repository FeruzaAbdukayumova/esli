import base64
import json
import logging

import anthropic

from app.core.config import settings

logger = logging.getLogger(__name__)

MAX_EXISTING_FRONTS = 500

FLASHCARD_SYSTEM_PROMPT = """You are an expert flashcard creator optimized for spaced repetition learning. \
You apply evidence-based principles from cognitive science to produce highly effective cards.

Core rules you ALWAYS follow:
1. ATOMICITY: Each card tests exactly ONE discrete piece of knowledge. Never combine multiple facts.
2. CLARITY: Questions have exactly one unambiguous correct answer. No room for interpretation.
3. BREVITY: Answers are 1-3 short sentences max. Ideally a single key phrase or sentence.
4. QUESTION VARIETY: Mix question types for deeper learning:
   - Factual Q&A ("What is...?", "Name the...")
   - Explanation ("Why does...?", "How does...?")
   - Comparison ("How does X differ from Y?")
   - Application ("When would you use...?", "What happens if...?")
5. NO LISTS IN ONE CARD: Never put an enumeration or list as a single answer. Split into separate cards.
6. SELF-CONTAINED: Every card must be understandable on its own without external context.
7. NO YES/NO QUESTIONS: Rephrase to require substantive recall.
8. PRECISE WORDING: Compact, no filler words. Front scannable in under 5 seconds.
9. CONCRETE EXAMPLES: Ground abstract concepts with brief examples in the answer when helpful.
10. COMBAT INTERFERENCE: When covering similar concepts, make distinctions explicit.

You return ONLY valid JSON, no other text."""


def _build_existing_cards_section(existing_fronts: list[str] | None) -> str:
    """Build prompt section listing existing cards to avoid duplicating."""
    if not existing_fronts:
        return ""
    fronts = [f[:200] for f in existing_fronts[:MAX_EXISTING_FRONTS]]
    numbered = "\n".join(f"- {front}" for front in fronts)
    return (
        f"\n\nIMPORTANT: This deck already contains the following {len(fronts)} card(s). "
        f"Do NOT create any cards that duplicate or closely paraphrase these existing cards. "
        f"Generate entirely new and different cards.\n\n"
        f"Existing card fronts:\n{numbered}\n"
    )


CARD_GENERATION_PROMPT = """Generate exactly {count} flashcards about: {topic}

Guidelines:
- Each card tests ONE atomic fact or concept
- Mix question types: factual, "why/how" explanations, comparisons, and application questions
- Front ("front_text"): A clear, specific question (not yes/no)
- Back ("back_text"): A concise answer (1-3 sentences max). Include a brief example when it aids understanding
- For closely related concepts, add comparison cards that highlight key differences
- Break any list or enumeration into separate cards

Return ONLY valid JSON in this exact format:
{{
  "cards": [
    {{"front_text": "...", "back_text": "..."}},
    {{"front_text": "...", "back_text": "..."}}
  ]
}}"""

PDF_CARD_PROMPT = """Analyze this PDF document and generate exactly {count} flashcards based on its content.{extra}

Guidelines:
- Each card tests ONE atomic fact or concept from the document
- Mix question types: factual, "why/how" explanations, comparisons, and application questions
- Front ("front_text"): A clear, specific question (not yes/no). Include a brief topic label if the document covers multiple subjects
- Back ("back_text"): A concise answer (1-3 sentences max). Include a brief example when it aids understanding
- For closely related concepts, add comparison cards that highlight key differences
- Break any list or enumeration into separate cards
- Prioritize the most important and testable information from the document

Also suggest a short deck title and 1-3 category tags based on the document.

Return ONLY valid JSON in this exact format:
{{
  "title": "Short Deck Title",
  "tags": ["tag1", "tag2"],
  "cards": [
    {{"front_text": "...", "back_text": "..."}},
    {{"front_text": "...", "back_text": "..."}}
  ]
}}"""

CARD_EDIT_PROMPT = """You are editing existing flashcards based on a user instruction.

User instruction: {instruction}

Apply the instruction to EVERY card. Preserve the card IDs exactly as given.
Maintain flashcard best practices: keep cards atomic (one fact each), answers concise (1-3 sentences), and questions clear and specific.

Input cards:
{cards_json}

Return ONLY valid JSON in this exact format:
{{
  "cards": [
    {{"id": "...", "front_text": "...", "back_text": "..."}},
    {{"id": "...", "front_text": "...", "back_text": "..."}}
  ]
}}"""

CARD_WITH_DECK_INFO_PROMPT = """Generate exactly {count} flashcards about: {topic}

Guidelines:
- Each card tests ONE atomic fact or concept
- Mix question types: factual, "why/how" explanations, comparisons, and application questions
- Front ("front_text"): A clear, specific question (not yes/no)
- Back ("back_text"): A concise answer (1-3 sentences max). Include a brief example when it aids understanding
- For closely related concepts, add comparison cards that highlight key differences
- Break any list or enumeration into separate cards

Also suggest a short deck title and 1-3 category tags for this set of cards.

Return ONLY valid JSON in this exact format:
{{
  "title": "Short Deck Title",
  "tags": ["tag1", "tag2"],
  "cards": [
    {{"front_text": "...", "back_text": "..."}},
    {{"front_text": "...", "back_text": "..."}}
  ]
}}"""


async def generate_cards(
    topic: str,
    count: int,
    include_deck_info: bool = False,
    existing_fronts: list[str] | None = None,
    language: str | None = None,
) -> dict:
    """
    Generate flashcards using Claude API.

    Returns dict with:
      - cards: list of {front_text, back_text}
      - suggested_title: str | None (when include_deck_info=True)
      - suggested_tags: list[str] | None (when include_deck_info=True)
    """
    if not settings.ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY is not configured")

    prompt_template = (
        CARD_WITH_DECK_INFO_PROMPT if include_deck_info else CARD_GENERATION_PROMPT
    )
    prompt = prompt_template.format(topic=topic, count=count)
    if language:
        prompt += f"\n\nIMPORTANT: Generate all card content (both front_text and back_text) in {language}."
    prompt += _build_existing_cards_section(existing_fronts)

    client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

    message = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=8192,
        system=FLASHCARD_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    response_text = message.content[0].text.strip()

    # Parse JSON from response — handle markdown code blocks
    if response_text.startswith("```"):
        lines = response_text.split("\n")
        # Remove first and last lines (``` markers)
        lines = lines[1:-1] if lines[-1].strip() == "```" else lines[1:]
        response_text = "\n".join(lines)

    try:
        data = json.loads(response_text)
    except json.JSONDecodeError as e:
        logger.error("Failed to parse AI response as JSON: %s", e)
        raise ValueError("AI returned invalid response format") from e

    # Validate cards structure
    cards = data.get("cards", [])
    if not isinstance(cards, list):
        raise ValueError("AI returned invalid cards format")

    validated_cards = []
    for card in cards:
        front = card.get("front_text", "").strip()
        back = card.get("back_text", "").strip()
        if front and back:
            validated_cards.append({
                "front_text": front[:10000],
                "back_text": back[:10000],
            })

    result: dict = {"cards": validated_cards}

    if include_deck_info:
        result["suggested_title"] = data.get("title") or None
        raw_tags = data.get("tags")
        if isinstance(raw_tags, list):
            result["suggested_tags"] = [
                str(t).strip() for t in raw_tags if str(t).strip()
            ]
        else:
            result["suggested_tags"] = None

    return result


async def generate_cards_from_pdf(
    pdf_data: bytes,
    count: int,
    topic: str | None = None,
    existing_fronts: list[str] | None = None,
    language: str | None = None,
) -> dict:
    """
    Generate flashcards from a PDF document using Claude API.

    Returns dict with:
      - cards: list of {front_text, back_text}
      - suggested_title: str | None
      - suggested_tags: list[str] | None
    """
    if not settings.ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY is not configured")

    extra = ""
    if topic and topic.strip():
        extra = f"\n\nFocus on this aspect of the document: {topic.strip()}"

    prompt = PDF_CARD_PROMPT.format(count=count, extra=extra)
    if language:
        prompt += f"\n\nIMPORTANT: Generate all card content (both front_text and back_text) in {language}."
    prompt += _build_existing_cards_section(existing_fronts)

    pdf_b64 = base64.standard_b64encode(pdf_data).decode("utf-8")

    client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

    message = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=8192,
        system=FLASHCARD_SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "document",
                        "source": {
                            "type": "base64",
                            "media_type": "application/pdf",
                            "data": pdf_b64,
                        },
                    },
                    {
                        "type": "text",
                        "text": prompt,
                    },
                ],
            }
        ],
    )

    response_text = message.content[0].text.strip()

    # Parse JSON from response — handle markdown code blocks
    if response_text.startswith("```"):
        lines = response_text.split("\n")
        lines = lines[1:-1] if lines[-1].strip() == "```" else lines[1:]
        response_text = "\n".join(lines)

    try:
        data = json.loads(response_text)
    except json.JSONDecodeError as e:
        logger.error("Failed to parse AI response as JSON: %s", e)
        raise ValueError("AI returned invalid response format") from e

    # Validate cards structure
    cards = data.get("cards", [])
    if not isinstance(cards, list):
        raise ValueError("AI returned invalid cards format")

    validated_cards = []
    for card in cards:
        front = card.get("front_text", "").strip()
        back = card.get("back_text", "").strip()
        if front and back:
            validated_cards.append({
                "front_text": front[:10000],
                "back_text": back[:10000],
            })

    return {
        "cards": validated_cards,
        "suggested_title": data.get("title") or None,
        "suggested_tags": (
            [str(t).strip() for t in data["tags"] if str(t).strip()]
            if isinstance(data.get("tags"), list)
            else None
        ),
    }


async def edit_cards(
    cards: list[dict],
    instruction: str,
) -> list[dict]:
    """
    Edit existing flashcards using Claude API based on a user instruction.

    Args:
        cards: list of dicts with keys {id, front_text, back_text}
        instruction: free-form instruction describing the edit

    Returns:
        list of dicts with keys {id, front_text, back_text}
    """
    if not settings.ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY is not configured")

    cards_json = json.dumps(cards, ensure_ascii=False, indent=2)
    prompt = CARD_EDIT_PROMPT.format(
        instruction=instruction,
        cards_json=cards_json,
    )

    client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

    message = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=8192,
        system=FLASHCARD_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    response_text = message.content[0].text.strip()

    # Parse JSON from response — handle markdown code blocks
    if response_text.startswith("```"):
        lines = response_text.split("\n")
        lines = lines[1:-1] if lines[-1].strip() == "```" else lines[1:]
        response_text = "\n".join(lines)

    try:
        data = json.loads(response_text)
    except json.JSONDecodeError as e:
        logger.error("Failed to parse AI edit response as JSON: %s", e)
        raise ValueError("AI returned invalid response format") from e

    edited_cards = data.get("cards", [])
    if not isinstance(edited_cards, list):
        raise ValueError("AI returned invalid cards format")

    expected_ids = {c["id"] for c in cards}

    validated = []
    for card in edited_cards:
        card_id = card.get("id", "")
        front = card.get("front_text", "").strip()
        back = card.get("back_text", "").strip()
        if card_id in expected_ids and front and back:
            validated.append({
                "id": card_id,
                "front_text": front[:10000],
                "back_text": back[:10000],
            })

    return validated
