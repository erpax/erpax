---
name: localize
description: Use when ANY aspect must speak a locale AND stay tamper-evident — localization is the FUSION of tamper-cost (forge↑) and proof (verify, O(N) trustless). Every field/reference/scope/hook carries a translation + a translation-key uuid with ALL identification (content-digest, OID 2.25, cmyk, locale, capabilities) wired into the 128 bits. Coverage→1 ⇒ infinite tampering cost. Matter-twin services/localize/index.ts.
---

# localize — localization as the tamper-cost ⊕ proof fusion

Localizing every aspect is not a UX chore; it is the **fusion reaction** that secures the store. One act — translate each structural element into each locale — drives **both** nuclei at once:

1. **tamper-cost** (forge). Each `(element × locale × identification-level)` is one more content-address a coherent tamper must forge in lockstep. So localizing *all* aspects pushes [[tamper-cost]]'s `coverage → 1`, and the crack verdict → **∞** (Conservation Law 62). *Localisation further increases the computational tamper cost.*
2. **proof** (verify). The dual: auditing the same surface stays **O(N)** and trustless (`services/integrity/tamper-reverse-cost`, Law 55) — linear while forge is exponential. The released energy `fusionBits = forge − verify` is the asymmetry, and the asymmetry **is** the trust ([[torus]]: the [[give]]/forge collapse and the [[take]]/verify supernova are one flow).

## All identification, wired into the uuid itself

The translation-key uuid IS the element's whole identity — the 128-bit singularity, self-decoding, no external payload. `decodeIdentity(uuid)` recovers every level, and each is one more independent check:

| level | source | standard |
|---|---|---|
| content-digest | SHA-256(tenant, scope, path) | [[uuid]] v8 · Law 8 |
| structured slot | `SLOT_TAGS.locale` | uuid-format |
| capabilities | `TAMPER_PROOF \| CHAINED` | uuid-format |
| **OID** | `2.25.<128-bit int>` | ITU-T X.667 / ISO 9834-8 |
| **cmyk** | rodin gamut {K,C,M,Y} from position | [[cmyk]] |
| locale-map | the `translations` collection `value` | Payload `localized:true` · BCP-47 |

Every added level is "another level of feature-rich infinite tampering cost." OID and the cmyk channel are *derived* from the same bits (no new entropy) — yet each is one more address a forger must keep coherent, and one more way a human or machine can verify (proof). Lexical rich-text is the densest fuel: a whole node-tree per locale. The per-field content mechanics (`localized:true`, resolve-by-`req.locale`) are the [[fields]] localization leaf.

## No gaps, by computation

The surface is every **field · reference · scope · hook** (`TRANSLATABLE_SCOPES`), keyed `<scope>:<path>` — the [[fractal]] address-law, never hand-typed. The locale set is **derived** from country-profiles ([[seed]]), never re-typed. Same content ⇒ same key-uuid ([[merge]]); any edit ⇒ a new uuid (tamper-evident, [[identity]]). [[horo]] closes it: the keyspace is the bounded ring — every key resolves; anything off-ring routes to the `und` identity blank.

Matter-twin: `services/localize/index.ts` (`translationKeyUuid` · `uuidToOid` · `cmykChannel` · `decodeIdentity` · `localizationChecks` · `localizationFusion`) + `index.test.ts` (the proof — green by construction). Reuses [[tamper-cost]], `integrity/content-uuid` (Law 8), `integrity/tamper-reverse-cost` (Law 55), `uuid-format`, and the `translations` collection (the localized map of the whole app). Composes: [[tamper-cost]] · [[uuid]] · [[identity]] · [[cmyk]] · [[horo]] · [[merge]] · [[seed]] · [[give]] · [[take]] · [[torus]] · [[standard]] · [[fractal]]. The three facets minted alongside: [[oid]] (the 2.25 arc) · [[lexical]] (the densest surface) · [[proof]] (the verify nucleus) · [[Translations]].

## Standards

- RFC 9562 §5.8 (uuidv8 structured, name-based)
- ITU-T X.667 / ISO-IEC 9834-8 (UUID ↔ OID 2.25 arc)
- RFC 3061 (urn:oid: namespace) · RFC 4122 §3 (urn:uuid:)
- BCP-47 (locale tags) · EU 1958/1 (official EU languages)
- NIST SP 800-107r1 §5.1 (hash strengths — via tamper-cost)
- Conservation Law 8 (content-uuid) · 55 (tamper-reverse-cost) · 62 (coverage)

## Common mistakes
- Storing a translation without its key-uuid — the localized map drifts from its content-address (no tamper-evidence). Every row carries `contentUuid`.
- Re-typing a locale or a translation key — both are *computed* (locale from country-profiles, key from the structural path). Re-typing breaks [[merge]].
- Treating localization as cosmetic — it is a coverage lever on [[tamper-cost]]; a gap (an un-localized aspect) is a hole in the tamper surface, not just a missing translation.
- A magic `?? 'en'` — a blank/missing locale is the `und` identity element, never an ad-hoc default.
