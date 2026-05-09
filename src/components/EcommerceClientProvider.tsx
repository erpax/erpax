'use client'

import type { ReactNode } from 'react'

import { EcommerceProvider, EUR, GBP, USD } from '@payloadcms/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe'

type Props = {
  children: ReactNode
  /** Resolved from request Host / tenant — avoids requiring NEXT_PUBLIC_SERVER_URL */
  serverURL?: string
  /** Tenant Stripe publishable key; non-production may fall back to NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY */
  stripePublishableKey?: string
}

const currenciesConfig = {
  defaultCurrency: 'EUR',
  supportedCurrencies: [EUR, GBP, USD],
}

function resolvePublishableKey(explicit?: string): string {
  const pk = explicit?.trim()
  if (pk) return pk
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') return ''
  return typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || ''
    : ''
}

function resolveServerURL(explicit?: string): string {
  const fromEnv =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SERVER_URL?.trim() || '' : ''
  const u = explicit?.trim()
  return u || fromEnv
}

export function EcommerceClientProvider({
  children,
  serverURL: serverURLProp,
  stripePublishableKey: stripePkProp,
}: Props) {
  const publishableKey = resolvePublishableKey(stripePkProp)

  const paymentMethods =
    publishableKey.length > 0
      ? [
          stripeAdapterClient({
            publishableKey,
          }),
        ]
      : []

  const serverURL = resolveServerURL(serverURLProp)

  return (
    <EcommerceProvider
      api={{
        apiRoute: '/api',
        serverURL,
      }}
      currenciesConfig={currenciesConfig}
      enableVariants
      paymentMethods={paymentMethods}
      syncLocalStorage
    >
      {children}
    </EcommerceProvider>
  )
}
