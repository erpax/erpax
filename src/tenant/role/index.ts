/**
 * Tenant-role registry — barrel.
 *
 * Slice LLLLL (2026-05-11). Importing this barrel triggers the side-
 * effect imports of the 4 reference profiles (business → payment-
 * provider → bank, plus government), so any code that calls
 * `getTenantRole('bank')` etc. resolves the profile transparently.
 *
 * Anyone (third-party plugin, runtime MCP call) can call
 * `defineTenantRole(...)` to add their own profile without touching
 * core. PPPPP+ slot tracks the open-extensibility surface.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 */

export type { TenantRoleProfile, AuditPolicy, AuditCadence } from '@/tenant/role/types'
export {
  defineTenantRole, getTenantRole, listTenantRoles, getEffectiveProfile,
  __resetRegistryForTests,
} from '@/tenant/role/registry'

// Side-effect imports — register the 5 reference profiles at module load.
// Order matters: parents before children
// (business → payment-provider → bank ; business → government → country).
import '@/tenant/roles/profile/business.profile'
import '@/tenant/roles/profile/payment-provider.profile'
import '@/tenant/roles/profile/bank.profile'
import '@/tenant/roles/profile/government.profile'
import '@/tenant/roles/profile/country.profile'
