/**
 * monitor/violations/improve — map violation → deterministic improve action.
 *
 * Auto-fix safe classes (regen face, test stub, path record, seal credit eb).
 * Human-gate risky domains (tenant, invoices, structural refactors).
 * Never regress — ratchet rules only tighten; no baseline-lowering transforms.
 *
 * @see ./loop.ts — @/apply/batch — @/readme — @/accounting/coa
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { applySessionLawBatch } from '@/apply/batch'
import { postSealOnPath } from '@/accounting'
import { jcsCanonicalize, uuid } from '@/integrity'
import { recordPathVisit, recordOnPath, type PathCanonicalEntry } from '@/path'
import { pivotIndexTsWithReexport } from '@/law/folder/word'
import { materializeComputedFacesForPathsStable } from '@/readme'
import { issueReceipt, type Receipt } from '@/receipt'
import { maxWorkTamperPolicy, tamperCostForImproveReceipt } from '@/wave'
import type { ViolationEvent, ViolationSource } from './index'

export type { ViolationEvent } from './index'

export type ImproveClass = 'auto' | 'human-gate' | 'never'

export type ImproveAction =
  | 'regen-computed-faces'
  | 'trinity-test-stub'
  | 'path-ledger-record'
  | 'seal-credit-eb'
  | 'matrix-fold-batch'
  | 'queued-human'

/** Collections requiring human approval before field/hook mutations. */
export const HUMAN_GATE_COLLECTIONS = new Set([
  'tenants',
  'invoices',
  'employees',
  'chat',
  'translations',
])

const SOURCE_PRIORITY: Readonly<Record<ViolationSource, number>> = {
  'cross-concept': 0,
  'path-follow': 1,
  'gap-eb': 2,
  'finished-idea-cross': 3,
  'diamond-stray': 4,
  'folder-law': 5,
  entanglement: 6,
  'import-boundary': 7,
  'rules-stray-ts': 8,
  'rules-multi-segment': 9,
  'rules-accounting': 10,
  'logic-concentration': 11,
  'word-matter': 12,
  'word-without-code': 13,
  'word-without-logic': 14,
  'word-incomplete-diamond': 15,
  'alphanumeric-name': 16,
  'seal-debt': 17,
}

const SEVERITY_RANK = { error: 0, warning: 1, info: 2 } as const

let receiptHead: { leafUuid: string; seq: number } | null = null
let pathLedgerDepth = 0

/** Reset append-only receipt chain (tests). */
export function resetImproveReceiptChain(): void {
  receiptHead = null
  pathLedgerDepth = 0
}

export const improveResultId = (violationId: string, action: ImproveAction): string =>
  uuid(jcsCanonicalize({ violationId, action }))

/** Classify whether a violation may be auto-improved. */
export function violationImproveClass(violation: ViolationEvent): ImproveClass {
  const { source, atomPath, detail } = violation

  if (source === 'cross-concept') return 'human-gate'
  if (source.startsWith('rules-') || source === 'import-boundary') return 'human-gate'
  if (source === 'logic-concentration' || source === 'word-matter') return 'human-gate'
  if (source === 'word-without-logic') return 'human-gate'

  if (source === 'word-incomplete-diamond') {
    if (detail.includes('dead wikilink') || detail.includes('no atom folder')) return 'human-gate'
    if (
      detail.includes('partial trinity') ||
      detail.includes('SKILL.md only') ||
      detail.includes('missing index.ts or test.ts')
    ) {
      return 'auto'
    }
    return 'human-gate'
  }

  if (source === 'folder-law') {
    if (detail.includes('one-word')) return 'human-gate'
    if (detail.includes('SKILL.md') || detail.includes('index.ts')) return 'human-gate'
    if (detail.includes('test.ts')) return 'auto'
    return 'human-gate'
  }

  if (source === 'entanglement') {
    if (atomPath === 'matrix' && detail.includes('reciprocity')) return 'auto'
    if (HUMAN_GATE_COLLECTIONS.has(atomPath)) return 'human-gate'
    if (detail.includes('unhooked')) return 'human-gate'
    return 'human-gate'
  }

  if (source === 'finished-idea-cross') {
    if (detail.includes('trinity.proof missing')) return 'auto'
    if (detail.includes('trinity.code missing') || detail.includes('trinity.form missing')) {
      return 'human-gate'
    }
    return 'auto'
  }

  if (
    source === 'gap-eb' ||
    source === 'diamond-stray' ||
    source === 'path-follow'
  ) {
    return 'auto'
  }

  return 'never'
}

