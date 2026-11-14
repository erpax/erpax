# @erpax/stock

Stock — warehouses, movements, shipments. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/stock
```

```ts
import { buildConfig } from 'payload'
import stock from '@erpax/stock'

export default buildConfig({
  plugins: [stock()],
})
```

The package is generated from `src/packages/stock`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
