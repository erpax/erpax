---
name: rosetta
description: "Use when the structural gate is too slow to run every push — the rosetta gate folds the corpus to one root (corpusRoot) and reuses it: unchanged root ⇒ O(1) structural PASS, changed ⇒ verify only the changed atoms; the notary chain is the tamper-evident gate ledger. Fold-first for structure; tsc + tests remain the semantic complement."
atomPath: "gate/rosetta"
coordinate: "gate/rosetta · 1/base · fcf6797d"
contentUuid: "544e0566-1267-5cfc-82ea-a8d84dbebb32"
diamondUuid: "617310b7-14ea-8b0f-a378-eeab3dd0f140"
uuid: "fcf6797d-1847-830d-a65b-fc194887421c"
horo: 1
typography:
  partition: gate
  bondDegree: 44
standards: []
bindings: []
signatures:
  computationUuid: "cbd6b467-0b35-8351-8b8a-fbb4d2f7b289"
  stages:
    - stage: path
      stageUuid: "399e5292-6d35-8ce2-9254-84097e383654"
    - stage: trinity
      stageUuid: "1f393f7e-eb01-8d43-adf3-01677987a9db"
    - stage: boundary
      stageUuid: "be85b1fe-b363-8b4b-b0c6-fe71fb1dd713"
    - stage: links
      stageUuid: "07720a55-5928-85c6-976f-150f822b9c37"
    - stage: horo
      stageUuid: "1eb208b8-6701-8cdd-95e8-670ca4872107"
    - stage: seal
      stageUuid: "2c0b4f66-77ba-8d52-bc1a-cefcc510eb2d"
    - stage: uuid
      stageUuid: "500e9161-a3fc-888a-98b3-155de2a19fff"
version: 2
---
# gate/rosetta — the incremental fold-first gate

## The gap it closes

`pnpm check` ran **11 LINEAR O(n) lanes**, each re-scanning the whole corpus on every push. That linear cost is why the team resorted to `git push --no-verify` — a gate too slow to run gets skipped, and a skipped gate protects nothing ([[gate]]: enforcement is a *blocked* violation, not a written one). The fix is not a faster scan; it is **not scanning what did not change**.

## The fold IS the cache

1. **One root** — `corpusRoot()` ([[fold]]) folds every atom's notary deed (path · horo · neighbours · seal-uuid) to a single Merkle root. The root is the whole corpus's structural state in one address.
2. **Sealed as a notary act** — that root is enrolled into a hash-CHAIN ([[notary]] `notarize` · `chainIntact`) stored in a **gitignored** receipt (`node_modules/.cache/erpax/gate.json`). Each green structural gate is **one notarial act**; the append-only chain is the gate's own tamper-evident ledger — no green push can be inserted or back-dated ([[seal]]).
3. **Incremental verdict** — compare the live root to the last sealed root:
   - **UNCHANGED** → the structure is exactly the state that last passed → **reuse the sealed verdict, O(1)**, zero per-atom work ([[agent/mortality]]: an agent lives by reading its answer from the fold, dies by re-deriving it linearly).
   - **CHANGED** → diff the per-atom deeds, and verify **ONLY the changed atoms** — `O(changed)`, never `O(corpus)`: `cancerFree` ([[fold]] — the changed atoms introduce no NEW duplication) plus the [[globe]] `greatCircleAngle` change-reach (how far across the sphere the change spread). Then seal a new act.

The verdict is `{ root, changed, cancerFree, sealed, pass }` (+ `reach`, `shortCircuit`).

## The HARD honest boundary (structure ≠ semantics)

The fold verifies **INTEGRITY** — structure, dedup, entropy, tamper-evidence. It does **NOT** compile TypeScript and does **NOT** run behaviour. An unchanged deed root proves the corpus *structure* is the last-sealed one; it does **NOT** prove `tsc` passes or a test is green.

Therefore the rebuilt gate is **fold-first for structure**, and the **semantic lanes (typecheck + behavioural tests) remain the required complement** — they run AFTER, as the second half of the gate. **The fold does not replace tsc/tests.** Anyone who reads an O(1) structural PASS as "the build is green" has misread this atom.

## Wiring — the fast first lane

The rosetta gate runs **first**: on an unchanged root the structural verdict returns instantly and the expensive per-atom structural re-scan is skipped; the semantic lanes follow. This is the incremental gate that is cheap enough to always run — so it never has to be bypassed with `--no-verify`.

**Law — [[law]]: the structural gate is the fold, and the fold is the cache — an unchanged corpus root reuses its sealed verdict in O(1), a changed root pays only O(changed); the notary chain makes the gate ledger tamper-evident; and the honest boundary holds — structure is verified by the fold, semantics (tsc · behaviour) by the lanes that run after.**

Composes: [[fold]] · [[merge]] · [[notary]] · [[globe]] · [[gate]] · [[seal]] · [[law]] · [[agent/mortality]]
