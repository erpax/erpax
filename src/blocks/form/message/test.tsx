// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('@/rich/text', () => ({
  default: ({ data }: { data: { text?: string } }) => <p>{data?.text ?? 'rich'}</p>,
}))

const { Message } = await import('./index')

describe('blocks/form/message', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('blocks/form/message')
  })

  it('renders the content it is given', () => {
    render(<Message message={{ text: 'read this first' } as never} />)
    expect(screen.getByText('read this first')).toBeDefined()
  })

  it('renders NO form control — the defect this forbids is an unfillable announced field', () => {
    const { container } = render(<Message message={{ text: 'hi' } as never} />)
    expect(container.querySelector('input,textarea,select,label,[role="checkbox"],[role="combobox"]')).toBeNull()
  })

  it('takes the full width — an explanation narrower than its fields reads as a caption', () => {
    const { container } = render(<Message message={{ text: 'hi' } as never} />)
    expect((container.firstChild as HTMLElement).style.maxWidth).toBe('100%')
  })

  it('an absent message renders nothing rather than an empty block', () => {
    const { container } = render(<Message message={undefined as never} />)
    expect(container.textContent?.trim()).toBe('')
  })
})
