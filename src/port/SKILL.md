---
name: port
description: Use when porting a Rails/ActiveAdmin ERP feature (from etrima or ceccec/erpax) into Payload/Next — mapping ActiveAdmin resource registrations to CollectionConfig, Rails concerns to reusable field-factories/skills, controllers/callbacks to endpoints/hooks, CanCan authorization to access control, polymorphic/self-referential associations to relationships. The Rails↔Next / ActiveAdmin↔Payload Rosetta Stone.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# port — Rails/ActiveAdmin → Payload/Next (same shape, different host)

ActiveAdmin is to Rails what Payload is to Next: a declarative layer where ONE resource/collection definition auto-generates the admin UI, forms, access control, and lifecycle callbacks. Once the correspondence is seen, porting the Rails erpax (`~/github/ceccec/erpax`) + etrima (`~/github/ceccec/etrima`) into Payload erpax is mechanical — each Rails construct has a Payload home. Ordered by the [[sequence]]; the composable atoms (concerns) become reusable field-objects + skills.

## The Rosetta Stone
| Rails / ActiveAdmin | Payload / Next | skill |
|---|---|---|
| `ActiveAdmin.register Model do …end` | `CollectionConfig` | [[collections]] |
| ActiveRecord model + columns | collection `fields[]` (→ payload-types schema) | [[fields]] |
| **concern** (mixin: Host/Accountable/Currency/Number…) | **reusable field-factory / field-object** (composable atom) | [[fields]] · [[accounting]] |
| `index do; column …end` | `admin.defaultColumns` + cell components | [[admin]] |
| `form do; f.input …end` (formtastic) | field types (text/select/relationship/array/blocks…) | [[fields]] |
| `filter :x` / `scope :balanced` | list `where` filters / query presets | [[queries]] |
| `member_action` / `collection_action` | custom `endpoints[]` | [[api]] |
| `controller do; before_action…end`, `before_save`/`after_create` | collection `hooks` (beforeChange/afterChange…) | [[hooks]] |
| CanCan/Pundit `authorize_resource` / `can?` | `access` (read/create/update/delete → bool or Where) | [[access]] |
| `belongs_to` / `has_many` | `relationship` (`relationTo: 'slug'`, `hasMany`) | [[fields]] |
| polymorphic `belongs_to …, polymorphic: true` | `relationship` `relationTo: [..slugs..]` | [[accounting]] |
| self-referential `has_many :children` (Account/Invoice trees) | relationship-to-self (`relationTo: <own slug>`) | [[accounting]] |
| `permit_params` | field-level `access` + validation | [[access]] |
| ActiveJob / ActionMailer | Payload jobs queue / email | [[jobs]] · [[config]] |
| hand-written migrations | Payload-**generated** migrations (never hand-edited) | [[database]] |
| `application_controller` (tenant + 402 payment gate) | access + subscription gates + multi-tenant plugin | [[access]] |
| Rails initializers / `config/` | `payload.config.ts` / `next.config` | [[config]] |
| ERB views / partials | React Server Components / blocks | [[admin]] |
| content-addressed identity (SHA) ↔ federation | content-uuid (`.uuid`) | [[identity]] |

## The key isomorphism (why "all comes to place")
A Rails **concern** = a Payload **reusable field-object** = an erpax **skill**: one composable unit mixed into many models/collections. Double-entry balance, polymorphic accountability ("anything is accountable"), self-referential document trees, and tenant + payment gating all transfer 1:1 (see [[accounting]]). The single anti-pattern to NOT port literally is etrima's `option_1..12` grid — replace with composable `dimensions` + generated variants ([[manufacturing]]), the same composition principle.

## Port in trinities — the unit of a port is a trinity, never a file
"Port all" means port **in trinities**: every Rails construct lands as a complete [[trinity]] — **matter** (the code: DB logic copied verbatim, framework scaffolding reimplemented) · **antimatter** (its SKILL — the form/law) · **backend** (the generated `payload-types` schema) — and a port is *done* only when all three are present and agree. Code with no SKILL is matter-only (it cannot be reasoned about or [[merge]]d); a SKILL with no matter is the metaphysical 1/3 — hallucination the [[sequence]] drops.

