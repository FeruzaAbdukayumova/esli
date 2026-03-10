import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_admin_user, get_current_user
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.promo import (
    PromoCodeCreate,
    PromoCodeResponse,
    PromoCodeUpdate,
    PromoRedeemRequest,
    PromoRedeemResponse,
)
from app.services import promo_service

router = APIRouter()


# --- Admin endpoints ---


@router.post("/admin/codes", response_model=PromoCodeResponse, status_code=201)
async def create_promo_code(
    payload: PromoCodeCreate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Create a new promo code (admin only)."""
    try:
        promo = await promo_service.create_promo_code(
            db,
            code=payload.code,
            tier=payload.tier,
            duration_days=payload.duration_days,
            max_redemptions=payload.max_redemptions,
            valid_from=payload.valid_from,
            valid_until=payload.valid_until,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        if "unique" in str(e).lower():
            raise HTTPException(status_code=409, detail="Promo code already exists") from e
        raise
    return promo


@router.get("/admin/codes", response_model=list[PromoCodeResponse])
async def list_promo_codes(
    include_inactive: bool = False,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """List all promo codes (admin only)."""
    return await promo_service.list_promo_codes(db, include_inactive=include_inactive)


@router.get("/admin/codes/{promo_id}", response_model=PromoCodeResponse)
async def get_promo_code(
    promo_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Get a single promo code (admin only)."""
    promo = await promo_service.get_promo_code(db, promo_id)
    if not promo:
        raise HTTPException(status_code=404, detail="Promo code not found")
    return promo


@router.patch("/admin/codes/{promo_id}", response_model=PromoCodeResponse)
async def update_promo_code(
    promo_id: uuid.UUID,
    payload: PromoCodeUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Update a promo code (admin only)."""
    update_kwargs = {}
    if payload.is_active is not None:
        update_kwargs["is_active"] = payload.is_active
    if payload.max_redemptions is not None:
        update_kwargs["max_redemptions"] = payload.max_redemptions
    if "valid_from" in payload.model_fields_set:
        update_kwargs["valid_from"] = payload.valid_from
    if "valid_until" in payload.model_fields_set:
        update_kwargs["valid_until"] = payload.valid_until

    promo = await promo_service.update_promo_code(db, promo_id, **update_kwargs)
    if not promo:
        raise HTTPException(status_code=404, detail="Promo code not found")
    return promo


@router.delete("/admin/codes/{promo_id}", status_code=204)
async def delete_promo_code(
    promo_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Delete a promo code (admin only)."""
    deleted = await promo_service.delete_promo_code(db, promo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Promo code not found")


# --- User endpoint ---


@router.post("/redeem", response_model=PromoRedeemResponse)
async def redeem_promo_code(
    payload: PromoRedeemRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Redeem a promo code to get a temporary tier upgrade."""
    try:
        result = await promo_service.redeem_promo_code(db, current_user.id, payload.code)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e
    return PromoRedeemResponse(**result)
