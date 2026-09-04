/**
 * confine — 231 collections are handled like plasma: by the FIELD, never by holding every particle.
 *
 * @standard ISO/IEC 25010:2023 §5.6.2 — modularity: the whole is confined, not held
 */
import { allFiles, astOf, textOf } from '@/syntax/cache'
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
  // Filtered from the ONE shared walk ([[syntax]]/cache). The parse is shared too: `rel` was passed
  // as the SourceFile's name and only the reported `file` uses it, which is set explicitly below.
  const walk = (dir: string): void => {
    void dir
    for (const p of allFiles(cwd)) {
      if (p.includes('/worktrees/')) continue
      const rel = p.slice(cwd.length + 1).replace(/\\/g, '/')
      if (!/\.tsx?$/.test(p) || GENERATED.test(rel) || BOTTLE.test(rel)) continue
      let text: string
      try {
        text = textOf(p)
      } catch {
        continue
      }
      if (!text.includes('@/collections')) continue
      const src = astOf(p, text)
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
