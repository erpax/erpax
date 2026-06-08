/**
 * cli/doctor — quick health: stray-ts vs baseline, efficiency pass, entry skill.
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { formatCleanSummary } from '@/apply/clean'
import { formatAutomateSummary } from '@/apply/automate'
import { detectStalledProcesses, formatStallTable } from '@/apply/stall-watch'
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

export interface DoctorReport {
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
  }
}

export function formatDoctorReport(report: DoctorReport): string {
  const lines: string[] = ['erpax doctor — quick health\n']
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
    `  entry skill    ${report.entrySkill.path} (${report.entrySkill.contentUuid.slice(0, 8)}…) — ${skillMark}`,
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
    `  entropy        net ${report.entropy.netEb} eb · F ${report.entropy.freeEnergyBits} bits · ${report.entropy.scaleTowardZeroPct}% toward zero`,
  )
  lines.push(formatDoctorInventorySection())
  lines.push('')
  lines.push('Next: pnpm erpax automate · pnpm erpax rules check · pnpm check')
  return lines.join('\n')
}

export function runDoctorStalls(): number {
  console.log(formatStallTable(detectStalledProcesses()))
  return 0
}

export function runDoctor(cwd: string = process.cwd(), sub?: string): number {
  if (sub === 'stalls') return runDoctorStalls()
  const report = collectDoctorReport(cwd)
  console.log(formatDoctorReport(report))
  try {
    emitInventorySnapshot(cwd, INVENTORY_DOCTOR_SCAN_LIMIT)
  } catch {
    /* emit-only — doctor still reports when snapshot dir missing */
  }
  return report.entrySkill.exists ? 0 : 1
}