/** Sort violations — errors first, auto-fixable before gated, wave-priority sources. */
export function prioritizeViolations(events: readonly ViolationEvent[]): ViolationEvent[] {
  return [...events].sort((a, b) => {
    const sa = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]
    if (sa !== 0) return sa
    const ca =
      (violationImproveClass(a) === 'auto' ? 0 : 1) - (violationImproveClass(b) === 'auto' ? 0 : 1)
    if (ca !== 0) return ca
    return (SOURCE_PRIORITY[a.source] ?? 99) - (SOURCE_PRIORITY[b.source] ?? 99)
  })
}

export interface ImproveInRealtimeOpts {
  readonly cwd?: string
  readonly dryRun?: boolean
  readonly actor?: string
  readonly at?: string
  readonly pathLedger?: PathCanonicalEntry[]
  readonly pathSeq?: number
  readonly pathLedgerDepth?: number
  readonly completedWaves?: number
}

export interface ImproveResult {
  readonly id: string
  readonly violationId: string
  readonly source: ViolationSource
  readonly atomPath: string
  readonly accountCode: string
  readonly action: ImproveAction
  readonly applied: boolean
  readonly gated: boolean
  readonly reason?: string
  readonly sealCreditEb?: number
  readonly tamperCostLog2?: number
  readonly receipt?: Receipt
  readonly pathEntry?: PathCanonicalEntry
  readonly monitorEntry?: PathCanonicalEntry
}

const trinityIndexStub = (atomPath: string): string => {
  const slash = atomPath.indexOf('/')
  if (slash >= 0) {
    return pivotIndexTsWithReexport(atomPath.slice(0, slash), atomPath.slice(slash + 1))
  }
  const word = atomPath
  return `/**
 * ${word} — vocabulary atom barrel (monitor/violations improve).
 * @generated realtime improve — replace with real exports
 */
export const WORD = '${word}' as const
export const atomPath = '${word}' as const
`
}

const trinityTestStub = (atomPath: string): string => {
  const slash = atomPath.indexOf('/')
  const importFrom = slash >= 0 ? `'@/${atomPath}'` : `'./index'`
  const describeName = `${atomPath} — trinity proof (improve stub)`
  if (slash >= 0) {
    const leaf = atomPath.slice(slash + 1)
    return `/**
 * ${atomPath} — trinity proof stub (monitor/violations improve).
 * @generated realtime improve — replace with real behavior tests
 */
import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, atomPath } from ${importFrom}

describe('${describeName}', () => {
  it('exports vocabulary pivot constants', () => {
    expect(PART).toBe('${leaf}')
    expect(CANONICAL).toBe('${leaf}')
    expect(atomPath).toBe('${atomPath}')
  })
})
`
  }
  return `/**
 * ${atomPath} — trinity proof stub (monitor/violations improve).
 * @generated realtime improve — replace with real behavior tests
 */
import { describe, it, expect } from 'vitest'
import { WORD, atomPath } from ${importFrom}

describe('${describeName}', () => {
  it('exports vocabulary atom barrel', () => {
    expect(WORD).toBe('${atomPath}')
    expect(atomPath).toBe('${atomPath}')
  })
})
`
}

const needsTestStub = (violation: ViolationEvent): boolean =>
  violation.detail.includes('trinity.proof missing') ||
  (violation.source === 'folder-law' && violation.detail.includes('test.ts')) ||
  (violation.source === 'word-incomplete-diamond' &&
    (violation.detail.includes('partial trinity') ||
      violation.detail.includes('SKILL.md only') ||
      violation.detail.includes('missing index.ts or test.ts')))

