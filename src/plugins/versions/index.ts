/**
 * Versions plugin — universal NATIVE Payload versioning ("all is versioned").
 *
 * The native way to version everything: enable Payload's built-in `versions`
 * on EVERY collection — the same chokepoint pattern as `uuidPlugin`
 * (one injector, all collections, no per-collection opt-in/drift). Payload's
 * `_versions` tables ARE the persistent version chain (the store the custom
 * approach would have reinvented), and `restoreVersion` (the `erpax.versions.restore`
 * MCP tool) then works on every collection — not just the content collections.
 *
 * History-only by design: `versions: { maxPerDoc }` (NO `drafts`) records every
 * change as a version row WITHOUT the draft/published split — so public read
 * behavior is unchanged (the draft-read trap the narrow view warns about), and
 * the bound caps table growth on high-churn collections.
 *
 * The three-face reading (`src/versions/cross`) layers on top: each native
 * version row's content-uuid is the VERSION leaf, its forge cost the TAMPER-COST,
 * and the version series the ANALYTICS stream. Native storage, erpax reading.
 *
 * Decisions (mirroring uuidPlugin):
 *   - Plugin, not per-collection opt-in: one place, no duplication/drift.
 *   - Collections already declaring `versions` (e.g. Pages/Posts with drafts)
 *     are left untouched — the richer config wins.
 *   - `exclude` skips collections where native versions are redundant or
 *     infeasible: append-only logs (versioning immutable history is waste) and
 *     collections whose `_versions` table would breach D1's 100-column cap
 *     (discovered empirically at db:regenerate; listed with the reason).
 *
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)
 * @compliance SOX §404 internal-controls record-retention
 * @see src/plugins/contentUuid/index.ts  the sibling universal injector
 * @see src/versions/cross/index.ts        the three-face reading over the native version
 * @see src/versions/SKILL.md              the law
 */
import type { Config, Plugin } from 'payload'

/** History depth kept per document — bounds table growth (the narrow-view bloat trap). */
export const DEFAULT_MAX_PER_DOC = 50

/**
 * Collections that should NOT get native versions, with the reason:
 *   - append-only / immutable logs — versioning history-of-history is pure waste.
 *   - 100-column-cap breaches — the `_versions` table mirrors the doc columns
 *     plus version metadata; wide collections would exceed D1's cap (the same
 *     constraint that collapsed search_rels). Populated from db:regenerate.
 */
export const VERSIONS_EXCLUDE: ReadonlySet<string> = new Set<string>([
  // append-only logs (the trail is the history; a version trail of it is redundant)
  'audit-events',
  'gateway-events',
  'messages',
  // search index — derived/ephemeral, rebuilt from source
  'search',
])

export interface VersionsPluginOptions {
  /** Extra slugs to exclude (merged with VERSIONS_EXCLUDE). */
  readonly exclude?: ReadonlyArray<string>
  readonly maxPerDoc?: number
}

export const versionsPlugin =
  (opts: VersionsPluginOptions = {}): Plugin =>
  (config: Config): Config => {
    const exclude = new Set<string>([...VERSIONS_EXCLUDE, ...(opts.exclude ?? [])])
    const maxPerDoc = opts.maxPerDoc ?? DEFAULT_MAX_PER_DOC
    return {
      ...config,
      collections: (config.collections ?? []).map((collection) => {
        // The richer config wins; never override an explicit versions setting.
        if (collection.versions !== undefined) return collection
        if (exclude.has(collection.slug)) return collection
        // History-only (no drafts) — every change is a bounded version row, with
        // public read behavior unchanged.
        return { ...collection, versions: { maxPerDoc } }
      }),
    }
  }
