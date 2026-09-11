/**
 * gate/parity — the three definitions of "the gate" must be one. See ./SKILL.md.
 *
 * @standard ISO/IEC 25010:2023 §5.6 maintainability — one truth, one address
 * @audit ISO-19011:2018 §6.4 audit-evidence — a check that did not run produced none
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GATE_LANES } from '@/cli/gate'

/** A surface that claims to run the gate, and the file that says what it runs. */
export interface GateSurface {
  readonly name: string
  readonly file: string
}

/** The two surfaces besides `pnpm check`. DECLARED, not exported — see ./SKILL.md. */
const GATE_SURFACES: readonly GateSurface[] = [
  { name: 'pre-push', file: '.husky/pre-push' },
  { name: 'ci', file: '.github/workflows/ci.yml' },
]

/** A surface's EXECUTABLE text — full-line comments removed; a lane named only in a comment is
 *  prose about the gate, not the gate. Over-reports coverage, never invents it. See ./SKILL.md. */
export const executableText = (text: string): string =>
  text
    .split('\n')
    .filter((l) => !/^\s*#/.test(l))
    .join('\n')

export interface LaneGap {
  readonly lane: string
  readonly command: string
  readonly missingFrom: readonly string[]
}

/** Lanes the authority defines that a surface does not run — matched on the lane's COMMAND, a fact
 *  about text. Over-reports a gap, never invents coverage. See ./SKILL.md. */
export function laneGaps(cwd: string = process.cwd()): LaneGap[] {
  const surfaces = GATE_SURFACES.map((s) => {
    let text = ''
    try {
      text = executableText(readFileSync(join(cwd, s.file), 'utf8'))
    } catch {
      text = ''
    }
    return { ...s, text }
  })
  const gaps: LaneGap[] = []
  for (const [lane, command] of GATE_LANES) {
    const missingFrom = surfaces.filter((s) => !s.text.includes(command)).map((s) => s.name)
    if (missingFrom.length > 0) gaps.push({ lane, command, missingFrom })
  }
  return gaps
}

/** How many (lane, surface) pairs are unrun — the drift, as one number. */
export const driftCount = (cwd: string = process.cwd()): number =>
  laneGaps(cwd).reduce((n, g) => n + g.missingFrom.length, 0)

/** Fails closed when the drift GROWS. The ceiling ratchets down as a surface picks a lane up. */
export function assertGateParity(cwd: string = process.cwd(), ceiling: number): void {
  const n = driftCount(cwd)
  if (n <= ceiling) return
  const lines = laneGaps(cwd).map((g) => `  ${g.lane.padEnd(14)} not run by ${g.missingFrom.join(' · ')}  (${g.command})`)
  throw new Error(`✖ gate/parity — ${n} lane(s) the authority defines and a surface does not run (ceiling ${ceiling}):\n${lines.join('\n')}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const gaps = laneGaps()
  console.log(`gate/parity — ${GATE_LANES.length} lanes · ${driftCount()} unrun (lane, surface) pair(s)\n`)
  for (const g of gaps) console.log(`  ${g.lane.padEnd(14)} missing from ${g.missingFrom.join(' · ')}`)
  const covered = GATE_LANES.length - gaps.filter((g) => g.missingFrom.length === GATE_SURFACES.length).length
  console.log(`\n  every surface runs ${GATE_LANES.length - gaps.length} of ${GATE_LANES.length}; at least one runs ${covered}`)
}

/** @index-cross.foldback child=gate/parity parent=gate — this cross folds back into its parent. */
