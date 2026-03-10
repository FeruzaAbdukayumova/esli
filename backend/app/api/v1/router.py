from fastapi import APIRouter
from app.api.v1.routes import admin, analytics, auth, decks, cards, sync, public, stats, ai, stripe, promo, chat, oauth

api_router = APIRouter()

api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(oauth.router, prefix="/oauth", tags=["oauth"])
api_router.include_router(decks.router, prefix="/decks", tags=["decks"])
api_router.include_router(cards.router, prefix="/cards", tags=["cards"])
api_router.include_router(sync.router, prefix="/sync", tags=["sync"])
api_router.include_router(public.router, prefix="/public", tags=["public"])
api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(stripe.router, prefix="/stripe", tags=["stripe"])
api_router.include_router(promo.router, prefix="/promo", tags=["promo"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
