---
name: binding
description: "Use when reasoning about binding — Tenant-scoped, RBAC-gated, audit-trailed Cloudflare binding access"
atomPath: "cloudflare/binding"
coordinate: "cloudflare/binding · 2/share · 8d352a8f"
contentUuid: "570c51eb-4803-5e6e-80fd-36a27377bf6b"
diamondUuid: "43282a26-6dee-8c98-a9c1-8952983b66af"
uuid: "8d352a8f-3510-856f-a594-ff162e9597a1"
horo: 2
typography:
  partition: cloudflare
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "91db126e-3e7c-88e5-9a06-2da9ba60d8dc"
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
      stageUuid: "bbf18d4e-b27b-8007-8f0c-918c12867095"
    - stage: seal
      stageUuid: "047bcba8-fb2b-8128-83c6-d21684cd3cbc"
    - stage: uuid
      stageUuid: "392016df-5ea8-8e64-b766-c0a9f5598589"
version: 2
---
# cloudflare/binding — mediator framework

Every binding access must flow through mediator wrappers—never `env.*` directly.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cloudflare]] · [[tenant]] · [[access]].
