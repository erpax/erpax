// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { Width } from './index'

describe('blocks/form/width', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/width')
  })

  it('reads the value as a PERCENTAGE of the form, never as pixels', () => {
    const { container } = render(<Width width={50}>x</Width>)
    expect((container.firstChild as HTMLElement).style.maxWidth).toBe('50%')
  })

  it('an ABSENT width constrains nothing — the failure mode this forbids is 0%', () => {
    // A field styled `max-width: 0%` renders invisible and reports no error anywhere. That is the
    // wrong reading of a missing optional, and it is the only reading a naive template produces.
    const { container } = render(<Width>x</Width>)
    expect((container.firstChild as HTMLElement).style.maxWidth).toBe('')
  })

  it('passes its children through — a layout wrapper adds no content of its own', () => {
    const { container } = render(<Width width={25}><span data-testid="inner">y</span></Width>)
    expect(container.querySelector('[data-testid="inner"]')).not.toBeNull()
  })
})
