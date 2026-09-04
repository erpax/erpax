// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'
import { stateOptions } from './options'

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))
vi.mock('react-hook-form', async (actual) => ({
  ...(await actual<Record<string, unknown>>()),
  Controller: ({ render: r }: { render: (a: unknown) => React.ReactNode }) =>
    r({ field: { onChange: () => {}, value: undefined } }),
}))

const { State } = await import('./index')

describe('blocks/form/state', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/state')
  })

  it('WCAG 4.1.2 — the trigger is a button, named only by its bound label', () => {
    render(<State name="c" label="State" errors={{}} {...({ control: {} } as never)} />)
    expect(screen.getByRole('combobox', { name: /State/ })).toBeDefined()
  })

  it('ISO 3166-1 alpha-2 — every code is exactly two uppercase letters', () => {
    const bad = stateOptions.filter((o) => !/^[A-Z]{2}$/.test(o.value))
    expect(bad.map((o) => o.value)).toEqual([])
  })

  it('every code is unique — a duplicate silently shadows a country', () => {
    const codes = stateOptions.map((o) => o.value)
    expect(codes.length).toBe(new Set(codes).size)
  })

  it('every entry is labelled — an unlabelled option is unselectable by name', () => {
    expect(stateOptions.filter((o) => !o.label?.trim())).toEqual([])
  })

  it('holds the list it ships — a silent truncation is a country nobody can pick', () => {
    expect(stateOptions.length).toBe(50)
  })
})
