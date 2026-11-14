# @erpax/people

People — employees, positions, payroll. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/people
```

```ts
import { buildConfig } from 'payload'
import people from '@erpax/people'

export default buildConfig({
  plugins: [people()],
})
```

The package is generated from `src/packages/people`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
