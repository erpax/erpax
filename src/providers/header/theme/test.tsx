// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { HeaderThemeProvider, useHeaderTheme } from './index'

let ctx: ReturnType<typeof useHeaderTheme>
const Consumer = () => {
  ctx = useHeaderTheme()
  return <span data-testid="child" />
}
const mount = () => render(<HeaderThemeProvider><Consumer /></HeaderThemeProvider>)

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
    mount()
    expect(ctx.headerTheme).toBe('dark')
  })

  it('carries a hero’s override — the channel a full-bleed hero uses', () => {
    mount()
    act(() => ctx.setHeaderTheme('dark'))
    expect(ctx.headerTheme).toBe('dark')
  })

  it('accepts null — a hero unmounting hands the header back', () => {
    mount()
    act(() => ctx.setHeaderTheme('dark'))
    act(() => ctx.setHeaderTheme(null))
    expect(ctx.headerTheme).toBeNull()
  })

  it('renders its children — a provider that swallows its tree is a blank page', () => {
    const { container } = mount()
    expect(container.querySelector('[data-testid="child"]')).not.toBeNull()
  })
})
