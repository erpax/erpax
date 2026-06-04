/**
 * Translation generator — emit per-locale translation rows from the
 * SpecCorpus + EvidenceCorpus, mirroring the spec-derivation logic
 * already used by `test-generator.ts` and `chain-registry-generator.ts`.
 *
 * Slice CCCCC-cut2-i18n (2026-05-11): captions for the multilingual
 * surface (admin labels, chain registry titles, walkthrough captions,
 * PDF/A audit blocks) MUST come from the spec — not from
 * `humanise(slug)` — for the same reason tests are generated from
 * `@invariant` and seeds from `@example`: the JSDoc IS the spec.
 *
 * Derivation rules (per key kind):
 *
 *   collection.<slug>.singular     ← CollectionSpec.title
 *                                    (banner H1, e.g. "# Invoices")
 *                                    fallback: humanise(slug)
 *
 *   collection.<slug>.plural       ← English plural rule applied to
 *                                    `singular` (rules below); fallback
 *                                    to `singular` itself.
 *
 *   collection.<slug>.description  ← CollectionSpec.summaries[0].text
 *                                    (first @summary "<text>" tag)
 *                                    fallback: first sentence of
 *                                    CollectionSpec.description
 *
 *   chain.<id>.title               ← humanise(chainId) — chain banners
 *                                    don't carry an explicit @title yet
 *                                    so the SCREAMING_SNAKE name is
 *                                    canonicalised here. Override via
 *                                    `@summary "<text>"` in the seed
 *                                    file (CollectionSpec lookup falls
 *                                    back through the basename).
 *
 *   chain.<id>.description         ← first @summary on the seed file's
 *                                    spec; fallback to first paragraph.
 *
 *   chain.<id>.steps.<step-id>     ← the description after the
 *                                    `collection=X action=Y — ` marker
 *                                    inside the @chain step note (this
 *                                    is the rich step text humans
 *                                    actually wrote in the seed file's
 *                                    JSDoc — e.g. "Sign master
 *                                    arrangement (consignor + consignee
 *                                    + commission %)").
 *
 *   workflow.<wf>.title            ← @useCase first markdown line on
 *                                    the matching e2e spec; fallback
 *                                    humanise(workflow).
 *
 *   workflow.<wf>.description      ← @summary on the e2e spec; fallback
 *                                    to first paragraph.
 *
 *   workflow.<wf>.video.caption    ← static "Process walk-through"
 *                                    (per i18n localisation guide; this
 *                                    is the literal accessibility label
 *                                    for the video element, not a
 *                                    spec-content carrier).
 *
 *   workflow.<wf>.steps.<step-id>  ← the parsed `label` attached to the
 *                                    `<workflow>__<step>__<label>.png`
 *                                    file naming convention by the
 *                                    `captureWorkflowStep` helper at
 *                                    record time. Fallback humanise.
 *
 * The output is a `Record<key, defaultEnglish>` map. The stub-filler
 * applies it: EN gets the value verbatim; non-EN gets `[en] <value>`.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
 * @standard BCP-47 language-tag
 * @standard W3C i18n key-naming-best-practices
 */

import type { SpecCorpus, CollectionSpec } from '@/spec/generator/types'
import type { EvidenceCorpus } from '@/spec/generator/evidence-collector'
import type { E2eSpecCorpus } from '@/spec/generator/e2e-spec-extractor'
import {
  collectionKeys, chainKeys, chainStepKey,
  workflowKeys, workflowStepKey, humaniseSlug,
} from '@/spec/generator/i18n-keys'
import { SPEC_TEMPLATES, templateKey, compose, allTemplateKeys, type SpecTypeKind } from '@/spec/generator/spec-templates'

/** Output of `generateTranslations()` — flat key→default-English map. */
export interface GeneratedTranslations {
  /** `key → defaultEnglish` for every spec-derived translation row. */
  readonly defaults: ReadonlyMap<string, string>
  /** Provenance: which spec source each key came from. */
  readonly provenance: ReadonlyMap<string, string>
  /** Per-instance composition manifest: spec instance → template key + vars. */
  readonly compositions: ReadonlyArray<{
    readonly key: string
    readonly templateKind: SpecTypeKind
    readonly templateKey: string
    readonly vars: Record<string, unknown>
  }>
}

