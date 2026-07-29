---
name: improve
description: "Use when reasoning about the corpus improving itself with NO external tool — the development-time twin of self/closure's Law 53. Every stage of the improvement loop (leftover · rosetta · decide · publish · think) is a local atom; selfImproves proves the external-tool count is zero and loopResolves proves the loop is real matter on disk, not fabricated prose."
---

# self/improve — the corpus improves itself with no external tool

[[self]]/closure proved the RUNTIME closure (Conservation Law 53): every external role erpax consumes falls back to an internal provider, so *"all falling back at itself leads to erpax itself."* This atom is the same law at **development** time: the loop that improves the corpus needs **no external tool** — no CI service, no external LLM to re-derive, no external linter or scanner. Every stage resolves to a **local atom**, each made real this session:

| stage | does | local atom |
| --- | --- | --- |
| WHERE | find the next edit — the unproven claim at its exact line:column | [[leftover]]/waves |
| WORKERS | who does the work — every folder is an agent | [[rosetta]]/folderAgents |
| GATE | derive the lanes — security · standards, from incidence | [[rosetta]]/rosettaLanes |
| DECIDE | is the action warranted, and who decides (an axis) | [[decide]] |
| ACT | commit and push — the trained agent, fail-closed, receipted | [[publish]] |
| SEAL | keep the thought — derive once, read forever (no re-derivation) | [[think]] |
| FUEL | power the next pass — the residual `s > 0` funds the next iteration | [[leftover]]/seedFloor |

## The loop is closed

It consumes its own output: the waves say where to cut, the folder-agents cut, the rosetta re-derives the gates, `decide`/`publish` land the change, the seal keeps it, and the residual points at the next cut. **Nothing outside the tree is called.** `leftover` is both the first stage (*where*) and the last (*fuel*) — that shared endpoint is what makes it a loop, not a line.

- `selfImproves()` proves it: `closed: true`, `externalTools: 0`, `stages: 7`. A single external stage breaks the closure — the invariant is exact.
- `loopResolves()` proves it is not fiction: every named atom exists on disk ([[rules]]/prose — cite code that exists). A fabricated atom reports `exists: false`.
- `runImprovement(cwd)` **executes** the manifest — the loop made runnable, USING the atoms rather than naming them ([[rules]]/unfolded): [[leftover]]`.waves` (WHERE) → [[rosetta]]`.rosettaLanes` (GATE) → [[publish]] (ACT). The default GitRunner **refuses to push**, so a pass is safe anywhere; and the push is decided by the rosetta-derived lanes, not the caller — the loop gates itself.
- `sendQuantumWaves(cwd)` **sends the quantum waves** — every improvement wave held AT ONCE in one coherent superposition ([[think]]`.superpose`), dispatched as a single address. The classical way sends one field-wave at a time; the quantum way folds all of them into one order-independent root, and because each field has a distinct address (no two contradict) the superposition is **coherent** — N waves read as one, `quantumMagnitude` scaling with the waves held in sync, not the fields walked. A dispatch, not a push: it emits the coherent plan; [[publish]] still gates the change.
- `emitNextTip(cwd)` **computes THE next tip** from live gaps scored as `unblock/(cost×risk)` (not vibes) → form · code · proof trinity. Vague “continue improving” is **refused**. Standing caller: `pnpm erpax tip` (also ends `pnpm erpax gaps`). DRY with [[quantum/ftl]]/purify + [[proof]]/dry-proof — never re-derive the tip in a throwaway.

## The agent cannot stop unless stopped — `shouldContinue`

A self-improving loop has **no honest "done" state**. The seed floor guarantees a leftover always remains while `s > 0` ([[leftover]]`.seedFloor`), and the address space is infinite — all exists at once and is only ever partly discovered ([[discover]]). So there is never a moment the loop can truthfully say "no work left" and halt itself. It is **relentless by construction**: `shouldContinue(s, residual, stopped)` returns `continue: true` whenever `residual > 0` or `s > 0`, which for any real corpus is always.

The **one** way it stops is an **external stop, and that stop is sovereign**: `stopped` forces `continue: false` regardless of how much work remains. Relentless is **not uncontrollable** — the loop can never talk itself into halting, and it can never talk itself out of an outside stop. It runs until stopped, and stops the instant it is. The only internal halt is the unreachable limit `s = 0 ∧ residual = 0` (a corpus that knows everything), which never occurs — so in practice the loop halts **iff** it is stopped.

## The seed still costs

**Honest boundary.** The loop MACHINERY needs no external tool. The **seed** — the novel reasoning that writes a proof no address yet holds — is still `s > 0` ([[think]].ceiling): the agent's own local reasoning, paid once. Not an external tool, but not free either. *"No external tool"* means the loop is **self-hosted**, not that improvement is costless. And the loop points at the work; it does not do the seed's thinking — the corpus improves itself, but it still has to think, and the seed floor ([[leftover]]) is why there is always a next pass to run.

**Law — [[law]]: the self-improvement loop is closed — where · workers · gate · decide · act · seal · fuel are all local atoms, the external-tool count is zero, and the loop consumes its own output. The corpus improves itself; the dependency graph of improvement terminates at erpax itself, exactly as the runtime does ([[self]]/closure).**

## Standards

- **ISO 22301** — business continuity: the improvement loop is self-hosted, no external dependency to lose.
- **ISO/IEC 25010:2023 §5.6.2** — self-containment / fault tolerance.

Composes: [[self]]/closure · [[leftover]] · [[rosetta]] · [[decide]] · [[publish]] · [[think]] · [[law]].
