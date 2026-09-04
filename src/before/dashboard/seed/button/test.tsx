// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

const info = vi.fn()
vi.mock('@payloadcms/ui', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
  toast: { info, success: vi.fn(), error: vi.fn() },
}))
vi.mock('./index.scss', () => ({}))

const fetchMock = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch
vi.stubGlobal('fetch', fetchMock)

const { SeedButton } = await import('./index')

describe('before/dashboard/seed/button', () => {
  afterEach(() => {
    cleanup()
    info.mockClear()
    ;(fetchMock as unknown as { mockClear: () => void }).mockClear()
  })

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('before/dashboard/seed/button')
  })

  it('the first click starts the seed', () => {
    render(<SeedButton />)
    fireEvent.click(screen.getByRole('button'))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('a SECOND click while in flight refuses — a double-click is one press to the user', () => {
    // Seeding is not idempotent: a second request duplicates the demo content.
    render(<SeedButton />)
    const b = screen.getByRole('button')
    fireEvent.click(b)
    fireEvent.click(b)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('the refusal SPEAKS — a silent button reads as broken and gets clicked harder', () => {
    render(<SeedButton />)
    const b = screen.getByRole('button')
    fireEvent.click(b)
    fireEvent.click(b)
    expect(info).toHaveBeenCalledWith('toastSeeding')
  })
})
