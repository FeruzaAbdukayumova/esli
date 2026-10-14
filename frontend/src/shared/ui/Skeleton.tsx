import { cn } from '@/shared/lib/cn'

/** Shimmer placeholder block. Size it with width/height classes via className. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-lg bg-fg/[0.08] animate-pulse',
        className,
      )}
    />
  )
}
