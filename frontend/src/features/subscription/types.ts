export type PlanTier = 'free' | 'pro' | 'premium'
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete'

export interface UsageSummary {
  ai_generations_used: number
  ai_generations_limit: number // -1 = unlimited
  period_start: string
}

export interface SubscriptionInfo {
  tier: PlanTier
  status: SubscriptionStatus
  billing_interval: 'month' | 'year' | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  usage: UsageSummary
  promo_tier: PlanTier | null
  promo_expires_at: string | null
}

export interface PlanLimits {
  ai_generations_per_month: number
  max_decks: number
  max_cards_per_deck: number
  max_total_cards: number
  max_batch_import: number
  max_ai_cards_per_generation: number
  pdf_ai_generation: boolean
  pdf_max_pages: number
  max_ai_cards_per_pdf: number
  advanced_analytics: boolean
}

export interface PlanInfo {
  tier: PlanTier
  name: string
  monthly_price: number
  yearly_price: number
  monthly_price_id: string | null
  yearly_price_id: string | null
  limits: PlanLimits
}

export interface PlansResponse {
  plans: PlanInfo[]
  publishable_key: string | null
}
