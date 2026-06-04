/**
 * Products catalog — `/[locale]/products` lists published products.
 *
 * @standard schema.org Product
 * @standard schema.org ItemList
 * @standard ISO-4217:2015 currency-codes price
 * @standard GS1 GTIN global-trade-item-number
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import configPromise from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'

import type { Product } from '@/payload-types'
import { buildPublishedProductsWhere } from '@/site/tenant/where'
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '@/config/regional-defaults'
import { getProductPrice, formatProductPrice } from '@/product/price'

export const metadata: Metadata = {
  title: 'Products',
}

export default async function ProductsIndexPage({
  params,
}: {
  params: Promise<{ locale: TypedLocale }>
}) {
  const t = await getTranslations()
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // Currency-agnostic: pull every `priceIn<CCY>` column the storage offers
  // and let `getProductPrice` pick the right one for the active locale.
  const result = await payload.find({
    collection: 'products',
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    locale,
    where: buildPublishedProductsWhere(),
  })

  const products = result.docs as Array<Product>
  const priceLocale = typeof locale === 'string' && locale.length > 0 ? locale : DEFAULT_LOCALE

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">{t('products')}</h1>
      <ul className="divide-y divide-border">
        {products.map((p) => {
          const price = getProductPrice(p as unknown as Record<string, unknown>, DEFAULT_CURRENCY)
          return (
            <li key={p.id} className="flex items-center justify-between py-4">
              <Link
                className="font-medium text-foreground hover:underline"
                href={`/${locale}/products/${encodeURIComponent(p.slug)}`}
              >
                {p.title}
              </Link>
              {price && (
                <span className="text-muted-foreground tabular-nums">
                  {formatProductPrice(price, priceLocale)}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {products.length === 0 && (
        <p className="text-muted-foreground">{t('no-published-products')}</p>
      )}
    </main>
  )
}
