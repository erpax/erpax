import { describe, it, expect } from 'vitest'
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { declaredKinds, constructedLiterals, unraisedKinds, assertKindsRaised } from './index'

/** A hermetic corpus — the gate must never be proven against the live tree it is meant to judge. */
function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'unraised-'))
  mkdirSync(join(root, 'src'), { recursive: true })
  for (const [rel, text] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, text)
  }
  return root
}

describe('rules/unraised — a case never raised is a check that cannot fire', () => {
  it('reads union members from the grammar, not from a pattern', () => {
    const src = `export type CrackKind = 'scan' | 'spend' | 'spacetime'\n`
    const got = declaredKinds('a.ts', src)
    expect(got.map((d) => d.member).sort()).toEqual(['scan', 'spacetime', 'spend'])
    expect(got.every((d) => d.kind === 'CrackKind')).toBe(true)
  })

  it('a declaration is NOT its own construction site — the type position cannot count', () => {
    // The whole gate turns on this. If a LiteralTypeNode counted, every declared member would look
    // raised by virtue of being declared, and the check would report green over every real gap.
    const src = `export type AKind = 'x' | 'y'\n`
    expect([...constructedLiterals('a.ts', src)]).toEqual([])
  })

  it('an expression-position literal DOES count as raising the case', () => {
    const src = `const c = { kind: 'x' as const }\n`
    expect(constructedLiterals('a.ts', src).has('x')).toBe(true)
  })

  it('flags the declared-but-never-constructed member, and only that one', () => {
    const root = fixture({
      'map.ts': `export type CrackKind = 'scan' | 'spacetime'\n`,
      'use.ts': `export const c = { kind: 'scan' }\n`,
    })
    try {
      const out = unraisedKinds(root)
      expect(out).toHaveLength(1)
      expect(out[0]!.member).toBe('spacetime')
      expect(out[0]!.kind).toBe('CrackKind')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('a member raised in ANY file is not unraised — the scan is corpus-wide', () => {
    const root = fixture({
      'map.ts': `export type CrackKind = 'scan' | 'spacetime'\n`,
      'deep/detect.ts': `export function f() { return { kind: 'spacetime', why: 'y' } }\n`,
      'use.ts': `export const c = { kind: 'scan' }\n`,
    })
    try {
      expect(unraisedKinds(root)).toHaveLength(0)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('generated faces are not evidence — they restate every symbol', () => {
    const root = fixture({
      'map.ts': `export type CrackKind = 'scan' | 'spacetime'\n`,
      'payload-types.ts': `export const x = { kind: 'spacetime' }\n`,
      'use.ts': `export const c = { kind: 'scan' }\n`,
    })
    try {
      // A generated bundle naming the member does not mean any code path raises it.
      expect(unraisedKinds(root).map((u) => u.member)).toEqual(['spacetime'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('ratchets — fails closed on getting worse, passes at the ceiling', () => {
    const root = fixture({
      'map.ts': `export type CrackKind = 'scan' | 'spacetime'\n`,
      'use.ts': `export const c = { kind: 'scan' }\n`,
    })
    try {
      expect(assertKindsRaised(root, 1).ok).toBe(true)
      expect(assertKindsRaised(root, 0).ok).toBe(false)
      expect(assertKindsRaised(root, 0).found).toBe(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
