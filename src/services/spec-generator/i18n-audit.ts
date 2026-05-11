/**
 * i18n coverage audit — given a SpecCorpus + EvidenceCorpus + the
 * actual messages/*.json bundles, report every translation key the
 * spec promises but the bundles don't carry, broken down per locale.
 *
 * Slice CCCCC-cut2-i18n (2026-05-11): the multilingual surface fell
 * out of sync after Slices LLLL-CCCCC introduced 200+ collections + 22
 * chain registries + 10 e2e workflows without backfilling labels. This
 * audit makes the gap measurable so a single batch can close it.
 *
 * @standard ISO 19011:2018 §6.4 audit-evidence
 * @standard ISO/IEC 25023:2016 §8 quality-measurement-functionality-completeness
 * @standard BCP-47 language-tag
 * @rfc 8259 json
 */

import type { SpecCorpus } from './types'
import type { EvidenceCorpus } from './evidence-collector'
import {
  collectionKeys, chainKeys, chainStepKey,
  workflowKeys, workflowStepKey, defaultEnglishFor,
  STUB_PREFIX,
} from './i18n-keys'

/** A single missing-key row. */
export interface MissingKey {
  readonly key: string
  readonly source: 'collection' | 'chain' | 'chain-step' | 'workflow' | 'workflow-step' | 'workflow-video'
  readonly originSlug: string
  readonly defaultEnglish: string
  readonly missingFromLocales: ReadonlyArray<string>
}

/** Audit summary (counts + the per-key rows). */
export interface I18nAuditReport {
  readonly totalKeysExpected: number
  readonly totalKeysPresent: number
  readonly totalKeysMissing: number
  readonly coveragePercent: number
  readonly perLocale: ReadonlyMap<string, { expected: number; present: number; missing: number }>
  readonly missing: ReadonlyArray<MissingKey>
}

/** Bundle shape: a flat key→value map per locale. */
export type Bundles = Record<string, Record<string, string>>

/** Minimal evidence shape this module needs (subset of EvidenceCorpus). */
type WorkflowsLike = ReadonlyMap<string, { workflow: string; screenshots: ReadonlyArray<{ stepId?: string; label?: string }> }>

/**
 * Enumerate every i18n key the corpus promises.
 *
 * Inputs:
 *   - spec      : optional SpecCorpus (collections + chains)
 *   - evidence  : optional EvidenceCorpus (workflow walkthroughs)
 *   - chainIds  : optional explicit list of chain ids (when chains are
 *                 not yet in the SpecCorpus extractor pass)
 */
export function expectedKeys(args: {
  spec?: SpecCorpus
  evidence?: EvidenceCorpus | { byWorkflow: WorkflowsLike }
  chainIds?: ReadonlyArray<string>
}): ReadonlyArray<{ key: string; source: MissingKey['source']; originSlug: string }> {
  const out: { key: string; source: MissingKey['source']; originSlug: string }[] = []

  // Collections
  if (args.spec) {
    for (const c of args.spec.collections) {
      if (!c.slug) continue
      const k = collectionKeys(c.slug)
      out.push({ key: k.singular,    source: 'collection', originSlug: c.slug })
      out.push({ key: k.plural,      source: 'collection', originSlug: c.slug })
      out.push({ key: k.description, source: 'collection', originSlug: c.slug })
    }
  }

  // Chains: prefer extracted SpecChainStep, else explicit chainIds
  const chainIds = new Set<string>(args.chainIds ?? [])
  const stepsByChain = new Map<string, Set<string>>()
  if (args.spec) {
    for (const c of args.spec.collections) {
      for (const step of c.chainSteps ?? []) {
        chainIds.add(step.chainId)
        let s = stepsByChain.get(step.chainId)
        if (!s) { s = new Set(); stepsByChain.set(step.chainId, s) }
        s.add(step.stepId)
      }
    }
  }
  for (const id of chainIds) {
    const k = chainKeys(id)
    out.push({ key: k.title,       source: 'chain', originSlug: id })
    out.push({ key: k.description, source: 'chain', originSlug: id })
    for (const stepId of stepsByChain.get(id) ?? new Set()) {
      out.push({ key: chainStepKey(id, stepId), source: 'chain-step', originSlug: `${id}/${stepId}` })
    }
  }

  // Workflows (e2e walkthroughs)
  if (args.evidence) {
    for (const wf of args.evidence.byWorkflow.values()) {
      const k = workflowKeys(wf.workflow)
      out.push({ key: k.title,        source: 'workflow',       originSlug: wf.workflow })
      out.push({ key: k.description,  source: 'workflow',       originSlug: wf.workflow })
      out.push({ key: k.videoCaption, source: 'workflow-video', originSlug: wf.workflow })
      for (const s of wf.screenshots) {
        if (!s.stepId) continue
        out.push({
          key: workflowStepKey(wf.workflow, s.stepId),
          source: 'workflow-step',
          originSlug: `${wf.workflow}/${s.stepId}`,
        })
      }
    }
  }

  // De-dupe (a chain referenced from multiple collections shouldn't double up).
  const seen = new Set<string>()
  return out.filter((row) => {
    if (seen.has(row.key)) return false
    seen.add(row.key)
    return true
  })
}

/** Run the audit against the bundles + supported locales. */
export function auditI18n(args: {
  spec?: SpecCorpus
  evidence?: EvidenceCorpus | { byWorkflow: WorkflowsLike }
  chainIds?: ReadonlyArray<string>
  bundles: Bundles
  locales: ReadonlyArray<string>
  /**
   * Strict mode — when true, a stub value (`[en] …`) counts as MISSING.
   * Used by tests running in non-EN default locales to surface
   * untranslated content as hard failures instead of silent fallbacks.
   */
  strict?: boolean
}): I18nAuditReport {
  const { bundles, locales, strict } = args
  const expected = expectedKeys(args)
  const totalKeysExpected = expected.length * locales.length

  const perLocale = new Map<string, { expected: number; present: number; missing: number }>()
  for (const loc of locales) perLocale.set(loc, { expected: expected.length, present: 0, missing: 0 })

  const missing: MissingKey[] = []
  for (const row of expected) {
    const missingLocales: string[] = []
    for (const loc of locales) {
      const v = bundles[loc]?.[row.key]
      const counter = perLocale.get(loc)!
      const isPresent = typeof v === 'string' && v.length > 0 && !(strict && v.startsWith(STUB_PREFIX))
      if (isPresent) counter.present += 1
      else { counter.missing += 1; missingLocales.push(loc) }
    }
    if (missingLocales.length > 0) {
      missing.push({
        key: row.key,
        source: row.source,
        originSlug: row.originSlug,
        defaultEnglish: defaultEnglishFor(row.key),
        missingFromLocales: missingLocales,
      })
    }
  }

  const totalKeysPresent = totalKeysExpected - missing.reduce((sum, m) => sum + m.missingFromLocales.length, 0)
  const totalKeysMissing = totalKeysExpected - totalKeysPresent
  const coveragePercent = totalKeysExpected === 0 ? 100 : (totalKeysPresent / totalKeysExpected) * 100

  return { totalKeysExpected, totalKeysPresent, totalKeysMissing, coveragePercent, perLocale, missing }
}
