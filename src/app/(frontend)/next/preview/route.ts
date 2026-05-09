/**
 * GET /next/preview — enable draft mode and redirect to the preview URL,
 * gated by a signed preview secret.
 *
 * @rfc 9110 http-semantics
 * @rfc 9110 §15.4 redirection-3xx
 * @rfc 3986 uniform-resource-identifier
 * @rfc 6265 cookies draft-mode-cookie
 * @standard HMAC-SHA256 RFC 2104 preview-secret
 * @security ISO-27002 §5.15 access-control preview-secret
 * @security ISO-27001 A.5.17 authentication-information secret-management
 * @see src/app/README.md
 */

import type { PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'
import { apiErrorResponse, ERR } from '@/utilities/errors'
import { getPreviewSecret } from '@/utilities/getPreviewSecret'

export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret') ?? ''
  const expectedSecret = getPreviewSecret()
  if (previewSecret !== expectedSecret) {
    return apiErrorResponse(ERR.PREVIEW_SECRET_INVALID)
  }

  if (!path) {
    return apiErrorResponse(ERR.PREVIEW_PATH_MISSING)
  }

  if (!path.startsWith('/')) {
    return apiErrorResponse(ERR.PREVIEW_PATH_INVALID)
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return apiErrorResponse(ERR.PREVIEW_AUTH_FAILED)
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return apiErrorResponse(ERR.PREVIEW_AUTH_FAILED)
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable()

  redirect(path)
}
