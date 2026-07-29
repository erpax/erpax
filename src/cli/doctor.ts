/**
 * cli/doctor — quick health: stray-ts vs baseline, efficiency pass, corpus entry.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { createRequire } from 'node:module'
import { formatCleanSummary } from '@/apply/clean'
import { formatAutomateSummary } from '@/apply/automate'
import { detectStalledProcesses, formatStallTable, killStalledProcesses } from '@/apply/stall-watch'
import { realtimeDoctorLine } from '@/agent/communication/realtime'
import { formatDoctorInventorySection } from '@/agent/inventory'
import { emitInventorySnapshot } from '@/agent/inventory/emit'
import { INVENTORY_DOCTOR_SCAN_LIMIT } from '@/agent/inventory'
import { loadEfficiencyStore } from '@/apply/efficiency'
import { freeEnergyFromEntropy } from '@/entropy'
import { computedBaseline } from '@/law/folder/baseline'
import { rulesOf, strayTsViolations } from '@/rules'
import { deriveCorpusAnalytics } from '@/readme/compute'
import {
  ERPAX_SKILL_ENTRY,
  ERPAX_SKILL_ENTRY_CONTENT_UUID,
  wireFromRepoUrl,
} from '@/skill/wire'
import { quantumEntangledChannelCount } from '@/quantum/context'
import { quantumModeDefault } from '@/quantum/bindings'
import { linearGapCount, linearLogicCount } from '@/quantum'
import { formatDoctorPackageApprovalSection } from '@/apply/approval'
import { formatPayloadApprovalLine, payloadApprovalGate } from '@/payload/approval'

export interface DoctorReport {
  readonly payload: ReturnType<typeof payloadApprovalGate>
  readonly strayTs: { readonly count: number; readonly baseline: number; readonly ok: boolean }
  readonly efficiency: {
    readonly passCount: number
    readonly lastPass: string | null
    readonly lastAt: string | null
  }
  readonly entrySkill: {
    readonly path: string
    readonly contentUuid: string
    readonly exists: boolean
  }
  readonly clean: string | null
  readonly automate: string | null
  readonly entropy: {
    readonly netEb: number
    readonly freeEnergyBits: number
    readonly scaleTowardZeroPct: number
  } | null
  readonly quantum: {
    readonly mode: 'quantum' | 'classical'
    readonly entangledChannels: number
    readonly linearGaps: number
    readonly linearLogic: number
  }
  readonly phraseWithoutDiamond: {
    readonly count: number
    readonly baseline: number
    readonly ok: boolean
  }
  /** Law 44 — local process has a fresh published dry-proof (warn only on quick doctor). */
  readonly dryProof: { readonly ok: boolean; readonly reasons: readonly string[] }
}

/**
 * QUICK is the default and the promise ("doctor — quick repo health snapshot"): the full corpus
 * analytics derivation (`deriveCorpusAnalytics`, measured past rung 5 even outside vitest) is
 * `deep`-only — the erpax doctor corpus lane owns it. A quick snapshot that runs a CI-sized job
 * is a command past the ladder, and the ladder says split, never raise.
 */
