/**
 * verify/case — each document's proof, shown as an assurance case.
 *
 * A page that states a law owes the reader what the law rests on. The pieces already exist in
 * three places: the SKILL states the claim, the Lean files hold the theorems, and the kernel
 * record says which of them compiled and on which axioms. This atom merges them into one section
 * with a fixed order — claim, argument, evidence, assumptions — so every page shows the same four
 * things in the same place and none can be quietly left out.
 *
 * The argument is the theorems as Lean states them (never re-typed). The evidence is the kernel
 * record restricted to the files the document cites, rendered by the same LaTeX generator the
 * whole-corpus record uses, so a page cannot say more than the record does. A document that cites
 * no Lean file says so: its evidence is its tests, and that is stated as weaker.
 *
 * @invariant a theorem shown on a page is one the kernel reported, with the axioms it reported
 * @invariant a document citing no Lean file is shown as having no formal proof, never as proved
 * @standard ISO/IEC/IEEE-15026-2:2022 assurance-case claim argument evidence assumptions
 * @standard ISO-80000-2:2019 mathematical-signs-and-symbols
 * @see ./SKILL.md
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { record, render, type Record_ } from '@/verify/latex'

/** One theorem as its Lean source states it. */
export interface Statement {
  readonly name: string
  readonly statement: string
}

/** Every theorem and lemma in a Lean source, named under the file's first namespace. */
export function statementsOf(lean: string): Statement[] {
  const ns = /^namespace\s+([A-Za-z0-9_.]+)/m.exec(lean)?.[1]
  const out: Statement[] = []
  const decl = /^(?:theorem|lemma)\s+([A-Za-z0-9_'.]+)([\s\S]*?):=/gm
  for (const m of lean.matchAll(decl)) {
    const signature = `${m[1]}${m[2]}`.replace(/\s+/g, ' ').trim()
    out.push({ name: ns ? `${ns}.${m[1]}` : m[1]!, statement: `theorem ${signature}` })
  }
  return out
}

/** The Lean files a document names, once each, in order of first mention. */
export function citedLean(markdown: string): string[] {
  return [...new Set([...markdown.matchAll(/\b([A-Z][A-Za-z0-9]*\.lean)\b/g)].map((m) => m[1]!))]
}

/** The document's own claim: its `**Law — …**` sentence, without the emphasis marks. */
export function lawOf(markdown: string): string | undefined {
  const m = /\*\*Law\s*—\s*([\s\S]*?)\*\*/.exec(markdown)
  return m ? m[1]!.replace(/\s+/g, ' ').trim() : undefined
}

/** How many test cases a test source declares. */
export function testsIn(source: string): number {
  return (source.match(/^\s*(?:it|test)(?:\.each\([^)]*\))?\(/gm) ?? []).length
}

export interface CaseInput {
  readonly claim?: string
  /** the kernel record, restricted to the files this document cites */
  readonly record: Record_
  /** Lean source of each cited file that exists, by file name */
  readonly sources: Readonly<Record<string, string>>
  /** cited files the record does not know */
  readonly unknown: readonly string[]
  readonly tests: number
}

/** The record cut down to the named files, in the order the record holds them. */
export function restrict(r: Record_, files: readonly string[]): Record_ {
  return { ...r, files: r.files.filter((f) => files.includes(f.file)) }
}

/**
 * The proof section of a page: claim · argument · evidence · assumptions, always in that order.
 * Returns the empty string for a document with no claim, no cited proof and no tests — there is
 * nothing to show, and an empty frame would read as a proof.
 */
export function caseMarkdown(input: CaseInput): string {
  const entries = input.record.files.flatMap((f) => f.entries)
  const reported = new Set(entries.map((e) => e.theorem))
  const stated = input.record.files.flatMap((f) => statementsOf(input.sources[f.file] ?? '').filter((s) => reported.has(s.name)))
  if (!input.claim && entries.length === 0 && input.tests === 0 && input.unknown.length === 0) return ''
  const axioms = [...new Set(entries.flatMap((e) => e.axioms ?? []))].sort()
  const refused = input.record.files.filter((f) => !f.compiled).map((f) => f.file)
  const stubbed = entries.filter((e) => e.stubbed).map((e) => e.theorem)
  const lines: string[] = ['## Proof', '', `**Claim.** ${input.claim ?? 'This document states no law of its own.'}`, '']
  if (entries.length > 0) {
    lines.push(`**Argument.** ${entries.length} theorem(s) checked by the Lean kernel, as their source states them:`, '', '```lean', ...stated.map((s) => s.statement), '```', '')
    lines.push('**Evidence.** The kernel record for the cited files, generated and never edited:', '', '```latex', render(input.record), '```', '')
  } else {
    lines.push('**Argument.** No formal proof is cited. What follows is evidence by test, which is weaker: a test shows cases, not all cases.', '')
    lines.push(`**Evidence.** ${input.tests} test case(s) beside this document.`, '')
  }
  const assumed = [
    axioms.length > 0 ? `axioms used: ${axioms.join(', ')}` : entries.length > 0 ? 'no axioms beyond the kernel' : undefined,
    refused.length > 0 ? `refused by the kernel: ${refused.join(', ')}` : undefined,
    stubbed.length > 0 ? `stubbed: ${stubbed.join(', ')}` : undefined,
    input.unknown.length > 0 ? `cited but not in the kernel record: ${input.unknown.join(', ')}` : undefined,
    entries.length > 0 && input.tests > 0 ? `${input.tests} test case(s) also stand beside it` : undefined,
  ].filter((x): x is string => x !== undefined)
  lines.push(`**Assumptions.** ${assumed.length > 0 ? assumed.join('; ') : 'none stated'}.`)
  return lines.join('\n')
}

/** A document with its proof section appended; a document that already has one is left alone. */
export function withCase(markdown: string, section: string): string {
  if (!section || /^## Proof$/m.test(markdown)) return markdown
  return `${markdown.trimEnd()}\n\n${section}\n`
}

/** The proof section for an atom of a checkout: its SKILL's claim and citations, the record, its tests. */
export function corpusCase(cwd: string, path: string, markdown: string, r: Record_ = record()): string {
  const cited = citedLean(markdown)
  const known = new Set(r.files.map((f) => f.file))
  const sources: Record<string, string> = {}
  for (const file of cited) {
    const at = join(cwd, 'src', 'verify', 'lean', file)
    if (existsSync(at)) sources[file] = readFileSync(at, 'utf8')
  }
  const testAt = ['test.ts', 'test.tsx'].map((t) => join(cwd, 'src', path, t)).find((t) => existsSync(t))
  return caseMarkdown({
    claim: lawOf(markdown),
    record: restrict(r, cited),
    sources,
    unknown: cited.filter((f) => !known.has(f)),
    tests: testAt ? testsIn(readFileSync(testAt, 'utf8')) : 0,
  })
}
