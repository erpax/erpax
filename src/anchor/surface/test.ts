import { describe, expect, it } from 'vitest'

import {
  ANCHOR_ASSUMPTION,
  ANCHOR_STRENGTH_BITS,
  isQuantumResistant,
  PQC_ANCHOR_KINDS,
  POST_QUANTUM_STRENGTH_BITS,
  postQuantumFloorLog2,
  type AnchorKind,
} from '../index'

import {
  CHANNEL_STANDARD,
  CHANNEL_SURFACES,
  manifestGaps,
  manifestSealed,
  openSurfaces,
  REACHABLE_SURFACES,
  SURFACE_BINDING,
  bound,
  groundInBindings,
  ROOT_STANDARDS,
  type SurfaceDeclaration,
  type SurfaceGapKind,
} from './index'

/** A manifest that accounts for every reachable surface with the right primitive. */
const sealedManifest: readonly SurfaceDeclaration[] = [
  {
    kind: 'root-signing',
    status: { state: 'sealed', standard: 'FIPS 205 SLH-DSA-SHA2-128s', test: 'src/anchor/surface/test.ts' },
  },
  {
    kind: 'channel-keying',
    status: { state: 'sealed', standard: 'FIPS 203 ML-KEM-768', test: 'src/anchor/surface/test.ts' },
  },
  {
    kind: 'storage-at-rest',
    status: { state: 'sealed', standard: 'NIST SP 800-38D AES-256-GCM', test: 'src/anchor/surface/test.ts' },
  },
  {
    kind: 're-exchange',
    status: { state: 'sealed', standard: 'FIPS 203 ML-KEM-768 rekey', test: 'src/anchor/surface/test.ts' },
  },
]

const replace = (kind: string, status: SurfaceDeclaration['status']): SurfaceDeclaration[] =>
  sealedManifest.map((d) => (d.kind === kind ? { ...d, status } : d))

describe('anchor — post-quantum: the assumption, and what a CRQC leaves standing', () => {
  it('Shor-broken anchors are worth ZERO post-quantum, not fewer bits', () => {
    for (const classical of ['rfc3161-rsa2048', 'rfc3161-ecdsa-p256', 'eidas-qualified'] as AnchorKind[]) {
      expect(ANCHOR_STRENGTH_BITS[classical]).toBeGreaterThan(0) // strong today
      expect(POST_QUANTUM_STRENGTH_BITS[classical]).toBe(0) // worth nothing tomorrow
      expect(isQuantumResistant(classical)).toBe(false)
      expect(ANCHOR_ASSUMPTION[classical]).toContain('Shor')
    }
  })

  it('the NIST PQC anchors bind, and their assumptions are named and distinct', () => {
    expect(PQC_ANCHOR_KINDS).toEqual(['slh-dsa-fips205', 'ml-dsa-fips204'])
    for (const pqc of PQC_ANCHOR_KINDS) expect(isQuantumResistant(pqc)).toBe(true)
    // SLH-DSA rests on the SAME assumption as the digest — no new one is taken on
    expect(ANCHOR_ASSUMPTION['slh-dsa-fips205']).toContain('SAME assumption')
    // ML-DSA's lattice assumption is DISTINCT — which is what makes it a hedge rather than a repeat
    expect(ANCHOR_ASSUMPTION['ml-dsa-fips204']).toContain('DISTINCT')
    expect(ANCHOR_ASSUMPTION['slh-dsa-fips205']).not.toBe(ANCHOR_ASSUMPTION['ml-dsa-fips204'])
  })

  it('the post-quantum floor is min(digest, anchor) — an un-anchored or Shor-broken root is 0', () => {
    expect(postQuantumFloorLog2('slh-dsa-fips205', 106)).toBe(106) // digest is the weak link
    expect(postQuantumFloorLog2('ml-dsa-fips204', 256)).toBe(192) // anchor is the weak link
    expect(postQuantumFloorLog2('rfc3161-ecdsa-p256', 106)).toBe(0) // free rewrite under a CRQC
    expect(postQuantumFloorLog2('none', 106)).toBe(0)
  })

  it('every anchor kind is priced on BOTH tables and names an assumption — no kind is unlisted', () => {
    for (const kind of Object.keys(ANCHOR_STRENGTH_BITS) as AnchorKind[]) {
      expect(POST_QUANTUM_STRENGTH_BITS[kind]).toBeTypeOf('number')
      expect(ANCHOR_ASSUMPTION[kind].length).toBeGreaterThan(0)
      // post-quantum strength never EXCEEDS classical — a quantum adversary is strictly stronger
      expect(POST_QUANTUM_STRENGTH_BITS[kind]).toBeLessThanOrEqual(ANCHOR_STRENGTH_BITS[kind])
    }
  })
})