Interacting ports **compose into trinities, never flatten**: two related Rails models (invoice↔payment, lot↔phase) port neither as one mushed collection nor as two disconnected ones — their relationship is itself the third ([[collapse]]: trinities compose into trinities). A concern with no obvious Payload home is a 2/3 port; its missing 1/3 is **supplied by a neighbouring trinity** — a shared field-factory another port already defined, or the [[identity]] element — never invented locally ([[merge]]). So the whole source app ports as one **lattice of interacting trinities** ([[fractal]]): each Rosetta row gives matter + antimatter, the backend generates the third, audited [[sacred]]/[[profane]] and gate-green.

## Source apps (read the original)
- `~/github/ceccec/erpax` — canonical Rails erpax: concerns, `accounting_equation.rb`, `invoice.rb` (self-referential tree), `application_controller.rb` (tenant + 402 gate).
- `~/github/ceccec/etrima` — garment manufacturing: `work_order.rb` (option_1..12 → port via [[manufacturing]]), `app/admin/production/*`, `app/admin/reports/*`.

## Strictly implement the standards (the multi-agent collision monitor)
Every ported collection MUST carry its real `@standard`/`@accounting`/`@audit`/`@compliance`/`@security` JSDoc banners and comply with them — not decoration (see `WorkOrders.ts`: ISA-95, IAS-2 §10-13, ISO-8601, SOX §404, ISO-27001 A.5.23). Why strict:
- **Involve all applicable standards, including NEW ones** not yet used in the repo (ISA-95/IEC 62264, ISO 22400-2, ILO, etc.). Don't limit to the existing banner set.
- **The sequence makes them mutually compliant.** Because every standard attaches to composable atoms applied in `0·3·6·9·1·2·4·8·7·5` order (see [[sequence]]), many standards coexist on one collection without conflict — the sequence reconciles them.
- **Standards + sequence = the multi-agent coordinate + collision detector.** Many agents can generate features simultaneously; the architecture-invariants (`services/architecture-invariants`), the generated `docs/STANDARDS_INDEX.md`, and `payload-types.ts` surface exactly where two agents' skills collide. Strict banners are what make that monitoring possible.

## Data migration (dump → import-export plugin)
Port the *data*, not just the schema: `scripts/etrima-to-import.mjs` streams the source pg_dump (gzipped plain SQL, read straight from the zip) and emits one JSON array of documents per collection for `@payloadcms/plugin-import-export` to import (CSV or JSON; JSON handles nested arrays cleanly). Rules:
- **Preserve source PKs** as the erpax doc `id` so foreign keys map 1:1 — no id remapping; the content-uuid plugin stamps `uuid` on import. Import in dependency order.
- The COPY parser is **self-describing** — it reads each block's own column list, so the mapping config is column-order-independent.
- **Sample** huge transactional tables (etrima `work_orders` 2M, `work_shifts` 377K, `lot_work_phases` 291K); take master data in full. **Skip** paper-trail (`versions`/`version_associations`) + dated archive tables.
- **Anonymise PII** (employees `egn`/name/DOB/phone/email, account contacts) — never seed real PII.
- **Drop/collapse obsolete**: `option_1..12` → the `variants[]` array (see [[manufacturing]]).
- Output is gitignored (`seed/import/`) — regenerable from dump + converter.

## Common mistakes
- Porting ActiveAdmin per-resource tweaks into bespoke admin React instead of Payload's declarative `admin` config.
- Re-implementing a concern in each collection instead of ONE shared field-factory (the concern's whole point — DRY).
- Hand-writing migrations (Payload generates them from the schema).
- Carrying `option_1..12` across literally instead of composable dimensions ([[manufacturing]]).
- Hard-coding a `relationTo: 'specific-slug'` where the Rails side was polymorphic — keep it `relationTo: [..]` (see [[plugins]]).
