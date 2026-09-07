---
name: binding
description: "Use when reasoning about binding — Tenant-scoped, RBAC-gated, audit-trailed Cloudflare binding access"
atomPath: "cloudflare/binding"
coordinate: "cloudflare/binding · 2/share · dd58a155"
contentUuid: "3441d333-8822-5f68-9d17-6ba03e52094c"
diamondUuid: "078ffbb2-3425-81c4-978e-212da5eb033f"
uuid: "dd58a155-6e4e-8363-9b52-621408a8a8f9"
horo: 2
typography:
  partition: cloudflare
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "cf179e1e-065a-8cf3-80d1-5435947deb10"
  stages:
    - stage: path
      stageUuid: "109130fa-9842-85f6-9269-9ea49ff3d607"
    - stage: trinity
      stageUuid: "6773d147-720c-895b-ad7a-5695d6136c2c"
    - stage: boundary
      stageUuid: "a6de9aa6-bad2-8f7d-ba57-a571c3e402a1"
    - stage: links
      stageUuid: "c0660809-f2b1-870c-8d10-70d6dc45f6bd"
    - stage: horo
      stageUuid: "f57244b8-1973-8627-b08d-6bcc5b3b3d2f"
    - stage: seal
      stageUuid: "047bcba8-fb2b-8128-83c6-d21684cd3cbc"
    - stage: uuid
      stageUuid: "f2dcb948-ab2f-8c99-9e82-a8a561dcbe91"
version: 2
---
# cloudflare/binding — mediator framework

Every binding access must flow through mediator wrappers—never `env.*` directly.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cloudflare]] · [[tenant]] · [[access]].
