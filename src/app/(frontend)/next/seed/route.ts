/**
 * POST /next/seed — admin-only seed runner; populates a tenant with example data.
 *
 * @rfc 9110 http-semantics
 * @standard NIST INCITS-359-2012 role-based-access-control admin-only
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail seed-runs
 * @see src/app/README.md
 */

import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { apiErrorResponse, ERR } from '@/utilities/errors'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return apiErrorResponse(ERR.SEED_FORBIDDEN)
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, code: ERR.SEED_FAILED, msg: 'Error seeding data' })
    return apiErrorResponse(ERR.SEED_FAILED)
  }
}
