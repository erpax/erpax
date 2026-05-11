# Collection Refactoring Guide

> **Retired by Slice HHH (2026-05-10).**
>
> The "before & after" examples in earlier revisions of this guide
> referenced the pre-Slice-CCC `hostId` field, the never-wired
> `req.payload.requestContext.hostId` indirection, and the
> `req.payload.services.X` lookup that was DOA in Slice PP/FFF — all
> of which were excised in the host → tenant unification slice.
>
> The canonical patterns in `src/plugins/accounting/` today are:
>
> - **Multi-tenant field** — use the `multiTenancyField()` factory from
>   `@/plugins/accounting/fields/base-accounting-fields` (creates the
>   `tenant` relationship + `dbName`-capped enum hooks).
> - **Auto-populate tenant** — add `autoPopulateTenant` from
>   `@/hooks/autoPopulateTenant` to the collection's `beforeValidate`
>   chain. This is wired automatically by `collection-factory.ts`.
> - **Tenant-scoped access** — use `scopedAccess()` /
>   `roleScopedAccess()` / `tenantAdmin` / `multiTenantRead` /
>   `adminOrAccountant` from `@/plugins/auth/access` rather than
>   inlining the same `{ tenant: { equals: user.tenant } }` predicate
>   each time.
> - **Period-lock guard** — drop in `validateNotLocked` from
>   `@/plugins/accounting/utilities/period-lock` on any GL-posting
>   collection's `beforeChange` chain.
>
> See `ARCHITECTURE.md` for the live diagram and the up-to-date
> import map.

@audit ISO-19011:2018 audit-trail relocation-record
@see ./ARCHITECTURE.md
@see @/plugins/accounting/factories/collection-factory.ts
