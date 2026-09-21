/**
 * The contract an area file writes against — the tool type, the i18n helper, the result shape.
 *
 * Each area file is self-contained by design, and that made every one of them climb `../` twice for
 * the same two imports. Splitting the compliance builder into its five lawful namespaces multiplied
 * that by five and moved [[coordinate]]'s locality count by 8 — the entropy axis caught it. The
 * climb is paid ONCE here and the areas address it as a sibling.
 *
 * @quality ISO/IEC 25010:2023 §5.7 modularity — one crossing, not one per area
 */
export { makeToolI18n, type LocalizedString } from '../i18n'
export type { ErpaxMcpTool } from '../tool-defs'

/** Every tool on this surface answers with one JSON text block. */
export const json = (v: unknown) => ({ content: [{ text: JSON.stringify(v, null, 2), type: 'text' as const }] })
