/**
 * land — the twin of Arrival.lean, and the pipeline's next step.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { agreed, contradicted, landed, nextStep, readingOf, reconcilable, refused, type Check } from '@/utilities/land'

const B = [false, true]
const pass = (name: string): Check => ({ name, bucket: 'pass' })

describe('land — the twin of Arrival.lean', () => {
  const lean = readFileSync(join(import.meta.dirname, '..', 'verify', 'lean', 'Arrival.lean'), 'utf8')

  it('names the theorems it mirrors', () => {
    for (const name of ['landed_iff', 'unmeasured_never_lands', 'no_landing_with_a_failure', 'no_landing_while_pending', 'the_green_path_lands', 'a_contradiction_never_lands', 'exactly_one_state', 'live_alone_is_not_agreement'])
      expect(lean, name).toMatch(new RegExp(`theorem ${name}\\b`))
  })

  it('landed_iff over all eight cases: judged, nothing failed, nothing pending', () => {
    for (const j of B) for (const f of B) for (const p of B) expect(landed(j, f, p)).toBe(j && !f && !p)
    expect(landed(true, false, false)).toBe(true)
  })

  it('exactly_one_state: a check reading and a live reading land in exactly one of agreed, refused, contradicted, or a plain wait', () => {
    for (const f of B) for (const l of B) {
      const states = [agreed(f, l), refused(f, l), contradicted(f, l)].filter(Boolean).length
      expect(states).toBe(!f && !l ? 0 : 1)
    }
    expect(agreed(true, true)).toBe(false) // live_alone_is_not_agreement
  })
})

describe('land — the next step for a PR', () => {
  it('stops on a failed or cancelled required check, whatever else holds', () => {
    expect(nextStep([pass('Lint'), { name: 'Tests', bucket: 'fail' }], 'CLEAN')).toBe('stop')
    expect(nextStep([{ name: 'Tests', bucket: 'cancel' }], 'BEHIND')).toBe('stop')
  })

  it('reconciles conflicts, updates a branch behind main, and waits on a run still going', () => {
    expect(nextStep([pass('Lint')], 'DIRTY')).toBe('reconcile')
    expect(nextStep([pass('Lint')], 'BEHIND')).toBe('update')
    expect(nextStep([pass('Lint'), { name: 'Tests', bucket: 'pending' }], 'BLOCKED')).toBe('wait')
  })

  it('never merges an unmeasured PR: no judged check is not a pass', () => {
    expect(readingOf([])).toEqual({ judged: false, failed: false, pending: false })
    expect(nextStep([], 'CLEAN')).toBe('wait')
    expect(nextStep([{ name: 'x', bucket: 'skipping' }], 'CLEAN')).toBe('wait')
  })

  it('merges a landed PR GitHub calls mergeable, and stops on a block the checks do not explain', () => {
    expect(nextStep([pass('Lint'), pass('Tests')], 'CLEAN')).toBe('merge')
    expect(nextStep([pass('Lint'), pass('Tests')], 'UNSTABLE')).toBe('merge')
    expect(nextStep([pass('Lint'), pass('Tests')], 'BLOCKED')).toBe('stop')
    expect(nextStep([pass('Lint'), pass('Tests')], 'UNKNOWN')).toBe('wait')
  })

  it('settles a conflict only in generated files', () => {
    expect(reconcilable(['README.md', 'src/payload-types.ts', 'docs/STANDARDS_INDEX.md'])).toBe(true)
    expect(reconcilable(['README.md', 'src/payload.config.ts'])).toBe(false)
  })
})
