---
name: config
description: "Use when authoring or modifying the root Payload config (payload.config.ts / buildConfig) — wiring db, collections, globals, plugins, editor, secret, cors/csrf, localization, i18n, admin, graphQL, email, typescript output, depth defaults, or custom endpoints."
atomPath: config
coordinate: config · 6/6 · 0f5bc7f7
contentUuid: "21d07feb-9d8c-5fbb-85e7-cc4c9b644b66"
diamondUuid: "8ed88c73-9f8b-844b-b51d-64f88fed9868"
uuid: "0f5bc7f7-7b2d-82b7-a177-7a7d67321252"
horo: 6
bonds:
  in:
    - access
    - akashic
    - atom
    - aura
    - auth
    - axis
    - begin
    - binding
    - bindings
    - chat
    - cmyk
    - collections
    - components
    - database
    - deploy
    - duality
    - ecommerce
    - endpoints
    - examples
    - gate
    - harden
    - holographic
    - horo
    - identity
    - law
    - lexical
    - localize
    - merge
    - metadata
    - name
    - optimize
    - payload
    - plugins
    - port
    - recover
    - redirects
    - rodin
    - secret
    - self
    - sequence
    - skills
    - society
    - standard
    - testing
    - torus
    - types
    - upload
    - users
    - utilities
    - uuid
    - vitepress
    - whole
  out:
    - access
    - akashic
    - atom
    - aura
    - auth
    - axis
    - begin
    - binding
    - bindings
    - chat
    - cmyk
    - collections
    - components
    - database
    - deploy
    - duality
    - ecommerce
    - endpoints
    - examples
    - gate
    - harden
    - holographic
    - horo
    - identity
    - law
    - lexical
    - localize
    - merge
    - metadata
    - name
    - optimize
    - payload
    - plugins
    - port
    - recover
    - redirects
    - rodin
    - secret
    - self
    - sequence
    - skills
    - society
    - standard
    - testing
    - torus
    - types
    - upload
    - users
    - utilities
    - uuid
    - vitepress
    - whole
typography:
  partition: config
  bondDegree: 0
  neighbors: []
standards:
  - "BCP-47"
  - "Berlin-Group-PSD2"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-2002/58"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-Taxonomy-2020/852"
  - "IFRS-9"
  - "ISO-13616-1"
  - "ISO-17442-1"
  - "ISO-19160-4"
  - "ISO-20022"
  - "ISO-3166-1"
  - "ISO-3166-2"
  - "ISO/IEC-29119"
  - "SWIFT-MT"
  - "UPU-S42"
bindings: []
neighbors:
  wikilink:
    - aura
    - collections
    - database
    - duality
    - gate
    - harden
    - identity
    - law
    - merge
    - name
    - optimize
    - payload
    - redirects
    - self
    - standard
    - types
    - uuid
    - vitepress
  matrix:
    - access
    - akashic
    - atom
    - aura
    - auth
    - axis
    - begin
    - binding
    - bindings
    - chat
    - cmyk
    - collections
    - components
    - database
    - deploy
    - duality
    - ecommerce
    - endpoints
    - examples
    - gate
    - harden
    - holographic
    - horo
    - identity
    - law
    - lexical
    - localize
    - merge
    - metadata
    - name
    - optimize
    - payload
    - plugins
    - port
    - recover
    - redirects
    - rodin
    - secret
    - self
    - sequence
    - skills
    - society
    - standard
    - testing
    - torus
    - types
    - upload
    - users
    - utilities
    - uuid
    - vitepress
    - whole
  backlinks:
    - access
    - akashic
    - atom
    - aura
    - auth
    - axis
    - begin
    - binding
    - bindings
    - chat
    - cmyk
    - collections
    - components
    - database
    - deploy
    - duality
    - ecommerce
    - endpoints
    - examples
    - gate
    - harden
    - holographic
    - horo
    - identity
    - law
    - lexical
    - localize
    - merge
    - metadata
    - name
    - optimize
    - payload
    - plugins
    - port
    - recover
    - redirects
    - rodin
    - secret
    - self
    - sequence
    - skills
    - society
    - standard
    - testing
    - torus
    - types
    - upload
    - users
    - utilities
    - uuid
    - vitepress
    - whole
signatures:
  computationUuid: "50f0a9fa-460f-8857-bea1-fb310b806f3d"
  stages:
    - stage: path
      stageUuid: "3ea2c96b-64d2-8e0c-b61e-db0ac10ea1f1"
    - stage: trinity
      stageUuid: "1805fadb-3e2b-880c-a863-d6d6bb170f6a"
    - stage: boundary
      stageUuid: "176b0d5a-ccca-80a0-8f22-59e035deb757"
    - stage: links
      stageUuid: "6936ccc4-f826-8824-8772-a6ad7df4491f"
    - stage: horo
      stageUuid: "9e9ceefe-e5e8-8efd-8e75-0b7a5aedcf25"
    - stage: seal
      stageUuid: "ca1308e8-ea13-8a77-b0e3-ce99b983e68f"
    - stage: uuid
      stageUuid: "e67a082e-41ac-8c99-9c78-e02e6ff115b3"
