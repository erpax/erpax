import type { Payload } from 'payload'

/**
 * @deprecated Calls into the retired seedCurrent (kernel-shaped). Awaiting a
 * plugin-shaped replacement that uses `gl-accounts` / `journal-entries`.
 */
export type TenantConfig = { name?: string; slug?: string; [k: string]: unknown }
export type SetupResult = { success: boolean; errors: string[] }

export async function setupNewTenant(_payload: Payload, _config: TenantConfig): Promise<SetupResult> {
  return { success: false, errors: ['setupNewTenant is retired — see seedCurrent deprecation notice.'] }
}
export async function resetTenant(_payload: Payload, _tenantId: string | number): Promise<SetupResult> {
  return { success: false, errors: ['retired'] }
}
export function getTenantConfig(_slug: string): TenantConfig | null {
  return null
}
