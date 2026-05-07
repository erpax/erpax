import type { Metadata } from 'next'
import Link from 'next/link'

import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'

import type { Product } from '@/payload-types'
import { buildPublishedProductsWhere } from '@/utilities/siteTenantWhere'

export const metadata: Metadata = {
  title: 'Products | erpax',
}

export default async function ProductsIndexPage({
  params,
}: {
  params: Promise<{ locale: TypedLocale }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    locale,
    where: buildPublishedProductsWhere(),
    select: {
      title: true,
      slug: true,
      priceInUSD: true,
    },
  })

  const products = result.docs as Pick<Product, 'id' | 'title' | 'slug' | 'priceInUSD'>[]

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Products</h1>
      <ul className="divide-y divide-border">
        {products.map((p) => (
          <li key={p.id} className="flex items-center justify-between py-4">
            <Link
              className="font-medium text-foreground hover:underline"
              href={`/${locale}/products/${encodeURIComponent(p.slug)}`}
            >
              {p.title}
            </Link>
            {typeof p.priceInUSD === 'number' && (
              <span className="text-muted-foreground tabular-nums">
                ${p.priceInUSD.toFixed(2)}
              </span>
            )}
          </li>
        ))}
      </ul>
      {products.length === 0 && (
        <p className="text-muted-foreground">No published products yet.</p>
      )}
    </main>
  )
}
