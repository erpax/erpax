import type { Payload } from 'payload'

import { COURT_DOCKET, COURT_PROCEEDING, type CourtCase } from '@/internal/controls/audit/findings/court-docket'

/**
 * Seed for `audit-findings` — records the erpax-court proceeding (the society's
 * adversarial self-audit, run w6vvx50h0) as permanent, tamper-evident findings.
 * Idempotent: each case is keyed by `priorYearReference = runId:caseId`, so a
 * re-seed never duplicates. Defensive: if the founding tenant/user do not exist
 * yet, it skips (the seeding layer wires these first). @see ./court-docket.ts
 */

type FindingType =
  | 'control-deficiency'
  | 'significant-deficiency'
  | 'material-weakness'
  | 'misstatement'
  | 'exception'
  | 'observation'
type Severity = 'critical' | 'high' | 'medium' | 'low'
type Status = 'open' | 'in-remediation' | 'remediated-pending' | 'remediated-confirmed' | 'closed'
type RiskCategory = 'financial-reporting' | 'compliance' | 'operational' | 'security'

const SEVERITY: Record<CourtCase['severity'], Severity> = {
  critical: 'critical',
  major: 'high',
  minor: 'low',
  none: 'low',
}
// The aspect of the diamond law decides the finding's nature.
const FINDING_TYPE: Record<string, FindingType> = {
  spec: 'control-deficiency',
  security: 'control-deficiency',
  dry: 'exception',
  naming: 'exception',
  standards: 'exception',
  diamond: 'observation',
  weave: 'observation',
  gates: 'observation',
}
const RISK: Record<string, RiskCategory> = {
  security: 'security',
  standards: 'compliance',
}
const STATUS: Record<CourtCase['disposition'], Status> = {
  remediated: 'remediated-confirmed',
  overruled: 'closed',
  dismissed: 'closed',
  open: 'open',
}

function managementResponse(c: CourtCase): string {
  switch (c.disposition) {
    case 'remediated':
      return `Remediated in commit ${c.remediatedIn}. Remedy applied: ${c.remedy}`
    case 'overruled':
      return `Overruled on appeal: non-reciprocal / asymmetric atom links are accepted per the justice-non-reciprocal precedent, and the gate is green. The court's proposed remedy was: ${c.remedy}`
    case 'dismissed':
      return `Dismissed by the court: ${c.reasoning}`
    default:
      return `Confirmed; remediation pending (effort: ${c.effort}). Prescribed remedy: ${c.remedy}`
  }
}

export async function seedAuditFindings(payload: Payload): Promise<void> {
  const [tenants, users] = await Promise.all([
    payload.find({ collection: 'tenants', limit: 1, depth: 0 }),
    payload.find({ collection: 'users', limit: 1, depth: 0, sort: 'createdAt' }),
  ])
  const tenant = tenants.docs[0]
  const auditor = users.docs[0]
  if (!tenant || !auditor) {
    payload.logger.info('[seedAuditFindings] no founding tenant/user yet — skipping court-docket recording')
    return
  }

  let recorded = 0
  for (const c of COURT_DOCKET) {
    const ref = `${COURT_PROCEEDING.runId}:${c.id}`
    const existing = await payload.find({
      collection: 'audit-findings',
      limit: 1,
      depth: 0,
      where: { priorYearReference: { equals: ref } },
    })
    if (existing.docs.length > 0) continue

    await payload.create({
      collection: 'audit-findings',
      data: {
        tenant: tenant.id,
        title: `[court:${c.aspect}] ${c.title}`,
        description: c.reasoning || c.title,
        findingType: FINDING_TYPE[c.aspect] ?? 'observation',
        severity: SEVERITY[c.severity],
        frequencyOfOccurrence: c.id === 'xml-escape-triplication' ? 'recurring' : 'isolated',
        identifiedDate: COURT_PROCEEDING.convenedOn,
        identifiedBy: auditor.id,
        riskCategory: RISK[c.aspect] ?? 'operational',
        status: STATUS[c.disposition],
        managementResponse: managementResponse(c),
        managementResponseDate: COURT_PROCEEDING.convenedOn,
        priorYearReference: ref,
        isActive: c.disposition === 'open',
      },
    })
    recorded++
  }
  payload.logger.info(
    `[seedAuditFindings] erpax-court ${COURT_PROCEEDING.runId}: recorded ${recorded} new finding(s) of ${COURT_DOCKET.length} (${COURT_PROCEEDING.remediated} remediated, ${COURT_PROCEEDING.open} open).`,
  )
}
