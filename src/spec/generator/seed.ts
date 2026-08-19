/**
 * Seed generator — emit a chain seed file (`<chain-id>.ts`) from
 * `@example` payload blocks.
 *
 * Slice CCCCC (2026-05-11): the second generator. Given a parsed
 * corpus + a chain id, build the canonical `ChainStepImpl[]` source
 * that the runner consumes:
 *
 *   import type { ChainImpls, ChainStepImpl } from '@/business/chain'
 *
 *   const ts = () => Date.now().toString(36)
 *
 *   const step1: ChainStepImpl = async (payload, ctx, state) => {
 *     const out = await payload.create({
 *       collection: 'consignment-arrangements',
 *       data: { reference: `CONS-${ts()}`, consignee: state.addressId as string, ... },
 *       overrideAccess: true,
 *     }) as unknown as { id: string }
 *     state.arrangementId = out.id
 *     return 'consignment:arranged'
 *   }
 *   …
 *   export const consignmentCycleImpls: ChainImpls = [step1, step2, ...]
 *
 * Placeholder grammar (resolved at runtime by the chain runner OR
 * inlined here for known shapes):
 *   {{ctx.X}}        → ctx.X
 *   {{state.X}}      → state.X as string
 *   {{now}}          → new Date().toISOString()
 *   {{now+30d}}      → new Date(Date.now() + 30 * 86_400_000).toISOString()
 *   {{ts}}           → ts()
 *   {{const.X}}      → CONST_X    (future — once @const tags land)
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
 */

import type { SpecCorpus, SpecExample } from './types'
import { generateChains } from './chain-registry-generator'

/** Output of `generateSeed()` — the rendered TS source + provenance. */
export interface GeneratedSeed {
  readonly chainId: string
  readonly source: string
  readonly stepCount: number
  readonly missingExamples: ReadonlyArray<number>
  /** Source files whose JSDoc contributed @example blocks for this chain. */
  readonly contributingFiles: ReadonlyArray<string>
}

/**
 * Replace `{{...}}` placeholders inside a JSON payload with live JS
 * expressions. The result is a TS object literal, NOT a JSON string.
 */
function resolvePlaceholders(payload: Record<string, unknown>): string {
  const json = JSON.stringify(payload, null, 8)
    .replace(/^/gm, '      ') // base indent for the inner literal
    .trimStart()
  // Convert quoted placeholder strings into bare TS expressions.
  // `"{{ctx.tenantId}}"` → `ctx.tenantId`
  // `"{{state.invoiceId}}"` → `state.invoiceId as string`
  // `"{{now}}"` → `new Date().toISOString()`
  // `"{{now+30d}}"` → `new Date(Date.now() + 30 * 86_400_000).toISOString()`
  // `"{{now-1d}}"` → `new Date(Date.now() - 1 * 86_400_000).toISOString()`
  // `"{{ts}}"` → `ts()`
  // `"CONS-{{ts}}"` → `` `CONS-${ts()}` ``  (template literal)
  return json.replace(/"([^"]*\{\{[^"]+\}\}[^"]*)"/g, (_, val: string) => {
    // Pure placeholder, no surrounding text → emit as bare expression.
    const pure = val.match(/^\{\{([^}]+)\}\}$/)
    if (pure) return resolvePlaceholderToken(pure[1])
    // Mixed string + placeholder(s) → template literal.
    const tpl = val.replace(/\{\{([^}]+)\}\}/g, (_, tok) => `\${${resolvePlaceholderToken(tok)}}`)
    return `\`${tpl}\``
  })
}

function resolvePlaceholderToken(tok: string): string {
  if (tok === 'now') return 'new Date().toISOString()'
  if (tok === 'ts') return 'ts()'
  const nowOff = tok.match(/^now([+-])(\d+)d$/)
  if (nowOff) {
    const sign = nowOff[1] === '+' ? '+' : '-'
    const days = nowOff[2]
    return `new Date(Date.now() ${sign} ${days} * 86_400_000).toISOString()`
  }
  if (tok.startsWith('ctx.')) return tok                       // ctx.tenantId
  if (tok.startsWith('state.')) return `${tok} as string`      // state.invoiceId as string
  if (tok.startsWith('const.')) return tok.replace('const.', '').toUpperCase()
  return tok
}

/**
 * Convert a chain id to a camelCase impls export name.
 * `CONSIGNMENT_CYCLE` → `consignmentCycleImpls`
 */
