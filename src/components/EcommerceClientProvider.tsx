'use client'

import type { ReactNode } from 'react'

import { EcommerceProvider, EUR, GBP, USD } from '@payloadcms/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe'

type Props = {
  children: ReactNode
}

const currenciesConfig = {
  defaultCurrency: 'USD',
  supportedCurrencies: [USD, EUR, GBP],
}

const publishableKey =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '' : ''

const paymentMethods =
  publishableKey.length > 0
    ? [
        stripeAdapterClient({
          publishableKey,
        }),
      ]
    : []

export function EcommerceClientProvider({ children }: Props) {
  const serverURL =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SERVER_URL || '' : ''

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
