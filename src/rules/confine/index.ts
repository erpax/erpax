/**
 * confine — 231 collections are handled like plasma: by the FIELD, never by holding every particle.
 *
 * You do not handle plasma by touching it; you confine it in a magnetic field. You do not handle 231
 * collections by materialising all of them — a static `import * as x from '@/collections'`, then
 * `Object.values(x)` at module scope. That is holding every particle, and it is exactly what COLLAPSED THE
 * BOOT ([[run]]/load): a collection factory reaching the agent's tool-defs, which materialised every
 * collection, which imported the factory — `fixed/assets:34` ran `createAccountingCollection` at module top
 * level while the factory was still initialising ([[rules]]/cycle). TDZ, in every loader.
 *
 * The fix was confinement: read the RUNNING instance — `req.payload.config.collections`, the field that
 * already contains them — instead of importing each. This gate makes that permanent: hand-written code may
 * not materialise the whole collection registry outside the config. Handle the field, not the particles.
 *
 * WHAT IS THE BOTTLE, not a touch — the payload config and the barrel it registers (`payload.config.ts`,
 * `config/app/collections`, `collections/index`) ARE the confinement; they are ALLOWED to hold every
 * collection, because that is their one job. A barrel's own TEST is allowed too — it exists to check the
 * barrel. Everything else reads the field.
 *
 * PARSED, not matched — the plasma-touch detector this replaces flagged a COMMENT in tool-defs describing the
 * old code (`import * as allCollections` in a docstring). A comment is data ([[syntax]]); only a real
 * `ts.ImportDeclaration` namespace-importing `@/collections` is a touch. The gate reads the grammar.
 *
 * @standard ISO/IEC 25010:2023 §5.6.2 — modularity: the whole is confined, not held
 *
 * Composes [[rules]]/cycle · [[syntax]] · [[law]].
 */
import ts from 'typescript'
import { readdirSync, readFileSync, type Dirent } from 'node:fs'
import { join } from 'node:path'

/** Canonical atom path. */
export const atomPath = 'confine' as const

/** The magnetic bottle — the config and the barrel it registers ARE allowed to hold every collection. */
const BOTTLE = /payload\.config|config\/app\/collections|collections\/(index|test)/
const GENERATED = /skills\.index|payload-types|\.generated\./

/** A file that materialises the whole collection registry outside the config — a plasma touch. */
export interface PlasmaTouch {
  readonly file: string
  readonly line: number
}

/** Every place hand-written code namespace-imports `@/collections` outside the bottle. Parsed, not matched. */
export function plasmaTouches(cwd: string = process.cwd()): PlasmaTouch[] {
  const out: PlasmaTouch[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      const rel = p.slice(cwd.length + 1).replace(/\\/g, '/')
      if (!/\.tsx?$/.test(e.name) || GENERATED.test(rel) || BOTTLE.test(rel)) continue
      let text: string
      try {
        text = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      if (!text.includes('@/collections')) continue
      const src = ts.createSourceFile(rel, text, ts.ScriptTarget.ESNext, true)
      const visit = (n: ts.Node): void => {
        if (
          ts.isImportDeclaration(n) &&
          ts.isStringLiteral(n.moduleSpecifier) &&
          n.moduleSpecifier.text === '@/collections' &&
          n.importClause?.namedBindings &&
          ts.isNamespaceImport(n.importClause.namedBindings) // `import * as x` — the whole registry
        ) {
          out.push({ file: rel, line: src.getLineAndCharacterOfPosition(n.getStart()).line + 1 })
        }
        ts.forEachChild(n, visit)
      }
      visit(src)
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/** Gate: the boot-failure class cannot return. The ceiling is 0 — the plasma is never touched by hand. */
export function assertConfined(cwd: string = process.cwd(), ceiling = 0): void {
  const touches = plasmaTouches(cwd)
  if (touches.length <= ceiling) return
  throw new Error(
    `✖ confine — ${touches.length} file(s) materialise the whole collection registry outside the config (ceiling ${ceiling}). Read req.payload, not a static import — handle the field, not the particles:\n${touches
      .map((t) => `  ${t.file}:${t.line}`)
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const touches = plasmaTouches()
  console.log(
    touches.length === 0
      ? 'confine — OK · the 231 collections are confined by the field, never held by hand'
      : `confine — ${touches.length} plasma touch(es):\n${touches.map((t) => '  ' + t.file + ':' + t.line).join('\n')}`,
  )
  process.exit(touches.length === 0 ? 0 : 1)
}

/** @index-cross.foldback child=rules/confine parent=rules — this cross folds back into its parent. */
