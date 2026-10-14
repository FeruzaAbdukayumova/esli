import '@/shared/i18n/config'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { ChatWidget } from '@/features/chat/components/ChatWidget'
import { trackEvent } from '@/shared/lib/analytics'
import { router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  useEffect(() => {
    const key = 'flashcards-app-open-tracked'
    if (!sessionStorage.getItem(key)) {
      trackEvent('app.open')
      sessionStorage.setItem(key, '1')
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ChatWidget />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              // Sticker toasts (DESIGN.md)
              style: {
                borderRadius: '16px',
                border: '2.5px solid #17171A',
                background: '#fff',
                color: '#17171A',
                padding: '10px 16px',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 0 0 3px #fff, 0 10px 20px -10px rgb(22 30 60 / 0.45)',
              },
              success: {
                duration: 2000,
                iconTheme: { primary: '#44D07B', secondary: '#17171A' },
              },
              error: {
                duration: 4000,
                iconTheme: { primary: '#E5484D', secondary: '#fff' },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
