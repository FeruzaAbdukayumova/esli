import { useTranslation } from 'react-i18next'

interface CategoryFilterProps {
  categories: string[]
  selected: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const { t } = useTranslation()
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1" role="group" aria-label={t('dashboard.filterByCategory')}>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
          selected === null
            ? 'bg-primary-600 text-white shadow-sm'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
        }`}
        aria-pressed={selected === null}
      >
        {t('dashboard.allCategory')}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(selected === category ? null : category)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
            selected === category
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
