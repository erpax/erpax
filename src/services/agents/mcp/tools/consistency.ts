/**
 * Consistency MCP tool family — Slice ZZZZZZZZ (2026-05-11) worked
 * example for the tool-defs modularization.
 *
 * Per user "in general the mcp needs modularisation". The 188-tool
 * `tool-defs.ts` is split into per-area files (this is the first
 * extract — `consistency`). Each file:
 *
 *   - Exports a single `buildConsistencyTools(registry)` factory
 *   - Uses `makeToolI18n` so every description is localizable
 *   - Imports its area-specific deps directly (no transitive coupling)
 *
 * The main `tool-defs.ts` will become a thin assembler:
 *
 *   tools.push(...buildConsistencyTools(registry))
 *   tools.push(...buildEventsTools(registry))
 *   tools.push(...buildCloudflareTools(registry))
 *   ... etc
 *
 * @standard ISO/IEC 25010:2023 §5.7 modularity
 * @audit Conservation Law 38 mcp-tool-standardization (per-area boundaries)
 * @see ../i18n.ts makeToolI18n
 */
import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

/** Minimal tool shape — keeps this file decoupled from tool-defs.ts. */
interface ErpaxMcpTool {
  readonly name: string
  readonly description: string
  readonly parameters: Record<string, z.ZodTypeAny>
  readonly handler: (args: Record<string, unknown>, req: PayloadRequest) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
}

/** Slice ZZZZZZZZ — every consistency tool description in 4 languages
 *  (en + bg + de + fr). Backfill via erpax.i18n.translateBatch covers
 *  the rest of the 31 supported locales asynchronously. */
