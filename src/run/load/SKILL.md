---
name: load
description: "Use when asking the only question no other gate asks — does the app actually LOAD? Boots payload.config for real and asserts every collection registers. It currently FAILS, and that is correct: erpax does not boot in any loader, and the test harness has been swallowing it."
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
| `turbopack` (next dev) | **compile error** — a different defect first (`src/pages`, below) |
| `workers` (Cloudflare/OpenNext) | **UNTRIED** — absent, not passing |

## A verdict is a function of (source, observer)

`bootVerdict` returned a bare `loads: boolean` — a claim from **nowhere**, which is the same error this atom exists to catch. The corpus loads or does not **per entry point**, and at each one the answer is *exact*:

> `confirm/matter.test.ts` passed 9 tests, then could not collect — **at the same commit.** The live confirm hook blocked writes all day, then crashed at `diamond/index.ts:293`. Both verified pre-existing by restoring HEAD's own files.

I called that **non-determinism**. It is not. **Initialisation order is a function of the entry point**, so the state is determined once the coordinate is fixed; I was comparing two coordinates without naming either, and averaging them into "it fails" / "it works" about unchanged source. `currentLoader()` is **detected**, never passed — a caller that names its own coordinate can be wrong, and a wrong coordinate makes a correct verdict a lie.

This is [[rules]]/audience's law applied to machines instead of people: the fabricated cash flow is false **only from the director's seat**; the TDZ fires **only from certain entry points**. A claim has no truth value until you name the observer. Each is its own rosetta — same corpus, different projection, both exact.

`fixed/assets` calls `createAccountingCollection(...)` at **module top level**, inside the 225-file tangle ([[rules]]/cycle) — the single fatal site `fatalCycleUses` named out of 248 entangled files. It was found there by reading, before this test existed. Now it is the thing that stops the app.

## Why nobody knew — the harness swallowed it

Every test file in this repo prints, and has been printing:

```
[vitest] payload migrate timed out or database locked. Skipping - schema likely already applied.
```

That is the setup **catching the boot failure and continuing**. So every suite labelled `|payload-integration|` runs with **no booted Payload**. The green was real; the integration was not. A harness that swallows the boot has no way to tell you the app is dead — it can only tell you the pure functions still work, which they do.

And the one test that WOULD have said it — `run/dev/smoke.ts`, which boots the Local API against real D1 — is **switched off in the gate**:

```
src/cli/gate.ts:54   packageApprovalMatrix({ execute: true, smoke: false })
```

Third time in one session that a working tool sat disabled: `smoke: false`, `--no-verify`, and the standards lane that let a statutory index rot to ~50% wrong.

## The browser finds a second, independent defect

```
src/pages/hooks/revalidatePage.ts:3
  "revalidatePath" is only available in Server Components in the App Router,
  but you are using it in the Pages Router.
```

`src/app/` exists, so this is an App Router project — and **Next reserves `src/pages/` for the legacy Pages Router**. But `src/pages/` is erpax's **CMS pages collection** (`slug: 'pages'`), minted by the corpus's own law: *every atom is ONE generic lowercase word.*

**The one-word law claimed a name the framework already owns.** No gate here can see that: [[law]]/folder checks the word is one lowercase word, and `pages` passes perfectly. The framework's namespace is not in the corpus's model.

Its import trace also names the tangle's closing edge: `pages/hooks/revalidatePage → pages → collections → agents/mcp/tool-defs`. The MCP tool-defs importing **every collection** drags server-only hooks into the **client** bundle.

**Honest boundary.** This proves the config does not **load**; it does not prove production is down — the Cloudflare/OpenNext build is a fourth loader and was not tried here. That is precisely the point: the same source loads or does not depending on the bundler, which is [[rules]]/cycle's *"initialisation order is decided by accident"* demonstrated rather than argued. This test is **red on purpose**. It is not a defect in the test.

**Law — [[law]]: a corpus that cannot load has no other properties. Every green gate above this one is a statement about code that does not run — and a harness that swallows the boot will report all of them green forever.**

Composes: [[rules]]/cycle · [[law]].
