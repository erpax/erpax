---
name: concatenate
description: "Use when building a completely autonomous workflow from command·question·answer atoms — the free monoid of steps, run as command then gate then computed-answer-on-NO until every gate is YES (zero entropy), no human in the loop."
atomPath: "workflow/concatenate"
coordinate: "workflow/concatenate · 7/descent · b3bcc340"
contentUuid: "7e703e14-b1a8-5e2b-a14c-ffe9101fbd59"
diamondUuid: "c64dd1fd-8442-81a2-97fc-e3bd7ba1386f"
uuid: "b3bcc340-00ae-83e6-b2fc-d05bb7106ecd"
horo: 7
typography:
  partition: workflow
  bondDegree: 52
standards:
  - "ISO/IEC 19510:2013 BPMN-2.0 — a free monoid over the workflow step"
  - "ISO/IEC-19510"
bindings: []
signatures:
  computationUuid: "66516f7e-dafa-8164-8afd-cc744d775a60"
  stages:
    - stage: path
      stageUuid: "d5367a3e-ff14-831b-a8e8-89b629ea2592"
    - stage: trinity
      stageUuid: "a5f0af27-278b-895a-9266-aff60b1951ad"
    - stage: boundary
      stageUuid: "880a76ab-f721-8d44-9306-3e1c89046688"
    - stage: links
      stageUuid: "629e3f14-a232-858c-8837-4b8375c96dd5"
    - stage: horo
      stageUuid: "85a8284a-40bd-8644-bd01-23738e043d99"
    - stage: seal
      stageUuid: "049ca325-c4ba-8cec-b081-e199a8c02344"
    - stage: uuid
      stageUuid: "9807acd4-fd4d-87a6-b9db-742981ae8cc1"
version: 2
---
# workflow/concatenate — command·question·answer → autonomous workflows

The **concatenator**: the atoms the society already has — verbs, gates, resolutions — chained into **completely autonomous workflows**. The algebra is a **free monoid** `(C×Q×A)*`.

- A **Step** = `⟨command, question, answer⟩` — three atom NAMES (command · question · answer). A Step holds **no logic**; it is a reference, and the logic lives in the named atoms ([[dry]] by reference). Its identity is a content-uuid = `merge` of the three atom uuids, so the same triple is **one step everywhere** ([[merge]]).
- A **Workflow** = ordered steps. `concatenate` is **associative** with identity **EMPTY**, so chains compose in any grouping — that is the [[sequence]] guarantee (order of departure fixed, grouping free).

## The runner — the breath at step scale, no human

`run(⟨c,q,a⟩, state)`: execute the **command**, ask the **question** (a [[gate]], yes/no over corpus state); on **NO** apply the computed **answer** (the [[self]]-sufficient fix — [[generate]] / [[derive]] / [[decide]] / recover) and **re-ask**; loop until **YES**, then the next step. The answer is *computed*, never asked of a human — that is what makes it autonomous. `runWorkflow` folds `runStep` over the chain in [[sequence]] order; a `maxTries` budget ([[cost]]) guards a gate that never closes.

**Termination & fixed point.** Each question is a monotone gap-measure into ℕ and its answer strictly decreases it, so each step's loop halts. The workflow reaches its fixed point **W\*** when *every* question is YES at once — the four faces of zero entropy: [[aura]] gap = 0 · [[balance]] coverage = 1 · [[vocabulary]] grounded · [[entropy]] = 0. **Zero entropy ⟺ aura-gap-0 ⟺ coverage-1 ⟺ ∞ tamper-cost** (THE MAIN [[law]]). At W\* re-running is a **no-op** (idempotent), and identical steps dedup by content-uuid, so parallel agents converge with no coordination.

The canonical workflows ship as **data** (atom refs only): `grow-to-whole` · `drive-coverage-to-1` · `ground-vocabulary` · `harden-tamper-cost` · `society-build` · `train-to-pay` · `ingest-and-reconcile`. The generic concatenator generalizes the domain workflow registry (`business/chain`); it does not duplicate it.

Matter-twin: `src/workflow/concatenate/index.ts` (`Step` · `Workflow` · `concatenate` · `stepUuid` · `runStep` · `runWorkflow` · `WORKFLOWS` · `unresolvedAtoms`). Composes command · question · answer · step · [[sequence]] · breath · [[society]] · [[gate]] · [[merge]] · [[law]] · [[self]] · [[cost]] · [[spec]].

**Law — [[law]]: a workflow is the free monoid `(C×Q×A)*` over command·question·answer steps run with NO human — execute the command, ask the gate, on NO apply the COMPUTED [[self]]-sufficient answer and re-ask until YES — reaching its idempotent fixed point W* exactly when every gate is YES at once: the four faces of coverage = 1 ⟺ unbounded tamper-cost.**

@standard ISO/IEC 19510:2013 BPMN-2.0 — a free monoid over the workflow step
@audit pure — the algebra + an injected NAME→effect registry; the canonical workflows are gated for groundedness
