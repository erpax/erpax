---
name: truth
description: "Use when enforcing that @standard / @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard."
atomPath: "standard/truth"
coordinate: "standard/truth · 7/descent · 4cdc6fd5"
contentUuid: "21ba5a45-574d-5e90-a5f2-226931422b64"
diamondUuid: "abb55614-3910-841a-b47b-2fd09e532934"
uuid: "4cdc6fd5-9054-81f8-8747-9eb5b191be38"
horo: 7
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
  computationUuid: "691ff634-5189-8309-94e5-5d5bbd8bfcce"
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
      stageUuid: "d63e54b6-f38a-83ec-b54d-55792ec2006d"
    - stage: seal
      stageUuid: "0c6ffc6b-4a25-80fa-98ea-65186604200b"
    - stage: uuid
      stageUuid: "92fa05a5-1cb9-8d1b-b338-98f6ac7c3b8f"
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