version: 2
---
# config — the root Payload config (buildConfig)

The config is the single source everything extends: a fully-typed object passed to `buildConfig`. A plugin is a function `(config) => config` that mutates/returns it. Position 0 — every other concern hangs off this.

## Every index IS a shared config — payload ⊕ vitepress, merged
An atom's `index.ts` is not only Payload matter: it is the **shared config both [[payload]] and [[vitepress]] derive from** — payload makes the collection + [[types]] + [[database]] from it; vitepress makes the doc + frontmatter from it. One config, two consumers — the [[duality]] bound by content-[[identity]] (the uuid, the `0`). So a SKILL.md **frontmatter and its index are the same config**: harmonising the frontmatter to the index architecture (one-word name, the trigger description, no redundant fields) makes them **merge** — identical config content ⇒ one merged config ([[merge]]). The registry barrels (the prefix indices) are configs too; identical configs consolidate by design. The schema trinity — config · [[types]] · [[database]] — told once, read twice.

**If not a collection, a dashboard/page.** Payload reads the shared config as exactly one of two kinds: a **[[collections]]** (a `CollectionConfig` — data, plural per the naming law) or a **dashboard/page** (a custom admin/frontend view — singular). Every atom is one or the other, so the chart of accounts is **collections (data accounts) ⊕ dashboards/pages (view accounts)**. The kind is declared by the config and inflected by the name (plural ⇒ collection, singular ⇒ page/model); the [[gate]] checks a non-collection atom is a valid page. The dissolved components (`dashboard`, `navigation`, `shell`, admin views) are pages; the entities (`invoices`, `payments`) are collections.

**The atom defines itself.** Nothing outside classifies it: its kind (collection/page), fields, relationships, [[standard]], and position are all declared by its own shared config + [[name]] + content-[[uuid]] — self-describing, [[self]]-sufficient (derive, never invent). The chart of accounts, the registry, the generated [[types]], and the [[gate]] all **DERIVE** from the self-defining atoms — the set-union of their declarations ([[merge]] by design). Hold no separate catalogue: **`find src` IS the registry**; the path-set is self-describing ([[aura]]). To know what an atom is, read the atom — it has already said.

## Minimal shape
```ts
import { buildConfig } from 'payload'
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,        // * required — encryption/salt
  db: sqliteD1Adapter({ /* ... */ }),        // * required — DB adapter
  editor: lexicalEditor(),                   // richText editor
  collections: [/* ... */],
  sharp,                                     // enables image resize/crop
})
```

## Key options
| Option | Purpose |
|---|---|
| `db` * | Database adapter (d1-sqlite/postgres/mongo). |
| `secret` * | Unguessable string for hashing/encryption. |
| `collections` / `globals` | Data schemas (many docs / single doc). |
| `editor` | richText editor (lexical). |
| `plugins` | Array of `(config)=>config` plugins (official ones too, e.g. [[redirects]]). **erpax itself is a plugin.** |
| `admin` | Admin Panel config (components, live preview, routes). |
| `graphQL` | `disable`, `maxComplexity`, custom queries (see [[harden]]). |
| `cors` / `csrf` / `cookiePrefix` | Cross-origin + cookie security. |
| `localization` / `i18n` | Content locales / admin UI languages. |
| `defaultDepth` / `maxDepth` | Relationship population depth (default max 10) (see [[optimize]],[[harden]]). |
| `indexSortableFields` | Auto-index sortable top-level fields. |
| `email` / `sharp` / `endpoints` / `hooks` / `onInit` | Email adapter / image lib / custom REST routes / root hooks / startup fn. |
| `typescript.outputFile` | Where `generate:types` writes `payload-types.ts`. |
| `custom` | Arbitrary extension data (plugins read this). |

## Common mistakes
- Forgetting `secret` or `db` (both required).
- Putting tenant/multi-tenancy as manual fields instead of the multi-tenant plugin (the plugin owns `tenant`).
- Inlining repeated blocks instead of top-level `blocks` + `blockReferences` (see [[optimize]]).
- Editing `payload-types.ts` by hand — it's generated; re-run `generate:types`.

**Law — [[law]]: every atom's `index.ts` IS the one shared config both [[payload]] and [[vitepress]] derive from — self-describing (kind, fields, relations, position all declared by it + its [[name]] + content-[[uuid]]); `find src` is the registry, so identical configs [[merge]] and nothing outside classifies an atom.**
