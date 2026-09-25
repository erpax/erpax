/**
 * Canonical Field Access Predicates
 *
 * Field-level access control for sensitive fields using Payload v3 FieldAccess type.
 * These predicates control read/create/update permissions at the field level,
 * orthogonal to collection-level access.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 5.18 access-rights
 * @compliance SOC-2 CC6.1 logical-access-controls
 */

import type { FieldAccess } from 'payload'

// ONE super-admin predicate, not two. This file carried a byte-identical copy of the check in
// ./predicates — and a security test duplicated is a security test that drifts: harden one and the
// other silently keeps admitting. rules/copy found it by content address, and neither copy closed
// over anything, so the fold is safe to make ([[rules]]/copy's own boundary: the hash covers the
// body, never what it reads).
import { fieldAccess } from '@/is/super/admin'

/**
 * Tenant field access control.
 *
 * All authenticated users can read the tenant field.
 * Only super-admin users can create or update the tenant field.
 *
 * Used for multi-tenant collections where the tenant assignment should
 * only be controlled by system administrators.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 *
 * @example
 *   {
 *     name: 'tenant',
 *     type: 'relationship',
 *     relationTo: 'tenants',
 *     required: true,
 *     access: {
 *       // read left default (open); only writes are gated to super-admin
 *       create: tenantFieldAccess,
 *       update: tenantFieldAccess,
 *     }
 *   }
 */
export const tenantFieldAccess: FieldAccess = fieldAccess

/**
 * Read-only field access (except for super-admin).
 *
 * All authenticated users can read the field.
 * Only super-admin users can create or update the field.
 *
 * Used for system-managed fields that should not be modified by regular users
 * (e.g., timestamps, computed values, audit fields).
 *
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 5.18 access-rights
 * @compliance SOC-2 CC7.2 system-monitoring
 *
 * @example
 *   {
 *     name: 'auditTrail',
 *     type: 'text',
 *     access: {
 *       // read left default (open); only writes are gated to super-admin
 *       create: readOnlyExceptSuperAdmin,
 *       update: readOnlyExceptSuperAdmin,
 *     }
 *   }
 */
export const readOnlyExceptSuperAdmin: FieldAccess = fieldAccess
