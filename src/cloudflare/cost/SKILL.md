---
name: cost
description: "Use when computing or fine-tuning Cloudflare spend — every wrangler.jsonc binding (Workers, D1, R2, KV, Vectorize, Workers AI, Queues, Durable Objects, Analytics Engine) as a billable dimension priced into the one efficiency law (output/cost, kind money). cloudflareCost(profile) computes $ from a usage profile; LEVERS ranks the fine-tunes. The prices are a verifiable input and the magnitudes need real telemetry — the bill is the truth, not this model."
atomPath: "cloudflare/cost"
coordinate: "cloudflare/cost · 8/crest · 12e2f7a7"
contentUuid: "b28d06b6-f32e-5801-9ed4-8cc3f3820adf"
diamondUuid: "356b52cc-3cc0-8a9c-8d53-f88c30f48660"
uuid: "12e2f7a7-7584-8e2c-a7d2-2ca18f80433c"
horo: 8
typography:
  partition: cloudflare
  bondDegree: 404
standards: []
bindings: []
signatures:
  computationUuid: "821c6c46-1f1e-801d-a1c6-6df86dceb2f1"
  stages:
    - stage: path
      stageUuid: "63d7f30d-c4ff-80c3-9d7b-410e6460c71e"
    - stage: trinity
      stageUuid: "68858fa1-41a0-8dc6-a1a1-97a821335952"
    - stage: boundary
      stageUuid: "baa0d2e1-ddef-8108-a7e9-f1fafb8558fe"
    - stage: links
      stageUuid: "fd2e2490-1b3c-88e5-a471-1252fc76e1e1"
    - stage: horo
      stageUuid: "06c193f1-8bb3-8e5c-9811-6caecc461db6"
    - stage: seal
      stageUuid: "4b3410d5-9b26-885e-815d-3e2fa34b3ce3"
    - stage: uuid
      stageUuid: "02028df5-6e49-83b5-895d-cfb5c2da5842"
version: 2
---
# cost — erpax's Cloudflare bill, computed and fine-tuned against the one law

Every binding in `wrangler.jsonc` is a **billable dimension**. This atom prices them and feeds the total into [[cost]]'s law — `efficiency = output / cost`, `kind: 'money'` — so Cloudflare spend is compared against the same law as tokens, energy, and labour, and a tuning is *better* only if it raises output-per-dollar (`moreEfficient`).


## The lever that was ranked first did not exist

`LEVERS[0]` said *shrink the 80MB skills.index.ts bundle*, with the evidence typed beside it. The
file is **269 bytes** — a CI stub, and folded out of the Worker besides. A corpus optimising against
that ranking would have spent its effort on a dimension that had already gone, which is worse than
having no ranking: the top of an ordered list is where the money is, and this one pointed nowhere.

[[rules]]/drift gates this exact class — prose stating a byte size an order of scale from the file it
names — and could not see it, because that gate reads **prose files** and the claim lived in a
TypeScript string. The atom's own test was holding it in place besides, asserting
`LEVERS[0].lever` matched `/80MB|skills\.index|bundle/`.

So the number was not retyped. Every lever now carries `holds(cwd)` and `observed(cwd)`, which read
the tree, and `staleLevers` reports the ones no longer worth recommending.

## What the board says today

| dimension | state | read from |
| --- | --- | --- |
| `workers.cpuMs` | **taken** | `open-next.config.ts` now sets an `incrementalCache` |
| `ai.neurons` | open | KV `AI_CACHE` is bound |
| `r2.egressGb` | open | `R2` is bound; egress priced at 0 |
| `d1.rowsRead` | open | `D1` is bound and backs every query path |


The first row is what this session actually changed. `defineCloudflareConfig({})` was empty, so no
incremental cache existed and every ISR/SSG hit re-rendered inside the Worker — CPU-ms is the
Workers cost driver, and re-rendering an unchanged page pays for the same render twice. R2 and
`WORKER_SELF_REFERENCE` were already bound; only the config that uses them was missing, which is
why the cost was invisible. Nothing was broken. The cheap path simply never ran.

## The lever I removed, because I was wrong about it

A fifth lever said *implement or drop the declared Durable Object classes*, on the evidence that no
class implements the five declared namespaces. **False.** All five live in `src/ai/durable-objects.ts`
as plain classes — the valid pre-`DurableObject`-base style — and `worker.ts` exports every one.

My detector asked whether any class `extends DurableObject` and read the absence of that phrase as
the absence of the class. It was also the second false positive in the same hour: the substring form
had already matched its own source, so I replaced it with a parser and kept asking the wrong question
with better machinery.

The real requirement is not inheritance, it is that the class be a **named export of the worker
entry** — workerd binds on that and nothing else, and the failure is silent: the deploy succeeds, the
binding exists, and only the call fails, at runtime, in production. `worker.ts` records that a
side-effect import was tried here first and could not create a named export, so the gap has been
walked into once already.

That check now lives in [[cloudflare]]/binding, gated at zero, verifying the re-export rather than
trusting it — `export { AuditChain } from '@/ai/durable-objects'` counts only when that module really
declares the class. Planted against: removing `AuditChain` from the entry's export list produces
exactly one gap naming the binding that would fail.

**Honest boundary.** A configured cache is not a measured saving. These are levers and their
evidence, not telemetry — the bill is the truth, and no figure here is a claim about it. The
detector for the DurableObject row is PARSED (`ts.isClassDeclaration` with an `extends` heritage
clause) after a substring form matched its own source: the needle appeared inside the call searching
for it, and in the test's name.

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