describe('anchor/surface — the judgment guard: an undeclared surface fails the build', () => {
  it('a manifest accounting for every reachable surface with the right primitive is sealed', () => {
    expect(manifestGaps(sealedManifest)).toEqual([])
    expect(manifestSealed(sealedManifest)).toBe(true)
    expect(openSurfaces(sealedManifest)).toEqual([])
  })

  it('a silently omitted surface fails — silence is a dismissal nothing computed', () => {
    for (const surface of REACHABLE_SURFACES) {
      const gaps = manifestGaps(sealedManifest.filter((d) => d.kind !== surface))
      expect(gaps).toHaveLength(1)
      expect(gaps[0]).toMatchObject({ kind: 'surface-undeclared', surface })
    }
    // the empty manifest is the purest form: every reachable surface dismissed at once
    expect(manifestGaps([])).toHaveLength(REACHABLE_SURFACES.length)
    expect(manifestSealed([])).toBe(false)
  })

  it('a BARE status fails — sealed with no test, open with no owner', () => {
    const noTest = manifestGaps(replace('root-signing', { state: 'sealed', standard: 'FIPS 205 SLH-DSA', test: '' }))
    expect(noTest[0]).toMatchObject({ kind: 'status-bare', surface: 'root-signing' })
    expect(noTest[0].reason).toContain('a test')

    const noStandard = manifestGaps(replace('storage-at-rest', { state: 'sealed', standard: '', test: 't' }))
    expect(noStandard[0]).toMatchObject({ kind: 'status-bare' })

    const noOwner = manifestGaps(replace('re-exchange', { state: 'open', gap: 'no rekey yet', owner: '' }))
    expect(noOwner[0]).toMatchObject({ kind: 'status-bare', surface: 're-exchange' })
    expect(noOwner[0].reason).toContain('an owner')
  })

  it('OPEN is lawful — a named, owned gap is a measured statement, not a failure', () => {
    const honest = replace('re-exchange', { state: 'open', gap: 'no ML-KEM rekey on long sessions', owner: 'ceci' })
    expect(manifestGaps(honest)).toEqual([])
    expect(manifestSealed(honest)).toBe(true)
    expect(openSurfaces(honest)).toEqual(['re-exchange'])
  })

  it('a channel sealed without ML-KEM fails — harvest-now-decrypt-later reads the transport', () => {
    for (const surface of CHANNEL_SURFACES) {
      const gaps = manifestGaps(
        replace(surface, { state: 'sealed', standard: 'TLS 1.3 X25519', test: 'src/anchor/surface/test.ts' }),
      )
      expect(gaps).toHaveLength(1)
      expect(gaps[0]).toMatchObject({ kind: 'channel-unsealed', surface })
      expect(gaps[0].reason).toContain(CHANNEL_STANDARD)
    }
  })

  it('a root sealed by a classical signature fails — Shor breaks it outright', () => {
    const gaps = manifestGaps(
      replace('root-signing', { state: 'sealed', standard: 'RFC 3161 ECDSA P-256', test: 'src/anchor/surface/test.ts' }),
    )
    expect(gaps).toHaveLength(1)
    expect(gaps[0]).toMatchObject({ kind: 'root-unsealed', surface: 'root-signing' })
    for (const s of ROOT_STANDARDS) expect(gaps[0].reason).toContain(s)
    // either PQC signature seals it — SLH-DSA primarily, ML-DSA as the lattice hybrid
    for (const s of ROOT_STANDARDS) {
      expect(
        manifestSealed(replace('root-signing', { state: 'sealed', standard: `FIPS ${s}`, test: 't' })),
      ).toBe(true)
    }
  })

  it('all four gap kinds are RAISED — a case nothing constructs is a check that cannot fire', () => {
    const raised = new Set<SurfaceGapKind>([
      ...manifestGaps([]).map((g) => g.kind),
      ...manifestGaps(replace('root-signing', { state: 'sealed', standard: 'FIPS 205 SLH-DSA', test: '' })).map(
        (g) => g.kind,
      ),
      ...manifestGaps(replace('channel-keying', { state: 'sealed', standard: 'TLS 1.3', test: 't' })).map(
        (g) => g.kind,
      ),
      ...manifestGaps(replace('root-signing', { state: 'sealed', standard: 'RFC 3161 RSA', test: 't' })).map(
        (g) => g.kind,
      ),
    ])
    expect([...raised].sort()).toEqual([
      'channel-unsealed',
      'root-unsealed',
      'status-bare',
      'surface-undeclared',
    ])
  })
})

