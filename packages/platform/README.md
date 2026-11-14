# @erpax/platform

Platform — what belongs to no single app — it takes every collection the graph leaves unplaced. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/platform
```

```ts
import { buildConfig } from 'payload'
import platform from '@erpax/platform'

export default buildConfig({
  plugins: [platform()],
})
```

The package is generated from `src/packages/platform`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
