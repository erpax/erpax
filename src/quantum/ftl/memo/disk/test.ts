import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { contentKey, forgetContentKeys, isSealed, readSealed, writeSealed } from './index'

/**
 * A key that cannot see its inputs would seal one verdict forever. `payload-input-key.sh` states the
 * same law for `migrate:status`: never memoise on a key blind to what the answer depends on.
 */
describe('quantum/ftl/memo/disk — the content address', () => {
  it('is null where there is no git metadata, never a shared constant', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-nogit-'))
    try {
      mkdirSync(join(root, 'src'), { recursive: true })
      writeFileSync(join(root, 'src/a.ts'), 'export const a = 1\n')
      expect(contentKey(root)).toBeNull() // a tarball checkout must not memoize
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  /**
   * The surface is the sound half. `deadLoaderPaths` parses `src` and then asks whether targets under
   * `scripts/` and `packages/` EXIST, so on a `src`-only key a deleted script leaves the previous
   * green verdict standing — the fail-open the gate it keys exists to close.
   */
  it('a WIDER surface is a different address, and sees a change the narrow one cannot', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-surface-'))
    const git = (...args: string[]) => spawnSync('git', args, { cwd: root, encoding: 'utf8' })
    try {
      mkdirSync(join(root, 'src'), { recursive: true })
      mkdirSync(join(root, 'scripts'), { recursive: true })
      writeFileSync(join(root, 'src/a.ts'), 'export const a = 1\n')
      writeFileSync(join(root, 'scripts/run.sh'), 'echo one\n')
      git('init', '-q')
      git('add', '-A')

      const narrow = contentKey(root, ['src'])
      const wide = contentKey(root, ['src', 'scripts'])
      expect(narrow).not.toBeNull()
      expect(wide).not.toBeNull()
      expect(wide).not.toBe(narrow) // two surfaces never collide on one address

      // Change ONLY the script. The wide address must move; the narrow one must not — which is both
      // halves of soundness: the wider key does work, and the narrower key is genuinely blind to it.
      writeFileSync(join(root, 'scripts/run.sh'), 'echo two\n')
      forgetContentKeys()
      expect(contentKey(root, ['src'])).toBe(narrow)
      expect(contentKey(root, ['src', 'scripts'])).not.toBe(wide)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  /**
   * The address costs 224–290 ms and `sealed` pays it per LABEL, so six sealed gates spent ~1.5 s
   * computing one address six times — more than two of them spend computing their answer. Without the
   * memo, sealing a cheap gate is a pessimisation rather than a saving.
   */
  it('is computed once per surface per process, and forgetting it is explicit', () => {
    forgetContentKeys()
    const first = Date.now()
    const k = contentKey()
    const cold = Date.now() - first
    const second = Date.now()
    expect(contentKey()).toBe(k)
    expect(Date.now() - second).toBeLessThan(cold) // a map lookup, not three git processes
    forgetContentKeys()
    expect(contentKey()).toBe(k) // forgetting re-derives the SAME address from an unchanged tree
  })

  it('is a stable 32-hex address for this repository', () => {
    const k = contentKey()
    expect(k).not.toBeNull()
    expect(k).toMatch(/^[0-9a-f]{32}$/)
    expect(contentKey()).toBe(k)
  })
})

describe('quantum/ftl/memo/disk — sealing', () => {
  const label = 'disk-test-probe'

  it('round-trips a verdict at an address', () => {
    const k = contentKey()
    writeSealed(label, k, { dead: ['a'], n: 2 })
    expect(readSealed(label, k)).toEqual({ dead: ['a'], n: 2 })
    expect(isSealed(label, k)).toBe(true)
  })

  it('a DIFFERENT address is a miss — this is the whole correctness of the memo', () => {
    const k = contentKey()
    writeSealed(label, k, { n: 1 })
    expect(readSealed(label, 'f'.repeat(32))).toBeUndefined()
    expect(isSealed(label, 'f'.repeat(32))).toBe(false)
  })

  it('a null key never reads and never writes', () => {
    writeSealed('null-probe', null, { n: 1 })
    expect(readSealed('null-probe', null)).toBeUndefined()
    expect(isSealed('null-probe', null)).toBe(false)
  })

  it('a malformed cache file is a MISS, never a throw', () => {
    const k = contentKey()!
    // write junk where the seal lives, the way a killed process or a full disk would
    const dir = join(process.cwd(), 'node_modules/.cache/erpax-memo')
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'malformed-probe.json'), '{ not json')
    expect(() => readSealed('malformed-probe', k)).not.toThrow()
    expect(readSealed('malformed-probe', k)).toBeUndefined()
  })

  it('an unknown label is a miss rather than another label\'s answer', () => {
    expect(readSealed('never-sealed-anything', contentKey())).toBeUndefined()
  })
})
