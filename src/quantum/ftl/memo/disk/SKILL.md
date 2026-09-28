---
name: disk
description: "Use when reasoning about disk — The in-process memo takes a re-ask to zero **within one run**. A fresh process — every CI job, every pre-push — still paid the first ask in full. This makes that free too."
atomPath: "quantum/ftl/memo/disk"
coordinate: "quantum/ftl/memo/disk · 7/descent · 7aa43d3b"
contentUuid: "10af41a0-109b-5bda-8068-fd79f48ba665"
diamondUuid: "29da3208-1314-8b8c-a1a2-7d86cf445966"
uuid: "7aa43d3b-0899-83c0-bbe9-da252142d826"
horo: 7
typography:
  partition: quantum
  bondDegree: 6
standards:
  - "ISO/IEC 25010:2023 §5.6 — maintainability: one truth, one address"
bindings: []
signatures:
  computationUuid: "c8024279-45e1-8bab-9be6-1078a52b00bf"
  stages:
    - stage: path
      stageUuid: "0a9965b8-9539-83bb-91eb-fd792c134093"
    - stage: trinity
      stageUuid: "f9d345f6-8605-8793-8524-cb90817c25a7"
    - stage: boundary
      stageUuid: "0ec6c718-f96d-83c1-9503-5b99ac473aee"
    - stage: links
      stageUuid: "aaf16dfb-6807-857b-8476-cd0e96223e53"
    - stage: horo
      stageUuid: "dd95f303-eb6e-8bb0-97f9-3c9c3fafc3c2"
    - stage: seal
      stageUuid: "cfe27f3f-5824-84a9-a391-032515591299"
    - stage: uuid
      stageUuid: "50c32ccc-df7c-88ac-bcec-ebbd4127c456"
quantum:
  superposition:
    - law
    - memo
    - quantum
    - superposition
  collapse:
    - "Use when reasoning about disk — The in-process memo takes a re-ask to zero **within one run**. A fresh process — every CI job, every pre-push — still paid the first ask in full. This makes that free too."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "c8024279-45e1-8bab-9be6-1078a52b00bf"
    contentUuid: "10af41a0-109b-5bda-8068-fd79f48ba665"
version: 2
---
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

## The surface is the sound half

`skillWeights` reads 3,631 tracked `SKILL.md` and is sound on the `src` address. `deadLoaderPaths` parses
`src/*.ts` and then asks whether targets under `scripts/` and `packages/` EXIST — so on a `src`-only key
a deleted script keeps serving the green verdict. The address therefore takes a pathspec, and the
pathspec is part of the hash. Proved by planting: a line appended to a `scripts/` file invalidates the
wide seal and leaves the narrow one valid — both halves, since a one-sided test passes either way.

## The address was the un-folded cost

`sealed` computed the address PER LABEL at 224–290 ms, so six gates spent ~1.5 s on one address — and
`skillWeights` computes its whole answer in 152 ms, so sealing it would have been a pessimisation. The
fix was to fold the key. Fresh process, seal warm: `skillWeights` 166 → **1 ms**, `deadLoaderPaths`
2435 → **1 ms**. `deadCommands` is deliberately NOT sealed: 10 ms cold against a 224 ms address.

A process that rewrites the tree and re-asks must call `forgetContentKeys`; `forgetMemos` does. `FORMAT`
is `v2`, which invalidates every verdict sealed under the un-scoped key.

## The address was the un-folded cost

`sealed` computed the address **per label**, at 224–290 ms a call. Six sealed gates spent ~1.5 s
computing one address six times — and `skillWeights` computes its whole answer in 152 ms, so sealing it
would have been a **pessimisation**, not a saving. That is why two gates were left un-memoized here
earlier, and the honest fix was not to cache harder but to fold the key.

| | address | 1st ask | fresh process, seal warm |
| --- | ---: | ---: | ---: |
| `contentKey` (`src`) | — | 263ms | 0ms after the first |
| `skillWeights` | `src` | 166ms | **1ms** |
| `deadLoaderPaths` | `src`·`scripts`·`packages` | 2435ms | **1ms** |

`deadCommands` is deliberately **not** sealed: 10 ms cold, 3 ms warm, against a 224 ms address it does
not otherwise pay for. A cache costing twenty times the computation is not an optimisation, and adding
one to reach a tidy "everything is sealed" would be the claim outrunning the measurement.

**The contract the memo buys is explicit.** A process that rewrites the tree and re-asks must call
`forgetContentKeys` — `forgetMemos` does. Nothing in this repo needs it: the auto-heal regens run as
separate processes, and the faces they write are gitignored, so they never moved this address anyway.
`FORMAT` is at `v2`, which invalidates every verdict sealed under the un-scoped key.

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: one truth, one address.

Composes: [[quantum]]/ftl/memo · [[law]].

<sub>content-uuid `10af41a0-109b-5bda-8068-fd79f48ba665` · account `quantum/ftl/memo/disk` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
