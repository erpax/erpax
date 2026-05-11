/**
 * Marketing-page generator — package the JSDoc-as-spec corpus +
 * Playwright multimedia evidence + e2e walkthrough captions + chain
 * registry + standards/feature/role tags into a single self-contained
 * marketing page per workflow per locale.
 *
 * Slice CCCCC-cut2-marketing (2026-05-11). User insight chain:
 *
 *   1. "i do not see the generated multimedia from e2e tests"
 *      → multimedia-generator emits HTML hero + storyboard.
 *   2. "captions should come from translations (multilingual)"
 *      → multimedia-generator now consumes a Translator.
 *   3. "translations need same autogenerating logic as tests"
 *      → translation-generator derives every key from the spec.
 *   4. "if every type has translation, types may be used to generate
 *      meaningful logical captions" → spec-templates.ts collapses the
 *      translator surface to ~14 type templates × 30 locales.
 *   5. "the multimedia should show what is happening and there is no
 *      better place from the codebase" → e2e-spec-extractor harvests
 *      `captureWorkflowStep(... 'description')` from the test files.
 *   6. "all this packed as a marketing tool to sell ERPax" → THIS file.
 *
 * The output is a 100% spec-derived marketing page — nothing is
 * hand-authored, every claim ties back to either a JSDoc tag, a
 * standards citation, a chain step, an e2e spec call, or a Playwright
 * artefact. That's the sales pitch: "every screen you see in the
 * walkthrough was captured by a real test against a running ERPax
 * Worker, in your language, with the audit-trail evidence behind it."
 *
 * Output sections (per workflow + locale):
 *
 *   <section data-block="hero">       title + chain badge + 1-line value prop
 *   <section data-block="video">      hero <video> + caption + business-chains link
 *   <section data-block="storyboard"> per-step screenshots with e2e-sourced captions
 *   <section data-block="standards">  badges from SpecStandard tags (IFRS / SOX / ISO …)
 *   <section data-block="features">   feature gates + tier badges
 *   <section data-block="evidence">   Playwright trace download + audit-trail callout
 *   <section data-block="cta">        "Try this workflow" + locale switcher
 *
 * @standard W3C HTML5 §4 sectioning
 * @standard WCAG 2.2 §1.4.3 contrast-aa  (color tokens reserved CSS vars)
 * @standard WAI-ARIA 1.2 landmark-roles
 * @standard ISO/IEC-29119:2022 software-testing test-evidence (citations preserved)
 * @compliance SOX §404 process-walk-through-controls
 * @audit ISO-19011:2018 §6.4.6 audit-evidence visual-evidence
 */

import type { SpecCorpus, CollectionSpec, SpecStandard } from './types'
import type { EvidenceCorpus, WorkflowEvidence } from './evidence-collector'
import type { E2eSpecCorpus, E2eWorkflowSpec, UxGap } from './e2e-spec-extractor'
import type { Translator } from './multimedia-generator'
import { chainIdForWorkflow } from './multimedia-generator'
import { workflowKeys, chainKeys, humaniseSlug } from './i18n-keys'

export interface MarketingPageOptions {
  readonly locale: string
  readonly defaultLocale?: string
  readonly t?: Translator
  /** Available locales for the language switcher. */
  readonly availableLocales?: ReadonlyArray<string>
  /** Tier the user is on (controls "available on" badge styling). */
  readonly viewerTier?: 'free' | 'solo' | 'team' | 'business' | 'enterprise'
  /** Public base URL for "Try this workflow" CTA. */
  readonly demoBaseUrl?: string
}

export interface GeneratedMarketingPage {
  readonly workflow: string
  readonly chainId?: string
  readonly locale: string
  /** Self-contained HTML page (head + body + inline CSS + ARIA landmarks). */
  readonly html: string
  /** SEO metadata block (lang, title, description, og:*). */
  readonly seo: { lang: string; title: string; description: string; ogImage?: string }
  /** Standards citations referenced on this page (for trust badges). */
  readonly standards: ReadonlyArray<SpecStandard>
  /** Stats for analytics: screenshots, traces, chain steps, standards count. */
  readonly stats: {
    screenshots: number
    traces: number
    chainSteps: number
    standardsCited: number
    uxGaps: number
  }
}

function tt(t: Translator | undefined, key: string, locale: string, defaultLocale: string, fallback: string): string {
  if (t) {
    const v = t(key, locale)
    if (typeof v === 'string' && v.length > 0) return v
    if (locale !== defaultLocale) {
      const dv = t(key, defaultLocale)
      if (typeof dv === 'string' && dv.length > 0) return dv
    }
  }
  return fallback
}

function bytes(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' MB'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + ' KB'
  return n + ' B'
}

