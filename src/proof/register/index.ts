import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, relative } from 'node:path'
import { kernelPath, leanFiles } from '@/proof/accepted'

/**
 * proof/register — the axiom index: what every theorem in this corpus actually rests on.
 *
 * @see ./SKILL.md
 */

export interface TheoremAxioms {
  readonly file: string
  /** Fully-qualified name, as the kernel knows it. */
  readonly name: string
  /** The axioms the kernel reports. Empty means the theorem rests on nothing. */
  readonly axioms: readonly string[]
}

export interface AxiomRegister {
  readonly theorems: number
  readonly axiomFree: number
  /** Axiom → the theorems that depend on it, so a reader can follow either direction. */
  readonly byAxiom: ReadonlyMap<string, readonly string[]>
  /** Axioms this corpus DECLARES itself, as opposed to Lean's own. */
  readonly declared: readonly string[]
  readonly entries: readonly TheoremAxioms[]
  /** Files whose theorems could not be asked — never silently counted as axiom-free. */
  readonly unasked: readonly string[]
}

/** Lean's own axioms. Anything else in a report is either declared here or came from a library. */
const LEAN_BUILTIN = new Set(['propext', 'Classical.choice', 'Quot.sound', 'Lean.ofReduceBool', 'Lean.trustCompiler'])

const NAMESPACE = /^namespace\s+([A-Za-z_][\w.]*)/m
const DECLARED = /^axiom\s+([A-Za-z_]\w*)/gm
const PROVED = /^(?:theorem|lemma)\s+([A-Za-z_]\w*)/gm

/** Every proved declaration in a file, with the namespace the kernel will know it by. */
export function theoremNames(file: string): string[] {
  const text = readFileSync(file, 'utf8')
  const ns = NAMESPACE.exec(text)?.[1]
  return [...text.matchAll(PROVED)].map((m) => (ns ? `${ns}.${m[1]!}` : m[1]!))
}

/** Every axiom a file DECLARES — an assumption stated in the open rather than smuggled in. */
export function declaredAxioms(file: string): string[] {
  const text = readFileSync(file, 'utf8')
  const ns = NAMESPACE.exec(text)?.[1]
  return [...text.matchAll(DECLARED)].map((m) => (ns ? `${ns}.${m[1]!}` : m[1]!))
}

/**
 * Ask the kernel what each theorem rests on.
 *
 * `#print axioms` is the arbiter and it is ASKED, never restated — the same discipline the drift law
 * applies to numbers. A file that will not compile is reported as UNASKED rather than counted as
 * axiom-free, because "the question could not be put" and "the answer was none" are different facts
 * and only one of them is good news.
 */
