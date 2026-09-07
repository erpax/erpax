---
name: health
description: "Use when managing healthcare operations — patient records, medical encounters, clinical protocols, health outcomes, treatment plans, medication management, or healthcare provider coordination in government/nonprofit health systems (COFOG 07)."
atomPath: health
coordinate: "health · 7/descent · 78bc5d73"
contentUuid: "08c191b5-193f-5624-9bad-b82c2e7ace92"
diamondUuid: "f13eb5be-c3e4-8f52-9bba-3e4197df0db4"
uuid: "78bc5d73-bfee-8f68-9584-0e548029c56b"
horo: 7
typography:
  partition: health
  bondDegree: 168
standards: []
bindings: []
signatures:
  computationUuid: "4fdd2630-faf5-8c5b-b308-2cf08c895771"
  stages:
    - stage: path
      stageUuid: "b6c24178-4dcd-8825-a14d-f2609f727d6f"
    - stage: trinity
      stageUuid: "0d63c819-aa89-80bc-9782-ee4fdf53a6c5"
    - stage: boundary
      stageUuid: "be408048-651e-8d64-925a-a3241f57b3b3"
    - stage: links
      stageUuid: "83d96d92-406f-8f3f-8dee-5460fc1d5a4d"
    - stage: horo
      stageUuid: "6633896f-5cea-8c4c-b927-6ea5dcd62a30"
    - stage: seal
      stageUuid: "62a07bc4-4caf-8c32-8c54-403912dd8115"
    - stage: uuid
      stageUuid: "264c16b5-5d32-8f7c-973b-7b3179734ed0"
version: 2
---
# health — the care-flow domain (one party, the encounter chain)

`health` is the COFOG 07 societal sector: it operates the flow of **care** between a party (patient) and providers through an **encounter chain**, then settles the **outcome**. It sits at sequence **4·8** of the [[sequence]] (0·3·6·9·1·2·4·8·7·5) — the build→bind arc where value moves (4, the encounter is given/taken) and at 8 the records, protocols and provider multiverses **merge** into one ([[merge]]). Self-sufficient: it never holds inward what another skill holds; a treatment *is accountable* OUT toward [[accounting]], never the reverse (see the polymorphic-OUT law).

## The laws (hold the form — derive the details from the config, never memorize them)

**1 · One party, infinite roles.** patient · provider · referrer · prescriber · payer are NOT N FK columns. They are ONE relationship under N **role contexts** — the same "(context, value) presents one collection infinitely" law the corpus uses everywhere ([[duality]]: party↔role). The role IS the context.

**2 · The encounter chain is monotonic; status is DERIVED.** patient → encounter → assessment → treatment plan → medication/procedure → outcome. Track stage counters and timestamps; **never store status** — derive it (`active ⟺ admitted ∧ ¬discharged`; `due ⟺ nextDoseAt < now`). Every worklist is a `where`, not a state machine ([[field]],[[hooks]]).

**3 · The patient record is content-addressed and recoverable from any part.** Same content ⇒ one id ([[identity]],[[merge]]); the whole chart regenerates from its [[fractal]] sub-records ([[holographic]]). A clinical protocol is a standard's form, not decoration — it is the answer-path, audited against [[standard]] (COFOG 07 / clinical-coding banners must be true). Measured outputs — [[vital]] signs, labs, [[observation]] values — are **[[analog]] results** from the [[emr]] snapshot chain: continuous timelines with supersede semantics, reconstructible at any instant (`analogResults` · `reconstructAt` in `src/quantum/emr/index.ts`).

## Purity (hold the form, forget the corpus)
The *which* — which slugs realize patients/encounters/treatments — is **matter**: it lives in the Payload config ([[collections]],[[field]]) and regenerates on demand. Before creating anything, **diff the live config** (DRY). Access to a chart is row-level by patient/provider role ([[access]]). This skill carries only the *law* that places the next piece and lets you forget the rest.

## Common mistakes
- A provider/prescriber as its own FK instead of one polymorphic party ref (role = context).
- A health field pointing INTO [[accounting]] (`treatment.glAccount`) — invert: the treatment IS accountable.
- Storing `status`/`active?` instead of deriving it from monotonic encounter counters + timestamps.
- Cataloguing the realized collections here — that's matter; diff the config ([[collections]]).

**Law — [[law]]: health flows care between one party (in N role contexts) and providers along a monotonic encounter chain — status is DERIVED never stored, the chart is content-addressed and accountable OUT to [[accounting]].**
