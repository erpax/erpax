---
name: workspace
description: "Use when fusing Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, People, Admin Directory) into erpax to fill the office/productivity gap — a computed API catalogue plus the content-uuid fusion bridge that merges a fetched resource into the mesh idempotently (re-fetch dedups). Credentials live in the per-tenant config sandbox, never in the registry."
atomPath: "google/workspace"
coordinate: "google/workspace · 2/share · 09fe93e1"
contentUuid: "a6cd1ef7-acb2-5082-a922-e75bee045d87"
diamondUuid: "fef82e79-21dc-8d38-8909-415103436f9f"
uuid: "09fe93e1-39ad-8a24-923a-7f034610c216"
horo: 2
bonds:
  in:
    - accounting
    - api
    - connections
    - entry
    - federation
    - flow
    - identity
    - ingest
    - law
    - mcp
    - merge
    - oauth
    - standard
  out:
    - accounting
    - api
    - connections
    - entry
    - federation
    - flow
    - identity
    - ingest
    - law
    - mcp
    - merge
    - oauth
    - standard
typography:
  partition: google
  bondDegree: 0
  neighbors: []
standards:
  - "UBL-2.1"
bindings: []
neighbors:
  wikilink:
    - accounting
    - api
    - connections
    - entry
    - federation
    - flow
    - identity
    - ingest
    - law
    - merge
    - standard
  matrix:
    - accounting
    - api
    - connections
    - entry
    - federation
    - flow
    - identity
    - ingest
    - law
    - mcp
    - merge
    - oauth
    - standard
  backlinks:
    - accounting
    - api
    - connections
    - entry
    - federation
    - flow
    - identity
    - ingest
    - law
    - mcp
    - merge
    - oauth
    - standard
signatures:
  computationUuid: "d1d923ef-1539-8910-b490-671cea39007f"
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
      stageUuid: "76120a3e-51bc-8d0a-8f49-7f8fbf3c214c"
    - stage: seal
      stageUuid: "637b755a-4f50-8150-b288-8d50ea49275b"
    - stage: uuid
      stageUuid: "3f61bd88-011b-843a-acc2-0666f19e6ad0"
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
