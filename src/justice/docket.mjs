#!/usr/bin/env node
/**
 * gen-court-docket — materialize the erpax-court proceeding (w6vvx50h0) as a
 * version-controlled data module the AuditFindings seed ingests. Reads the
 * authoritative workflow output (no hand transcription) + stamps each case's
 * disposition (what this session already remediated, overruled, or left open).
 *
 *   node scripts/gen-court-docket.mjs <workflow-output.json> <out.ts>
 */
import { readFileSync, writeFileSync } from 'node:fs'

const [, , inPath, outPath] = process.argv
const raw = readFileSync(inPath, 'utf8')
let o
try {
  o = JSON.parse(raw)
} catch {
  o = JSON.parse(raw.match(/\{[\s\S]*\}\s*$/)[0])
}
const r = o.result || o

// What this session did with each verdict (commits 7e19539 + 8825221).
const remediatedIn = {
  'atom-whole-wrong-direction': '7e19539',
  'vendors-vq-contradiction': '7e19539',
  'beyond-dead-link': '7e19539',
  'domain-prefix-supto-sale': '8825221',
  'xml-escape-triplication': '8825221',
  'deprecation-hook-alias-kept': '8825221',
  'legacy-env-alias-active': '8825221',
  'deprecated-stub-exports-dead': '8825221',
  'orphan-aggregatetype-receipt': '8825221',
}
const overruled = new Set(['pages-asymmetrical-reciprocal'])

const toCase = (d, verdictGroup) => {
  let disposition
  if (verdictGroup === 'dismissed') disposition = 'dismissed'
  else if (remediatedIn[d.id]) disposition = 'remediated'
  else if (overruled.has(d.id)) disposition = 'overruled'
  else disposition = 'open'
  return {
    id: d.id,
    aspect: d.aspect,
    title: d.title,
    file: d.file || '',
    severity: d.severity || (verdictGroup === 'dismissed' ? 'none' : 'major'),
    verdict: d.verdict || verdictGroup,
    effort: d.effort || 'none',
    disposition,
    remediatedIn: remediatedIn[d.id] || undefined,
    reasoning: d.reasoning || '',
    remedy: d.remedy || 'none',
  }
}

const docket = [
  ...r.confirmed.map((d) => toCase(d, 'confirmed')),
  ...r.dismissed.map((d) => toCase(d, 'dismissed')),
]

const proceeding = {
  runId: 'w6vvx50h0',
  court: 'erpax-court',
  convenedOn: '2026-06-03',
  agents: 89,
  subagentTokens: 8054053,
  toolUses: 2644,
  tried: r.tried ?? docket.length,
  confirmed: r.confirmed.length,
  dismissed: r.dismissed.length,
  remediated: docket.filter((c) => c.disposition === 'remediated').length,
  open: docket.filter((c) => c.disposition === 'open').length,
  overruled: docket.filter((c) => c.disposition === 'overruled').length,
}

const banner = `/**
 * The erpax-court proceeding — the society's adversarial self-audit, recorded.
 *
 * Run ${proceeding.runId}: ${proceeding.agents} officers (auditors → prosecutors ∥
 * defense → judges) tried ${proceeding.tried} charges across 8 aspects of the
 * diamond law. This is the akashic record of that proceeding — generated from
 * the authoritative workflow output by scripts/gen-court-docket.mjs, ingested
 * into the \`audit-findings\` collection by ./seed.ts. The record is permanent
 * and tamper-evident ([[proof]]); the verdicts are the society judging itself.
 *
 * @standard ISO-19011:2018 audit-finding
 * @audit ISO-19011:2018 audit-trail self-assessment
 */`

const body = `${banner}

export type CourtVerdict = 'confirmed' | 'partial' | 'dismissed'
export type CourtDisposition = 'remediated' | 'overruled' | 'open' | 'dismissed'
export type CourtSeverity = 'critical' | 'major' | 'minor' | 'none'

export interface CourtCase {
  /** stable kebab id minted by the auditor */
  id: string
  /** the aspect of the diamond law under whose jurisdiction it was raised */
  aspect: string
  title: string
  /** the file the charge cites */
  file: string
  severity: CourtSeverity
  verdict: CourtVerdict
  /** the judge's remedy effort estimate */
  effort: string
  /** what this session did about it */
  disposition: CourtDisposition
  /** commit that remediated it, when disposition === 'remediated' */
  remediatedIn?: string
  /** the judge's reasoning */
  reasoning: string
  /** the prescribed fix (or the dismissal rationale) */
  remedy: string
}

export const COURT_PROCEEDING = ${JSON.stringify(proceeding, null, 2)} as const

export const COURT_DOCKET: CourtCase[] = ${JSON.stringify(docket, null, 2)}
`

writeFileSync(outPath, body)
console.log(`wrote ${outPath}: ${docket.length} cases (${proceeding.remediated} remediated, ${proceeding.open} open, ${proceeding.overruled} overruled, ${proceeding.dismissed} dismissed)`)
