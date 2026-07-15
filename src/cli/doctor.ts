/**
 * cli/doctor — quick health: stray-ts vs baseline, efficiency pass, corpus entry.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { formatCleanSummary } from '@/apply/clean'
import { formatAutomateSummary } from '@/apply/automate'
import { detectStalledProcesses, formatStallTable, killStalledProcesses } from '@/apply/stall-watch'
import { realtimeDoctorLine } from '@/agent/communication/realtime'
import { formatDoctorInventorySection } from '@/agent/inventory'
import { emitInventorySnapshot } from '@/agent/inventory/emit'
import { INVENTORY_DOCTOR_SCAN_LIMIT } from '@/agent/inventory'
import { loadEfficiencyStore } from '@/apply/efficiency'
import { freeEnergyFromEntropy } from '@/accounting/entropy-proof'
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
  }
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
}

export function collectDoctorReport(cwd: string = process.cwd()): DoctorReport {
  const strayCount = strayTsViolations(cwd).length
  const strayBaseline = computedBaseline('stray-ts', cwd)
  const store = loadEfficiencyStore(cwd)
  const last = store.passes.length ? store.passes[store.passes.length - 1]! : null
  const wire = wireFromRepoUrl('https://github.com/erpax/erpax')
  const entryPath = wire.ok ? wire.entryPoint : ERPAX_SKILL_ENTRY
  const snapshot = rulesOf(cwd, { force: true })
  const violationCount = snapshot.axes.reduce((s, a) => s + a.violations, 0)
  const corpus = deriveCorpusAnalytics(cwd)
  const lastMetrics = last?.metrics
  const freeEnergy = freeEnergyFromEntropy({
    entropyEb: corpus.entropy.netEntropyEb,
    violationCount,
    workTamperProduct: lastMetrics?.workTamperProduct ?? 0,
    totalSealEb: corpus.entropy.totalSealEb,
  })

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
    entropy: {
      netEb: corpus.entropy.netEntropyEb,
      freeEnergyBits: freeEnergy.freeEnergyBits,
      scaleTowardZeroPct: freeEnergy.scaleTowardZeroPct,
    },
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
    `  entropy        net ${report.entropy.netEb} eb · F ${report.entropy.freeEnergyBits} bits · ${report.entropy.scaleTowardZeroPct}% toward zero`,
  )
  const phraseMark = report.phraseWithoutDiamond.ok ? 'ok' : 'OVER baseline'
  lines.push(
    `  phrase-without-diamond ${report.phraseWithoutDiamond.count} (baseline ≤${report.phraseWithoutDiamond.baseline}) — ${phraseMark}`,
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
  const { auditCorpus, foldCollectionLifecycle, ROSETTA_BASELINE } = await import('@/factory/collection-factory')
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
  // Fail-closed ratchet — the enforcement the SKILL named as debt: reports became a GATE.
  const grew = audit.collections > ROSETTA_BASELINE.collections || audit.signatures > ROSETTA_BASELINE.signatures
  if (grew) {
    console.error(
      `✖ rosetta ratchet — basis GREW past baseline (collections ${audit.collections}/${ROSETTA_BASELINE.collections} · signatures ${audit.signatures}/${ROSETTA_BASELINE.signatures}). A new collection must fold an existing one down, not add scatter.`,
    )
    return 1
  }
  console.log(
    `  ✓ rosetta ratchet — within baseline (${audit.collections}/${ROSETTA_BASELINE.collections} collections · ${audit.signatures}/${ROSETTA_BASELINE.signatures} signatures).`,
  )
  const { atomBasisScan, foldPlan, standardsDimensions, proseDecode } = await import('@/readme/compute')
  const b = atomBasisScan(cwd)
  console.log(
    `  atom basis — ${b.basis} generators (keep) · ${b.combinations} combinations (${(b.combinationShare * 100).toFixed(0)}% derivable: ${b.vocabOnly} prose · ${b.barrelOnly} barrel · ${b.composeNoLogic} compose) of ${b.atoms} atoms.`,
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

export function runDoctor(cwd: string = process.cwd(), sub?: string): number | Promise<number> {
  if (sub === 'stalls') return runDoctorStalls()
  if (sub === 'corpus') return runDoctorCorpus(cwd)
  const report = collectDoctorReport(cwd)
  console.log(formatDoctorReport(report))
  try {
    emitInventorySnapshot(cwd, INVENTORY_DOCTOR_SCAN_LIMIT)
  } catch {
    /* emit-only — doctor still reports when snapshot dir missing */
  }
  return report.entrySkill.exists ? 0 : 1
}
