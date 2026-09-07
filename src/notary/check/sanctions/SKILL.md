---
name: sanctions
description: "Use when screening a party against the EU consolidated financial sanctions list — the first REAL wired notary check. Resolves the current list through the OpenSanctions eu_fsf dataset index (authoritative source: the European Commission FSF endpoint, public token), normalises and matches the name, and returns clear vs escalate. A ProviderAdapter for notary/check; Worker-deployable; honest boundary — screening is a review signal not adjudication, data is CC-BY-NC, production ingests periodically."
atomPath: "notary/check/sanctions"
coordinate: "notary/check/sanctions · 8/crest · 80ffab44"
contentUuid: "cc100194-1687-5002-8a05-3974572554aa"
diamondUuid: "fe65e911-416f-85b3-a935-081cc983c36d"
uuid: "80ffab44-e0d2-81e6-a40b-ba977363213d"
horo: 8
typography:
  partition: notary
  bondDegree: 15
standards:
  - "AMLD5 (EU 2018/843) — sanctions / PEP screening within customer due diligence"
  - EU Consolidated Financial Sanctions List (CFSP) — the authoritative source
  - "EU-2018/843"
bindings: []
signatures:
  computationUuid: "858873da-6f2e-8ed8-931b-0bf2f87fa58d"
  stages:
    - stage: path
      stageUuid: "ba86f636-a147-8238-8cb5-84d0215d0d2a"
    - stage: trinity
      stageUuid: "551b927e-2015-86a0-b15b-bc581341b860"
    - stage: boundary
      stageUuid: "9097b51c-2345-8849-a22d-54ac4860198d"
    - stage: links
      stageUuid: "744c11e4-2244-8acf-9e41-9fc3b92560b5"
    - stage: horo
      stageUuid: "1f68facc-746f-8b2c-bd09-32ca75e70c53"
    - stage: seal
      stageUuid: "4916a874-a20d-8bf8-badf-bb35bb30bf3a"
    - stage: uuid
      stageUuid: "c3e9d78c-009c-8147-8469-ac7b10a76cd8"
version: 2
---
# sanctions — real EU sanctions screening

The first notary check **actually wired to live data**. Before a notary seals, it screens the parties against sanctions/PEP lists (AMLD5 customer due diligence). This atom does it for real:

- **Authoritative source** — the EU Financial Sanctions Files, published by the European Commission (`webgate.ec.europa.eu`) with the *published* public token `token-2017`. Verified live 2026-07-15.
- **Delivery** — OpenSanctions redistributes the same list as a stable, versioned bulk dataset. We resolve the current `names.txt` through the dataset **index** (so we always screen against today's list — verified `version 20260715…`), fetch it, normalise, and match.
- **Matter-twin** — `src/notary/check/sanctions/index.ts`: `fetchSanctionsNames` · `resolveNamesUrl` · `normalize` · `screen` · `sanctionsAdapter` (implements the [[notary]]/check `ProviderAdapter`). The `fetch` is injectable, so the tests are deterministic and never touch the network; the endpoints themselves are verified reachable.

`ok:true` = the subject is **not** on the list (clear). `ok:false` = a name match to **escalate for manual review**. An unreachable list **throws** — a seal is never issued on a fabricated check.

**Honest boundary.**
- **Screening, not adjudication** — a hit is a review signal, never a verdict. v1 matches normalised full names (diacritics/case/punctuation folded); production adds fuzzy/token-set matching and secondary identifiers (birthdate, nationality) to cut false positives.
- **Licence** — OpenSanctions bulk data is **CC-BY-NC**: free for non-commercial use; a business must acquire a data licence, or ingest the EU FSF endpoint directly (no per-record licence).
- **Performance** — production ingests the list periodically into storage and screens against the index; it does not fetch ~1 MB per notarial act (pass a cached `names` list).

**Law — [[law]]: screen before you seal, against the authoritative list, and escalate rather than fabricate. A sanctions hit is a review signal, not a judgment; a seal must never issue over an unscreened or unreachable list.**

## Standards

- **AMLD5 — Directive (EU) 2018/843** — sanctions / PEP screening within customer due diligence.
- **EU Consolidated Financial Sanctions List (CFSP)** — the authoritative source, European Commission.

Composes: [[notary]] · [[merge]] · [[law]] · [[standards]].
