---
name: command
description: Use when classifying or executing the imperative-verb role of an autonomous workflow — the atom a loop runs as a step's command, paired with a question gate and a computed answer; the C-set of corpus verbs.
---

# command — the imperative verb an autonomous workflow executes

The **COMMAND** role of an autonomous [[workflow]]. A [[step]]'s `command` is the atom a loop **executes** — the side-effecting move ([[generate]], [[collapse]], [[merge]], [[migrate]], [[train]], [[relocate]], …). Paired with a [[question]] (the gate it then asks) and an [[answer]] (the computed fix applied on a NO), it concatenates into a completely autonomous workflow ([[concatenate]]).

`COMMANDS` names the **C-set** — the corpus verbs classified into this role. Each entry is a *real atom*: the role is a **reference, never a copy** ([[dry]]). The `CommandAtom{ run }` contract lives with the runner ([[concatenate]]); this atom is the role membership and its classification, gated so every command resolves to a corpus atom.

The three roles are the breath of a step: **command** (the move, inhale) · [[question]] (the gate, exhale) · [[answer]] (the computed resolution on NO). Together they are the autonomous loop — no human, because the answer is computed ([[self]]-sufficiency).

Matter-twin: `src/command/index.ts` (`COMMANDS` · `Command` · `isCommand`). Composes [[concatenate]] · [[question]] · [[answer]] · [[step]] · [[sequence]] · [[society]] · [[self]].

**Law — [[law]]: a command is the imperative side-effecting verb of a [[workflow]] step — a reference to a real corpus atom (never a copy), paired with a [[question]] gate and a computed [[answer]] — gated so every command resolves to an atom.**

@standard schema.org Action — the imperative move (here, the workflow step's verb)
@audit the C-set is gated for groundedness — every command resolves to a corpus atom
