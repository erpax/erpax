import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React, { cache } from 'react'

import { routing } from '@/i18n/routing'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import {
  buildProductDetailWhere,
  buildPublishedProductsWhere,
} from '@/utilities/siteTenantWhere'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: buildPublishedProductsWhere(),
    select: {
      slug: true,
    },
  })

  const slugs = products.docs.map(({ slug }) => ({ slug: slug as string }))

  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    for (const { slug } of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

const queryProductBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'products',
      draft: false,
      limit: 1,
      locale,
      overrideAccess: false,
      pagination: false,
      where: buildProductDetailWhere(slug),
    })
    return res.docs[0] as Product | undefined
  },
)

type Args = {
  params: Promise<{
    slug: string
    locale: TypedLocale
  }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise
  const product = await queryProductBySlug({ slug, locale })
  if (!product) {
    return { title: 'Product | erpax' }
  }
  return generateMeta({ doc: product })
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug: rawSlug, locale } = await paramsPromise
  const slug = decodeURIComponent(rawSlug)
  const product = await queryProductBySlug({ slug, locale })

  if (!product) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="mb-4">
        <Link className="text-muted-foreground hover:underline" href={`/${locale}/products`}>
          ← Products
        </Link>
      </p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">{product.title}</h1>
      {typeof product.priceInUSD === 'number' && (
        <p className="mb-8 text-xl tabular-nums text-muted-foreground">
          ${product.priceInUSD.toFixed(2)}{' '}
          <span className="text-sm">USD</span>
        </p>
      )}
      <p className="text-muted-foreground text-sm">
        Cart and checkout use the ecommerce provider; configure Stripe env vars to enable payments.
      </p>
    </article>
  )
}
