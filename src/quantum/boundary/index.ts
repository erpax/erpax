/**
 * quantum/boundary — COMPUTED import/export per file. Boundaries are derived from source
 * bytes, never hand-drawn — the same law as content-uuid, horo positions, typography bonds.
 *
 * Per file:
 *   • TS/TSX — imports = `@/` barrel entanglements (index-only); exports = emitted symbols
 *     (index.ts barrels) or empty (consumers).
 *   • SKILL.md — imports = outgoing `[[wikilink]]` entanglements; exports = the atom name
 *     (its public facet in the lattice).
 *
 *   boundaryUuid = uuid({ filePath, imports: sorted, exports: sorted })
 *
 * Drift between recomputation and a stored boundary is impurity (tamper/hallucination signal).
 * `collapseEscapes` mass-rewrites deep imports → barrels (raises tamper-cost).
 *
 *   tsx src/quantum/boundary/index.ts              # corpus summary
 *   tsx src/quantum/boundary/index.ts --collapse   # dry-run escape collapse plan
 *   tsx src/quantum/boundary/index.ts --apply        # rewrite deep imports → barrels
 *
 * @audit boundaries computed from live source; never hand-asserted
 * @see ../../tamper/import -- ../../integrity/content-uuid -- ../../aura -- ./SKILL.md
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { uuid, jcsCanonicalize } from '@/integrity'
import { isIndexImport, resolveBarrel, nonIndexImports } from '@/tamper/import'
import { LINK_RE, stripCode } from '@/aura'

const SRC = 'src'

export interface FileBoundary {
  readonly file: string
  readonly kind: 'ts' | 'skill'
  readonly imports: readonly string[]
  readonly exports: readonly string[]
  readonly escapes: readonly string[]
  readonly boundaryUuid: string
}

const IMPORT_RE = /(?:from|import)\s+['"](@\/[^'"]+)['"]/g

/** Extract sorted unique `@/` import specs from TS source. */
export function parseTsImports(body: string): string[] {
  const out = new Set<string>()
  for (let m; (m = IMPORT_RE.exec(body)); ) out.add(m[1]!)
  return [...out].sort()
}

/** Index-only barrel entanglements; deep specs land in escapes. */
export function classifyImports(specs: readonly string[], root = SRC): { barrels: string[]; escapes: string[] } {
  const barrels = new Set<string>()
  const escapes: string[] = []
  for (const spec of specs) {
    const barrel = resolveBarrel(spec, root) ?? (isIndexImport(spec, root) ? spec : null)
    if (barrel) barrels.add(barrel)
    else escapes.push(spec)
  }
  return { barrels: [...barrels].sort(), escapes: escapes.sort() }
}

const EXPORT_NAMED_RE =
  /export\s+(?:type\s+)?(?:\{([^}]+)\}|(\w+)(?:\s+as\s+(\w+))?)\s*(?:from\s+['"][^'"]+['"])?/g
const EXPORT_STAR_RE = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g
const EXPORT_DEFAULT_RE = /export\s+default\b/g

/** Derive exported symbol names from TS source (index barrels and modules). */
export function parseTsExports(body: string): string[] {
  const out = new Set<string>()
  for (let m; (m = EXPORT_NAMED_RE.exec(body)); ) {
    if (m[1]) {
      for (const part of m[1].split(',')) {
        const t = part.trim()
        if (!t) continue
        const asMatch = /^(\w+)\s+as\s+(\w+)$/.exec(t)
        out.add(asMatch ? asMatch[2]! : t.split(/\s+/)[0]!)
      }
    } else if (m[2]) out.add(m[3] ?? m[2])
  }
  for (let m; (m = EXPORT_STAR_RE.exec(body)); ) out.add('*:' + m[1])
  if (EXPORT_DEFAULT_RE.test(body)) out.add('default')
  return [...out].sort()
}

/** Extract outgoing [[wikilink]] targets from SKILL.md (code fences stripped). */
export function parseSkillImports(body: string): string[] {
  const text = stripCode(body)
  const out = new Set<string>()
  const re = new RegExp(LINK_RE.source, LINK_RE.flags)
  for (let m; (m = re.exec(text)); ) {
    const target = m[1]!.split('/')[0]!.toLowerCase()
    if (target) out.add(target)
  }
  return [...out].sort()
}

/** The atom's public facet — its folder leaf name from frontmatter or path. */
export function skillExportName(filePath: string, body: string): string {
  const fm = /^---\n[\s\S]*?\nname:\s*([^\n]+)\n[\s\S]*?---/m.exec(body)
  if (fm?.[1]) return fm[1].trim().replace(/^"|"$/g, '')
  const parts = filePath.replace(/\\/g, '/').split('/')
  return parts[parts.length - 2] ?? 'unknown'
}

