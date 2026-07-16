---
name: load
description: "Use when asking the only question no other gate asks — does the app actually LOAD? Boots payload.config for real and asserts every collection registers. It currently FAILS, and that is correct: erpax does not boot in any loader, and the test harness has been swallowing it."
---

# load — does the app run at all

Twelve gates read **structure**: claims, cycles, duplication, audience. Not one can say the sentence that matters:

> **a user cannot open this app.**

Only loading it says that. This is the test that loads it, and **it fails.**

## The finding

```
ReferenceError: Cannot access 'createAccountingCollection' before initialization
    at src/fixed/assets/index.ts:34
```

**erpax's `payload.config` does not load — in any loader:**

| loader | outcome |
| --- | --- |
| `tsx` / node ESM | **TDZ** — `fixed/assets:34` |
| `vitest` / Vite | **TDZ** — same line |
| `next dev` / turbopack | **compile error** — a different defect entirely (see below) |

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
