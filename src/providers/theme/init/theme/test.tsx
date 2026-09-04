// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'
import { themeLocalStorageKey } from '@/providers/theme/shared'
import { InitTheme } from './index'

describe('providers/theme/init/theme', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('providers/theme/init/theme')
  })

  it('renders NOTHING on the client — React 19 warns on a script in a hydrating tree', () => {
    // jsdom defines `window`, so this IS the client branch. The guard is correctness: the script
    // has already run in the server-rendered HTML by the time this component exists here.
    const { container } = render(<InitTheme />)
    expect(container.innerHTML).toBe('')
  })

  it('the SERVER branch emits an inline script carrying the key and the attribute', () => {
    // The component returns null wherever `window` exists, so the server branch is unreachable
    // through render(). Calling it directly with `window` stubbed away reaches the real element —
    // and reading the emitted __html is the only way to see what the browser will actually run.
    vi.stubGlobal('window', undefined)
    try {
      const el = InitTheme({}) as React.ReactElement<{ dangerouslySetInnerHTML: { __html: string } }>
      const script = el.props.dangerouslySetInnerHTML.__html
      expect(script).toContain(themeLocalStorageKey)
      expect(script).toContain('data-theme')
      // it must decide the theme itself, not wait to be told: the whole point is running first
      expect(script).toContain('prefers-color-scheme')
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('the script is inline — a deferred or external one runs after the paint it prevents', () => {
    vi.stubGlobal('window', undefined)
    try {
      const el = InitTheme({}) as React.ReactElement<Record<string, unknown>>
      expect(el.type).toBe('script')
      expect(el.props.src).toBeUndefined()
      expect(el.props.defer).toBeUndefined()
      expect(el.props.async).toBeUndefined()
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
