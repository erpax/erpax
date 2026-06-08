/**
 * cli/doctor — quick health: stray-ts vs baseline, efficiency pass, entry skill.
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { formatCleanSummary } from '@/apply/clean'
import { loadEfficiencyStore } from '@/apply/efficiency'
import { rulesOf } from '@/rules'
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
}

export function collectDoctorReport(cwd: string = process.cwd()): DoctorReport {
  const snapshot = rulesOf(cwd, { force: true })
  const strayAxis = snapshot.axes.find((a) => a.axis === 'stray-ts')
  const store = loadEfficiencyStore(cwd)
  const last = store.passes.length ? store.passes[store.passes.length - 1]! : null
  const wire = wireFromRepoUrl('https://github.com/erpax/erpax')
  const entryPath = wire.ok ? wire.entryPoint : ERPAX_SKILL_ENTRY

  return {
    strayTs: {
      count: strayAxis?.violations ?? snapshot.strayTs.length,
      baseline: strayAxis?.baseline ?? 0,
      ok: (strayAxis?.violations ?? 0) <= (strayAxis?.baseline ?? 0),
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
  lines.push('')
  lines.push('Next: pnpm erpax rules check · pnpm check')
  return lines.join('\n')
}

export function runDoctor(cwd: string = process.cwd()): number {
  const report = collectDoctorReport(cwd)
  console.log(formatDoctorReport(report))
  return report.entrySkill.exists ? 0 : 1
}
