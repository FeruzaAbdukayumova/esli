import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../i18n/config'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="relative inline-flex items-center">
      <Globe size={16} className="absolute left-2 text-slate-400 pointer-events-none" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none pl-7 pr-6 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        aria-label="Language"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
