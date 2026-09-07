---
name: truth
description: "Use when enforcing that @standard / @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard."
atomPath: "standard/truth"
coordinate: "standard/truth · 1/base · bb7b442c"
contentUuid: "12dc15b1-304a-52de-bd89-46dfa8897a52"
diamondUuid: "d6b12df6-0800-8ea7-9e21-b7d114c32656"
uuid: "bb7b442c-0fd9-86a1-909c-f876c34892e4"
horo: 1
typography:
  partition: standard
  bondDegree: 24
standards:
  - "/ @audit"
  - "/ @audit\""
  - "/ @compliance / @audit"
  - "/ @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard.\""
  - "ISO-19011:2018 6.4.6 audit-evidence (a citation needs evidence)"
  - "ISO-19011:2018 §6.4.6 audit-evidence"
  - banner line.
  - "banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard.\""
  - "banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard.\\\"\""
bindings: []
signatures:
  computationUuid: "8c02b067-2fd1-87f3-9881-910014018f52"
  stages:
    - stage: path
      stageUuid: "3ffde99c-df01-8b4b-9262-14c8ec9c2d14"
    - stage: trinity
      stageUuid: "fded4f2a-611e-8536-a127-57f78c37fef8"
    - stage: boundary
      stageUuid: "fb6a2cab-e30d-8c6b-9c34-3e2ede598fb9"
    - stage: links
      stageUuid: "984346bd-18e1-8a58-b9ae-ecb929a4d847"
    - stage: horo
      stageUuid: "80fb5835-fb46-8e37-b9d0-a2b1ffdbf588"
    - stage: seal
      stageUuid: "0c6ffc6b-4a25-80fa-98ea-65186604200b"
    - stage: uuid
      stageUuid: "50d98385-1991-86f4-984b-ea4988aa5dff"
version: 2
---
# truth

Banner-truth — the required-witness law for [[standard]] / [[standards]] citations. A banner is a **claim**; under "all computed for infinite tampering cost" a claim with no computed witness is a tamperable lie (decoration).

`index.ts` derives the unwitnessed banners from the live tree, clause-specific:
- **concept** — a banner naming a concrete data concept (e.g. `biometric`) with no matching field / enum (org-posture standards like SOX · GDPR · ISO-27001 are witnessed by [[audit]]/[[access]] infra, not a field — stoplisted).
- **enforcement** — a `MUST` / `immutable` / "driven by `field`" sentence whose cited field never appears inside a `beforeChange` / `beforeValidate` / `access` guard (a bare declaration + `admin.description` is not a witness).

Decoration → 0 drives tamper-cost → ∞ as the self-building matrix adds witnesses ([[proof]] · [[tamper]] · [[merge]]). The gate ratchets and is pinned against the two audit-verified decorations so it cannot regress to noise.

@standard ISO-19011:2018 §6.4.6 audit-evidence
@audit the banner law is computed from the live tree, never hand-maintained
