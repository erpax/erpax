---
name: truth
description: "Use when enforcing that @standard / @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard."
atomPath: "standard/truth"
coordinate: "standard/truth · 2/share · 66717f2a"
contentUuid: "25157b2c-428a-5efb-a024-c00014591495"
diamondUuid: "b129096b-e8ac-8f53-b110-6579e1037ef6"
uuid: "66717f2a-2854-8637-9107-6e9f5e90d8b5"
horo: 2
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
  computationUuid: "8d3b34fd-1a15-871e-811f-9345312887c4"
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
      stageUuid: "a3fe9231-728d-8f25-9bc1-db53fdcbdf54"
    - stage: seal
      stageUuid: "0c6ffc6b-4a25-80fa-98ea-65186604200b"
    - stage: uuid
      stageUuid: "928c52f6-49b5-83fc-8125-5c1e58eaf29f"
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
