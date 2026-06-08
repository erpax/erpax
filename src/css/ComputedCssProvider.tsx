'use client'

import React, { createContext, use, useEffect, useMemo } from 'react'

import canUseDOM from '@/can/use/dom'
import {
  computedCssForUi,
  computedCssInjection,
  DEFAULT_UI_SURFACE,
  type ComputedCssTokens,
  type CssMode,
  type UiSurface,
} from '@/css/computed'

export interface ComputedCssContextValue {
  readonly surface: UiSurface
  readonly tokens: ComputedCssTokens
}

const ComputedCssContext = createContext<ComputedCssContextValue>({
  surface: DEFAULT_UI_SURFACE,
  tokens: computedCssForUi(DEFAULT_UI_SURFACE),
})

export interface ComputedCssProviderProps {
  readonly surface?: UiSurface
  readonly children: React.ReactNode
  /** When true (default), vars are applied on document.documentElement. */
  readonly injectRoot?: boolean
  /** Light/dark mode override; when omitted, reads data-theme on <html>. */
  readonly mode?: CssMode
}

/**
 * Injects computed shadcn + Payload admin CSS variables at runtime.
 * UI theme is derived from diamond state — never hand-maintained hex strings.
 */
function resolveMode(explicit?: CssMode): CssMode {
  if (explicit) return explicit
  if (!canUseDOM) return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export const ComputedCssProvider: React.FC<ComputedCssProviderProps> = ({
  surface: surfaceOverride,
  children,
  injectRoot = true,
  mode: modeOverride,
}) => {
  const [resolvedMode, setResolvedMode] = React.useState<CssMode>(() => resolveMode(modeOverride))

  useEffect(() => {
    if (modeOverride) {
      setResolvedMode(modeOverride)
      return
    }
    if (!canUseDOM) return
    const el = document.documentElement
    const sync = () => setResolvedMode(resolveMode())
    const obs = new MutationObserver(sync)
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    sync()
    return () => obs.disconnect()
  }, [modeOverride])

  const mergedSurface = useMemo(
    () => ({ ...DEFAULT_UI_SURFACE, ...surfaceOverride, mode: modeOverride ?? resolvedMode }),
    [surfaceOverride, modeOverride, resolvedMode],
  )
  const tokens = useMemo(() => computedCssForUi(mergedSurface), [mergedSurface])
  const value = useMemo(
    () => ({ surface: mergedSurface, tokens }),
    [mergedSurface, tokens],
  )

  useEffect(() => {
    if (!injectRoot || !canUseDOM) return
    const el = document.documentElement
    const injection = computedCssInjection(tokens)
    const prev = new Map<string, string>()
    for (const [key, val] of Object.entries(injection)) {
      prev.set(key, el.style.getPropertyValue(key))
      el.style.setProperty(key, val)
    }
    return () => {
      for (const [key, val] of prev) {
        if (val) el.style.setProperty(key, val)
        else el.style.removeProperty(key)
      }
    }
  }, [tokens, injectRoot])

  const localStyle = useMemo(() => computedCssInjection(tokens), [tokens])

  if (injectRoot) {
    return <ComputedCssContext value={value}>{children}</ComputedCssContext>
  }

  return (
    <ComputedCssContext value={value}>
      <div style={localStyle as React.CSSProperties}>{children}</div>
    </ComputedCssContext>
  )
}

export const useComputedCss = (): ComputedCssContextValue => use(ComputedCssContext)
