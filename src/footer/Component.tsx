import type { SupportedLocale } from '@/i18n/localization'

import { getCachedGlobal } from '@/rfc/9110/get-globals'
import { Link } from '@/i18n/routing'
import React from 'react'

import { ThemeSelector } from '@/providers/theme/theme/selector'
import { CMSLink } from '@/link/Component'
import { Logo } from '@/logo/Logo'

export async function Footer({ locale }: { locale: SupportedLocale }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
