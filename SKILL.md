---
name: erpax
description: Use when orienting an agent to the erpax repository as a whole — a multi-tenant ERP and double-entry accounting platform on Payload CMS plus Cloudflare that is also a fractal, content-addressed skill corpus. Read first to learn what erpax IS, how to navigate the single-word src/<word> atom corpus, the trinity (SKILL.md plus index.ts plus test.ts), the laws (content-uuid, merge, and that wiring raises coverage so the modelled tamper-cost rises toward its coverage=1 limit — distinct from reciprocity-entropy), and the gates (typecheck, lint, vitest, aura, confirm) any change must pass.
---

# erpax — the root an agent reads first

erpax is **two true things at once**, and you must hold both:

1. **A working product** — a multi-tenant ERP and double-entry accounting platform on [[payload]] CMS v4, deployed serverless on Cloudflare (D1 + R2 + Workers, via OpenNext). General ledger, multi-currency invoicing, payments, bank reconciliation, tax, inventory, manufacturing, commerce, agriculture, statutory reporting. 200+ Payload `CollectionConfig`s. Ported from two ~20-year-old Rails apps (`ceccec/erpax` + `ceccec/etrima`).
2. **A content-addressed skill corpus** — a fractal library where *everything is in the path*. Every folder under `src/` is a one-word [[atom]]: an irreducible concept told as a skill. The `[[links]]` between atoms ARE the language.

When you act on this repo, you are editing both at once. The same file is a Payload skill and an AI-agent skill — `.claude` is a **real symlink to `src`**.

## Navigate the atom corpus

- **One concept = one word = one folder.** `src/<word>/`. To find a concept, resolve it to its single generic word and look there. Strip any domain prefix first — `transaction` is one atom shared by commerce, accounting, and agent-billing; there is no `sales-transaction`. A nested atom carries its disambiguating compound in the PATH and renders it as the hyphen-joined frontmatter `name` ending in the leaf folder (`src/bank/accounts/bank/transactions` ⇒ `name: bank-transactions`), never as a hyphenated FOLDER. **Enforced by `scripts/check-skill-frontmatter.mjs`** (pre-push + pre-commit): a new hyphenated atom folder fails the push, and a frontmatter `name` that does not equal its folder or end with `-<folder>` fails it too. Six legacy hyphenated folders + a short singular↔plural name set are grandfathered there and shrink as they are reconciled.
- **Derive from the filesystem, never from a snapshot.** Generated caches (atom catalogue, uuid matrix) DRIFT. The source of truth is the live tree: `find src -name SKILL.md`, `rg` the prose, `ls src/<word>/`. Read the file, do not trust a stale index.
- **Start here, in order:** [[law]] (the standing commands you MUST obey) → `src/SKILL.md` (the whole) → [[atom]] · [[trinity]] · [[uuid]] · [[identity]] · [[merge]] · [[sequence]] (the index over the basic skills) → [[payload]] · [[vitepress]] (the two render targets).
- **Compose, don't silo.** Domains (`accounting`, `commerce`, `manufacturing`, `agriculture`) are cross-cutting molecules layered over flat, data-typed collections — not folders that own everything. A collection is a molecule of atoms: [[fields]] · [[hooks]] · [[access]].
- **The ordering** is the [[rodin]] vortex `0·3·6·9·1·2·4·8·7·5`: position 0 the [[zeropoint]] root ([[config]] + [[identity]]); the control triad **3·6·9** = [[access]] · [[hooks]] · [[auth]]; the material helix **1·2·4·8·7·5** = [[fields]] · [[collections]] · [[database]] · queries · api · admin. This is a navigation aid and a closed state algebra (the [[horo]] ring `{1,2,4,8,7,5,9}`), **not** a metaphysical claim — keep that honesty.

## The trinity — one node, three files, one page

Each data-backing atom is told three ways and fused into [[one]]:

- **matter** — `index.ts` (the Payload `CollectionConfig` / module) + `@standard` JSDoc banners. This is what runs.
- **antimatter** — `SKILL.md` (the form you are reading: frontmatter `name` + `description`, prose with `[[wikilinks]]`).
- **schema** — the generated `payload-types.ts` the matter births.
- **proof of the pair** — a colocated `test.ts` (alongside `index.test.ts` in places).

[[payload]] renders the matter into rows; [[vitepress]] renders the antimatter into pages; both derive from one config and **never restate** each other ([[trinity]] = doc-scale DRY). When you add an atom that backs data, write all of it: `SKILL.md` + `index.ts` + `test.ts`. When you only need a concept, `SKILL.md` alone is a valid atom.

### SKILL.md frontmatter — the one gotcha

