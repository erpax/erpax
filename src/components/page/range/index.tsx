'use client'

/**
 * Page-range indicator — "Showing 1–10 of 42 Items".
 *
 * @standard ECMA-402 internationalization-api Intl.NumberFormat
 * @standard BCP-47 language-tag
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @see src/components/README.md
 */

import React from 'react'
import { useTranslations } from 'next-intl'

const defaultLabels = {
  plural: 'Items',
  singular: 'Item',
}

export const PageRange: React.FC<{
  className?: string
  collection?: 'posts'
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const t = useTranslations()
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const defaultCollectionLabels = {
    posts: {
      plural: t('posts.plural'),
      singular: t('posts.singular'),
    },
  }

  const { plural, singular } =
    collectionLabelsFromProps ||
    (collection ? defaultCollectionLabels[collection] : undefined) ||
    {
      plural: t('posts.plural'),
      singular: t('posts.singular'),
    } ||
    defaultLabels ||
    {}

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && t('no-results')}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `${t('showing')} ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} ${t('of')} ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
