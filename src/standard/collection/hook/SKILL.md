---
name: hook
description: "Use when reasoning about hook — Every accountable collection needs the same three things: its tenant filled in before validation, its author recorded on change, and its audit entry written after."
atomPath: "standard/collection/hook"
coordinate: "standard/collection/hook · 1/base · f6f2c168"
contentUuid: "117e8171-423d-50ff-8f73-3cd3d696ef25"
diamondUuid: "aa92779a-7336-8de8-85f0-65bae28c7bae"
uuid: "f6f2c168-7408-80d6-beb7-bd79ddca74b9"
horo: 1
typography:
  partition: standard
  bondDegree: 12
standards:
  - "SOX §404 internal-controls provenance"
bindings: []
signatures:
  computationUuid: "7ab8e0ca-8e4f-8541-9a19-a21a3a284759"
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
      stageUuid: "a0738b2b-1d61-8f25-9acc-a219ea2bfe54"
    - stage: seal
      stageUuid: "530ed1ff-2c8e-8bce-957e-2bea08e586bc"
    - stage: uuid
      stageUuid: "df767326-f8a4-8d2e-b459-6448f9d1ea8c"
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
