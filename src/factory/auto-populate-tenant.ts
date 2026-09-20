/**
 * Auto-populate Tenant Hook Factory
 *
 * Factory pattern: returns collection-specific hook.
 * REPLACES inline `autoPopulateTenant` with typed, collection-aware version.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @audit ISO-19011:2018 audit-trail before-validate-hooks
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 */

import type { CollectionBeforeValidateHook } from 'payload'
import { getTenantContext } from '@/plugins/auth/context'
