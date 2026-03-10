import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
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
import { AdminLayout } from '@/layouts/AdminLayout'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { AdminDecksPage } from '@/pages/admin/AdminDecksPage'
import { AdminPromoPage } from '@/pages/admin/AdminPromoPage'
import { AdminSupportPage } from '@/pages/admin/AdminSupportPage'
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage'
import { OAuthCallbackPage } from '@/pages/auth/OAuthCallbackPage'
import { ExtensionAuthDonePage } from '@/pages/auth/ExtensionAuthDonePage'


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
    path: '/auth/callback/:provider',
    element: <OAuthCallbackPage />,
  },
  {
    path: '/auth/extension-done',
    element: <ExtensionAuthDonePage />,
  },
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
    path: '/admin',
    element: <AdminLayout />,
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
    path: '/',
    element: <DashboardPage />,
  },
])
