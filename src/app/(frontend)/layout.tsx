import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/components/providers'
import { InitTheme } from '@/components/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getTranslations } from 'next-intl/server'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { headers } from 'next/headers'

export default async function FrontendRootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const t = await getTranslations()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
            labels={{
              dashboard: t('dashboard'),
              page: t('page'),
              pages: t('pages'),
              post: t('post'),
              posts: t('posts'),
              project: t('project'),
              projects: t('projects'),
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const base = getServerSideURL({ headers: h })
  return {
    metadataBase: new URL(base),
    openGraph: mergeOpenGraph(undefined, base),
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
  }
}
