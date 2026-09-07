---
name: user
description: "Use when reasoning about user — scopes what a user can *read* and *update*. What it does not reliably reject is a **create that names another tenant**: the document does not exist yet, so there is no existing…"
atomPath: "enforce/document/tenant/for/user"
coordinate: "enforce/document/tenant/for/user · 1/base · 3519078f"
contentUuid: "9f1b687d-bd58-5f18-8d62-3ccbf4f0653b"
diamondUuid: "36acda54-4f12-8b6e-aac3-fe577ad2386f"
uuid: "3519078f-6910-8900-9476-78aa7c3bb32a"
horo: 1
typography:
  partition: enforce
  bondDegree: 79
standards:
  - "GDPR Art.5(1)(f) integrity-and-confidentiality"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "2779954b-edea-882c-8040-21215756d016"
  stages:
    - stage: path
      stageUuid: "b8de9264-0155-8110-a721-46132180852b"
    - stage: trinity
      stageUuid: "99d5f307-713d-8d79-931f-4fca4f23a54f"
    - stage: boundary
      stageUuid: "fb2e72e5-e28a-8af6-91d3-30a2c72bb1c8"
    - stage: links
      stageUuid: "16eb2414-fc96-8474-a5ff-dec150a60a7d"
    - stage: horo
      stageUuid: "631daf07-c90d-847f-863b-64c5cfe057aa"
    - stage: seal
      stageUuid: "3d7bb540-b2e6-8486-83ca-6afe07251e87"
    - stage: uuid
      stageUuid: "99ddede2-2542-8899-8d99-067f482dcb26"
version: 2
---
# enforce/document/tenant/for/user — the create that the plugin's access rules let through

`@payloadcms/plugin-multi-tenant` scopes what a user can *read* and *update*. What it does not
reliably reject is a **create that names another tenant**: the document does not exist yet, so there
is no existing row whose tenant can be checked, and a request body naming someone else's tenant can
walk straight in.

This `beforeChange` hook closes that door. It compares the document's tenant against the tenants the
authenticated user actually belongs to, and refuses otherwise. Super-admins are unrestricted, because
they are the principal the model already trusts across tenants.

The failure it prevents is the worst shape a multi-tenant system has: not an error, but a **200
carrying a row written into another organisation's data**. Nothing alerts, nothing logs, and the
damage is discovered by the other tenant.

**Honest boundary.** This proves a document cannot be *assigned* to a tenant the user does not belong
to. It is not the whole of tenant isolation — read scoping, field-level access and the query filters
each belong elsewhere ([[rules]]/bypass covers the route-level case). It complements the plugin; it
does not replace it.

**Law — [[law]]: a create is the one operation with no prior row to check, so it is checked against
the actor instead. Trusting a request body's tenant field is trusting the caller to say who they are.**

## Standards

- **ISO/IEC 27001 A.5.23** — cloud-service tenant isolation.
- **ISO/IEC 27002 §5.15 · §8.3** — access control; information access restriction.
- **GDPR Art. 5(1)(f)** — integrity and confidentiality.

Composes: `enforce` · `is/super/admin` · [[rules]]/bypass · [[law]].
