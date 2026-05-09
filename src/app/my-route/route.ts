/**
 * GET /my-route — public API surface discovery (parity with wiki).
 *
 * @rfc 9110 http-semantics
 * @rfc 8259 json
 * @standard OpenAPI 3.1 api-description
 * @see src/app/README.md
 */

import { erpaxApiDiscoveryPayload } from '@/utilities/erpaxApiSurface'

export const GET = async (_request: Request) => {
  return Response.json({
    message: 'Custom route: API surface discovery (see wiki parity in README).',
    ...erpaxApiDiscoveryPayload(),
  })
}
