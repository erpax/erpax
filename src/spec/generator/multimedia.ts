/**
 * Multimedia generator — render Playwright video + screenshot evidence
 * into marketing HTML, audit-evidence PDF/A blocks, and per-collection
 * multimedia manifests.
 *
 * Slice CCCCC-cut2 (2026-05-11): consumes the EvidenceCorpus produced
 * by `evidence-collector.ts` and emits, per workflow:
 *
 *   1. HTML snippet — `<video>` hero + per-step screenshot storyboard
 *      + Playwright trace download link. Lives at
 *      `apps/marketing/<workflow>.html` (when CCCCC-cut3 lands the
 *      Lexical-rendered marketing pipeline).
 *
 *   2. JSON manifest — machine-readable index of (workflow → step →
 *      artefact-url) for the admin-UI walkthrough viewer + the
 *      audit-evidence PDF/A composer.
 *
 *   3. PDF/A evidence-block — caption + screenshot URL + Playwright
 *      trace fingerprint for inclusion in the SOX §404 process-
 *      walk-through pack (`pdfa-generator.ts`, future).
 *
 *   4. Markdown snippet — embeds video + screenshots into the per-
 *      collection README rendered by `readme-generator.ts` (future).
 *
 * Pairing strategy: each `EvidenceArtefact.workflow` maps 1:1 to a
 * canonical chain id (e.g. 'order-to-cash' → 'O2C_GOODS' or
 * 'O2C_SERVICES_OVER_TIME'); the `pairToChain()` helper resolves the
 * mapping via the workflow-to-chain table below.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-evidence
 * @standard ISO-19011:2018 §6.4.6 audit-evidence visual-evidence
 * @standard W3C HTML5 video + img + figure
 * @compliance SOX §404 process-walk-through-controls
 * @compliance ISO-27001 A.5.36 conformance-with-policies
 */

import type { EvidenceCorpus, WorkflowEvidence } from './evidence-collector'
import {
  workflowKeys, workflowStepKey, chainKeys, humaniseSlug,
  STUB_PREFIX,
} from './i18n-keys'

/**
 * Translator contract — a function that resolves an i18n key to its
 * value in a given locale. Caller supplies a thin shim around the
 * existing `localeRecord()` / `nestedMessages` pipeline so this module
 * stays free of any Next.js / Payload / fs coupling.
 *
 * Returning `undefined` (or an empty string) means "no translation
 * available"; the generator will fall back to the default-English
 * humanised slug so HTML never renders as `[object Object]` or a raw
 * key.
 */
export type Translator = (key: string, locale: string) => string | undefined

/**
 * A reporter that collects missing-translation events during render.
 * Used in strict mode: tests can assert `report.missing.size === 0`.
 */
export interface StrictTranslationReporter {
  readonly missing: Map<string, Set<string>> // key → locales that lack it
  report(key: string, locale: string): void
}

export function createStrictReporter(): StrictTranslationReporter {
  const missing = new Map<string, Set<string>>()
  return {
    missing,
    report(key, locale) {
      let s = missing.get(key); if (!s) { s = new Set(); missing.set(key, s) }
      s.add(locale)
    },
  }
}

/**
 * Locale-aware caption resolver.
 *
 * Default mode: tries `t(key, locale)` → `t(key, defaultLocale)` →
 * `humaniseSlug(fallbackText)`. Stub values (`[en] …`) count as present.
 *
 * Strict mode (`strict: true`): tries `t(key, locale)` only.
 *   - Stub values (`[en] …`) are TREATED AS MISSING.
 *   - Missing keys reported via `reporter` (when supplied) and the
 *     fallback text is wrapped in `[MISSING:locale]` so the visual
 *     output makes the gap obvious during tests.
 */
function resolveCaption(args: {
  t?: Translator
  key: string
  locale: string
  defaultLocale: string
  fallbackText: string
  strict?: boolean
  reporter?: StrictTranslationReporter
}): string {
  const { t, key, locale, defaultLocale, fallbackText, strict, reporter } = args
  if (t) {
    const v = t(key, locale)
    const isStub = typeof v === 'string' && v.startsWith(STUB_PREFIX)
    if (typeof v === 'string' && v.length > 0 && !(strict && isStub)) return v
    if (strict) {
      reporter?.report(key, locale)
      return `[MISSING:${locale}] ${humaniseSlug(fallbackText)}`
    }
    if (locale !== defaultLocale) {
      const dv = t(key, defaultLocale)
      if (typeof dv === 'string' && dv.length > 0) return dv
    }
  } else if (strict) {
    reporter?.report(key, locale)
    return `[MISSING:${locale}] ${humaniseSlug(fallbackText)}`
  }
  return humaniseSlug(fallbackText)
}

