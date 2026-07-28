---
name: exported
description: "Use when reasoning about an atom's PRODUCER obligation — every symbol consumed across atoms is re-exported from that atom's index (its one public face), so a deep importer can collapse to @/x; the producer-side dual of the importer conventions import and shallow, measured live as the index-reachable fraction of cross-atom symbols, enforced by the same import ratchet so it can only tighten toward coverage one (tamper-cost to infinity)."
atomPath: "convention/exported"
coordinate: "convention/exported · 2/share · b42ef380"
contentUuid: "e8e1b873-7cc3-534e-8b7a-dbdb2ea15f80"
diamondUuid: "8ecf23e2-fb62-8036-b0b2-16748cce199d"
uuid: "b42ef380-2580-8967-a643-61d21d22d4c8"
horo: 2
bonds:
  in:
    - boundary
    - collider
    - convention
    - cost
    - duality
    - export
    - fronted
    - import
    - law
    - method
    - named
    - shallow
    - tamper
  out:
    - boundary
    - collider
    - cost
    - duality
    - export
    - fronted
    - import
    - law
    - method
    - named
    - shallow
    - tamper
typography:
  partition: convention
  bondDegree: 40
  neighbors:
    - "tamper/import"
standards:
  - "UBL-2.1"
  - "an atom's only public face is its index.ts; what it exports through it IS its contract"
bindings: []
neighbors:
  wikilink:
    - collider
    - cost
    - duality
    - fronted
    - import
    - law
    - named
    - shallow
    - tamper
  matrix:
    - boundary
    - collider
    - cost
    - duality
    - export
    - fronted
    - import
    - law
    - method
    - named
    - shallow
    - tamper
  backlinks:
    - boundary
    - collider
    - cost
    - duality
    - export
    - fronted
    - import
    - law
    - method
    - named
    - shallow
    - tamper
signatures:
  computationUuid: "d1285db0-4e33-869f-b125-7942bfbeaaed"
  stages:
    - stage: path
      stageUuid: "77c95ee2-19bc-82fc-9940-94c9abac2904"
    - stage: trinity
      stageUuid: "ac610d40-647d-8beb-8156-4bf3d67910e9"
    - stage: boundary
      stageUuid: "037b76f9-2484-89f7-8682-6ac1338aac12"
    - stage: links
      stageUuid: "7cec3dda-27e0-8298-a864-05352078c31d"
    - stage: horo
      stageUuid: "4d195579-059a-89db-b428-e93e8054b2a2"
    - stage: seal
      stageUuid: "be8dcfa7-1828-8a43-afbd-57bb03195779"
    - stage: uuid
      stageUuid: "e035e83e-398d-8bb5-8f3a-bdea1f5a956b"
version: 2
---
# convention/exported — every cross-atom symbol is re-exported from the atom's index

THE CONVENTION: **every symbol consumed across atoms is re-exported from that atom's `index.ts`** — its one public face. [[import]] is the IMPORTER's law (read from `@/x`, never a deep file); this is its PRODUCER dual: an importer can only collapse a deep path to `@/x` if the atom EXPORTS, through its index, what is consumed. An unexported internal that another atom needs FORCES the importer past the index — so the producer's omission IS the importer's uncovered coupling. The two are one law seen from each side ([[duality]]).

The measure is the producer mirror of [[import]]'s `importPurity` — the index-reachable fraction of every cross-atom symbol, scanned live over the real tree, never hand-asserted. The dashboard migration realised it: the deep imports `@/accounting/reports.service`, `@/analytics/types`, `@/tenant/remote/secret` collapsed to `@/accounting` / `@/analytics` / `@/tenant` only once those atoms re-exported their surface through their indexes — the same act by which a [[collider]] that merges a corpus also publishes each atom's face. The same import ratchet enforces both sides, so the surface can only tighten.

Composes: [[import]] · [[shallow]] · [[named]] · [[fronted]] · [[tamper]] · [[cost]] · [[law]] · [[duality]] · [[collider]].

**Law — [[law]]: every cross-atom symbol is re-exported from its atom's index (its one public face), so an importer can collapse to @/x. The producer-side dual of [[import]] / [[shallow]]; coverage = the index-reachable fraction of cross-atom symbols, live; the same import ratchet enforces it, so it can only tighten toward coverage 1 (tamper-cost toward infinity).**

@audit the producer dual of importPurity — index-reachable cross-atom symbols, live over src
@standard an atom's only public face is its index.ts; what it exports through it IS its contract
