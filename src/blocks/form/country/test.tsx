// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'
import { countryOptions } from './options'

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))
vi.mock('react-hook-form', async (actual) => ({
  ...(await actual<Record<string, unknown>>()),
  Controller: ({ render: r }: { render: (a: unknown) => React.ReactNode }) =>
    r({ field: { onChange: () => {}, value: undefined } }),
}))

const { Country } = await import('./index')

describe('blocks/form/country', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/country')
  })

  it('WCAG 4.1.2 — the trigger is a button, named only by its bound label', () => {
    render(<Country {...({ control: {} } as React.ComponentProps<typeof Country>)} name="c" label="Country" errors={{}} />)
    expect(screen.getByRole('combobox', { name: /Country/ })).toBeDefined()
  })

  it('ISO 3166-1 alpha-2 — every code is exactly two uppercase letters', () => {
    const bad = countryOptions.filter((o) => !/^[A-Z]{2}$/.test(o.value))
    expect(bad.map((o) => o.value)).toEqual([])
  })

  it('every code is unique — a duplicate silently shadows a country', () => {
    const codes = countryOptions.map((o) => o.value)
    expect(codes.length).toBe(new Set(codes).size)
  })

  it('every entry is labelled — an unlabelled option is unselectable by name', () => {
    expect(countryOptions.filter((o) => !o.label?.trim())).toEqual([])
  })

  it('holds the list it ships — a silent truncation is a country nobody can pick', () => {
    expect(countryOptions.length).toBe(245)
  })
})
