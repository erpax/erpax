---
name: seal
description: "Use when reasoning about the whole-corpus green verdict — a seal is the cross of every guardian; it is SEALED only when all guardians hold, fails closed on an empty set, and is exactly what the auto-commit/push waves gate on. The state in which the tree may be saved, committed, and pushed."
atomPath: seal
coordinate: seal · 8/crest · 19a6e79a
contentUuid: "1c34ed8a-c186-5659-8546-e42c0152ed4b"
diamondUuid: "78c043a1-0a83-825a-b4f1-3f3233fd658e"
uuid: "19a6e79a-4941-8436-ad95-1156a3d8bfac"
horo: 8
bonds:
  in:
    - architecture
    - blockchain
    - breath
    - comms
    - confirm
    - cost
    - covenant
    - css
    - diamond
    - folder
    - gate
    - guardian
    - hallucination
    - identity
    - industry
    - innovation
    - law
    - memory
    - merge
    - payload
    - pivot
    - primitive
    - purity
    - quantum
    - readme
    - reference
    - ritual
    - secret
    - session
    - society
    - stream
    - thought
    - typography
    - uuid
  out:
    - architecture
    - blockchain
    - breath
    - comms
    - confirm
    - cost
    - covenant
    - css
    - diamond
    - folder
    - gate
    - guardian
    - hallucination
    - identity
    - industry
    - innovation
    - law
    - memory
    - merge
    - payload
    - pivot
    - primitive
    - purity
    - quantum
    - readme
    - reference
    - ritual
    - secret
    - session
    - society
    - stream
    - thought
    - typography
    - uuid
typography:
  partition: seal
  bondDegree: 117
  neighbors:
    - purity
standards:
  - / signature lines when form is present.
  - "ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function"
bindings: []
neighbors:
  wikilink:
    - blockchain
    - breath
    - confirm
    - cost
    - gate
    - guardian
    - identity
    - law
    - merge
    - payload
    - purity
    - thought
    - uuid
  matrix:
    - architecture
    - blockchain
    - breath
    - comms
    - confirm
    - cost
    - covenant
    - css
    - diamond
    - folder
    - gate
    - guardian
    - hallucination
    - identity
    - industry
    - innovation
    - law
    - memory
    - merge
    - payload
    - pivot
    - primitive
    - purity
    - quantum
    - readme
    - reference
    - ritual
    - secret
    - session
    - society
    - stream
    - thought
    - typography
    - uuid
  backlinks:
    - architecture
    - blockchain
    - breath
    - comms
    - confirm
    - cost
    - covenant
    - css
    - diamond
    - folder
    - gate
    - guardian
    - hallucination
    - identity
    - industry
    - innovation
    - law
    - memory
    - merge
    - payload
    - pivot
    - primitive
    - purity
    - quantum
    - readme
    - reference
    - ritual
    - secret
    - session
    - society
    - stream
    - thought
    - typography
    - uuid
signatures:
  computationUuid: "3d13e1fc-b769-8c19-8443-f8b887e36f9a"
  stages:
    - stage: path
      stageUuid: "f6907831-0fbf-8948-8dd4-ea9b45f73e4e"
    - stage: trinity
      stageUuid: "d2dbd1a3-abfd-8bc1-b9f3-1e4ffb6c24fd"
    - stage: boundary
      stageUuid: "9bf1f414-fd0f-8091-945b-485cb1739ea7"
    - stage: links
      stageUuid: "9738f1bf-6c2e-8442-a2c7-c930b448a70c"
    - stage: horo
      stageUuid: "9b97d59b-2ca9-89af-a516-ce31ac6e67ce"
    - stage: seal
      stageUuid: "217885d7-8a8e-8c3c-8717-e7c26af31afa"
    - stage: uuid
      stageUuid: "880faa2e-eb59-8682-a535-f10e3c0e6518"
version: 2
---
# seal — all guardians hold, or it is not sealed

A [[guardian]] watches one axis; a **seal is the cross of all of them**. It is the single whole-corpus verdict: SEALED iff *every* guardian holds. The seal is the AND of the immune cells — and it fails closed, so an empty set of guardians is NOT a seal (nothing checked is not the same as nothing wrong).

