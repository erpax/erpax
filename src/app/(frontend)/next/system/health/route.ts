/**
 * GET /next/system/health — public liveness check (wiki "system" surface).
 *
 * No auth; avoid sensitive data. Convention: 200 healthy / 503 unhealthy.
 *
 * @rfc 9110 http-semantics
 * @rfc 9110 §15.6.4 503-service-unavailable
 * @standard draft-inadarei-api-health-check health-check-response-format
 * @compliance SOC-2 CC7.2 system-monitoring
 * @see src/app/README.md
 */

import packageJson from '../../../../../../package.json'
export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    service: 'erpax',
    stack: 'payload-next',
    version: packageJson.version,
    time: new Date().toISOString(),
  })
}
