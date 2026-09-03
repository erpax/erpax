# @erpax/commerce

The transactional flow from checkout to a provisioned instance, with the lifecycle checkable as one call.

```bash
pnpm add @erpax/commerce
```

```ts
import { checkout, listSubscriptions, meterUsage } from '@erpax/commerce'

const order = await checkout(cart)
await meterUsage({ subscription: order.subscription, units: 1 })
```

ESM only, types included. Node >= 18.20.2.

## Where it comes from

Built from [`src/commerce`](https://github.com/erpax/erpax/tree/main/src/commerce) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** — or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
