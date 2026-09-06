// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

const seen: { paymentMethods?: unknown[]; serverURL?: string }[] = []
vi.mock('@payloadcms/plugin-ecommerce/client/react', () => ({
  EcommerceProvider: (props: { children?: React.ReactNode; paymentMethods?: unknown[]; serverURL?: string }) => {
    seen.push({ paymentMethods: props.paymentMethods, serverURL: props.serverURL })
    return <div data-testid="provider">{props.children}</div>
  },
  EUR: { code: 'EUR' },
}))
vi.mock('@payloadcms/plugin-ecommerce/payments/stripe', () => ({
  stripeAdapterClient: ({ publishableKey }: { publishableKey: string }) => ({ kind: 'stripe', publishableKey }),
}))

const { EcommerceClientProvider } = await import('./index')

describe('ecommerce/client/provider', () => {
  beforeEach(() => {
    seen.length = 0
    delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  })
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('ecommerce/client/provider')
  })

  it('a configured key yields exactly one payment method', () => {
    render(<EcommerceClientProvider stripePublishableKey="pk_test_1"><span /></EcommerceClientProvider>)
    expect(seen[0]!.paymentMethods).toHaveLength(1)
  })

  it('NO key yields NO payment method — never an adapter built from an empty string', () => {
    // An adapter with `''` looks configured, mounts a form, and fails when the customer pays.
    render(<EcommerceClientProvider><span /></EcommerceClientProvider>)
    expect(seen[0]!.paymentMethods).toEqual([])
  })

  it('refuses the env fallback in PRODUCTION — one tenant must not check out on another’s key', () => {
    const prior = process.env.NODE_ENV
    vi.stubEnv('NODE_ENV', 'production')
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_live_someone_else'
    try {
      render(<EcommerceClientProvider><span /></EcommerceClientProvider>)
      expect(seen[0]!.paymentMethods).toEqual([])
    } finally {
      // vi.unstubAllEnvs() restores what vi.stubEnv changed; assigning NODE_ENV back by hand is
      // both redundant and refused by the type, which declares it read-only.
      vi.unstubAllEnvs()
    }
  })

  it('renders its children — a provider that swallows its tree is a blank storefront', () => {
    const { container } = render(<EcommerceClientProvider stripePublishableKey="pk_test_1"><span data-testid="child" /></EcommerceClientProvider>)
    expect(container.querySelector('[data-testid="child"]')).not.toBeNull()
  })
})
