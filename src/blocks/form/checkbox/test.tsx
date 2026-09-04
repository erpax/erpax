// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))

const setValue = vi.fn()
// Override ONE export and keep the rest: the @/ui barrel imports FormProvider from this module, so
// replacing it wholesale breaks the import graph rather than the behaviour under test.
vi.mock('react-hook-form', async (actual) => ({
  ...(await actual<Record<string, unknown>>()),
  useFormContext: () => ({ setValue }),
}))

const { Checkbox } = await import('./index')

const register = ((name: string) => ({ name, onChange: () => {}, onBlur: () => {}, ref: () => {} })) as never
const mount = (extra: Record<string, unknown> = {}) =>
  render(<Checkbox name="agree" label="I agree" errors={{}} register={register} {...(extra as never)} />)

describe('blocks/form/checkbox', () => {
  afterEach(() => {
    cleanup()
    setValue.mockClear()
  })

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/checkbox')
  })

  it('WCAG 4.1.2 — a checkbox has no content of its own, so the LABEL is its accessible name', () => {
    mount()
    const box = screen.getByRole('checkbox', { name: /I agree/ })
    expect(box).toBeDefined()
  })

  it('writes the value to the form by hand — register alone would submit nothing', () => {
    // The Radix control is a button, not an input: register()'s onChange never fires. Deleting the
    // setValue call breaks submission and changes NOTHING visible or announced.
    mount()
    fireEvent.click(screen.getByRole('checkbox', { name: /I agree/ }))
    expect(setValue).toHaveBeenCalledWith('agree', true)
  })

  it('marks required in the accessible name, not only in colour', () => {
    mount({ required: true })
    expect(screen.getByText(/\(required\)/)).toBeDefined()
  })
})
