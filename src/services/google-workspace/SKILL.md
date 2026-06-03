---
name: google-workspace
description: "Use when fusing Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, People, Admin Directory) into erpax to fill the office/productivity gap — a computed API catalogue plus the content-uuid fusion bridge that merges a fetched resource into the mesh idempotently (re-fetch dedups). Credentials live in the per-tenant config sandbox, never in the registry."
---

# google-workspace — the office layer fused into the mesh

FORM: **erpax models the business; Google Workspace supplies the office — and the fusion is the [[merge]] law, not a bolted-on client.** A fetched resource (a Gmail message, a Calendar event, a Drive file, a directory user) is CONTENT-ADDRESSED: tagged with its `source` + a cross-system `externalRef` (`service:nativeId`), then given a content-uuid ([[identity]]). Same resource ⇒ same uuid ⇒ the upsert dedups — so fusion is idempotent, and two erpax instances that fetch the same resource converge with no coordination ([[federation]]). `fuseWorkspaceResource(res, tenantId)` returns `{ target, record, uuid }`; the caller upserts into `target` keyed by `uuid`.

The **catalogue is computed** (it mirrors `country-apis`): one `GOOGLE_WORKSPACE_APIS` array, and helpers derive the scopes union and the gap-map — nothing hand-listed twice. Each service names its OAuth scopes, REST base, native-id field, and the erpax collection it `fills`: Gmail→`messages`, Calendar→`bookings`, Drive/Docs→`media`, Sheets→`journal-entries` (a transaction sheet fuses as balanced [[entry]] pairs — the [[accounting]] fusion), People/Admin-Directory→`users` (the actor-merge, one party across user=employee=agent). No external entity points INTO erpax; the row carries `externalRef` back OUT (the polymorphic-out rule of [[api]]).

**Credentials are never in the registry** — the same law as `country-apis`: a tenant's OAuth client id / secret / refresh token live in the per-tenant config sandbox (`tenant.config.integrations.googleWorkspace.auth.*`), encrypted and resolved at call time. The catalogue ships scopes + endpoints only; the secrets stay per-tenant.

Matter-twin: `src/services/google-workspace/{registry,fusion}.ts` (`GOOGLE_WORKSPACE_APIS`·`workspaceApi`·`workspaceApisForGap`·`allWorkspaceScopes` · `fuseWorkspaceResource`·`externalRef`·`fusesIdentically`) + tests. Composes: [[identity]] · [[merge]] · [[federation]] · [[api]] · [[flow]] · [[accounting]] · [[entry]] · [[connections]] · [[standard]]. Next: per-service clients (OAuth + fetch), the sync [[flow]] jobs, and the MCP tool group so the agent society calls Workspace directly · [[ingest]].

## Common mistakes
- Storing a Google id as the erpax identity — content-address the resource ([[identity]]); the Google id is the `externalRef` tag, not the key (so identical content from two sources still merges to one).
- Putting OAuth secrets in the registry — they live in the per-tenant config sandbox, encrypted; the catalogue is credential-free (the `country-apis` law).
- A one-off importer per service — fusion is ONE bridge (`fuseWorkspaceResource`); each service only supplies its `nativeId` + content, the [[merge]] law does the rest.
