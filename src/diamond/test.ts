/**
 * diamond — proof that every scale shares ONE model.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — pure derive + verify
 */
import { describe, it, expect } from 'vitest'
import { join } from 'node:path'
import {
  deriveDiamond,
  deriveCollectionDiamond,
  deploymentFaces,
  diamondUuid,
  verifyDiamond,
  folderModelToDiamond,
  methodModelToDiamond,
  type DiamondModel,
  type CollectionDiamondModel,
} from '@/diamond'
import { deriveFolderModel } from '@/readme'
import { methodPath } from '@/method'
import { HORO_DIGITS, HORO_MEASURE, type HoroState } from '@/horo'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

const FULL_RING: ReadonlyArray<HoroState> = HORO_DIGITS.map((step, i) => ({
  code: HORO_MEASURE[i]!,
  step,
}))

const COLLECTION_SHAPE_KEYS = [
  'kind',
  'slug',
  'atomPath',
  'boundaryUuid',
  'trinity',
  'horo',
  'measure',
  'imports',
  'exports',
  'escapes',
  'links',
  'linksResolved',
  'linksTotal',
  'folded',
  'bondsIn',
  'bondsOut',
  'sealed',
  'tamperProofUuid',
  'horoStates',
  'horoStateName',
  'standards',
  'emits',
  'subscribesTo',
] as const

describe('diamond — shared model (one shape, all scales)', () => {
  it('deriveDiamond: atomPath vs fs path ⇒ same model uuid', () => {
    const byPath = deriveDiamond('readme')
    const byAbs = deriveDiamond(join(SRC, 'readme', 'index.ts'))
    expect(diamondUuid(byPath)).toBe(diamondUuid(byAbs))
    expect(byPath.atomPath).toBe('readme')
    expect(byPath.kind).toBe('atom')
  })

  it('diamondUuid is deterministic and conformant', () => {
    const m = deriveDiamond('guardian')
    const u = diamondUuid(m)
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(diamondUuid(m)).toBe(u)
  })

  it('incomplete trinity ⇒ impurity flagged', () => {
    const incomplete: DiamondModel = {
      kind: 'atom',
      atomPath: 'x/incomplete',
      boundaryUuid: null,
      trinity: { form: 1, code: 1, proof: 0 },
      horo: null,
      measure: null,
      imports: [],
      exports: [],
      escapes: [],
      links: [],
      linksResolved: 0,
      linksTotal: 0,
      folded: false,
      bondsIn: 0,
      bondsOut: 0,
      sealed: false,
    }
    const v = verifyDiamond(incomplete)
    expect(v.sealed).toBe(false)
    expect(v.impurities.some((i) => i.includes('trinity.proof'))).toBe(true)
  })

  it('folderModelToDiamond adapter preserves trinity + seal', () => {
    const folder = deriveFolderModel('readme')
    const model = folderModelToDiamond(folder)
    expect(model.trinity).toEqual({ form: folder.form, code: folder.code, proof: folder.proof })
    expect(model.sealed).toBe(folder.sealed)
  })

  it('methodModelToDiamond adapter — path IS the address', () => {
    const m = methodPath('law/folder/index.ts', 'folderGuardians')
    const model = methodModelToDiamond(m)
    expect(model.kind).toBe('method')
    expect(model.atomPath).toBe('law/folder/folderGuardians')
    expect(model.boundaryUuid).toBe(m.boundaryUuid)
  })

  it('deriveDiamond resolves method addresses', () => {
    const model = deriveDiamond('law/folder/folderGuardians')
    expect(model.kind).toBe('method')
    expect(model.boundaryUuid).toBe(methodPath('law/folder/index.ts', 'folderGuardians').boundaryUuid)
  })

  it('deploymentFaces — mapped examples (worker · plugin · pwa)', () => {
    expect(deploymentFaces(deriveDiamond('confirm'))).toEqual({
      worker: true,
      plugin: false,
      pwa: false,
    })
    expect(deploymentFaces(deriveDiamond('readme'))).toMatchObject({ worker: true })
    expect(deploymentFaces(deriveDiamond('typography'))).toMatchObject({ worker: true })
    expect(deploymentFaces(deriveDiamond('plugin'))).toMatchObject({ plugin: true })
    expect(deploymentFaces(deriveDiamond('public'))).toMatchObject({ pwa: true })
    expect(deploymentFaces(deriveDiamond('pwa'))).toMatchObject({ pwa: true })
    expect(deploymentFaces(deriveDiamond('law/folder/folderGuardians'))).toMatchObject({
      worker: true,
    })
  })
})

describe('diamond — collection dimension (Payload backend)', () => {
  it('deriveCollectionDiamond with horoStates passes verifyDiamond', () => {
    const model = deriveCollectionDiamond({
      slug: 'horo-test',
      horoStates: FULL_RING,
      horoStateDefault: 'base',
    })
    const v = verifyDiamond(model)
    expect(model.kind).toBe('collection')
    expect(model.horoStates).toHaveLength(7)
    expect(model.tamperProofUuid).toBe(true)
    expect(v.sealed).toBe(false) // synthetic slug path — no live barrel
    expect(v.impurities.some((i) => i.includes('horoStates'))).toBe(false)
  })

  it('two collections share the same model shape (keys)', () => {
    const a = deriveCollectionDiamond({ slug: 'memories', standards: ['ISO-19011'] })
    const b = deriveCollectionDiamond({ slug: 'standards', standards: ['W3C'] })
    expect(Object.keys(a).sort()).toEqual(Object.keys(b).sort())
    for (const k of COLLECTION_SHAPE_KEYS) {
      expect(k in a).toBe(true)
      expect(k in b).toBe(true)
    }
    expect(a.kind).toBe('collection')
    expect(b.kind).toBe('collection')
  })

  it('live memories collection derives from tree with code trinity', () => {
    const model = deriveCollectionDiamond({ slug: 'memories', atomPath: 'memories' })
    expect(model.trinity.code).toBe(1)
    expect(model.slug).toBe('memories')
    expect(model.imports.length).toBeGreaterThan(0)
    expect(diamondUuid(model)).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('collection with incomplete horoStates flags impurity in verify', () => {
    const model: CollectionDiamondModel = {
      kind: 'collection',
      slug: 'bad',
      atomPath: 'bad',
      boundaryUuid: null,
      trinity: { form: 0, code: 1, proof: 0 },
      horo: null,
      measure: null,
      imports: [],
      exports: ['bad'],
      escapes: [],
      links: [],
      linksResolved: 0,
      linksTotal: 0,
      folded: false,
      bondsIn: 0,
      bondsOut: 0,
      sealed: false,
      tamperProofUuid: true,
      horoStates: FULL_RING.slice(0, 3),
      horoStateName: 'state',
      standards: [],
      emits: [],
      subscribesTo: [],
    }
    const v = verifyDiamond(model)
    expect(v.sealed).toBe(false)
    expect(v.impurities.some((i) => i.includes('horoStates'))).toBe(true)
  })
})
