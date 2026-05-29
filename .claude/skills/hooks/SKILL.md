---
name: hooks
description: Use when adding or debugging Payload lifecycle hooks — mutating data before/after read or change, encryption, side effects, third-party integration, auto-populating fields, or "my hook didn't run / ran at the wrong time".
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
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
