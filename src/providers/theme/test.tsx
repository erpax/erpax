// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { ThemeProvider, useTheme } from './index'
import { themeLocalStorageKey } from './shared'

/**
 * A working Storage, because the runtime does not supply one.
 *
 * Node 26 ships a `localStorage` global that shadows jsdom's and is inert without
 * `--localstorage-file`, so `window.localStorage` is undefined here. The claim under test is what
 * this atom DOES with the storage API — sets a key on an explicit choice, removes it on null — and
 * that is exactly what a Map-backed Storage can refute. It is not a test of browser persistence,
 * and this comment is here so nobody later reads it as one.
 */
const store = new Map<string, string>()
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size
    },
  },
})

/**
 * `prefers-color-scheme`, which jsdom does not implement either.
 *
 * The system preference IS the third state this atom is about, so the proof states it explicitly:
 * a desktop set to dark. Without this the provider throws rather than falling back, which is itself
 * worth knowing — `getImplicitPreference` assumes matchMedia exists.
 */
Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  value: (query: string) => ({
    matches: query.includes('dark'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
})

/** A consumer, because the claims are about what `setTheme` does to three surfaces at once. */
let ctx: ReturnType<typeof useTheme>
const Consumer = () => {
  ctx = useTheme()
  return <span data-testid="child" />
}
const mount = () => render(<ThemeProvider><Consumer /></ThemeProvider>)

describe('providers/theme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('providers/theme')
  })

  it('an explicit choice reaches ALL THREE surfaces — storage, <html>, and state', () => {
    // State without `data-theme` leaves the page unstyled while the app believes it is themed;
    // `data-theme` without storage forgets the choice on reload. Both are silent.
    mount()
    act(() => ctx.setTheme('dark'))
    expect(window.localStorage.getItem(themeLocalStorageKey)).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(ctx.theme).toBe('dark')
  })

  it('setTheme(null) REMOVES the stored preference — unset is a state, not a default', () => {
    // The ordinary bug is storing "light" here. A user on a dark desktop who never touched the
    // toggle would then get a white page with no setting they could change to fix it.
    mount()
    act(() => ctx.setTheme('dark'))
    act(() => ctx.setTheme(null))
    expect(window.localStorage.getItem(themeLocalStorageKey)).toBeNull()
  })

  it('stores nothing until the user actually chooses', () => {
    mount()
    expect(window.localStorage.getItem(themeLocalStorageKey)).toBeNull()
  })

  it('renders its children — a provider that swallows its tree is a blank page', () => {
    const { container } = mount()
    expect(container.querySelector('[data-testid="child"]')).not.toBeNull()
  })
})
