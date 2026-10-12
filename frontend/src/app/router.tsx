/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { BottomNav } from '@/shared/ui/BottomNav'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { DeckPage } from '@/pages/deck/DeckPage'
import { StudyPage } from '@/pages/study/StudyPage'
import { DecksPage } from '@/pages/decks/DecksPage'
import { BrowsePage } from '@/pages/BrowsePage'
import { PublicDeckDetailPage } from '@/pages/browse/PublicDeckDetailPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { PricingPage } from '@/pages/pricing/PricingPage'
import { SubscriptionSuccessPage } from '@/pages/subscription/SubscriptionSuccessPage'
import { SubscriptionCanceledPage } from '@/pages/subscription/SubscriptionCanceledPage'
// Admin section is lazy-loaded: it pulls in recharts and is invisible to normal users.
const AdminLayout = lazy(() => import('@/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })))
const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })))
const AdminDecksPage = lazy(() => import('@/pages/admin/AdminDecksPage').then((m) => ({ default: m.AdminDecksPage })))
const AdminPromoPage = lazy(() => import('@/pages/admin/AdminPromoPage').then((m) => ({ default: m.AdminPromoPage })))
const AdminSupportPage = lazy(() => import('@/pages/admin/AdminSupportPage').then((m) => ({ default: m.AdminSupportPage })))
const AdminAnalyticsPage = lazy(() => import('@/pages/admin/AdminAnalyticsPage').then((m) => ({ default: m.AdminAnalyticsPage })))
import { OAuthCallbackPage } from '@/pages/auth/OAuthCallbackPage'
import { ExtensionAuthDonePage } from '@/pages/auth/ExtensionAuthDonePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function AppLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  )
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/auth/callback/:provider',
    element: <OAuthCallbackPage />,
  },
  {
    path: '/auth/extension-done',
    element: <ExtensionAuthDonePage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/deck/:deckId',
        element: <DeckPage />,
      },
      {
        path: '/study/:deckId',
        element: <StudyPage />,
      },
      {
        path: '/decks',
        element: <DecksPage />,
      },
      {
        path: '/browse',
        element: <BrowsePage />,
      },
      {
        path: '/browse/:deckId',
        element: <PublicDeckDetailPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/pricing',
        element: <PricingPage />,
      },
      {
        path: '/subscription/success',
        element: <SubscriptionSuccessPage />,
      },
      {
        path: '/subscription/canceled',
        element: <SubscriptionCanceledPage />,
      },
      {
        path: '/',
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-surface-base">
            <span className="inline-block w-8 h-8 border-[3px] border-primary-500 border-t-transparent rounded-full animate-spin" aria-hidden />
          </div>
        }
      >
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: 'analytics',
        element: <AdminAnalyticsPage />,
      },
      {
        path: 'users',
        element: <AdminUsersPage />,
      },
      {
        path: 'decks',
        element: <AdminDecksPage />,
      },
      {
        path: 'promo',
        element: <AdminPromoPage />,
      },
      {
        path: 'support',
        element: <AdminSupportPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