export function axiomRegister(cwd: string = process.cwd()): AxiomRegister {
  const lean = kernelPath()
  if (lean === null) throw new Error('✖ no Lean kernel — an axiom index with no kernel would be a list of guesses')

  const entries: TheoremAxioms[] = []
  const unasked: string[] = []
  const declared: string[] = []

  for (const file of leanFiles(cwd)) {
    const rel = relative(cwd, file)
    declared.push(...declaredAxioms(file))
    const names = theoremNames(file)
    if (names.length === 0) continue

    const dir = dirname(file)
    const mod = basename(file, '.lean')
    const work = mkdtempSync(join(tmpdir(), 'erpax-axioms-'))
    try {
      // The module must be compiled before it can be imported and interrogated.
      execFileSync(lean, ['-o', join(work, `${mod}.olean`), `${mod}.lean`], {
        cwd: dir,
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 120_000,
      })
      const probe = join(work, 'probe.lean')
      writeFileSync(probe, `import ${mod}\n${names.map((n) => `#print axioms ${n}`).join('\n')}\n`)
      const out = execFileSync(lean, [probe], {
        cwd: dir,
        encoding: 'utf8',
        env: { ...process.env, LEAN_PATH: work },
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 180_000,
      })
      for (const line of out.split('\n')) {
        const none = /^'(.+?)' does not depend on any axioms/.exec(line)
        if (none) {
          entries.push({ file: rel, name: none[1]!, axioms: [] })
          continue
        }
        const dep = /^'(.+?)' depends on axioms: \[(.*)\]/.exec(line)
        if (dep) {
          entries.push({ file: rel, name: dep[1]!, axioms: dep[2]!.split(',').map((a) => a.trim()).filter(Boolean) })
        }
      }
    } catch {
      unasked.push(rel)
    } finally {
      rmSync(work, { recursive: true, force: true })
    }
  }

  const byAxiom = new Map<string, string[]>()
  for (const e of entries) for (const a of e.axioms) byAxiom.set(a, [...(byAxiom.get(a) ?? []), e.name])

  return {
    theorems: entries.length,
    axiomFree: entries.filter((e) => e.axioms.length === 0).length,
    byAxiom,
    declared,
    entries,
    unasked,
  }
}

/**
 * Theorems that rest on `sorryAx` — the kernel's own marker for a proof that was never given.
 *
 * This reaches the same declarations [[proof]]/accepted finds by reading compiler warnings, from
 * the opposite direction: dependency rather than diagnostics. Two instruments agreeing is the point;
 * either alone would be a single reading.
 */
export function unprovenTheorems(r: AxiomRegister): readonly TheoremAxioms[] {
  return r.entries.filter((e) => e.axioms.includes('sorryAx'))
}

/**
 * Fails closed on a theorem that rests on nothing at all.
 *
 * Zero is the horizon, not the floor today: four Orchestrate declarations carry `sorryAx`, so the
 * ceiling starts there and ratchets down. A theorem depending on `sorryAx` states a claim and proves
 * nothing, which is the strongest form of a claim nobody can contradict.
 */
export function assertNoUnproven(cwd: string = process.cwd(), ceiling: number): void {
  if (kernelPath() === null) {
    throw new Error('✖ proof/register — no Lean kernel: the index cannot be built, so it must not pass')
  }
  const bad = unprovenTheorems(axiomRegister(cwd))
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ proof/register — ${bad.length} theorem(s) rest on sorryAx (ceiling ${ceiling}):\n` +
      bad.map((e) => `  ${e.name}  (${e.file})`).join('\n'),
  )
}

/** Axioms neither declared here nor shipped by Lean — a dependency arriving from somewhere else. */
export function foreignAxioms(r: AxiomRegister): readonly string[] {
  const own = new Set(r.declared)
  return [...r.byAxiom.keys()].filter((a) => !LEAN_BUILTIN.has(a) && !own.has(a) && a !== 'sorryAx')
}

/** The index, as a page — every theorem, what it rests on, and what could not be asked. */
export function formatRegister(r: AxiomRegister): string {
  const lines = [
    `axiom register — ${r.theorems} theorem(s) asked · ${r.axiomFree} rest on nothing`,
    '',
  ]
  if (r.byAxiom.size === 0) lines.push('no axiom is used by any theorem in this corpus')
  for (const [axiom, users] of [...r.byAxiom].sort((a, b) => b[1].length - a[1].length)) {
    lines.push(`${axiom}  — ${users.length} theorem(s)`)
    for (const u of users) lines.push(`    ${u}`)
  }
  if (r.declared.length) {
    lines.push('', `declared by this corpus (assumptions stated in the open): ${r.declared.length}`)
    for (const d of r.declared) {
      const used = [...r.byAxiom.get(d) ?? []]
      lines.push(`    ${d} — ${used.length === 0 ? 'used by NO theorem: a register entry, not a dependency' : `used by ${used.length}`}`)
    }
  }
  if (r.unasked.length) {
    lines.push('', `UNASKED — these files do not compile, so their theorems were never interrogated:`)
    for (const f of r.unasked) lines.push(`    ${f}`)
    lines.push(`    "could not ask" is not "rests on nothing".`)
  }
  return lines.join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(formatRegister(axiomRegister()))
}