describe('anchor/surface — PQC bindings: a sealed claim needs a provider bound behind it', () => {
  const ALL_BOUND = {
    PQC_ROOT_PROVIDER: '@noble/post-quantum/slh-dsa',
    PQC_KEM_PROVIDER: '@noble/post-quantum/ml-kem',
    PQC_STORAGE_PROVIDER: 'node:crypto aes-256-gcm',
  }

  it('every reachable surface names the binding it needs — none is global', () => {
    for (const s of REACHABLE_SURFACES) expect(SURFACE_BINDING[s]).toMatch(/^PQC_[A-Z_]+$/)
    // the two channel surfaces share the KEM binding; the root and storage have their own
    expect(SURFACE_BINDING['channel-keying']).toBe(SURFACE_BINDING['re-exchange'])
    expect(SURFACE_BINDING['root-signing']).not.toBe(SURFACE_BINDING['channel-keying'])
    expect(new Set(Object.values(SURFACE_BINDING)).size).toBe(3) // 4 surfaces, 3 distinct bindings
  })

  it('bound() is an explicit absence — empty and whitespace are not bindings', () => {
    expect(bound('root-signing', {})).toBe(false)
    expect(bound('root-signing', { PQC_ROOT_PROVIDER: '' })).toBe(false)
    expect(bound('root-signing', { PQC_ROOT_PROVIDER: '   ' })).toBe(false)
    expect(bound('root-signing', ALL_BOUND)).toBe(true)
  })

  it('a sealed claim with NO provider bound is downgraded to open, gap named', () => {
    const grounded = groundInBindings(sealedManifest, {})
    expect(grounded.every((d) => d.status.state === 'open')).toBe(true)
    const root = grounded.find((d) => d.kind === 'root-signing')!
    expect(root.status.state).toBe('open')
    if (root.status.state === 'open') {
      expect(root.status.gap).toContain('PQC_ROOT_PROVIDER is not bound')
      expect(root.status.gap).toContain('FIPS 205') // the claim it WAS making is quoted back
      expect(root.status.owner).toBe('root-signing')
    }
    // and the manifest is still well-formed — open with gap+owner passes the guard
    expect(manifestSealed(grounded)).toBe(true)
    expect(openSurfaces(grounded)).toHaveLength(4)
  })

  it('with every provider bound, nothing is touched', () => {
    const grounded = groundInBindings(sealedManifest, ALL_BOUND)
    expect(grounded).toEqual(sealedManifest)
    expect(manifestSealed(grounded)).toBe(true)
    expect(openSurfaces(grounded)).toEqual([])
  })

  it('it only ever DOWNGRADES — an honest open declaration is never rewritten', () => {
    const honest = replace('re-exchange', { state: 'open', gap: 'no rekey yet', owner: 'ceci' })
    const grounded = groundInBindings(honest, ALL_BOUND)
    const re = grounded.find((d) => d.kind === 're-exchange')!
    expect(re.status).toEqual({ state: 'open', gap: 'no rekey yet', owner: 'ceci' })
  })

  it('partial binding reports exactly which surfaces are unbacked', () => {
    const grounded = groundInBindings(sealedManifest, { PQC_ROOT_PROVIDER: 'slh-dsa' })
    expect([...openSurfaces(grounded)].sort()).toEqual(['channel-keying', 're-exchange', 'storage-at-rest'])
    expect(grounded.find((d) => d.kind === 'root-signing')!.status.state).toBe('sealed')
  })
})
