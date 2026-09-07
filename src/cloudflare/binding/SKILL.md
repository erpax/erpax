---
name: binding
description: "Use when reasoning about binding — Tenant-scoped, RBAC-gated, audit-trailed Cloudflare binding access"
atomPath: "cloudflare/binding"
coordinate: "cloudflare/binding · 1/base · 94bb499b"
contentUuid: "ad24bda1-fd4a-545f-b4a5-29f0f8eb04ba"
diamondUuid: "367337aa-cdba-850e-b3da-83edbc26253b"
uuid: "94bb499b-9fe5-869c-bdf3-6b94c6a40842"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "08a89f97-2272-8ef5-9d9d-a883962ebca0"
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
      stageUuid: "62dc6392-6720-86a9-a550-4b31a8605efc"
    - stage: seal
      stageUuid: "047bcba8-fb2b-8128-83c6-d21684cd3cbc"
    - stage: uuid
      stageUuid: "25a1b8cd-f4e7-85f5-8464-089be21745dd"
version: 2
---
# cloudflare/binding — mediator framework

Every binding access must flow through mediator wrappers—never `env.*` directly.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cloudflare]] · [[tenant]] · [[access]].
