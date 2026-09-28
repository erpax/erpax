import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { contentKey, isSealed, readSealed, writeSealed } from './index'

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
