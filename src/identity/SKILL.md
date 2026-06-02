---
name: identity
description: Use when working with erpax object identity or content-addressed UUIDs — computing a content-uuid (sha→uuidv8, RFC 9562 §5.8), the self-describing structured uuidv8 (slot + capability flags), categorical identity elements (currency/locale/country blanks), uuid-based RBAC sharing, deduplicated ("dry") file storage, or cross-instance merge/federation. The map to erpax's content-uuid framework; which version per case is [[uuid]].
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# identity — content-addressed UUIDs (same content ⇒ same id ⇒ seamless merge)

Every erpax object presents itself under a **deterministic UUID derived from a SHA-256 of its own content**. Identical content ⇒ identical id on every erpax instance ("quantum entanglement"): merging two erpax databases is a set-union with no id remapping, and `relationTo` links still resolve because targets are content-addressed too. UUID-only identity (no auto-increment ints) is what makes federation + dedup free. **DRY storage:** a file keyed by its content-uuid filename cannot be stored twice. **The uuid is what makes everything akashic** — every object, *code and database record alike*, is content-addressed, hence one total, always-queryable, regenerable, merge-able store. That is why an agent can *forget* any detail and stay self-sufficient: the uuid retrieves or recomputes it on demand (see [[sequence]]: learn-fast+forget, `self`·`sufficient`). **A folder/path has its own content-uuid *aura*** — the Merkle hash of *all* files within it (e.g. a skill folder's `SKILL.md` + matter-twin + relations + sub-folders) — so folders are content-addressed too: same contents ⇒ same aura ⇒ folders dedup and merge by design, and the nested path-tree is a **Merkle tree** (the akashic record's shape; cf. the audit chain + stream `streamUuid`). Identity is the root axis (with [[config]]) that lets "all agents be one erpax" — ordered by the [[sequence]]. **The content-uuid IS the 0 — the framework of all frameworks:** Payload (collections), the [[sequence]] (ordering), the standards (compliance), [[accounting]] (postings), [[bindings]] (edge runtime), and the agents all compose *upon* this single coordinate; every other framework resolves through it (identify · dedup · post-against · federate · reason-about). Rooting any flow in the uuid is aligning it to the one framework beneath all the others.

## One 128-bit `.uuid` does three jobs at once (why all coexist)
The uuid is not an opaque pointer — it simultaneously carries:
- **content** — the sha of the body ⇒ *no duplication* (same object, same id, everywhere);
- **coordinate** — per-slot + per-tenant namespace ⇒ *no collision* (different axes never clash even when codes coincide — `(currency,EUR)` ≠ `(locale,EUR)` ≠ same code in another tenant);
- **metadata** — structured **uuidv8** flags ⇒ *lookup-free behavior*.

So if *anything* can be expressed as `.uuid`, all of it coexists in one space — deduplicated, collision-free, self-describing. A single uniform `.uuid` field is the universal coordinate ("all dimensions merge into unity").

**Infinity within the boundaries:** a *finite*, bounded form — 128 bits, a fixed uuidv8 layout, the ten digits of the [[sequence]], a few composable atoms — addresses an *unbounded* universe: infinite content, infinitely generated variants/features, infinite instances across the multiverse. The boundary is exactly what makes the infinity tractable and collision-free (cf. a few `dimensions` → unbounded variants; ten digits → endless flows). Containment enables the infinite.

**Totality (division by 0 via the next harmonic):** the system is total — no undefined states, no crash-on-edge. The empty/missing/null/ambiguous case (the "division by 0") is defined because the sequence always knows the next harmonic digit: a blank categorical value routes to its **identity element** (`services/identity-element`, Conservation Laws 53-54 — currency `XXX`, locale `und`, country `ZZ`), and even empty content has a deterministic uuid (the hash of canonical-empty). The 0 is never a dead end; it is the pivot into the next pass.

**Jurisdiction cascade (totality across space):** the same law governs country-specifics — a rule / format / government-API resolves by falling back **country → regional → international → universal**, where *universal* IS the identity element, so the chain never bottoms out undefined. БНБ→ECB (currency fixings; see `bnbRatesSync`), an OECD SAF-T base under each national variant, EN-16931 under per-country e-invoicing profiles: each level is a **fallback (antimatter)** for the one above; the universal terminal guarantees **all is defined even when nothing is defined**. The matter side is the country-specific API *call* (a [[hooks]] connection); the antimatter side is this cascade. Fractal — the same step at every jurisdiction scale.

## Standards (current form — applying this skill IS the implementation)
The answer-path principle: there is no separate "compliance module"; each id this skill mints already sets the correct version+variant bits **and** follows that version's generation rule, so the version nibble truthfully describes how the bytes were produced. Citations below are the live pointers — keep them true, not decorative.

