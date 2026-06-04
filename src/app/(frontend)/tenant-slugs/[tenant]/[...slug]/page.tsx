/**
 * Tenant-slug deep-slug page renderer.
 *
 * @standard schema.org WebPage
 * @rfc 3986 uniform-resource-identifier
 * @rfc 9110 http-semantics
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @compliance WCAG-2.1 level-AA
 * @see src/app/README.md
 */

import type { Where } from 'payload'

import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { RenderTenantPage } from '@/render/tenant/page'

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string[]; tenant: string }>
}) {
  const params = await paramsPromise

  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const slug = params?.slug

  try {
    const tenantsQuery = await payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      select: {},
      user,
      where: {
        slug: {
          equals: params.tenant,
        },
      },
    })
    // If no tenant is found, the user does not have access
    // Show the login view
    if (tenantsQuery.docs.length === 0) {
      redirect(
        `/tenant-slugs/${params.tenant}/login?redirect=${encodeURIComponent(
          `/tenant-slugs/${params.tenant}${slug ? `/${slug.join('/')}` : ''}`,
        )}`,
      )
    }
  } catch {
    // If the query fails, it means the user did not have access to query on the slug field
    // Show the login view
    redirect(
      `/tenant-slugs/${params.tenant}/login?redirect=${encodeURIComponent(
        `/tenant-slugs/${params.tenant}${slug ? `/${slug.join('/')}` : ''}`,
      )}`,
    )
  }

  const slugConstraint: Where = slug
    ? {
        slug: {
          equals: slug.join('/'),
        },
      }
    : {
        or: [
          {
            slug: {
              equals: '',
            },
          },
          {
            slug: {
              equals: 'home',
            },
          },
          {
            slug: {
              exists: false,
            },
          },
        ],
      }

  const pageQuery = await payload.find({
    collection: 'pages',
    limit: 1,
    overrideAccess: false,
    pagination: false,
    user,
    where: {
      and: [
        {
          'tenant.slug': {
            equals: params.tenant,
          },
        },
        slugConstraint,
      ],
    },
  })

  const pageData = pageQuery.docs?.[0]

  // The page with the provided slug could not be found
  if (!pageData) {
    return notFound()
  }

  // The page was found, render the page with data
  return <RenderTenantPage data={pageData} />
}
