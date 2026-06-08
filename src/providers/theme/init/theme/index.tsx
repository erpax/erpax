'use client'

import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '@/providers/theme/shared'

/**
 * Blocking theme script must only exist in the SSR tree. React 19 warns if a
 * `<script>` is rendered while hydrating on the client (see next-themes #385).
 */
export const InitTheme: React.FC = () => {
  if (typeof window !== 'undefined') {
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function getImplicitPreference() {
      var mediaQuery = '(prefers-color-scheme: dark)'
      var mql = window.matchMedia(mediaQuery)
      var hasImplicitPreference = typeof mql.matches === 'boolean'

      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light'
      }

      return null
    }

    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var themeToSet = '${defaultTheme}'
    var preference = window.localStorage.getItem('${themeLocalStorageKey}')

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      var implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      suppressHydrationWarning
    />
  )
}
