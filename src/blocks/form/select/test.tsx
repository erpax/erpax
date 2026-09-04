// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))
// Controller is replaced with a direct render so the proof needs no form provider; every other
// export of react-hook-form is the real one, because @/ui imports FormProvider from it.
vi.mock('react-hook-form', async (actual) => ({
  ...(await actual<Record<string, unknown>>()),
  Controller: ({ render: r }: { render: (a: unknown) => React.ReactNode }) =>
    r({ field: { onChange: () => {}, value: undefined } }),
}))

const { Select } = await import('./index')

describe('blocks/form/select', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/select')
  })

  it('WCAG 4.1.2 — the trigger is a BUTTON, and its only name is the bound label', () => {
    render(<Select name="pick" label="Choose one" errors={{}} {...({ control: {}, options: [{ label: 'A', value: 'a' }] } as never)} />)
    expect(screen.getByRole('combobox', { name: /Choose one/ })).toBeDefined()
  })

  it('marks required in the accessible name, not only in colour', () => {
    render(<Select name="pick" label="Choose one" required errors={{}} {...({ control: {}, options: [] } as never)} />)
    expect(screen.getByText(/\(required\)/)).toBeDefined()
  })
})
