---
name: load
description: "Use when asking the only question no other gate asks — does the app actually LOAD? Boots payload.config for real and asserts every collection registers. It now PASSES — load — OK from esm, 229 collections — after the tool-defs → collections edge was cut and the `pages` collection was renamed. The SCC is still ~225 files: entangled is not fatal. The harness that swallowed the boot fails closed now, and the sentinel is stamped only by a run that verified the schema."
atomPath: "run/load"
coordinate: "run/load · 4/weave · f662bbbf"
contentUuid: "431b7a62-ab6b-5931-8eb9-e1f8fd8ef65d"
diamondUuid: "bab4acf8-4ac7-8f4c-b43d-20ff8af616a5"
uuid: "f662bbbf-41e5-8b1a-8c2d-1944598a06bc"
horo: 4
typography:
  partition: run
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "72d4875f-9e08-8fa9-8698-c5beae2f3c93"
  stages:
    - stage: path
      stageUuid: "fd577f39-69b9-8231-9d1e-c1239cb43131"
    - stage: trinity
      stageUuid: "e414325b-eb26-8f8d-a57a-765d0b42a7cb"
    - stage: boundary
      stageUuid: "6caf08ed-45e6-8161-84f9-21d1f2433dad"
    - stage: links
      stageUuid: "66683951-15a3-848a-8a92-6447f789cf2d"
    - stage: horo
      stageUuid: "e64c42ca-9f28-84ba-bafb-47014229b18c"
    - stage: seal
      stageUuid: "c8fb7810-f3fa-8d46-b75f-458258834e8e"
    - stage: uuid
      stageUuid: "91d2120a-d0cc-812c-af47-3290f84dcef2"
version: 2
---
# load — does the app run at all

> **RESOLVED 2026-07-16 — erpax BOOTS.** `tsx src/run/load/index.ts` → `load — OK · 231 collections`. The choke point was `agents/mcp/tool-defs → collections` (a static import of 210 configs to read slug strings); sourcing the slugs from the running `req.payload` instead cut the edge, changed the init order, and the config loads from every coordinate tried. The history below is kept because it is the map of what it took — and because the SCC is STILL 225 files: **entangled ≠ fatal**, the boundary this proved.


Twelve gates read **structure**: claims, cycles, duplication, audience. Not one can say the sentence that matters:

> **a user cannot open this app.**

Only loading it says that. This is the test that loads it, and **it fails.**

## The finding

```
ReferenceError: Cannot access 'createAccountingCollection' before initialization
    at src/fixed/assets/index.ts:34
```

**erpax's `payload.config` does not load — and a verdict names WHERE it was taken:**

| coordinate | outcome |
| --- | --- |
| `esm` (tsx/node) | **TDZ** — `fixed/assets:34` |
| `vite` (vitest) | **TDZ** — the same line |
| `turbopack` (next dev) | **compile error** — a different defect first (the `pages` collection, below) |
| `workers` (Cloudflare/OpenNext) | **UNTRIED** — absent, not passing |

## A verdict is a function of (source, observer)

`bootVerdict` returned a bare `loads: boolean` — a claim from **nowhere**, which is the same error this atom exists to catch. The corpus loads or does not **per entry point**, and at each one the answer is *exact*:

> `confirm/matter.test.ts` passed 9 tests, then could not collect — **at the same commit.** The live confirm hook blocked writes all day, then crashed at `diamond/index.ts:293`. Both verified pre-existing by restoring HEAD's own files.

I called that **non-determinism**. It is not. **Initialisation order is a function of the entry point**, so the state is determined once the coordinate is fixed; I was comparing two coordinates without naming either, and averaging them into "it fails" / "it works" about unchanged source. `currentLoader()` is **detected**, never passed — a caller that names its own coordinate can be wrong, and a wrong coordinate makes a correct verdict a lie.

This is [[rules]]/audience's law applied to machines instead of people: the fabricated cash flow is false **only from the director's seat**; the TDZ fires **only from certain entry points**. A claim has no truth value until you name the observer. Each is its own rosetta — same corpus, different projection, both exact.

`fixed/assets` calls `createAccountingCollection(...)` at **module top level**, inside the 225-file tangle ([[rules]]/cycle) — the single fatal site `fatalCycleUses` named out of 248 entangled files. It was found there by reading, before this test existed. Now it is the thing that stops the app.

## Why nobody knew — the harness swallowed it

Every test file in this repo printed, and kept printing:

```
[vitest] payload migrate timed out or database locked. Skipping - schema likely already applied.
```

That was the setup **continuing past a failure it could not diagnose**. So every suite labelled `|payload-integration|` could run with **no booted Payload**. The green was real; the integration was not. A harness that swallows the boot has no way to tell you the app is dead — it can only tell you the pure functions still work, which they do.

**Closed, in two places.** An *unknown* migrate failure now writes the error and `process.exit`s, so it fails everywhere instead of continuing. And the sentinel that marks the schema verified is stamped **only by a run that verified it** — a lock-skip leaves it absent so the next process re-checks, instead of recording "could not find out this time" as "verified forever". The two benign branches (already-exists, held lock) still continue, because neither is evidence of a broken schema.

**What `smoke: false` is, and is not.** `src/cli/gate.ts` calls `packageApprovalMatrix({ execute: true, smoke: false })`, and it is tempting to read that as the boot test being switched off. It is not: that flag governs whether the *package-approval matrix* additionally runs the **full vitest suite**, and the gate already has `test:int` as its own lane (`pnpm erpax test waves`) which runs the suites as receipt-split waves. Turning the flag on would duplicate that lane, not add a boot check. Flipping it on the strength of the earlier reading would have been an instrument error ([[instrument]]) — changing a gate to fix a sentence.

## The browser finds a second, independent defect

```
the collection’s revalidate hook, line 3
  "revalidatePath" is only available in Server Components in the App Router,
  but you are using it in the Pages Router.
```

``app/` exists, so this is an App Router project — and **Next reserves the `pages` directory for the legacy Pages Router**. But that directory was erpax's **CMS pages collection** (`slug: 'pages'`), minted by the corpus's own law: *every atom is ONE generic lowercase word.*

**The one-word law claimed a name the framework already owns.** No gate here can see that: [[law]]/folder checks the word is one lowercase word, and `pages` passes perfectly. The framework's namespace is not in the corpus's model.

Its import trace also names the tangle's closing edge: `pages/hooks/revalidatePage → pages → collections → agents/mcp/tool-defs`. The MCP tool-defs importing **every collection** drags server-only hooks into the **client** bundle.

**Honest boundary.** This proves the config does not **load**; it does not prove production is down — the Cloudflare/OpenNext build is a fourth loader and was not tried here. That is precisely the point: the same source loads or does not depending on the bundler, which is [[rules]]/cycle's *"initialisation order is decided by accident"* demonstrated rather than argued. This test was **red on purpose** while the app did not boot; it is green now because the app boots, not because the question stopped being asked. The Cloudflare/OpenNext build remains a fourth loader this face does not try.

**Law — [[law]]: a corpus that cannot load has no other properties. Every green gate above this one is a statement about code that does not run — and a harness that swallows the boot will report all of them green forever.**

Composes: [[rules]]/cycle · [[law]].
