---
name: notary
description: "Use when a fact must be given public faith — recorded in a bound chronological register, timestamped, sealed tamper-evident, and made presumptively authentic. The legal notarial act modelled on erpax primitives: the seal is a content-uuid, the protocol is an append-only hash-chain, authenticity is an inclusion proof; the honest boundary is that real legal force needs a commissioned notary or an eIDAS/RFC-3161 trust service."
atomPath: notary
coordinate: "notary · 1/base · 3490ed6d"
contentUuid: "cf0dd904-46f2-5046-9a7d-d38631f21a6e"
diamondUuid: "906e004a-9d6e-822b-9c0b-4f18e692bb3b"
uuid: "3490ed6d-f1f7-8bf5-9f7a-d8ca80bf3dbd"
horo: 1
typography:
  partition: notary
  bondDegree: 44
standards:
  - "EU-2018/843"
  - "EU-VAT-Directive"
  - "Hague Apostille Convention (1961) — cross-border authentication of public documents"
  - "RFC 3161 — Time-Stamp Protocol (TSP): trusted timestamping, the cryptographic notary"
  - "UINL / Model Notary Act — the notariat and the bound notarial protocol"
  - eIDAS
  - "eIDAS — Regulation (EU) No 910/2014 — qualified electronic signatures, seals, timestamps"
bindings: []
signatures:
  computationUuid: "32d5ec5e-c324-81b4-b786-2a8ffb365d27"
  stages:
    - stage: path
      stageUuid: "e666b797-a70b-81c6-a7cd-a3a6696e39cd"
    - stage: trinity
      stageUuid: "74c7e781-8c4a-8ac8-9abb-79122d7a48cf"
    - stage: boundary
      stageUuid: "1fcfcb2b-fe73-82b2-b276-e4425d7f57f6"
    - stage: links
      stageUuid: "6bf2f23d-d22d-8419-a021-1941f4885440"
    - stage: horo
      stageUuid: "171745f1-9254-8b46-a724-246ce187048c"
    - stage: seal
      stageUuid: "2147bdd1-bd20-8276-a3bb-5800a4a6c36a"
    - stage: uuid
      stageUuid: "9be451ac-9743-8f8c-bd39-628dd445b85f"
version: 2
---
# notary — the notarial act

A notary gives a private instrument **public faith**. Across civil and common law the act is the same four moves: **verify** the parties, **record** the instrument in a bound chronological protocol (numbered, dated, no page insertable), **seal** it so any later alteration shows, and thereby grant it **evidentiary force** — a notarised act is presumed authentic until disproved. This is the oldest tamper-cost instrument civilization has, and erpax already holds every primitive it needs:

| notarial element | erpax primitive |
| --- | --- |
| the notary's seal | the content-[[uuid]] (self-address — same instrument ⇒ same seal) |
| the bound protocol (register) | an append-only hash-**chain** — each act seals the prior act's seal |
| a numbered, dated page | `number` + `at` bound into the seal |
| evidentiary force / authenticity | an inclusion proof against the register root ([[merge]] · [[fold]]) |
| a certified copy | authentic iff it **re-seals** to the registered act |
| the apostille (cross-border) | the register root, verifiable by any instance |

Because the protocol is a chain — each act's seal binds the previous seal — you **cannot insert a back-dated page** or alter a recorded instrument without breaking every seal downstream (`chainIntact` catches it). That is the bound book, enforced by arithmetic instead of red thread.

Matter-twin: `src/notary/index.ts` — `notarize` · `protocolRoot` · `chainIntact` · `authenticate` · `certifiedCopyValid`. It reuses [[merge]]'s fold and inclusion proof — the operation, not re-derived.

**Honest boundary.** This models the **structure** of the notarial act — registration, timestamp, tamper-evidence, the authenticity chain. It does **not** itself confer legal notarisation: that requires a commissioned notary or a qualified trust service (an eIDAS QTSP, an RFC 3161 timestamping authority). erpax is the skeleton such a service fills — the point at which real qualified signatures and timestamps attach. The isomorphism (bound protocol ↔ hash-chain, seal ↔ content-address, authenticity ↔ inclusion proof) is rigorous; the legal force is borrowed, not claimed.

**Law — [[law]]: the notarial act is a seal on a chain. A fact gains public faith when it is recorded in an append-only register (each entry sealing the prior), timestamped, and made provable by inclusion — tamper-evidence by arithmetic. erpax notarises structurally; legal force attaches only through a commissioned notary or a qualified trust service.**

## Standards

- **eIDAS — Regulation (EU) No 910/2014** — qualified electronic signatures, seals, and timestamps; the legal effect of electronic trust services.
- **RFC 3161 — Time-Stamp Protocol (TSP)** — trusted timestamping: the cryptographic notary, a signed assertion that data existed at a time.
- **Hague Apostille Convention (1961)** — cross-border authentication of public documents (the register root as the apostilled anchor).
- **UINL / Model Notary Act** — the notariat and the bound notarial protocol.

Composes: [[merge]] · [[seal]] · [[fold]] · [[accounting]] · [[law]] · [[uuid]].
