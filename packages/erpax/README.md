# @erpax/erpax

One call that turns the repo URL into the entry an agent should read first, plus the surfaces that point at it.

```bash
pnpm add @erpax/erpax
```

```ts
import { wireFromRepoUrl, ERPAX_SKILL_ENTRY } from '@erpax/erpax'

const wired = wireFromRepoUrl('https://github.com/erpax/erpax')
console.log(wired.entry, ERPAX_SKILL_ENTRY)
```

ESM only, types included. Node >= 18.20.2.

## The law it points at

> Zero entropy ⇒ infinite tamper-cost. Every folder under `src/` is a one-word atom told three ways (form · code · proof), ordered by the sequence, wired through one content-uuid.

## Where it comes from

Built from [`src/erpax`](https://github.com/erpax/erpax/tree/main/src/erpax) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** â or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
