---
name: binding
description: "Use when reasoning about binding — Tenant-scoped, RBAC-gated, audit-trailed Cloudflare binding access"
atomPath: "cloudflare/binding"
coordinate: "cloudflare/binding · 7/descent · 1ae4a364"
contentUuid: "f57755db-e4e1-5908-b113-4687ba352ea9"
diamondUuid: "09f8cf4e-3532-8f47-9475-645626945e91"
uuid: "1ae4a364-fafe-8791-b91d-e4d70ed17b9a"
horo: 7
typography:
  partition: cloudflare
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "8889a074-c81a-8667-9f9c-ca7ad46886a9"
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
      stageUuid: "cd06455d-a35c-8637-98de-3fb2de006cc3"
    - stage: seal
      stageUuid: "047bcba8-fb2b-8128-83c6-d21684cd3cbc"
    - stage: uuid
      stageUuid: "ee42cea2-8b6e-8c42-8f2b-04c00c2d0e43"
version: 2
---
# cloudflare/binding — mediator framework

Every binding access must flow through mediator wrappers—never `env.*` directly.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cloudflare]] · [[tenant]] · [[access]].
