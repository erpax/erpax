/**
 * Cloudflare Workers AI bindings — test-first (proven ideas before prose).
 *
 * AI block parse · bindingDiamond · path ai:// · secret seal · wrangler roundtrip.
 */
import crypto from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  aiBindingDiamond,
  aiModelAtomPath,
  agentAiWorkerFace,
  deriveAiBindingDiamonds,
  filterAiBindings,
  isAiRelatedBinding,
  loadRepoAiBindings,
  sealCloudflareAiSecret,
  decryptCloudflareAiSecretIfUuid,
  verifyAiBindingDiamonds,
} from '@/cloudflare/ai'
import { parseWranglerBindings } from '@/cloudflare'
import { diamondUuid } from '@/diamond'
import { pathsMeet, toAtomPath } from '@/path'

const ROOT = process.cwd()
const WRANGLER_AI_BLOCK = `{
  "ai": { "binding": "AI" },
  "vectorize": [{ "binding": "VECTORIZE_DOCS", "index_name": "erpax-docs" }],
  "kv_namespaces": [{ "binding": "AI_CACHE", "id": "00000000000000000000000000000000" }],
  "queues": { "producers": [{ "binding": "QUEUE_AI_BATCH", "queue": "erpax-ai-batch" }] },
  "analytics_engine_datasets": [{ "binding": "ANALYTICS_AI", "dataset": "erpax_ai_inferences" }]
}`

const TEST_SEAL_KEY = crypto.randomBytes(32)
const sealOpts = { sealKey: TEST_SEAL_KEY }

describe('cloudflare AI bindings — test-first', () => {
  it('parses wrangler ai + vectorize + RAG stack from fixture', () => {
    const entries = parseWranglerBindings(WRANGLER_AI_BLOCK)
    const ai = filterAiBindings(entries)
    expect(ai.some((e) => e.type === 'ai' && e.bindingName === 'AI')).toBe(true)
    expect(ai.some((e) => e.type === 'vectorize' && e.bindingName === 'VECTORIZE_DOCS')).toBe(true)
    expect(ai.some((e) => e.bindingName === 'AI_CACHE')).toBe(true)
    expect(ai.some((e) => e.bindingName === 'QUEUE_AI_BATCH')).toBe(true)
    expect(ai.some((e) => e.bindingName === 'ANALYTICS_AI')).toBe(true)
    expect(isAiRelatedBinding({ type: 'd1_databases', bindingName: 'D1', config: {} })).toBe(false)
  })

  it('bindingDiamond(ai) — full DiamondModel + cloudflare facet + boundaryUuid', () => {
    const model = aiBindingDiamond({
      type: 'ai',
      bindingName: 'AI',
      config: { binding: 'AI' },
    })
    expect(model.boundaryUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(model.sealed).toBe(true)
    expect(model.cloudflare?.bindingType).toBe('ai')
    expect(model.cloudflare?.workerFace).toBe(true)
    expect(model.links).toContain('agent')
    expect(diamondUuid(model)).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('bindingDiamond(vectorize) — RAG facet with index modelId', () => {
    const model = aiBindingDiamond({
      type: 'vectorize',
      bindingName: 'VECTORIZE_DOCS',
      config: { binding: 'VECTORIZE_DOCS', index_name: 'erpax-docs' },
    })
    expect(model.cloudflare?.rag).toBe(true)
    expect(model.cloudflare?.modelId).toBe('erpax-docs')
  })

  it('ai:// path merges with fs agent atom path', () => {
    expect(toAtomPath('ai://agent/research', 'cloudflare')).toBe('agent/research')
    expect(pathsMeet('src/agent/research/index.ts', 'ai://agent/research', 'fs', 'cloudflare')).toBe(true)
    expect(aiModelAtomPath('agent/research')).toBe('agent/research')
    expect(toAtomPath('ai://@cf/meta/llama-3.1-8b-instruct', 'cloudflare')).toBe('meta/llama-3.1-8b-instruct')
  })

  it('agentAiWorkerFace — CF AI as worker face for angels', () => {
    const face = agentAiWorkerFace('agent/research')
    expect(face.worker).toBe(true)
    expect(face.aiBinding).toBe('AI')
    expect(face.servesAtom).toBe('agent/research')
  })

  it('sealCloudflareAiSecret round-trips via decryptIfUuid (fail-closed on wrong uuid)', () => {
    const { sealed, contextUuid } = sealCloudflareAiSecret(
      'cf-test-ai-key-not-real',
      'AI',
      '@cf/meta/llama-3.1-8b-instruct',
      sealOpts,
    )
    const plain = decryptCloudflareAiSecretIfUuid(
      sealed,
      contextUuid,
      'AI',
      '@cf/meta/llama-3.1-8b-instruct',
      sealOpts,
    )
    expect(plain).toBe('cf-test-ai-key-not-real')
    expect(() =>
      decryptCloudflareAiSecretIfUuid(sealed, contextUuid, 'AI', 'wrong-model', sealOpts),
    ).toThrow(/uuid does not match/)
  })

  it('deriveAiBindingDiamonds + verifyAiBindingDiamonds on fixture', () => {
    const diamonds = deriveAiBindingDiamonds(WRANGLER_AI_BLOCK)
    expect(diamonds.length).toBeGreaterThanOrEqual(5)
    const verdict = verifyAiBindingDiamonds(WRANGLER_AI_BLOCK)
    expect(verdict.ok).toBe(true)
    expect(verdict.count).toBe(diamonds.length)
    expect(verdict.broken).toEqual([])
  })

  it('live wrangler.jsonc declares AI + vectorize bindings', () => {
    const text = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
    const ai = loadRepoAiBindings(ROOT)
    expect(ai.some((e) => e.type === 'ai' && e.bindingName === 'AI')).toBe(true)
    expect(ai.some((e) => e.type === 'vectorize' && e.bindingName === 'VECTORIZE_DOCS')).toBe(true)
    const verdict = verifyAiBindingDiamonds(text)
    expect(verdict.count).toBeGreaterThanOrEqual(6)
    expect(verdict.ok).toBe(true)
  })
})
