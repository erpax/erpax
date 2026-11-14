# @erpax/work

Work — projects, contracts, workflows. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/work
```

```ts
import { buildConfig } from 'payload'
import work from '@erpax/work'

export default buildConfig({
  plugins: [work()],
})
```

The package is generated from `src/packages/work`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