export function collectDoctorReport(cwd: string = process.cwd(), opts?: { readonly deep?: boolean }): DoctorReport {
  const strayCount = strayTsViolations(cwd).length
  const strayBaseline = computedBaseline('stray-ts', cwd)
  const store = loadEfficiencyStore(cwd)
  const last = store.passes.length ? store.passes[store.passes.length - 1]! : null
  const wire = wireFromRepoUrl('https://github.com/erpax/erpax')
  const entryPath = wire.ok ? wire.entryPoint : ERPAX_SKILL_ENTRY
  const snapshot = rulesOf(cwd)
  const violationCount = snapshot.axes.reduce((s, a) => s + a.violations, 0)
  let entropy: DoctorReport['entropy'] = null
  if (opts?.deep) {
    const corpus = deriveCorpusAnalytics(cwd)
    const lastMetrics = last?.metrics
    const freeEnergy = freeEnergyFromEntropy({
      entropyEb: corpus.entropy.netEntropyEb,
      violationCount,
      workTamperProduct: lastMetrics?.workTamperProduct ?? 0,
      totalSealEb: corpus.entropy.totalSealEb,
    })
    entropy = {
      netEb: corpus.entropy.netEntropyEb,
      freeEnergyBits: freeEnergy.freeEnergyBits,
      scaleTowardZeroPct: freeEnergy.scaleTowardZeroPct,
    }
  }

  let dryProof: DoctorReport['dryProof'] = { ok: false, reasons: ['dry-proof checker unavailable'] }
  try {
    // Deferred — dry-proof pulls invariant/MCP surface; quick doctor still stays under rung.
    const { checkDryProofPublished } = createRequire(import.meta.url)('@/proof/dry-proof') as typeof import('@/proof/dry-proof')
    const r = checkDryProofPublished(process.env.ERPAX_ORIGIN ?? 'https://erpax.ceci.workers.dev')
    dryProof = { ok: r.ok, reasons: r.reasons }
  } catch {
    /* leave unavailable */
  }

  return {
    payload: payloadApprovalGate({ cwd }),
    strayTs: {
      count: strayCount,
      baseline: strayBaseline,
      ok: strayCount <= strayBaseline,
    },
    efficiency: {
      passCount: store.passes.length,
      lastPass: last?.passId ?? null,
      lastAt: last?.capturedAt ?? null,
    },
    entrySkill: {
      path: entryPath,
      contentUuid: ERPAX_SKILL_ENTRY_CONTENT_UUID,
      exists: existsSync(join(cwd, entryPath)),
    },
    clean: formatCleanSummary(cwd),
    automate: formatAutomateSummary(cwd),
    entropy,
    quantum: {
      mode: quantumModeDefault() ? 'quantum' : 'classical',
      entangledChannels: quantumEntangledChannelCount(),
      linearGaps: linearGapCount(cwd),
      linearLogic: linearLogicCount(cwd),
    },
    phraseWithoutDiamond: {
      count: snapshot.userWordUnproven.violationCount,
      baseline: computedBaseline('phrase-without-diamond', cwd),
      ok: snapshot.userWordUnproven.violationCount <= computedBaseline('phrase-without-diamond', cwd),
    },
    dryProof,
  }
}

export function formatDoctorReport(report: DoctorReport): string {
  const lines: string[] = ['erpax doctor — quick health\n']
  lines.push(formatDoctorPackageApprovalSection())
  lines.push(formatPayloadApprovalLine(report.payload))
  const strayMark = report.strayTs.ok ? 'ok' : 'OVER baseline'
  lines.push(
    `  stray-ts       ${report.strayTs.count} (baseline ≤${report.strayTs.baseline}) — ${strayMark}`,
  )
  if (report.efficiency.passCount === 0) {
    lines.push('  efficiency     no passes recorded yet (run pnpm erpax readme waves)')
  } else {
    lines.push(
      `  efficiency     ${report.efficiency.passCount} pass(es); last: ${report.efficiency.lastPass} @ ${report.efficiency.lastAt}`,
    )
  }
  const skillMark = report.entrySkill.exists ? 'present' : 'MISSING'
  lines.push(
    `  corpus entry   ${report.entrySkill.path} (${report.entrySkill.contentUuid.slice(0, 8)}…) — ${skillMark}`,
  )
  if (report.clean) {
    lines.push(`  clean          ${report.clean}`)
  } else {
    lines.push('  clean          no pass yet (run pnpm erpax clean)')
  }
  if (report.automate) {
    lines.push(`  automate       ${report.automate}`)
  } else {
    lines.push('  automate       no pass yet (run pnpm erpax automate)')
  }
  lines.push(
    `  mode           ${report.quantum.mode} · entangled channels ${report.quantum.entangledChannels} · linear-gap ${report.quantum.linearGaps} · linear-logic ${report.quantum.linearLogic}`,
  )
  lines.push(
    report.entropy
      ? `  entropy        net ${report.entropy.netEb} eb · F ${report.entropy.freeEnergyBits} bits · ${report.entropy.scaleTowardZeroPct}% toward zero`
      : '  entropy        deferred (deep scan) — run: pnpm erpax doctor corpus',
  )
  const phraseMark = report.phraseWithoutDiamond.ok ? 'ok' : 'OVER baseline'
  lines.push(
    `  phrase-without-diamond ${report.phraseWithoutDiamond.count} (baseline ≤${report.phraseWithoutDiamond.baseline}) — ${phraseMark}`,
  )
  const dryMark = report.dryProof.ok ? 'ok' : 'GAP'
  lines.push(
    `  dry-proof      ${dryMark}${report.dryProof.ok ? '' : ` — ${report.dryProof.reasons[0] ?? 'unpublished'} (pnpm erpax doctor dry-proof)`}`,
  )
  lines.push(formatDoctorInventorySection())
  lines.push(`  ${realtimeDoctorLine()}`)
  lines.push('')
  lines.push('Next: pnpm erpax approve · pnpm erpax automate · pnpm erpax rules check · pnpm check')
  return lines.join('\n')
}

