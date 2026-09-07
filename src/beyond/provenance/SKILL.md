---
name: provenance
description: "Use when a value's history of CAUSE must be recoverable, not just its history of CHANGE — causal provenance (W3C PROV), recording WHY each audit leaf exists (which upstream leaves caused it) so the full causal ancestry of any number can be walked back."
atomPath: "beyond/provenance"
coordinate: "beyond/provenance · 2/share · 7e68c469"
contentUuid: "3d9903dc-2a00-5ddb-b2bc-3cd08084ed0f"
diamondUuid: "1a77f71f-2d61-8c67-be31-53733b64b137"
uuid: "7e68c469-c503-8a25-a5f1-27cc37bf6987"
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
  computationUuid: "5d348f5b-60ea-88f7-8b42-37a5598efbcd"
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
      stageUuid: "518070d0-a083-8fa6-ae54-32e49f308573"
    - stage: seal
      stageUuid: "de48b76d-f6bb-8df9-bb22-2971166cee42"
    - stage: uuid
      stageUuid: "b8fd9c7f-c504-8e9b-aa59-29ac51659cc9"
version: 2
---
# beyond/provenance — causal provenance (the WHY behind every value)

The [[audit]] chain records WHAT changed; `provenance` records WHY — which upstream leaves CAUSED this one. Every value carries a PROV-style causal chain of directed `causedBy` edges, so a regulator can ask not just "when did this change" but "what produced it", and the answer is a recoverable ancestry walked backwards from the leaf. It is the [[cause]] relation made auditable: the causal graph over the [[audit]] leaves, content-addressed through the [[integrity]] uuid.

Matter-twin: src/beyond/provenance/index.ts (`recordCausalLink` · `getCausalAncestry` · `getProvenance` · `provenanceUuid`). A [[beyond]]-horizon primitive layered over the [[audit]] substrate.

**Law — [[law]]: every value's history of [[cause]] is recoverable, not only its history of change — each [[audit]] leaf records which upstream leaves produced it, so the full causal ancestry walks back with no break.**

@standard W3C PROV-DM (Provenance Data Model)
@standard W3C PROV-O (PROV Ontology — RDF)
