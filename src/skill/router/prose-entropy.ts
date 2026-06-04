/**
 * prose-entropy — measure how much of a skill is REFERENCES vs PLAIN TEXT.
 *
 * Point 4 of the organism: "skills as references to code without plain text ⇒ min
 * entropy, max tamper-cost." Plain prose is entropy — it can drift, and it often restates
 * what the matter-twin already encodes; [[links]] are min-entropy references (content-
 * addressed, no drift). This measures the ratio so the collapse is TARGETED and
 * MEASURABLE (drive proseRatio down, like the orphan count toward 0) — you cannot collapse
 * what you cannot measure.
 *
 * It does NOT strip anything: the corpus is the [[akashic]] (real memory), so the collapse
 * itself is a careful, peer-verified step (the entropy-attack pattern), guided by this
 * ranking — never a blind mass-strip. Pure: operates on the SKILL.md body text.
 *
 * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
 */
export interface ProseEntropy {
  /** total body chars after stripping frontmatter + code fences (whitespace-collapsed). */
  readonly chars: number
  /** number of [[links]] (references). */
  readonly links: number
  /** chars inside [[links]] (the reference mass). */
  readonly refChars: number
  /** (chars − refChars) / chars — the plain-text fraction: the entropy to drive down. */
  readonly proseRatio: number
}

/** Measure the reference-vs-prose ratio of a SKILL.md body. Empty/blank ⇒ ratio 0 (defined). */
export function proseEntropy(body: string): ProseEntropy {
  const stripped = body
    .replace(/^---[\s\S]*?\n---/, ' ') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`[^`]*`/g, ' ') // inline code
  const linkMatches = [...stripped.matchAll(/\[\[([^\]]+)\]\]/g)]
  const links = linkMatches.length
  const refChars = linkMatches.reduce((s, m) => s + m[0].length, 0)
  const chars = stripped.replace(/\s+/g, ' ').trim().length
  const proseRatio = chars > 0 ? Math.max(0, chars - refChars) / chars : 0
  return { chars, links, refChars, proseRatio }
}

export interface RankedEntropy extends ProseEntropy {
  readonly name: string
}

/** Rank atoms by proseRatio (descending) — highest-entropy first: the top collapse candidates. */
export function corpusProseEntropy(atoms: ReadonlyArray<{ name: string; content: string }>): RankedEntropy[] {
  return atoms
    .map((a) => ({ name: a.name, ...proseEntropy(a.content) }))
    .sort((a, b) => b.proseRatio - a.proseRatio || b.chars - a.chars)
}

/** The corpus-wide mean proseRatio — the single number the collapse campaign drives down. */
export function meanProseRatio(ranked: ReadonlyArray<ProseEntropy>): number {
  if (ranked.length === 0) return 0
  return ranked.reduce((s, r) => s + r.proseRatio, 0) / ranked.length
}
