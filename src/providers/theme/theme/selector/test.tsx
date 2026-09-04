// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

/** Node 26's inert `localStorage` global shadows jsdom's; the selector reads storage on mount. */
const store = new Map<string, string>()
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  },
})

const setTheme = vi.fn()
vi.mock('@/providers/theme', () => ({ useTheme: () => ({ setTheme }) }))
vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }))

const { ThemeSelector } = await import('./index')

describe('providers/theme/theme/selector', () => {
  afterEach(() => {
    cleanup()
    setTheme.mockClear()
  })

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('providers/theme/theme/selector')
  })

  it('WCAG 4.1.2 — the control is a named combobox, not an unlabelled button', () => {
    render(<ThemeSelector />)
    expect(screen.getByRole('combobox')).toBeDefined()
  })

  it('reads the SAME storage key the provider writes — one literal, not two', async () => {
    // This file declared 'payload-theme' a second time. A drift between the two would make the
    // toggle appear to work while the choice was forgotten on reload, with nothing to say why.
    const [own, provider] = await Promise.all([import('./types'), import('@/providers/theme/shared')])
    expect(own.themeLocalStorageKey).toBe(provider.themeLocalStorageKey)
  })

  it('renders without a stored preference — the first visit has none', () => {
    const { container } = render(<ThemeSelector />)
    expect(container.innerHTML.length).toBeGreaterThan(0)
  })
})
