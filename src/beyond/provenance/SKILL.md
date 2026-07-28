---
name: provenance
description: "Use when a value's history of CAUSE must be recoverable, not just its history of CHANGE — causal provenance (W3C PROV), recording WHY each [[audit]] leaf exists (which upstream leaves caused it) so the full causal ancestry of any number can be walked back."
atomPath: "beyond/provenance"
coordinate: "beyond/provenance · 2/share · 84bbca42"
contentUuid: "356e3146-c979-5e50-8e09-8dbbeb414567"
diamondUuid: "0bd90179-47d1-82e2-8274-cf22983fd5d8"
uuid: "84bbca42-9120-8cbd-9a28-9581f6b932bb"
horo: 2
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
  computationUuid: "a685e833-684c-8593-b668-0ae6acaee2f6"
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
      stageUuid: "49254287-288e-8cfb-be2c-57955efc43bf"
    - stage: seal
      stageUuid: "98cfbd89-3335-8efc-bed9-39d8fb28bb55"
    - stage: uuid
      stageUuid: "777d29df-c8f5-8b6f-a71e-261fa6ab7722"
version: 2
---
# beyond/provenance — causal provenance (the WHY behind every value)

The [[audit]] chain records WHAT changed; `provenance` records WHY — which upstream leaves CAUSED this one. Every value carries a PROV-style causal chain of directed `causedBy` edges, so a regulator can ask not just "when did this change" but "what produced it", and the answer is a recoverable ancestry walked backwards from the leaf. It is the [[cause]] relation made auditable: the causal graph over the [[audit]] leaves, content-addressed through the [[integrity]] uuid.

Matter-twin: src/beyond/provenance/index.ts (`recordCausalLink` · `getCausalAncestry` · `getProvenance` · `provenanceUuid`). A [[beyond]]-horizon primitive layered over the [[audit]] substrate.

**Law — [[law]]: every value's history of [[cause]] is recoverable, not only its history of change — each [[audit]] leaf records which upstream leaves produced it, so the full causal ancestry walks back with no break.**

@standard W3C PROV-DM (Provenance Data Model)
@standard W3C PROV-O (PROV Ontology — RDF)