/** workflow-id → canonical chain id. Extend when new e2e workflows land. */
const WORKFLOW_TO_CHAIN: ReadonlyMap<string, string> = new Map([
  ['order-to-cash',          'O2C_GOODS'],
  ['procure-to-pay',         'P2P_THREE_WAY_MATCH'],
  ['record-to-report',       'R2R_PERIOD_CLOSE'],
  ['hire-to-retire',         'H2R_HIRE_TO_RETIRE'],
  ['lead-to-cash',           'CRM_LEAD_TO_CASH'],
  ['consignment',            'CONSIGNMENT_CYCLE'],
  ['booking',                'RESOURCE_BOOKING_CYCLE'],
  ['facility-maintenance',   'FACILITY_MAINTENANCE_CYCLE'],
  ['ifrs-16-leases',         'IFRS16_LEASE_CYCLE'],
  ['kyc-sanctions',          'KYC_SANCTIONS_REVIEW'],
])

export function chainIdForWorkflow(workflow: string): string | undefined {
  return WORKFLOW_TO_CHAIN.get(workflow)
}

/** Options for the multimedia generator. */
export interface GenerateMultimediaOptions {
  /** Active locale for the HTML/Markdown snippet (defaults to defaultLocale). */
  readonly locale?: string
  /**
   * Default locale used as fallback when the active locale lacks the key.
   * Default: 'en'. For test environments, set this to the locale being
   * tested (often 'bg') so any silent EN-fallback shows up as a strict
   * report — see `strict` below.
   */
  readonly defaultLocale?: string
  /** Translator that resolves an i18n key to a localised string. */
  readonly t?: Translator
  /** Locales to embed in the JSON manifest's `captions` map. */
  readonly captionLocales?: ReadonlyArray<string>
  /**
   * Strict mode — disable EN fallback, treat `[en] …` stubs as MISSING,
   * and emit `[MISSING:locale] …` in the rendered output for any
   * unresolved key. Pair with a `reporter` to collect the misses.
   */
  readonly strict?: boolean
  /** Optional collector for missing-translation events (strict mode). */
  readonly reporter?: StrictTranslationReporter
}

/** Output of `generateMultimedia()`. */
export interface GeneratedMultimedia {
  readonly workflow: string
  readonly chainId?: string
  readonly htmlSnippet: string
  readonly markdownSnippet: string
  readonly manifest: MultimediaManifest
  readonly pdfaBlocks: ReadonlyArray<PdfaEvidenceBlock>
  /** Locale this snippet was rendered in. */
  readonly locale: string
}

export interface MultimediaManifest {
  readonly workflow: string
  readonly chainId?: string
  readonly heroVideo?: { url: string; sizeBytes: number; captionKey: string }
  readonly steps: ReadonlyArray<{
    readonly stepId?: string
    readonly label: string
    readonly captionKey?: string
    readonly screenshotUrl?: string
    readonly screenshotPath: string
  }>
  readonly traces: ReadonlyArray<{ url?: string; path: string; sizeBytes: number }>
  /** Per-locale caption map: { [locale]: { title, hero, steps[] } }. */
  readonly captions?: Record<string, {
    readonly title: string
    readonly heroCaption: string
    readonly steps: ReadonlyArray<{ stepId?: string; caption: string }>
  }>
}

export interface PdfaEvidenceBlock {
  readonly caption: string
  /** i18n key the caption was resolved from (carry-forward for PDF/A metadata). */
  readonly captionKey: string
  readonly screenshotPath: string
  readonly screenshotUrl?: string
  readonly stepId?: string
}

/** Pretty bytes. */
function bytes(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' MB'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + ' KB'
  return n + ' B'
}

