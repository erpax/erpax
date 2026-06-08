/**
 * method — THE path-of-diamonds law for exported symbols. Every method name has an
 * address in the lattice: the chain of [[atom]] folders from corpus root to the
 * file's barrel, plus the exported symbol at the leaf — `law/folder/folderGuardians`,
 * `readme/renderReadme`, `aura/crossSeals`. The path IS the identity; the symbol is
 * not a free-floating global. Content-uuid seals `{ atomPath, symbol }` for tamper-
 * evidence on the method boundary (the same primitive as [[quantum/boundary]] on files).
 *
 * Export names are parsed from barrel source (function/const/class/interface/type
 * declarations and named re-exports). Scans `index.ts` barrels only (the atom public
 * face per [[convention/exported]] / [[convention/import]]).
 *
 *   tsx src/method/index.ts              # sample paths + corpus digest
 *   tsx src/method/index.ts law/folder   # paths under one atom subtree
 *
 * @audit paths computed from live index.ts exports; never hand-listed
 * @see ../diamond — ../atom — ../quantum/boundary — ../convention/exported — ./SKILL.md
 */
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { uuid, jcsCanonicalize } from '@/integrity/content-uuid'

const SRC = join(process.cwd(), 'src')
/** Generated / framework trees — not atom barrels (mirrors [[law/folder]]). */
const SKIP_TREES = new Set(['app', 'migrations'])

const EXPORT_DECL_RE =
  /export\s+(?:async\s+)?(?:declare\s+)?(?:function|const|let|var|class)\s+(\w+)/g
const EXPORT_TYPE_RE = /export\s+(?:type|interface)\s+(\w+)/g
const EXPORT_NAMED_RE = /export\s+(?:type\s+)?\{([^}]+)\}(?:\s+from\s+['"][^'"]+['"])?/g
const EXPORT_STAR_RE = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g

/** Exported symbol names from a barrel — the method-diamond leaves. */
export function parseMethodExports(body: string): string[] {
  const out = new Set<string>()
  for (let m; (m = EXPORT_DECL_RE.exec(body)); ) out.add(m[1]!)
  for (let m; (m = EXPORT_TYPE_RE.exec(body)); ) out.add(m[1]!)
  for (let m; (m = EXPORT_NAMED_RE.exec(body)); ) {
    for (const part of m[1]!.split(',')) {
      const t = part.trim()
      if (!t) continue
      const asMatch = /^type\s+(\w+)(?:\s+as\s+(\w+))?$/.exec(t) ?? /^(\w+)(?:\s+as\s+(\w+))?$/.exec(t)
      if (asMatch) out.add(asMatch[2] ?? asMatch[1]!)
    }
  }
  for (let m; (m = EXPORT_STAR_RE.exec(body)); ) out.add('*:' + m[1])
  if (/export\s+default\b/.test(body)) out.add('default')
  return [...out].sort()
}

export interface MethodDiamond {
  /** Src-relative barrel path, e.g. `law/folder/index.ts`. */
  readonly file: string
  /** Chain of atom folders, e.g. `law/folder`. */
  readonly atomPath: string
  /** Exported symbol at the leaf, e.g. `folderGuardians`. */
  readonly symbol: string
  /** Full path of diamonds — atomPath/symbol. */
  readonly address: string
  /** Content-uuid of `{ atomPath, symbol }` — the method boundary seal. */
  readonly boundaryUuid: string
}

