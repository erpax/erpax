/**
 * Test generator — emit a chain test file (`<chain-id>.test.ts`) from
 * `@invariant` predicates + `@summary` headlines.
 *
 * Slice CCCCC (2026-05-11): the third generator. Translates the
 * natural-language predicates in `@invariant` lines to canonical
 * vitest `expect()` calls; falls back to the raw `ts` block when
 * `@invariant` form === 'ts'.
 *
 * Predicate grammar accepted:
 *
 *   result.X === <value>                  →  expect(result.X).toEqual(<value>)
 *   result.X !== <value>                  →  expect(result.X).not.toEqual(<value>)
 *   result.X.length === N                 →  expect(result.X).toHaveLength(N)
 *   result.X.length === 0                 →  expect(result.X).toEqual([])
 *   result.X >= N                         →  expect(result.X).toBeGreaterThanOrEqual(N)
 *   result.X <= N                         →  expect(result.X).toBeLessThanOrEqual(N)
 *   result.X > N                          →  expect(result.X).toBeGreaterThan(N)
 *   result.X < N                          →  expect(result.X).toBeLessThan(N)
 *   result.X === result.Y                 →  expect(result.X).toEqual(result.Y)
 *   result.succeeded === true             →  expect(result.succeeded).toBe(true)
 *   result.errors.length === 0            →  expect(result.errors).toEqual([])
 *
 * Anything that doesn't match is emitted as a comment with a TODO so
 * the author can either rewrite the predicate or escape into a
 * fenced ts block.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
 */

import type { SpecCorpus, SpecInvariant } from './types'
import type { BusinessChain } from '../business-chains/types'
import { generateChains } from './chain-registry-generator'

export interface GeneratedTest {
  readonly chainId: string
  readonly source: string
  readonly invariantCount: number
  readonly translatedCount: number
  readonly contributingFiles: ReadonlyArray<string>
}

function camelImplsName(chainId: string): string {
  const parts = chainId.toLowerCase().split('_')
  return parts[0] + parts.slice(1).map((p) => p[0].toUpperCase() + p.slice(1)).join('') + 'Impls'
}

/**
 * Translate one natural-language predicate into a vitest `expect()`
 * line. Returns null when no translation rule matches.
 */
