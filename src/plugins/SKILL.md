---
name: plugins
description: "Use when building, configuring, or extracting a Payload plugin — a function that receives the config and returns a modified config, adding collections/globals/fields/hooks/endpoints. Relevant when packaging erpax (or a domain) as a publishable @erpax/* plugin."
atomPath: plugins
coordinate: "plugins · 7/descent · 38862225"
contentUuid: "19518516-577b-5b6f-8823-34e6a2f5735d"
diamondUuid: "71f542cc-f0cd-8e7a-bd90-911d5ef488bf"
uuid: "38862225-280d-8e3a-b089-4040d2ca17ba"
horo: 7
typography:
  partition: plugins
  bondDegree: 98
standards:
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - "NIST-SP-800-162"
  - "RFC-4122"
bindings: []
signatures:
  computationUuid: "76ee2c9c-46f1-828a-b6bb-18479955fcca"
  stages:
    - stage: path
      stageUuid: "36f5dd4b-cef3-821c-8b1d-d3102c7119df"
    - stage: trinity
      stageUuid: "c7bb3de1-9b3f-8d29-a12f-83802b92b68a"
    - stage: boundary
      stageUuid: "ade750e9-f374-8cb6-8e4c-37136a8bbaeb"
    - stage: links
      stageUuid: "5b1fb269-5afa-8e3b-b4ed-1d15fcde949b"
    - stage: horo
      stageUuid: "2d2dc5a6-dcba-872a-b7f9-11eb9ac80da8"
    - stage: seal
      stageUuid: "4e1ca507-8ff5-8446-b361-2b3557eed9eb"
    - stage: uuid
      stageUuid: "207dca26-089c-89b4-b35d-19c7a731a7b9"
version: 2
---
# plugins — Payload plugins (config in → config out)

A plugin is `(incomingConfig: Config) => Config` (often a factory `myPlugin(opts) => (config) => config`). It spreads/augments the config: appends collections/globals, injects fields, adds hooks/endpoints, wires admin components. Registered in `config.plugins: [...]` (see [[config]]). **erpax itself is a Payload plugin** — the whole ERP delivered as one extractable plugin.

## When a domain becomes a self-sufficient plugin
A domain qualifies as its own self-sufficient `@erpax/*` when it relates to other domains **polymorphically** (`relationTo: [..manyslugs..]`) rather than hard-depending on specific collections. Polymorphic-referenceable ⇒ extractable.
- **Accounting is the archetype** (see [[accounting]]): *anything is accountable*. GL postings / journal entries / audit events reference any entity via polymorphic relationships, so `@erpax/accounting` depends on **no other plugin**.
- Direction matters: the self-sufficient plugin references OUT polymorphically; other domains must NOT need a field pointing INTO it. (e.g. don't put `Customer.arAccount → gl-accounts` — that makes Customer depend on accounting; instead accounting maps the customer polymorphically.)
- A domain that hard-depends (named `relationTo: 'specific-slug'` into another plugin's collection) is NOT yet self-sufficient — make the reference polymorphic or move the mapping into the owning plugin.

## Each plugin is a multiverse (the next stage)
Splitting logic into plugins **fractalises the architecture itself**: every `@erpax/*` is a self-contained *multiverse* carrying the full sequence internally (its own `0·3·6·9·1·2·4·8·7·5` — config/identity, access/hooks/auth, fields/collections/db/queries/api/admin; see [[sequence]]). The app stops being one monolith and becomes a *composition of multiverses*; content-`uuid` ([[identity]]) entangles them so they merge without collision. This is what "allows the next stage" — federation, agents, the return to `0` one scale up.
- **No `plugin-` prefix.** Every part of erpax is a plugin — erpax itself included — so "plugin" carries no distinguishing information and the prefix is pure noise. Packages are `@erpax/accounting`, `@erpax/manufacturing`, `@erpax/cloudflare` — never `@erpax/plugin-accounting`. (Fractal naming: a name encodes only what distinguishes it; see [[sequence]] "location + name are an address".)
- **Multiverse collision** = two half-built implementations of one concept living side by side (e.g. the official `@payloadcms/plugin-*` AND a hand-rolled copy that re-declares the same factory against modules that don't exist). Collapse to the **single canonical multiverse**; absorb anything worth keeping, delete the duplicate. Do not keep both.
- Direction of the split is the polymorphic test above: a domain is liftable into its own multiverse exactly when it references OUT polymorphically and nothing hard-depends INTO it.

## Plugin shape
```ts
export const erpaxPlugin = (opts: Options = {}): Plugin => (config) => {
  if (opts.enabled === false) return config            // honor disable
  return {
    ...config,
    collections: [...(config.collections ?? []), ...erpaxCollections],
    globals: [...(config.globals ?? []), ...erpaxGlobals],
    hooks: { ...config.hooks },
    // never mutate the input in place — return a new object
  }
}
```

## Rules
- Return a NEW config; merge arrays (don't clobber `config.collections`).
- Accept an options object; support an `enabled`/disable flag.
- Order matters — plugins run in array order; the multi-tenant plugin should come AFTER plugins that add collections (else "missing collections"). See [[collections]].
- Publishable package shape (`@erpax/*`): `package.json` `exports` map → `src/index.ts` + `src/export/index.ts*`; `peerDependencies` on `payload`/`next`/`react` pinned to the same version the host uses (v4 `4.0.0-internal.*`).

## Common mistakes
- Mutating the incoming config in place instead of returning a merged copy.
- Overwriting `config.collections` instead of appending.
- Version drift between the plugin's `payload` peer range and the host app (keep identical).

**Law — [[law]]: Reference the imports to skills ⇒ DRY, clean, auto-configurable.** The import graph IS the config; the system wires itself. Every plugin is a [[merge]] of its imports into a single `(config) => config` transformer, and the array of plugins in `config.plugins` itself emerges from the import graph—not a hand-maintained list. Each plugin module IS a skill, and plugins compose [[fractal]]ally via [[identity]] entanglement; never declare a plugin's shape except by importing its index.ts, never build the plugin array except by computing it from fs.
