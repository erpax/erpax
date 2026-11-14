'use client'
import { Input } from '@/components/ui'
import { Label } from '@/components/ui'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/use/debounce'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/${locale}/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, locale, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          {t('searchLabel')}
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder={t('searchLabel')}
        />
        <button type="submit" className="sr-only">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
