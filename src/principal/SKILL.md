---
name: principal
description: "Use when code must act without a human — a scoped system identity instead of overrideAccess:true. Payload's Local API defaults to skipping access control, and the corpus does so at 138 sites; a principal makes the check RUN and pass, because the identity is authorised for its subsystem and nothing else. Five declared principals (seed, hook, job, migration, import), none holding admin, each tenant-bound. Reads exactly like a person to the access layer — a principal needing its own code path would be a second door."
atomPath: "principal"
---

# principal — act as someone, never as no one

`overrideAccess: true` appears at **138 sites**. Every one turns the access check off.

The reason is real: an access function reads `req.user`, and a hook, seed, migration or job has none, so the check would deny everything. But *"the check would fail"* and *"the check should not run"* are different claims, and only the first is true.

A **system principal** is the difference. A real, narrowly-scoped identity passed as `req.user`, so the check still runs and simply **passes**:

```
system:seed        roles=user   creates reference data at install; may not delete tenant rows
system:hook        roles=user   extends a write already authorised; may not widen its scope
system:job         roles=user   reads and writes its own artefacts; no interactive authority
system:migration   roles=user   reshapes structure once, under review; not a runtime path
system:import      roles=user   writes data an authenticated human supplied
```

## What changes

| | with a bypass | with a principal |
| --- | --- | --- |
| **accountability** | *"who posted this?"* → `overrideAccess: true` | the principal is on the record |
| **least privilege** | every bypass holds every privilege | `admin` appears in no principal |
| **blast radius** | a wrong query returns **every tenant's rows** | it returns nothing |

`journal/entry` carries **7 bypasses inside double-entry posting** — the ledger writing rows with the check off and no principal named. That is the one that should be uncomfortable.

## What it refuses

**A tenantless principal is refused.** `scopedAccess` returns `{ tenant: { equals: user.tenant } }`; an empty tenant matches nothing or everything depending on coercion, and neither is a policy — it would be a bypass wearing an identity.

**No principal holds `admin`.** A subsystem that needs it is a subsystem whose job is wrong.

**No special code path.** A principal is shaped so `getUserContext` reads it exactly as it reads a person. One that needed its own branch in the checker would *be* the second door.

## Honest boundary

This builds the identity that makes removal possible — **it does not remove anything**. All 138 sites still bypass. They move one subsystem at a time, verified, with the ledger last, because a sweep replaces a known-permissive default with an unknown-restrictive one everywhere at once, and the failures are **silent reads returning nothing** rather than loud errors.

And a principal only proves the check *ran and passed* — never that the capability granted is the right one. The role map is declared by a human and is exactly as good as that judgement.

**Law — [[law]]: act as someone. A system operation runs under a scoped principal so the check runs and passes — never with the check disabled, which grants everything to no one.**

## Standards

- **ISO/IEC 27001 A.5.15** — access control: least privilege.
- **ISO/IEC 27001 A.8.2** — privileged access rights.

Composes: [[auth]] · [[rules]] · [[tenant]] · [[law]].