/** Content-address the import/export boundary — same bytes ⇒ same uuid; one import flip ⇒ flip. */
export function boundaryUuid(filePath: string, imports: readonly string[], exports: readonly string[]): string {
  return uuid(jcsCanonicalize({ filePath, imports: [...imports].sort(), exports: [...exports].sort() }))
}

/** Compute one file's quantum boundary from live bytes. */
export function computeBoundary(absPath: string, root = join(process.cwd(), SRC)): FileBoundary {
  const rel = relative(root, absPath).replace(/\\/g, '/')
  const rootKey = relative(process.cwd(), root) || SRC
  const body = readFileSync(absPath, 'utf8')
  if (rel.endsWith('SKILL.md')) {
    const imports = parseSkillImports(body)
    const exports = [skillExportName(rel, body)]
    return { file: rel, kind: 'skill', imports, exports, escapes: [], boundaryUuid: boundaryUuid(rel, imports, exports) }
  }
  const specs = parseTsImports(body)
  const { barrels, escapes } = classifyImports(specs, rootKey)
  const exports = parseTsExports(body)
  return {
    file: rel,
    kind: 'ts',
    imports: barrels,
    exports,
    escapes,
    boundaryUuid: boundaryUuid(rel, barrels, exports),
  }
}

function walkSource(root: string, onFile: (abs: string) => void): void {
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      if (e === 'node_modules' || e.startsWith('.')) continue
      const p = join(dir, e)
      let st
      try {
        st = statSync(p)
      } catch {
        continue
      }
      if (st.isDirectory()) {
        walk(p)
        continue
      }
      if ((/\.(ts|tsx)$/.test(e) && !/\.d\.ts$/.test(e)) || e === 'SKILL.md') onFile(p)
    }
  }
  walk(root)
}

/** Scan the corpus — every TS/TSX file and SKILL.md boundary computed live. */
export function scanBoundaries(root = join(process.cwd(), SRC)): FileBoundary[] {
  const out: FileBoundary[] = []
  walkSource(root, (abs) => out.push(computeBoundary(abs, root)))
  return out.sort((a, b) => a.file.localeCompare(b.file))
}

export interface BoundaryDigest {
  readonly files: number
  readonly skills: number
  readonly tsFiles: number
  readonly escapes: number
  readonly escapeFiles: number
  readonly uniqueBarrels: number
}

/** Corpus-wide boundary digest — escapes = deep-import impurity count. */
export function boundaryDigest(root = join(process.cwd(), SRC)): BoundaryDigest {
  const bounds = scanBoundaries(root)
  const escapeSet = new Set<string>()
  const barrelSet = new Set<string>()
  let escapes = 0
  let escapeFiles = 0
  for (const b of bounds) {
    if (b.escapes.length) {
      escapeFiles++
      escapes += b.escapes.length
      for (const e of b.escapes) escapeSet.add(e)
    }
    for (const i of b.imports) barrelSet.add(i)
  }
  return {
    files: bounds.length,
    skills: bounds.filter((b) => b.kind === 'skill').length,
    tsFiles: bounds.filter((b) => b.kind === 'ts').length,
    escapes,
    escapeFiles,
    uniqueBarrels: barrelSet.size,
  }
}

/** Recompute boundary; drift from expected uuid ⇒ impurity. */
export function verifyBoundary(
  absPath: string,
  expectedUuid: string,
  root = join(process.cwd(), SRC),
): { ok: boolean; expected: string; actual: string } {
  const actual = computeBoundary(absPath, root).boundaryUuid
  return { ok: actual === expectedUuid, expected: expectedUuid, actual }
}

export interface CollapseRewrite {
  readonly file: string
  readonly from: string
  readonly to: string
}

/**
 * Skip barrel collapse only for intra-atom imports — those use relative rewrites
 * (`planIntraAtomCollapse`) instead. Cross-atom index.ts consumers MUST collapse
 * to the target barrel (the old blanket index.ts skip left planCollapse empty).
 */
