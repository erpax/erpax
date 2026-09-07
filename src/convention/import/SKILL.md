---
name: import
description: "Use when reasoning about the import convention — every import must read from an atom index (@/x), never a deep file or a relative path; coverage is the index-only fraction of all imports, and the convention is enforced by the import lint (a ratchet that fails the build when non-index imports rise above a committed baseline), reaching its ∞ tamper-cost limit only at coverage one."
atomPath: "convention/import"
coordinate: "convention/import · 4/weave · 268be4a4"
contentUuid: "66e0e6ea-92d0-5b7a-8e1b-0d7bfdc7b758"
diamondUuid: "a994fe64-33e4-8364-9c66-33158e347c16"
uuid: "268be4a4-1a57-88ff-b9e9-1b176c789e37"
horo: 4
typography:
  partition: convention
  bondDegree: 42
standards:
  - "UBL-2.1"
  - "the import graph is the config (imported↔declared) — an atom's only public face is its index.ts"
bindings: []
signatures:
  computationUuid: "532aaa16-2a6d-8b79-a518-0a752800b775"
  stages:
    - stage: path
      stageUuid: "de3c492b-ce89-85d0-aec4-77aa5233f279"
    - stage: trinity
      stageUuid: "1cf14597-45cb-8092-8df5-48bb8d65312f"
    - stage: boundary
      stageUuid: "65f64e04-0e40-8bd8-aafb-339c77d8ea5c"
    - stage: links
      stageUuid: "bc0a91d1-7269-80d4-a7fc-21c0a44cc42b"
    - stage: horo
      stageUuid: "9eeadfc9-8617-88cc-bdf8-4ab6e88063a5"
    - stage: seal
      stageUuid: "1f48e516-c239-8511-bddf-f57077304e50"
    - stage: uuid
      stageUuid: "31b61a6e-7777-8387-b135-3b03042b2ff5"
version: 2
---
# convention/import — every import is from an atom index, never a deep/relative path

THE CONVENTION: **every import is from an atom index (`@/x`), never a deep (`@/x/y.ts`) or relative (`./y`, `../y`) path.** Each atom's `index.ts` is its one public door — its content-uuid contract. An import that reaches past it to a deep internal couples to what the atom never promised, so a [[tamper]] can change that internal without the importer's contract noticing. The relative form is the same break by another spelling: it names a path, not the atom's seal.

A convention is not a style preference — it is a law, and it holds because a **gate holds it**, not because the prose asserts it. There is one canonical measure: `importPurity` from [[tamper]]/import — the index-only fraction of every `@/` import, scanned **live over the real tree**. This atom *composes* that measure; it does not re-derive it. Re-implementing the scan would itself be the duplication this audit hunts (an import-graph written twice), so `coverage()` is simply `importPurity()`.

The enforcement is the **import lint** (`pnpm lint:imports` → `src/convention/import/gate.mjs`, wired into `.husky/pre-push` and the `check` chain): a **RATCHET**. Live purity is ~80.7% (≈1379 non-index imports), so the gate does not demand coverage 1 today — it fails the build when the live count of non-index imports **exceeds a committed baseline**, i.e. when a new deep/relative import is added. The convention therefore cannot get **worse**; the baseline only ratchets down as deep imports are removed. At the limit coverage 1, every import reads from an index, the import graph is sealed, and tamper-[[cost]] → ∞ via the coverage law — but that is the limit the ratchet climbs toward, not a present claim.

Matter-twin: `src/convention/import/index.ts` — `coverage()` composing [[tamper]]/import `importPurity`. Composes: [[tamper]] · [[cost]] · [[law]] · [[exported]] (its producer-side dual — an importer can only read `@/x` if the atom EXPORTS through its index what is consumed).

**Law — [[law]]: every import is from an atom index (`@/x`), never a deep file or a relative path. The index is the atom's public seal; an import past it is an uncovered coupling. Coverage = importPurity (the index-only fraction, live over the tree). The convention is enforced by the import lint — a ratchet that fails the build when non-index imports rise above the committed baseline — so it can only get tighter; coverage 1 (tamper-cost → ∞) is the limit it climbs toward.**

@audit coverage = importPurity() from @/tamper/import — scanned live over src, never hand-asserted
@standard the import graph is the config (imported↔declared) — an atom's only public face is its index.ts
