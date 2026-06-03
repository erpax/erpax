/**
 * The erpax-court proceeding — the society's adversarial self-audit, recorded.
 *
 * Run w6vvx50h0: 89 officers (auditors → prosecutors ∥
 * defense → judges) tried 27 charges across 8 aspects of the
 * diamond law. This is the akashic record of that proceeding — generated from
 * the authoritative workflow output by src/justice/docket.mjs, ingested
 * into the `audit-findings` collection by ./seed.ts. The record is permanent
 * and tamper-evident ([[proof]]); the verdicts are the society judging itself.
 *
 * @standard ISO-19011:2018 audit-finding
 * @audit ISO-19011:2018 audit-trail self-assessment
 */

export type CourtVerdict = 'confirmed' | 'partial' | 'dismissed'
export type CourtDisposition = 'remediated' | 'overruled' | 'open' | 'dismissed'
export type CourtSeverity = 'critical' | 'major' | 'minor' | 'none'

export interface CourtCase {
  /** stable kebab id minted by the auditor */
  id: string
  /** the aspect of the diamond law under whose jurisdiction it was raised */
  aspect: string
  title: string
  /** the file the charge cites */
  file: string
  severity: CourtSeverity
  verdict: CourtVerdict
  /** the judge's remedy effort estimate */
  effort: string
  /** what this session did about it */
  disposition: CourtDisposition
  /** commit that remediated it, when disposition === 'remediated' */
  remediatedIn?: string
  /** the judge's reasoning */
  reasoning: string
  /** the prescribed fix (or the dismissal rationale) */
  remedy: string
}

export const COURT_PROCEEDING = {
  "runId": "w6vvx50h0",
  "court": "erpax-court",
  "convenedOn": "2026-06-03",
  "agents": 89,
  "subagentTokens": 8054053,
  "toolUses": 2644,
  "tried": 27,
  "confirmed": 21,
  "dismissed": 6,
  "remediated": 9,
  "open": 11,
  "overruled": 1
} as const

