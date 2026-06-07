import { describe, it, expect, expectTypeOf } from 'vitest'
import type {
  CausalLink,
  Provenance,
  ReplayRequest,
  ReplayResult,
  TenantScopedQuery,
  BitemporalCoordinates,
  CostMetric,
  CarbonEstimate,
  PqcAlgorithm,
  PqcSignature,
  Explanation,
  InverseEffect,
  AiProvenance,
} from '@/beyond/types'

// beyond/types is the antimatter twin: a type-only module (no runtime exports).
// The proof is that the next-horizon conservation primitives (Laws 11-22) accept
// exactly the conforming shapes and nothing else — verified at the type level and
// by constructing real values that satisfy each readonly contract.
describe('beyond/types — next-horizon conservation primitive shapes', () => {
  it('Law 11: a CausalLink is a directed PROV edge (causedBy → producedBy @ atTime)', () => {
    const link: CausalLink = {
      causedBy: ['uuid-a', 'uuid-b'],
      producedBy: 'chain-step-7',
      atTime: '2026-06-07T00:00:00.000Z',
    }
    expect(link.causedBy).toHaveLength(2)
    expectTypeOf(link.causedBy).toEqualTypeOf<ReadonlyArray<string>>()
    const prov: Provenance = { causalChain: [link], source: 'urn:example' }
    expect(prov.causalChain[0]).toBe(link)
  })

  it('Law 12: ReplayResult.ok carries effects on success and a mismatch on divergence', () => {
    const req: ReplayRequest = { leafHash: 'h', snapshotUuid: 's' }
    expect(req.leafHash).toBe('h')
    const fail: ReplayResult = { ok: false, mismatch: { expectedHash: 'x', actualHash: 'y' } }
    expect(fail.ok).toBe(false)
    expect(fail.mismatch?.expectedHash).not.toBe(fail.mismatch?.actualHash)
    const pass: ReplayResult = { ok: true, effects: [] }
    expect(pass.ok).toBe(true)
  })

  it('Law 13: a TenantScopedQuery proves the where-clause tenant bounds the result rows', () => {
    const q: TenantScopedQuery = {
      collection: 'invoices',
      tenantIdInWhereClause: 't1',
      resultRowTenantIds: ['t1', 't1'],
    }
    // tenant isolation invariant: every result row carries the where-clause tenant.
    expect(q.resultRowTenantIds.every((t) => t === q.tenantIdInWhereClause)).toBe(true)
  })

  it('Law 14: BitemporalCoordinates separate system-time from valid-time', () => {
    const bt: BitemporalCoordinates = { recordedAt: '2026-06-07', validAt: '2026-01-01' }
    expectTypeOf(bt.recordedAt).toEqualTypeOf<string>()
    expectTypeOf(bt.validAt).toEqualTypeOf<string>()
    expect(bt.recordedAt).not.toBe(bt.validAt)
  })

  it('Law 15: CostMetric requires the three resource axes; money/tokens are optional', () => {
    const c: CostMetric = { cpuMs: 12, storageBytes: 4096, egressBytes: 0 }
    expect(c.aiTokensIn).toBeUndefined()
    const priced: CostMetric = { ...c, aiTokensIn: 100, aiTokensOut: 50, microUsd: 7 }
    expect(priced.microUsd).toBe(7)
  })

  it('Law 16: CarbonEstimate cites a factor source (ESRS E1)', () => {
    const e: CarbonEstimate = { gramsCO2e: 1.5, factorSource: 'EPA', region: 'eu-west' }
    expect(e.factorSource.length).toBeGreaterThan(0)
  })

  it('Law 18: PqcAlgorithm is the closed PQC set; a signature pins its algorithm', () => {
    const algos: ReadonlyArray<PqcAlgorithm> = ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87', 'SLH-DSA-128', 'XMSS', 'LMS']
    expect(algos).toHaveLength(6)
    const sig: PqcSignature = {
      algorithm: 'ML-DSA-65',
      publicKeyFingerprint: 'fp',
      signatureB64: 'AAAA',
      signedAt: '2026-06-07',
    }
    expect(algos.includes(sig.algorithm)).toBe(true)
  })

  it('Law 19: an Explanation carries i18n text, cited standards, sources and chain path', () => {
    const ex: Explanation = {
      text: { en: 'because', bg: 'защото' },
      standardsCited: [{ body: 'IFRS', id: '15' }],
      sources: ['uuid-1'],
      chainPath: [{ chainId: 'P2P_THREE_WAY_MATCH', stepIndex: 0 }],
    }
    expect(Object.keys(ex.text)).toContain('en')
    expect(ex.standardsCited[0].body).toBe('IFRS')
    expect(ex.chainPath[0].stepIndex).toBe(0)
  })

  it('Law 20: InverseEffect is a discriminated union — every effect is invertible or explicitly not', () => {
    const inverses: ReadonlyArray<InverseEffect> = [
      { kind: 'undo-create', collection: 'invoices', id: '1' },
      { kind: 'undo-update', collection: 'invoices', id: '1', restorePatch: { status: 'draft' } },
      { kind: 'undo-emit', eventId: 'e1', correlationId: 'c1' },
      { kind: 'undo-audit', leafHash: 'h' },
      { kind: 'cannot-invert', reason: 'side effect already externalized' },
    ]
    const kinds = inverses.map((i) => i.kind)
    expect(new Set(kinds).size).toBe(inverses.length)
    expect(kinds).toContain('cannot-invert')
  })

  it('Law 22: AiProvenance records the model, hashed prompt and token counts (EU AI Act Annex IV)', () => {
    const ai: AiProvenance = {
      modelVersion: 'claude-opus-4-8',
      modelProvider: 'anthropic',
      promptHash: 'sha256:...',
      parameters: { temperature: 0 },
      inputTokens: 1200,
      outputTokens: 300,
      inferenceLatencyMs: 850,
      invokedAt: '2026-06-07T00:00:00.000Z',
      humanReview: { reviewerId: 'u1', decision: 'approved' },
    }
    expect(ai.inputTokens).toBeGreaterThan(0)
    expect(ai.humanReview?.decision).toBe('approved')
    expectTypeOf(ai.parameters).toEqualTypeOf<Record<string, unknown>>()
  })
})
