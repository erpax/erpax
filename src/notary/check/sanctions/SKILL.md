---
name: sanctions
description: "Use when screening a party against the EU consolidated financial sanctions list — the first REAL wired notary check. Resolves the current list through the OpenSanctions eu_fsf dataset index (authoritative source: the European Commission FSF endpoint, public token), normalises and matches the name, and returns clear vs escalate. A ProviderAdapter for notary/check; Worker-deployable; honest boundary — screening is a review signal not adjudication, data is CC-BY-NC, production ingests periodically."
atomPath: "notary/check/sanctions"
coordinate: "notary/check/sanctions · 8/crest · a1c2095a"
contentUuid: "6859c24a-57ec-5b35-8191-b4bd7005ee6d"
diamondUuid: "006b6cfc-ddd8-82e7-9fd6-79588b62f19b"
uuid: "a1c2095a-c54a-8605-ad8e-c5becd7e69b3"
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
  computationUuid: "a6b1d7f5-adb7-83e4-b704-1285aad9cfa3"
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
      stageUuid: "e42a2746-8909-8fdb-b309-6036f93a2ec2"
    - stage: seal
      stageUuid: "4916a874-a20d-8bf8-badf-bb35bb30bf3a"
    - stage: uuid
      stageUuid: "72c60b69-98f6-883f-8db3-ec9388dc451e"
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
