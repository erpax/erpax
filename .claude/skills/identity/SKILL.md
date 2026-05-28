---
name: identity
description: Use when working with erpax object identity or content-addressed UUIDs — computing a content-uuid (sha→uuidv5), the self-describing structured uuidv8 (slot + capability flags), categorical identity elements (currency/locale/country blanks), uuid-based RBAC sharing, deduplicated ("dry") file storage, or cross-instance merge/federation. The map to erpax's content-uuid framework.
---

# identity — content-addressed UUIDs (same content ⇒ same id ⇒ seamless merge)

Every erpax object presents itself under a **deterministic UUID derived from a SHA-256 of its own content**. Identical content ⇒ identical id on every erpax instance ("quantum entanglement"): merging two erpax databases is a set-union with no id remapping, and `relationTo` links still resolve because targets are content-addressed too. UUID-only identity (no auto-increment ints) is what makes federation + dedup free. **DRY storage:** a file keyed by its content-uuid filename cannot be stored twice. Identity is the root axis (with [[config]]) that lets "all agents be one erpax" — ordered by the [[sequence]].

## Where the knowledge lives (the map — read these, don't re-derive)
| Concern | Module | Key exports |
|---|---|---|
| content-uuid (the primitive) | `src/services/integrity/content-uuid.ts` | `computeContentUuid<T>(content, tenantId)`, `verifyContentUuid`, `ContentUuid<T>` brand, `jcsCanonicalize`, `stripNonContentFields`, `tenantNamespace`, `NON_CONTENT_FIELDS` |
| self-describing uuid | `src/services/uuid-format/index.ts` | structured **uuidv8** (RFC 9562 §6.4): `encodeStructured`/`decodeStructured`, `SLOT_TAGS`, `CAPABILITIES` (SIGNED/SEALED/SHARED…), `hasCapability`, `verifyStructured` |
| categorical identity element | `src/services/identity-element/index.ts` | `registerIdentitySlot`, `resolveIdentity`, `computeIdentityUuid(slot, code, tenantId)` — blanks: currency `XXX`, locale `und`, country `ZZ` |
| uuid-based RBAC sharing | `src/services/uuid-share/index.ts` | `grantShare`/`checkShare`/`revokeShare`, `AccessRole` lattice (read<write<sign<admin; audit ⊥) |

The "Conservation Laws" cited in those files: **8** content-addressable integrity · **47** type-branded uuid · **54** universal identity element · **59** uuid sharing · **61** structured uuid.

## How a content-uuid is built (content-uuid.ts)
1. strip `NON_CONTENT_FIELDS` (`uuid,id,createdAt,updatedAt`) — id/timestamps must NOT perturb the hash.
2. `jcsCanonicalize` the content (RFC 8785 canonical JSON — stable key order).
3. SHA-256 the canonical bytes (FIPS 180-4).
4. format as **UUIDv5** (RFC 4122 §4.3) under a per-tenant namespace (`tenantNamespace(tenantId)`). Same tenant + same content ⇒ same uuid; different tenant ⇒ different uuid.

## Immutability discipline (why content-addressing is safe for mutable records)
Hashing a *mutable* record means an edit changes its id → dangling refs. erpax resolves this: only **identity-defining content** is hashed (id/timestamps stripped) and the uuid is **frozen when the object seals** — posted / locked / `SEALED` documents are immutable (see [[accounting]]: `enforcePostingImmutability`, locked periods); drafts may recompute until sealed (compose with [[versions]]). Reference/master data (countries, currencies, tax codes) is universal ⇒ entangles across instances automatically. The structured uuidv8 carries SIGNED/SEALED flags so peers know the verification axes without a lookup.

## Applying it
- **Files / uploads:** stored object key = content hash → automatic dedup ("dry storage"). See [[upload]] (R2/S3 adapter filename = content-uuid).
- **Records:** carry a `uuid` ([[fields]] text), computed in a `beforeChange` [[hook]] via `computeContentUuid`, frozen on seal. `defaultIDType: 'text'` so the id itself can BE the content-uuid (see [[database]]).
- **Polymorphic refs:** reference a target by its content-uuid ([[accounting]] "anything is accountable" → the `accountable` uuid is content-addressed; share grants bind grantee/target uuids).
- **Federation across @erpax apps:** content-derived ids make merge a set-union; identical objects collapse to one row. See [[plugins]].

## Common mistakes
- Including `id`/timestamps/audit fields in the hash — use `stripNonContentFields` / `NON_CONTENT_FIELDS`.
- Re-hashing a sealed/posted object — its id must be frozen; recompute only drafts.
- Auto-increment integer ids — defeats cross-instance merge; use the content-uuid.
- Non-canonical JSON before hashing — must `jcsCanonicalize` (stable key order) or the same object yields different uuids.
- Omitting the per-tenant namespace — cross-tenant collisions / unwanted entanglement.
