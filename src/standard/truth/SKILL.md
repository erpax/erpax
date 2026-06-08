---
name: truth
description: "Use when enforcing that @standard / @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard."
atomPath: standard/truth
coordinate: standard/truth · 7/descent · 6467bd63
contentUuid: "c40bb10a-2b18-5854-a9d2-21e329c8d081"
diamondUuid: "7fb80954-db7e-8904-b576-1008b8f3466f"
uuid: "6467bd63-b8cf-8c26-a1f7-86f25666fcea"
horo: 7
bonds:
  in:
    - access
    - audit
    - merge
    - proof
    - standard
    - standards
    - tamper
    - wisdom
  out:
    - access
    - audit
    - merge
    - proof
    - standard
    - standards
    - tamper
    - wisdom
typography:
  partition: standard
  bondDegree: 24
  neighbors: []
standards:
  - "/ @audit\""
  - "/ @compliance / @audit"
  - "/ @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard.\""
  - "ISO-19011:2018 6.4.6 audit-evidence (a citation needs evidence)"
  - "ISO-19011:2018 §6.4.6 audit-evidence"
  - banner line.
  - "banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard.\""
  - "the banner law is computed from the live tree, never hand-maintained"
bindings: []
neighbors:
  wikilink:
    - access
    - audit
    - merge
    - proof
    - standard
    - standards
    - tamper
  matrix:
    - access
    - audit
    - merge
    - proof
    - standard
    - standards
    - tamper
    - wisdom
  backlinks:
    - access
    - audit
    - merge
    - proof
    - standard
    - standards
    - tamper
    - wisdom
signatures:
  computationUuid: "0ed712c4-7e4a-845a-b20b-057fa1421cb4"
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
      stageUuid: "77a48f22-211b-8118-89a0-39fa616227c8"
    - stage: seal
      stageUuid: "3e2afdc5-a382-8557-af0b-897e6ecfa462"
    - stage: uuid
      stageUuid: "42466588-8192-802a-be88-7e8f7d532c3a"
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
