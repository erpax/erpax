/**
 * PayloadRedirects — resolve URL → redirect target via the `redirects`
 * collection, then `next/navigation` redirect / notFound.
 *
 * @rfc 9110 §15.4 redirection-3xx
 * @rfc 9110 §15.4.2 301-moved-permanently
 * @rfc 9110 §15.4.3 302-found
 * @rfc 9110 §15.5.5 404-not-found
 * @rfc 3986 uniform-resource-identifier
 * @see src/components/README.md
 */

import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/standards/rfc-9110/get-document'
import { getCachedRedirects } from '@/standards/rfc-9110/get-redirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const { docs: redirects = [] } = (await getCachedRedirects()()) as {
    docs?: Array<{
      from?: string
      to?: { url?: string; reference?: { relationTo?: string; value?: string | { slug?: string } } }
    }>
  }

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        document?.slug
      }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
