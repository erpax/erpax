/**
 * cli/rules-check — rules gate with failure summary (top axes + fix commands).
 */
import { spawnSync } from 'node:child_process'
import { assertRulesHold } from '@/rules'

const TSX = 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx'

/** Axis → suggested erpax fix (ordered by typical session impact). */
export const AXIS_FIX_HINTS: Record<string, string> = {
  'stray-ts': 'pnpm erpax rules ratchet  (nest stray .ts into child atoms first)',
  'multi-segment-file': 'pnpm erpax rules ratchet  (nest hyphen/dot siblings)',
  'folder-name': 'pnpm erpax rules ratchet',
  'folder-trinity': 'pnpm erpax readme waves  (regen faces after trinity fixes)',
  'alphanumeric-name': 'pnpm erpax rules ratchet',
  'accounting-structure': 'pnpm erpax rules ratchet',
  'forbidden-intermediate': 'pnpm erpax rules ratchet',
  'diamond-membership': 'pnpm erpax readme waves',
  'import-purity': 'pnpm erpax lint imports',
  'matrix-crack': 'pnpm erpax corpus matrix',
  'bypass-math': 'pnpm erpax rules ratchet',
  'logic-concentration': 'pnpm erpax apply session',
  'word-matter': 'pnpm erpax rules ratchet',
  'word-without-code': 'pnpm erpax apply session',
  'word-without-logic': 'pnpm erpax corpus words',
  'word-incomplete-diamond': 'pnpm erpax readme waves',
}

export interface FailedAxis {
  readonly axis: string
  readonly violations: number
  readonly baseline: number
  readonly fix: string
}

export function topFailedAxes(cwd: string = process.cwd(), limit = 3): FailedAxis[] {
  const verdict = assertRulesHold(cwd)
  return verdict.guardians
    .filter((g) => !g.ok)
    .map((g) => {
      const snapAxis = verdict.snapshot.axes.find((a) => a.axis === g.axis)
      return {
        axis: g.axis,
        violations: snapAxis?.violations ?? g.violations,
        baseline: snapAxis?.baseline ?? g.baseline,
        fix: AXIS_FIX_HINTS[g.axis] ?? 'pnpm erpax rules ratchet',
      }
    })
    .sort((a, b) => b.violations - a.violations)
    .slice(0, limit)
}

export function formatRulesFailureSummary(axes: readonly FailedAxis[]): string {
  if (!axes.length) return ''
  const lines = ['\nrules check — top failures:']
  for (const a of axes) {
    lines.push(`  ✗ ${a.axis}: ${a.violations} (baseline ≤${a.baseline})`)
    lines.push(`    fix: ${a.fix}`)
  }
  lines.push('\nFull registry: pnpm erpax rules  (no --check)')
  return lines.join('\n')
}

export function runRulesCheck(cwd: string = process.cwd()): number {
  const r = spawnSync(`${TSX} src/rules/index.ts --check`, {
    shell: true,
    stdio: 'inherit',
    cwd,
  })
  const code = r.status ?? 1
  if (code !== 0) {
    const failed = topFailedAxes(cwd)
    const summary = formatRulesFailureSummary(failed)
    if (summary) console.error(summary)
  }
  return code
}