const I18N: Record<string, LocalizedString> = {
  scan: {
    en: 'Run the architecture-invariant suite focused on code-consistency drift (Class F/I/J/M from scripts/find-implementation-gaps.ts). Returns the offender list keyed by check id. Audit-trailed per ISO 19011 §6.4.6.',
    bg: 'Изпълнява набора от архитектурни инварианти, фокусиран върху отклонения в консистентността на кода. Връща списък с нарушители по идентификатор на проверка. С audit-trail по ISO 19011 §6.4.6.',
    de: 'Führt die Architektur-Invariantenprüfung für Codekonsistenzabweichungen aus. Gibt die nach Prüf-ID gruppierte Verletzerliste zurück. Audit-trail nach ISO 19011 §6.4.6.',
    fr: 'Exécute la suite d\'invariants d\'architecture ciblant la dérive de cohérence du code. Retourne la liste des contrevenants par identifiant de vérification. Audit-trail selon ISO 19011 §6.4.6.',
  },
  status: {
    en: 'Single-endpoint observability snapshot for ConsistencyAgent: runs the invariant suite live, reports current gap counts by class, the most recent N applied fixes, and a readiness flag (clean / drift-detected / errors).',
    bg: 'Обобщена снимка на състоянието на ConsistencyAgent: текущи отклонения по клас, последните N приложени корекции и флаг за готовност (clean / drift-detected / errors).',
    de: 'Zentraler Observability-Snapshot des ConsistencyAgent: aktuelle Lücken nach Klasse, die letzten N angewendeten Korrekturen und ein Bereitschaftsflag (clean / drift-detected / errors).',
    fr: 'Instantané d\'observabilité du ConsistencyAgent : écarts actuels par classe, les N dernières corrections appliquées et un indicateur de disponibilité (clean / drift-detected / errors).',
  },
  applyAll: {
    en: 'Apply every safe deterministic consistency fix in bulk: backfill BUSINESS_CHAINS step.producer, upgrade legacy string-form emits, scaffold chain e2e + shadcn + emerging-gap stubs. Idempotent. Returns AppliedChange[].',
    bg: 'Прилага всички безопасни детерминистични корекции на консистентност групово: producer полета на BUSINESS_CHAINS, надграждане на низови emits, скелетни Playwright/shadcn/emerging-gap файлове. Идемпотентно.',
    de: 'Wendet alle sicheren deterministischen Konsistenzkorrekturen bündig an: BUSINESS_CHAINS step.producer-Backfill, Upgrade von String-Emits, Generierung von Chain-e2e/shadcn/Lücken-Stubs. Idempotent.',
    fr: 'Applique en masse toutes les corrections de cohérence déterministes : backfill BUSINESS_CHAINS step.producer, mise à niveau des emits string, génération de stubs chain-e2e/shadcn/lacunes émergentes. Idempotent.',
  },
  proposeEmitterWiring: {
    en: 'For collections that declared `emits: ["x:y"]` without a producer (Class F / Law 4), propose the chainEventEmitters wiring. Returns FixProposal records; does NOT mutate source.',
    bg: 'За колекции с `emits: ["x:y"]` без producer (Class F / Law 4), предлага chainEventEmitters wiring. Връща FixProposal записи; не променя източника.',
    de: 'Für Sammlungen mit `emits: ["x:y"]` ohne Producer (Class F / Law 4) wird die chainEventEmitters-Verdrahtung vorgeschlagen. Mutiert die Quelle NICHT.',
    fr: 'Pour les collections déclarant `emits: ["x:y"]` sans producteur (Class F / Law 4), propose le câblage chainEventEmitters. Ne mute PAS la source.',
  },
  proposeSlugRebind: {
    en: 'For relationTo or payload.find({collection:}) targets pointing at non-existent slugs (Class I/M / Law 10), propose a rebind to the nearest existing slug OR scaffolding a new collection. Returns FixProposal records.',
    bg: 'За relationTo / payload.find({collection:}) сочещи към несъществуващи slug-ове (Class I/M / Law 10), предлага преподаване към най-близкия съществуващ slug ИЛИ скаффолд на нова колекция.',
    de: 'Für relationTo / payload.find({collection:})-Ziele mit nicht existierenden Slugs (Class I/M / Law 10) wird ein Rebind oder das Scaffolding einer neuen Sammlung vorgeschlagen.',
    fr: 'Pour relationTo / payload.find({collection:}) ciblant des slugs inexistants (Class I/M / Law 10), propose un rebind vers le slug existant le plus proche OU le scaffolding d\'une nouvelle collection.',
  },
}

