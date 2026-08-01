---
name: concatenate
description: "Use when building a completely autonomous workflow from command·question·answer atoms — the free monoid of steps, run as command then gate then computed-answer-on-NO until every gate is YES (zero entropy), no human in the loop."
atomPath: "workflow/concatenate"
coordinate: "workflow/concatenate · 1/base · 07a51f62"
contentUuid: "4eb97637-3892-51c6-9690-ba33ed77d265"
diamondUuid: "8be68777-799c-8b0f-8948-238e16207a4f"
uuid: "07a51f62-eefa-8515-910f-f285c8adf70e"
horo: 1
typography:
  partition: workflow
  bondDegree: 74
standards:
  - "ISO/IEC 19510:2013 BPMN-2.0 — a free monoid over the workflow step"
bindings: []
signatures:
  computationUuid: "085acdfd-0fde-8796-b2b9-38a70da5a0dd"
  stages:
    - stage: path
      stageUuid: "d5367a3e-ff14-831b-a8e8-89b629ea2592"
    - stage: trinity
      stageUuid: "a5f0af27-278b-895a-9266-aff60b1951ad"
    - stage: boundary
      stageUuid: "880a76ab-f721-8d44-9306-3e1c89046688"
    - stage: links
      stageUuid: "9b76ec74-712c-8c1e-bc59-3be6bea7ec2b"
    - stage: horo
      stageUuid: "65394577-c516-8a9d-a646-3b2d0ce5e079"
    - stage: seal
      stageUuid: "a8d9c3a9-9627-88ac-bb85-8779c68c821f"
    - stage: uuid
      stageUuid: "72996bb6-2162-8fc6-bac0-b241b219fa27"
version: 2
---
# workflow/concatenate — command·question·answer → autonomous workflows

The **concatenator**: the atoms the society already has — verbs, gates, resolutions — chained into **completely autonomous workflows**. The algebra is a **free monoid** `(C×Q×A)*`.

- A **Step** = `⟨command, question, answer⟩` — three atom NAMES ([[command]] · [[question]] · [[answer]]). A Step holds **no logic**; it is a reference, and the logic lives in the named atoms ([[dry]] by reference). Its identity is a content-uuid = `merge` of the three atom uuids, so the same triple is **one step everywhere** ([[merge]]).
- A **Workflow** = ordered [[step]]s. `concatenate` is **associative** with identity **EMPTY**, so chains compose in any grouping — that is the [[sequence]] guarantee (order of departure fixed, grouping free).

## The runner — the [[breath]] at step scale, no human

`run(⟨c,q,a⟩, state)`: execute the **command**, ask the **question** (a [[gate]], yes/no over corpus state); on **NO** apply the computed **answer** (the [[self]]-sufficient fix — [[generate]] / [[derive]] / [[decide]] / [[recover]]) and **re-ask**; loop until **YES**, then the next step. The answer is *computed*, never asked of a human — that is what makes it autonomous. `runWorkflow` folds `runStep` over the chain in [[sequence]] order; a `maxTries` budget ([[cost]]) guards a gate that never closes.

**Termination & fixed point.** Each question is a monotone gap-measure into ℕ and its answer strictly decreases it, so each step's loop halts. The workflow reaches its fixed point **W\*** when *every* question is YES at once — the four faces of zero entropy: [[aura]] gap = 0 · [[balance]] coverage = 1 · [[vocabulary]] grounded · [[entropy]] = 0. **Zero entropy ⟺ aura-gap-0 ⟺ coverage-1 ⟺ ∞ tamper-cost** (THE MAIN [[law]]). At W\* re-running is a **no-op** (idempotent), and identical steps dedup by content-uuid, so parallel agents converge with no coordination.

The canonical workflows ship as **data** (atom refs only): `grow-to-whole` · `drive-coverage-to-1` · `ground-vocabulary` · `harden-tamper-cost` · `society-build` · `train-to-pay` · `ingest-and-reconcile`. The generic concatenator generalizes the domain workflow registry (`business/chain`); it does not duplicate it.

Matter-twin: `src/workflow/concatenate/index.ts` (`Step` · `Workflow` · `concatenate` · `stepUuid` · `runStep` · `runWorkflow` · `WORKFLOWS` · `unresolvedAtoms`). Composes [[command]] · [[question]] · [[answer]] · [[step]] · [[sequence]] · [[breath]] · [[society]] · [[gate]] · [[merge]] · [[law]] · [[self]] · [[cost]] · [[spec]].

**Law — [[law]]: a workflow is the free monoid `(C×Q×A)*` over command·question·answer steps run with NO human — execute the command, ask the gate, on NO apply the COMPUTED [[self]]-sufficient answer and re-ask until YES — reaching its idempotent fixed point W* exactly when every gate is YES at once: the four faces of zero [[entropy]] ⟺ ∞ tamper-cost.**

@standard ISO/IEC 19510:2013 BPMN-2.0 — a free monoid over the workflow step
@audit pure — the algebra + an injected NAME→effect registry; the canonical workflows are gated for groundedness
