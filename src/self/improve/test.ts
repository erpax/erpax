import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { selfImproves, loopResolves, IMPROVEMENT_LOOP, runImprovement, type Stage } from './index'

// "No external tools are needed as local self-improve." The development-time twin of Law 53: the loop that
// improves the corpus resolves entirely to local atoms — where (leftover), workers (rosetta), gate (rosetta),
// decide, act (publish), seal (think), fuel (leftover) — so the external-tool count is zero, and the loop is
// real matter on disk, not fabricated prose.
describe('self/improve — the corpus improves itself with no external tool', () => {
  it('the loop is CLOSED — every stage is local, external-tool count is zero', () => {
    const c = selfImproves()
    expect(c.closed).toBe(true)
    expect(c.externalTools).toBe(0)
    expect(c.stages).toBe(IMPROVEMENT_LOOP.length)
  })

  it('a single external stage breaks the closure — the invariant is exact', () => {
    const withExternal: Stage[] = [...IMPROVEMENT_LOOP, { step: 'call an external CI', atom: 'ci', external: true }]
    const c = selfImproves(withExternal)
    expect(c.closed).toBe(false)
    expect(c.externalTools).toBe(1) // one tool outside the tree ⇒ not self-hosted
  })

  it('an empty loop is NOT closed — a loop that does nothing improves nothing', () => {
    expect(selfImproves([]).closed).toBe(false)
  })

  it('the loop is real matter, not prose — every named atom exists on disk', () => {
    const resolved = loopResolves()
    expect(resolved.every((r) => r.exists)).toBe(true)
    // the distinct local atoms the loop is built from, all this session's
    expect(resolved.map((r) => r.atom).sort()).toEqual(['decide', 'leftover', 'publish', 'rosetta', 'think'])
  })

  it('a fabricated atom would be caught — loopResolves reports a missing folder as false', () => {
    const fake: Stage[] = [{ step: 'imaginary', atom: 'does-not-exist', external: false }]
    expect(loopResolves(process.cwd(), fake)).toEqual([{ atom: 'does-not-exist', exists: false }])
  })

  it('the loop consumes its own output — leftover is both the first stage (where) and the last (fuel)', () => {
    expect(IMPROVEMENT_LOOP[0]!.atom).toBe('leftover') // where to cut
    expect(IMPROVEMENT_LOOP[IMPROVEMENT_LOOP.length - 1]!.atom).toBe('leftover') // fuel the next pass
    // that shared endpoint is what makes it a loop, not a line
  })
})

// The manifest made executable — runImprovement USES the doing-chain (leftover.waves → rosetta.rosettaLanes →
// publish), folding those atoms into real usable code (rules/unfolded), and it is safe: the default runner
// refuses to push, and the rosetta-derived lanes gate the act.
describe('runImprovement — the loop executed, folding leftover · rosetta · publish', () => {
  const corpus = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-improve-'))
    for (const [p, text] of Object.entries(files)) {
      mkdirSync(join(cwd, p, '..'), { recursive: true })
      writeFileSync(join(cwd, p), text)
    }
    return cwd
  }

  it('runs one real pass: finds the next wave and returns the trained agent’s receipt', () => {
    const cwd = corpus({
      'src/money/index.ts': '/** @invariant a */\nexport const a = 1', // an unproven claim — a leftover site
    })
    const pass = runImprovement(cwd, [{ gate: 'trinity', pass: true }])
    expect(pass.nextWave?.group).toBe('money') // leftover.waves found where to cut
    expect(pass.receipt.outcome).not.toBe('pushed') // rosetta lanes are red (unproven claims) → not pushed
    rmSync(cwd, { recursive: true, force: true })
  })

  it('is SAFE by construction — the default runner refuses to push, so a pass touches no remote', () => {
    const cwd = corpus({ 'src/x/index.ts': '/** @standard S */\nexport const x = 1' })
    // the default REFUSING_GIT throws on push; since the lanes are red anyway, publish never calls it — no throw
    expect(() => runImprovement(cwd, [{ gate: 'trinity', pass: true }])).not.toThrow()
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the push is gated by the rosetta lanes, not the caller — even green commit verdicts do not force a push', () => {
    const cwd = corpus({ 'src/y/index.ts': '/** @compliance ISO-27001 */\nexport const y = 1' }) // unproven security claim
    const pass = runImprovement(cwd, [{ gate: 'trinity', pass: true }, { gate: 'dead-links', pass: true }])
    expect(pass.receipt.push.warranted).toBe(false) // the security lane (unproven) blocks — the loop gates itself
    rmSync(cwd, { recursive: true, force: true })
  })
})