export const COURT_DOCKET: CourtCase[] = [
  {
    "id": "atom-whole-wrong-direction",
    "aspect": "weave",
    "title": "atom←whole is backwards (should be whole→atom)",
    "file": "/src/whole/SKILL.md:16",
    "severity": "critical",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "7e19539",
    "reasoning": "atom/SKILL.md line 25 explicitly declares atom Composes whole (among others), establishing atom as the irreducible foundational parent. The prose (lines 6-8) confirms \"Everything is made of atoms\" and describes atom as the parent unit from which all molecules bond. whole/SKILL.md line 16, added in commit 72b975c, falsely adds \"Composes: [[atom]]\", inverting the relation and claiming whole is the parent of atom. This contradicts the existing composition graph, the semantic hierarchy, and the commit's own notation pattern (atom←whole, where ← means child←parent). The pattern is confirmed by commerce/SKILL.md (Composes PaymentMethods, where commerce is parent) and Shipments/SKILL.md (Composes CustomsDeclarations, where Shipments is parent). Inverted links corrupt the weave worse than orphans.",
    "remedy": "Delete line 16 from /Users/ceci/github/erpax/erpax/src/whole/SKILL.md: Composes: [[atom]]."
  },
  {
    "id": "no-test-critical-services",
    "aspect": "spec",
    "title": "Critical financial services lack any test coverage",
    "file": "/Users/ceci/github/erpax/erpax/src/services",
    "severity": "critical",
    "verdict": "confirmed",
    "effort": "large",
    "disposition": "open",
    "reasoning": "Nine critical financial services marked with @accounting/@compliance/@audit/@standard banners (asserting conformance to IFRS IAS-1, US-GAAP ASC-105/205, SOX §404, ISO-19011:2018, EN-16931) have zero direct test coverage: bank-statement-import.service, journal-entry.service, gl-posting.service, lease.service, financial-reporting.service, tax-automation.service, bank-reconciliation.service, depreciation.service, multi-currency.service. Additionally, receivables/*, payables/*, and parties/* subsystems (all marked with IFRS-9 §5.5 / ASC-326 ECL provisioning banners) are entirely untested. Hook-level tests verify that collection hooks EMIT domain events correctly, but do NOT test the services that CONSUME those events. For example, gl-hooks-emit-events.test.ts asserts events fire on state transitions but never calls glPostingService; payroll-run-posting.test.ts calls journalEntryService.getEntry() only to verify it persisted, not to test the service's double-entry validation logic; bank-reconciliation-report.test.ts tests report formatting, not the matching/aging logic. PLUGIN_ARCHITECTURE.md §10 Collection Implementation Checklist (line 905) explicitly requires \"Add test file (`.test.ts`) with 80%+ coverage\" — this is a spec violation. The 129 test files found are predominantly in non-critical utility/platform services. Material defect: services decorated with audit/accounting banners carry zero evidence of correctness for their core control objectives (balanced GL posting, IFRS-16 lease accounting, multi-currency FX handling, ECL provisioning). Violates DRY doctrine (refactoring core logic has no regression gates) and DIAMOND LAW (matter/antimatter/backend banners do not agree).",
    "remedy": "For each of the 9 critical financial services, create a .test.ts file with tests covering: (1) Unit tests of core business logic (double-entry validation in journalEntryService, lease discount-rate calculations in leaseService, FX-rounding in multi-currencyService, etc.); (2) Integration tests verifying service-to-Payload interaction (journalEntryService.createEntry() persists balanced entries to the collection, glPostingService.postInvoiceActivated() creates GL entries with correct account mappings); (3) Isolation tests mocking Payload.Local-API calls. For receivables/payables/parties subsystems, add .test.ts files covering aging calculations (IFRS-9 §5.5 ECL staging), allowance provisioning, and workflow state transitions. Refactor hook-level tests to call the actual services under test (e.g., payroll-run-posting.test.ts should call journalEntryService methods directly AND verify the hook emits the correct event; gl-hooks-emit-events.test.ts should initialize glPostingService and call postInvoiceActivated, verifying both event emission AND GL entry creation). Aim for 80%+ code coverage per PLUGIN_ARCHITECTURE.md line 905."
  },
  {
    "id": "domain-prefix-supto-sale",
    "aspect": "naming",
    "title": "Domain-prefixed aggregateType violates naming law (supto-sale)",
    "file": "/Users/ceci/github/erpax/erpax/src/services/sales/sale-event.ts",
    "severity": "critical",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "8825221",
    "reasoning": "The aggregateType 'supto-sale' violates the naming law stated in supto/SKILL.md line 26 (\"Core entities use generic concatenated data-type names — the Н-18 reference lives in the naredba-n-18 standard + this skill, never in a slug\"). It also violates the diamond law: the value is absent from src/types/events/index.ts lines 22–30, forcing an `as unknown` type coercion in sale-event.ts:60. This breaks federation event reconciliation (per event/SKILL.md) and downstream type safety. The pattern is demonstrated correctly in the same file (receipt-subscriber.ts:93 uses 'receipt', generic, with no coercion). The defect is a single-line oversight from the supto→sales refactor.",
    "remedy": "1. src/services/sales/sale-event.ts line 51: change aggregateType: 'supto-sale' to aggregateType: 'sale'. 2. src/types/events/index.ts line 22–30: add 'sale' | to the aggregateType union (becomes | 'sale' | 'invoice' | ... | 'fixed_asset')."
  },
  {
    "id": "vendors-vq-contradiction",
    "aspect": "diamond",
    "title": "Vendors SKILL.md has internal contradiction on VendorQuotes link",
    "file": "/Users/ceci/github/erpax/erpax/src/collections/Vendors/SKILL.md",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "7e19539",
    "reasoning": "Vendors/SKILL.md contains an unresolved internal contradiction. Line 8 declares \"Composes [[VendorScorecards]] · [[VendorQuotes]]\"; line 23 declares \"Composes: [[VendorScorecards]]\" (omitting VendorQuotes). The Diamond Law requires matter/antimatter/backend consistency; here the antimatter (SKILL.md) contradicts itself. The VendorQuotes collection is fully implemented, exported in collections/index.ts (line 105), and registered in payload-types.ts (line 131), confirming the backend is sound. The Vendors/index.ts JSDoc (lines 8–23) correctly does NOT claim composition (proper scoping to standards only). The defect is solely that the formal Composes footer on line 23 was not updated to match the prose claim on line 8, introduced in commit 72b975c. This breaks the internal consistency invariant of the SKILL.md antimatter and will cause tooling that relies on parsing the Composes footer to fail to discover the VendorQuotes composition relationship.",
    "remedy": "Update line 23 of /Users/ceci/github/erpax/erpax/src/collections/Vendors/SKILL.md from \"Composes: [[VendorScorecards]].\" to \"Composes: [[VendorScorecards]] · [[VendorQuotes]].\" to restore consistency between the prose claim (line 8) and the formal footer."
  },
  {
    "id": "multiple-dead-composes-links",
    "aspect": "diamond",
    "title": "At least 43 distinct orphan Composes links across collection SKILL.md files",
    "file": "/Users/ceci/github/erpax/erpax/src/collections/*/SKILL.md",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "moderate",
    "disposition": "open",
    "reasoning": "The prosecution's core claim is factually correct: the Composes lines in collection SKILL.md files (added by commits ed09b19 and 72b975c) claim parent-child compositional relationships using language that explicitly invokes Payload-nested-collection semantics (\"11 nested collections → their structural parent — containment\"). However, the actual implementation violates the diamond law's agreement requirement:\n\n1. **Matter (index.ts):** None of the parent collections define a `collections` field to register children. Verified examples: Customers/index.ts (line 21-167), JournalEntries/index.ts (line 63-154), Shipments/index.ts (line 17-end) — all lack `collections` field declarations.\n\n2. **Backend (payload-types.ts):** The generated schema does not reflect nested-collection structures; all claimed children are exported as flat top-level atoms from src/collections/index.ts. Example: CustomsDeclarations is exported as `export { default as CustomsDeclarations } from './Customers/SalesOrders/Shipments/CustomsDeclarations'` (flat), not nested under Shipments in the Payload schema.\n\n3. **Antimatter (SKILL.md):** Claims compositional containment via Composes lines. Example: Shipments/SKILL.md line 21 claims `Composes: [[CustomsDeclarations]]` matching the commit message's \"11 nested collections → structural parent ... containment\" assertion.\n\nThe violation is semantic: the Composes lines use directory-nesting structure and explicit \"containment\" language to justify their claims, but Payload's actual collection configuration does not implement the `collections` field hierarchy that nested-collection semantics require. The codebase uses a flat-export architecture (all collections exported from src/collections/index.ts and registered flat in payload.config.ts), not Payload nested collections.\n\nThe defense correctly notes that all claimed collections exist and some have relationTo data relationships (e.g., PayrollRuns has `relationTo: 'employees'`). However, this conflates two distinct concepts: folder-based organizational nesting does not equal Payload-nested-collection containment, and relationTo dependencies do not justify Composes lines claiming compositional containment semantics.\n\nDefect impact: The Composes claims mislead contributors and tools about the actual Payload architecture. A developer reading Shipments/SKILL.md will expect CustomsDeclarations to be a nested collection within Shipments (with admin UI hierarchy, permission scope inheritance, and the `collections` field registration), but none of those Payload features are implemented. This violates the trinity's agreement law (matter ↔ antimatter ↔ backend must align) and breaks the DRY principle (the architecture claim must be maintained in one place: index.ts Composes fields or index.ts `collections` field, not both separately).",
    "remedy": "OPTION A (Implement containment): Add `collections` field to each parent collection's index.ts to register nested children (e.g., Shipments/index.ts adds `collections: ['customsDeclarations']`), and update payload.config.ts to nest these collections under their parents instead of exporting them flat. Effort: LARGE (requires Payload schema restructure, admin UI hierarchy changes, permission scope updates, schema regeneration).\n\nOPTION B (Clarify semantics — RECOMMENDED): Revise the Composes definitions in the ~24 affected SKILL.md files to remove claims of Payload compositional containment. For folder-nested collections that are exported flat (e.g., CustomsDeclarations under Shipments), either: (1) remove the claim entirely, or (2) replace the Composes line with a comment explaining the folder structure is organizational only and does not imply Payload nesting. For relationTo-based dependencies (e.g., PayrollRuns → Employees), keep those claims if they correctly reflect relationTo field declarations. Effort: TRIVIAL (text edits to 24 SKILL.md files; no code changes)."
  },
  {
    "id": "beyond-dead-link",
    "aspect": "weave",
    "title": "beyond is a dead link (no atom with name: beyond exists)",
    "file": "/src/merge/SKILL.md:22",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "7e19539",
    "reasoning": "The link [[beyond]] in /src/merge/SKILL.md:22 references a skill atom that does not exist. Enumeration of the corpus shows 92 skill atoms; \"beyond\" is not among them. The folder /src/services/beyond/ exists but declares itself as the skill atom \"erasure\" (name: erasure in its SKILL.md line 2), not \"beyond\". Links in Composes lines target skill atoms (identified by their frontmatter \"name:\" field), not folder structures. The weave graph cannot resolve [[beyond]] because no atom by that name is published. The commit message claims \"gap=0\" and \"every link is grounded in folder structure or the orphan's own declared relations,\" but this link violates both: the folder declares a different atom (erasure), and there is no orphan named \"beyond\" with a declared relation. The dead link breaks the semantic integrity of the weave graph and directly contradicts the commit's claim.",
    "remedy": "Change /src/merge/SKILL.md line 22 from \"Composes: [[beyond]].\" to \"Composes: [[erasure]].\""
  },
  {
    "id": "pages-asymmetrical-reciprocal",
    "aspect": "weave",
    "title": "Pages←all is asymmetrical (all→Pages only)",
    "file": "/src/all/SKILL.md:18",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "overruled",
    "reasoning": "The prosecution's evidence is concrete and undisputed: (1) /Users/ceci/github/erpax/erpax/src/all/SKILL.md line 18 declares \"Composes: [[Pages]].\" added in commit 72b975c; (2) /Users/ceci/github/erpax/erpax/src/collections/Pages/SKILL.md lines 14-21 lists composition as [[admin]] [[access]] [[versions]] [[identity]] [[queries]] with no reciprocal [[all]] declaration. The defense's rebuttal that \"all is the polymorphic root\" and \"the link is grounded in Pages' declared composition of universal atoms\" does not survive scrutiny against the commit message law itself: \"every link is grounded in folder structure or the orphan's own declared relations.\" Pages has zero declared relation to all (neither in Composes nor Schema). By contrast, the true reciprocal-hub pattern (accounting/BudgetPlanning) IS grounded: BudgetPlanning's Schema section explicitly mentions \"[[accounting]] (GL accounts, period locks, fiscal periods).\" The all→Pages link violates the grounding law. The commit message groups all→Pages with \"28 reciprocal-hub links from a hub the orphan already declares,\" but this link is not reciprocal in that same structure. It is unidirectional and ungrounded.",
    "remedy": "Add [[all]] to Pages' Composes section, OR add [[all]] to Pages' Schema section with an explanatory note (e.g., \"Schema: [[all]] (totality root); [[admin]] (panel); [[access]] (roles); [[versions]] (drafts); [[identity]] (slug); [[queries]] (presets).\"), OR remove the \"Composes: [[Pages]].\" line from all/SKILL.md and describe the relation in prose instead. The first option (Composes line) is most consistent with the commit's reciprocal-hub pattern."
  },
  {
    "id": "wiki-collision-silent-mismatch",
    "aspect": "gates",
    "title": "Wiki-link collision: aura green despite semantic routing errors",
    "file": ".vitepress/corpus.mts, lines 42-56 + .claude/skills/aura/scan.mjs, lines 40-63",
    "severity": "major",
    "verdict": "partial",
    "effort": "moderate",
    "disposition": "open",
    "reasoning": "The prosecution's evidence is concrete: three normalized-leaf collisions exist (tags, breath, torus), last-write-wins semantics apply, and both gates validate only existence, not paths or semantics. Verified by direct code inspection: /src/collections/Tags/SKILL.md vs /src/fields/tags/SKILL.md both have name:tags; /src/breath/SKILL.md vs /src/rodin/breath/SKILL.md both have name:breath; /src/torus/SKILL.md vs /src/rodin/torus/SKILL.md both have name:torus. The defense correctly refutes part of the charge: the tags collision IS documented at .vitepress/corpus.mts:24 as \"Only `tags`/`Tags` collide, benignly.\" However, the defense fails because: (1) the documentation is FACTUALLY INCORRECT — it states \"Only\" but THREE pairs collide; (2) breath and torus collisions are NOT documented as benign; (3) the semantic mismatch is REAL: /src/research/SKILL.md's [[breath]]'s inhale reference is semantically meant for the outer breath skill (inhale ideas, exhale code) but resolves to /rodin/breath/SKILL (oscillation). Both gates report green because they validate link existence, not semantic correctness or collision documentation. The defect violates DRY (undocumented collisions) and computed-not-hardcoded (last-write-wins is implicit). The breath collision has observable semantic impact on the prose.",
    "remedy": "Precise fix: (1) Correct the comment at .vitepress/corpus.mts:24 to document all three collisions: \"Only `tags`/`Tags`, `breath`/`breath` (rodin), and `torus`/`torus` (rodin) collide — documented and accepted collision semantics: collection/entity pages shadow feature/system pages; last-write-wins chooses the feature (more substantive).\" (2) For breath specifically, verify that references to [[breath]] are semantically correct (e.g., /src/research/SKILL.md's \"breath's inhale\" context should reference the outer skill; if incorrect, rename the rodin/breath to [[breathing]] or [[oscillation]] to disambiguate). (3) Verify torus references are correct (all seem to reference the outer torus correctly, which explains rodin; if confirmed, document this benign asymmetry). (4) Consider adding a prose note in each collision pair's SKILL.md explaining the shadow/feature relationship and which one [[word]] resolves to."
  },
  {
    "id": "no-collision-detection",
    "aspect": "gates",
    "title": "No active validation detects wikiMap leaf-name collisions",
    "file": ".vitepress/corpus.mts, lines 42-51 (acknowledges but does not validate)",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "open",
    "reasoning": "Prosecution evidence is concrete and verified: (1) Four atom-leaf-name collisions exist in the walk (breath, localize, torus, tags), all SKILL-ful-to-SKILL-ful. (2) Code silently overwrites wikiMap[norm(name)] on line 49 and aura's slugs map on scan.mjs line 45 with no check or warning. (3) Defense's \"by-design\" plea relies on: a) gates catching dead links (doesn't apply since both atoms exist), b) prose using full-path escape hatch (prose doesn't use it, uses [[word]] generic syntax), c) hazard being documented (true, but documented without validation). (4) Comment on corpus.mts line 24 claims \"Only tags/Tags collide, benignly\" but 4 collisions exist (stale). (5) No gate fails on collision; a future rename or new atom will silently corrupt wikiMap and link resolution without detection, violating DRY (stale comment) and tamper-proof participation (collision invisible).",
    "remedy": "Add collision detection to corpus.mts walk() function: before assigning wikiMap[norm(name)] = route on line 49, check if the key already exists; if it does, emit a warning/error with the path of both atoms and their normalized name. Update the stale comment on line 24 to list actual collisions (breath/rodin-breath, localize/fields-localize, torus/rodin-torus, tags/fields-tags) or remove the now-misleading \"benign\" claim. Optionally add the same check to aura/scan.mjs line 45 to catch collisions in the speech gate as well."
  },
  {
    "id": "xml-escape-triplication",
    "aspect": "dry",
    "title": "escapeXml function duplicated across 3 export services",
    "file": "src/services/peppol-export.service/index.ts:38-46 | src/services/iso20022-export.service/index.ts:40-49 | src/services/saf-t-export.service/index.ts:870-878",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "8825221",
    "reasoning": "The three export services (peppol-export, iso20022-export, saf-t-export) are shared domain logic modules at src/services/<name>, NOT plugins, and therefore are not protected by PLUGIN_ARCHITECTURE.md's plugin-autonomy clause. The PLUGIN_ARCHITECTURE explicitly permits shared service modules in src/services (section 5.1 Pattern 4). The escapeXml function is identically duplicated across all three with no cross-import, documented duplication (iso20022-export line 38 comment), and type signature drift (peppol-export lacks explicit null in signature while the other two include it). The function is a primitive utility—not domain logic—making duplication a DRY violation. All three test files independently verify escapeXml, confirming the functions are load-bearing and changes must be synchronized across all three files.",
    "remedy": "Create src/utilities/xml-escape/index.ts exporting a single shared escapeXml function with signature (value: string | number | undefined | null): string. Import it in all three export services: peppol-export.service/index.ts line 38, iso20022-export.service/index.ts line 40, saf-t-export.service/index.ts line 870. Update test files to import from the shared utility instead of re-exporting from service files."
  },
  {
    "id": "deprecation-hook-alias-kept",
    "aspect": "dry",
    "title": "depreciationHook backward-compat alias maintained indefinitely",
    "file": "src/hooks/collections/accounting/depreciation.hook.ts:139-145",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "8825221",
    "reasoning": "The backward-compatibility alias `depreciationHook` at src/hooks/collections/accounting/depreciation.hook.ts:145 is dead code with zero production callers. It was introduced in commit c5efe72 (May 12, 2026) alongside an explicit design principle (\"Slice PPP: removed all backward-compat exports\") documented in the same commit's index.ts barrel file. All production code imports only the canonical `depreciationSchedulePostingHook` directly (e.g., src/collections/FixedAssets/DepreciationSchedules/index.ts:25). The alias violates the stated DRY law: \"no backward-compat (no shims/aliases/dead helpers)\". Grep confirms the alias appears in only two locations: the export itself and a comment documenting its removal. No tests reference it.",
    "remedy": "Delete line 145 (export const depreciationHook = depreciationSchedulePostingHook;) and lines 139-144 (the comment block) from src/hooks/collections/accounting/depreciation.hook.ts. This removes the dead re-export entirely, leaving only the canonical depreciationSchedulePostingHook export."
  },
  {
    "id": "legacy-env-alias-active",
    "aspect": "dry",
    "title": "STRIPE_WEBHOOKS_SIGNING_SECRET legacy environment variable alias remains active",
    "file": "src/environment.d.ts:23-24 | src/utilities/tenantRemoteSecrets/index.ts:36",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "8825221",
    "reasoning": "The legacy environment variable alias `STRIPE_WEBHOOKS_SIGNING_SECRET` remains active in live fallback logic (`src/utilities/tenantRemoteSecrets/index.ts:36`), violating the explicit standing law in `docs/REFACTORING_PLAN_TO_COMPLETE.md` Rule #2: \"old name is deleted, never aliased.\" The alias is wired into `devStripeWebhookFallback()` which is called from production webhook code (`src/ecommerce/stripe/tenantStripeWebhook.ts:92`) in non-production environments. Although the function returns empty in production, the presence of the alias in source code creates maintenance burden (two fallback paths for one semantic value), violates DRY, and contradicts the \"no entropy\" refactoring plan. The parallel `devStripeSecretFallback()` function demonstrates the clean pattern: no alias. The defense's claim that development-only scope exempts the alias from the standing law is contradicted by the rule text, which targets naming entropy in the codebase, not runtime execution paths. Slice HHH explicitly closed \"no backward compat\" (MIGRATION_WORKLIST.md line 138), establishing strict backwards-incompatibility as the project standard.",
    "remedy": "Remove the legacy alias `STRIPE_WEBHOOKS_SIGNING_SECRET` from the codebase: (1) Delete line 24 from `src/environment.d.ts` (the `STRIPE_WEBHOOKS_SIGNING_SECRET?: string` declaration). (2) Rewrite `src/utilities/tenantRemoteSecrets/index.ts` line 36 from `process.env.STRIPE_WEBHOOK_SECRET?.trim() || process.env.STRIPE_WEBHOOKS_SIGNING_SECRET?.trim() || ''` to `process.env.STRIPE_WEBHOOK_SECRET?.trim() || ''` (matching the clean pattern of `devStripeSecretFallback()`). (3) Verify `.env.example` contains no mention of the legacy alias."
  },
  {
    "id": "deprecated-stub-exports-dead",
    "aspect": "dry",
    "title": "Deprecated seeding utility stubs exported but never called",
    "file": "src/utilities/seeding/setupNewTenant.ts:10-18 | src/utilities/seeding/seedComprehensive.ts:26-30",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "8825221",
    "reasoning": "The four stub functions (setupNewTenant, resetTenant, getTenantConfig, seedComprehensive) in src/utilities/seeding/ are dead exports that violate the standing law. Evidence: (1) zero callers anywhere in codebase (git grep confirmed, logs show internal-only definition references); (2) explicit @deprecated banners with failure-token returns (success=false hardcoded); (3) explicit deletion queue in scripts/slice-f-delete-dead-stubs.sh verified 2026-05-08/09; (4) docs/REFACTORING_PLAN_TO_COMPLETE.md §3 forbids @deprecated shims beyond one slice cycle; (5) Slice RR (2026-05-09) mandated deletion; (6) 25 days have passed; (7) 17+ slices have completed since Slice RR; (8) current work is on a completely different phase (corpus/atoms). The stubs are overdue for removal per explicit policy. The DRY principle is not truly satisfied by \"one semantic fact per function\" when that function is never called and returns permanent failure — that violates the spirit of DRY (avoid duplication of effort). The violation is procedural (policy breach on timeline) and substantive (dead code that blocks code clarity).",
    "remedy": "Delete the four stub functions and close the exports: (1) Remove /src/utilities/seeding/setupNewTenant.ts entirely (lines 1-19, file 19 lines) — it contains only @deprecated exports with zero callers. (2) Remove /src/utilities/seeding/seedComprehensive.ts entirely (lines 1-36, file 36 lines) — it contains only @deprecated exports with zero callers. No migration needed; no callers exist. Verify via: grep -r \"setupNewTenant\\|resetTenant\\|getTenantConfig\\|seedComprehensive\" (returns 0 external references, only self-references deleted). Then run: bash scripts/slice-f-delete-dead-stubs.sh to clean up the wider dead-stub inventory per the documented cleanup schedule."
  },
  {
    "id": "test-setup-infrastructure-only",
    "aspect": "spec",
    "title": "Test setup tests validate framework only, not behavior",
    "file": "/Users/ceci/github/erpax/erpax/src/testing/test-setup.test.ts",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "moderate",
    "disposition": "open",
    "reasoning": "The test suite validates the IsolatedTestEnvironment's mechanical harness infrastructure but lacks validation of actual isolation semantics and cleanup failure handling:\n\n1. CLEANUP TEST GAP (lines 162-171): The cleanup test only asserts that document count drops to 0, never validating CleanupResult.failures (the structured error reporting designed to surface cleanup errors). The test's local MockPayload.delete() never throws, masking how the cleanup() method (src/testing/test-seed-factory/index.ts lines 854-867) would behave if a real delete operation failed. No test validates that failures are properly collected in the failures array.\n\n2. ISOLATION TEST GAP (lines 496-508): The \"multiple environments\" test only verifies that IsolatedTestEnvironment.getCreatedIds() returns different counts per environment—confirming that the harness tracks IDs separately. It never validates actual data isolation (both environments reference the SAME MockPayload.documents Map and the test doesn't teardown or verify that cleanup is effective). A concurrent test collision where one test's cleanup doesn't run would not be detected.\n\n3. PARALLEL RUNNER TEST GAP (lines 255-279): Runs concurrent tests but only collects timestamps; never asserts they actually overlap or validates data stayed isolated during concurrent execution.\n\n4. CONCURRENT LIMIT TEST GAP (lines 295-316): Validates that the runner respects concurrency limits (via currentConcurrent counter), not that concurrent cleanup actually works or that ID collisions are prevented.\n\nThe tests are high-fidelity for the runner's concurrency/scheduling mechanics but provide false confidence that test isolation (the actual contract isolation semantics must guarantee) is enforced. Per ISO/IEC-29119:2022 (cited in file header line 4), test infrastructure itself must be validated—these tests validate that the harness moves documents around, not that tests using this harness would catch real isolation failures or cleanup errors.",
    "remedy": "Create two new test groups:\n\n1. **Cleanup Failure Handling Tests** (validates CleanupResult.failures):\n   - Mock a delete() that throws for specific IDs\n   - Verify that cleanup() catches the error and populates failures array with correct collection/id/error\n   - Assert CleanupResult.success === false when any delete fails\n   - Verify that getCleanupResult() exposes failures for inspection\n\n2. **Concurrent Isolation Tests** (validates data isolation under parallel execution):\n   - Create parallel test runner with 2+ concurrent tests\n   - Each test creates documents with unique markers (e.g., test-run-id)\n   - After all tests complete, query the payload to verify NO cross-test data leakage\n   - Assert that one test's created documents are never visible in another test's getCreatedDocuments() result\n   - Verify that concurrent tests that manually clear each other's documents trigger cleanup failures (caught and reported)\n\n3. **Isolation Teardown Validation Test** (validates isolation is actually enforced via cleanup):\n   - Setup env1 and env2 simultaneously\n   - In env1, query for env2's created IDs (should return nothing if true isolation)\n   - Teardown both, verify all documents deleted\n   - Re-query to confirm isolation was enforced\n\nReference the real cleanup assertion in tests/helpers/mock-payload.ts (line 97-104) which throws on missing documents, ensuring the test harness can validate delete behavior."
  },
  {
    "id": "en16931-bg3-wrong-concept",
    "aspect": "standards",
    "title": "EN-16931 BG-3 Cites Wrong Business Terms Group for Dunning Cycle",
    "file": "/Users/ceci/github/erpax/erpax/src/payload.config.ts",
    "severity": "major",
    "verdict": "confirmed",
    "effort": "trivial",
    "disposition": "open",
    "reasoning": "The annotation at src/payload.config.ts:1208 cites \"@standard EN-16931:2017 §BG-3 invoice-status-cascade\" for the dunning-cycle job. However: (1) EN-16931 is a semantic data model for invoice content (BG-25 line, BG-23 VAT, BG-20/BG-21 allowances, BG-22 totals) — confirmed by src/standards/en-16931/README.md:44 and types.ts implementation; (2) BG-3 does not exist in the codebase's EN-16931 types module — grep returns zero references to \"BG-3\" except formatting mentions; (3) \"invoice-status-cascade\" appears nowhere else in the codebase; (4) the actual dunning job at src/jobs/dunningJob/index.ts:14 correctly cites \"EN-16931:2017 dunning-notice\" and applies IFRS-9, US-GAAP ASC-326, ISO-8601/ISO-19011; (5) EN-16931 governs invoice definition semantics, not payment-collection state machines. The citation misidentifies which standard element applies. This creates false conformance claims, breaks traceability validation, and confuses auditors about the real standards dependencies.",
    "remedy": "Replace line 1208 in src/payload.config.ts from \"@standard EN-16931:2017 §BG-3 invoice-status-cascade\" to \"@standard EN-16931:2017 dunning-notice\" to align the payload.config banner with the correct annotation already in place at src/jobs/dunningJob/index.ts:14."
  },
  {
    "id": "reversing-entries-implicit-tenant-context",
    "aspect": "security",
    "title": "generateReversingEntries hook creates entries without explicit tenant field",
    "file": "/Users/ceci/github/erpax/erpax/src/hooks/generateReversingEntries/index.ts",
    "severity": "major",
    "verdict": "partial",
    "effort": "trivial",
    "disposition": "open",
    "reasoning": "The prosecution's evidence is concrete and accurate: generateReversingEntries.ts lines 188-202 do NOT explicitly assign a `tenant` field to the journal entry data object. The code relies on implicit tenant population via the beforeValidate hook chain (autoPopulateTenant hook in journal-entries collection). The defense's rebuttal is TECHNICALLY CORRECT that tenant isolation IS maintained in practice — autoPopulateTenant executes and sets data.tenant from req.user.tenants[0].tenant, even with overrideAccess:true, because overrideAccess only bypasses ACCESS CONTROL checks, not hook/field processing. HOWEVER, this pattern violates the explicit-is-better-than-implicit principle and creates three maintenance risks: (1) The hook's ClosingEntryData interface (line 37-48) does not include a `tenant` field, making it impossible to extract tenant from the closing-entries document directly; the hook MUST rely on req.user context, (2) If autoPopulateTenant hook is ever removed or req.user.tenants[0] becomes empty, the entry persists without tenant (multiTenantPlugin's defaultValue from cookie provides a fallback, but this double-layering is fragile), (3) There is NO post-creation validation verifying that reversalJournalEntry.tenant was actually set (line 204 only captures ID). This is a partial defect: the code WORKS today but is architecturally fragile for financial double-entry integrity. The remedy is straightforward and low-effort.",
    "remedy": "Modify /Users/ceci/github/erpax/erpax/src/hooks/generateReversingEntries/index.ts to: (1) Update ClosingEntryData interface to include optional `tenant?: string | number` field (line 37-48), (2) Extract tenant from the closing-entries context or req.user.tenants[0] at the top of the hook (after line 68), (3) Explicitly add `tenant: tenantId` to the data object passed to payload.create() at line 190-199, (4) Add a post-creation assertion that tenant was set: `if (!reversalJournalEntry.tenant) throw new Error('Reversal entry created without tenant — tenant isolation violated')`. Example: After line 202, add `if (!reversalJournalEntry.tenant) { throw new Error(...) }`. This makes tenant assignment explicit and verifiable, eliminating the fragility while maintaining the same security properties."
  },
  {
    "id": "audit-trail-implicit-tenant-injection",
    "aspect": "security",
    "title": "auditTrailAfterChange hook relies on implicit tenant context from doc.tenant",
    "file": "/Users/ceci/github/erpax/erpax/src/hooks/auditTrailAfterChange/index.ts",
    "severity": "major",
    "verdict": "partial",
    "effort": "moderate",
    "disposition": "open",
    "reasoning": "The prosecution's core claim is PARTIALLY CONFIRMED with material caveats. \n\nCONFIRMED DEFECTS: (1) autoPopulateTenant (src/hooks/autoPopulateTenant/index.ts lines 18-27) does NOT validate pre-existing data.tenant values—it unconditionally overwrites with req.user.tenants[0].tenant if that exists, without checking whether data.tenant was already set to a different value. (2) If req.user.tenants is empty, autoPopulateTenant does nothing, leaving data.tenant as-is (null or wrong). (3) enforceDocumentTenantForUser is NOT in standardCollectionHooks (src/hooks/standardCollectionHooks/index.ts lines 35-37); it is only added to 4 collections (Posts, Pages, Categories, Media) out of 200+ using standardCollectionHooks. This means most collections do not validate that data.tenant ∈ req.user.tenants at beforeChange time.\n\nDEFENSE CLAIM REFUTED: The defense claims \"multiTenantPlugin.tenantField.defaultValue executes during the framework's field initialization phase—before any beforeValidate hook runs.\" This is factually incorrect. In Payload CMS, field defaultValue runs as part of validation AFTER beforeValidate hooks, not before. Therefore, it cannot serve as the \"defensible first line\" the defense alleges.\n\nACTUAL FAILURE SCENARIO: A request with data.tenant set to a tenant the user does not belong to could pass through autoPopulateTenant (if req.user.tenants is empty or doesn't match) and bypass enforceDocumentTenantForUser (if the collection doesn't explicitly add it). The document writes to the wrong tenant. auditTrailAfterChange then extracts tenantId from the wrongly-scoped doc (line 78: tenantId: tenantOf(doc)) and uses it in the Merkle chain (line 121: tenant: String(entry.tenantId)).\n\nPARTIAL MITIGATION: Line 96 in auditTrailAfterChange gates the durable audit row: `if (entry.tenantId !== null && entry.documentId !== null)`. This prevents null-tenant rows from being written. However, Channel 1 (streaming logger, lines 85-88) ALWAYS emits the entry regardless of tenantId. This preserves streaming evidence but breaks the durable, queryable audit-events collection for tenant-scoped auditor queries, violating ISO 19011:2018 §6.4.6 (completeness) and SOX §404 evidence preservation (evidence must be audit-scoped, not just streamed).",
    "remedy": "1. Add enforceDocumentTenantForUser as the first hook in standardCollectionHooks.beforeChange (after autoPopulateCreatedBy). 2. Modify autoPopulateTenant to validate: if data.tenant is already set, reject via apiErr if it is not in getUserTenantIDs(req.user); only overwrite with req.user.tenants[0] if data.tenant is undefined. 3. Remove the null-tenant gate in auditTrailAfterChange line 96 so that null-tenant and wrong-tenant audit events are written as sentinel rows with severity='warn', allowing auditors to detect scoping failures."
  },
  {
    "id": "aura-full-path-leaf-only-check",
    "aspect": "gates",
    "title": "Aura scan does not validate full wikilink paths, only leaf names",
    "file": ".claude/skills/aura/scan.mjs, line 54",
    "severity": "minor",
    "verdict": "partial",
    "effort": "trivial",
    "disposition": "open",
    "reasoning": "The prosecution correctly identifies a latent false-negative gap in aura's validation logic. The code comment at scan.mjs lines 51-52 explicitly promises aura validates \"exactly the docs build's resolveWiki\" for all wikilink patterns, including [[a/b]]. However, aura only validates the leaf component (last path segment) against the global slug map, while vitepress/config.mts resolveWiki line 123 validates the literal full path. For [[a/b]] patterns, these are fundamentally different validations: aura checks if 'b' exists as any root-level atom; vitepress checks if /a/b/SKILL.md exists in the actual source tree. This violates the stated design principle (scan.mjs line 52: \"a dead link here is a dead link there\"). The defense's plea that aura's scope is \"leaf-word validation by design\" contradicts scan.mjs's own comment claiming parity with resolveWiki. The defect is currently latent (gap=0 because corpus has zero full-path wikilinks) but the validation logic is broken for the pattern the code claims to support. Severity is minor because: (1) no full-path wikilinks exist in the corpus today, (2) the final arbiter (docs:build strict) will catch the error, and (3) this is a validation gap, not a security or data-loss issue.",
    "remedy": "Modify scan.mjs line 53-58 to add a second branch for full-path validation. When m[1].includes('/'), verify the literal path exists in the src/ tree before accepting it. Specifically: after line 54, check if m[1] contains '/'; if yes, check for existence of join(ROOT, m[1], 'SKILL.md'); if no, proceed with current leaf-word validation. This makes aura's two-branch logic (full-path literal + leaf-word fallback) mirror vitepress/config.mts lines 121-125 exactly."
  },
  {
    "id": "subscription-gates-mock-only",
    "aspect": "spec",
    "title": "Subscription gate tests use hand-crafted mocks, never load real schema",
    "file": "/Users/ceci/github/erpax/erpax/src/access/subscriptionGates.test.ts",
    "severity": "minor",
    "verdict": "partial",
    "effort": "trivial",
    "disposition": "open",
    "reasoning": "The prosecution's primary claim—that schema drift causes runtime failure—is rebutted: the mock provides all four fields the implementation actually uses (subscription.status, subscription.plan, plan.slug, plan.limits), and the implementation's defensive guards (type-guard at line 146 for plan union, JSON.parse safe-path at line 152, optional chaining at line 155) protect against the schema fields it exercises. The narrowness of the mock is intentional per test.ts lines 32 & 52, and tests/README.md lines 60-62 confirm CCCCC will auto-generate tests from @invariant tags, making hand-authored mocks transient. However, two defensible coverage gaps survive: (1) The JSON.parse path for plan.limits (schema allows string | object | unknown[] | number | boolean | null; tests only verify object) is never tested, so a malformed JSON string would fail in production silently. (2) The plan union case (schema allows string | SubscriptionPlan; tests only verify object) is never tested, so if the type-guard at line 146 regresses, tests won't catch it. These are test-completeness issues, not structural schema misalignment, and the implementation is defensive enough to survive both scenarios without runtime explosion.",
    "remedy": "Add two test cases to subscriptionGates.test.ts: (a) test plan.limits as a JSON string (e.g., mockSubscription({ plan: { slug: 'pro', limits: '{\\\"apiAccess\\\": true}' } })) to exercise the JSON.parse branch and verify correct feature access. (b) test subscription.plan as a string ID (e.g., mockSubscription({ plan: 'plan-id-string' })) to verify the type-guard at line 146 correctly denies access when plan is not an object. Both should be added to the 'checkFeatureAccess' or 'requireSubscriptionPlan' describe blocks."
  },
  {
    "id": "partyRoleAccess-override-user-roles-query",
    "aspect": "security",
    "title": "partyRoleAccess uses overrideAccess to query user-roles without explicit scoping",
    "file": "/Users/ceci/github/erpax/erpax/src/access/auth/index.ts",
    "severity": "minor",
    "verdict": "partial",
    "effort": "trivial",
    "disposition": "open",
    "reasoning": "PROSECUTION establishes the FACT: Lines 211-218 of /Users/ceci/github/erpax/erpax/src/access/auth/index.ts query user-roles with NO explicit tenant filter in the WHERE clause. The query returns ALL user-role assignments for a user across ALL tenants, because the user-roles collection (confirmed at /Users/ceci/github/erpax/erpax/src/collections/Roles/UserRoles/index.ts lines 1-53 and payload.config.ts) is intentionally global/unscoped. This is factually correct.\n\nDEFENSE rebuts with BY-DESIGN: The defense correctly cites /Users/ceci/github/erpax/erpax/src/standards/nist-incits-359/conventions.ts line 13 (\"Everyone else — anonymous reads, global roles, cross-tenant rules\"), confirming global roles are documented design. The defense also correctly identifies that tenant isolation is delegated to the final query predicate (line 237): `{ and: [{ tenant: { equals: user.tenant } }, { id: { in: memberOf } }] }`. This dual-filter is the STRUCTURAL CONTROL.\n\nAUDIT FINDING: The defense's claim of UUID uniqueness preventing cross-tenant leakage is SOUND. Evidence:\n- payload.config.ts lines 475-480: `idType: 'uuid'` → all documents get globally-unique UUID ids (confirmed)\n- database/SKILL.md line 26: \"collision-free merge\" is the explicit design purpose\n- A user-role in Tenant B points to a document with UUID that does NOT exist in Tenant A\n- The final query `{ id: { in: [TenantB_UUID] } } AND { tenant: { equals: 'A' } }` returns zero results by DB semantics, not by app logic\n\nVERDICT: The violation is NOT CRITICAL because the MATH is sound (UUIDs + AND logic = isolation). However, the design violates EXPLICIT STANDARDS CITED IN THE FILE itself:\n- Lines 4-12 cite ISO-27001 A.5.23 \"cloud-service-tenant-isolation\" \n- Line 8: \"@security ISO-27001 A.5.23 cloud-service-tenant-isolation\"\n- Standard practice for cloud-isolation is EXPLICIT SCOPING AT THE QUERY LAYER, not reliance on ID uniqueness at the application/data layer\n\nThe current design is:\n1. Query the user-roles collection globally (no tenant boundary at the retrieval layer)\n2. Filter in-app code (lines 220-235) to extract document IDs\n3. Apply tenant boundary ONLY at the final document query (line 237)\n\nThis is a LAYERED dependency: app-logic → database query. ISO-27001 A.5.23 and Payload plugin conventions (multiTenantPlugin) prefer SINGLE-layer, EXPLICIT tenant boundaries pushed into the query itself.\n\nREMEDIATION PATH: The design is defensible IF documented in a single place as intentional cross-tenant role lookup. The current doc-comment (lines 173-192) explains party-role duality but does NOT explain WHY user-roles are queried globally and WHY UUID-uniqueness is the actual isolation boundary. Future maintainers may \"refactor\" the query to add a tenant filter, breaking the UUID-uniqueness assumption without realizing it.",
    "remedy": "Add an explicit doc-comment in the partyRoleAccess function (line 194) explaining: (1) user-roles is intentionally a global collection (not tenant-scoped per design at conventions.ts:13), (2) the query at lines 211-218 deliberately omits a tenant filter because tenant isolation is delegated to the FINAL predicate (line 237), (3) the isolation relies on UUID uniqueness (payload.config.ts:480 idType: 'uuid'), and (4) this is safe because Payload generates globally-unique IDs and the final WHERE clause applies both tenant AND id filters. Example: /**\\n * Note: user-roles is global (not tenant-scoped per @standards nist-incits-359/conventions.ts:13).\\n * We query ALL user-roles for the acting user (no tenant boundary at retrieval), then filter\\n * document-scoped roles in-app. Tenant isolation is enforced at the final query (line 237):\\n * documents are filtered by BOTH tenant AND id membership. This is safe because Payload uses\\n * UUID ids (idType: 'uuid', globally unique per document) — a role from Tenant B references\\n * a document UUID that does not exist in Tenant A, so the AND query returns zero results.\\n * Isolation relies on: (1) UUID uniqueness (system guarantees), (2) explicit tenant filter at\\n * query time (line 237), (3) correct AND semantics (Payload framework guarantees).\\n */"
  },
  {
    "id": "orphan-aggregatetype-receipt",
    "aspect": "naming",
    "title": "Orphan aggregateType 'receipt' not declared in type union",
    "file": "/Users/ceci/github/erpax/erpax/src/services/sales/receipt-subscriber.ts",
    "severity": "minor",
    "verdict": "partial",
    "effort": "trivial",
    "disposition": "remediated",
    "remediatedIn": "8825221",
    "reasoning": "The defense successfully rebuts the orphan charge. The prosecution correctly identifies that 'receipt' is absent from the DomainEvent.aggregateType union at lines 22-30 and requires a cast. However, this is intentional by design: the event-emitter.service explicitly documents this pattern in lines 23-26, allowing non-union aggregateTypes to flow through. Additionally, sale-event.ts emits 'supto-sale' (also absent from the union) using the identical cast pattern. Notification-only events follow the same approach. Critically, the GL posting service and notification subscriber never discriminate by aggregateType union membership—they match only by eventType strings. The actual defect is architectural: the DomainEvent.aggregateType field is defined as a restrictive union when it should be a permissive string.",
    "remedy": "Change aggregateType from union literal to string at src/types/events/index.ts lines 22-30"
  },
  {
    "id": "legalentities-orphan-links",
    "aspect": "diamond",
    "title": "LegalEntities SKILL.md claims 15 orphan collection links that don't exist",
    "file": "/Users/ceci/github/erpax/erpax/src/collections/LegalEntities/SKILL.md",
    "severity": "none",
    "verdict": "dismissed",
    "effort": "none",
    "disposition": "dismissed",
    "reasoning": "All 15 collections claimed as orphans exist as nested directories under src/collections/LegalEntities/, have SKILL.md atoms, export CollectionConfig, and are indexed in skills.index.ts. The Diamond Law (matter ↔ antimatter ↔ backend) is satisfied: index.ts exports exist, SKILL.md Composes line declares them, and payload-types.ts recognizes them. Commit 72b975c explicitly documents this as 'containment' pattern (DebtSchedule/FiscalCalendars/TransferPricingFiles←LegalEntities). Prosecution's directory search was at root level only, missing the nested structure. This is a design feature, not a defect.",
    "remedy": "none"
  },
  {
    "id": "fixedassets-depreciation-orphan",
    "aspect": "diamond",
    "title": "FixedAssets SKILL.md claims DepreciationSchedules collection that doesn't exist",
    "file": "/Users/ceci/github/erpax/erpax/src/collections/FixedAssets/SKILL.md",
    "severity": "none",
    "verdict": "dismissed",
    "effort": "none",
    "disposition": "dismissed",
    "reasoning": "DepreciationSchedules collection exists in full at /Users/ceci/github/erpax/erpax/src/collections/FixedAssets/DepreciationSchedules/ with complete matter (index.ts 87 lines with @standard/@accounting/@audit/@compliance banners), antimatter (SKILL.md), and backend schema (DepreciationSchedule interface at payload-types.ts:6191, DepreciationSchedulesSelect at line 24541). The collection follows the project's nested subcollection architecture pattern (same as Leases→LeasePeriodPostings). Export at src/collections/index.ts:82 is correct. Registered in payload.config.ts at lines 105 and 544. The FixedAssets/SKILL.md line 24 Composes link [[DepreciationSchedules]] is a live, valid reference to a sibling collection. The Diamond Law (matter+antimatter+backend alignment) holds across all three planes. The initial finding was based on incomplete directory discovery—no defect exists.",
    "remedy": "none"
  },
  {
    "id": "justice-non-reciprocal",
    "aspect": "weave",
    "title": "justice←accounting is non-reciprocal (no Composes line)",
    "file": "/src/accounting/SKILL.md:73",
    "severity": "none",
    "verdict": "dismissed",
    "effort": "none",
    "disposition": "dismissed",
    "reasoning": "The prosecution alleges that justice/SKILL.md fails to reciprocate accounting's Composes declaration. However, the defense's rebuttal is grounded in the actual design law stated in commit 72b975c: \"reciprocal-hub links from a hub the orphan already declares.\" Justice (the orphan) declares its relationship to accounting (the hub) explicitly on line 8 via embedded prose reference: \"the public-order ([[accounting]] for society) ledger.\" Accounting (the hub) then reciprocates by adding [[justice]] to its Composes line (line 73), grounding the hub's declaration in the orphan's stated relation. This asymmetric pattern—orphan declares in prose, hub reciprocates in Composes—is intentional, consistent with the commit message and DRY principle, and passed gate validation (aura gap=0). The absence of a Composes line in justice is not a defect; it is the correct form per the design law. No bidirectional Composes declarations are required.",
    "remedy": "none"
  },
  {
    "id": "api-test-trivial",
    "aspect": "spec",
    "title": "API integration test has no failure assertions",
    "file": "/Users/ceci/github/erpax/erpax/src/payload.config.api.test.ts",
    "severity": "none",
    "verdict": "dismissed",
    "effort": "none",
    "disposition": "dismissed",
    "reasoning": "The prosecution conflates JSDoc @standard/@rfc banner semantics with test specification completeness. STANDARDS.md §1 (lines 10-12) explicitly establishes: \"Naming and JSDoc tags do NOT make an app ISO-compliant — compliance is a function of process, controls, and conformance to spec... What this taxonomy does give us: Discoverability, Drift detection, Audit traceability, Onboarding.\" The @standard/@rfc tags mark scope and discoverability, not comprehensive coverage guarantees. The test file declares \"API Integration Tests — Payload CMS Local API end-to-end\" (line 2) and its scope is to verify getPayload() initialization and basic connectivity — a smoke test. The codebase contains multiple test suites (e.g., payload.config.multi-tenant-admin.test.ts, 424 lines) that also declare ISO/IEC-29119:2022 but with different scope (access control), proving multiple test levels coexist under the same standard banner. The prosecution's evidence (that the test lacks assertions on error codes, validation, and access controls) correctly describes the test's narrow scope but mischaracterizes it as \"material defect\" or \"spec non-compliance\" when the test's declared purpose does not include those behavioral paths. No error-path assertions are required for a structural smoke test whose purpose is to verify SDK initialization.",
    "remedy": "none"
  },
  {
    "id": "bypass-tenant-scoping-rolebasedaccess",
    "aspect": "security",
    "title": "roleBasedAccess returns boolean true, bypassing tenant filtering",
    "file": "/Users/ceci/github/erpax/erpax/src/access/roleBasedAccess/index.ts",
    "severity": "none",
    "verdict": "dismissed",
    "effort": "none",
    "disposition": "dismissed",
    "reasoning": "The prosecution's claim that `roleBasedAccess` returns boolean and thereby bypasses Payload's multi-tenant plugin tenant filtering is technically INCORRECT based on Payload's actual multi-tenant plugin architecture. The plugin README (line 43) explicitly documents `useBaseFilter?: boolean` (default: true) as a separate mechanism from Access control. The erpax payload.config.ts does not override these defaults, meaning BOTH `useBaseFilter: true` and `useTenantAccess: true` are active. According to Payload's plugin documentation, the baseFilter mechanism applies tenant filtering at the database query level INDEPENDENTLY of whether Access predicates return boolean or Where clauses. The plugin \"merges your access control result with a constraint based on tenants...within an AND condition\" (README line 183), but this is a separate composition from the baseFilter. Since baseFilter is enabled by default and not disabled in any collection config in payload.config.ts (all collections use `{}`), the multi-tenant plugin WILL automatically apply `{ tenant: <userTenant> }` WHERE filtering at query time, regardless of whether the Access predicate returns `true` or a Where clause. The evidence shows: (1) roleBasedAccess correctly returns boolean (lines 19-34 of src/access/roleBasedAccess/index.ts); (2) 46 uses of roleBasedAccess are registered with multiTenantPlugin with default config; (3) Users/access/read.ts already demonstrates that returning bare `true` from Access predicates is acceptable within this architecture (lines 30, 40); (4) Payload's plugin architecture provides baseFilter as the load-bearing tenant isolation mechanism, NOT the Access predicate return type. The prosecution mischaracterizes how the multi-tenant plugin works by conflating Access predicate return types with the plugin's baseFilter mechanism.",
    "remedy": "none"
  },
  {
    "id": "underscore-casing-event-types",
    "aspect": "naming",
    "title": "Underscore naming in aggregateType union breaks canonical resolver norm",
    "file": "/Users/ceci/github/erpax/erpax/src/types/events/index.ts",
    "severity": "none",
    "verdict": "dismissed",
    "effort": "none",
    "disposition": "dismissed",
    "reasoning": "The prosecution misapplies the dimension law. The law (src/fields/dimension/SKILL.md line 22) explicitly targets \"prefixed collections\" (bank-transactions, supto-sales) and \"baking a dimension into a name\" in ENTITY storage layouts (monthlyUSD). The aggregateType union (src/types/events/index.ts lines 26–30) is neither: it is a domain-event wire-protocol discriminator in immutable event contracts, persisted across 89 call sites (bank-statement.hook.ts line 119, scripts/backfill-chain-producers.ts COLLECTION_AGG map). The dimension law governs entity coordinates and field axes, not event-type enums. Entity collection names correctly follow the one-word rule (invoice, bill, payment, order). Event aggregates (bank_statement, inventory_transfer, fixed_asset) use underscores as standard DDD event-sourcing practice to disambiguate compound concepts in wire format. Renaming would break audit-log replay (event-sourcing immutability). The defense correctly distinguishes collection-level dimension collapse from event-envelope typing.",
    "remedy": "none"
  }
]
