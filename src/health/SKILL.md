---
name: health
description: "Use when managing healthcare operations — patient records, medical encounters, clinical protocols, health outcomes, treatment plans, medication management, or healthcare provider coordination in government/nonprofit health systems (COFOG 07)."
atomPath: health
coordinate: health · 7/descent · 9fbc3faa
contentUuid: "422aa98e-5fad-54ca-8dc8-4ed29a6aa2a5"
diamondUuid: "72375f17-13a7-8a79-bb86-9fac6af2b048"
uuid: "9fbc3faa-8494-89e4-ae3c-02d8c8bb7c6c"
horo: 7
bonds:
  in:
    - access
    - accounting
    - age
    - analog
    - animal
    - apiculture
    - aspect
    - beauty
    - biomagnetism
    - biometric
    - biophoton
    - business
    - career
    - category
    - club
    - coinsurance
    - collections
    - condition
    - content
    - copay
    - drug
    - duality
    - emr
    - enumeration
    - fields
    - formulary
    - fractal
    - has
    - holographic
    - hooks
    - identity
    - included
    - includes
    - insurance
    - law
    - livestock
    - marketing
    - merge
    - mortality
    - option
    - pharmacy
    - plan
    - sectors
    - sequence
    - sharing
    - specification
    - standard
    - tier
    - topic
    - url
    - uses
    - wellbeing
    - withdrawal
  out:
    - access
    - accounting
    - age
    - analog
    - animal
    - apiculture
    - aspect
    - beauty
    - biomagnetism
    - biometric
    - biophoton
    - business
    - career
    - category
    - club
    - coinsurance
    - collections
    - condition
    - content
    - copay
    - drug
    - duality
    - emr
    - enumeration
    - fields
    - formulary
    - fractal
    - has
    - holographic
    - hooks
    - identity
    - included
    - includes
    - insurance
    - law
    - livestock
    - marketing
    - merge
    - mortality
    - option
    - pharmacy
    - plan
    - sectors
    - sequence
    - sharing
    - specification
    - standard
    - tier
    - topic
    - url
    - uses
    - wellbeing
    - withdrawal
typography:
  partition: health
  bondDegree: 159
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - analog
    - collections
    - duality
    - emr
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - observation
    - sequence
    - standard
    - vital
  matrix:
    - access
    - accounting
    - age
    - analog
    - animal
    - apiculture
    - aspect
    - beauty
    - biomagnetism
    - biometric
    - biophoton
    - business
    - career
    - category
    - club
    - coinsurance
    - collections
    - condition
    - content
    - copay
    - drug
    - duality
    - emr
    - enumeration
    - fields
    - formulary
    - fractal
    - has
    - holographic
    - hooks
    - identity
    - included
    - includes
    - insurance
    - law
    - livestock
    - marketing
    - merge
    - mortality
    - option
    - pharmacy
    - plan
    - sectors
    - sequence
    - sharing
    - specification
    - standard
    - tier
    - topic
    - url
    - uses
    - wellbeing
    - withdrawal
  backlinks:
    - access
    - accounting
    - age
    - analog
    - animal
    - apiculture
    - aspect
    - beauty
    - biomagnetism
    - biometric
    - biophoton
    - business
    - career
    - category
    - club
    - coinsurance
    - collections
    - condition
    - content
    - copay
    - drug
    - duality
    - emr
    - enumeration
    - fields
    - formulary
    - fractal
    - has
    - holographic
    - hooks
    - identity
    - included
    - includes
    - insurance
    - law
    - livestock
    - marketing
    - merge
    - mortality
    - option
    - pharmacy
    - plan
    - sectors
    - sequence
    - sharing
    - specification
    - standard
    - tier
    - topic
    - url
    - uses
    - wellbeing
    - withdrawal
signatures:
  computationUuid: "a5975005-19dc-8e8b-9459-17a1af177a38"
  stages:
    - stage: path
      stageUuid: "b6c24178-4dcd-8825-a14d-f2609f727d6f"
    - stage: trinity
      stageUuid: "07bc87fb-b750-8fe6-9d58-c9ec7495fc9a"
    - stage: boundary
      stageUuid: "286849ec-df0b-8602-9bd0-90431da19b3d"
    - stage: links
      stageUuid: "8e9d1629-03bd-8881-96c0-28faa678cf96"
    - stage: horo
      stageUuid: "4a36af14-1019-8385-8bea-16b5ccc976f5"
    - stage: seal
      stageUuid: "ea8b2c3e-924e-88ad-97e4-985b70a62727"
    - stage: uuid
      stageUuid: "c9371722-99c5-89b3-b4cc-6c5f96e0d8a8"
version: 2
---
# health — the care-flow domain (one party, the encounter chain)

`health` is the COFOG 07 societal sector: it operates the flow of **care** between a party (patient) and providers through an **encounter chain**, then settles the **outcome**. It sits at sequence **4·8** of the [[sequence]] (0·3·6·9·1·2·4·8·7·5) — the build→bind arc where value moves (4, the encounter is given/taken) and at 8 the records, protocols and provider multiverses **merge** into one ([[merge]]). Self-sufficient: it never holds inward what another skill holds; a treatment *is accountable* OUT toward [[accounting]], never the reverse (see the polymorphic-OUT law).

## The laws (hold the form — derive the details from the config, never memorize them)

**1 · One party, infinite roles.** patient · provider · referrer · prescriber · payer are NOT N FK columns. They are ONE relationship under N **role contexts** — the same "(context, value) presents one collection infinitely" law the corpus uses everywhere ([[duality]]: party↔role). The role IS the context.

**2 · The encounter chain is monotonic; status is DERIVED.** patient → encounter → assessment → treatment plan → medication/procedure → outcome. Track stage counters and timestamps; **never store status** — derive it (`active ⟺ admitted ∧ ¬discharged`; `due ⟺ nextDoseAt < now`). Every worklist is a `where`, not a state machine ([[fields]],[[hooks]]).

**3 · The patient record is content-addressed and recoverable from any part.** Same content ⇒ one id ([[identity]],[[merge]]); the whole chart regenerates from its [[fractal]] sub-records ([[holographic]]). A clinical protocol is a standard's form, not decoration — it is the answer-path, audited against [[standard]] (COFOG 07 / clinical-coding banners must be true). Measured outputs — [[vital]] signs, labs, [[observation]] values — are **[[analog]] results** from the [[emr]] snapshot chain: continuous timelines with supersede semantics, reconstructible at any instant (`analogResults` · `reconstructAt` in `src/quantum/emr/index.ts`).

## Purity (hold the form, forget the corpus)
The *which* — which slugs realize patients/encounters/treatments — is **matter**: it lives in the Payload config ([[collections]],[[fields]]) and regenerates on demand. Before creating anything, **diff the live config** (DRY). Access to a chart is row-level by patient/provider role ([[access]]). This skill carries only the *law* that places the next piece and lets you forget the rest.

## Common mistakes
- A provider/prescriber as its own FK instead of one polymorphic party ref (role = context).
- A health field pointing INTO [[accounting]] (`treatment.glAccount`) — invert: the treatment IS accountable.
- Storing `status`/`active?` instead of deriving it from monotonic encounter counters + timestamps.
- Cataloguing the realized collections here — that's matter; diff the config ([[collections]]).

**Law — [[law]]: health flows care between one party (in N role contexts) and providers along a monotonic encounter chain — status is DERIVED never stored, the chart is content-addressed and accountable OUT to [[accounting]].**