export function shouldSkipCollapse(file: string, _from: string, to: string): boolean {
  const atom = to.replace(/^@\//, '')
  const norm = file.replace(/\\/g, '/')
  return norm.startsWith(atom + '/')
}

/** Plan rewrites: every deep `@/` spec → its nearest barrel (index.ts face). */
export function planCollapse(root = SRC): CollapseRewrite[] {
  const rewrites: CollapseRewrite[] = []
  const seen = new Set<string>()
  for (const v of nonIndexImports(root)) {
    const barrel = resolveBarrel(v.spec, root)
    if (!barrel || barrel === v.spec) continue
    if (shouldSkipCollapse(v.file, v.spec, barrel)) continue
    const key = v.file + '|' + v.spec + '|' + barrel
    if (seen.has(key)) continue
    seen.add(key)
    rewrites.push({ file: v.file, from: v.spec, to: barrel })
  }
  return rewrites.sort((a, b) => a.file.localeCompare(b.file) || a.from.localeCompare(b.from))
}

/** Intra-atom deep import → relative sibling (avoids barrel cycles inside one atom). */
export function relativeIntraAtomImport(file: string, spec: string): string | null {
  if (!spec.startsWith('@/')) return null
  const target = spec.replace(/^@\//, '')
  const atom = target.split('/')[0]!
  const norm = file.replace(/\\/g, '/')
  if (!norm.startsWith(atom + '/')) return null
  const fromDir = dirname(norm)
  let rel = relative(fromDir, target).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = './' + rel
  return rel
}

/** Plan intra-atom rewrites for deep specs with no barrel (same atom folder tree). */
export function planIntraAtomCollapse(root = SRC): CollapseRewrite[] {
  const rewrites: CollapseRewrite[] = []
  const seen = new Set<string>()
  for (const v of nonIndexImports(root)) {
    const barrel = resolveBarrel(v.spec, root)
    if (barrel && !shouldSkipCollapse(v.file, v.spec, barrel)) continue
    const rel = relativeIntraAtomImport(v.file, v.spec)
    if (!rel) continue
    const key = v.file + '|' + v.spec + '|' + rel
    if (seen.has(key)) continue
    seen.add(key)
    rewrites.push({ file: v.file, from: v.spec, to: rel })
  }
  return rewrites
}

/** Apply collapse rewrites — replace deep specs with barrels in source files. */
export function applyCollapse(rewrites: readonly CollapseRewrite[], root = SRC): number {
  const byFile = new Map<string, CollapseRewrite[]>()
  for (const r of rewrites) {
    const arr = byFile.get(r.file) ?? []
    arr.push(r)
    byFile.set(r.file, arr)
  }
  let changed = 0
  for (const [file, rs] of byFile) {
    const path = join(root, file)
    let body = readFileSync(path, 'utf8')
    const orig = body
    for (const r of rs.sort((a, b) => b.from.length - a.from.length)) {
      body = body.split("'" + r.from + "'").join("'" + r.to + "'")
      body = body.split('"' + r.from + '"').join('"' + r.to + '"')
    }
    if (body !== orig) {
      writeFileSync(path, body)
      changed++
    }
  }
  return changed
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const apply = process.argv.includes('--apply')
  const collapseOnly = process.argv.includes('--collapse') || apply
  const intra = process.argv.includes('--intra')
  if (collapseOnly || intra) {
    const inter = planCollapse()
    const inner = planIntraAtomCollapse()
    const plan = intra && !collapseOnly ? inner : [...inter, ...inner]
    if (apply) {
      const n = applyCollapse(plan)
      const after = nonIndexImports().length
      console.log('quantum/boundary collapse APPLIED: ' + n + ' files rewritten · ' + plan.length + ' spec rewrites')
      console.log('  non-index imports remaining: ' + after)
    } else {
      console.log('quantum/boundary collapse (dry): ' + plan.length + ' rewrites across ' + new Set(plan.map((p) => p.file)).size + ' files')
      for (const r of plan.slice(0, 12)) console.log('    ' + r.file + ': ' + r.from + ' → ' + r.to)
      if (plan.length > 12) console.log('    …')
    }
  } else {
    const d = boundaryDigest()
    const escapes = nonIndexImports().length
    console.log('quantum/boundary — computed import/export per file:')
    console.log('  files ' + d.files + ' (skills ' + d.skills + ' · ts ' + d.tsFiles + ')')
    console.log('  barrel entanglements (unique) ' + d.uniqueBarrels)
    console.log('  deep-import escapes ' + d.escapes + ' in ' + d.escapeFiles + ' files (tamper/import violations ' + escapes + ')')
    const sample = scanBoundaries().find((b) => b.kind === 'ts' && b.imports.length > 0)
    if (sample) console.log('  sample ' + sample.file + ' uuid=' + sample.boundaryUuid.slice(0, 8) + '… imports=' + sample.imports.slice(0, 3).join(', '))
  }
}
