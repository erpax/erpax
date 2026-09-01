# @erpax/erpax

The orientation face for [erpax](https://github.com/erpax/erpax) — a zero-entropy, content-addressed ERP corpus.

Install this to **find and verify** erpax. It ships no collection, no config and no application: the licensed app stays private, and a gate in the repo refuses any publish that would change that.

```ts
import { wireFromRepoUrl, ERPAX_CANONICAL_REPO, ERPAX_LAW } from '@erpax/erpax'

const wire = wireFromRepoUrl(ERPAX_CANONICAL_REPO)
if (wire.ok) {
  wire.entryPoint    // .claude/skills/SKILL.md — where the corpus starts
  wire.contentUuid   // the seal: verify the orientation you were handed is the published one
  wire.surfaces      // every agent surface that points at the same entry
}

wireFromRepoUrl('https://github.com/someone/else') // → { ok: false, reason }
```

A URL that is not erpax is **refused with a reason**. An orientation pointing nowhere is worse than none.

## The one law

> Zero entropy ⇒ infinite tamper-cost. Every folder under `src/` is a one-word atom told three ways (form · code · proof), ordered by the sequence, wired through one content-uuid.

## The providers

Each ships one capability: [`@erpax/access`](https://www.npmjs.com/package/@erpax/access) · [`@erpax/accounting`](https://www.npmjs.com/package/@erpax/accounting) · [`@erpax/cloudflare`](https://www.npmjs.com/package/@erpax/cloudflare) · [`@erpax/commerce`](https://www.npmjs.com/package/@erpax/commerce) · [`@erpax/identity`](https://www.npmjs.com/package/@erpax/identity). The free core math is [`@erpax/algebra`](https://www.npmjs.com/package/@erpax/algebra) (MIT).

## Licence

Tiered, and the package states it in code as well as here: `src/algebra/**` is **MIT**; everything else is **CC-BY-NC-ND-4.0**, with commercial terms via `license@erpax.com`.

Cite the corpus by its DOI — the version is its content address, so a release names exactly the content it archives.

© erpax · ORCID [0009-0000-7312-9778](https://orcid.org/0009-0000-7312-9778)
