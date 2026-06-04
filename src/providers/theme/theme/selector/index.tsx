'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import type { Theme } from '@/providers/theme/theme/selector/types'

import { useTheme } from '@/providers/theme'
import { themeLocalStorageKey } from '@/providers/theme/theme/selector/types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')
  const t = useTranslations()

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label={t('select-theme')}
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder={t('theme')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">{t('theme-auto')}</SelectItem>
        <SelectItem value="light">{t('theme-light')}</SelectItem>
        <SelectItem value="dark">{t('theme-dark')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