export function translatePredicate(pred: string): string | null {
  const p = pred.trim()
  // `result.X.length === 0` (most-specific first)
  let m = p.match(/^(result\.[\w.]+?)\.length\s*===\s*0\s*$/)
  if (m) return `      expect(${m[1]}).toEqual([])`
  // `result.X.length === N`
  m = p.match(/^(result\.[\w.]+?)\.length\s*===\s*(\d+)\s*$/)
  if (m) return `      expect(${m[1]}).toHaveLength(${m[2]})`
  // `result.X === result.Y`  /  `result.X !== result.Y`
  m = p.match(/^(result\.[\w.]+)\s*(===|!==)\s*(result\.[\w.]+)\s*$/)
  if (m) return `      expect(${m[1]}).${m[2] === '!==' ? 'not.' : ''}toEqual(${m[3]})`
  // `result.X === <bool>`  →  toBe (identity check)
  m = p.match(/^(result\.[\w.]+)\s*===\s*(true|false|null|undefined)\s*$/)
  if (m) return `      expect(${m[1]}).toBe(${m[2]})`
  // `result.X === <number>`
  m = p.match(/^(result\.[\w.]+)\s*===\s*(-?\d+(?:\.\d+)?)\s*$/)
  if (m) return `      expect(${m[1]}).toEqual(${m[2]})`
  // `result.X === "<string>"` or `result.X === '<string>'`
  m = p.match(/^(result\.[\w.]+)\s*===\s*(['"])([^'"]*)\2\s*$/)
  if (m) return `      expect(${m[1]}).toEqual(${m[2]}${m[3]}${m[2]})`
  // `result.X >= N`
  m = p.match(/^(result\.[\w.]+)\s*(>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)\s*$/)
  if (m) {
    const matcher = { '>=': 'toBeGreaterThanOrEqual', '<=': 'toBeLessThanOrEqual', '>': 'toBeGreaterThan', '<': 'toBeLessThan' }[m[2]]
    return `      expect(${m[1]}).${matcher}(${m[3]})`
  }
  // `Σ(field) === <value>` — left as TODO until reduce-translator lands.
  return null
}

function emitsForChain(corpus: SpecCorpus, chainId: string): ReadonlyArray<string> {
  // Pull from the seed-side spec where @emits live.
  for (const spec of corpus.collections) {
    const hits = spec.chainSteps.filter((s) => s.chainId === chainId)
    if (hits.length > 0 && spec.emits.length > 0) {
      return spec.emits.map((e) => e.eventId)
    }
  }
  return []
}

/**
 * Generate the full test-file source for one chain.
 */
export function generateTest(corpus: SpecCorpus, chainId: string): GeneratedTest {
  const chain = generateChains(corpus, { onlyChainId: chainId })[0]
  if (!chain) throw new Error(`generateTest: no chain ${chainId} found in corpus`)

  // Aggregate invariants + summaries across the corpus for this chain.
  const invariants: SpecInvariant[] = []
  const summaries: string[] = []
  const contributingFiles = new Set<string>()
  for (const spec of corpus.collections) {
    if (spec.chainSteps.some((s) => s.chainId === chainId)
        || spec.examples.some((e) => e.chainId === chainId)
        || spec.invariants.length > 0 && spec.filePath.includes(chainId.toLowerCase().replace(/_/g, '-'))) {
      for (const inv of spec.invariants) invariants.push(inv)
      for (const s of spec.summaries) summaries.push(s.text)
      contributingFiles.add(spec.filePath)
    }
  }

  // Translate invariants → expect() lines.
  let translated = 0
  const expects: string[] = []
  for (const inv of invariants) {
    if (inv.form === 'ts' && inv.tsCode) {
      expects.push(inv.tsCode.split('\n').map((l) => '      ' + l).join('\n'))
      translated++
      continue
    }
    if (inv.form === 'predicate' && inv.predicate) {
      const line = translatePredicate(inv.predicate)
      if (line) {
        expects.push(line)
        translated++
      } else {
        expects.push(`      // TODO: untranslatable predicate — rewrite or escape into a \`\`\`ts\`\`\` block:`)
        expects.push(`      //   ${inv.predicate}`)
      }
    }
  }

  // The chain runner returns `result`; the generated test always asserts
  // emittedEvents in declared order regardless of @invariant tags.
  const chainEmits = emitsForChain(corpus, chainId)
  const declaredEmitsAssert = chainEmits.length > 0
    ? `      expect(result.emittedEvents).toEqual([${chainEmits.map((e) => `'${e}'`).join(', ')}])`
    : ''

  const exportName = camelImplsName(chainId)
  const kebabBase = chainId.toLowerCase().replace(/_/g, '-')

  const banner = `/**
 * # ${chain.name.replace(/\b\w/g, (c) => c.toUpperCase())} — generated from JSDoc spec
 *
 * **DO NOT EDIT BY HAND.** Generated by \`src/services/spec-generator/test-generator.ts\`
 * from \`@invariant\` predicates in:
${[...contributingFiles].map((f) => ` *   - ${f}`).join('\n')}
 *
 * Re-run \`pnpm spec:gen --chain=${chainId}\` to refresh.
 *
${summaries.map((s) => ` * @summary ${JSON.stringify(s)}`).join('\n')}
 *
 * @standard ${chain.standards.join('\n * @standard ')}
 * @slice CCCCC
 */`

  const source = `${banner}

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  BUSINESS_CHAINS,
  createChainContext,
  teardownChainContext,
  runChain,
  type ChainContext,
} from '@/services/business-chains'
import { ${exportName} } from '@/services/accounting/seeds/chains/${kebabBase}'

describe('Chain — ${chain.name.replace(/\b\w/g, (c) => c.toUpperCase())}', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks ${chainId} per the JSDoc spec', async () => {
    const chain = BUSINESS_CHAINS.${chainId}
    const result = await runChain(payload, chain, ctx, ${exportName})
${expects.length > 0 ? expects.join('\n') : '      expect(result.errors).toEqual([])'}
${declaredEmitsAssert}
  }, 60_000)
})
`

  return {
    chainId,
    source,
    invariantCount: invariants.length,
    translatedCount: translated,
    contributingFiles: [...contributingFiles],
  }
}

/**
 * Registry-driven variant — generate the test from a `BUSINESS_CHAINS`
 * entry directly (the source of truth), with invariants mapped in by the
 * caller (from the chain's step-collection files). No `@chainStep` corpus
 * dependency: chain name, standards, declared seed path, and ordered
 * `emits` all come from the registry entry. The seed import resolves to the
 * registry-declared `seedFile`.
 */
export function generateChainTestFromRegistry(
  chain: BusinessChain,
  invariants: ReadonlyArray<SpecInvariant> = [],
): GeneratedTest {
  const exportName = camelImplsName(chain.id)
  const seedImport = chain.seedFile.replace(/^src\//, '@/').replace(/\.ts$/, '')

  let translated = 0
  const expects: string[] = []
  for (const inv of invariants) {
    if (inv.form === 'ts' && inv.tsCode) {
      expects.push(inv.tsCode.split('\n').map((l) => '      ' + l).join('\n'))
      translated++
      continue
    }
    if (inv.form === 'predicate' && inv.predicate) {
      const line = translatePredicate(inv.predicate)
      if (line) { expects.push(line); translated++ }
      else {
        expects.push(`      // TODO: untranslatable predicate — rewrite or escape into a \`\`\`ts\`\`\` block:`)
        expects.push(`      //   ${inv.predicate}`)
      }
    }
  }

  const emits = chain.steps.map((s) => s.emits).filter((e): e is string => Boolean(e))
  const emitsAssert = emits.length > 0
    ? `      expect(result.emittedEvents).toEqual([${emits.map((e) => `'${e}'`).join(', ')}])`
    : ''

  const banner = `/**
 * # ${chain.name} — generated from the chain registry
 *
 * **DO NOT EDIT BY HAND.** Generated by \`generateChainTestFromRegistry\`
 * from \`BUSINESS_CHAINS.${chain.id}\` (src/services/business-chains/registry.ts)
 * + \`@invariant\` banners in its step-collection files.
 *
 * Re-run \`pnpm spec:gen --emit=${chain.id}\` to refresh.
 *
 * @standard ${chain.standards.join('\n * @standard ')}
 */`

  const source = `${banner}

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  BUSINESS_CHAINS,
  createChainContext,
  teardownChainContext,
  runChain,
  type ChainContext,
} from '@/services/business-chains'
import { ${exportName} } from '${seedImport}'

describe('Chain — ${chain.name}', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks ${chain.id} per the registry', async () => {
    const chain = BUSINESS_CHAINS.${chain.id}
    const result = await runChain(payload, chain, ctx, ${exportName})
${expects.length > 0 ? expects.join('\n') : '      expect(result.errors).toEqual([])'}
${emitsAssert}
  }, 60_000)
})
`

  return {
    chainId: chain.id,
    source,
    invariantCount: invariants.length,
    translatedCount: translated,
    contributingFiles: [chain.seedFile],
  }
}