/** Extract the atom-path diamond chain from a src-relative file path. */
export function atomPathOf(file: string): string {
  const norm = file.replace(/\\/g, '/').replace(/^src\//, '')
  if (norm === 'index.ts' || norm.endsWith('/index.ts')) {
    const dir = norm === 'index.ts' ? '' : norm.slice(0, -'/index.ts'.length)
    return dir === '.' ? '' : dir
  }
  const slash = norm.lastIndexOf('/')
  return slash < 0 ? '' : norm.slice(0, slash)
}

/** Content-address the method boundary — same path+symbol ⇒ same uuid. */
export function methodBoundaryUuid(atomPath: string, symbol: string): string {
  return uuid(jcsCanonicalize({ atomPath, symbol }))
}

/** The path of diamonds for one exported symbol — atom chain + method name at the leaf. */
export function methodPath(file: string, symbol: string): MethodDiamond {
  const atomPath = atomPathOf(file)
  const address = atomPath ? `${atomPath}/${symbol}` : symbol
  return {
    file,
    atomPath,
    symbol,
    address,
    boundaryUuid: methodBoundaryUuid(atomPath, symbol),
  }
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

/** Walk every `index.ts` barrel under src; derive each exported symbol's diamond path. */
export function scanMethodPaths(root: string = SRC): MethodDiamond[] {
  const out: MethodDiamond[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      if (!rel && SKIP_TREES.has(e)) continue
      const childRel = rel ? `${rel}/${e}` : e
      walk(p, childRel)
    }
    const barrel = join(dir, 'index.ts')
    try {
      if (!statSync(barrel).isFile()) return
    } catch {
      return
    }
    const relFile = relative(root, barrel).replace(/\\/g, '/')
    const body = readFileSync(barrel, 'utf8')
    for (const symbol of parseMethodExports(body)) {
      if (symbol.startsWith('*:') || symbol === 'default') continue
      out.push(methodPath(relFile, symbol))
    }
  }
  walk(root, '')
  return out.sort((a, b) => a.address.localeCompare(b.address))
}

/**
 * Whether the symbol name encodes its atom path (leaf or any segment). Aspirational
 * alignment for new code — every method HAS a path whether or not this holds; mass
 * rename is a separate wave.
 */
export function symbolRelatesToPath(symbol: string, atomPath: string): boolean {
  const sym = symbol.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (!sym || !atomPath) return sym.length > 0 && atomPath.length === 0
  return atomPath
    .split('/')
    .filter(Boolean)
    .some((seg) => sym.includes(seg) || seg.includes(sym))
}

/** Methods whose names do not encode their atom path — informational; not gated. */
export const orphanMethods = (root: string = SRC): MethodDiamond[] =>
  scanMethodPaths(root).filter((m) => !symbolRelatesToPath(m.symbol, m.atomPath))

export interface MethodDigest {
  readonly barrels: number
  readonly methods: number
  readonly orphans: number
}

/** Corpus-wide digest — paths computed live over index.ts barrels. */
export function methodDigest(root: string = SRC): MethodDigest {
  const methods = scanMethodPaths(root)
  const barrels = new Set(methods.map((m) => m.file)).size
  const orphans = methods.filter((m) => !symbolRelatesToPath(m.symbol, m.atomPath)).length
  return { barrels, methods: methods.length, orphans }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const prefix = process.argv.find((a) => !a.startsWith('-') && a !== process.argv[0] && a !== process.argv[1])
  const all = scanMethodPaths()
  const shown = prefix ? all.filter((m) => m.atomPath.startsWith(prefix) || m.file.startsWith(prefix)) : all
  const d = methodDigest()
  console.log(`method — path of diamonds: ${d.methods} symbols in ${d.barrels} index.ts barrels (${d.orphans} name/path orphans — informational)`)
  const samples = [
    methodPath('law/folder/index.ts', 'folderGuardians'),
    methodPath('aura/index.ts', 'crossSeals'),
    methodPath('readme/index.ts', 'renderReadme'),
    methodPath('guardian/index.ts', 'guardian'),
    methodPath('name/index.ts', 'uuidOfName'),
  ]
  console.log('canonical samples:')
  for (const s of samples) console.log(`  ${s.address}  uuid=${s.boundaryUuid.slice(0, 8)}…`)
  if (prefix) {
    console.log(`under ${prefix}:`)
    for (const m of shown.slice(0, 20)) console.log(`  ${m.address}`)
    if (shown.length > 20) console.log(`  … ${shown.length - 20} more`)
  }
}
