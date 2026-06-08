/**
 * atom-catalogue-lazy — defer the 788KB generated catalogue until first skill lookup.
 *
 * MCP tools/list still registers every atom; handlers fetch sealed SKILL excerpts
 * on demand via {@link loadSkillByAtomPath} instead of bundling corpus text.
 *
 * @see ./atom-catalogue.generated.ts · ./auto-generated.ts
 */
import type { AtomSkill } from './atom-catalogue.generated'

let catalogue: readonly AtomSkill[] | null = null
let byAtom: Map<string, AtomSkill> | null = null
let byPath: Map<string, AtomSkill> | null = null

const indexCatalogue = (entries: readonly AtomSkill[]): void => {
  catalogue = entries
  byAtom = new Map(entries.map((s) => [s.atom, s]))
  byPath = new Map(entries.map((s) => [s.path, s]))
}

/** Load generated atom catalogue on first access (not at auto-generated module init). */
export function loadAtomCatalogue(): readonly AtomSkill[] {
  if (!catalogue) {
    // Sync require keeps buildErpaxMcpTools synchronous; loads only on first skill access.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('./atom-catalogue.generated') as { ATOM_CATALOGUE: readonly AtomSkill[] }
    indexCatalogue(mod.ATOM_CATALOGUE)
  }
  return catalogue!
}

/** Lookup by atom leaf or full path under src/. */
export function lookupAtomSkill(key: string): AtomSkill | undefined {
  loadAtomCatalogue()
  const norm = key.replace(/^src\//, '').replace(/^\/+|\/+$/g, '')
  return byAtom!.get(norm) ?? byPath!.get(norm) ?? byAtom!.get(norm.split('/').pop() ?? '')
}

/** Catalogue row count without building MCP tools. */
export function atomCatalogueLength(): number {
  return loadAtomCatalogue().length
}

/** Test hook — inject a minimal catalogue without loading the generated file. */
export function resetAtomCatalogueForTest(entries?: readonly AtomSkill[]): void {
  if (entries) indexCatalogue(entries)
  else {
    catalogue = null
    byAtom = null
    byPath = null
  }
}
