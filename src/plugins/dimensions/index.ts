/**
 * 10 dimensional plugins — entry-point scaffolding.
 *
 * Slice MMMMMMMM (2026-05-11). Per slice LLLLLLLL (10 dimensional
 * plugins per the §0b vortices), this file declares the 10 Payload-
 * plugin entry points. Each is a NO-OP factory today; slice BBBBBB
 * (split monolithic plugin into N composable per-domain DRY plugins)
 * will fill them with collection moves on the local machine.
 *
 *   A — Domain          (collections themselves; the WHAT)
 *   B — Substrate       (storage / uuid / streams; the SUBSTRATE)
 *   C — Process         (events / chains; the FLOW)
 *   D — Conservation    (laws / invariants; the CHECKS)
 *   E — Tenant Role     (open registry; the WHO)
 *   F — Integrity       (verification / audit; the TRUTH)
 *   G — Beyond          (next-horizon primitives; the HORIZON)
 *   H — Clients         (browser / Cloudflare / external; the EXTERIOR)
 *   I — Federation      (inter-tenant; the MANY)
 *   J — Meta-evolution  (self-reference / clones / proposals; the MIRROR)
 *
 * **Conservation Law 51** — `checkDimensionalPluginScaffolded`:
 * every dimension declared in `DIMENSIONAL_PLUGINS` (slice LLLLLLLL)
 * has a matching plugin factory exported from this file. Boot suite
 * verifies the symmetry; CI catches a new dimension declared without
 * a plugin entry-point.
 *
 * @standard W3C Web Components composition pattern
 * @standard ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries
 * @audit ISO 19011:2018 §6.4.6 (every dimensional plugin audit-trailed)
 */

import type { Config, Plugin } from 'payload'
import { DIMENSIONAL_PLUGINS, type DimensionId } from '@/services/plugins/dimensions'

/**
 * Make a no-op plugin factory for one dimension. Each factory returns
 * a plugin function that — TODAY — leaves the Payload config
 * unchanged. Slice BBBBBB will replace these implementations with
 * actual collection registration as the file moves complete.
 *
 * The factory signature MUST match `Plugin = (config: Config) => Config`
 * so the dimension entry-points slot directly into `payload.config.ts`'s
 * `plugins:` array without further wiring.
 */
function makeDimensionPlugin(id: DimensionId): Plugin {
  return (config: Config): Config => {
    // No-op today. Slice BBBBBB will:
    //   1. Import the dimension's collections (per DIMENSIONAL_PLUGINS).
    //   2. Append them to config.collections (deduped against the legacy
    //      monolithic plugin until the migration completes).
    //   3. Register the dimension's hooks / scheduled tasks / agents.
    return config
  }
}

// ─── 10 dimension factories ────────────────────────────────────────

export const domainDimensionPlugin: Plugin         = makeDimensionPlugin('A-domain')
export const substrateDimensionPlugin: Plugin      = makeDimensionPlugin('B-substrate')
export const processDimensionPlugin: Plugin        = makeDimensionPlugin('C-process')
export const conservationDimensionPlugin: Plugin   = makeDimensionPlugin('D-conservation')
export const tenantRoleDimensionPlugin: Plugin     = makeDimensionPlugin('E-tenant-role')
export const integrityDimensionPlugin: Plugin      = makeDimensionPlugin('F-integrity')
export const beyondDimensionPlugin: Plugin         = makeDimensionPlugin('G-beyond')
export const clientsDimensionPlugin: Plugin        = makeDimensionPlugin('H-clients')
export const federationDimensionPlugin: Plugin     = makeDimensionPlugin('I-federation')
export const metaEvolutionDimensionPlugin: Plugin  = makeDimensionPlugin('J-meta-evolution')

/**
 * Map of factory per dimension id — used for symmetry verification
 * (Conservation Law 51) and for downstream callers that want to
 * iterate.
 */
export const DIMENSION_PLUGIN_FACTORIES: Readonly<Record<DimensionId, Plugin>> = {
  'A-domain':          domainDimensionPlugin,
  'B-substrate':       substrateDimensionPlugin,
  'C-process':         processDimensionPlugin,
  'D-conservation':    conservationDimensionPlugin,
  'E-tenant-role':     tenantRoleDimensionPlugin,
  'F-integrity':       integrityDimensionPlugin,
  'G-beyond':          beyondDimensionPlugin,
  'H-clients':         clientsDimensionPlugin,
  'I-federation':      federationDimensionPlugin,
  'J-meta-evolution':  metaEvolutionDimensionPlugin,
}

/**
 * One-shot helper for `payload.config.ts`: spread every dimension
 * plugin into the `plugins:` array in declared order. Until the
 * BBBBBB migration runs, these are no-ops; after, they become the
 * primary collection-registration path.
 */
export function allDimensionalPlugins(): ReadonlyArray<Plugin> {
  return DIMENSIONAL_PLUGINS.map((d) => DIMENSION_PLUGIN_FACTORIES[d.id])
}

// ─── Conservation Law 51 — scaffolding symmetry ────────────────────

export interface ScaffoldingSymmetryResult {
  readonly ok: boolean
  readonly missingFactories: ReadonlyArray<DimensionId>
  readonly orphanFactories: ReadonlyArray<string>
}

/**
 * Conservation Law 51 — every dimension in `DIMENSIONAL_PLUGINS`
 * MUST have a matching factory in `DIMENSION_PLUGIN_FACTORIES`.
 * Symmetry catches drift: a new dimension declared without a
 * factory, or a factory left behind after a dimension is removed.
 */
export function checkDimensionalPluginScaffolded(): ScaffoldingSymmetryResult {
  const declaredIds = new Set(DIMENSIONAL_PLUGINS.map((d) => d.id))
  const factoryIds = new Set(Object.keys(DIMENSION_PLUGIN_FACTORIES) as DimensionId[])
  const missingFactories = [...declaredIds].filter((id) => !factoryIds.has(id))
  const orphanFactories = [...factoryIds].filter((id) => !declaredIds.has(id as DimensionId))
  return { ok: missingFactories.length === 0 && orphanFactories.length === 0, missingFactories, orphanFactories }
}
