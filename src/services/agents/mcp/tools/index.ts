/**
 * Tools barrel — Slice CCCCCCCCC (2026-05-11).
 *
 * Per-area builders. The main `tool-defs.ts` will import + concatenate
 * these as the modularization proceeds (Slices ZZZZZZZZ → onwards). Each
 * area is self-contained:
 *
 *   - own I18N record (registered at module load)
 *   - own zod parameter schemas
 *   - own handler implementations
 *   - exports a single `buildXxxTools(deps)` factory
 *
 * Convention: each area file matches `erpax.<area>.*` toolName prefix.
 *
 * @standard ISO/IEC 25010:2023 §5.7 modularity
 */
export { buildConsistencyTools } from './consistency'
export { buildEventsTools } from './events'
export { buildCloudflareTools } from './cloudflare'
