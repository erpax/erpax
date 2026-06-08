/**
 * Tenant-role profile contract — ERPax becomes compliance-as-platform
 * for ANY regulated entity type (per "erpax tenant may be anyone").
 *
 * Slice LLLLL (2026-05-11). A profile bundles the standards / collections
 * / chains / agents / MCP tools / conservation invariant + audit policy
 * a regulatory role requires. Profiles compose via `inheritsFrom`:
 *
 *   `bank` extends `payment-provider`
 *   `central-bank` extends `bank`
 *   `municipality` extends `government`
 *   `university` extends `government` + adds Bologna Process / ECTS
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
 */

import type { AgentId } from '@/agent'

export type AuditCadence = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'

export interface AuditPolicy {
  /** How long Merkle audit leaves stay queryable for this role's chains. */
  readonly merkleRetentionDays: number
  /** Whether eIDAS qualified-signature is required on audit packs. */
  readonly signingRequired: boolean
  /** Optional regulator-reporting cadence (drives scheduled exports). */
  readonly regulatorReportingCadence?: AuditCadence
}

export interface TenantRoleProfile {
  /**
   * Free-form, dot-namespaced id — `payment-provider` / `bank` /
   * `government` / `insurance.eu.solvency-ii` / `health.us.hipaa` etc.
   * Anyone (third-party plugin, tenant admin) can declare a new role.
   */
  readonly id: string
  /** Per-locale display name; resolved through the i18n pipeline. */
  readonly displayName: { readonly [locale: string]: string }
  /** Optional parent profiles — properties union via `getEffectiveProfile`. */
  readonly inheritsFrom?: ReadonlyArray<string>
  readonly requiredStandards: ReadonlyArray<{ readonly body: string; readonly id: string; readonly description?: string }>
  /** Collection slugs the role MUST have wired (FEATURE_REGISTRY auto-enables). */
  readonly requiredCollections: ReadonlyArray<string>
  /** BUSINESS_CHAINS ids the role MUST run end-to-end. */
  readonly requiredChains: ReadonlyArray<string>
  /** AgentIds (core or third-party) that MUST be registered. */
  readonly requiredAgents: ReadonlyArray<AgentId | string>
  /** MCP tool names auto-exposed when the role is active. */
  readonly mcpTools: ReadonlyArray<string>
  /** Name of the conservation invariant that asserts this role's posture. */
  readonly invariant: string
  readonly auditPolicy: AuditPolicy
}