const strictApplyImproveGate = (
  violation: ViolationEvent,
  action: ImproveAction,
): { allowed: boolean; reason?: string } => {
  const cls = violationImproveClass(violation)
  if (cls === 'never') return { allowed: false, reason: 'never auto-improve (ratchet)' }
  if (cls === 'human-gate') return { allowed: false, reason: 'human gate — tenant/invoices/structure' }
  if (action === 'queued-human') return { allowed: false, reason: 'queued for human gate' }
  return { allowed: true }
}

const recordImproveOnMonitor = (
  payload: unknown,
  at: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry => recordPathVisit('monitor', payload, at, prevEntryUuid, seq)

const issueImproveReceipt = (
  violation: ViolationEvent,
  action: ImproveAction,
  outcome: 'allow' | 'block' | 'escalate',
  actor: string,
  at: string,
  tamperOpts?: { readonly pathLedgerDepth?: number; readonly completedWaves?: number },
): Receipt => {
  const policy = maxWorkTamperPolicy()
  const ledgerDepth = tamperOpts?.pathLedgerDepth ?? pathLedgerDepth
  const tamperLog2 = tamperCostForImproveReceipt({
    receiptSeq: (receiptHead?.seq ?? -1) + 1,
    pathLedgerDepth: ledgerDepth,
    completedWaves: tamperOpts?.completedWaves,
    policy,
  })

  const receipt = issueReceipt({
    decision: {
      action: `monitor.improve.${action}`,
      actor,
      outcome,
      tier: 'corpus',
      capabilities: ['execute'],
    },
    head: receiptHead,
    timestampIso: at,
  })
  receiptHead = { leafUuid: receipt.leafUuid, seq: receipt.seq }
  pathLedgerDepth = ledgerDepth + 1
  recordImproveOnMonitor(
    {
      kind: 'improve.receipt',
      violationId: violation.id,
      action,
      leafUuid: receipt.leafUuid,
      tamperCostLog2: tamperLog2,
    },
    at,
    receipt.prevLeafUuid === 'GENESIS' ? null : receipt.prevLeafUuid,
    receipt.seq,
  )
  void tamperLog2
  return receipt
}

/**
 * Map one violation → improve action. Fail-closed on human-gate and ratchet axes.
 * Posts seal credit eb + append-only receipt on successful auto-fix.
 */
export function improveInRealtime(
  violation: ViolationEvent,
  opts: ImproveInRealtimeOpts = {},
): ImproveResult {
  const cwd = opts.cwd ?? process.cwd()
  const dryRun = opts.dryRun ?? false
  const actor = opts.actor ?? 'monitor-improve-loop'
  const at = opts.at ?? new Date().toISOString()
  const cls = violationImproveClass(violation)

  const tamperOpts = {
    pathLedgerDepth: opts.pathLedgerDepth ?? pathLedgerDepth,
    completedWaves: opts.completedWaves,
  }

  if (cls === 'human-gate') {
    const receipt = issueImproveReceipt(violation, 'queued-human', 'escalate', actor, at, tamperOpts)
    return {
      id: improveResultId(violation.id, 'queued-human'),
      violationId: violation.id,
      source: violation.source,
      atomPath: violation.atomPath,
      accountCode: violation.accountCode,
      action: 'queued-human',
      applied: false,
      gated: true,
      reason: 'human gate — tenant/invoices/structure',
      receipt,
      tamperCostLog2: tamperCostForImproveReceipt({
        receiptSeq: receipt.seq,
        pathLedgerDepth: tamperOpts.pathLedgerDepth ?? 0,
        completedWaves: tamperOpts.completedWaves,
      }),
    }
  }

  if (cls === 'never') {
    return {
      id: improveResultId(violation.id, 'queued-human'),
      violationId: violation.id,
      source: violation.source,
      atomPath: violation.atomPath,
      accountCode: violation.accountCode,
      action: 'queued-human',
      applied: false,
      gated: false,
      reason: 'never auto-improve',
    }
  }

  const atomPath = violation.atomPath
  const dir = join(cwd, 'src', atomPath)
  let action: ImproveAction = 'regen-computed-faces'
  let applied = false
  let sealCreditEb: number | undefined
  let pathEntry: PathCanonicalEntry | undefined
  const gate = strictApplyImproveGate(violation, action)
  if (!gate.allowed) {
    return {
      id: improveResultId(violation.id, action),
      violationId: violation.id,
      source: violation.source,
      atomPath,
      accountCode: violation.accountCode,
      action,
      applied: false,
      gated: true,
      reason: gate.reason,
    }
  }

  if (violation.source === 'path-follow') {
    action = 'path-ledger-record'
    const seq = opts.pathSeq ?? 0
    if (!dryRun) {
      pathEntry = recordOnPath(
        atomPath === 'matrix' ? 'path' : atomPath,
        { kind: 'improve.path-follow', violationId: violation.id },
        at,
        opts.pathLedger?.[opts.pathLedger.length - 1]?.entryUuid ?? null,
        seq,
      )
    }
    applied = true
  } else if (needsTestStub(violation)) {
    action = 'trinity-test-stub'
    const testPath = join(dir, 'test.ts')
    const indexPath = join(dir, 'index.ts')
    const skillPath = join(dir, 'SKILL.md')
    if (!existsSync(skillPath)) {
      return {
        id: improveResultId(violation.id, action),
        violationId: violation.id,
        source: violation.source,
        atomPath,
        accountCode: violation.accountCode,
        action,
        applied: false,
        gated: true,
        reason: 'no SKILL.md — cannot author trinity',
      }
    }
    if (!dryRun) mkdirSync(dir, { recursive: true })
    if (!existsSync(indexPath)) {
      if (!dryRun) writeFileSync(indexPath, trinityIndexStub(atomPath), 'utf8')
    }
    if (existsSync(testPath)) {
      applied = true
    } else if (!dryRun) {
      writeFileSync(testPath, trinityTestStub(atomPath), 'utf8')
      applied = true
    } else {
      applied = true
    }
    if (applied && !dryRun) {
      materializeComputedFacesForPathsStable([atomPath], cwd)
    }
  } else if (violation.source === 'entanglement' && atomPath === 'matrix') {
    action = 'matrix-fold-batch'
    if (!dryRun) {
      const batch = applySessionLawBatch(['core'], cwd)
      applied = batch.matrixGenerated && batch.errors.length === 0
    } else {
      applied = true
    }
  } else {
    action = 'regen-computed-faces'
    if (!dryRun && existsSync(join(dir, 'SKILL.md'))) {
      materializeComputedFacesForPathsStable([atomPath], cwd)
      applied = true
    } else if (dryRun) {
      applied = true
    }
  }

  if (violation.source === 'gap-eb' && violation.eb && violation.eb > 0) {
    action = applied ? 'seal-credit-eb' : action
    sealCreditEb = violation.eb
    postSealOnPath(violation.accountCode, sealCreditEb)
  } else if (applied && violation.source === 'gap-eb') {
    sealCreditEb = violation.eb ?? 1
    postSealOnPath(violation.accountCode, sealCreditEb)
    action = 'seal-credit-eb'
  }

  const monitorEntry = recordImproveOnMonitor(
    {
      kind: 'improve.applied',
      violationId: violation.id,
      action,
      dryRun,
      sealCreditEb,
    },
    at,
  )

  const receipt =
    applied && !dryRun
      ? issueImproveReceipt(violation, action, 'allow', actor, at, tamperOpts)
      : undefined
  const tamperCostLog2 =
    receipt !== undefined
      ? tamperCostForImproveReceipt({
          receiptSeq: receipt.seq,
          pathLedgerDepth: tamperOpts.pathLedgerDepth ?? 0,
          completedWaves: tamperOpts.completedWaves,
        })
      : undefined

  return {
    id: improveResultId(violation.id, action),
    violationId: violation.id,
    source: violation.source,
    atomPath,
    accountCode: violation.accountCode,
    action,
    applied,
    gated: false,
    sealCreditEb,
    tamperCostLog2,
    receipt,
    pathEntry,
    monitorEntry,
  }
}