export function runDoctorStalls(): number {
  const rows = detectStalledProcesses()
  console.log(formatStallTable(rows))
  if (process.argv.includes('--kill')) {
    const doomed = killStalledProcesses(rows)
    console.log(
      doomed.length
        ? `doctor:stalls — SIGTERM sent to ${doomed.length} dead/zombie pid(s): ${doomed.map((r) => r.pid).join(', ')}`
        : 'doctor:stalls — nothing dead or zombie; the living are spared.',
    )
  }
  return 0
}

/** doctor corpus — the sealed corpus gap audit: shapes · speaking · coverage · theorems.
 * Computes once, seals node_modules/.cache/erpax/audit.json — the matrix is the cache. */
export async function runDoctorCorpus(cwd: string = process.cwd()): Promise<number> {
  const all = await import('@/collections')
  const { auditCorpus, foldCollectionLifecycle, shapeRatchetVerdict, ROSETTA_BASELINE } = await import('@/factory/collection-factory')
  const { theoremReceipts } = await import('@/standards/registry')
  const configs = Object.values(all)
    .filter(
      (c): c is import('payload').CollectionConfig =>
        !!c && typeof c === 'object' && 'slug' in c && 'fields' in c,
    )
    .map((c) => foldCollectionLifecycle(c))
  const audit = auditCorpus(configs)
  const report = { ...audit, theoremAxesSatisfied: Object.keys(theoremReceipts(cwd)).length, at: new Date().toISOString() }
  const path = join(cwd, 'node_modules', '.cache', 'erpax', 'audit.json')
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(report, null, 2) + '\n')
  console.log(
    `doctor:corpus — ${report.collections} collections · ${report.signatures} signatures · speaking ${report.speaking}/${report.collections} · theorem axes ${report.theoremAxesSatisfied}/8`,
  )
  console.log(
    `  bare ${report.bare.length} · input-heavy hookless ${report.inputHeavyHookless.length} · receipt → ${path}`,
  )
  console.log(
    `  rosetta-purge — compression headroom ${audit.compressionHeadroom.toFixed(1)}x · ${audit.collapseClusters.length} collapse cluster(s):`,
  )
  for (const c of audit.collapseClusters.slice(0, 5)) {
    console.log(`    ${c.members.length} × {${c.signature}} — e.g. ${c.members.slice(0, 3).join(', ')}`)
  }
  // Fail-closed ratchet — this exit code is the gate lane `corpus` in cli/gate.ts.
  const ratchet = shapeRatchetVerdict(
    { collections: audit.collections, basisOccupancy: audit.signatures },
    ROSETTA_BASELINE,
  )
  if (!ratchet.ok) {
    console.error(
      `✖ rosetta ratchet — basis GREW past baseline (${ratchet.detail}). A new collection must fold an existing one down, not add scatter.`,
    )
    return 1
  }
  console.log(`  ✓ rosetta ratchet — within baseline (${ratchet.detail}).`)
  const { atomBasisScan, rosettaMath, foldPlan, standardsDimensions, proseDecode } = await import('@/readme/compute')
  const b = atomBasisScan(cwd)
  console.log(
    `  atom basis — ${b.basis} generators (keep) · ${b.combinations} combinations (${(b.combinationShare * 100).toFixed(0)}% derivable: ${b.vocabOnly} prose · ${b.barrelOnly} barrel · ${b.composeNoLogic} compose) of ${b.atoms} atoms.`,
  )
  const rm = rosettaMath(cwd)
  const deepest = rm.generative[rm.generative.length - 1]!
  console.log(
    `  rosetta math — EFFICIENT: ${rm.compression.toFixed(1)}× compression (store ${rm.storedRosetta} basis, not ${rm.storedNaive}; ${(rm.savings * 100).toFixed(0)}% saved, optimal-for-derivable ${rm.optimalForDerivable ? '✓' : '✗'}) · INFINITE: ${rm.basis} generators fold to ${deepest.messages.toExponential(1)} messages by depth ${deepest.leaves}, growth ×${rm.growthRatio.toFixed(0)}/level → ${rm.infinite ? 'unbounded ✓' : '✗'}. Basis+fold IS the optimal-and-infinite representation (seed is the incompressible floor).`,
  )
  const pd = proseDecode(cwd)
  console.log(
    `  prose decode — ${pd.boilerplate} boilerplate-classified · ${pd.regenerable} regen PROVEN byte-for-byte (foldable — the collision generator emits their body exactly; the ${pd.boilerplate - pd.regenerable} unproven stay KEEP) · ${pd.unique} unique (keep) of ${pd.vocabOnly} prose${pd.candidates.length > 0 ? ` — e.g. ${pd.candidates.slice(0, 5).join(', ')}` : ''}`,
  )
  const families = foldPlan(cwd)
  const foldable = families.reduce((s, f) => s + f.members.length, 0)
  console.log(
    `  fold plan — ${families.length} safe foldable ${families.length === 1 ? 'family' : 'families'} (${foldable} atoms = parent⊕suffix, orphaned):`,
  )
  for (const f of families.slice(0, 6)) {
    console.log(`    ${f.members.length} × ${f.parent}⊕ (${f.kind}) — ${f.members.slice(0, 4).join(', ')}`)
  }
  if (families.length === 0) console.log('    none — the lexical fold is exhausted (the remainder needs the semantic decode).')
  const sd = standardsDimensions(cwd)
  const cells = sd.dimensions.map((x) => `${x.position}/${x.ray} ${(x.coverage * 100).toFixed(0)}%`).join(' · ')
  console.log(`  7-dim standards — ${cells}`)
  console.log(
    `    invariant (standards in all 7 rays) — ${sd.metInAll ? '✓ MET' : '✖ UNMET'}${sd.offRing > 0 ? ` · ${sd.offRing} atoms off-ring (no computed horo)` : ' · every atom on-ring'}`,
  )
  return 0
}

