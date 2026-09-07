---
name: binding
description: "Use when reasoning about binding — Tenant-scoped, RBAC-gated, audit-trailed Cloudflare binding access"
atomPath: "cloudflare/binding"
coordinate: "cloudflare/binding · 5/round · 4712d9bc"
contentUuid: "1ad8697a-c3c7-5ce0-8226-df8413c8085a"
diamondUuid: "e51eea40-0194-8099-9860-6ff9b2f28d42"
uuid: "4712d9bc-608d-896a-902d-0d7a56610357"
horo: 5
typography:
  partition: cloudflare
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "e3d9acd7-d793-8ab0-94d5-6b4355d7acfc"
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
      stageUuid: "a8390bb0-fa47-821a-99a7-9270bce7cb05"
    - stage: seal
      stageUuid: "047bcba8-fb2b-8128-83c6-d21684cd3cbc"
    - stage: uuid
      stageUuid: "b5e899ac-1ed6-88bd-9ade-373c1ebba290"
version: 2
---
# cloudflare/binding — mediator framework

Every binding access must flow through mediator wrappers—never `env.*` directly.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cloudflare]] · [[tenant]] · [[access]].
