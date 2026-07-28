---
name: rosetta
description: "Use when the structural gate is too slow to run every push — the rosetta gate folds the corpus to one root (corpusRoot) and reuses it: unchanged root ⇒ O(1) structural PASS, changed ⇒ verify only the changed atoms; the notary chain is the tamper-evident gate ledger. Fold-first for structure; tsc + tests remain the semantic complement."
atomPath: "gate/rosetta"
coordinate: "gate/rosetta · 7/descent · a934488f"
contentUuid: "fe1430ad-82a0-5175-9197-012e350a6403"
diamondUuid: "f76a0ebf-e7a2-8b00-a11e-559fc483566c"
uuid: "a934488f-2105-8eaa-a30b-d19ade48fd54"
horo: 7
bonds:
  in:
    - accounting
    - algebra
    - decide
    - gate
    - gravity
    - improve
    - law
    - leftover
    - metric
    - publish
    - readme
    - rules
    - syntax
  out:
    - accounting
    - algebra
    - decide
    - gravity
    - improve
    - law
    - leftover
    - metric
    - publish
    - readme
    - rules
    - syntax
typography:
  partition: gate
  bondDegree: 44
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - fold
    - gate
    - globe
    - law
    - merge
    - mortality
    - notary
    - seal
  matrix:
    - accounting
    - algebra
    - decide
    - gravity
    - improve
    - law
    - leftover
    - metric
    - publish
    - readme
    - rules
    - syntax
  backlinks:
    - accounting
    - algebra
    - decide
    - gravity
    - improve
    - law
    - leftover
    - metric
    - publish
    - readme
    - rules
    - syntax
signatures:
  computationUuid: "e658b374-cdde-8dfe-89f1-513284a337c2"
  stages:
    - stage: path
      stageUuid: "399e5292-6d35-8ce2-9254-84097e383654"
    - stage: trinity
      stageUuid: "1f393f7e-eb01-8d43-adf3-01677987a9db"
    - stage: boundary
      stageUuid: "05e66f58-3878-8b21-aa27-0e2d8736a718"
    - stage: links
      stageUuid: "07720a55-5928-85c6-976f-150f822b9c37"
    - stage: horo
      stageUuid: "cd6df66a-5c5b-8987-a5d1-5de312c22536"
    - stage: seal
      stageUuid: "2c0b4f66-77ba-8d52-bc1a-cefcc510eb2d"
    - stage: uuid
      stageUuid: "1852d4d5-b19a-81ed-8119-fb9bbd45805b"
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
