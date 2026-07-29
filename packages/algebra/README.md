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
