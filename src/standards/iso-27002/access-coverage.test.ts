/**
 * ISO 27002 — access-predicate coverage matrix.
 *
 * Aggregates `controlsApplied` from every src/access/*.ts module and
 * asserts the canonical coverage matrix the auditor's SOC-2 / ISO 27001
 * evidence pack queries.
 *
 * Each predicate's banner cites controls in JSDoc; the typed
 * `controlsApplied: Iso27002ControlId[]` export is the machine-
 * readable form. If they drift, this spec breaks at compile time
 * (Iso27002ControlId enforces the canonical id set).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-27002:2022 information-security-controls
 * @standard ISO-27001:2022 isms-annex-a-controls
 * @audit ISO-19011:2018 audit-trail control-coverage-evidence
 * @compliance SOC-2 trust-services-criteria
 */

import { describe, it, expect } from 'vitest'
import {
  aggregateCoverage,
  resolveCoverage,
  coverageByTheme,
  isIso27002ControlId,
  type Iso27002ControlId,
} from '@/standards/iso-27002'

import { controlsApplied as anyone } from '@/access/anyone'
import { controlsApplied as authenticated } from '@/access/authenticated'
import { controlsApplied as authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { controlsApplied as isSuperAdmin } from '@/access/isSuperAdmin'
import { controlsApplied as tenantScopedRead } from '@/access/tenantScopedRead'
import { controlsApplied as membershipAdminMutateAccess } from '@/access/membershipAdminMutateAccess'
import { controlsApplied as allowPublicReadTenants } from '@/access/allowPublicReadTenants'
import { controlsApplied as subscriptionGates } from '@/access/subscriptionGates'

const ALL_PREDICATES: Array<{
  name: string
  controls: ReadonlyArray<Iso27002ControlId>
}> = [
  { name: 'anyone', controls: anyone },
  { name: 'authenticated', controls: authenticated },
  { name: 'authenticatedOrPublished', controls: authenticatedOrPublished },
  { name: 'isSuperAdmin', controls: isSuperAdmin },
  { name: 'tenantScopedRead', controls: tenantScopedRead },
  { name: 'membershipAdminMutateAccess', controls: membershipAdminMutateAccess },
  { name: 'allowPublicReadTenants', controls: allowPublicReadTenants },
  { name: 'subscriptionGates', controls: subscriptionGates },
]

describe('ISO 27002 — access-predicate coverage', () => {
  it('every controlsApplied id is a valid Iso27002ControlId', () => {
    for (const { name, controls } of ALL_PREDICATES) {
      for (const id of controls) {
        expect(isIso27002ControlId(id), `${name} cites ${id}`).toBe(true)
      }
    }
  })

  it('every predicate cites at least one access-control family member', () => {
    // Canonical predicates must touch 5.15 (Access control) at minimum
    // — even `anyone` cites it as the "deliberate public-read decision".
    for (const { name, controls } of ALL_PREDICATES) {
      const ids = controls as readonly string[]
      expect(
        ids.includes('5.15'),
        `${name} must cite 5.15 Access control as the canonical access predicate`,
      ).toBe(true)
    }
  })

  it('isSuperAdmin uniquely cites 8.2 Privileged access rights', () => {
    const expected: Iso27002ControlId = '8.2'
    expect((isSuperAdmin as readonly string[]).includes(expected)).toBe(true)
    // No other predicate cites 8.2 — privileged access is super-admin only.
    const others = ALL_PREDICATES.filter(
      (p) => p.name !== 'isSuperAdmin',
    ).flatMap((p) => p.controls)
    expect(others).not.toContain(expected)
  })

  it('tenant-scoped predicates cite 5.23 Cloud-service tenant isolation', () => {
    const tenantScoped = ['tenantScopedRead', 'membershipAdminMutateAccess', 'allowPublicReadTenants']
    for (const name of tenantScoped) {
      const entry = ALL_PREDICATES.find((p) => p.name === name)
      expect(entry, `${name} present`).toBeDefined()
      expect(
        (entry!.controls as readonly string[]).includes('5.23'),
        `${name} must cite 5.23 cloud-service-tenant-isolation`,
      ).toBe(true)
    }
  })

  it('aggregates into a deduplicated coverage matrix', () => {
    const all = aggregateCoverage(ALL_PREDICATES.map((p) => p.controls))
    // Every aggregated id is unique
    const ids = all.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
    // Coverage row carries title + theme
    for (const row of all) {
      expect(typeof row.title).toBe('string')
      expect(['organizational', 'people', 'physical', 'technological']).toContain(
        row.theme,
      )
    }
    // Aggregated coverage at least includes the canonical "core 5":
    //   5.15 (access control), 5.16 (identity), 5.18 (access rights),
    //   5.23 (tenant isolation), 8.2 (privileged), 8.5 (auth), 5.4 (SoD),
    //   8.3 (info access restriction)
    for (const id of ['5.15', '5.16', '5.18', '5.23', '8.2', '8.5', '5.4', '8.3']) {
      expect(ids).toContain(id)
    }
  })

  it('coverageByTheme groups the aggregated matrix into 4 themes', () => {
    const all = aggregateCoverage(ALL_PREDICATES.map((p) => p.controls))
    const grouped = coverageByTheme(all)
    expect(grouped.organizational?.length).toBeGreaterThan(0)
    expect(grouped.technological?.length).toBeGreaterThan(0)
    // The cited subset doesn't include people/physical controls yet —
    // they may be undefined / empty, which is the expected state.
  })

  it('resolveCoverage round-trips a single module\'s controls', () => {
    const rows = resolveCoverage(authenticated)
    expect(rows.map((r) => r.id)).toEqual(['5.15', '5.16', '8.5'])
    expect(rows[0].title).toBe('Access control')
    expect(rows[1].title).toBe('Identity management')
    expect(rows[2].title).toBe('Secure authentication')
  })
})
