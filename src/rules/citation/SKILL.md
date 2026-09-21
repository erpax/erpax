# rules/citation — a refactor may drop a symbol; it may not drop a statute

[[rules]]/face closed one door: an atom may never quietly stop **offering a name**. This is the
same door on the other wall — an atom may never quietly stop **citing an authority**.

The machine-readable surface (`@standard` · `@accounting` · `@compliance` · `@quality` ·
`@security`) is not decoration. [[rules]]/audience reads it to decide which reader a claim is
addressed to, [[standards]]/emit builds the catalogue from it, and [[proof]]/replaceable counts a
cited standard as an axiom until a gate discharges it. **A standard that leaves that surface leaves
every gate built on it** — and it leaves in the improving direction, because fewer cited standards
reads as fewer undischarged axioms.

## What it caught, replayed against the commits that did it

Two purges on 2026-09-20 cut 170 dead exports and then swept the orphans they left. Both were
careful, both were right about the code — and between them the corpus stopped citing two standards
entirely:

| standard | where it was | how it went |
| --- | --- | --- |
| **BG ЗПУПС** — Закон за платежните услуги | `naredba/n/18/scope/index.ts` | the module docstring sat above the one dead export, so the purge took both |
| **IFRS 1** §IG7 non-monetary items | `currency/fallback/index.ts` | same shape — the file's whole header went with the symbol under it |

ЗПУПС is the law that makes a PSP transfer **lawfully outside СУПТО**. It is exactly the clause a
compliance-officer traces, and for a day the trace started nowhere. Neither purge was reported as
lossy by anything: `tsc` was content, the unit waves were content, and the SKILL and README still
described a scope rule whose statutory grounding had been deleted out of the code.

**A leading `/** … *\/` block is indistinguishable, to a scope-based purge, from the docstring of
the declaration under it.** That is not a bug in the purge — it is the reason this gate measures the
evidence rather than the symbol.

## Three refusals that keep the number honest

- **A citation that MOVED is not a loss.** `EN-16931` left `payable/index.ts` in the same purge and
  is cited by `payable/discounts` and `payable/workflow` — the evidence is still reachable, which is
  what ISO 19011 §6.4 asks for. Only leaving the surface entirely counts.
- **Two editions of one standard are one standard.** The corpus writes `ISO-19011` 15 times and
  `ISO-19011:2018` 53 times. Comparing them as distinct tokens reports a rewording as a lost
  statute — the noise floor that killed three earlier instruments here.
- **A marker in a string literal is data.** Parsed via [[syntax]]`.commentsOf`, never matched, and
  the identifier must name a standard rather than a word of prose: `banner` and `35` are neither
  numbered nor capitalised. That is [[standards]]/emit's 5,881 → 5,857 correction, restated.

## The filter that could not see the statutes

`namesAStandard` was first written with `[A-Za-z]`. **Every Bulgarian statute this corpus answers to
is Cyrillic** — ЗДДС, ЗПУПС, Наредба Н-18 — so the filter dropped them from *both* sides of the
comparison, and ЗПУПС's disappearance read as perfect balance: 510 standards before, 510 after,
zero losses. The instrument was blind to precisely the surface it was built to protect, and it said
so in green. Only `\p{L}` sees them.

That is [[rules]]/probe's law arriving one atom over: **a filter that selects by name cannot see
what it does not name**, and what it misses is systematically the thing nobody thought to name.

## Honest boundary

This proves a standard is **still cited somewhere**, never that it is cited in the **right** place —
a statute that moves from the module implementing it into an unrelated comment passes. It reads
`.ts`/`.tsx` comments only, so a citation that lives solely in a SKILL or a generated README is
invisible to it (the README under `naredba/n/18/scope` still carried the ЗПУПС banner while the code
did not, which is how a stale generated face hides a real loss). `NAMESPACE_WORDS` is DECLARED in
the open so it can be argued with. And a citation says nothing about whether the code **conforms** —
that is [[proof]]/replaceable's question, and it is a harder one.

Zero is a **theorem**, not a ratchet: measured across two weeks of history the surface loses nothing,
and there is no acceptable number of statutes a refactor may quietly stop citing.

**Law — [[law]]: evidence survives the refactor that moves it. A symbol may be deleted, a file may be
emptied, a barrel may be rebuilt — but a standard the corpus cited before must be cited somewhere
after, or the claim that rested on it is now unsupported and nothing else will say so.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.6** — maintainability: a change must not silently remove what justified it.

Composes: [[rules]]/face · [[rules]]/audience · [[rules]]/probe · [[syntax]] · [[law]].