/** Render the per-workflow HTML hero + storyboard, in `locale`. */
function renderHtml(args: {
  wf: WorkflowEvidence
  chainId: string | undefined
  locale: string
  defaultLocale: string
  t?: Translator
  strict?: boolean
  reporter?: StrictTranslationReporter
}): string {
  const { wf, chainId, locale, defaultLocale, t, strict, reporter } = args
  const wKeys = workflowKeys(wf.workflow)
  const cKeys = chainId ? chainKeys(chainId) : undefined
  const title = resolveCaption({ t, key: wKeys.title, locale, defaultLocale, fallbackText: wf.workflow, strict, reporter })
  const heroCaption = resolveCaption({ t, key: wKeys.videoCaption, locale, defaultLocale, fallbackText: 'walk-through video', strict, reporter })
  const chainTitle = cKeys
    ? resolveCaption({ t, key: cKeys.title, locale, defaultLocale, fallbackText: chainId!, strict, reporter })
    : undefined

  const hero = wf.videos[0]
  const heroBlock = hero?.publicUrl
    ? `  <figure class="walkthrough-hero">
    <video controls preload="metadata" poster="${wf.screenshots[0]?.publicUrl ?? ''}">
      <source src="${hero.publicUrl}" type="video/webm" />
      Your browser doesn't support embedded video.
    </video>
    <figcaption data-i18n-key="${wKeys.videoCaption}">${heroCaption} — ${title} (${bytes(hero.size)})</figcaption>
  </figure>`
    : `  <figure class="walkthrough-hero walkthrough-hero--no-video">
    <p data-i18n-key="${wKeys.videoCaption}">${heroCaption} — ${title}</p>
  </figure>`

  const storyboardItems = wf.screenshots.map((s) => {
    const stepKey = s.stepId ? workflowStepKey(wf.workflow, s.stepId) : undefined
    const fallback = s.label ?? s.stepId ?? 'screenshot'
    const caption = stepKey
      ? resolveCaption({ t, key: stepKey, locale, defaultLocale, fallbackText: fallback, strict, reporter })
      : humaniseSlug(fallback)
    const captionAttr = stepKey ? ` data-i18n-key="${stepKey}"` : ''
    return `    <li class="walkthrough-step">
      <figure>
        <img src="${s.publicUrl ?? '/' + s.path}" alt="${caption}" loading="lazy" />
        <figcaption${captionAttr}>${s.stepId ? `<strong>${s.stepId}</strong> — ` : ''}${caption}</figcaption>
      </figure>
    </li>`
  }).join('\n')

  const traceLinks = wf.traces.map((t2) => `  <li><a href="${t2.publicUrl ?? '/' + t2.path}" download>${humaniseSlug('trace-zip')} — ${bytes(t2.size)}</a></li>`).join('\n')

  const heading = chainTitle ? `${title} — ${chainTitle}` : title

  return `<section class="erp-walkthrough" data-workflow="${wf.workflow}"${chainId ? ` data-chain="${chainId}"` : ''} lang="${locale}">
  <header><h2 data-i18n-key="${wKeys.title}">${heading}</h2></header>
${heroBlock}

  <ol class="walkthrough-storyboard">
${storyboardItems}
  </ol>

${wf.traces.length > 0 ? `  <details class="walkthrough-traces">
    <summary>Playwright traces (${wf.traces.length})</summary>
    <ul>
${traceLinks}
    </ul>
  </details>` : ''}
</section>`
}

/** Render the per-workflow Markdown snippet (CommonMark + GFM). */
function renderMarkdown(args: {
  wf: WorkflowEvidence
  chainId: string | undefined
  locale: string
  defaultLocale: string
  t?: Translator
  strict?: boolean
  reporter?: StrictTranslationReporter
}): string {
  const { wf, chainId, locale, defaultLocale, t, strict, reporter } = args
  const wKeys = workflowKeys(wf.workflow)
  const title = resolveCaption({ t, key: wKeys.title, locale, defaultLocale, fallbackText: wf.workflow, strict, reporter })
  const heroCaption = resolveCaption({ t, key: wKeys.videoCaption, locale, defaultLocale, fallbackText: 'walk-through video', strict, reporter })
  const hero = wf.videos[0]
  const lines: string[] = []
  lines.push(`## ${title}`)
  lines.push('')
  if (chainId) lines.push(`> Chain: \`BUSINESS_CHAINS.${chainId}\``)
  lines.push('')
  if (hero?.publicUrl) {
    lines.push(`<video controls preload="metadata" src="${hero.publicUrl}"></video>`)
    lines.push('')
    lines.push(`*${heroCaption} — ${bytes(hero.size)}.*`)
    lines.push('')
  }
  if (wf.screenshots.length > 0) {
    lines.push(`### Storyboard`)
    lines.push('')
    for (const s of wf.screenshots) {
      const url = s.publicUrl ?? '/' + s.path
      const stepKey = s.stepId ? workflowStepKey(wf.workflow, s.stepId) : undefined
      const fallback = s.label ?? s.stepId ?? ''
      const caption = stepKey
        ? resolveCaption({ t, key: stepKey, locale, defaultLocale, fallbackText: fallback })
        : humaniseSlug(fallback)
      const prefix = s.stepId ? '`' + s.stepId + '` — ' : ''
      lines.push(`![${prefix}${caption}](${url})`)
      lines.push(`*${prefix}${caption}*`)
      lines.push('')
    }
  }
  if (wf.traces.length > 0) {
    lines.push(`### Playwright traces`)
    lines.push('')
    for (const t2 of wf.traces) {
      lines.push(`- [Trace zip — ${bytes(t2.size)}](${t2.publicUrl ?? '/' + t2.path})`)
    }
    lines.push('')
  }
  return lines.join('\n')
}

