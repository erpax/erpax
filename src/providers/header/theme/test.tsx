// @vitest-environment jsdom
import { act, cleanup, render, renderHook } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { HeaderThemeProvider, useHeaderTheme } from './index'

/**
 * `renderHook` hands the hook's value out; a Consumer writing to an outer binding is a side channel,
 * which is what react-hooks/globals and react-hooks/immutability forbid — and they are right. The
 * claims here are about what the hook DOES, so the hook is what gets rendered.
 */
const hookView = () => renderHook(() => useHeaderTheme(), { wrapper: HeaderThemeProvider })

describe('providers/header/theme', () => {
  beforeEach(() => document.documentElement.removeAttribute('data-theme'))
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('providers/header/theme')
  })

  it('READS the initial theme from the DOM — the attribute is already right at hydration', () => {
    // The blocking init script sets data-theme before first paint. Defaulting to light here would
    // flash a light header on every dark page load.
    document.documentElement.setAttribute('data-theme', 'dark')
    expect(hookView().result.current.headerTheme).toBe('dark')
  })

  it('carries a hero’s override — the channel a full-bleed hero uses', () => {
    const { result } = hookView()
    act(() => result.current.setHeaderTheme('dark'))
    expect(result.current.headerTheme).toBe('dark')
  })

  it('accepts null — a hero unmounting hands the header back', () => {
    const { result } = hookView()
    act(() => result.current.setHeaderTheme('dark'))
    act(() => result.current.setHeaderTheme(null))
    expect(result.current.headerTheme).toBeNull()
  })

  it('renders its children — a provider that swallows its tree is a blank page', () => {
    // This claim is about the TREE, not the hook — so it renders one, with no capture.
    const { container } = render(
      <HeaderThemeProvider>
        <span data-testid="child" />
      </HeaderThemeProvider>,
    )
    expect(container.querySelector('[data-testid="child"]')).not.toBeNull()
  })
})
