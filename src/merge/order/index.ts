import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'

/**
 * merge/order — the LAW that a root declares which question it answers.
 *
 * `setRoot` and `sequenceRoot` themselves live in the parent, because they are merge operations
 * and a child importing its own parent's barrel would be the cycle [[rules]]/cycle exists for.
 * What lives here is the gate: who declares, and who collides.
 *
 * @see ./SKILL.md · ../../verify/lean/Order.lean (the separation, kernel-checked, axiom-free)
 */
// A re-export does not bring the name into THIS module's scope, and the file uses `RootKind` in
// its own type positions — so it must be imported as well as offered onward.
import type { RootKind } from '@/merge'

export type { RootKind } from '@/merge' 

export interface RootSite {
  readonly file: string
  readonly name: string
  /** Declared kind, or null — an undeclared root is a seal whose order semantics are a guess. */
  readonly kind: RootKind | null
}

const KIND = /@rootKind\s+(set|sequence)\b/

const walk = (dir: string, out: string[] = []): string[] => {
  let entries: import('node:fs').Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if ((e.name.endsWith('.ts') || e.name.endsWith('.tsx')) && !e.name.endsWith('.d.ts')) out.push(p)
  }
  return out
}

/** Generated faces restate every symbol; they are not evidence about hand-written intent. */
const GENERATED = ['payload-types.ts', 'skills.index.ts', 'ratchet.generated.ts']

/** Every exported function that folds a collection to a content-address, PARSED. @see ./SKILL.md */
export function rootSites(cwd: string = process.cwd()): RootSite[] {
  const out: RootSite[] = []
  for (const file of walk(join(cwd, 'src'))) {
    if (GENERATED.some((g) => file.endsWith(g))) continue
    const text = readFileSync(file, 'utf8')
    if (!/[Rr]oot/.test(text)) continue
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
    const consider = (name: string, node: ts.Node, sig: ts.Node = node): void => {
      void sig
      if (!/[a-z]Root$/.test(name)) return
      // …and it must address a COLLECTION: an arithmetic root takes a `number`. Read from the
      // signature — a body heuristic silently dropped the roots that DELEGATE their fold.
      if (/^\(\s*\w+\s*:\s*number\b/.test(node.getText().slice(node.getText().indexOf('(')))) return
      const lead = ts.getLeadingCommentRanges(text, node.getFullStart()) ?? []
      const doc = lead.map((r) => text.slice(r.pos, r.end)).join('\n')
      const m = KIND.exec(doc)
      out.push({ file: relative(cwd, file), name, kind: (m?.[1] as RootKind) ?? null })
    }
    sf.forEachChild((node) => {
      const mods = ts.canHaveModifiers(node) ? (ts.getModifiers(node) ?? []) : []
      if (!mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return
      if (ts.isFunctionDeclaration(node) && node.name) consider(node.name.text, node)
      if (ts.isVariableStatement(node)) {
        for (const d of node.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) consider(d.name.text, node)
        }
      }
    })
  }
  return out.sort((a, b) => a.file.localeCompare(b.file) || a.name.localeCompare(b.name))
}

export interface RootCollision {
  readonly name: string
  readonly sites: readonly RootSite[]
}

/**
 * One NAME exported with two different order semantics — the sharpest form of the defect.
 *
 * Only DECLARED kinds collide: guessing an undeclared root's kind to manufacture a conflict
 * would be the fabrication these gates refuse. @see ./SKILL.md
 */
export function rootCollisions(cwd: string = process.cwd()): RootCollision[] {
  const byName = new Map<string, RootSite[]>()
  for (const s of rootSites(cwd)) {
    if (s.kind === null) continue
    byName.set(s.name, [...(byName.get(s.name) ?? []), s])
  }
  return [...byName]
    .filter(([, sites]) => new Set(sites.map((x) => x.kind)).size > 1)
    .map(([name, sites]) => ({ name, sites }))
}

/** Roots that do not say which question they answer. */
export const undeclaredRoots = (cwd: string = process.cwd()): RootSite[] =>
  rootSites(cwd).filter((s) => s.kind === null)

/** Fails closed on getting worse. A wrong tag is worse than none, so each needs a read. */
export function assertRootsDeclared(cwd: string = process.cwd(), ceiling: number): void {
  const bad = undeclaredRoots(cwd)
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ merge/order — ${bad.length} root(s) do not declare @rootKind (ceiling ${ceiling}):\n` +
      bad.map((s) => `  ${s.file}  ${s.name}`).join('\n'),
  )
}

/** Fails closed on a NEW name carrying two semantics. Live is 1, a rename away from 0. */
export function assertNoRootCollision(cwd: string = process.cwd(), ceiling: number): void {
  const bad = rootCollisions(cwd)
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ merge/order — ${bad.length} name(s) exported with two order semantics (ceiling ${ceiling}):\n` +
      bad.map((c) => `  ${c.name}\n${c.sites.map((s) => `    ${(s.kind ?? 'undeclared').padEnd(9)} ${s.file}`).join('\n')}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const all = rootSites()
  const bad = undeclaredRoots()
  console.log(`merge/order — ${all.length} root function(s) · ${all.length - bad.length} declared · ${bad.length} undeclared\n`)
  for (const s of all) console.log(`  ${(s.kind ?? '—').padEnd(9)} ${s.file}  ${s.name}`)
  const clash = rootCollisions()
  console.log(`\ncollisions — one name, two semantics: ${clash.length}`)
  for (const c of clash) for (const s of c.sites) console.log(`  ${c.name}  ${(s.kind ?? 'undeclared').padEnd(9)} ${s.file}`)
}
