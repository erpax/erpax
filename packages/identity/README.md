# @erpax/identity

An id derived from what a thing IS, not from when it was created. Same content ⇒ same uuid, on any machine, in any order — which is what makes dedup and merge decidable.

```bash
pnpm add @erpax/identity
```

```ts
import { canonical, atomPath } from '@erpax/identity'

canonical({ b: 2, a: 1 }) === canonical({ a: 1, b: 2 }) // key order cannot change the address
```

ESM only, types included. Node >= 18.20.2.

## Where it comes from

Built from [`src/identity`](https://github.com/erpax/erpax/tree/main/src/identity) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** — or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
