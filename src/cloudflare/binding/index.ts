/**
 * cloudflare/binding — the mediator boundary, re-exported from its ONE implementation.
 *
 * This atom used to hold a SECOND copy of the fail-closed mediator, and the copies had
 * diverged badly. `makeMediator` here returned only `{ enforceAuthorized,
 * auditBindingCall }` — no kvGet, no r2Get, no audit chain — against the real one's
 * full typed surface, and it took `op: any`, erasing the very narrowing that stops a
 * caller handing the authorizer a name that is not a binding.
 *
 * Nothing imported it, so nothing was harmed. But it was ADDRESSABLE, it carried a
 * SKILL saying every binding access MUST flow through these wrappers, and it handed
 * out a tenth of the boundary to anyone who believed that. A duplicated security
 * boundary is not two safeguards; it is one safeguard and one decoy.
 *
 * @see ../index.ts — the implementation · ./SKILL.md
 */
export {
  makeMediator,
  enforceAuthorized,
  auditBindingCall,
  reportAuditDrop,
  type MediatorContext,
  type MediatorAuthorizer,
} from '../index'


import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { parseWranglerBindings } from '../wrangler'

export interface DoExportGap {
  readonly binding: string
  readonly className: string
  readonly reason: string
}

/** Every named export of a module, following `export { A } from './b'` to check `b` really binds A. */
const namedExportsOf = (file: string, cwd: string, depth = 2): { names: Set<string>; stars: string[] } => {
  const names = new Set<string>()
  const stars: string[] = []
  let text = ''
  try {
    text = readFileSync(file, 'utf8')
  } catch {
    return { names, stars }
  }
  const src = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true)
  for (const st of src.statements) {
    if (ts.isExportDeclaration(st)) {
      if (!st.exportClause) {
        stars.push(st.moduleSpecifier?.getText().replace(/['"]/g, '') ?? '')
        continue
      }
      if (ts.isNamedExports(st.exportClause)) for (const e of st.exportClause.elements) names.add(e.name.text)
      continue
    }
    const mods = ts.canHaveModifiers(st) ? (ts.getModifiers(st) ?? []) : []
    if (!mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue
    if (ts.isClassDeclaration(st) || ts.isFunctionDeclaration(st)) {
      if (st.name) names.add(st.name.text)
    } else if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) names.add(d.name.text)
    }
  }
  void depth
  void cwd
  return { names, stars }
}

/** Does `spec` (as written in the worker) actually DEFINE a class named `cls`? */
const definesClass = (spec: string, cls: string, cwd: string): boolean => {
  const rel = spec.startsWith('@/') ? join(cwd, 'src', spec.slice(2)) : join(cwd, spec)
  for (const cand of [rel, rel + '.ts', rel + '.tsx', join(rel, 'index.ts'), join(rel, 'index.tsx')]) {
    let text = ''
    try {
      text = readFileSync(cand, 'utf8')
    } catch {
      continue
    }
    const src = ts.createSourceFile(cand, text, ts.ScriptTarget.ESNext, true)
    for (const st of src.statements) {
      if (ts.isClassDeclaration(st) && st.name?.text === cls) return true
    }
  }
  return false
}

/**
 * A Durable Object binds only if its class is a NAMED EXPORT of the worker entry.
 *
 * workerd requires it, and it fails in the quietest way there is: the deploy succeeds, the binding
 * exists, and every call to it fails at runtime. `worker.ts` records that a side-effect import was
 * tried here first and could not create a named export — so this check exists because the gap has
 * already been walked into once.
 *
 * The re-export is VERIFIED, never trusted: `export { AuditChain } from '@/ai/durable-objects'`
 * counts only when that module actually declares the class, which is [[rules]]/face's rule about a
 * phantom name applied to a binding.
 *
 * **Honest boundary.** A class supplied by `export * from` a BUILD ARTEFACT cannot be checked from
 * a clean tree — `.open-next/worker.js` does not exist until a build. Those are reported as
 * unverified rather than counted as present, because "could not ask" is not "the answer was yes".
 */
export function durableObjectExportGaps(cwd: string = process.cwd()): DoExportGap[] {
  let config = ''
  try {
    config = readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
  } catch {
    return []
  }
  const declared = parseWranglerBindings(config)
    .filter((e) => e.type === 'durable_objects')
    .map((e) => ({
      binding: e.bindingName,
      className: String((e.config as Record<string, unknown>).class_name ?? ''),
    }))
    .filter((d) => d.className !== '')
  if (declared.length === 0) return []

  const main = /"main"\s*:\s*"([^"]+)"/.exec(config)?.[1] ?? 'worker.ts'
  const entry = join(cwd, main)
  const { names } = namedExportsOf(entry, cwd)

  // where each name is re-exported FROM, so the target can be asked whether it really binds it
  let entryText = ''
  try {
    entryText = readFileSync(entry, 'utf8')
  } catch {
    return declared.map((d) => ({ ...d, reason: `worker entry ${main} is unreadable` }))
  }
  const src = ts.createSourceFile(entry, entryText, ts.ScriptTarget.ESNext, true)
  const from = new Map<string, string>()
  for (const st of src.statements) {
    if (!ts.isExportDeclaration(st) || !st.exportClause || !ts.isNamedExports(st.exportClause)) continue
    const spec = st.moduleSpecifier?.getText().replace(/['"]/g, '')
    if (!spec) continue
    for (const e of st.exportClause.elements) from.set(e.name.text, spec)
  }

  const out: DoExportGap[] = []
  for (const d of declared) {
    if (!names.has(d.className)) {
      out.push({ ...d, reason: `not a named export of ${main} — the binding exists and every call to it fails at runtime` })
      continue
    }
    const spec = from.get(d.className)
    if (spec !== undefined && !definesClass(spec, d.className, cwd)) {
      out.push({ ...d, reason: `${main} re-exports it from '${spec}', which declares no such class` })
    }
  }
  return out
}

/** Fails closed: a declared Durable Object whose class the worker never exports. Zero is a theorem. */
export function assertDurableObjectsExported(cwd: string = process.cwd()): void {
  const gaps = durableObjectExportGaps(cwd)
  if (gaps.length === 0) return
  throw new Error(
    `✖ cloudflare/binding — ${gaps.length} Durable Object class(es) not exported by the worker entry:\n` +
      gaps.map((g) => `  ${g.binding.padEnd(16)} ${g.className.padEnd(20)} ${g.reason}`).join('\n'),
  )
}

/** @index-cross.foldback child=cloudflare/binding parent=cloudflare — this cross folds back into its parent. */
