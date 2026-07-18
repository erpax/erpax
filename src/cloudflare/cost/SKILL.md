---
name: cost
description: "Use when computing or fine-tuning Cloudflare spend — every wrangler.jsonc binding (Workers, D1, R2, KV, Vectorize, Workers AI, Queues, Durable Objects, Analytics Engine) as a billable dimension priced into the one efficiency law (output/cost, kind money). cloudflareCost(profile) computes $ from a usage profile; LEVERS ranks the fine-tunes. The prices are a verifiable input and the magnitudes need real telemetry — the bill is the truth, not this model."
---

# cost — erpax's Cloudflare bill, computed and fine-tuned against the one law

Every binding in `wrangler.jsonc` is a **billable dimension**. This atom prices them and feeds the total into [[cost]]'s law — `efficiency = output / cost`, `kind: 'money'` — so Cloudflare spend is compared against the same law as tokens, energy, and labour, and a tuning is *better* only if it raises output-per-dollar (`moreEfficient`).

## What it computes, and what it refuses to

`cloudflareCost(profile)` meters each dimension — nothing billable below its included tier, linear above — and sums a monthly total. `cloudEfficiency(output, profile)` plugs that into the one law. But it makes **two honest refusals**, because a cost model that asserted a number it could not source would be the exact fabrication this corpus exists to block:

- **The prices are a verifiable INPUT, not a claim.** `DEFAULT_CF_PRICING` is Cloudflare's published pricing ~2024–2025; CF changes it, so every rate must be checked against the live pricing page. The structure (which dimensions bill, which levers move them) is the contribution; the cents are pluggable.
- **The magnitudes need real telemetry this repo does not have.** `cloudflareCost` computes `$` as a *function* of the profile; only the CF dashboard / wrangler analytics supplies the profile. No figure here is erpax's real spend — it is arithmetic awaiting real inputs. **The bill is the truth.**

## The fine-tune levers — ranked, declared, grounded in-repo

Each lever aims at a real billable dimension and cites an in-repo fact (never a guess). The bundle is first because it taxes **every cold start**:

| # | lever | dimension | the in-repo fact |
| --- | --- | --- | --- |
| 1 | shrink/externalise the **80MB `skills.index.ts`** | `workers.cpuMs` | a Worker parses its bundle on cold start; 80MB inline JSON is CPU-ms billed, and CPU-ms — not wall time — is the Workers cost driver. vitest already externalises it because SWC "blows up" on it |
| 2 | prerender/ISR so **ASSETS** serves static routes | `workers.requests` | a hit from the ASSETS binding costs no Worker request and no CPU-ms |
| 3 | raise the **AI_CACHE** hit-rate | `ai.neurons` | a KV cache hit returns a prior inference for a ~$0.50/M read instead of fresh neuron spend |
| 4 | serve large assets from **R2** | `r2.egressGb` | R2 egress is the one dimension priced at **$0** — free egress *and* no proxied Worker CPU |
| 5 | cut **D1 rows-READ** (narrow SELECT + indexes) | `d1.rowsRead` | D1 bills rows read, the dimension that scales with traffic; `SELECT *` reads far more than needed |
| 6 | **hibernate idle Durable Objects** | `durableObjects.gbSeconds` | a DO accrues GB-seconds even idle; hibernation drops it to 0 until the next event |

## Replace prices with theorems — the reveal

A price is `cost-to-serve × margin`. `revealBackend()` replaces each published price with a **theoretical floor** (the economic cost to serve one unit — commodity SSD, transit, amortised core-time, GPU-time; ultimately Landauer's `kT ln2`/bit, which every dimension sits ~10⁹× above, proving cost is entropy yet far below price). The ratio `price / floor` was conjectured to *"almost perfectly match."* It does **not** — and the divergence is the better answer:

| verdict | dimensions | `price/floor` | what to do |
| --- | --- | --- | --- |
| **subsidy** | `r2.egressGb` | ×0 | **exploit** — CF prices egress below its transit floor as a loss-leader vs hyperscaler ~$0.09/GB |
| **commoditised** | `r2.storageGb` · `ai.neurons` · `durableObjects` | ×1.9–2.8 | served near cost — not worth fighting |
| **margin** | `workers.requests` (×15) · `kv` (×10) · `d1.storage` (×7.5) · `d1.writes` · `cpuMs` … | ×3.3–15 | **your savings live here** — you pay CF's markup; cutting these returns the most per unit |

So the reveal **re-ranks the levers by markup**: `workers.requests` carries the heaviest margin (~15× the floor), which promotes **prerender/ISR** — per unit avoided, it saves CF's fattest markup. True $ leverage = markup (this table) × volume (telemetry). The floors are **estimates from public infra economics, refutable by CF's real undisclosed costs** — a lens on the divergence, never a claim to *know* the backend.

**Honest boundary.** This proves the arithmetic and the levers' *direction*, never their *magnitude* — that requires the dashboard. The theoretical floors are estimates: the ratio tells you *subsidy vs margin*, not CF's true cost. And "cheaper" is only real if output holds: `moreEfficient` compares a tuning against the current bill *at equal output*, so a cut that breaks a feature is not efficiency, it is loss.

**Law — [[law]]: Cloudflare spend is one cost kind among many — priced per binding, measured as output-per-dollar against the one law, and fine-tuned by levers that each name a real dimension. The prices are a verifiable input and the bill is the truth; a cost this model states without telemetry is arithmetic, not a claim.**

Composes: [[cloudflare]] · [[cost]] · [[law]].
