/**
 * Frontend root layout — sets `<html>`, fonts, theme + ecommerce providers.
 *
 * @standard W3C HTML5 Living Standard
 * @standard W3C CSS Living Standard
 * @standard schema.org WebSite
 * @standard BCP-47 language-tag html-lang-attribute
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum
 * @compliance WCAG-2.1 §3.1.1 language-of-page
 * @rfc 9110 http-semantics
 * @see src/app/README.md
 */

import type { Metadata } from 'next'

import { cn } from '@/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Providers } from '@/provider'
import { InitTheme } from '@/providers/theme/init/theme'
import { mergeOpenGraph } from '@/merge/open/graph'

import './globals.css'
import { getServerSideURL } from '@/rfc/3986'
import { headers } from 'next/headers'

export default async function FrontendRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>{children}</Providers>
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
