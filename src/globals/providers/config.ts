/**
 * Providers global — the outside directories this installation offers, and the app registration
 * it holds with each. A tenant connects its own account on the tenant (`tenants.providers`).
 *
 * @security ISO-27001 A.5.17 authentication-information · A.5.15 access-control
 * @see src/packages/admin/providers/settings.ts (the fields and how the two levels combine)
 */
import type { GlobalConfig } from 'payload'
import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'
import { PROVIDERS } from '@/packages/admin/providers'
import { installationProviders } from '@/packages/admin/providers/settings'

const superAdmin = ({ req }: { req: { user?: unknown } }): boolean => isSuperAdmin(req.user)

export const Providers: GlobalConfig = {
  slug: 'providers',
  label: 'Providers',
  access: { read: superAdmin, update: superAdmin },
  fields: [installationProviders(PROVIDERS, { create: superAdmin, read: superAdmin, update: superAdmin })],
}
