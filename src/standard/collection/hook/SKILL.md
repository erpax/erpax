---
name: hook
description: "Use when reasoning about hook — Every accountable collection needs the same three things: its tenant filled in before validation, its author recorded on change, and its audit entry written after."
atomPath: "standard/collection/hook"
coordinate: "standard/collection/hook · 2/share · 5d59c8ed"
contentUuid: "a7b69ee3-731c-55d6-9aa6-61ae0d604a95"
diamondUuid: "b4a76698-6ace-82ba-9178-1fee75e76384"
uuid: "5d59c8ed-249c-8818-ba0b-d8c53403edba"
horo: 2
typography:
  partition: standard
  bondDegree: 12
standards:
  - "SOX §404 internal-controls provenance"
bindings: []
signatures:
  computationUuid: "eca1784b-3c78-8780-a849-90f990c972b1"
  stages:
    - stage: path
      stageUuid: "90bb1be7-b970-817a-9459-b8bcb8da9698"
    - stage: trinity
      stageUuid: "c91694be-cb4a-82c1-a655-0d1212cf881f"
    - stage: boundary
      stageUuid: "4c775c03-92b0-8bee-a7c4-0a75d3e3db46"
    - stage: links
      stageUuid: "21006af8-a5e9-82fd-81f4-a4ab20189276"
    - stage: horo
      stageUuid: "1a51307a-40d6-8c06-9251-4ea4d0ca80a3"
    - stage: seal
      stageUuid: "530ed1ff-2c8e-8bce-957e-2bea08e586bc"
    - stage: uuid
      stageUuid: "a5545ff2-aa5c-8b71-8f9b-3c01608b67c4"
version: 2
---
# standard/collection/hook — one spine, so no collection can forget a leg of it

Every accountable collection needs the same three things: its tenant filled in before validation, its
author recorded on change, and its audit entry written after. Declared per collection, that is 231
opportunities to omit one — and the omission is silent, because a document without an audit entry
looks exactly like a document with one until somebody goes looking.

So the triple is a **factory**, not a convention. A collection composes extra hooks around the spine
through `opts`, and the audit hook is appended **last** by construction — not by asking authors to
remember, but because it must observe the final state, after every other hook has had its say. A
hook order that a human maintains is a hook order that drifts.

**Honest boundary.** This guarantees the spine is *present and ordered* wherever the factory is used.
It cannot make a collection use the factory — that is [[rules]]' territory, and a hand-rolled
collection bypasses this entirely. It also does not verify the audit chain's own integrity, which
[[audit]] owns.

**Law — [[law]]: a lifecycle every collection shares is defined once and composed, never restated.
Ordering that matters is enforced by construction, because a rule about ordering that lives in prose
is obeyed until the first hurry.**

## Standards

- **ISO 19011:2018** — audit trail.
- **ISO/IEC 27001 A.5.23** — tenant isolation via the tenant field.
- **SOX §404** — internal controls: provenance.

Composes: [[standard]] · [[audit]] · [[law]].
