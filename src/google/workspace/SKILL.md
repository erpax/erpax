---
name: workspace
description: "Use when fusing Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, People, Admin Directory) into erpax to fill the office/productivity gap — a computed API catalogue plus the content-uuid fusion bridge that merges a fetched resource into the mesh idempotently (re-fetch dedups). Credentials live in the per-tenant config sandbox, never in the registry."
atomPath: "google/workspace"
coordinate: "google/workspace · 2/share · 0c03d3e4"
contentUuid: "037a1441-d5f6-55c2-aa97-36cac703a7b9"
diamondUuid: "be790e1d-2a2b-87b2-acbe-a258cfd150c7"
uuid: "0c03d3e4-730a-8d80-8480-b7d5dd2bbb02"
horo: 2
typography:
  partition: google
  bondDegree: 40
standards:
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "ab22eb63-16ba-84e7-b13e-b2272974293c"
  stages:
    - stage: path
      stageUuid: "6dcd48d9-2c9f-843f-80e2-28174a5bc520"
    - stage: trinity
      stageUuid: "a4dad793-6394-81bf-8158-01e8c18cd94a"
    - stage: boundary
      stageUuid: "3c7756dd-0a67-8b27-ad79-9191f41208d9"
    - stage: links
      stageUuid: "21036d64-d02f-8033-8666-b6ed631aad30"
    - stage: horo
      stageUuid: "df5f3df7-dc12-8f50-8b56-387f7742ec2d"
    - stage: seal
      stageUuid: "637b755a-4f50-8150-b288-8d50ea49275b"
    - stage: uuid
      stageUuid: "163a5e1c-7d32-87d0-8c9c-03640855226f"
version: 2
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

**Law — [[law]]: a fetched Workspace resource is content-addressed and fused by the [[merge]] law — same content ⇒ same uuid ⇒ idempotent upsert; the Google id is the externalRef tag, not the [[identity]], and credentials never enter the registry.**