/** Build the JSON manifest, optionally with per-locale captions. */
function buildManifest(args: {
  wf: WorkflowEvidence
  chainId: string | undefined
  defaultLocale: string
  t?: Translator
  captionLocales?: ReadonlyArray<string>
}): MultimediaManifest {
  const { wf, chainId, defaultLocale, t, captionLocales } = args
  const wKeys = workflowKeys(wf.workflow)
  const hero = wf.videos[0]

  const captions = captionLocales && captionLocales.length > 0
    ? Object.fromEntries(captionLocales.map((loc) => [loc, {
        title:        resolveCaption({ t, key: wKeys.title,        locale: loc, defaultLocale, fallbackText: wf.workflow }),
        heroCaption:  resolveCaption({ t, key: wKeys.videoCaption, locale: loc, defaultLocale, fallbackText: 'walk-through video' }),
        steps: wf.screenshots.map((s) => ({
          stepId: s.stepId,
          caption: s.stepId
            ? resolveCaption({ t, key: workflowStepKey(wf.workflow, s.stepId), locale: loc, defaultLocale, fallbackText: s.label ?? s.stepId })
            : humaniseSlug(s.label ?? 'screenshot'),
        })),
      }]))
    : undefined

  return {
    workflow: wf.workflow,
    chainId,
    heroVideo: hero
      ? { url: hero.publicUrl ?? '/' + hero.path, sizeBytes: hero.size, captionKey: wKeys.videoCaption }
      : undefined,
    steps: wf.screenshots.map((s) => ({
      stepId: s.stepId,
      label: s.label ?? '(unlabelled)',
      captionKey: s.stepId ? workflowStepKey(wf.workflow, s.stepId) : undefined,
      screenshotUrl: s.publicUrl,
      screenshotPath: s.path,
    })),
    traces: wf.traces.map((t2) => ({ url: t2.publicUrl, path: t2.path, sizeBytes: t2.size })),
    captions,
  }
}

/** Build PDF/A evidence blocks (caption + i18n key carry-forward). */
function buildPdfaBlocks(args: {
  wf: WorkflowEvidence
  locale: string
  defaultLocale: string
  t?: Translator
}): ReadonlyArray<PdfaEvidenceBlock> {
  const { wf, locale, defaultLocale, t } = args
  const wTitle = resolveCaption({ t, key: workflowKeys(wf.workflow).title, locale, defaultLocale, fallbackText: wf.workflow })
  return wf.screenshots.map((s) => {
    const captionKey = s.stepId ? workflowStepKey(wf.workflow, s.stepId) : workflowKeys(wf.workflow).videoCaption
    const stepCaption = s.stepId
      ? resolveCaption({ t, key: captionKey, locale, defaultLocale, fallbackText: s.label ?? s.stepId })
      : humaniseSlug(s.label ?? 'screenshot')
    return {
      caption: `${wTitle} — ${s.stepId ? s.stepId + ' — ' : ''}${stepCaption}`,
      captionKey,
      screenshotPath: s.path,
      screenshotUrl: s.publicUrl,
      stepId: s.stepId,
    }
  })
}

/** Generate every artefact (HTML / Markdown / manifest / PDF/A) for one workflow. */
export function generateMultimediaForWorkflow(
  wf: WorkflowEvidence,
  options: GenerateMultimediaOptions = {},
): GeneratedMultimedia {
  const defaultLocale = options.defaultLocale ?? 'en'
  const locale = options.locale ?? defaultLocale
  const { t, captionLocales, strict, reporter } = options
  const chainId = chainIdForWorkflow(wf.workflow)
  return {
    workflow: wf.workflow,
    chainId,
    locale,
    htmlSnippet:     renderHtml({ wf, chainId, locale, defaultLocale, t, strict, reporter }),
    markdownSnippet: renderMarkdown({ wf, chainId, locale, defaultLocale, t }),
    manifest:        buildManifest({ wf, chainId, defaultLocale, t, captionLocales }),
    pdfaBlocks:      buildPdfaBlocks({ wf, locale, defaultLocale, t }),
  }
}

/** Generate for every workflow in the corpus, in the requested locale. */
export function generateAllMultimedia(
  corpus: EvidenceCorpus,
  options: GenerateMultimediaOptions = {},
): ReadonlyArray<GeneratedMultimedia> {
  return [...corpus.byWorkflow.values()].map((wf) => generateMultimediaForWorkflow(wf, options))
}
