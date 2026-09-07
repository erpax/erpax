---
name: provenance
description: "Use when a value's history of CAUSE must be recoverable, not just its history of CHANGE — causal provenance (W3C PROV), recording WHY each audit leaf exists (which upstream leaves caused it) so the full causal ancestry of any number can be walked back."
atomPath: "beyond/provenance"
coordinate: "beyond/provenance · 1/base · 4f63559f"
contentUuid: "6ef13348-2c01-5ee6-a784-47fe88d0cc43"
diamondUuid: "e187792b-4891-8318-a501-24c4151d53ac"
uuid: "4f63559f-a3bc-8315-821f-84bb3cc79d4b"
horo: 1
typography:
  partition: beyond
  bondDegree: 15
standards:
  - "W3C PROV-DM (Provenance Data Model)"
  - "W3C PROV-O (PROV Ontology — RDF)"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "e15e4a0d-51f7-862f-be33-a921c27a7f23"
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
      stageUuid: "80a52776-c8df-8cdc-91c3-d561a63a775f"
    - stage: seal
      stageUuid: "de48b76d-f6bb-8df9-bb22-2971166cee42"
    - stage: uuid
      stageUuid: "202f7d8b-6093-8f11-a679-dad196c6ef73"
version: 2
---
# beyond/provenance — causal provenance (the WHY behind every value)

The [[audit]] chain records WHAT changed; `provenance` records WHY — which upstream leaves CAUSED this one. Every value carries a PROV-style causal chain of directed `causedBy` edges, so a regulator can ask not just "when did this change" but "what produced it", and the answer is a recoverable ancestry walked backwards from the leaf. It is the [[cause]] relation made auditable: the causal graph over the [[audit]] leaves, content-addressed through the [[integrity]] uuid.

Matter-twin: src/beyond/provenance/index.ts (`recordCausalLink` · `getCausalAncestry` · `getProvenance` · `provenanceUuid`). A [[beyond]]-horizon primitive layered over the [[audit]] substrate.

**Law — [[law]]: every value's history of [[cause]] is recoverable, not only its history of change — each [[audit]] leaf records which upstream leaves produced it, so the full causal ancestry walks back with no break.**

@standard W3C PROV-DM (Provenance Data Model)
@standard W3C PROV-O (PROV Ontology — RDF)
