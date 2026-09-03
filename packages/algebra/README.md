# @erpax/algebra

Arithmetic that refuses to guess: an empty maximum throws rather than returning -Infinity, and every operation is total or explicit about not being.

```bash
pnpm add @erpax/algebra
```

```ts
import { exactRound, exactMaxOf, THEOREMS, isClosed } from '@erpax/algebra'

exactRound(2.5)        // 3
exactMaxOf([1, 9, 4])  // 9 — and [] THROWS, rather than leaking -Infinity
isClosed(THEOREMS[0]!) // true
```

ESM only, types included. Node >= 18.20.2.

## Where it comes from

Built from [`src/algebra`](https://github.com/erpax/erpax/tree/main/src/algebra) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** — or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
