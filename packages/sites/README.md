# @erpax/sites

Sites — what is published: pages, posts, media, forms. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/sites
```

```ts
import { buildConfig } from 'payload'
import sites from '@erpax/sites'

export default buildConfig({
  plugins: [sites()],
})
```

The package is generated from `src/packages/sites`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
