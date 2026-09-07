---
name: workspace
description: "Use when fusing Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, People, Admin Directory) into erpax to fill the office/productivity gap — a computed API catalogue plus the content-uuid fusion bridge that merges a fetched resource into the mesh idempotently (re-fetch dedups). Credentials live in the per-tenant config sandbox, never in the registry."
atomPath: "google/workspace"
coordinate: "google/workspace · 1/base · 8be3e1e9"
contentUuid: "b7849772-6f02-5764-a282-26ce170d6356"
diamondUuid: "1d46581b-80d0-8c79-b464-583d73e59df3"
uuid: "8be3e1e9-108f-81f4-bbf1-67b83f1aac92"
horo: 1
typography:
  partition: google
  bondDegree: 46
standards:
  - "RFC-6749"
  - "UBL-2.1"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "b1947a81-33e1-846a-b727-e6d617308097"
  stages:
    - stage: path
      stageUuid: "6dcd48d9-2c9f-843f-80e2-28174a5bc520"
    - stage: trinity
      stageUuid: "b27f5537-e4e3-8104-89f9-ba9a4c55dcef"
    - stage: boundary
      stageUuid: "e1a5c366-adb2-8382-a1bc-9a722e7491ee"
    - stage: links
      stageUuid: "21036d64-d02f-8033-8666-b6ed631aad30"
    - stage: horo
      stageUuid: "e4e2813e-e215-8a29-af33-9bc707f110f9"
    - stage: seal
      stageUuid: "637b755a-4f50-8150-b288-8d50ea49275b"
    - stage: uuid
      stageUuid: "1b1aed37-5a96-87ca-93b2-1e23e6e35835"
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
