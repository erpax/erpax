import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSpecifiersOf } from '@/syntax'
import { bindingDiamond, deriveWranglerDiamonds, aiBindingDiamond } from './index'

describe('cloudflare/derive — the corpus half, off the runtime face', () => {
  it('derives a sealed diamond for a binding', () => {
    const model = bindingDiamond({ type: 'd1_databases', bindingName: 'DB', config: { database_name: 'erpax' } })
    expect(model.atomPath).toContain('cloudflare')
    expect(model.boundaryUuid).toBeTruthy()
  })

  it('derives one diamond per binding in wrangler text', () => {
    const text = readFileSync(join(process.cwd(), 'wrangler.jsonc'), 'utf8')
    expect(deriveWranglerDiamonds(text).length).toBeGreaterThan(0)
  })

  it('the AI derivation adds its own links on top of the binding diamond', () => {
    const m = aiBindingDiamond({ type: 'ai', bindingName: 'AI', config: {} })
    expect(m.links).toContain('ai')
    expect(m.links).toContain('agent')
  })
})

/*
 * THE CUT ITSELF, asserted. A value import of @/diamond from any of the three runtime files puts
 * the gate registry — and a TypeScript compiler — back inside every Worker that calls kvGet.
 */
describe('cloudflare/derive — the runtime files may name DiamondModel, never import its values', () => {
  for (const file of ['bindings.ts', 'wrangler.ts', 'ai.ts']) {
    it(`../${file} does not import @/diamond as a value`, () => {
      const path = join(import.meta.dirname, '..', file)
      const text = readFileSync(path, 'utf8')
      // A `import type { … } from '@/diamond'` is erased by the compiler and costs nothing.
      const valueImport = /^import\s+\{(?![^}]*\btype\b[^}]*\}\s*from\s*'@\/diamond')[^}]*\}\s*from\s*'@\/diamond'/m
      expect(valueImport.test(text)).toBe(false)
      expect(importSpecifiersOf(file, text)).not.toContain('./derive')
    })
  }
})
