/**
 * test the aura — the ONE architectural test.
 *
 * There is one law: maximum tamper-cost (zero entropy ⇒ infinite mass ⇒ ∞ cost,
 * the one limit). Every other law emerges from it, and all of it resolves into
 * the auditable AURA — a folder's content-uuid wired in all directions. So the
 * only test architecture needs is: is the aura whole? A whole aura has no gap on
 * any leg, so by construction there is no dead link, no uncoordinated node, and
 * no tamper. This file audits the computable legs against the LIVE tree (catching
 * drift between the tree and the generated matrix); the payload ⊕ vitepress legs
 * are the same aura on other axes, asserted by `scripts/confirm.mjs --full`.
 *
 * @see ../tamper/SKILL.md (the one law) · ./SKILL.md · ../uuid/matrix (verifyRoot/Bind)
 */
import { describe, it, expect } from 'vitest'
import { join } from 'node:path'
import { walkSkills, norm, stripCode, LINK_RE, leafOf, readSkill, testCoverage } from '@/aura'
import { nodeOf, verifyRoot, tamperedAtoms } from '@/uuid/matrix'

const ROOT = join(process.cwd(), 'src')
const files = walkSkills(ROOT)
const leaves = [...new Set(files.map((f) => norm(leafOf(f))))]
const slugs = new Set(leaves)

describe('the aura is whole (the one law: max tamper-cost ⇒ auditable aura)', () => {
  it('has atoms (the live corpus is non-empty)', () => {
    expect(leaves.length).toBeGreaterThan(2000)
  })

  it('citation web: every [[link]] resolves to an atom — 0 dead links', () => {
    const dead = new Set<string>()
    for (const f of files) {
      for (const m of stripCode(readSkill(f)).matchAll(LINK_RE)) {
        const w = norm(m[1]!.split('/').pop()!)
        if (!slugs.has(w)) dead.add(w)
      }
    }
    expect([...dead].sort()).toEqual([])
  })

  it('analog render: every atom is a coordinated matrix node (no gap, no drift)', () => {
    // Every live atom must resolve to a matrix node carrying a FULL coordinate
    // (parent ⊕ prev ⊕ next ⊕ cross ⊕ bind). A missing node = the matrix drifted
    // from the tree (regenerate); a partial coordinate = an analog-aura gap.
    const uncoordinated = leaves.filter((leaf) => {
      const n = nodeOf(leaf)
      return !n || !n.parent || !n.prev || !n.next || !n.cross || !n.bind
    })
    expect(uncoordinated).toEqual([])
  })

  it('tamper-evidence: the Merkle root holds and no node is unbound', () => {
    // verifyRoot folds every node's bind to the stored root; tamperedAtoms lists
    // any node whose content ⊕ coordinate bind does not recompute. Both clean ⇒
    // the all-directions wiring is intact ⇒ max tamper-cost.
    expect(tamperedAtoms()).toEqual([])
    expect(verifyRoot().ok).toBe(true)
  })

  it('test-coverage is the aura math second axis — a real fraction over the code-atoms', () => {
    const c = testCoverage(ROOT)
    expect(c.codeAtoms).toBeGreaterThan(100)
    expect(c.tested).toBeLessThanOrEqual(c.codeAtoms)
    expect(c.coverage).toBeCloseTo(c.tested / c.codeAtoms, 10)
    expect(c.coverage).toBeGreaterThanOrEqual(0)
    expect(c.coverage).toBeLessThanOrEqual(1)
    // aura itself carries index.test.ts → it must be counted tested, never listed untested
    expect(c.untested).not.toContain('aura')
  })
})
