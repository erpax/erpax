/**
 * readme/regen — focused computed-face regen (avoids full-corpus `pnpm readme` OOM).
 *
 *   tsx src/readme/regen.ts atom1 atom2 ...
 *   pnpm readme:regen medical medical/
 */
import { existsSync, readdirSync, lstatSync } from 'node:fs'
import { join } from 'node:path'
import {
  materializeComputedFacesForPaths,
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
} from './compute'

function listAtoms(root: string, prefix = ''): string[] {
  const out: string[] = []
  if (!existsSync(root)) return out
  for (const name of readdirSync(root).sort()) {
    if (name.startsWith('.')) continue
    const p = join(root, name)
    if (!lstatSync(p).isDirectory()) continue
    const rel = prefix ? `${prefix}/${name}` : name
    if (existsSync(join(p, 'SKILL.md'))) out.push(rel)
    out.push(...listAtoms(p, rel))
  }
  return out
}

export function expandRegenScopes(scopes: readonly string[], cwd: string = process.cwd()): string[] {
  const expanded = new Set<string>()
  for (const a of scopes) {
    const scope = a.replace(/\/?\*?$/, '')
    const dir = join(cwd, 'src', scope)
    if (existsSync(dir)) {
      if (existsSync(join(dir, 'SKILL.md'))) expanded.add(scope)
      for (const p of listAtoms(dir, scope)) expanded.add(p)
    } else {
      expanded.add(a)
    }
  }
  return [...expanded].sort()
}

export function regenFaces(scopes: readonly string[], cwd: string = process.cwd()): number {
  const paths = expandRegenScopes(scopes, cwd)
  if (paths.length === 0) return 0
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  materializeComputedFacesForPaths(paths, cwd, graph, ctx)
  for (const atomPath of paths) console.log('wrote', atomPath)
  console.log(`regen-faces: ${paths.length} atom(s)`)
  return paths.length
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'))
  const scopes = args.length ? args : ['medical']
  regenFaces(scopes)
}
