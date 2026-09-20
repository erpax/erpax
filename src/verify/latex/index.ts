/**
 * verify/latex — a document and a kernel record that cannot disagree.
 *
 * The rendering is generated from [[verify]]/inventory, so it cannot drift. What matters is the
 * other direction: a document may quietly OMIT the theorems that carry axioms or the files the
 * kernel refused, and read as a clean record of a dirty run. So the pair is checked as a BIJECTION
 * — every theorem in the document is in the record, and every theorem in the record is in the
 * document. Prose can then be wrong about a theorem, but it cannot be silent about one.
 *
 * The full argument is in ./SKILL.md; this file keeps the shapes.
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence
 */
import { INVENTORY as inventory } from '@/verify/inventory'

export const atomPath = 'verify/latex' as const

export interface Entry {
  readonly theorem: string
  readonly axiomFree: boolean
  readonly stubbed: boolean
}

export interface Record_ {
  readonly sourcesHash: string
  readonly lean: string
  readonly files: readonly { readonly file: string; readonly compiled: boolean; readonly entries: readonly Entry[] }[]
}

/** Escape the characters LaTeX reads as syntax. Underscores are everywhere in theorem names. */
export function tex(s: string): string {
  return s.replace(/[\\{}$&#^_%~]/g, (c) => (c === '\\' ? '\\textbackslash{}' : `\\${c}`))
}

/** The record as the emitter wrote it. */
export function record(): Record_ {
  return inventory as unknown as Record_
}

/** Every theorem the kernel reported, in file order then declaration order. */
export function theoremsOf(r: Record_ = record()): readonly string[] {
  return r.files.flatMap((f) => f.entries.map((e) => e.theorem))
}

/** One thing still open, and what would close it. */
export interface Lead {
  readonly kind: 'stubbed' | 'refused' | 'axioms'
  readonly subject: string
  readonly file: string
  /** The axioms it leans on, for an 'axioms' lead. */
  readonly axioms: readonly string[]
}

/**
 * The open ends, computed from the record rather than curated.
 *
 * ORDERED BY WHAT IT COSTS TO BELIEVE THE CLAIM: a stubbed theorem is asserted and unproved; a
 * refused file produced no evidence at all; a theorem carrying axioms is proved, and leans on
 * something. A document that lists the proofs and not these is a clean record of whatever the run
 * happened to be.
 */
export function leads(r: Record_ = record()): readonly Lead[] {
  const out: Lead[] = []
  for (const f of r.files) {
    if (!f.compiled) {
      out.push({ kind: 'refused', subject: f.file, file: f.file, axioms: [] })
      continue
    }
    for (const e of f.entries) {
      if (e.stubbed) out.push({ kind: 'stubbed', subject: e.theorem, file: f.file, axioms: axiomsOf(e) })
    }
  }
  for (const f of r.files) {
    if (!f.compiled) continue
    for (const e of f.entries) {
      if (!e.stubbed && !e.axiomFree) out.push({ kind: 'axioms', subject: e.theorem, file: f.file, axioms: axiomsOf(e) })
    }
  }
  return out
}

const axiomsOf = (e: Entry): readonly string[] =>
  Array.isArray((e as unknown as { axioms?: unknown }).axioms)
    ? ((e as unknown as { axioms: string[] }).axioms as readonly string[])
    : []

/** Files the kernel REFUSED. A document that omits these is the lie this atom exists for. */
export function refusedFiles(r: Record_ = record()): readonly string[] {
  return r.files.filter((f) => !f.compiled).map((f) => f.file)
}

/**
 * Render the record as LaTeX.
 *
 * Every theorem gets a row carrying its axiom status, and a refused file gets a row saying so —
 * there is deliberately no filter, no "interesting theorems only" and no summary that could be
 * true while the rows are missing.
 */
export function render(r: Record_ = record()): string {
  const rows = r.files.flatMap((f) =>
    f.compiled
      ? f.entries.map(
          (e) =>
            `  ${tex(e.theorem)} & ${tex(f.file)} & ${e.stubbed ? 'STUBBED' : e.axiomFree ? 'axiom-free' : 'axioms'} \\\\`,
        )
      : [`  \\textit{(file refused by the kernel)} & ${tex(f.file)} & REFUSED \\\\`],
  )
  const total = theoremsOf(r).length
  const free = r.files.flatMap((f) => f.entries).filter((e) => e.axiomFree).length
  const stubbed = r.files.flatMap((f) => f.entries).filter((e) => e.stubbed).length
  return [
    '% GENERATED from the kernel record. Do not edit — regenerate.',
    `% sources ${r.sourcesHash}`,
    '\\begin{table}[h]',
    `\\caption{Kernel record: ${total} theorems, ${free} axiom-free, ${stubbed} stubbed. Lean ${tex(r.lean)}. Sources \\texttt{${tex(r.sourcesHash)}}.}`,
    '\\begin{tabular}{lll}',
    '  \\textbf{Theorem} & \\textbf{File} & \\textbf{Axioms} \\\\',
    '  \\hline',
    ...rows,
    '\\end{tabular}',
    '\\end{table}',
    '',
    '% The open ends, computed from the same record. A document that lists proofs and not these',
    '% is a clean account of whatever the run happened to be.',
    '\\begin{table}[h]',
    `\\caption{Open: ${leads(r).length} lead(s) — ${leads(r).filter((l) => l.kind === 'stubbed').length} stubbed, ${leads(r).filter((l) => l.kind === 'refused').length} refused, ${leads(r).filter((l) => l.kind === 'axioms').length} carrying axioms.}`,
    '\\begin{tabular}{lll}',
    '  \\textbf{Lead} & \\textbf{Subject} & \\textbf{Leans on} \\\\',
    '  \\hline',
    ...(leads(r).length === 0
      ? ['  \\textit{(none)} & --- & --- \\\\']
      : leads(r).map((l) => `  LEAD-${l.kind} & ${tex(l.subject)} & ${l.axioms.length > 0 ? tex(l.axioms.join(', ')) : '---'} \\\\`)),
    '\\end{tabular}',
    '\\end{table}',
  ].join('\n')
}

/** Read the theorem names back out of a rendered document. The inverse of `render`, on names. */
export function theoremsIn(latex: string): readonly string[] {
  return latex
    .split('\n')
    .filter((l) => l.startsWith('  ') && l.includes('&') && !l.includes('\\textbf') && !l.includes('\\hline'))
    // A LEAD row is not a theorem row. Reading one back as a theorem would make the document
    // appear to claim something the kernel never reported — the exact failure agreement() exists for.
    .filter((l) => !l.trimStart().startsWith('LEAD-'))
    .map((l) => (l.split('&')[0] ?? '').trim())
    .filter((n) => n.length > 0 && !n.startsWith('\\textit'))
    .map((n) => n.replace(/\\([\\{}$&#^_%~])/g, '$1'))
}

/** The sources hash the document claims to describe, or null if it carries none. */
export function hashIn(latex: string): string | null {
  const m = /^% sources ([0-9a-f]+)$/m.exec(latex)
  return m ? (m[1] as string) : null
}

export interface Agreement {
  readonly agrees: boolean
  /** In the record, absent from the document — the silent omission this exists to catch. */
  readonly missingFromDocument: readonly string[]
  /** In the document, absent from the record — a claim the kernel never made. */
  readonly missingFromRecord: readonly string[]
  /** The document names the sources the record was taken over. */
  readonly hashMatches: boolean
  /** Open ends in the record that the document does not surface. */
  readonly hiddenLeads: readonly string[]
}

/**
 * Do the two prove each other?
 *
 * Both directions are load-bearing and neither implies the other. A document missing a theorem is
 * hiding one; a document naming a theorem the kernel never reported is inventing one. The hash ties
 * the pair to the bytes the kernel actually read, so a stale document is detectable rather than
 * merely unlikely.
 */
export function agreement(latex: string, r: Record_ = record()): Agreement {
  const doc = new Set(theoremsIn(latex))
  const kernel = theoremsOf(r)
  const missingFromDocument = kernel.filter((t) => !doc.has(t))
  const missingFromRecord = [...doc].filter((t) => !kernel.includes(t))
  const hashMatches = hashIn(latex) === r.sourcesHash
  // A lead must be surfaced AS a lead — appearing in the theorem table is not exposure.
  const hiddenLeads = leads(r).filter((l) => !latex.includes(`LEAD-${l.kind} & ${tex(l.subject)}`)).map((l) => l.subject)
  return {
    agrees:
      missingFromDocument.length === 0 && missingFromRecord.length === 0 && hashMatches && hiddenLeads.length === 0,
    missingFromDocument,
    missingFromRecord,
    hashMatches,
    hiddenLeads,
  }
}
