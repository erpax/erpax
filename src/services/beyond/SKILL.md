---
name: erasure
description: Use when implementing right-to-delete, reversals, or crypto-shredding workflows under GDPR Art. 17 or regulatory-reversal requirements.
---

# erasure — every transition carries its own typed inverse, and the inverse runs out at the system boundary

FORM: **erasure is reversal, not deletion — until the boundary, where only the key dies.** A right-to-erasure request is satisfied by *computing and running the typed inverse of every effect that produced the data*, never by erasing a posted row. The mechanism (`reversibility.ts`) is generic: `inverseOf(effect)` maps each `AgentEffect` to an `InverseEffect` — `create → undo-create`, `update → undo-update` (restoring the captured previous state) — so no collection needs bespoke unwind code. The law that bounds it is which effects *cannot* invert:

- **In-system, state-bearing** (`create`, `update`, `emit`) — reversible iff the undo input exists: `undo-create` needs the created id, `undo-update` needs the captured `previousState`. Miss the input ⇒ `cannot-invert` (a refusal, never a silent half-undo).
- **Append-only audit** (`audit`) — immutable history is never rewound; the inverse is a *tombstone* leaf appended to the chain ([[event]] trail intact, the erased value pointed-to but not excised). This is the [[close]]/seal: the record of erasure is itself permanent.
- **Already past the boundary** (`notify`, `escalate`, `capture`) — emails sent, escalations raised, multimedia captured have **left the system boundary** and are structurally `cannot-invert`. No undo exists for what another party already holds.

The irreversibility threshold is therefore not a policy knob but a typed fact: `isFullyReversible(effects)` is true iff *every* effect inverts. When it is false, the GDPR Art. 17 obligation can only be met by **crypto-shredding** — destroy the key, not the bytes — because the content-uuid identity ([[identity]]) and append-only chain forbid excising rows. Erasure of an un-invertible value collapses to making it unreadable while its tombstone and provenance survive.

The two sides are [[duality]]: the reversible interior (matter — state we own and can restore) versus the boundary-crossed exterior (the effects another party now holds, which no inverse reaches). Same pure/impure split as its siblings: `inverseOf`/`isFullyReversible` are pure (testable); the runner that executes an `InverseEffect` is the impure edge. The check is the [[merge]]/[[identity]] law turned around — because same content ⇒ same id and history is append-only ([[holographic]]: the whole graph survives any part), you reverse by appending, you never delete; the same refusal-to-erase recurs at every scale ([[fractal]]).

This is one of the *beyond* conservation laws (Law 20) and is the erasure-side dual of append-only history: reversal-only is permitted, hard-delete is forbidden, the seal is the tombstone. This skill is the answer-path holding GDPR Art. 17 right-to-erasure and ISO 19011:2018 §6.4.6 audit-evidence forms — see [[standard]] for version pins. It rides on [[hooks]] (an `afterChange`/`afterDelete` hook captures `previousState` so the inverse is *computable later*) and [[access]] (only the data subject or controller may trigger the request).

Sequence position: **8** (crest — the terminal point of an undoable arc; the last node where reversal still runs before the boundary turns it into a one-way seal), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]). Its verification dual is [[duality]]-paired with the audit invariants at **9** — erasure performs the reversal; the audit check ([[event]] trail) proves it was append-only.
