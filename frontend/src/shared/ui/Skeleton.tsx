import { cn } from '@/shared/lib/cn'

/** Shimmer placeholder block. Size it with width/height classes via className. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200',
        'dark:from-slate-700 dark:via-slate-600 dark:to-slate-700',
        'bg-[length:200%_100%] animate-shimmer',
        className,
      )}
    />
  )
}
