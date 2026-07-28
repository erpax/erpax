---
name: check
description: "Use when a notary must verify an instrument before sealing it — the per-document-type duty matrix (identity, capacity, title, encumbrance, cadastre, sanctions, tax, spousal consent, company, signature, timestamp, apostille) mapped to the responsible Bulgarian register and the standard it satisfies, with a rosetta coverage audit that surfaces every unwired gap. Provider adapters are contracts; live wiring needs accredited credentials — no endpoint is fabricated, no gap is hidden."
atomPath: "notary/check"
coordinate: "notary/check · 8/crest · 04df4a58"
contentUuid: "dd28fb62-b772-500f-aa86-96a61e00e3d9"
diamondUuid: "4e649624-02a7-84fa-81ed-87b390d4ac80"
uuid: "04df4a58-c3fd-833d-b174-bc003257a377"
horo: 8
bonds:
  in:
    - action
    - check
    - law
    - notary
    - out
    - standards
    - uuid
  out:
    - action
    - check
    - law
    - notary
    - out
    - standards
    - uuid
typography:
  partition: notary
  bondDegree: 28
  neighbors: []
standards:
  - "EU-2006/43"
  - "EU-VAT-Directive"
  - eIDAS
  - "eIDAS (EU 910/2014) · RFC 3161 · AMLD5 (EU 2018/843) · Hague Apostille 1961"
bindings: []
neighbors:
  wikilink:
    - check
    - law
    - notary
    - standards
    - uuid
  matrix:
    - action
    - check
    - law
    - notary
    - out
    - standards
    - uuid
  backlinks:
    - action
    - check
    - law
    - notary
    - out
    - standards
    - uuid
signatures:
  computationUuid: "9788b7d7-2d23-8d42-8cbd-9f8f85b8e6ec"
  stages:
    - stage: path
      stageUuid: "c1d0233e-08c5-8fd8-afea-8f2b09d28582"
    - stage: trinity
      stageUuid: "c4335228-a7f8-8f43-a50d-fa0dfed1acd9"
    - stage: boundary
      stageUuid: "2061060a-6314-8d36-8cd6-d6cf0120a0fb"
    - stage: links
      stageUuid: "75dce7cd-2a32-8c8f-95eb-b58109162c8f"
    - stage: horo
      stageUuid: "48d6f8c1-e58d-86c9-9188-4b8aaf44638a"
    - stage: seal
      stageUuid: "6957cd82-6137-8194-ab8b-308eb3509227"
    - stage: uuid
      stageUuid: "b8fc4a53-2c50-85cb-be18-d0fbaf56b99f"
version: 2
---
# check — what a notary verifies, per document

A notary does not only seal — it **checks** first, and different instruments demand different checks. A deed of sale needs title, encumbrances, cadastre, spousal consent and tax; a power of attorney needs none of those. This atom makes that duty computable: the **check → provider → standard** rows (the rosetta), the **per-document requirement matrix**, and a **coverage audit** that enumerates every gap.

## The duty matrix

Each [[check]] is answered by a real Bulgarian institution and satisfies a standard:

| check | provider (register) | standard / basis |
| --- | --- | --- |
| identity · capacity | ГРАО (НБД Население) | AMLD5 CDD · civil capacity |
| representation · spousal consent · apostille | Нотариална камара | POA register · Family Code · Hague 1961 |
| title · encumbrance · company | Агенция по вписванията | Имотен + Търговски регистър |
| cadastre | АГКК / КАИС | Cadastre & Property Register Act |
| tax | НАП | tax clearance |
| signature · timestamp | eIDAS QTSP (B‑Trust / Evrotrust / InfoNotary) | eIDAS 910/2014 · RFC 3161 |
| sanctions | EU/UN/OFAC + PEP | AMLD screening |

Matter-twin: `src/notary/check/index.ts` — `CHECKS` · `REQUIRED` · `coverageAudit` · `providersFor` · `ProviderAdapter` · `unwired`.

## Leave no gap — honestly

`coverageAudit(documentType, wiredProviders)` returns **every** required check whose provider is not yet wired. "Production-grade, no gaps" means the audit reports `complete: true` — reached only when every adapter a document touches is bound to its live, credentialed endpoint. Until then the gaps are **surfaced, not hidden**, and `unwired()` **refuses** rather than fabricate a passing check: a notarial act must never be sealed on a fabricated verification.

**Honest boundary.** The providers are the real institutions responsible for each check, but this atom wires no live endpoint and holds no credential. Live integration requires the deployer's accredited access — several registers demand a **licensed-notary legal basis** — plus a verified endpoint spec per provider. The institution→check mapping is an engineering model to validate against current BG law with a qualified professional; it is **not** legal advice.

**Law — [[law]]: a notary checks before it seals, and the checks differ by instrument. The duty is complete only when every required check is answered by an accredited provider; an unanswered check is a gap that must be surfaced, never fabricated, and a seal must never issue over one.**

## Standards

- **eIDAS — Regulation (EU) No 910/2014** — qualified signatures, seals, timestamps.
- **RFC 3161** — trusted timestamping.
- **AMLD5 — Directive (EU) 2018/843** — customer due diligence, PEP/sanctions screening.
- **Hague Apostille Convention (1961)** — cross-border authentication.

Composes: [[notary]] · [[law]] · [[standards]] · [[uuid]].
