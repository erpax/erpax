import { describe, it, expect } from 'vitest'
import { verifyAiBindingDiamonds } from './index'

const WRANGLER_AI_FIXTURE = `{
  "ai": { "binding": "AI" },
  "vectorize": [{ "binding": "VECTORIZE_DOCS", "index_name": "erpax-docs" }]
}`

describe('cloudflare/ai atom — trinity proof', () => {
  it('verifyAiBindingDiamonds seals fixture without Payload', () => {
    const verdict = verifyAiBindingDiamonds(WRANGLER_AI_FIXTURE)
    expect(verdict.ok).toBe(true)
    expect(verdict.count).toBeGreaterThanOrEqual(2)
  })
})
