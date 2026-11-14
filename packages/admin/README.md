# @erpax/admin

Admin — who is here and what they may do: tenants, users, roles. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/admin
```

```ts
import { buildConfig } from 'payload'
import admin from '@erpax/admin'

export default buildConfig({
  plugins: [admin()],
})
```

The package is generated from `src/packages/admin`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
