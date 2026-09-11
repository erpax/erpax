---
name: check
description: "Use when a notary must verify an instrument before sealing it — the per-document-type duty matrix (identity, capacity, title, encumbrance, cadastre, sanctions, tax, spousal consent, company, signature, timestamp, apostille) mapped to the responsible Bulgarian register and the standard it satisfies, with a rosetta coverage audit that surfaces every unwired gap. Provider adapters are contracts; live wiring needs accredited credentials — no endpoint is fabricated, no gap is hidden."
atomPath: "notary/check"
coordinate: "notary/check · 8/crest · 4d6b6dae"
contentUuid: "e40e2c70-9f53-5f13-9fd8-c4ed1b21eac3"
diamondUuid: "8ece8e2d-d2db-8154-9461-a84290436685"
uuid: "4d6b6dae-8c37-8373-82b1-02bb352f6734"
horo: 8
typography:
  partition: notary
  bondDegree: 28
standards:
  - "EU-2018/843"
  - "EU-VAT-Directive"
  - eIDAS
  - "eIDAS (EU 910/2014) · RFC 3161 · AMLD5 (EU 2018/843) · Hague Apostille 1961"
bindings: []
signatures:
  computationUuid: "e751a545-3b7a-8002-b565-687f51108007"
  stages:
    - stage: path
      stageUuid: "c1d0233e-08c5-8fd8-afea-8f2b09d28582"
    - stage: trinity
      stageUuid: "c4335228-a7f8-8f43-a50d-fa0dfed1acd9"
    - stage: boundary
      stageUuid: "8972b9ee-67e9-81d4-ba81-2ef04d2cc6e6"
    - stage: links
      stageUuid: "75dce7cd-2a32-8c8f-95eb-b58109162c8f"
    - stage: horo
      stageUuid: "e030c57f-4860-8ece-a173-b026c1658c79"
    - stage: seal
      stageUuid: "6957cd82-6137-8194-ab8b-308eb3509227"
    - stage: uuid
      stageUuid: "52b3b3d5-0183-8412-83a4-e2e3d35d93bc"
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
