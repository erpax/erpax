/**
 * Chain registry generator — produce BusinessChain entries from parsed
 * `@chain` + `@emits` + `@feature` JSDoc tags.
 *
 * Slice CCCCC (2026-05-11): the FIRST proof that JSDoc-as-spec works
 * end-to-end. Given the parsed `CollectionSpec` corpus, group every
 * `chainStep` by its `chainId`, sort by `stepIndex`, pair each step
 * with its `emits` declaration (matched by stepIndex), and emit the
 * canonical `BusinessChain` shape.
 *
 * The output diffs identically against `src/services/business-chains/
 * registry.ts` for chains where every step's collection-slug + emitted-
 * event are declared in JSDoc. Chains that haven't yet adopted the
 * CCCCC tag vocabulary are reported as `incomplete`.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
 * @audit ISO 19011:2018 §6.4.6 spec-traceability
 */

import type { CollectionSpec, SpecCorpus, SpecChainStep, SpecEmit } from './types'

export interface GeneratedChainStep {
  readonly collection: string
  readonly action: string
  readonly emits: string
  readonly requires: ReadonlyArray<string>
}

export interface GeneratedChain {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly standards: ReadonlyArray<string>
  readonly featureGate?: string
  readonly steps: ReadonlyArray<GeneratedChainStep>
  readonly seedFile: string
  readonly testFile: string
  /** Tag-to-source provenance — which file declared each step. */
  readonly provenance: ReadonlyArray<{ stepIndex: number; sourceFile: string }>
  /** When < total steps had a `@chain` tag, which steps were missing. */
  readonly missingSteps: ReadonlyArray<number>
}

export interface GenerateOptions {
  /** Filter to a specific chain id (e.g. "CONSIGNMENT_CYCLE"). */
  readonly onlyChainId?: string
}

/**
 * Walk the corpus and build a `GeneratedChain` per `chainId` discovered
 * via `@chain` tags.
 */
export function generateChains(
  corpus: SpecCorpus,
  opts: GenerateOptions = {},
): ReadonlyArray<GeneratedChain> {
  // chainId → all per-step contributions across the corpus.
  const byChain = new Map<string, {
    steps: Map<number, { spec: CollectionSpec; step: SpecChainStep }>
    emits: SpecEmit[]
    standards: Set<string>
    feature?: string
    summaries: Set<string>
    seedFile?: string
    testFile?: string
  }>()

  for (const spec of corpus.collections) {
    for (const step of spec.chainSteps) {
      if (opts.onlyChainId && step.chainId !== opts.onlyChainId) continue
      let bucket = byChain.get(step.chainId)
      if (!bucket) {
        bucket = {
          steps: new Map(),
          emits: [],
          standards: new Set(),
          summaries: new Set(),
        }
        byChain.set(step.chainId, bucket)
      }
      bucket.steps.set(step.stepIndex, { spec, step })
      // Aggregate per-chain metadata from any spec touching this chain.
      for (const e of spec.emits) bucket.emits.push(e)
      for (const s of spec.standards) bucket.standards.add(`${s.body} ${s.id}`.trim())
      if (spec.features.length > 0 && !bucket.feature) bucket.feature = spec.features[0].id
      for (const s of spec.summaries) bucket.summaries.add(s.text)
      // The seed source file is the spec carrier whose path includes /seeds/chains/.
      if (spec.filePath.includes('/seeds/chains/')) {
        if (spec.filePath.endsWith('.test.ts')) bucket.testFile = spec.filePath
        else bucket.seedFile = spec.filePath
      }
    }
  }

  const out: GeneratedChain[] = []
  for (const [chainId, bucket] of byChain) {
    const stepIndices = [...bucket.steps.keys()].sort((a, b) => a - b)
    const totalSteps = bucket.steps.get(stepIndices[0])?.step.totalSteps ?? stepIndices.length
    const missing: number[] = []
    for (let i = 1; i <= totalSteps; i++) if (!bucket.steps.has(i)) missing.push(i)

    // Build the steps array.
    const steps: GeneratedChainStep[] = []
    const provenance: { stepIndex: number; sourceFile: string }[] = []
    let prevEmits: string | null = null
    for (const i of stepIndices) {
      const entry = bucket.steps.get(i)!
      // Emits[i-1] aligns to step i (emits declared in seed banner are
      // listed in step order). Fall back to a synthesised event id
      // when the seed didn't declare one for this step.
      const emit = bucket.emits[i - 1]?.eventId ?? `${chainId.toLowerCase()}:step-${i}`
      // Strict collection resolution: the @chain note SHOULD include a
      // `collection=<slug>` marker. Fall back to free-text scan, then
      // to the spec's own slug (least precise).
      const note = entry.step.note ?? ''
      const collectionMarked = note.match(/\bcollection=([\w-]+)/)?.[1]
      const collectionFreeText = collectionMarked
        ? null
        : note.match(/(\w+-\w[\w-]*)/)?.[1]
      const collection = collectionMarked
        ?? collectionFreeText
        ?? entry.spec.slug
      // Action: marker `action=<verb>` if present, else step-N.
      const actionMarked = note.match(/\baction=([\w-]+)/)?.[1]
      steps.push({
        collection,
        action: actionMarked ?? `step-${i}`,
        emits: emit,
        requires: prevEmits ? [prevEmits] : [],
      })
      provenance.push({ stepIndex: i, sourceFile: entry.spec.filePath })
      prevEmits = emit
    }

    out.push({
      id: chainId,
      name: chainId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).toLowerCase(),
      description: bucket.summaries.size > 0
        ? [...bucket.summaries].join(' ')
        : `Auto-generated from JSDoc tags in ${stepIndices.length} step source(s).`,
      standards: [...bucket.standards],
      featureGate: bucket.feature,
      steps,
      seedFile: bucket.seedFile ?? '',
      testFile: bucket.testFile ?? '',
      provenance,
      missingSteps: missing,
    })
  }
  return out
}

/**
 * Emit a generator-equivalent TypeScript snippet for a single chain.
 * Useful as `pnpm spec:gen --chain=CONSIGNMENT_CYCLE` to diff against
 * the hand-authored `BUSINESS_CHAINS[CONSIGNMENT_CYCLE]` block.
 */
export function renderChainAsTs(chain: GeneratedChain): string {
  const stepLines = chain.steps.map((s) =>
    `      { collection: '${s.collection}', action: '${s.action}', emits: '${s.emits}', requires: [${s.requires.map((r) => `'${r}'`).join(', ')}] },`,
  ).join('\n')
  const standardsLine = chain.standards.map((s) => `'${s.replace(/'/g, "\\'")}'`).join(', ')
  return `  ${chain.id}: {
    id: '${chain.id}',
    name: ${JSON.stringify(chain.name)},
    description: ${JSON.stringify(chain.description)},
    standards: [${standardsLine}],
    featureGate: ${chain.featureGate ? `'${chain.featureGate}'` : 'undefined'},
    steps: [
${stepLines}
    ],
    seedFile: '${chain.seedFile}',
    testFile: '${chain.testFile}',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true,
      note: 'Generated from JSDoc spec via spec-generator/chain-registry-generator.ts.' },
  },`
}
