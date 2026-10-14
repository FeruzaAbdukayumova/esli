import { useEffect } from 'react'
import { Check } from 'lucide-react'
import { storage } from '@/shared/lib/storage'

export const ExtensionAuthDonePage = () => {
  useEffect(() => {
    const token = storage.getToken()
    if (token) {
      // Put token in hash for the extension to read via tabs API
      window.location.hash = `token=${token}`
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="sheet w-full max-w-sm p-6 sm:p-8 text-center" role="status">
        <div className="sticker mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-mint -rotate-3">
          <Check className="h-8 w-8 text-ink" strokeWidth={3} aria-hidden />
        </div>
        <h1 className="font-display text-2xl leading-tight text-fg mb-2">
          Signed in successfully!
        </h1>
        <p className="text-base text-muted">
          Returning to extension... You can close this tab.
        </p>
      </div>
    </div>
  )
}
