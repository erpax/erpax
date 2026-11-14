'use client'

import React from 'react'

import type { Header as HeaderType } from '@/types'

import { CMSLink } from '@/link/component'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { FrontendLocaleSwitcher } from '@/locale/switcher'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const locale = useLocale()
  const t = useTranslations()

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href={`/${locale}/search`}>
        <span className="sr-only">{t('searchLabel')}</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
      <FrontendLocaleSwitcher />
    </nav>
  )
}
