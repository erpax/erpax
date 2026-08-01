---
name: provenance
description: "Use when a value's history of CAUSE must be recoverable, not just its history of CHANGE — causal provenance (W3C PROV), recording WHY each [[audit]] leaf exists (which upstream leaves caused it) so the full causal ancestry of any number can be walked back."
atomPath: "beyond/provenance"
coordinate: "beyond/provenance · 8/crest · a990eaed"
contentUuid: "6b834908-fa90-57d3-8372-868fa54c3dec"
diamondUuid: "e235b7cc-d9bb-82dd-8a36-66dec77c0aab"
uuid: "a990eaed-f484-89be-9090-58d3f139b623"
horo: 8
typography:
  partition: beyond
  bondDegree: 15
standards:
  - "W3C PROV-DM (Provenance Data Model)"
  - "W3C PROV-O (PROV Ontology — RDF)"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "a0374088-ecd9-81a7-beeb-7b384065c1ae"
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
      stageUuid: "daa7a178-9a8c-897e-8456-ce61b3e7e248"
    - stage: seal
      stageUuid: "98cfbd89-3335-8efc-bed9-39d8fb28bb55"
    - stage: uuid
      stageUuid: "8a4b8327-5079-8ba6-a366-b0bb2cb700c0"
version: 2
---
# beyond/provenance — causal provenance (the WHY behind every value)

The [[audit]] chain records WHAT changed; `provenance` records WHY — which upstream leaves CAUSED this one. Every value carries a PROV-style causal chain of directed `causedBy` edges, so a regulator can ask not just "when did this change" but "what produced it", and the answer is a recoverable ancestry walked backwards from the leaf. It is the [[cause]] relation made auditable: the causal graph over the [[audit]] leaves, content-addressed through the [[integrity]] uuid.

Matter-twin: src/beyond/provenance/index.ts (`recordCausalLink` · `getCausalAncestry` · `getProvenance` · `provenanceUuid`). A [[beyond]]-horizon primitive layered over the [[audit]] substrate.

**Law — [[law]]: every value's history of [[cause]] is recoverable, not only its history of change — each [[audit]] leaf records which upstream leaves produced it, so the full causal ancestry walks back with no break.**

@standard W3C PROV-DM (Provenance Data Model)
@standard W3C PROV-O (PROV Ontology — RDF)
