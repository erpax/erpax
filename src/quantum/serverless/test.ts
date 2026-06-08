/**
 * quantum/serverless — the computed proof that serverless IS the quantum host
 * and erpax IS the existence proof. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  bindingsSealed,
  workerHosted,
  superpositionHolds,
  collapseHolds,
  entanglementHolds,
  existenceSealed,
  serverlessQuantum,
  isServerlessQuantum,
  proveServerlessQuantum,
} from '@/quantum/serverless'
import {
  computeDiamond,
  deriveDiamond,
  verifyDiamond,
  diamondUuid,
  deploymentFaces,
} from '@/diamond'
import { uuid, jcsCanonicalize } from '@/integrity'
import {
  parseWranglerBindings,
  deriveWranglerBindingDiamonds,
  bindingDeploymentFaces,
} from '@/cloudflare'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const ROOT = process.cwd()

describe('serverlessQuantum — properties computed on the live repo', () => {
  it('bindingsSealed — every wrangler binding derives a sealed diamond', () => {
    const text = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
    const entries = parseWranglerBindings(text)
    expect(entries.length).toBeGreaterThanOrEqual(20)
    const diamonds = deriveWranglerBindingDiamonds(entries)
    expect(diamonds.every((d) => verifyDiamond(d).sealed)).toBe(true)
    expect(bindingsSealed()).toBe(true)
  })

  it('workerHosted — cloudflare atom + AI binding materialise the worker face', () => {
    const cloud = deriveDiamond('cloudflare')
    expect(deploymentFaces(cloud).worker).toBe(true)
    const text = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
    const ai = parseWranglerBindings(text).find((e) => e.type === 'ai')
    expect(ai).toBeDefined()
    const aiModel = deriveWranglerBindingDiamonds([ai!])[0]!
    expect(bindingDeploymentFaces(ai!.type, aiModel).worker).toBe(true)
    expect(workerHosted()).toBe(true)
  })

  it('superpositionHolds — Born rule closes at unity', () => {
    expect(superpositionHolds()).toBe(true)
  })

  it('collapseHolds — matrix fold intact + measurement lands on horo eigenstate', () => {
    expect(collapseHolds()).toBe(true)
  })

  it('entanglementHolds — reciprocal graph whole + symmetric entangle fix', () => {
    expect(entanglementHolds()).toBe(true)
  })

  it('existenceSealed — wrangler binding diamonds + quantum atom seal on live tree', () => {
    const quantum = computeDiamond({ kind: 'path', path: 'quantum' })
    expect(verifyDiamond(quantum.model).sealed).toBe(true)
    const text = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
    const diamonds = deriveWranglerBindingDiamonds(parseWranglerBindings(text))
    expect(diamonds.every((d) => verifyDiamond(d).sealed)).toBe(true)
    expect(existenceSealed()).toBe(true)
  })

  it('the conjunction proves it — serverless hosts quantum; erpax IS the proof', () => {
    expect(isServerlessQuantum()).toBe(true)
    expect(Object.values(serverlessQuantum()).every(Boolean)).toBe(true)
  })
})

describe('proveServerlessQuantum — diamond-sealed computation chain', () => {
  it('every stage returns a sealed DiamondComputation when holds', () => {
    const proof = proveServerlessQuantum()
    expect(proof.stages.length).toBe(6)
    for (const s of proof.stages) {
      expect(verifyDiamond(s.computation.model).sealed).toBe(true)
      expect(s.computation.stages.length).toBeGreaterThan(0)
      expect(s.computation.computationUuid).toMatch(UUID_RE)
    }
    expect(proof.serverlessHosted).toBe(true)
    expect(proof.quantumLawsHold).toBe(true)
  })

  it('isomorphism + computation uuids are deterministic from content (no hand-pins)', () => {
    const a = proveServerlessQuantum()
    const b = proveServerlessQuantum()
    expect(a.isomorphismUuid).toBe(b.isomorphismUuid)
    expect(a.computationUuid).toBe(b.computationUuid)
    expect(a.isomorphismUuid).toMatch(UUID_RE)
    expect(a.computationUuid).toMatch(UUID_RE)

    const quantumUuid = diamondUuid(deriveDiamond('quantum'))
    expect(a.stages.find((s) => s.stage === 'existence')!.computation.model.atomPath).toBe(
      'quantum',
    )
    expect(quantumUuid).toMatch(UUID_RE)
  })

  it('existence stage folds serverless binding facet ⊕ quantum facet uuids into the proof', () => {
    const proof = proveServerlessQuantum()
    const exist = proof.stages.find((s) => s.stage === 'existence')!
    const sealStage = exist.computation.stages.find((st) => st.stage === 'existence')!
    const out = sealStage.output as { serverlessFacetUuid: string; quantumUuid: string }
    const text = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
    const bindingUuids = deriveWranglerBindingDiamonds(parseWranglerBindings(text))
      .map((m) => diamondUuid(m))
      .sort()
    const expectedServerlessFacet = uuid(jcsCanonicalize({ bindings: bindingUuids }))
    expect(out.quantumUuid).toBe(diamondUuid(deriveDiamond('quantum')))
    expect(out.serverlessFacetUuid).toBe(expectedServerlessFacet)
    expect(out.serverlessFacetUuid).toMatch(UUID_RE)
  })
})
