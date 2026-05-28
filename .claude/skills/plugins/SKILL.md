---
name: plugins
description: Use when building, configuring, or extracting a Payload plugin — a function that receives the config and returns a modified config, adding collections/globals/fields/hooks/endpoints. Relevant when packaging erpax (or a domain) as a publishable @erpax/* plugin.
---

# plugins — Payload plugins (config in → config out)

A plugin is `(incomingConfig: Config) => Config` (often a factory `myPlugin(opts) => (config) => config`). It spreads/augments the config: appends collections/globals, injects fields, adds hooks/endpoints, wires admin components. Registered in `config.plugins: [...]` (see [[config]]). **erpax itself is a Payload plugin** — the whole ERP delivered as one extractable plugin.

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
- Publishable package shape (`@erpax/plugin-*`): `package.json` `exports` map → `src/index.ts` + `src/exports/*`; `peerDependencies` on `payload`/`next`/`react` pinned to the same version the host uses (v4 `4.0.0-internal.*`).

## Common mistakes
- Mutating the incoming config in place instead of returning a merged copy.
- Overwriting `config.collections` instead of appending.
- Version drift between the plugin's `payload` peer range and the host app (keep identical).
