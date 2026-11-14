# @erpax/ledger

Ledger — the books: accounts, journals, periods, banks, tax. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/ledger
```

```ts
import { buildConfig } from 'payload'
import ledger from '@erpax/ledger'

export default buildConfig({
  plugins: [ledger()],
})
```

The package is generated from `src/packages/ledger`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
