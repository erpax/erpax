# @erpax/comply

Comply — frameworks, controls, evidence, risk. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/comply
```

```ts
import { buildConfig } from 'payload'
import comply from '@erpax/comply'

export default buildConfig({
  plugins: [comply()],
})
```

The package is generated from `src/packages/comply`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