/**
 * Apply a small set of English plural rules. We deliberately stay
 * minimalist — anything irregular MUST come from the spec via an
 * explicit `@summary` override (same way SOX-control descriptions
 * already work). Rules:
 *
 *   *y    → *ies   (when preceded by a consonant)
 *   *ay   → *ays   (vowel-y stays unchanged)
 *   *us   → *uses  (focus → focuses; bus → buses; status → statuses)
 *   *s/*x/*ch/*sh → +es
 *   *fe   → *ves   (life → lives, knife → knives)
 *   *f    → *ves   (leaf → leaves) — but allow @summary override
 *   default → +s
 *
 * Already-plural forms (ending in "s" with a known plural-ish stem)
 * are returned verbatim. Detection is best-effort.
 */
export function pluraliseEnglish(singular: string): string {
  const s = singular.trim()
  if (s.length === 0) return s
  // already-plural-ish heuristic: ends in s but not ss/us/is — leave alone
  if (/[^sui]s$/i.test(s) && !/(news|series|species)$/i.test(s)) return s
  if (/[^aeiou]y$/i.test(s)) return s.slice(0, -1) + 'ies'
  if (/(s|x|ch|sh)$/i.test(s)) return s + 'es'
  if (/us$/i.test(s)) return s.slice(0, -2) + 'uses'
  if (/fe$/i.test(s)) return s.slice(0, -2) + 'ves'
  return s + 's'
}

