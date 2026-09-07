---
name: qtsp
description: "Use when a notary check needs a qualified electronic signature or a qualified timestamp — the REAL wired eIDAS provider. Resolves the Bulgarian Trusted List from the EU List Of Trusted Lists (LOTL, no country hardcoded), parses the granted qualified services (CA/QC for signature, TSA/QTST for RFC 3161 timestamp), and verifies a named QTSP (BORICA B-Trust / Evrotrust / InfoNotary) holds one. Highest-leverage check: signature+timestamp are on EVERY document type. Honest boundary — verification is public and credential-free; actual issuance needs a QTSP account credential injected at deploy."
atomPath: "notary/check/qtsp"
coordinate: "notary/check/qtsp · 1/base · 22478b66"
contentUuid: "50e10131-fa77-5f4e-a702-6ee51bfb7ac2"
diamondUuid: "c38aa401-e35e-8f6b-8c1d-c85ca986b2bf"
uuid: "22478b66-7cd4-85c8-840b-9dde7dcfee6b"
horo: 1
typography:
  partition: notary
  bondDegree: 9
standards:
  - RFC 3161 — trusted timestamp protocol
  - eIDAS
  - "eIDAS (EU 910/2014) — qualified electronic signature (Art. 25) + qualified timestamp (Art. 42)"
  - "eIDAS Art. 22 — member-state Trusted Lists; ETSI TS 119 612 — TL format"
bindings: []
signatures:
  computationUuid: "1923e40c-8cf1-8fb7-aa93-427516907c7c"
  stages:
    - stage: path
      stageUuid: "ce516877-1f4a-81d2-a1fa-9e2ddffdf186"
    - stage: trinity
      stageUuid: "e478afc5-a859-8043-b41f-38b2d818ea9b"
    - stage: boundary
      stageUuid: "7ee97f31-6145-8fc6-b70c-d72798680e73"
    - stage: links
      stageUuid: "57587cbd-7aa6-80a1-ba2c-939f1df256b3"
    - stage: horo
      stageUuid: "77e0d5d3-7890-8e4a-9550-9aa391fb38c1"
    - stage: seal
      stageUuid: "422ef0c2-d455-8b30-9f20-3baa64087a82"
    - stage: uuid
      stageUuid: "2e9f526c-5212-8a40-aece-b1b56bf9799f"
version: 2
---
# qtsp — real eIDAS qualified-trust verification

The **highest-leverage** notary check wired to live data: every instrument a notary seals carries a **qualified electronic signature** and a **trusted timestamp** (eIDAS Art. 25 / Art. 42). This atom verifies, against the authoritative EU trust scheme, that those qualified services are real and current.

- **Root of trust** — the European Commission **List Of Trusted Lists (LOTL)**, `ec.europa.eu/tools/lotl/eu-lotl.xml`. Verified live 2026-07-15 (HTTP 200, ~476 KB). It points to each member state's Trusted List; we **resolve** the Bulgarian pointer (never hardcode it).
- **National list** — the **Bulgarian Trusted List**, published by the **CRC** (Communications Regulation Commission, the eIDAS supervisory body), `crc.bg/files/_en/TSL_BG.xml`. Verified live (HTTP 200, ~627 KB). We parse the qualified services:
  - `Svctype/CA/QC` → qualified certificate for **signature** (64 `granted` live-verified)
  - `Svctype/TSA/QTST` → qualified **timestamp**, RFC 3161 (17 `granted` live-verified)
  - a service counts only at status `Svcstatus/granted`. Providers seen: **BORICA / B-Trust**, **Evrotrust**, InfoNotary/StampIT.
- **Matter-twin** — `src/notary/check/qtsp/index.ts`: `resolveBgTrustedListUrl` · `parseQualifiedServices` · `fetchQualifiedServices` · `verifyQualified` · `qtspAdapter` (implements the [[notary]]/check `ProviderAdapter`). The `fetch` is injectable, so tests are deterministic and never touch the network; the endpoints themselves are verified reachable.

`ok:true` = a **granted** qualified service of the required type exists (and, if a QTSP name is given, that provider holds it). `ok:false` = no such qualified service. An unreachable trusted list **throws** — a seal is never issued on a fabricated verification.

**Honest boundary.**
- **Verification vs issuance** — this atom **verifies qualified status** (public, credential-free): is this QTSP qualified for signature/timestamp on the eIDAS Trusted List? It does **not** itself mint a signature or a timestamp. Actual issuance (signing a document hash, stamping an RFC 3161 token) requires a **QTSP account credential** — a B-Trust / Evrotrust / InfoNotary API key or certificate — supplied at deploy as injected config (`IssuanceSeam`). No token is fabricated; the credential seam is left open and honest.
- **Performance** — production ingests the LOTL/TL periodically (they change slowly) and verifies against the cached service set; it does not fetch ~1 MB per act (pass a cached `services` list).

**Law — [[law]]: verify qualified status against the authoritative eIDAS Trusted List before you rely on a signature or a timestamp, and mint only through a credentialed QTSP. A granted trusted-list service is proof of qualification, not a fabricated token; a seal must never issue over an unverified or unreachable list.**

## Standards

- **eIDAS — Regulation (EU) No 910/2014** — qualified electronic signature (Art. 25), qualified timestamp (Art. 42), member-state Trusted Lists (Art. 22).
- **ETSI TS 119 612** — Trusted List format and service-type/status semantics.
- **RFC 3161** — trusted timestamp protocol.

Composes: [[notary]] · [[law]] · [[standards]].
