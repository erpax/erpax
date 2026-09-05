# quantum/budget — a byte written into an orientation is billed once per turn, not once

The corpus declares an agent-context ceiling: `MAX_AGENT_SKILL_CONTEXT_BYTES` is **50,000**, and
`trimToByteBudget` enforces it inside `realiseSkillsForPath` — the lazy loader the orientation tells
every agent to use.

Measured against the mean SKILL face, **that ceiling is worth 21 atoms.** The session this atom was
written in was handed **28**, whole, through a door that never passes through the trim. The ceiling
binds one path and not the other, which is this corpus's most repeated defect wearing a new coat: a
gate that can be skipped is prose.

## What the faces actually weigh

| face | corpus total | per atom | in context |
| --- | ---: | ---: | --- |
| `README.md` | 19.4 MB · ~5.09M tok | 5,757 B | **gitignored** — a clean clone pays none of it |
| `SKILL.md` | 8.0 MB · ~2.10M tok | 2,373 B | checked in; this is what an agent is handed |
| `LLM.md` | 5.9 MB · ~1.54M tok | 1,737 B | gitignored |

I first measured 90.6k tokens per turn for those 28 atoms and 45% of it was README — then checked
`.gitignore` and found README and LLM are **not committed**. So that 45% was an artefact of my own
regenerated tree, not a cost a fresh agent pays. The honest figure is the SKILL face alone: **122 KB,
~31k tokens, re-sent every turn** — still 2.4× the declared ceiling.

## The weight is not in the fat files

`standards` is 63.6 KB — 16.3k tokens for one orientation. But the **top 50 SKILLs carry only 8.2%**
of all SKILL bytes. Trimming the heaviest buys almost nothing; the cost is the mean multiplied by how
many atoms get realised.

That is the useful conclusion, and it points at dispatch rather than prose: **the lever is loading
fewer atoms, not writing shorter ones** — which is exactly what the loader already does and exactly
what the injecting path skips.

## Why this is a quantum atom and not an agent one

`FtlMetrics.efficiency` is `answers / tokens` — the machine already claims efficiency per token. Its
`tokens` argument defaults to **0**, so the headline figure is a division by zero reported as
`Infinity`, and it is true of any corpus at all including an empty one. Measuring context cost in a
second place would have been the same law stated twice, which is how a gap stays invisible.

So the denominator lives here, beside the claim it feeds. `efficiencyPerToken` weighs the faces a
turn actually realises and returns a finite number; hand that back as `ftlMetrics({ tokens })` and the
machine reports a quantity instead of a symbol.

**Honest boundary.** This measures bytes on disk and divides by four to reach tokens, which is an
estimate and not a tokeniser. It says what a set of faces WEIGHS; it cannot say which atoms a given
turn will be handed, because that is decided outside this repo. And a smaller face is not a better
one — an orientation trimmed past its meaning costs a re-read, which is the same bill again.

**Law — [[law]]: context is re-sent, so a byte in an orientation is billed once per turn for the life
of the session. Measure what a turn is handed before shortening anything — and if the number is over
the ceiling, the fix is usually fewer atoms rather than thinner prose.**

Composes: [[quantum]] · [[agent]] · [[law]].
