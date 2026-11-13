# @erpax/plugin-taggable

A Payload plugin that lets a `taggings` collection tag any record in any collection.

A polymorphic relationship to every collection costs one foreign-key column per collection in the
relationship table. This plugin adds two text fields instead — `taggable` (the tagged record's
content-uuid) and `taggableType` (its collection slug) — so the tagging table stays the same width
however many collections exist.

```ts
import { buildConfig } from 'payload'
import { taggablePlugin } from '@erpax/plugin-taggable'

export default buildConfig({
  collections: [/* … including a collection with the slug `taggings` */],
  plugins: [taggablePlugin()],
})
```

## Options

| option | type | default | |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | `false` returns the config untouched |

It follows Payload's plugin shape: a function taking options and returning a function from config
to config. It only adds the two fields to `taggings`, leaves every other collection alone, and
does nothing if `taggable` is already there.

It imports only types from `payload`, so it adds no runtime dependency. Licence: CC-BY-NC-ND-4.0, or commercial via license@erpax.com.
