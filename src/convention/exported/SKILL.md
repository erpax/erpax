---
name: exported
description: "Use when reasoning about an atom's PRODUCER obligation — every symbol consumed across atoms is re-exported from that atom's index (its one public face), so a deep importer can collapse to @/x; the producer-side dual of the importer conventions import and shallow, measured live as the index-reachable fraction of cross-atom symbols, enforced by the same import ratchet so it can only tighten toward coverage one (tamper-cost to infinity)."
atomPath: "convention/exported"
coordinate: "convention/exported · 8/crest · d251dc11"
contentUuid: "2217412c-3636-5fd6-ae50-7eb49791e1cc"
diamondUuid: "42ff51a3-d8de-8344-9f49-c5554f8cede4"
uuid: "d251dc11-43d9-82a3-a72e-f7c6ec116de6"
horo: 8
typography:
  partition: convention
  bondDegree: 40
standards:
  - "UBL-2.1"
  - "an atom's only public face is its index.ts; what it exports through it IS its contract"
bindings: []
signatures:
  computationUuid: "a671241b-8ab7-8c0f-bb30-18cfe7004cc6"
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
      stageUuid: "ed427ff4-d71f-8aa9-9266-9b9fa8c671a1"
    - stage: seal
      stageUuid: "be8dcfa7-1828-8a43-afbd-57bb03195779"
    - stage: uuid
      stageUuid: "bbebdd20-7bba-8d52-b4f7-e8ecca60644f"
version: 2
---
# convention/exported — every cross-atom symbol is re-exported from the atom's index

THE CONVENTION: **every symbol consumed across atoms is re-exported from that atom's `index.ts`** — its one public face. [[import]] is the IMPORTER's law (read from `@/x`, never a deep file); this is its PRODUCER dual: an importer can only collapse a deep path to `@/x` if the atom EXPORTS, through its index, what is consumed. An unexported internal that another atom needs FORCES the importer past the index — so the producer's omission IS the importer's uncovered coupling. The two are one law seen from each side ([[duality]]).

The measure is the producer mirror of [[import]]'s `importPurity` — the index-reachable fraction of every cross-atom symbol, scanned live over the real tree, never hand-asserted. The dashboard migration realised it: the deep imports `@/accounting/reports.service`, `@/analytics/types`, `@/tenant/remote/secret` collapsed to `@/accounting` / `@/analytics` / `@/tenant` only once those atoms re-exported their surface through their indexes — the same act by which a [[collider]] that merges a corpus also publishes each atom's face. The same import ratchet enforces both sides, so the surface can only tighten.

Composes: [[import]] · [[shallow]] · [[named]] · [[fronted]] · [[tamper]] · [[cost]] · [[law]] · [[duality]] · [[collider]].

**Law — [[law]]: every cross-atom symbol is re-exported from its atom's index (its one public face), so an importer can collapse to @/x. The producer-side dual of [[import]] / [[shallow]]; coverage = the index-reachable fraction of cross-atom symbols, live; the same import ratchet enforces it, so it can only tighten toward coverage 1 (tamper-cost toward infinity).**

@audit the producer dual of importPurity — index-reachable cross-atom symbols, live over src
@standard an atom's only public face is its index.ts; what it exports through it IS its contract
