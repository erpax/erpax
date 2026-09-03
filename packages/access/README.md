# @erpax/access

Who may do what, computed as a verdict rather than a boolean scattered across handlers. Actors are resolved from the request; every decision is one function you can test.

```bash
pnpm add @erpax/access
```

```ts
import { actorFromRequest, accessVerdict } from '@erpax/access'

const actor = actorFromRequest(req)
const verdict = accessVerdict({ actor, action: 'read', resource: 'invoices' })
```

ESM only, types included. Node >= 18.20.2.

## Where it comes from

Built from [`src/access`](https://github.com/erpax/erpax/tree/main/src/access) in the [erpax](https://github.com/erpax/erpax) monorepo. The runtime closure is bundled and bare imports stay external; a closure ratchet fails the build if the package starts pulling in more of the corpus than it did yesterday.

## Licence

ONE licence, every path: **CC-BY-NC-ND-4.0** — or a commercial licence via `license@erpax.com`. There is no free tier and no path test: a tier is two answers to "may I use this" with a path deciding which one you get.
