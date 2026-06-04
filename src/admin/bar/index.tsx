'use client'

/**
 * Admin bar — bridges admin authentication state to the public site.
 *
 * @standard W3C HTML5 nav-element
 * @standard WAI-ARIA 1.2 toolbar-role
 * @compliance WCAG-2.1 §2.4.1 bypass-blocks
 * @see src/components/README.md
 */

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import '@/admin/bar/index.scss'

import { getClientSideURL } from '@/rfc/3986/get-url'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

type AdminBarLabels = {
  dashboard: string
  page: string
  pages: string
  post: string
  posts: string
  project: string
  projects: string
}

const Title: React.FC<{ dashboardLabel: string }> = ({ dashboardLabel }) => (
  <span>{dashboardLabel}</span>
)

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
  /** @deprecated Prefer client `useTranslations` when rendered under `NextIntlClientProvider`. */
  labels?: AdminBarLabels
}> = (props) => {
  const { adminBarProps, labels: labelsProp } = props || {}
  const t = useTranslations()
  const labels: AdminBarLabels =
    labelsProp ?? {
      dashboard: t('dashboard'),
      page: t('pages.singular'),
      pages: t('pages.plural'),
      post: t('posts.singular'),
      posts: t('posts.plural'),
      project: t('project'),
      projects: t('projects'),
    }
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural:
              labels[collectionLabels[collection]?.plural.toLowerCase() as keyof AdminBarLabels] ||
              collectionLabels[collection]?.plural ||
              'Pages',
            singular:
              labels[collectionLabels[collection]?.singular.toLowerCase() as keyof AdminBarLabels] ||
              collectionLabels[collection]?.singular ||
              'Page',
          }}
          logo={<Title dashboardLabel={labels.dashboard} />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
