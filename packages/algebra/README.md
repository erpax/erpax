# `@erpax/algebra`

Free **core math** from [erpax](https://github.com/erpax/erpax) — `exact*` / `algebra*` ops, theorem algebras, fundamental-broken audits.

- **License:** MIT (free for all)
- **Source:** `src/algebra/**` in the monorepo (minus merge-bound `fold` and the host Math scanner)
- **Everything else in erpax:** AGPL-3.0-or-later / commercial via `license@erpax.com`

```bash
pnpm add @erpax/algebra
```

```ts
import { exactRound, THEOREMS, isClosed, movie } from '@erpax/algebra'

exactRound(2.5) // 3
isClosed(THEOREMS[0]!) // true
movie(THEOREMS[0]!, 2) // [1, 2, 4, 8, 7, 5]
```

Law seal: `src/algebra/license.ts` (`CORE_MATH_SPDX`, `isCoreMathPath`).

## Publish (CI)

1. Bump `packages/algebra/package.json` `version` (never reuse a burned/unpublished version).
2. Tag and push: `git tag algebra-v0.1.1 && git push origin algebra-v0.1.1`
3. Workflow `.github/workflows/publish-algebra.yml` builds free math only and publishes.
4. Secret name (optional OIDC fallback): `NPM_TOKEN` — never commit the value.

Do not attach a GitHub Release publish trigger for the same tag (double-fire → version conflict).