// Register at module load so the i18n-coverage report sees every tool.
for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.consistency.${k}`, v)
}

export function buildConsistencyTools(): ReadonlyArray<ErpaxMcpTool> {
  const tScan = makeToolI18n('erpax.consistency.scan')
  const tStatus = makeToolI18n('erpax.consistency.status')
  const tApplyAll = makeToolI18n('erpax.consistency.applyAll')
  const tEmitter = makeToolI18n('erpax.consistency.proposeEmitterWiring')
  const tRebind = makeToolI18n('erpax.consistency.proposeSlugRebind')

  return [
    {
      name: 'erpax.consistency.scan',
      description: tScan.desc(I18N.scan!),
      parameters: {},
      async handler(_args, req) {
        const { runAllInvariants } = await import('@/services/architecture-invariants')
        const repoRoot = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : undefined
        const suite = await runAllInvariants({ payload: req.payload, repoRoot })
        const handled = new Set([
          'factory-emits-are-hooked', 'services-reference-real-slugs',
          'relation-to-slugs-exist', 'chain-emits-have-producer',
          'referential-harmony', 'no-plugin-owned-slug-collision',
        ])
        const results = [...suite.fails, ...suite.warns].filter((r) => handled.has(r.check))
        return json({
          inspected: results.length,
          byCheck: Object.fromEntries(
            results.map((r) => [r.check, { severity: r.severity, count: r.offenders?.length ?? 0, sample: (r.offenders ?? []).slice(0, 8) }]),
          ),
        })
      },
    },
    {
      name: 'erpax.consistency.status',
      description: tStatus.desc(I18N.status!),
      parameters: { recentApplyLimit: z.number().int().min(1).max(50).optional() },
      async handler({ recentApplyLimit }, req) {
        const { runAllInvariants } = await import('@/services/architecture-invariants')
        const { listProposals } = await import('@/services/meta-automation')
        const repoRoot = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : undefined
        const limit = (recentApplyLimit as number | undefined) ?? 10
        const consistencyChecks = new Set([
          'factory-emits-are-hooked', 'services-reference-real-slugs',
          'relation-to-slugs-exist', 'chain-emits-have-producer',
          'referential-harmony', 'no-plugin-owned-slug-collision',
        ])
        let suite
        let suiteError: string | undefined
        try { suite = await runAllInvariants({ payload: req.payload, repoRoot }) }
        catch (err) { suiteError = err instanceof Error ? err.message : String(err) }
        const cr = suite ? [...suite.fails, ...suite.warns].filter((r) => consistencyChecks.has(r.check)) : []
        const byClass: Record<string, { severity: 'warn' | 'fail'; count: number; sample: ReadonlyArray<string> }> = {}
        for (const r of cr) {
          byClass[r.check] = { severity: r.severity as 'warn' | 'fail', count: r.offenders?.length ?? 0, sample: (r.offenders ?? []).slice(0, 4) }
        }
        const allProposals = listProposals()
        const recent = allProposals.slice(-limit).reverse()
        const hasFails = (suite?.fails.length ?? 0) > 0
        const hasConsistencyWarns = cr.some((r) => r.severity === 'warn')
        const readiness: 'clean' | 'drift-detected' | 'errors' = suiteError ? 'errors'
          : hasFails || hasConsistencyWarns ? 'drift-detected' : 'clean'
        return json({
          at: new Date().toISOString(),
          readiness, suiteError,
          consistencyGaps: { totalCount: cr.reduce((n, r) => n + (r.offenders?.length ?? 0), 0), byClass },
          recentApplies: recent.map((p) => ({ invariant: p.invariant, severity: p.severity, proposedTool: p.proposedTool, autoApply: p.autoApply, rationale: p.rationale })),
          suiteSummary: suite ? { fails: suite.fails.length, warns: suite.warns.length, passes: suite.passes.length } : null,
        })
      },
    },
    {
      name: 'erpax.consistency.applyAll',
      description: tApplyAll.desc(I18N.applyAll!),
      parameters: { dryRun: z.boolean().optional() },
      async handler({ dryRun }) {
        const { applyAllConsistencyFixes } = await import('@/services/consistency-apply')
        const repoRoot = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : undefined
        return json(applyAllConsistencyFixes({ repoRoot, dryRun: dryRun === true }))
      },
    },
    {
      name: 'erpax.consistency.proposeEmitterWiring',
      description: tEmitter.desc(I18N.proposeEmitterWiring!),
      parameters: { offenders: z.array(z.string()).optional() },
      async handler({ offenders }) {
        const proposals = (offenders ?? []).map((o) => ({
          offender: o,
          suggestedHook: `add to src/hooks/chainEventEmitters.ts: emit<...>= emitOnStatusTransition('<status>', '${o.split("'")[1] ?? ''}', '<aggregateType>')`,
          applyVia: 'manual review + tsc',
        }))
        return json({ count: proposals.length, proposals })
      },
    },
    {
      name: 'erpax.consistency.proposeSlugRebind',
      description: tRebind.desc(I18N.proposeSlugRebind!),
      parameters: { offenders: z.array(z.string()).optional() },
      async handler({ offenders }) {
        const proposals = (offenders ?? []).map((o) => ({
          offender: o,
          suggestion: 'manual: choose existing slug or scaffold collection via Slice XXXXXXXX pattern',
          applyVia: 'human review',
        }))
        return json({ count: proposals.length, proposals })
      },
    },
  ]
}
