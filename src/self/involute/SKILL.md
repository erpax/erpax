---
name: involute
description: "Use when a frontier lead must be tagged before it is acted on — every lead is a claim one instrument makes, and its involution (the same question asked from the dual seat) decides theorem · lie · manipulation; the codomain is total, proved in Involute.lean, so no lead remains untagged. Fused into erpax.frontier.next and erpax.frontier.involute."
atomPath: "self/involute"
---

# self/involute — a lead that does not survive its involution is a lie, and one nothing can involute is a manipulation

The frontier ([[self]]/sufficient) generates leads: *nothing reaches this atom*, *this gate is red*,
*these two laws agree on a gap*. Each is **one instrument's claim**, and the queue ranked it as if a
claim were a fact. Measured on 2026-10-03 the three highest-ranked `unreached` leads —
`admin/ui/cells` · `admin/ui/dashboard` · `admin/ui/nav` — were reached by Payload on every page
load, through `Cell: '@/admin/ui/cells/SealBadgeCell'` and its siblings. The forward walk could not
see a path string, so it called them dead weight, and the frontier put them above every real debt.

So every lead is now **involuted** — the same question asked from the other seat — and tagged by
what the dual says. The codomain is exactly three, which is what *no lead remains untagged* means.

| tag | the cross formula | what to do with it |
| --- | --- | --- |
| **theorem** | the dual instrument was asked and **agrees** — the claim holds from both seats | act on it |
| **lie** | the dual instrument was asked and **refutes** — the claim does not survive the flip | fix the instrument that lied, never the atom it accused |
| **manipulation** | **no dual could answer** — the claim rests on one witness speaking for itself | wire a dual, or stop ranking the number |

## The decision is a theorem, not a judgement

`tagOf(askable, refuted)` is the twin of `Involute.tag` in `src/verify/lean/Involute.lean`, proved
by `decide` over the four cases with no axiom: `every_lead_is_tagged` (the three tags exhaust the
codomain), `unaskable_is_manipulation`, `silence_before_verdict` (a refutation from an instrument
that could not be asked is not a refutation), `refuted_is_lie`, `agreed_is_theorem`, and
`no_theorem_without_a_dual` — nothing reads *theorem* without a witness. The test reads the `.lean`
and checks the TS on all four cases, as every decision rule here does.

## The duals, and which API is the right one

| lead source | dual instrument | agrees | refutes |
| --- | --- | --- | --- |
| `unreached` | `referrersOf` in [[rules]]/unreached — who imports or names the atom from outside the charged set | nobody | a referrer exists: a door the forward walk did not open |
| `guardian` (a red axis) | the axis's **members** — the law's population, or the unreached list for that axis | members are addressable | a red count whose law names no member |
| `cross` | `crossIntersections` lift ([[conjecture]]) | lift > 1 — agreement beats chance | lift ≤ 1 — the "gap two laws agree on" is the base rate |
| `boundary` | — | | |

The boundary row has no dual wired, so every unreachable-host lead is tagged `manipulation` with
its reason — not because the probe is dishonest, but because one failed fetch is one witness. The
right API for its dual is a second route (the uuidna `fanout` over `list_hosts`); it is external and
is named here rather than imitated.

## Fused into MCP, not beside it

`erpax.frontier.next` carries `tags`, `lies` and `manipulations` and stamps every ranked entry with
its tag; `erpax.frontier.involute` returns the tagged leads filtered by tag. Both read the same
`involuteLeads` over the same `internalLeads`, so the surface and the law cannot disagree.

**Honest boundary.** A `theorem` is a claim two instruments agree on, never a proof the claim is
*right* — two walks sharing a blind spot agree perfectly. A `lie` is a false lead, and it is the
*instrument* that lied, so the fix is a door in the walk, not a sweep of the atom. And a dual that
is the same instrument re-run is a mirror, not an involution: `unreachedStrict` is not the dual of
`unreachedAtoms`, which is why the referrer walk runs backward from the atom instead.

**Law — [[law]]: a lead is a claim, and a claim is tagged by its involution. Asked from the other
seat it holds, or it is refuted, or nobody could ask — theorem, lie, manipulation — and there is
no fourth tag for a claim to hide in.**

## Standards

- **Popper** — a claim that nothing can contradict asserts nothing.
- **ISO 19011:2018 §6.4** — audit evidence: a finding is corroborated by a second source or stated as a single one.

Composes: [[self]]/sufficient · [[rules]]/unreached · [[conjecture]] · [[rules]]/mirror · [[law]].