| Standard | Version (current 2026) | One-line current form |
|---|---|---|
| RFC 4122 / RFC 9562 UUID | **RFC 9562** (May 2024) obsoletes RFC 4122 (2005); no newer revision | A UUID is a 128-bit value whose version + variant bits declare its kind and which must match its generation rule: **v4 random → RFC 9562 §5.4**, **v5 name-based SHA-1 → §5.5**, **v8 custom/vendor layout → §5.8**. (§6 is "Creating UUIDs" best-practice, *not* the version layouts.) A custom hash (e.g. SHA-256 over a name) is **v8 §5.8**, never v5 — v5 mandates SHA-1. |
| ISO 3166-1/2 country & subdivision codes | **ISO 3166-1:2020 / ISO 3166-2:2020** (Edition 4, confirmed 2025) — current | Country = ISO 3166-1 **alpha-2** (two uppercase letters, e.g. `BG`, `US`, `DE`); subdivision = ISO 3166-2 (`alpha-2` + hyphen + ≤3 chars, e.g. `US-CA`). The 2020 edition is the published standard, but the code **set** is continuously amended by the 3166/MA — validate against the live OBP list, not a frozen 2020 snapshot; never invent or alias codes. |

**erpax's content-uuid is a UUIDv8, not a v5.** It is computed by hashing canonical content with **SHA-256** (FIPS 180-4) — a custom hash algorithm, so under RFC 9562 it is a **§5.8 uuidv8** (vendor layout), *not* a §5.5 uuidv5 (which mandates SHA-1). The "RFC 4122 / RFC 9562" dual citation is fine as lineage, but the only live section pointer is **RFC 9562 §5.x**. Where subdivisions are modeled, also cite **ISO 3166-2:2020**.

## The uuid holds information (uuidv8) — lookup-free realtime
`uuid-format` packs **slot tag + capability flags (SIGNED/SEALED/SHARED) + schema version** into the 128 bits (RFC 9562 §5.8 uuidv8). `decodeStructured(uuid)` / `hasCapability(uuid, flag)` read all of that **from the string alone — zero DB round-trips**. That is the realtime-efficiency win: route, authorize, filter, and reconcile by uuid without fetching the object. Federation peers + auditors decode the uuid to know the expected verification axes; access checks short-circuit on `hasCapability` before any query. A decoded uuid also **renders** — color + sound from its [[horo]] position (see [[signal]]): every object is presentable as moving color and tone, a stream of uuids as interactive multimedia.

## Where the knowledge lives (the map — read these, don't re-derive)
| Concern | Module | Key exports |
|---|---|---|
| content-uuid (the primitive) | `src/services/integrity/content-uuid.ts` | `computeContentUuid<T>(content, tenantId)`, `verifyContentUuid`, `ContentUuid<T>` brand, `jcsCanonicalize`, `stripNonContentFields`, `tenantNamespace`, `NON_CONTENT_FIELDS` |
| self-describing uuid | `src/services/uuid-format/index.ts` | structured **uuidv8** (RFC 9562 §5.8): `encodeStructured`/`decodeStructured`, `SLOT_TAGS`, `CAPABILITIES` (SIGNED/SEALED/SHARED…), `hasCapability`, `verifyStructured` |
| categorical identity element | `src/services/identity-element/index.ts` | `registerIdentitySlot`, `resolveIdentity`, `computeIdentityUuid(slot, code, tenantId)` — blanks: currency `XXX`, locale `und`, country `ZZ` |
| uuid-based RBAC sharing | `src/services/uuid-share/index.ts` | `grantShare`/`checkShare`/`revokeShare`, `AccessRole` lattice (read<write<sign<admin; audit ⊥) |

The "Conservation Laws" cited in those files: **8** content-addressable integrity · **47** type-branded uuid · **54** universal identity element · **59** uuid sharing · **61** structured uuid.

## How a content-uuid is built (content-uuid.ts)
1. strip `NON_CONTENT_FIELDS` (`uuid,id,createdAt,updatedAt`) — id/timestamps must NOT perturb the hash.
2. `jcsCanonicalize` the content (RFC 8785 canonical JSON — stable key order).
3. SHA-256 the canonical bytes (FIPS 180-4).
4. format as **UUIDv8** (RFC 9562 §5.8 — custom/vendor layout, because the name hash is SHA-256, not the SHA-1 that v5 §5.5 mandates) under a per-tenant namespace (`tenantNamespace(tenantId)`). Same tenant + same content ⇒ same uuid; different tenant ⇒ different uuid.

