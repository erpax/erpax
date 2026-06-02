# One-click Cloudflare install — design

**Date:** 2026-06-02 · **Status:** proposed (awaiting review) · **Repo:** `github.com/erpax/erpax`

## What this is

Make `erpax/erpax` install onto **any user's own Cloudflare account** by two mechanisms
(decided: both):

1. **Deploy to Cloudflare button** — a README button; non-devs click it.
2. **C3 template** — `npm create cloudflare@latest -- --template erpax/erpax`; devs run it.

Prepared **now**, with the repo kept **private**. Flipping `erpax/erpax` public is a
separate, deliberate step taken only after a clean install is verified (see *Sequencing*).

### Why it's erpax-native (not a convenience feature)

The button is the [[merge]] / "anyone can join" law made literal. Each click spawns a whole
erpax node on the installer's own account (their D1 / R2 / Durable Objects). Because every row
is content-addressed (content-uuid), two nodes holding the same fact converge by set-union with
zero coordination — federation for free. It is the [[torus]] *explosion* direction (collapse
inward to the dense Payload core; breathe outward by replication) and the human-triggered twin of
the worker's own self-clone (`WORKER_SELF_REFERENCE` + `ErpaxStateDO`).

## Non-goals (now)

- Flipping the repo public (later, deliberate).
- Marketing site / multi-region / domain-logic changes.
- Making free-tier installs fully work (documented, not engineered around — see *Cost*).

## Verified install mechanics

- **Button markdown:**
  `[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/erpax/erpax)`
- Cloudflare **reads `wrangler.jsonc`**, provisions every declared resource (D1, R2, KV, Queues,
  Durable Objects, Vectorize, Workers AI, Browser, Analytics, Email) into the *installer's*
  account, and **injects the new resource IDs** back into the config. → account-pinned IDs must be
  **removed**, not kept.
- **Secrets:** the button *can* prompt via `package.json` → `cloudflare.bindings`, but erpax
  **derives instead** (see *Zero-prompt install*) — `PAYLOAD_SECRET` is generated, not requested.
- **Build/deploy commands** are auto-detected from `package.json` scripts. A `deploy` script is used
  verbatim → erpax's `payload migrate`-first deploy is exactly how first-run migrations land. CF
  requires migration commands to reference the **binding** name (`D1`), not the DB name — erpax
  already does (`wrangler d1 execute D1 …`).
- **Hard limit:** the button only works against a **public** repo. Supported resources include DOs,
  Queues, Vectorize, Workers AI — erpax's full fleet qualifies.

## Zero-prompt install (derive, don't ask)

The law: when a value can be **derived**, the install must not ask for it — the truest one-click
asks for *nothing*. Applied:

- **`PAYLOAD_SECRET`** — random generation **is** derivation. Mint once, persist, never prompt.
  Preferred: the deploy script sets a real Worker secret at deploy time
  (`wrangler secret put PAYLOAD_SECRET` ← `openssl rand -hex 32`), consistent across all instances.
  Fallback: runtime mint persisted in a Durable Object (strong consistency; KV would risk an
  eventually-consistent window). Folded into the first-run bootstrap (change #3).
- **account + resource IDs** — derived from the installer's authenticated CF account and CF's own
  provisioning (it injects the IDs).
- **first admin** — created on the first `/admin` visit.
- **Stripe / Resend / MCP** — per-tenant, configured later in `/admin`; absent at install.

Result: the install form is **empty**. Make `PAYLOAD_SECRET` *optional* (not a required
`cloudflare.bindings` prompt); an advanced user may still override by supplying one.

## Required changes

1. **Detach from one account.** Remove `account_id` (`wrangler.jsonc:5`) and D1 `database_id`
   (`:24`); CF injects them. KV `id` (`:78`) is already a zero placeholder. Keep R2 `bucket_name`,
   Vectorize `index_name`, queue/DO names — verify CF *creates* rather than collides on these per
   account.
2. **Button-safe deploy/build path.** The current `deploy` script hard-depends on
   `--env=$CLOUDFLARE_ENV` (empty in the button context → wrangler error). Provide an env-agnostic
   `deploy` (and `build`) the button/Workers-Builds uses; keep the env-scoped variants for the
   maintainer's own multi-env workflow.
3. **First-run bootstrap — THE key risk (needs a spike).** On a fresh, empty D1 with no secrets
   and **zero user input**, two things must happen: (a) **mint + persist `PAYLOAD_SECRET`** before
   Payload initializes (deploy-time `wrangler secret put` preferred; DO-backed runtime mint as
   fallback); (b) land the full schema — confirm how Payload's D1-adapter migrations reach the
   **remote** D1 (`payload migrate` over the adapter vs `wrangler d1 migrations apply D1 --remote`).
   Then the first `/admin` visit creates the first admin. Everything else is mechanical; this is the
   one item that can genuinely fail.
4. **Secrets surface.** Make `PAYLOAD_SECRET` *optional/generated* (see *Zero-prompt install*),
   not a required prompt; keep `.dev.vars.example` / `.env.example` as documented overrides for
   local dev. Audit `scripts/setup-env.mjs` so the template path doesn't re-pin the original
   account/DB IDs or force a secret prompt.
5. **Public-repo hygiene.** Add `LICENSE` (MIT, matches `package.json`); add or de-link
   `CHANGELOG.md` (README links a file that doesn't exist); add a README **"Deploy your own"**
   section (button + C3 command + first-run steps).
6. **Cost honesty.** README section: Workers **Paid** required for Queues / DOs / Browser Rendering /
   Workers AI / Vectorize / D1-at-scale; a free-account click partly fails. State per-binding cost
   plainly; tie to `TENANT_QUOTA` (self-cost-management). The [[bindings]] skill already frames every
   binding as a cost lever — reuse that table.
7. **Stale skill fix.** The [[bindings]] skill lists the "DO classes not exported from the worker"
   gap as open; it is **closed** in `worker.ts` (re-exports all five). Update the skill note
   (truth-in-banners).

## Sequencing & verification

- **Private now:** prove the *deploy path* via `pnpm deploy` into a clean CF account/namespace —
  this exercises migrations + every binding + first-admin, end to end, without publishing.
- **At/after publish:** the button (and a clean-room C3 run) can only be clicked against a public
  repo, so end-to-end button verification is the *last* step — either flip `erpax/erpax` public or
  use a throwaway public mirror.
- **Gate:** `pnpm check` (standards + lint + typecheck + tests) stays green throughout.

## Open risks

- Remote D1 migration mechanism on first deploy (change #3) — resolve by spike before committing the
  deploy script.
- Free-plan installs partially fail — documented, not fixed.
- C3 `--template` exact contract (required files / metadata) — verify empirically by running it.
- Button verification is gated on going public — accepted; sequenced last.
