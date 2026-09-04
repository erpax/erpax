// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))

const { Number } = await import('./index')

/** `register` is a PROP, so the proof supplies it — no form provider is needed to bind a label. */
const register = ((name: string) => ({ name, onChange: () => {}, onBlur: () => {}, ref: () => {} })) as never

describe('blocks/form/number', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/number')
  })

  it('WCAG 1.3.1 · 4.1.2 — the control is reachable BY ITS LABEL', () => {
    render(<Number name="who" label="Your name" errors={{}} register={register} {...({} as never)} />)
    // getByLabelText resolves through htmlFor/id. A broken pair renders identically and fails here.
    expect(screen.getByLabelText(/Your name/)).toBeDefined()
  })

  it('carries the input type its name promises', () => {
    render(<Number name="who" label="Your name" errors={{}} register={register} {...({} as never)} />)
    const el = screen.getByLabelText(/Your name/)
    expect(el.getAttribute('type')).toBe('number')
  })

  it('marks a required field in the accessible name, not only in colour', () => {
    render(<Number name="who" label="Your name" required errors={{}} register={register} {...({} as never)} />)
    // the asterisk is decorative; the sr-only "(required)" is what a screen reader announces
    expect(screen.getByText(/\(required\)/)).toBeDefined()
  })
})
