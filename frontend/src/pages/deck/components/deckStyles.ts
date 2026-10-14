/** Shared class strings for the deck page (sticker zine, see DESIGN.md). */

/** Segmented control: the selected option is a filled sky sticker, the rest are ghost buttons. */
export const segOn = 'btn-sticker bg-sky shrink-0 whitespace-nowrap'
export const segOff =
  'btn-ghost shrink-0 whitespace-nowrap border-[2.5px] border-transparent text-muted hover:text-fg'

/** Form label on a sheet */
export const labelCls = 'flex items-center gap-2 text-sm font-bold text-fg mb-1.5'

/** Inline editable cell inside a table on a sheet */
export const cellInput =
  'w-full min-h-[40px] px-2 py-1 text-sm font-medium rounded-[10px] border-2 border-transparent bg-transparent text-fg transition-[border-color] duration-150 hover:border-edge/40 focus:border-edge focus:outline-none focus:ring-[3px] focus:ring-sky'

/** Icon button on a sheet (theme-aware) */
export const iconBtn =
  'min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-muted hover:text-fg hover:bg-fg/[0.07] active:scale-95 transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-50 disabled:cursor-not-allowed'
export const iconBtnDanger =
  'min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-muted hover:text-again hover:bg-again/10 active:scale-95 transition-[transform,color,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-50 disabled:cursor-not-allowed'
