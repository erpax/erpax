# quantum/ftl/memo/disk — the verdict sealed across processes, keyed on the content git already holds

The in-process memo takes a re-ask to zero **within one run**. A fresh process — every CI job, every
pre-push — still paid the first ask in full. This makes that free too.

## Measured 2026-09-28

| | |
| --- | ---: |
| `unfoldedExports`, cold process (computes and seals) | **3185 ms** |
| the same gate, in a **fresh process** hitting the seal | **252 ms** |
| the content key itself | 227 ms |

**12.6× across processes**, same answer (`dead=226`), and the 252 ms is almost entirely the key — the
gate never ran.

## Why the key is git's and not a file walk

Git already stores a hash per tracked blob, so the address needs **no file reads**:

- `git ls-files -s -- src` — committed and staged content
- `git diff -- src` — every working-tree change
- `git ls-files --others --exclude-standard -- src` + a hash — the untracked file neither of the
  first two can see, which is exactly how a new atom would slip past the memo
- `pnpm-lock.yaml` — these gates parse with `typescript`, so the installed compiler is an input

That is `scripts/payload-input-key.sh`'s method, and it costs 227 ms against the ~7.4 s the gates
spend parsing the same surface. A content hash computed by reading files cost **1432 ms** and — worse
— could not see an in-process edit at all, because `textOf` is memoized and handed back stale text.

## Null is the load-bearing return

`contentKey` returns **null** where the address cannot be established — a tarball with no `.git`, where
every git call yields nothing. A constant there would seal one verdict forever, for every tree, and no
edit would ever dislodge it. With null, nothing is read or written and the gate simply runs.

`payload-input-key.sh` states the same law from the other side: `migrate:status` reads the **database**,
which no hash of this repository can see, so it must never be memoised on this key. *Never memoise on
a key blind to what the answer depends on.*

## Every failure of the cache is a miss

Absent, unreadable, malformed, written under an older `FORMAT`, unwritable directory — all of them
recompute and continue. A killed process leaves half a file; that is a miss, not a throw and never a
wrong answer. The seals live under `node_modules/.cache/`, so they are gitignored by construction and
a fresh install wipes them — the conservative direction, since a dependency change can change what a
parse-based gate sees.

`sealed()` in the parent adds the last guard: a verdict is written **only if it survives a JSON
round-trip**. A `Map`, a `Set` or an `undefined` would come back as something else, and a gate reading
a corrupted verdict is worse than one that recomputes. An earlier draft bolted a marker field onto the
value and sealed it anyway, which is the corruption the guard exists to prevent.

## Honest boundary

**One address per label.** Alternating between two tree states always misses — measured: editing a
file missed as it should, and restoring the bytes missed too, because the seal had been overwritten
under the edited address. Switching branches back and forth pays full price each way. An LRU of two
would fix it and is not written.

**The key covers `src`, so it is coarse.** Touching any file under `src` invalidates every sealed
gate, including gates that could not have been affected. That errs toward recompute, which is the
safe direction, but it means the seal rarely survives active editing — its value is in CI and in a
clean tree, not mid-session.

It seals a verdict, never a judgement about whether the verdict was right.

**Law — [[law]]: seal a pure function on an address that can see every one of its inputs, and return
nothing at all where that address cannot be established. A memo keyed on less than the truth is a
stale verdict waiting for its moment.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: one truth, one address.

Composes: [[quantum]]/ftl/memo · [[law]].