function uniqueStandards(specs: ReadonlyArray<CollectionSpec>): SpecStandard[] {
  const seen = new Set<string>()
  const out: SpecStandard[] = []
  for (const s of specs) for (const std of s.standards ?? []) {
    const k = `${std.body}/${std.id}`
    if (!seen.has(k)) { seen.add(k); out.push(std) }
  }
  return out
}

function severityRank(s: UxGap['severity']): number {
  return { critical: 5, blocker: 4, major: 3, minor: 2, info: 1 }[s] ?? 0
}

/**
 * Render a per-workflow marketing page. The result is a complete HTML5
 * document — drop into a `.html` file or stream from a Worker route.
 */
export function generateMarketingPage(args: {
  workflow: string
  evidence: EvidenceCorpus
  spec?: SpecCorpus
  e2e?: E2eSpecCorpus
  options: MarketingPageOptions
}): GeneratedMarketingPage {
  const { workflow, evidence, spec, e2e, options } = args
  const defaultLocale = options.defaultLocale ?? 'en'
  const { locale, t } = options
  const wf: WorkflowEvidence | undefined = evidence.byWorkflow.get(workflow)
  const e2eSpec: E2eWorkflowSpec | undefined = e2e?.byWorkflow.get(workflow)
  const chainId = chainIdForWorkflow(workflow)
  const wKeys = workflowKeys(workflow)
  const cKeys = chainId ? chainKeys(chainId) : undefined

  // Resolve top-level captions through translator + templates.
  const title = tt(t, wKeys.title, locale, defaultLocale, humaniseSlug(workflow))
  const description = tt(t, wKeys.description, locale, defaultLocale, `${title} — process walk-through`)
  const heroCaption = tt(t, wKeys.videoCaption, locale, defaultLocale, 'Process walk-through')
  const chainTitle = cKeys ? tt(t, cKeys.title, locale, defaultLocale, humaniseSlug(chainId!)) : undefined

  // Filter the standards corpus down to specs that actually reference this
  // workflow's chain (else every standard from every collection floods the
  // page). Best-effort: include any spec whose chainSteps reference our
  // chainId, plus the e2e spec itself.
  const relatedSpecs: CollectionSpec[] = (spec?.collections ?? []).filter((c) =>
    chainId && c.chainSteps?.some((s) => s.chainId === chainId)
  )
  const standards = uniqueStandards(relatedSpecs)

  // Feature badges from related specs.
  const features = relatedSpecs.flatMap((s) => s.features).filter((f, i, arr) => arr.findIndex((x) => x.id === f.id) === i)

  // UX gaps (transparent quality reporting — sells trust).
  const gaps = (e2eSpec?.gaps ?? []).slice().sort((a, b) => severityRank(b.severity) - severityRank(a.severity))

  const stats = {
    screenshots: wf?.screenshots.length ?? 0,
    traces: wf?.traces.length ?? 0,
    chainSteps: chainId ? relatedSpecs.flatMap((s) => s.chainSteps ?? []).filter((s) => s.chainId === chainId).length : 0,
    standardsCited: standards.length,
    uxGaps: gaps.length,
  }

  // ── Sections ──────────────────────────────────────────────────────────
  const heroSection = `<section data-block="hero" aria-labelledby="hero-title">
  <h1 id="hero-title" data-i18n-key="${wKeys.title}">${title}</h1>
  <p class="lede" data-i18n-key="${wKeys.description}">${description}</p>
  ${chainTitle ? `<p class="chain-badge"><span class="badge">${chainTitle}</span> <code>BUSINESS_CHAINS.${chainId}</code></p>` : ''}
</section>`

  const heroVideo = wf?.videos[0]
  const videoSection = heroVideo?.publicUrl
    ? `<section data-block="video" aria-labelledby="video-h">
  <h2 id="video-h" class="visually-hidden">${heroCaption}</h2>
  <figure>
    <video controls preload="metadata"${wf!.screenshots[0]?.publicUrl ? ` poster="${wf!.screenshots[0].publicUrl}"` : ''}>
      <source src="${heroVideo.publicUrl}" type="video/webm" />
      Your browser doesn't support embedded video.
    </video>
    <figcaption data-i18n-key="${wKeys.videoCaption}">${heroCaption} — ${title} (${bytes(heroVideo.size)}; recorded by Playwright)</figcaption>
  </figure>
</section>`
    : `<section data-block="video" aria-labelledby="video-h" class="placeholder">
  <h2 id="video-h">${heroCaption}</h2>
  <p>Run <code>pnpm playwright test tests/e2e/erp-workflows/${workflow}.e2e.spec.ts</code> to capture the walkthrough.</p>
</section>`

  // Storyboard — one figure per screenshot, with the e2e-sourced caption.
  const stepsHtml = (wf?.screenshots ?? []).map((s) => {
    const stepKey = s.stepId ? `workflow.${workflow}.steps.${s.stepId}` : undefined
    const fallback = s.label ?? s.stepId ?? 'screenshot'
    const caption = stepKey ? tt(t, stepKey, locale, defaultLocale, humaniseSlug(fallback)) : humaniseSlug(fallback)
    const e2eStep = e2eSpec?.steps.find((x) => x.stepId === s.stepId)
    const sourceLink = e2eStep ? `<a class="src" href="#" title="${e2eStep.sourceLocation}">test source</a>` : ''
    return `    <li class="storyboard-step">
      <figure>
        <img src="${s.publicUrl ?? '/' + s.path}" alt="${caption}" loading="lazy" />
        <figcaption${stepKey ? ` data-i18n-key="${stepKey}"` : ''}>${s.stepId ? `<strong>${s.stepId}</strong> — ` : ''}${caption} ${sourceLink}</figcaption>
      </figure>
    </li>`
  }).join('\n')
  const storyboardSection = `<section data-block="storyboard" aria-labelledby="storyboard-h">
  <h2 id="storyboard-h">Storyboard</h2>
  <ol class="storyboard">
${stepsHtml || '    <li class="empty">No screenshots captured yet.</li>'}
  </ol>
</section>`

  const standardsSection = standards.length > 0
    ? `<section data-block="standards" aria-labelledby="std-h">
  <h2 id="std-h">Standards proven by this workflow</h2>
  <ul class="standards-grid">
${standards.map((s) => `    <li class="standard-badge"><strong>${s.body}</strong> <span>${s.id}</span>${s.description ? `<small>${s.description}</small>` : ''}</li>`).join('\n')}
  </ul>
</section>`
    : ''

  const featuresSection = features.length > 0
    ? `<section data-block="features" aria-labelledby="feat-h">
  <h2 id="feat-h">Available features</h2>
  <ul class="features-list">
${features.map((f) => `    <li><span class="feature-id">${f.label ?? humaniseSlug(f.id)}</span>${f.tier ? ` <span class="tier tier-${f.tier}">${f.tier}</span>` : ''}</li>`).join('\n')}
  </ul>
</section>`
    : ''

  const evidenceSection = wf && (wf.traces.length > 0 || wf.videos.length > 0)
    ? `<section data-block="evidence" aria-labelledby="ev-h">
  <h2 id="ev-h">Audit-trail evidence</h2>
  <p>Every screen above was captured by a real Playwright test against a running ERPax Worker. Download the raw evidence:</p>
  <ul class="evidence-list">
${wf.traces.map((tr) => `    <li><a href="${tr.publicUrl ?? '/' + tr.path}" download>Playwright trace — ${bytes(tr.size)}</a></li>`).join('\n')}
${wf.videos.map((v) => `    <li><a href="${v.publicUrl ?? '/' + v.path}" download>Walk-through recording — ${bytes(v.size)}</a></li>`).join('\n')}
  </ul>
  <p class="compliance">Evidence pack conforms to <strong>ISO 19011:2018 §6.4.6</strong> + <strong>SOX §404</strong> process-walk-through controls.</p>
</section>`
    : ''

  const gapsSection = gaps.length > 0
    ? `<section data-block="gaps" aria-labelledby="gaps-h">
  <h2 id="gaps-h">Continuously surfaced quality findings</h2>
  <p>ERPax e2e tests record UX gaps as part of the walkthrough — visible to you, not hidden:</p>
  <ul class="gaps-list">
${gaps.map((g) => `    <li class="gap gap-${g.severity}"><span class="severity">${g.severity}</span> <strong>${g.stepId}</strong> — ${g.description}</li>`).join('\n')}
  </ul>
</section>`
    : ''

  const localeSwitcher = options.availableLocales && options.availableLocales.length > 1
    ? `<nav class="locale-switcher" aria-label="Language">
  <ul>
${options.availableLocales.map((loc) => `    <li><a href="?locale=${loc}"${loc === locale ? ' aria-current="true"' : ''}>${loc}</a></li>`).join('\n')}
  </ul>
</nav>`
    : ''

  const ctaSection = `<section data-block="cta" aria-labelledby="cta-h">
  <h2 id="cta-h">Try this workflow live</h2>
  <p>${stats.chainSteps > 0 ? `${stats.chainSteps} chain steps, ` : ''}${stats.screenshots} screenshots, ${stats.standardsCited} standards proven, ${stats.traces} downloadable Playwright traces.</p>
  <p><a class="cta-primary" href="${options.demoBaseUrl ?? '/admin'}/workflow/${workflow}">Open ${title} in ERPax</a></p>
</section>`

  // ── Compose page ──────────────────────────────────────────────────────
  const html = `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <title>${title} · ERPax</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title} · ERPax" />
  <meta property="og:description" content="${description}" />
  ${heroVideo?.publicUrl ? `<meta property="og:video" content="${heroVideo.publicUrl}" />` : ''}
  ${wf?.screenshots[0]?.publicUrl ? `<meta property="og:image" content="${wf.screenshots[0].publicUrl}" />` : ''}
  <style>
    :root {
      --c-bg: #0b0d10; --c-fg: #f5f7fa; --c-muted: #8a92a3; --c-accent: #5dd5fa;
      --c-good: #7fe19c; --c-warn: #ffcb6b; --c-bad: #ff8a80;
      --r-md: 12px; --pad: 24px;
    }
    body { background: var(--c-bg); color: var(--c-fg); font: 16px/1.5 ui-sans-serif, system-ui, sans-serif; margin: 0; }
    main { max-width: 960px; margin: 0 auto; padding: var(--pad); }
    section { margin: 48px 0; }
    h1 { font-size: 2.4rem; margin: 0 0 8px; }
    h2 { font-size: 1.4rem; margin: 0 0 16px; }
    .lede { color: var(--c-muted); font-size: 1.15rem; }
    .badge { background: rgba(93,213,250,.12); color: var(--c-accent); padding: 4px 10px; border-radius: 999px; font-size: .85rem; }
    code { background: rgba(255,255,255,.06); padding: 2px 6px; border-radius: 4px; }
    figure { margin: 0; }
    video, img { max-width: 100%; border-radius: var(--r-md); display: block; }
    figcaption { color: var(--c-muted); font-size: .92rem; margin-top: 8px; }
    .storyboard { list-style: decimal inside; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .standards-grid, .features-list, .evidence-list, .gaps-list { list-style: none; padding: 0; display: grid; gap: 12px; }
    .standards-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .standard-badge { background: rgba(255,255,255,.04); padding: 12px; border-radius: var(--r-md); }
    .standard-badge small { display: block; color: var(--c-muted); margin-top: 4px; }
    .tier { padding: 2px 8px; border-radius: 999px; font-size: .8rem; background: rgba(127,225,156,.15); color: var(--c-good); }
    .gap { padding: 10px; border-radius: var(--r-md); background: rgba(255,255,255,.04); }
    .gap-blocker, .gap-critical { border-left: 3px solid var(--c-bad); }
    .gap-major { border-left: 3px solid var(--c-warn); }
    .gap-minor, .gap-info { border-left: 3px solid var(--c-muted); }
    .severity { text-transform: uppercase; font-size: .75rem; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,.08); margin-right: 8px; }
    .cta-primary { display: inline-block; padding: 12px 24px; background: var(--c-accent); color: #0b0d10; text-decoration: none; border-radius: var(--r-md); font-weight: 600; }
    .locale-switcher ul { list-style: none; padding: 0; margin: 0; display: flex; gap: 8px; }
    .locale-switcher a { color: var(--c-muted); text-decoration: none; padding: 4px 8px; border-radius: 4px; }
    .locale-switcher a[aria-current] { background: rgba(93,213,250,.12); color: var(--c-accent); }
    .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    .compliance { color: var(--c-muted); font-size: .9rem; }
    .src { color: var(--c-accent); font-size: .8rem; }
    [dir="rtl"] body { direction: rtl; }
  </style>
</head>
<body${locale === 'ar' ? ' dir="rtl"' : ''}>
  <main>
    ${localeSwitcher}
    ${heroSection}
    ${videoSection}
    ${storyboardSection}
    ${standardsSection}
    ${featuresSection}
    ${gapsSection}
    ${evidenceSection}
    ${ctaSection}
  </main>
</body>
</html>`

  return {
    workflow,
    chainId,
    locale,
    html,
    seo: {
      lang: locale,
      title: `${title} · ERPax`,
      description,
      ogImage: wf?.screenshots[0]?.publicUrl,
    },
    standards,
    stats,
  }
}

/** Generate one marketing page per workflow per requested locale. */
export function generateAllMarketingPages(args: {
  evidence: EvidenceCorpus
  spec?: SpecCorpus
  e2e?: E2eSpecCorpus
  locales: ReadonlyArray<string>
  defaultLocale?: string
  t?: Translator
  demoBaseUrl?: string
}): ReadonlyArray<GeneratedMarketingPage> {
  const { evidence, spec, e2e, locales, defaultLocale, t, demoBaseUrl } = args
  const out: GeneratedMarketingPage[] = []
  // Union workflow ids: evidence + e2e (so missing-multimedia workflows still get a page).
  const ids = new Set<string>()
  for (const id of evidence.byWorkflow.keys()) ids.add(id)
  if (e2e) for (const id of e2e.byWorkflow.keys()) ids.add(id)
  for (const workflow of ids) {
    for (const locale of locales) {
      out.push(generateMarketingPage({
        workflow, evidence, spec, e2e,
        options: { locale, defaultLocale, t, availableLocales: locales, demoBaseUrl },
      }))
    }
  }
  return out
}
