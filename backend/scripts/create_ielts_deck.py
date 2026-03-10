#!/usr/bin/env python3
"""
Create a premade IELTS Vocabulary deck with common words.
This deck will be shared (public) so all users can copy it.
"""

import asyncio
import sys
import uuid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.db.models.deck import Deck
from app.db.models.card import Card
from app.db.models.user import User

# IELTS Band 6-7 Vocabulary (word: definition)
IELTS_VOCABULARY = [
    ("abandon", "to leave behind completely; to give up"),
    ("ability", "the power or skill to do something"),
    ("abroad", "in or to a foreign country"),
    ("absence", "the state of being away from a place"),
    ("absolute", "complete; total; not limited"),
    ("absorb", "to take in or soak up"),
    ("abstract", "existing in thought but not having physical existence"),
    ("academic", "relating to education and scholarship"),
    ("accelerate", "to increase speed; to make faster"),
    ("accept", "to receive willingly; to agree to"),
    ("access", "the right or opportunity to use something"),
    ("accommodate", "to provide space or lodging for"),
    ("accompany", "to go somewhere with someone"),
    ("accomplish", "to succeed in doing; to complete"),
    ("accurate", "correct in all details; exact"),
    ("achieve", "to successfully reach a goal"),
    ("acquire", "to get or obtain something"),
    ("adapt", "to change to fit new conditions"),
    ("adequate", "enough; sufficient for a purpose"),
    ("adjust", "to change slightly to make suitable"),
    ("administer", "to manage or organize"),
    ("admire", "to respect and approve of"),
    ("admit", "to confess; to allow entry"),
    ("adopt", "to legally take another's child; to accept an idea"),
    ("advance", "to move forward; to make progress"),
    ("advantage", "a condition giving a better chance of success"),
    ("advertise", "to promote a product or service publicly"),
    ("advice", "guidance or recommendations offered"),
    ("affect", "to have an influence on; to make a difference to"),
    ("afford", "to have enough money to pay for"),
    ("aggressive", "ready to attack; forceful"),
    ("agree", "to have the same opinion; to consent"),
    ("agriculture", "the practice of farming"),
    ("aid", "help or support; assistance"),
    ("aim", "a purpose or intention; a goal"),
    ("allocate", "to distribute for a particular purpose"),
    ("allow", "to permit; to let happen"),
    ("alter", "to change or modify"),
    ("alternative", "another choice or option"),
    ("analyze", "to examine in detail"),
    ("annual", "happening once every year"),
    ("anticipate", "to expect or predict"),
    ("apparent", "clearly visible or obvious"),
    ("appeal", "to make a serious request; to attract"),
    ("appear", "to come into sight; to seem"),
    ("apply", "to make a formal request; to put into use"),
    ("appreciate", "to recognize the value of; to be grateful for"),
    ("approach", "to come near; a way of dealing with something"),
    ("appropriate", "suitable or proper for the situation"),
    ("approve", "to officially agree to; to accept"),
    ("approximate", "close to the actual but not exact"),
    ("argue", "to give reasons for or against; to disagree"),
    ("arise", "to come into being; to occur"),
    ("arrange", "to put in order; to organize"),
    ("aspect", "a particular part or feature"),
    ("assess", "to evaluate or estimate"),
    ("assign", "to give a task or responsibility to"),
    ("assist", "to help or support"),
    ("associate", "to connect in the mind; a colleague"),
    ("assume", "to suppose to be true without proof"),
    ("assure", "to tell positively; to guarantee"),
    ("attach", "to fasten or join"),
    ("attain", "to achieve or accomplish"),
    ("attempt", "to try to do something"),
    ("attend", "to be present at; to pay attention to"),
    ("attitude", "a way of thinking or feeling about something"),
    ("attract", "to draw interest or attention"),
    ("authority", "the power to give orders; an expert"),
    ("available", "able to be used or obtained"),
    ("average", "the typical or ordinary amount"),
    ("avoid", "to keep away from; to prevent"),
    ("aware", "having knowledge of; conscious of"),
    ("background", "a person's education and experience; the setting"),
    ("balance", "an even distribution; stability"),
    ("barrier", "an obstacle that prevents movement or progress"),
    ("basis", "the foundation or starting point"),
    ("behave", "to act in a particular way"),
    ("benefit", "an advantage or profit"),
    ("bias", "prejudice in favor of or against something"),
    ("bond", "a connection or tie; a financial certificate"),
    ("brief", "lasting only a short time; concise"),
    ("budget", "a plan for spending money"),
    ("capable", "having the ability to do something"),
    ("capacity", "the maximum amount that can be contained"),
    ("category", "a class or division of things"),
    ("cease", "to stop or end"),
    ("challenge", "a difficult task; to question"),
    ("channel", "a way of communication; a waterway"),
    ("characteristic", "a typical feature or quality"),
    ("circumstance", "a condition or fact affecting a situation"),
    ("cite", "to quote as evidence; to mention"),
    ("claim", "to state as true; to demand as one's right"),
    ("clarify", "to make clear or easier to understand"),
    ("classic", "of the highest quality; traditional"),
    ("clause", "a section of a legal document; a grammar unit"),
    ("coincide", "to occur at the same time"),
    ("collapse", "to fall down suddenly; to fail"),
    ("colleague", "a person you work with"),
    ("combine", "to join together"),
    ("comment", "a remark or observation"),
]


