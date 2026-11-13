---
name: provenance
description: "Use when a value's history of CAUSE must be recoverable, not just its history of CHANGE — causal provenance (W3C PROV), recording WHY each audit leaf exists (which upstream leaves caused it) so the full causal ancestry of any number can be walked back."
atomPath: "beyond/provenance"
coordinate: "beyond/provenance · 2/share · c6905d31"
contentUuid: "8f37c4c0-579e-509b-82e5-7981667877d0"
diamondUuid: "2be73bb2-b717-84fd-8716-15b3bee6c4e1"
uuid: "c6905d31-fc8c-8029-8f8c-65dcc63d9e2f"
horo: 2
typography:
  partition: beyond
  bondDegree: 15
standards:
  - "W3C PROV-DM (Provenance Data Model)"
  - "W3C PROV-O (PROV Ontology — RDF)"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "8fc0e9ac-e74d-8c9e-8e04-69abe5d4fb8f"
  stages:
    - stage: path
      stageUuid: "fcff7381-cddc-8e9b-aa4c-a1a1d3219805"
    - stage: trinity
      stageUuid: "55f9c405-0148-8d32-94e2-9594a3551cee"
    - stage: boundary
      stageUuid: "f6a296bb-66bb-8d5e-a843-33d5468f1cfc"
    - stage: links
      stageUuid: "a89cb83d-4ac5-82e0-a8b4-d2147fc7387a"
    - stage: horo
      stageUuid: "2884b5a0-55ad-8cec-b1f4-de86d8449751"
    - stage: seal
      stageUuid: "de48b76d-f6bb-8df9-bb22-2971166cee42"
    - stage: uuid
      stageUuid: "26581b21-9eaa-86fa-8584-7d827443e986"
version: 2
---
# beyond/provenance — causal provenance (the WHY behind every value)

The [[audit]] chain records WHAT changed; `provenance` records WHY — which upstream leaves CAUSED this one. Every value carries a PROV-style causal chain of directed `causedBy` edges, so a regulator can ask not just "when did this change" but "what produced it", and the answer is a recoverable ancestry walked backwards from the leaf. It is the [[cause]] relation made auditable: the causal graph over the [[audit]] leaves, content-addressed through the [[integrity]] uuid.

Matter-twin: src/beyond/provenance/index.ts (`recordCausalLink` · `getCausalAncestry` · `getProvenance` · `provenanceUuid`). A [[beyond]]-horizon primitive layered over the [[audit]] substrate.

**Law — [[law]]: every value's history of [[cause]] is recoverable, not only its history of change — each [[audit]] leaf records which upstream leaves produced it, so the full causal ancestry walks back with no break.**

@standard W3C PROV-DM (Provenance Data Model)
@standard W3C PROV-O (PROV Ontology — RDF)
