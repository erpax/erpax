# @erpax/sales

Sales — selling: parties, orders, invoices, subscriptions. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/sales
```

```ts
import { buildConfig } from 'payload'
import sales from '@erpax/sales'

export default buildConfig({
  plugins: [sales()],
})
```

The package is generated from `src/packages/sales`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
