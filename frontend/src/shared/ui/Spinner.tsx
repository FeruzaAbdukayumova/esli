import { cn } from '@/shared/lib/cn'

type Size = 'sm' | 'md' | 'lg'

const sizes: Record<Size, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
}

/** Circular spinner drawn with the current text color. */
export function Spinner({ size = 'md', className }: { size?: Size; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border-current border-t-transparent animate-spin',
        sizes[size],
        className,
      )}
      aria-hidden="true"
    />
  )
}