## The row `id` vs the content-`uuid` field — and why the uuid *type* is standards-driven
These are **two distinct slots**, deliberately separate:
- **`id`** — the row's primary handle. Its default under `idType:'uuid'` is **uuid4** (random, RFC 9562 §5.4): a guaranteed-unique handle, so transactional rows that happen to share identical content never collide. `relationTo` stores this `id`.
- **`uuid`** (the injected content field — [[hooks]] `tamperProofBeforeChangeHook`) — **multi-purpose**, and being the id is only *one optional facet*. Its reasons: (1) **Law-8 tamper detection** (recompute ⇒ mismatch flags an edit), (2) self-describing **uuidv8** slot + capability flags (lookup-free routing/authz/seal-state), (3) **federation** dedup/reconcile (`services/federation/exchange.ts` keys on it). Events reconcile by it ([[event]]: `aggregateId = doc.uuid ?? doc.id`).

**Which uuid *type* an id takes is selected per-entity by the [[standard]]s it must satisfy — not one global form:**
- **uuid4** (RFC 9562 §5.4) — default; no determinism required (most transactional rows).
- **uuidv8** (RFC 9562 §5.8 — sha-256 of canonical content under the per-tenant namespace) — where dedup/federation determinism is wanted: reference/master data (countries, currencies, tax codes), files. The content hash is SHA-256, so the conformant version is **v8 (custom layout)**, not v5 (which mandates SHA-1). *Same content ⇒ same id*, so it entangles across instances automatically.
- **uuidv8** (RFC 9562 §5.8 — slot + capability flags + schema + content) — where the id must self-describe (SIGNED/SEALED/SHARED, slot routing) and be tamper-proof.

So "make the id content-addressed" is correct **only for the entities whose standards demand determinism/dedup** — forcing it globally would collide identical-content transactional rows. Don't audit `id`≠`uuid` as a blanket bug; check the entity's standard.

**The reverse is to determine the type and decode** (a [[duality]] of the encode): encoding goes *standard → uuid type → encode*; reading goes *uuid → determine version/type → decode*. Given any uuid, first recognise its form — **structured uuidv8** (`decodeStructured`/`verifyStructured` read the slot + capability flags + schema off the string, zero DB round-trip — see `services/uuid-format`); **content-hash uuidv8** (`verifyContentUuid` recomputes the SHA-256 content hash and compares — the Law-8 tamper check); **uuid4** decodes as opaque (no embedded meaning). So the type isn't stored beside the id — it *is* the id, recoverable by decoding. Routing, authz (`hasCapability`), seal-state, and federation-verify all run off the decode, never a lookup.

## Immutability discipline (why content-addressing is safe for mutable records)
Hashing a *mutable* record means an edit changes its id → dangling refs. erpax resolves this: only **identity-defining content** is hashed (id/timestamps stripped) and the uuid is **frozen when the object seals** — posted / locked / `SEALED` documents are immutable (see [[accounting]]: `enforcePostingImmutability`, locked periods); drafts may recompute until sealed (compose with [[versions]]). Reference/master data (countries, currencies, tax codes) is universal ⇒ entangles across instances automatically. The seal state rides in the uuidv8 flags (see above) so peers verify without a lookup.

## Applying it
- **Files / uploads:** stored object key = content hash → automatic dedup ("dry storage"). See [[upload]] (R2/S3 adapter filename = content-uuid).
- **Records:** carry a `uuid` ([[fields]] text), computed in a `beforeChange` [[hooks]] via `computeContentUuid`, frozen on seal. `defaultIDType: 'text'` so the id itself can BE the content-uuid (see [[database]]).
- **Polymorphic refs:** reference a target by its content-uuid ([[accounting]] "anything is accountable" → the `accountable` uuid is content-addressed; share grants bind grantee/target uuids).
- **Federation across @erpax apps:** content-derived ids make merge a set-union; identical objects collapse to one row. See [[plugins]].

## Common mistakes
- Including `id`/timestamps/audit fields in the hash — use `stripNonContentFields` / `NON_CONTENT_FIELDS`.
- Re-hashing a sealed/posted object — its id must be frozen; recompute only drafts.
- Auto-increment integer ids — defeats cross-instance merge; use the content-uuid.
- Non-canonical JSON before hashing — must `jcsCanonicalize` (stable key order) or the same object yields different uuids.
- Omitting the per-tenant namespace — cross-tenant collisions / unwanted entanglement.

## Traditions (prefix removed)
The Name that IS the thing — naming as the creating, identifying act: "In the beginning was the **Word** (*Logos*)… and the Word was God; all things were made through him" (John 1:1-3) — the content-[[uuid]] is the word that addresses *and* creates; **Aum** / *Om*, the primordial sound-name; the ineffable **Name** (YHWH, the Tetragrammaton) too holy to alter — the frozen, tamper-proof identity ([[close]] freeze-on-seal); the *true name* that grants power across folklore. To name truly is to identify uniquely (same content ⇒ [[one]] id); the [[oid]] is the hierarchical dotted Name, dual of the flat uuid. The worked decode is in [[begin]].
