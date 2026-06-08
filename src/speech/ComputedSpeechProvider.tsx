'use client'

import React, { createContext, use, useMemo } from 'react'

import { DEFAULT_UI_SURFACE, type UiSurface } from '@/css/computed'
import { computedSpeechForUi, type ComputedSpeech } from '@/speech/computed'

export interface ComputedSpeechContextValue {
  readonly surface: UiSurface
  readonly speech: ComputedSpeech
}

const ComputedSpeechContext = createContext<ComputedSpeechContextValue>({
  surface: DEFAULT_UI_SURFACE,
  speech: computedSpeechForUi(DEFAULT_UI_SURFACE),
})

export interface ComputedSpeechProviderProps {
  readonly surface?: UiSurface
  readonly children: React.ReactNode
}

/**
 * Provides computed speech alongside ComputedCssProvider — same surface facets,
 * never hand-maintained transcript strings.
 */
export const ComputedSpeechProvider: React.FC<ComputedSpeechProviderProps> = ({
  surface: surfaceOverride,
  children,
}) => {
  const mergedSurface = useMemo(
    () => ({ ...DEFAULT_UI_SURFACE, ...surfaceOverride }),
    [surfaceOverride],
  )
  const speech = useMemo(() => computedSpeechForUi(mergedSurface), [mergedSurface])
  const value = useMemo(
    () => ({ surface: mergedSurface, speech }),
    [mergedSurface, speech],
  )
  return <ComputedSpeechContext value={value}>{children}</ComputedSpeechContext>
}

export const useComputedSpeech = (): ComputedSpeechContextValue => use(ComputedSpeechContext)
