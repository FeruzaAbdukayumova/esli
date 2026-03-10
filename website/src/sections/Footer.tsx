import { useTranslation } from 'react-i18next'

const APP_URL = 'https://flashcards-app.com'

const footerLinks = [
  { key: 'footer.features', href: '#features' },
  { key: 'footer.pricing', href: '#pricing' },
  { key: 'footer.faq', href: '#faq' },
  { key: 'footer.login', href: `${APP_URL}/login` },
  { key: 'footer.signup', href: `${APP_URL}/register` },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-white">Esli</span>
            </div>
            <p className="mt-2 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}
