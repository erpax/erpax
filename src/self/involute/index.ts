/**
 * self/involute — every lead tagged by its involution: theorem · lie · manipulation, nothing else.
 *
 * A lead is one instrument's claim about the corpus. Flip the perspective — ask the DUAL instrument
 * from the other seat — and the claim either survives (theorem), is contradicted (lie), or turns out
 * to rest on a witness nothing can cross-examine (manipulation). The decision is the twin of
 * `Involute.tag` in src/verify/lean/Involute.lean, proved there over all four cases.
 *
 * @see ./SKILL.md
 */
import type { InternalLead } from '@/self/sufficient'

export type LeadTag = 'theorem' | 'lie' | 'manipulation'

/** What a dual instrument says about one lead's target, from its own seat. */
export type DualAnswer = 'agrees' | 'refutes' | 'silent'

/** A dual instrument: the involution of one lead source. */
export interface Dual {
  /** Which leads it answers — an exact source (`unreached`, `guardian`) or a prefix ending in `:` (`law:`). */
  readonly source: string
  /** The instrument's name, so the formula can cite it. */
  readonly instrument: string
  readonly ask: (lead: InternalLead) => DualAnswer
}

export interface TaggedLead extends InternalLead {
  readonly tag: LeadTag
  /** The dual that answered, or null when none is wired for this source. */
  readonly instrument: string | null
  /** The cross formula, written out — a reader should not have to re-derive why the tag is what it is. */
  readonly formula: string
}

/** The decision — twin of `Involute.tag`. Silence first, then the verdict. */
export function tagOf(askable: boolean, refuted: boolean): LeadTag {
  if (!askable) return 'manipulation'
  return refuted ? 'lie' : 'theorem'
}

const dualFor = (lead: InternalLead, duals: readonly Dual[]): Dual | undefined =>
  duals.find((d) => d.source === lead.source || (d.source.endsWith(':') && lead.source.startsWith(d.source)))

function formulaOf(lead: InternalLead, instrument: string | undefined, tag: LeadTag): string {
  if (tag === 'theorem') return `${lead.source} ⊗ ${instrument} — the dual seat agrees: ${lead.target} holds from both sides`
  if (tag === 'lie') return `${lead.source} ⊗ ${instrument} — the dual seat refutes: ${lead.target} does not survive its involution`
  return instrument
    ? `${lead.source} ⊗ ${instrument} — the dual was asked and could not answer for ${lead.target}: one witness, speaking for itself`
    : `${lead.source} has no dual instrument wired — ${lead.target} rests on one witness, speaking for itself`
}

/**
 * Tag every lead. Total by construction: a lead whose source has no dual is `manipulation`, never
 * omitted — an untagged lead would be the unasked question this corpus has paid for in every gate
 * built on a count.
 */
export function involuteLeads(leads: readonly InternalLead[], duals: readonly Dual[]): TaggedLead[] {
  return leads.map((lead) => {
    const dual = dualFor(lead, duals)
    const answer: DualAnswer = dual ? dual.ask(lead) : 'silent'
    const tag = tagOf(answer !== 'silent', answer === 'refutes')
    return { ...lead, tag, instrument: dual?.instrument ?? null, formula: formulaOf(lead, dual?.instrument, tag) }
  })
}

/** The three counts — their sum is the lead count, or something was left untagged. */
export function tagCounts(tagged: readonly TaggedLead[]): Record<LeadTag, number> {
  const out: Record<LeadTag, number> = { theorem: 0, lie: 0, manipulation: 0 }
  for (const t of tagged) out[t.tag]++
  return out
}