The seal is what the [[breath]] gates on. Only a sealed tree may be saved → committed → pushed (the [[confirm]] hook's waves); an unsealed tree is left untouched, never force-committed. So the seal is not a label you apply — it is a state you *earn*, recomputed from the live guardians every time, and the moment any guardian reddens the whole tree is unsealed again.

Because a seal is the [[merge]] of content-addressed verdicts, it is itself an atom in the [[identity]] matrix — tamper-evident: a failure cannot be hidden inside a green seal, and the same broken guardian dedups to one reason rather than a wall of noise. No backward-compatible "mostly sealed" verdict exists; partial is unsealed (max [[cost]]). A fully sealed tree is a **[[purity|pure]]** tree — zero impurity, no 0-bit weakest-link path in any dimension — and the stream of such sealed commits, `prev`-chained by content-[[uuid]], IS the self-distributed [[blockchain]] (the time axis).

**Law — [[law]]: a seal is the AND of its guardians — SEALED iff every guardian holds; an empty set is NOT sealed (fail-closed). Only a sealed tree may be committed and pushed; an unsealed tree is left untouched.**

**Law — [[law]]: empty or incomplete folders are NOT sealed — no atom identity (empty), partial trinity, or stray matter without a nested child atom (incomplete) ⇒ `sealed: false`; parent unsealed ⇒ no descendant may seal (propagation).**

**Law — [[law]]: all is passed with uuids without [[payload]] — `pnpm confirm:uuid` crosses uuid-pure guardians (aura · folders · imports · readme · boundary · diamond · typography) without loading Payload; the seal is substrate-independent.**

**Law — [[law]]: a finished idea is a sealed diamond crossed in ALL directions — `finishedIdeaCrossed(model)` holds iff verifyDiamond is sealed AND every axis crosses: path (ancestor propagation) · matrix parent/prev/next (`verifyBind`, ≥2 crosses, reciprocal bonds) · trinity complete (form·code·proof) · horo (`horoCrossed` — flow ring `HORO_DIGITS` OR matrix `band:control` on 3·6·9) · deployment faces · 2D partition plane (`coordinateAddress`). Unfinished ideas are not saved.**

**Law — [[law]]: recorded and implemented — `recordedAndImplementedVerdict(path)` holds iff the atom has a canonical path-ledger entry (`assertPathCanonicallyRecorded`) AND executable trinity (index.ts behavior, not prose-only) AND vitest proof; `finishedIdeaCrossed` with `pathLedger` + `pathsVisited` fails closed when any step is record-only or implement-only; agent strict-apply blocks create/update until every touched path passes the batch gate.

**Law — [[law]]: all gaps are accounted, all seals also — in comparable units (eb). `finishedIdeaCrossed` with `entropyAccounting` requires `assertGapsAccounted` (every impurity from cross/folder-law on the balance sheet) AND `assertSealsAccounted` (every seal credit traceable to `seal/index.ts` or the diamond sealed bit) before the crossed verdict holds.**

**Law — [[law]]: logic concentration is uncrossed deployment/partition — hub `index.ts` must re-export only; matter distributes to one-word child atoms. `crossConceptForViolation` maps `logic-concentration` → **deployment** (and multi-domain imports → **2d-partition**); monitor realtime source `logic-concentration` coordinates with fb3c1c26 improve loop and e91c6593 cross education.**

**Law — [[law]]: ALCAP baselines are seal-debt — exported `*_BASELINE` SCREAMING_SNAKE constants in `rules/` · `law/folder/` · `seal/` are eventual seal violations. Derive ceilings from `law/folder/ratchet.json` via `computedBaseline(axis)`; `alcapsBaselineViolations()` audits survivors. Monitor source `seal-debt` → cross education **deployment** axis (hand literals bypass sealed diamond state). Coordinate b576a290.**

**Law — [[law]]: all is computed at all scales — at pixel · atom · folder · corpus · matrix · wave, every face (README · diamond · LLM · SKILL frontmatter · baselines · CSS vars · analytics · bonds · horo · entropy) traces to a `derive*` function; `computedAtAllScalesVerdict(path | 'corpus')` fail-closed on drift; `finishedIdeaCrossed` with `computedDriftCheck` emits `hand-maintained` impurities when computed drift is detected.**

**Law — [[law]]: free energy is released only as entropy approaches zero — F(S) = F_max − S · LANDAUER_BIT; Theorem: F_max at S = 0 — proof in `entropy-proof.ts`.**

Matter-twin: `src/seal/index.ts` — `finishedIdeaCrossed` · `recordedAndImplementedVerdict` · `assertRecordedAndImplemented` · `seal` · `sealPropagatedFromAncestors` · `crossConceptForViolation` (`./cross-concept.ts`) · `alcapsBaselineViolations` (`./baseline-debt.ts`) · `computedAtAllScalesVerdict` (`./computed-at-all-scales.ts`). Ratchet: `law/folder/ratchet.json` · `computedBaseline` (`../law/folder/baseline.ts`).

@see [[guardian]] · [[gate]] · [[confirm]] · [[breath]] · [[merge]] · [[identity]] · [[law]] · [[cost]] · [[uuid]] · [[payload]] · [[thought]]