export function runDoctorDryProof(): number {
  console.log('erpax doctor dry-proof — Law 44 publish gate\n')
  try {
    const { checkDryProofPublished, getCurrentProofBundle } = createRequire(import.meta.url)(
      '@/proof/dry-proof',
    ) as typeof import('@/proof/dry-proof')
    const origin = process.env.ERPAX_ORIGIN ?? 'https://erpax.ceci.workers.dev'
    const r = checkDryProofPublished(origin)
    const current = getCurrentProofBundle()
    console.log(`  published   ${current ? 'yes' : 'no'}`)
    console.log(`  ok          ${r.ok}`)
    if (current) {
      console.log(`  uuid        ${current.contentUuid.slice(0, 12)}…`)
      console.log(`  generated   ${current.generatedAt}`)
    }
    for (const reason of r.reasons) console.log(`  · ${reason}`)
    if (!r.ok) {
      console.log('\n  next: buildDryProofBundle → publishDryProofBundle → re-run; or pnpm erpax tip')
    }
    return r.ok ? 0 : 1
  } catch (e) {
    console.error(`  dry-proof unavailable: ${e instanceof Error ? e.message : String(e)}`)
    return 1
  }
}

export function runDoctor(cwd: string = process.cwd(), sub?: string): number | Promise<number> {
  if (sub === 'stalls') return runDoctorStalls()
  if (sub === 'corpus') return runDoctorCorpus(cwd)
  if (sub === 'dry-proof' || sub === 'dryproof') return runDoctorDryProof()
  const report = collectDoctorReport(cwd)
  console.log(formatDoctorReport(report))
  try {
    emitInventorySnapshot(cwd, INVENTORY_DOCTOR_SCAN_LIMIT)
  } catch {
    /* emit-only — doctor still reports when snapshot dir missing */
  }
  return report.entrySkill.exists ? 0 : 1
}
