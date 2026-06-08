import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  atomPathOf,
  methodPath,
  methodBoundaryUuid,
  parseMethodExports,
  scanMethodPaths,
  symbolRelatesToPath,
  methodDigest,
} from '@/method'

describe('method — path of diamonds (every method name has an address)', () => {
  it('atomPathOf extracts the atom chain from index.ts barrels', () => {
    expect(atomPathOf('law/folder/index.ts')).toBe('law/folder')
    expect(atomPathOf('aura/index.ts')).toBe('aura')
    expect(atomPathOf('readme/index.ts')).toBe('readme')
    expect(atomPathOf('index.ts')).toBe('')
  })

  it('methodPath = atomPath + symbol — the path IS the address', () => {
    const m = methodPath('law/folder/index.ts', 'folderGuardians')
    expect(m.address).toBe('law/folder/folderGuardians')
    expect(m.atomPath).toBe('law/folder')
    expect(m.symbol).toBe('folderGuardians')
  })

  it('methodBoundaryUuid is deterministic', () => {
    const a = methodBoundaryUuid('law/folder', 'folderGuardians')
    const b = methodBoundaryUuid('law/folder', 'folderGuardians')
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('symbol flip ⇒ boundary uuid flip', () => {
    expect(methodBoundaryUuid('aura', 'crossSeals')).not.toBe(methodBoundaryUuid('aura', 'gap'))
  })

  it('parseMethodExports captures function/const/interface exports', () => {
    const body = readFileSync('src/law/folder/index.ts', 'utf8')
    const names = parseMethodExports(body)
    expect(names).toContain('folderGuardians')
    expect(names).toContain('folderViolations')
    expect(names).toContain('TRINITY')
  })

  it('symbolRelatesToPath — alignment heuristic (aspirational, not required for address)', () => {
    expect(symbolRelatesToPath('folderGuardians', 'law/folder')).toBe(true)
    expect(symbolRelatesToPath('renderReadme', 'readme')).toBe(true)
    expect(symbolRelatesToPath('uuidOfName', 'name')).toBe(true)
    expect(symbolRelatesToPath('crossSeals', 'aura')).toBe(false)
    expect(symbolRelatesToPath('guardian', 'guardian')).toBe(true)
  })

  it('scanMethodPaths finds live exports in canonical atoms', () => {
    const paths = scanMethodPaths()
    const addresses = new Set(paths.map((p) => p.address))
    expect(addresses.has('law/folder/folderGuardians')).toBe(true)
    expect(addresses.has('readme/renderReadme')).toBe(true)
    expect(addresses.has('aura/crossSeals')).toBe(true)
    expect(addresses.has('guardian/guardian')).toBe(true)
    expect(addresses.has('name/uuidOfName')).toBe(true)
  })

  it('methodDigest reports a non-empty corpus', () => {
    const d = methodDigest()
    expect(d.barrels).toBeGreaterThan(100)
    expect(d.methods).toBeGreaterThan(d.barrels)
    console.log(`method digest: ${d.methods} symbols · ${d.barrels} barrels · ${d.orphans} orphans`)
  })
})