async def create_admin_user(session: AsyncSession) -> User:
    """Create or get admin user for owning shared decks."""
    admin_email = "admin@flashcards.app"

    result = await session.execute(
        select(User).where(User.email == admin_email)
    )
    user = result.scalar_one_or_none()

    if user:
        print(f"Using existing admin user: {admin_email}")
        return user

    # Create admin user
    user = User(
        id=uuid.uuid4(),
        email=admin_email,
        password_hash=None,  # No password - can't login directly
        auth_provider="system",
    )
    session.add(user)
    await session.flush()
    print(f"Created admin user: {admin_email}")
    return user


async def create_ielts_deck(session: AsyncSession, owner: User) -> Deck:
    """Create the IELTS vocabulary deck."""
    deck_title = "IELTS Vocabulary - Band 6-7"

    # Check if deck already exists
    result = await session.execute(
        select(Deck).where(Deck.title == deck_title, Deck.owner_id == owner.id)
    )
    existing_deck = result.scalar_one_or_none()

    if existing_deck:
        print(f"Deck already exists: {deck_title}")
        return existing_deck

    deck = Deck(
        id=uuid.uuid4(),
        owner_id=owner.id,
        title=deck_title,
        category_tags="IELTS,Vocabulary,English",
        is_shared=True,  # Make it public!
    )
    session.add(deck)
    await session.flush()
    print(f"Created deck: {deck_title}")
    return deck


async def populate_cards(session: AsyncSession, deck: Deck) -> int:
    """Add vocabulary cards to the deck."""
    # Check existing cards
    result = await session.execute(
        select(Card).where(Card.deck_id == deck.id)
    )
    existing_cards = list(result.scalars().all())

    if existing_cards:
        print(f"Deck already has {len(existing_cards)} cards")
        return 0

    # Add all vocabulary words
    cards_added = 0
    for word, definition in IELTS_VOCABULARY:
        card = Card(
            id=uuid.uuid4(),
            deck_id=deck.id,
            front_text=word,
            back_text=definition,
            translations=None,  # Will be populated on-demand
        )
        session.add(card)
        cards_added += 1

    await session.flush()
    print(f"Added {cards_added} cards")
    return cards_added


async def main():
    """Main entry point."""
    print("Creating IELTS Vocabulary Deck...")
    print("=" * 50)

    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        # Create admin user
        admin = await create_admin_user(session)

        # Create deck
        deck = await create_ielts_deck(session, admin)

        # Populate cards
        cards_added = await populate_cards(session, deck)

        # Commit all changes
        await session.commit()

        print("=" * 50)
        print("Done!")
        print(f"Deck ID: {deck.id}")
        print(f"Total cards: {len(IELTS_VOCABULARY)}")
        print(f"New cards added: {cards_added}")
        print("\nUsers can now find this deck in /browse")


if __name__ == "__main__":
    asyncio.run(main())
