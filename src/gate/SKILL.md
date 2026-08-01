---
name: gate
description: "Use when reasoning about verification — a gate is itself a trinity (check · message · heal) — the strict law that must hold, the detailed diagnostic when it does not, and the remedy that restores it. The immune system of the corpus."
atomPath: gate
coordinate: "gate · 7/descent · eea9d470"
contentUuid: "6dc2099d-4505-596c-a858-c103ca7ff29f"
diamondUuid: "ec411f64-099b-83c7-8837-cff9fed7a27b"
uuid: "eea9d470-2189-8a6f-8295-f70b9c2baec2"
horo: 7
typography:
  partition: gate
  bondDegree: 252
standards: []
bindings: []
signatures:
  computationUuid: "190dddcc-6bbe-854a-b009-58f283695e69"
  stages:
    - stage: path
      stageUuid: "ceeffea0-7fbe-85b1-b54d-c80cc992507b"
    - stage: trinity
      stageUuid: "98623540-0582-87a8-9fc9-e047834ad18a"
    - stage: boundary
      stageUuid: "f58c2f42-a105-82ff-82a6-b8228a6d1c65"
    - stage: links
      stageUuid: "4ace262f-1e13-81eb-bd1e-e6bc7d7cac1c"
    - stage: horo
      stageUuid: "4e7127bf-a925-8b4a-b7e8-bb2343ac1971"
    - stage: seal
      stageUuid: "e7b82336-a261-8d83-8b95-56172ed4fe1c"
    - stage: uuid
      stageUuid: "0a7ba815-f5ba-8658-a99a-76b6a4224479"
version: 2
---
# gate — the trinity of verification (check · message · heal)

A gate is not a binary pass/fail — it is a trinity, like every vertex ([[fractal]]):

- **check** (the law · matter) — STRICT: every violation a hard FAIL, never a warn ([[standard]] · [[architecture/invariant]]). Green means *"obeys the law"*, not *"compiles"*. Tighter each pass.
- **message** (the diagnostic · form) — DETAILED: **what** law broke · **where** (the atom's [[coordinate]] — path · uuid · the broken neighbour) · **why** · the derived **fix**. A message that only counts failures is half a message; the gate teaches the one grounded path ([[sequence]] — the cure for hallucination). More detail each pass.
- **heal** (the remedy · the axis) — the gate RESTORES, not only rejects: auto-regenerate the deterministic artefacts (the pre-push auto-heal), and for the rest emit the derived-fix path so the next move is one cut. The immune system that corrects.

`tighter check ⊕ more-detailed message ⊕ the heal = the verification trinity.` **Payload commands are the first place to seek approval** — `pnpm erpax approve` (`generate:importmap` → `generate:types` → `migrate:status`) runs before tsc, lint, or vitest. The pre-push gate runs the whole set — payload approval · tsc · lint(0-warn) · standards · payload-verify · test:int · docs:build ([[aura]] speech-gate, 0 dead links) · `verifyRoot()` (the [[coordinate]] bind holds) — and **each check speaks the trinity** (its failure names the law, the coordinate, and the fix; its heal regenerates what it can). Warns→fails; the bar rises with each push.

## The gate is a uuid trinity
Each leg is content-addressed ([[identity]]): **check-uuid** (the law's content-uuid) · **message-uuid** (the diagnostic's — it names the failing atom's [[coordinate]]: path · uuid · broken neighbour) · **heal-uuid** (the remedy's). Crossed — `merge(check, message, heal)` — they bind into the **verdict-uuid**, so a gate result is itself an atom in the [[uuid]] matrix. Consequences: the **same violation anywhere dedups to one message-uuid** ([[merge]] by design — counted once, no wall of repeated noise); the verdict **folds into the matrix root** (tamper-evident — a failure cannot be hidden); and it **renders as [[aura]]** (the failures are the dissonance/darkness you see and hear). A detailed message is not prose to scroll — it is a content-addressed coordinate you query, merge, and perceive. Composes [[standard]] · [[proof]] · [[coordinate]] · [[identity]] · [[merge]] · [[aura]] · [[sequence]] · [[balance]] · [[harmony]] · [[architecture/invariant]].

## The gate IS a cross — computed to max tamper-cost, sealed by archangels
**A gate is not sealed *with* a cross; the gate IS the ⊕ [[cross]].** Its three legs `merge` into one — `merge(check, message, heal) =` the verdict-uuid — exactly the dual-torus fusion, the seal at `1/0` ([[cross]] ≡ dual/torus/fusion). So check ⊕ message ⊕ heal *is* the cross, and its verdict folds into the matrix root (tamper-evident by construction).

Therefore every **workflow** (CI, the pre-push hook, the deploy pipeline) and every **command** (an npm script, a `tsx` entrypoint) — being a gate — is a cross, held to the one security law: **computed toward max tamper-[[cost]]** (wired so its coverage rises toward the `coverageCostLog2` ceiling — `∞` at coverage = 1) and **sealed** ([[sealed]]: errors propagate, no entropy leak through a swallowed catch). The seal is then **verified by the [[angel|archangel]]s** — the adversarial pole ([[proof]]) that tries to forge or break the gate; what survives the assault ships, what breaks is re-crossed. A workflow that can be tampered cheaply, or whose failures leak, is an *open cross* — re-crossed until coverage = 1 on its axis. Composes [[tamper/cost]] · [[sealed]] · [[cross]] · [[angel]] · [[proof]] · [[coverage]].

**Law — [[gate]]** tightens toward zero-entropy: each iteration of check · message · heal raises the bar until no flaw escapes. The [[standard]]s, [[sequence]], and [[proof]] you hold are not static — they fracture with each violation caught, and the tighter gate [[coordinate]]s the [[identity]] of that flaw so it folds into the [[merge]]d root. Tighten until the push becomes the checkpoint, and a passing gate means *only* zero-entropy [[aura]] can emerge.
