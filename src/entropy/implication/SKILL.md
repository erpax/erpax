# entropy/implication — the corpus asserted, in 41 places, what [[law]] computes as false

*"Zero entropy ⇒ infinite tamper-cost"* is false in **both** directions, and [[law]] says so in code:
reciprocity-entropy is not coverage — it is 0 on the live tree and prices nothing — and even at
coverage 1 the anchor caps the forge, so `forgeLog2 = min(−checks·log₂(1 − coverage), anchorBits)`
is finite for every real anchor.

The corpus asserted it anyway: **41 sentences across 34 files**, including `AGENTS.md` under
*## One law* and `.claude/skills/SKILL.md`'s frontmatter `description`, which propagates into every
agent's context.

## The gate existed and its domain was three files

`entropy/test.ts` already carried it — well built, splitting on sentence boundaries so a qualifier
had to be **local**, and word-bounding `\bfinite\b` so `in·finite` could not mask a bare claim. Its
`DOCS` list was `entropy/SKILL.md` · `entropy/index.ts` · `law/SKILL.md`. On the other 31 files it
was not passing; it was **silent**, which reads as green ([[rules]]/domain).

## Four refusals, each a false reading the first pass produced

- **A slogan in quotes is CITED, not asserted.** Three sentences quote it in order to refute or
  formalise it — including the corpus's own correction. Flagging those makes the gate report its own
  defence as the defect ([[rules]]/inject's stated failure mode).
- **A word swap is not a healing.** The mechanical involution turned five `entropy ⇒ infinite
  tamper-cost` spans into `entropy ⇒ unbounded tamper-cost` — dodging the regex while asserting the
  same thing. Refused, and healed by reading: an axis at full wiring is one *leg* of coverage, not
  the premise.
- **A noun phrase is not an antecedent.** `zero-entropy core with ∞ tamper-cost` → `coverage = 1
  core` is nonsense; three sites kept the noun phrase and had the **cost** bounded instead.
- **Wikilinks made the count a false ZERO.** After 32 were healed the gate read 0 while
  `diamond/SKILL.md` still asserted it in its **Law** line — `zero[\s-]*entropy` cannot match
  `zero [[entropy]]`. Nine more surfaced once `unlinked` stripped the brackets ([[rules]]/probe: a
  filter that selects by name cannot see what it does not name).

## In code, prose means comments

A `.md` is prose whole. In a `.ts` a claim inside a **string literal is data** — a fixture handing
the predicate a false implication to prove the gate fires is not the corpus asserting it. That false
positive fired on `website/marketing/test.ts`, the consumer proving this very law. `commentsOf`
parses; nothing is matched.

`DEFINES_THE_LAW` exempts exactly three files — this atom's own pair and the gate registry — because
a predicate's fixtures and the line that registers the axis are the corpus describing its own
defence. Every other file under `src` is judged, including `law/` and `entropy/SKILL.md`.

**Honest boundary.** This proves no sentence states **this one** implication unqualified. Other
over-claims in other words are outside the predicate, and widening it toward every extremum-shaped
sentence would put the noise floor above the signal. A claim in a `describe()` string is now
invisible, which is the price of reading comments rather than literals.

**Law — [[law]]: prose may not assert an implication the corpus computes as false. State the
invariant, or quote the slogan in order to refute it — never restate the conclusion.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a stated claim must agree with its source.

Composes: [[entropy]] · [[law]] · [[rules]]/domain · [[rules]]/probe · [[syntax]].
