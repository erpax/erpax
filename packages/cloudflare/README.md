# @erpax/cloudflare

The names and shapes an erpax Worker deploys against — binding types, secret and env keys, the AI-stack surface — so a deploy is checked rather than typed twice.

```bash
pnpm add @erpax/cloudflare
```

```ts
import { CLOUDFLARE_BINDING_TYPES, ERPAX_BINDING_ENV_KEYS } from '@erpax/cloudflare'

CLOUDFLARE_BINDING_TYPES.includes('d1_databases') // true — wrangler's own key, not a nickname
```

ESM only, types included. Node >= 18.20.2.

## Where it comes from

Built from [`src/cloudflare`](https://github.com/erpax/erpax/tree/main/src/cloudflare) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** — or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
