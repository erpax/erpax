/**
 * App-wide React context providers — header-theme + color-theme.
 *
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum
 * @compliance WCAG-2.1 §1.4.11 non-text-contrast
 * @standard W3C CSS-Color-4 color-contrast
 * @see src/components/README.md
 */

import React from 'react'

import { ComputedCssProvider } from '@/css'
import { QuantumDimensionsProvider } from '@/quantum/QuantumDimensionsProvider'
import { HeaderThemeProvider } from '@/providers/header/theme'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/ui'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ComputedCssProvider>
        <QuantumDimensionsProvider emitOnChange={false}>
          <HeaderThemeProvider>
            {children}
            <Toaster />
          </HeaderThemeProvider>
        </QuantumDimensionsProvider>
      </ComputedCssProvider>
    </ThemeProvider>
  )
}