function camelImplsName(chainId: string): string {
  const parts = chainId.toLowerCase().split('_')
  return parts[0] + parts.slice(1).map((p) => p[0].toUpperCase() + p.slice(1)).join('') + 'Impls'
}

/** Per-step impl block. */
function renderStep(
  stepIndex: number,
  collection: string,
  emits: string,
  payload: Record<string, unknown>,
  stateKey?: string,
): string {
  const dataLiteral = resolvePlaceholders(payload)
  const captureId = stateKey
    ? `      const out = await payload.create({\n        collection: '${collection}',\n        data: ${dataLiteral} as Record<string, unknown>,\n        overrideAccess: true,\n      }) as unknown as { id: string }\n      state.${stateKey} = out.id`
    : `      await payload.create({\n        collection: '${collection}',\n        data: ${dataLiteral} as Record<string, unknown>,\n        overrideAccess: true,\n      })`
  return `const step${stepIndex}: ChainStepImpl = async (payload, ctx, state) => {
${captureId}
      return '${emits}'
    }`
}

/**
 * Generate the full seed-file source for one chain. Throws if the
 * chain is incomplete (missing @example blocks for any step).
 */
export function generateSeed(corpus: SpecCorpus, chainId: string): GeneratedSeed {
  const chain = generateChains(corpus, { onlyChainId: chainId })[0]
  if (!chain) throw new Error(`generateSeed: no chain ${chainId} found in corpus`)

  // Collect @example blocks for this chain across all specs.
  const examplesByStep = new Map<number, SpecExample>()
  const contributingFiles = new Set<string>()
  for (const spec of corpus.collections) {
    for (const ex of spec.examples) {
      if (ex.chainId === chainId) {
        examplesByStep.set(ex.stepIndex, ex)
        contributingFiles.add(spec.filePath)
      }
    }
  }

  const missingExamples: number[] = []
  for (let i = 1; i <= chain.steps.length; i++) {
    if (!examplesByStep.has(i)) missingExamples.push(i)
  }

  // Per-step state keys (heuristic: `<collection-singular>Id`).
  const stateKeyFor = (collection: string): string => {
    // consignment-arrangements → arrangementId; payments → paymentId
    const last = collection.split('-').slice(-1)[0]
    const singular = last.endsWith('s') ? last.slice(0, -1) : last
    return `${singular.replace(/[^a-zA-Z]/g, '')}Id`
  }

  const stepBlocks: string[] = []
  for (let i = 1; i <= chain.steps.length; i++) {
    const step = chain.steps[i - 1]
    const ex = examplesByStep.get(i)
    if (!ex) {
      stepBlocks.push(`// step ${i} of ${chain.steps.length} — MISSING @example block; placeholder follows
const step${i}: ChainStepImpl = async (payload, ctx, state) => {
      // TODO: add `+'`@example '+chainId+' / step '+i+'-of-'+chain.steps.length+'`'+` block to the test JSDoc.
      return '${step.emits}'
    }`)
      continue
    }
    stepBlocks.push(renderStep(i, step.collection, step.emits, ex.payload, stateKeyFor(step.collection)))
  }

  const exportName = camelImplsName(chainId)
  const stepRefs = Array.from({ length: chain.steps.length }, (_, i) => `step${i + 1}`).join(', ')

  const banner = `/**
 * # ${chain.name.replace(/\b\w/g, (c) => c.toUpperCase())} — generated from JSDoc spec
 *
 * **DO NOT EDIT BY HAND.** Generated by \`src/services/spec-generator/seed-generator.ts\`
 * from \`@example\` payloads in:
${[...contributingFiles].map((f) => ` *   - ${f}`).join('\n')}
 *
 * Re-run \`pnpm spec:gen --chain=${chainId}\` to refresh.
 *
 * @standard ${chain.standards.join('\n * @standard ')}
 * @feature ${chain.featureGate ?? '(none — core)'}
 * @slice CCCCC
 */`

  const source = `${banner}

import type { ChainImpls, ChainStepImpl } from '@/business/chain'

const ts = () => Date.now().toString(36)

${stepBlocks.join('\n\n')}

export const ${exportName}: ChainImpls = [${stepRefs}]
`

  return {
    chainId,
    source,
    stepCount: chain.steps.length,
    missingExamples,
    contributingFiles: [...contributingFiles],
  }
}
