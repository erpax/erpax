// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))

const formState = { errors: {} as Record<string, { message?: string }> }
vi.mock('react-hook-form', () => ({ useFormContext: () => ({ formState }) }))

const { Error } = await import('./index')

describe('blocks/form/error', () => {
  afterEach(() => {
    cleanup()
    formState.errors = {}
  })

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/error')
  })

  it("says what the validator said", () => {
    formState.errors = { who: { message: 'must be a work address' } }
    render(<Error name="who" />)
    expect(screen.getByText('must be a work address')).toBeDefined()
  })

  it('says SOMETHING when the validator said nothing — the empty red box is the defect', () => {
    formState.errors = { who: {} }
    render(<Error name="who" />)
    expect(screen.getByText('field-required')).toBeDefined()
  })

  it('never renders an empty message, for any error shape', () => {
    for (const err of [{}, { message: '' }, { message: undefined }]) {
      formState.errors = { who: err }
      const { container } = render(<Error name="who" />)
      expect(container.textContent?.trim().length).toBeGreaterThan(0)
      cleanup()
    }
  })
})
