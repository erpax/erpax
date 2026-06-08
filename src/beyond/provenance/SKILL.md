---
name: provenance
description: "Use when a value's history of CAUSE must be recoverable, not just its history of CHANGE — causal provenance (W3C PROV), recording WHY each [[audit]] leaf exists (which upstream leaves caused it) so the full causal ancestry of any number can be walked back."
atomPath: beyond/provenance
coordinate: beyond/provenance · 1/base · 5b25112a
contentUuid: "5c6889a1-37a9-512b-9a6f-8e47ecf54bdb"
diamondUuid: "d8ac6cce-19df-86cd-a5aa-b6ec9e80d4d0"
uuid: "5b25112a-1fed-807b-8ac6-e0eb37ec6ae2"
horo: 1
bonds:
  in:
    - audit
    - beyond
    - cause
    - integrity
    - law
  out:
    - audit
    - beyond
    - cause
    - integrity
    - law
typography:
  partition: beyond
  bondDegree: 15
  neighbors: []
standards:
  - "W3C PROV-DM (Provenance Data Model)"
  - "W3C PROV-O (PROV Ontology — RDF)"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - audit
    - beyond
    - cause
    - integrity
    - law
  matrix:
    - audit
    - beyond
    - cause
    - integrity
    - law
  backlinks:
    - audit
    - beyond
    - cause
    - integrity
    - law
signatures:
  computationUuid: "8424bc5c-da2d-83d8-bfcb-f2df25d41ed5"
  stages:
    - stage: path
      stageUuid: "fcff7381-cddc-8e9b-aa4c-a1a1d3219805"
    - stage: trinity
      stageUuid: "55f9c405-0148-8d32-94e2-9594a3551cee"
    - stage: boundary
      stageUuid: "f6a296bb-66bb-8d5e-a843-33d5468f1cfc"
    - stage: links
      stageUuid: "73d039b0-796b-8b9c-be11-fd591853f8bb"
    - stage: horo
      stageUuid: "05557401-9686-8977-9c4e-2ecd9116b399"
    - stage: seal
      stageUuid: "98cfbd89-3335-8efc-bed9-39d8fb28bb55"
    - stage: uuid
      stageUuid: "7f158c44-7ffc-8592-99ea-b84ca13354ed"
version: 2
---
# beyond/provenance — causal provenance (the WHY behind every value)

The [[audit]] chain records WHAT changed; `provenance` records WHY — which upstream leaves CAUSED this one. Every value carries a PROV-style causal chain of directed `causedBy` edges, so a regulator can ask not just "when did this change" but "what produced it", and the answer is a recoverable ancestry walked backwards from the leaf. It is the [[cause]] relation made auditable: the causal graph over the [[audit]] leaves, content-addressed through the [[integrity]] uuid.

Matter-twin: src/beyond/provenance/index.ts (`recordCausalLink` · `getCausalAncestry` · `getProvenance` · `provenanceUuid`). A [[beyond]]-horizon primitive layered over the [[audit]] substrate.

**Law — [[law]]: every value's history of [[cause]] is recoverable, not only its history of change — each [[audit]] leaf records which upstream leaves produced it, so the full causal ancestry walks back with no break.**

@standard W3C PROV-DM (Provenance Data Model)
@standard W3C PROV-O (PROV Ontology — RDF)
