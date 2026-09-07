---
name: hooks
description: "Use when adding or debugging Payload lifecycle hooks — mutating data before/after read or change, encryption, side effects, third-party integration, auto-populating fields, or \"my hook didn't run / ran at the wrong time\"."
atomPath: hooks
coordinate: "hooks · 6/6 · 3e57c23a"
contentUuid: "f01f1bc2-5694-5a59-9183-9776c7eeff01"
diamondUuid: "14da32bf-8f2a-8f7f-99e6-086a2f4b247a"
uuid: "3e57c23a-0ee8-8cda-9e0b-49f99079d4cb"
horo: 6
typography:
  partition: hooks
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "63fa5a04-72f0-8843-98c2-e61568420ede"
  stages:
    - stage: path
      stageUuid: "f43cfff2-b630-83f3-b35e-a37d64a3262d"
    - stage: trinity
      stageUuid: "5a3b3d74-f718-8c4c-9807-fb7eebe0647d"
    - stage: boundary
      stageUuid: "f9c1567e-3ecb-836e-b61a-7c355835282d"
    - stage: links
      stageUuid: "552bfb18-9c5b-82c0-baf2-86ba8e34f4f7"
    - stage: horo
      stageUuid: "b4b47efe-fd1e-8b2e-add6-cbae284d97e8"
    - stage: seal
      stageUuid: "93e763fe-898c-8d89-9ae3-818c3b4b8d91"
    - stage: uuid
      stageUuid: "8bc9e3af-dc79-80e5-b3ed-717ee195e4ff"
version: 2
---
# hooks — Payload lifecycle hooks (position 6, the control triad)

Hooks run side effects/mutations at precise points in the document lifecycle. Four types: **root** (`config.hooks`), **collection**, **field**, **global**. Use `Collection*Hook`/`Field*Hook` types from `payload` (v4 prefixes them with `Collection`).

## Collection hooks (order of execution)
| Hook | Runs |
|---|---|
| `beforeOperation` | start of every op |
| `beforeValidate` | before field validation |
| `beforeChange` | after validation, before DB write (mutate `data`, return it) |
| `afterChange` | after DB write (`doc`) |
| `beforeRead` | before a doc is returned |
| `afterRead` | after read, before response (`doc`) |
| `beforeDelete` / `afterDelete` | around delete |
| `afterOperation` | end of op |
| auth: `beforeLogin`/`afterLogin`/`afterLogout`/`afterMe`/`afterForgotPassword` | auth collections |

## Field hooks
`beforeValidate`, `beforeChange`, `afterChange`, `afterRead` — receive `{ value, data, siblingData, req, operation }`; return the (possibly transformed) `value`.

## Root hooks
`config.hooks.afterError` — global error side effects (logging/Sentry); can transform the result/status.

## Rules
- `beforeChange`/field `beforeChange` MUST return `data`/`value` (return value is used).
- Keep hooks lightweight — heavy work belongs in the [[jobs]] queue (see [[optimize]]).
- Encryption/decryption pattern: encrypt in `beforeChange`, decrypt in `afterRead`.
- `req.context` carries data between hooks within one request.

## Hooks are where multiverses connect
`afterChange` hooks that emit domain events (`chainEventEmitters`) are the membrane between universes: an instance writes → the hook fires a content-uuid-keyed event → other subsystems (accounting/audit) AND other erpax instances (federation peers) consume it and reconcile. The emitted event's aggregate identity MUST be the content-`uuid` (the 0 — see [[identity]]), not the instance-local integer `id`, or the connection can't reconcile across instances. Hooks (position 6, the control triad) govern this seam.

## Common mistakes
- Forgetting to return `data`/`value` (mutation lost).
- Wrong v3 type name — use `CollectionBeforeChangeHook` etc. (v4).
- Doing slow/async third-party calls inline instead of via [[jobs]].

**Law — [[trinity]] at runtime.** Hooks enforce the SKILL trinity at the live backend: every mutation and side effect passes through these gates, making them the seam where source code (SKILL.md ⊕ index.ts ⊕ test.ts) meets the document lifecycle. The hook's position—before/after validation, before/after write, before read—is the enforcement point; place the [[self]]-correcting logic here to catch inconsistencies where they matter, turning the trinity from design into runtime guarantee.