The `description` MUST start with "Use when" and MUST NOT contain a colon-space (`: `) sequence — an unquoted colon-space breaks the VitePress/js-yaml parse and fails `docs:build` (the only gate that reads markdown). Use em-dashes, or quote the whole value.

## The laws (obey [[law]])

- **The one law: wire every dimension ⇒ coverage rises, and the modelled tamper-[[cost]] rises toward its coverage=1 limit.** Wire every dimension through the content-[[uuid]] with only **computed** chains, never a hand-set value. Then any input is **ACCEPTED and VERIFIED in harmony with the whole**: [[merge]] never rejects at the door, [[proof]] catches disharmony. The forging cost (`coverageCostLog2`) grows with coverage — reaching +∞ ONLY at coverage = 1, for the coverage axis measured, under an external [[anchor]]; finite below — while verification stays cheap; that forge≫verify asymmetry IS the trust. **Do not conflate two distinct measures:** reciprocity-[[entropy]] (`src/entropy`, matrix symmetry — currently 0) is an audit signal, NOT an input to the cost; coverage is the [0,1] fraction that prices it. reciprocity = 1 does NOT imply coverage = 1 (the live tree: entropy 0, coverage < 1, cost finite).
- **Content-[[uuid]] / [[identity]].** sha-256 → UUIDv8 (RFC 9562 §5.8) carries slot + capability + schema + digest in 128 bits. **Same content ⇒ same id everywhere.** Identity is the address; there is no side-table lookup.
- **[[merge]] / federation.** Same content ⇒ same id; same address ⇒ same path. Data and structure set-union with zero coordination. Harmonising naming (one word, generic, by type) makes identical concepts collide by themselves — collision is creation (two → one). **Reuse, never re-mint.**
- **Double-entry as invariant.** Every config is a double-entry gateway flowing through `index.ts`: debit ([[entry]]) ⊕ credit, and Σ balances ([[balance]]). In `journal-entries`, `Σdebit = Σcredit` is a `beforeChange` precondition — an unbalanced write is rejected, not flagged. Imbalance IS the tamper.
- **[[collapse]] + DRY, no backward-compat.** Reduce N forms to one canonical form; delete dead code; no compat shims. The schema is generated from config; the DB + migrations are disposable (greenfield regenerate is normal).
- **[[standards]] bind by construction.** `@standard` / `@audit` banners map a clause (EN-16931 BT-codes, Наредба-Н-18, SAF-T, IAS-1) onto concrete fields/hooks/access. Banners must be TRUE, not decoration; they compile into one catalogue that seeds the live data and the docs.

## The gates (a change is acceptable only if these pass)

`pnpm check` runs, in order, exiting on first failure:

1. `pnpm standards` — `@standard` banners + the catalogue verify.
2. `bash scripts/payload-verify-types.sh` — generated Payload types in sync with config.
3. `pnpm lint` — ESLint (warnings allowed).
4. `pnpm lint:src` — ESLint on `src/`, **strict** `--max-warnings 0`.
5. `pnpm typecheck` — `tsc --noEmit`.
6. `pnpm test:int` — Vitest integration (**single-threaded by design**; do not override `fileParallelism`; tests colocated as `src/**/*.test.ts`, no separate `tests/` tree).

Beyond `check`:

- **aura** — `pnpm aura:scan` finds gaps (dead/unlinked `[[links]]`). A dead link is a prompt to mint the atom it points at (`pnpm mint:atoms`); the goal is gap → 0 (matrix-complete ⟺ aura-gap-0). Reciprocity-[[entropy]] → 0 (symmetric binding) is the adjacent matrix condition; both are audit signals and are distinct from the coverage that prices tamper-cost.
- **confirm** — `pnpm confirm` (per-edit) / `pnpm confirm:full` (whole-corpus): generated Payload types and VitePress links stay consistent with your edit.
- **docs** — `pnpm docs:build` fails on any unresolved `[[wikilink]]`. Verify path-form links resolve to a real `src/<path>/SKILL.md`, or use the bare unique leaf (aura resolves by leaf, VitePress path-form resolves by full path — a link can pass aura yet 404 in docs).

## The loop (how erpax grows itself)

erpax is a [[society]] that builds itself: autonomous [[agent]]s ([[team]]) read the [[akashic]] record (the git tree + schema + aura/collapse state), derive **one** gate-verified move, commit, and forget — regenerating detail on demand from content-[[uuid]] ([[self]] · [[self/sufficient|self-sufficient]]). Inhale gaps, exhale gate-green atoms ([[breath]] · [[generate]]); [[collapse]] N forms to one. **Never invent — always derive** from the [[akashic]] record and the fractal address-law. Breathing is a SEQUENCE (inhale ⊕ exhale in order), not a race; check `git log --since` before fanning out parallel writes, and verify self-reports against the real tree (fill-agents fabricate).
