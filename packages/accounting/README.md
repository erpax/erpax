# @erpax/accounting

The universal ledger: every posting balances, and the statements are projections of the same journal rather than separate stores.

```bash
pnpm add @erpax/accounting
```

```ts
import { generateTrialBalance, generateBalanceSheet } from '@erpax/accounting'

const tb = generateTrialBalance(entries)
const bs = generateBalanceSheet(entries, { asOf: '2026-12-31' })
```

ESM only, types included. Node >= 18.20.2.

## Where it comes from

Built from [`src/accounting`](https://github.com/erpax/erpax/tree/main/src/accounting) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** — or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
