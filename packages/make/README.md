# @erpax/make

Make — production: lots, work orders, bills of materials. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/make
```

```ts
import { buildConfig } from 'payload'
import make from '@erpax/make'

export default buildConfig({
  plugins: [make()],
})
```

The package is generated from `src/packages/make`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
