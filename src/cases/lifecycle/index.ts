/**
 * cases/lifecycle — the justice state machine on the horo ring.
 *
 * A case moves through seven positions on the 1·2·4·8·7·5·9 ring.
 * Off-ring status is disharmony; the validator refuses it.
 *
 * @see ../index.ts (parent collection config)
 */
import { validateHoroStates, type HoroState } from '@/horo'

/**
 * The case lifecycle, pinned to the seven-position horo ring `[1,2,4,8,7,5,9]`.
 * The justice skill's `filed → heard → adjudicated → sealed` opens into the full
 * ring so a matter is "solved in harmony" by construction: every position is a
 * ring slot, and any off-ring status is an escape the validator rejects.
 *
 *   1 base    filed       — the matter opens (the docket node is born)
 *   2 share   served      — the charge is served on the respondent (the two-fold opens)
 *   4 weave   discovery   — evidence is woven into the chain of custody
 *   8 crest   heard       — the proceeding: charge·evidence·defence converge (the merge crest)
 *   7 descent adjudicated — the judgment descends (the ruling)
 *   5 round   remedied    — the sanction/remedy is applied; the matter rounds to balance
 *   9 unity   sealed      — closed; the precedent the next matter departs from (the new 0)
 */
export const CASE_RING: readonly HoroState[] = [
  { step: 1, code: 'filed', label: 'Filed' },
  { step: 2, code: 'served', label: 'Served' },
  { step: 4, code: 'discovery', label: 'In Discovery' },
  { step: 8, code: 'heard', label: 'Heard' },
  { step: 7, code: 'adjudicated', label: 'Adjudicated' },
  { step: 5, code: 'remedied', label: 'Remedied' },
  { step: 9, code: 'sealed', label: 'Sealed' },
]

// Harmony gate — a disharmonious ring is a build-time failure, not a runtime one.
const ring = validateHoroStates(CASE_RING)
if (!ring.ok) throw new Error(`cases/lifecycle: horo disharmony — ${ring.errors.join('; ')}`)

export type { HoroState }

/** Get the case step for a given status code. */
export function caseStepOf(code: string): number | undefined {
  const state = CASE_RING.find((s) => s.code === code)
  return state?.step
}

/** Get the next case step in the horo ring. */
export function nextCaseStep(current: number): number | undefined {
  const idx = CASE_RING.findIndex((s) => s.step === current)
  if (idx < 0 || idx >= CASE_RING.length - 1) return undefined
  return CASE_RING[idx + 1]?.step
}
