import { useEffect } from 'react'
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center p-8">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Signed in successfully!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Returning to extension... You can close this tab.
        </p>
      </div>
    </div>
  )
}
