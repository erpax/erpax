# @erpax/assets

Assets — fixed assets, leases, properties. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/assets
```

```ts
import { buildConfig } from 'payload'
import assets from '@erpax/assets'

export default buildConfig({
  plugins: [assets()],
})
```

The package is generated from `src/packages/assets`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
