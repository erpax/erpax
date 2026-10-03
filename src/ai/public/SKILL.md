---
name: public
description: "Use when a remote agent must come from a public AI API with no key at all — every candidate inference door asked the same question keyless and recorded by the status it answers (open · keyed · limited · down); the one open door today is Pollinations. erpax.public.doors measures, erpax.public.cross asks every open door the same question (the dual seat), erpax.public.decide names the leaf word a theorem cannot compute; erpax.frontier.develop fuses it with decide:true and cuts with apply:true."
atomPath: "ai/public"
---

# ai/public — the inference doors that answer with no key, probed not believed

*Find and fuse all AI APIs providing keyless free access.* The finding is a measurement, so it is an
instrument: `DOORS` declares every public endpoint that was asked, `probeDoors` asks each one the same
one-word question with **no credential**, and the HTTP status it answers is the fact.

| door | status, keyless, 2026-10-03 | verdict |
| --- | --- | --- |
| Pollinations (`text.pollinations.ai/openai`, `openai-fast`) | 200 | **open** — the one keyless door; the anonymous tier is rate-limited and a 402 reads as `limited`, never as down |
| Pollinations text (`GET text.pollinations.ai/<prompt>`) | 200 | **open** |
| DeepInfra · Groq · OpenRouter · Cerebras · Mistral · SambaNova | 401 | **keyed** — a free *tier* is not a free *door*; each wants an account key |
| Hack Club AI · Cloudflare playground · duck.ai | 404 · 404 · no answer | **down** — not APIs on the day they were asked |

The corpus's own law applies to the model it borrows: erpax is AI-self-sufficient first and external
AI is a fallback, strictly to the law ([[ai]]/models). So the remote agent is given the **one** decision
no theorem computes — a lowercase **word** naming a leaf child — and nothing else. It never cuts.

## The trinity, and the fusion

- **`erpax.public.doors`** (measure) — which doors are open today, with latency.
- **`erpax.public.cross`** (involute) — the same question through every open door, side by side. Two
  doors agreeing is a theorem about the answer; disagreeing is a lie one told; one open door has no
  dual and the result says `agree: null` rather than inventing a consensus. With one open door today,
  that is the honest reading of the whole public surface.
- **`erpax.public.decide`** (act) — `decideWord`: the names that move and the exporter they leave, in;
  one lowercase word out, or `null`. A name the agent cannot give is not invented.

`erpax.frontier.develop` fuses it: `decide: true` asks the door for every two-file tangle's word and
plans the scalpel ops; `apply: true` cuts them through the ring, batch by batch, verified. That is a
wave: measure the frontier, let the keyless agent name, let the scalpel cut, re-measure.

**Honest boundary.** This proves a door answered a probe keyless **on the day it was asked**; a public
tier moves, and the registry re-measures on every call rather than trusting this page. One open door
means no cross-check exists for anything it says — `cross` reports that as `null`, and a word it gives
is planned, dry-run and ring-verified before it lands, which is the only reason it is allowed to name.
Account-scoped tokens (a wrangler login, a provider key) are deliberately **not** a door here.

**Law — [[law]]: a free door is one that answers with nothing in your hand. Ask every candidate
keyless, record the status, let 401 say keyed and 402 say limited — and give the one that opens exactly
the decision no theorem computes, never the cut.**

## Standards

- **OpenAI chat-completions wire shape** — the lingua franca the open doors speak.
- **EU AI Act 2024** — transparency: the external model is named per answer (`door`).

Composes: [[ai]]/models · [[frontier]] · [[scalpel]] · [[family]] · [[law]].