/** First non-empty paragraph from a multi-line markdown string. */
function firstParagraph(md: string): string {
  const cleaned = md
    .replace(/^#+\s.*$/gm, '')          // strip headings
    .replace(/^>\s.*$/gm, '')           // strip quotes
    .replace(/^@\w+.*$/gm, '')          // strip stray @tags
    .trim()
  const paras = cleaned.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  return paras[0] ?? ''
}

/** Truncate description to a single sentence (admin.description fits). */
function firstSentence(s: string): string {
  const m = s.match(/^([^.!?]+[.!?])/)
  return (m ? m[1] : s).trim()
}

/** Derive translations for one collection — composed through templates. */
function deriveCollection(
  spec: CollectionSpec,
  out: Map<string, string>,
  prov: Map<string, string>,
  comps: { key: string; templateKind: SpecTypeKind; templateKey: string; vars: Record<string, unknown> }[],
): void {
  const k = collectionKeys(spec.slug)
  const titleRaw = spec.title?.trim() || humaniseSlug(spec.slug)
  const singular = titleRaw.replace(/^#+\s*/, '').trim()
  const plural = pluraliseEnglish(singular)
  const description = (spec.summaries[0]?.text || firstSentence(firstParagraph(spec.description || '')) || singular).trim()

  // Compose via templates so locales translate the template (not each row).
  const sVars = { title: singular }
  const pVars = { plural }
  const dVars = { description }
  const sValue = compose(SPEC_TEMPLATES['collection-singular'], sVars)
  const pValue = compose(SPEC_TEMPLATES['collection-plural'], pVars)
  const dValue = compose(SPEC_TEMPLATES['collection-description'], dVars)

  if (!out.has(k.singular))    { out.set(k.singular, sValue);    prov.set(k.singular, `template:collection-singular ← ${spec.filePath}#title`) }
  if (!out.has(k.plural))      { out.set(k.plural, pValue);      prov.set(k.plural, `template:collection-plural ← pluraliseEnglish(${singular})`) }
  if (!out.has(k.description)) { out.set(k.description, dValue); prov.set(k.description, `template:collection-description ← ${spec.filePath}#summaries[0]||firstSentence`) }

  comps.push(
    { key: k.singular,    templateKind: 'collection-singular',    templateKey: templateKey('collection-singular'),    vars: sVars },
    { key: k.plural,      templateKind: 'collection-plural',      templateKey: templateKey('collection-plural'),      vars: pVars },
    { key: k.description, templateKind: 'collection-description', templateKey: templateKey('collection-description'), vars: dVars },
  )
}

/**
 * Derive translations for chains. Chains live in seed files
 * (src/plugins/accounting/seeds/chains/<chain-id>.ts); the extractor's
 * dual-source pass treats those as spec carriers when the banner has
 * `@chain` tags. We pull title/description from the seed-file spec
 * (matched by basename → SCREAMING_SNAKE chainId) and per-step
 * descriptions from the parsed step `note` (after the
 * `collection=X action=Y — ` marker).
 */
function deriveChains(
  corpus: SpecCorpus,
  out: Map<string, string>,
  prov: Map<string, string>,
  comps: { key: string; templateKind: SpecTypeKind; templateKey: string; vars: Record<string, unknown> }[],
): void {
  // index chain → contributing CollectionSpecs + per-step structured vars
  const byChain = new Map<string, CollectionSpec[]>()
  const stepVarsByChain = new Map<string, Map<string, {
    chainId: string
    stepIndex: number
    totalSteps: number
    action: string
    collection: string
    collectionLabel: string
    description: string
  }>>()
  for (const c of corpus.collections) {
    for (const step of c.chainSteps ?? []) {
      let arr = byChain.get(step.chainId)
      if (!arr) { arr = []; byChain.set(step.chainId, arr) }
      if (!arr.includes(c)) arr.push(c)
      const note = step.note ?? ''
      const collectionMarked = note.match(/\bcollection=([\w-]+)/)?.[1]
      const actionMarked = note.match(/\baction=([\w-]+)/)?.[1]
      const stepId = collectionMarked && actionMarked
        ? `${String(step.stepIndex).padStart(2, '0')}-${collectionMarked}-${actionMarked}`
        : `${String(step.stepIndex).padStart(2, '0')}-step`
      const description = note.replace(/^\s*[-—–]?\s*collection=[\w-]+\s+action=[\w-]+\s*[-—–]\s*/, '').trim()
      let sm = stepVarsByChain.get(step.chainId)
      if (!sm) { sm = new Map(); stepVarsByChain.set(step.chainId, sm) }
      if (!sm.has(stepId)) sm.set(stepId, {
        chainId: step.chainId,
        stepIndex: step.stepIndex,
        totalSteps: step.totalSteps,
        action: actionMarked ?? 'execute',
        collection: collectionMarked ?? '',
        collectionLabel: collectionMarked ? humaniseSlug(collectionMarked) : '',
        description: description || humaniseSlug(stepId),
      })
    }
  }

  for (const [chainId, contributors] of byChain) {
    const k = chainKeys(chainId)
    const kebabId = chainId.toLowerCase().replace(/_/g, '-')
    const seed = contributors.find((c) => c.slug === kebabId) ?? contributors[0]
    const title = seed?.title?.replace(/^#+\s*/, '').trim() || humaniseSlug(chainId)
    const description = (seed?.summaries[0]?.text
      || firstSentence(firstParagraph(seed?.description || ''))
      || title).trim()

    // Compose via type templates
    const titleVars = { title }
    const descVars = { description }
    if (!out.has(k.title))       { out.set(k.title, compose(SPEC_TEMPLATES['chain-title'], titleVars)); prov.set(k.title, `template:chain-title ← chain seed ${seed?.slug ?? chainId}#title`) }
    if (!out.has(k.description)) { out.set(k.description, compose(SPEC_TEMPLATES['chain-description'], descVars)); prov.set(k.description, `template:chain-description ← chain seed ${seed?.slug ?? chainId}#summaries[0]`) }
    comps.push(
      { key: k.title,       templateKind: 'chain-title',       templateKey: templateKey('chain-title'),       vars: titleVars },
      { key: k.description, templateKind: 'chain-description', templateKey: templateKey('chain-description'), vars: descVars },
    )

    for (const [stepId, vars] of stepVarsByChain.get(chainId) ?? new Map()) {
      const sk = chainStepKey(chainId, stepId)
      const composed = compose(SPEC_TEMPLATES['chain-step'], vars)
      if (!out.has(sk)) { out.set(sk, composed); prov.set(sk, `template:chain-step ← @chain step (${chainId}/${stepId})`) }
      comps.push({ key: sk, templateKind: 'chain-step', templateKey: templateKey('chain-step'), vars })
    }
  }
}

/**
 * Derive translations for e2e workflows from the EvidenceCorpus.
 * Workflow titles fall back to humanise; per-step captions come from
 * the parsed `label` baked into the screenshot filename by
 * `captureWorkflowStep()` (which the helper writes verbatim from the
 * test author's input — this IS spec-derived content).
 */
function deriveWorkflows(
  evidence: EvidenceCorpus,
  e2e: E2eSpecCorpus | undefined,
  out: Map<string, string>,
  prov: Map<string, string>,
  comps: { key: string; templateKind: SpecTypeKind; templateKey: string; vars: Record<string, unknown> }[],
): void {
  // Union the workflow ids: any from evidence + any from e2e specs.
  const workflowIds = new Set<string>()
  for (const wf of evidence.byWorkflow.keys()) workflowIds.add(wf)
  if (e2e) for (const id of e2e.byWorkflow.keys()) workflowIds.add(id)

  for (const workflow of workflowIds) {
    const wf = evidence.byWorkflow.get(workflow)
    const e2eSpec = e2e?.byWorkflow.get(workflow)
    const k = workflowKeys(workflow)
    // Title: prefer e2e describeTitle / testTitle (richer); fall back to humanise.
    const titleSource = e2eSpec?.describeTitle ?? e2eSpec?.testTitle
    const title = titleSource
      ? titleSource.replace(/^ERP workflow:\s*/i, '').trim()
      : humaniseSlug(workflow)
    const titleVars = { title }
    const descVars = { title }
    const videoVars = {} as Record<string, unknown>
    if (!out.has(k.title))        { out.set(k.title, compose(SPEC_TEMPLATES['workflow-title'], titleVars)); prov.set(k.title, titleSource ? `template:workflow-title ← e2e describe(${e2eSpec?.filePath})` : `template:workflow-title ← humanise(${workflow})`) }
    if (!out.has(k.description))  { out.set(k.description, compose(SPEC_TEMPLATES['workflow-description'], descVars)); prov.set(k.description, `template:workflow-description ← workflow title`) }
    if (!out.has(k.videoCaption)) { out.set(k.videoCaption, compose(SPEC_TEMPLATES['workflow-video-caption'], videoVars)); prov.set(k.videoCaption, `template:workflow-video-caption (a11y W3C HTML5 §4.7.10.2)`) }
    comps.push(
      { key: k.title,        templateKind: 'workflow-title',         templateKey: templateKey('workflow-title'),         vars: titleVars },
      { key: k.description,  templateKind: 'workflow-description',   templateKey: templateKey('workflow-description'),   vars: descVars },
      { key: k.videoCaption, templateKind: 'workflow-video-caption', templateKey: templateKey('workflow-video-caption'), vars: videoVars },
    )

    // Per-step captions: prefer e2e spec's `captureWorkflowStep(... 'description')`
    // — that's the canonical "what is happening" string the test author wrote.
    // Fall back to evidence label when no matching e2e step exists.
    const stepDescriptions = new Map<string, string>()
    if (e2eSpec) for (const s of e2eSpec.steps) stepDescriptions.set(s.stepId, s.description)
    const stepIds = new Set<string>(stepDescriptions.keys())
    if (wf) for (const s of wf.screenshots) if (s.stepId) stepIds.add(s.stepId)

    let stepIndex = 0
    const orderedStepIds = [...stepIds].sort()
    for (const stepId of orderedStepIds) {
      stepIndex += 1
      const sk = workflowStepKey(workflow, stepId)
      const description = stepDescriptions.get(stepId)
      const evidenceLabel = wf?.screenshots.find((s) => s.stepId === stepId)?.label
      const label = (description ?? evidenceLabel ?? humaniseSlug(stepId)).trim()
      const stepVars = { stepIndex, label }
      if (!out.has(sk)) {
        out.set(sk, compose(SPEC_TEMPLATES['workflow-step-caption'], stepVars))
        prov.set(sk, description
          ? `template:workflow-step-caption ← e2e captureWorkflowStep(${workflow}/${stepId})`
          : `template:workflow-step-caption ← evidence label (${workflow}/${stepId})`)
      }
      comps.push({ key: sk, templateKind: 'workflow-step-caption', templateKey: templateKey('workflow-step-caption'), vars: stepVars })
    }
  }
}

/**
 * Generate the full translation row set from the spec corpus + evidence
 * corpus. Pure function; no I/O. Hand the result to `fillStubs()` to
 * write the bundles.
 */
export function generateTranslations(args: {
  spec?: SpecCorpus
  evidence?: EvidenceCorpus
  e2e?: E2eSpecCorpus
}): GeneratedTranslations {
  const out = new Map<string, string>()
  const prov = new Map<string, string>()
  const compositions: { key: string; templateKind: SpecTypeKind; templateKey: string; vars: Record<string, unknown> }[] = []

  // Step 1: emit one row per spec-template type so locales can translate
  // the template once instead of every instance. The default-EN value IS
  // the template literal; non-EN locales receive `[en] <template>` until
  // a translator works through them.
  for (const t of allTemplateKeys()) {
    if (!out.has(t.key)) {
      out.set(t.key, t.defaultEnglish)
      prov.set(t.key, `SPEC_TEMPLATES.${t.kind} (typed-translation seed)`)
    }
  }

  // Step 2: emit per-instance rows by composing through the templates.
  if (args.spec) {
    for (const c of args.spec.collections) deriveCollection(c, out, prov, compositions)
    deriveChains(args.spec, out, prov, compositions)
  }
  if (args.evidence) deriveWorkflows(args.evidence, args.e2e, out, prov, compositions)

  return { defaults: out, provenance: prov, compositions }
}
