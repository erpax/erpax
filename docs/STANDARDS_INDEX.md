# Standards citation index (generated)

> **Generated.** Do not edit by hand. Regenerate with
> `pnpm standards:write-index`. CI verifies this file is fresh via
> `pnpm standards:verify-index`.
>
> Source of truth: the JSDoc banners in code. This file is the
> materialised output of `bash scripts/standards-citation-index.sh`.

## @standard

```text
Binary file src/anti/corruption/cross-entity.ts matches
Binary file src/voting/index.ts matches
src/accounting/fields-money-fix.ts:10: * @standard IEEE-754-2019 binary-floating-point avoid-for-money
src/accounting/fields-money-fix.ts:9: * @standard ISO-4217:2015 currency-codes
src/accounting/financial-analysis.ts:8: * @standard ISO-4217:2015 currency-codes
src/accounting/financial-analysis.ts:9: * @standard ISO-8601-1:2019 date-time as-of-date
src/accounting/reports.service.ts:24: * @standard ISO-4217:2015 currency-codes
src/accounting/reports.service.ts:25: * @standard ISO-8601-1:2019 date-time as-of-date period
src/activities/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/activities/index.ts:9: * @standard rfc-5545 icalendar
src/address/validation/index.ts:16: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/address/validation/index.ts:17: * @standard UPU-S42 international-postal-addressing
src/address/validation/index.ts:18: * @standard ISO-3166-1:2020 country-codes alpha-2
src/admin/TenantFilters.tsx:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/admin/TenantFilters.tsx:5: * @standard ISO-3166-1:2020 country-codes filter-vocab
src/admin/TenantManagement.tsx:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/admin/bar/index.tsx:6: * @standard W3C HTML5 nav-element
src/admin/bar/index.tsx:7: * @standard WAI-ARIA 1.2 toolbar-role
src/agent/blocks.ts:38: * @standard W3C Web Components (composition pattern)
src/agent/blocks.ts:39: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
src/agent/bootstrap.ts:11: * @standard ISO/IEC 25010:2023 §5.4 reusability (single-source-of-truth registry)
src/agent/coil.ts:15: * @standard ISO/IEC 25010:2023 §5.4 reusability (single shared society per tenant)
src/agent/context.ts:23: * @standard ISO/IEC 25010:2023 §5.4 reusability (single-source-of-truth context)
src/agent/context.ts:24: * @standard ISO/IEC 12207 software-life-cycle (one substrate seam)
src/agent/effect-processor.test.ts:6: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agent/effect-processor.ts:25: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
src/agent/effect-processor.ts:26: * @standard ISO/IEC 12207 software-life-cycle (single substrate seam)
src/agent/harmonics.ts:24: * @standard NIST FIPS 180-4 sha-256 (the content-uuid digest)
src/agent/index.ts:15: * @standard ISO/IEC 25010:2023 §5.4 modularity
src/agent/index.ts:16: * @standard RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)
src/agent/memory-writer.ts:26: * @standard ISO 19011:2018 §6.4.6 audit-evidence (per-cycle history)
src/agent/population.ts:17: * @standard ISO/IEC 25010 §5.5 testability + §5.8 resource-utilisation (bounded)
src/agent/registry.test.ts:5: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agent/registry.ts:13: * @standard ISO/IEC 25010:2023 §5.4 reusability
src/agent/registry.ts:14: * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
src/agent/research/index.ts:21: * @standard RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)
src/agent/runtime.test.ts:6: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agent/runtime.ts:9: * @standard ISO/IEC 25010:2023 §5.4 reusability
src/agent/service.ts:20: * @standard RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)
src/agent/sync/chat-broadcast.ts:22: * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
src/agent/sync/chat-broadcast.ts:23: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
src/agent/sync/discovery.ts:19: * @standard W3C ActivityPub server-to-server activity-distribution (the model)
src/agent/sync/discovery.ts:20: * @standard RFC 9562 §5.8 content-uuid contribution-identity (the merge key)
src/agent/sync/horo.ts:27: * @standard W3C ActivityPub server-to-server activity-distribution (the model)
src/agent/sync/horo.ts:28: * @standard RFC 9562 §5.8 content-uuid team identity (the room presence)
src/agent/sync/horo.ts:29: * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
src/agent/sync/index.ts:15: * @standard W3C ActivityPub server-to-server activity-distribution (the model)
src/agent/sync/index.ts:16: * @standard RFC-6455 websocket
src/agent/sync/index.ts:17: * @standard RFC-4122 §4.3 content-uuid event-identity (idempotency key)
src/agent/sync/index.ts:52: * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
src/agent/sync/payload-chat.ts:20: * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
src/agent/sync/payload-chat.ts:21: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
src/agent/sync/society.ts:21: * @standard W3C ActivityPub server-to-server activity-distribution (the model)
src/agent/sync/society.ts:22: * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
src/agent/sync/society.ts:23: * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
src/agent/sync/training-broadcast.ts:19: * @standard SFIA 8 responsibility-levels (the level → M-value depth)
src/agent/sync/training-broadcast.ts:20: * @standard ISO 30405:2016 essential-vs-desirable (mandatory gates the surface)
src/agent/team.ts:17: * @standard RFC 9562 §5.8 content-addressed identity (agent + team uuid)
src/agent/types.test.ts:9: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agent/types.ts:14: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
src/agent/types.ts:15: * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
src/agents/accounting/finance.agent.test.ts:8: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agents/accounting/finance.agent.ts:17: * @standard IFRS IFRS-15 §38 point-in-time-control-transfer
src/agents/accounting/finance.agent.ts:18: * @standard IFRS IAS-7 statement-of-cash-flows
src/agents/accounting/finance.agent.ts:19: * @standard SOX §404 process-walk-through-controls
src/agents/mcp/atom-catalogue.generated.ts:9: * @standard MCP 0.6 tools/list (skill projection)
src/agents/mcp/auto-generated.ts:43: * @standard MCP 0.6 — tools/list (auto-generation extension)
src/agents/mcp/auto-generated.ts:44: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
src/agents/mcp/dry-clean.test.ts:15: * @standard ISO/IEC 25010:2023 §5.4 reusability (DRY by detection)
src/agents/mcp/dry-clean.ts:30: * @standard ISO/IEC 25010:2023 §5.4 reusability — DRY by detection
src/agents/mcp/dry-clean.ts:31: * @standard ISO/IEC 25010:2023 §5.7 modularity
src/agents/mcp/i18n.test.ts:13: * @standard BCP-47 — language tag region stripping
src/agents/mcp/i18n.test.ts:14: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/agents/mcp/i18n.ts:32: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/agents/mcp/i18n.ts:33: * @standard ECMA-402 internationalization-api
src/agents/mcp/i18n.ts:34: * @standard BCP-47 language tags
src/agents/mcp/i18n.ts:35: * @standard EU 1958/1 official-languages-of-the-european-union
src/agents/mcp/in-process-client.test.ts:15: * @standard MCP 0.6 (tools/list + tools/call)
src/agents/mcp/in-process-client.test.ts:16: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agents/mcp/in-process-client.ts:10: * @standard MCP 0.6 — Model Context Protocol tools/list + tools/call
src/agents/mcp/in-process-client.ts:11: * @standard ISO/IEC 25010:2023 §5.4 reusability
src/agents/mcp/presentation.ts:33: * @standard W3C JSON-LD 1.1 + Schema.org Action vocabulary
src/agents/mcp/presentation.ts:34: * @standard W3C Microdata 1.1 + Open Graph protocol + Twitter Cards
src/agents/mcp/presentation.ts:35: * @standard MCP 0.6 — tools/list (presentation extension)
src/agents/mcp/prompt-defs.ts:8: * @standard MCP 0.6 — Model Context Protocol prompts/list + prompts/get
src/agents/mcp/rebuild-from-source.ts:35: * @standard MCP 0.6 — tools/list (rebuild extension)
src/agents/mcp/rebuild-from-source.ts:36: * @standard ISO/IEC 25010:2023 §5.5 testability + §5.7 modularity
src/agents/mcp/rebuild-from-source.ts:37: * @standard JSDoc-as-spec (slice CCCCC)
src/agents/mcp/resource-defs.ts:8: * @standard MCP 0.6 — Model Context Protocol resources/list + resources/read
src/agents/mcp/self-test.ts:32: * @standard MCP 0.6 — tools/list (self-test extension)
src/agents/mcp/self-test.ts:33: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agents/mcp/self-test.ts:34: * @standard ISO/IEC/IEEE 29119-2 — software testing process
src/agents/mcp/standardization.ts:26: * @standard MCP 0.6 — tools/list naming convention
src/agents/mcp/standardization.ts:27: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
src/agents/mcp/standardization.ts:28: * @standard W3C JSON-LD 1.1 — typed tool manifests
src/agents/mcp/state-mutators.test.ts:19: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agents/mcp/tool-defs.ts:26: * @standard MCP 0.6 — Model Context Protocol (tools/list + tools/call
src/agents/mcp/tool-defs.ts:28: * @standard MCP 0.6 — tools/list naming convention (§1 of mcp.md)
src/agents/mcp/tool-defs.ts:29: * @standard MCP 0.6 — tools/call result shape `{content:[{type,text}]}`
src/agents/mcp/tool-defs.ts:30: * @standard RFC 8259 — JSON (every tool emits JSON-encoded text)
src/agents/mcp/tool-defs.ts:31: * @standard W3C JSON-LD 1.1 (tool descriptions + standards bundles)
src/agents/mcp/tool-defs.ts:32: * @standard W3C JSON Schema draft 2020-12 (Zod parameters bridge)
src/agents/mcp/tool-defs.ts:33: * @standard ISO/IEC 25010:2023 §5.3 usability (discoverability),
src/agents/mcp/tool-defs.ts:36: * @standard ISO 19011:2018 §6.4.6 (audit-evidence — every tool
src/agents/mcp/tool-defs.ts:39: * @standard ISO/IEC 27001 §A.9.4.5 (information access restriction
src/agents/mcp/tool/_guards.test.ts:27: * @standard ISO/IEC 25010:2023 §5.5 testability
src/agents/mcp/tool/_guards.ts:114: * @standard ISO 27001 A.5.10 access-control-policy
src/agents/mcp/tool/_guards.ts:32: * @standard ISO 27001 A.5.10 access-control-policy
src/agents/mcp/tool/_guards.ts:33: * @standard ISO 27002 §5.4 segregation-of-duties (per-tenant boundary)
src/agents/mcp/tool/_guards.ts:34: * @standard NIST SP 800-162 ABAC
src/agents/mcp/tool/batch.ts:19: * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
src/agents/mcp/tool/batch.ts:20: * @standard ISO 19011:2018 §6.4.6 audit-evidence (per-row ok/error summary)
src/agents/mcp/tool/batch.ts:21: * @standard ISO/IEC 27002 §5.4 segregation-of-duties (admin-gated bulk mutation)
src/agents/mcp/tool/chain.ts:14: * @standard MCP 0.6 + ISO/IEC 23257-1 blockchain reference architecture
src/agents/mcp/tool/cloudflare.ts:8: * @standard ISO 27001 A.5.23 cloud-service-tenant-isolation
src/agents/mcp/tool/consistency.ts:20: * @standard ISO/IEC 25010:2023 §5.7 modularity
src/agents/mcp/tool/error.ts:13: * @standard MCP 0.6
src/agents/mcp/tool/events.ts:8: * @standard ISO 19011:2018 §6.4.6 audit-evidence (event-graph traceability)
src/agents/mcp/tool/format.ts:13: * @standard RFC 9562 §5.8 uuidv8 + RFC 9562 §4.1 variant
src/agents/mcp/tool/format.ts:14: * @standard MCP 0.6
src/agents/mcp/tool/governance.ts:11: * @standard W3C DID Core 1.0 + W3C VC Data Model 2.0
src/agents/mcp/tool/index.ts:15: * @standard ISO/IEC 25010:2023 §5.7 modularity
src/agents/mcp/tool/integrity-extensions.ts:18: * @standard MCP 0.6 tools/list + tools/call
src/agents/mcp/tool/kv.ts:19: * @standard MCP 0.6 tools/list + tools/call
src/agents/mcp/tool/security.ts:17: * @standard ISO/IEC 27001 Annex A.14.2.5 secure-systems-engineering
src/agents/mcp/tool/security.ts:18: * @standard NIST SP 800-160 §3.4.2 trustworthy secure design
src/agents/mcp/tool/share.ts:13: * @standard NIST SP 800-162 ABAC
src/agents/mcp/tool/share.ts:14: * @standard MCP 0.6 tools/list + tools/call
src/agents/mcp/tool/versions.ts:22: * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
src/agents/mcp/tool/versions.ts:23: * @standard ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)
src/agents/registered/consistency.agent.ts:22: * @standard ISO/IEC 25010:2023 §5.7 modifiability (self-modifying with audit)
src/agents/registered/data.agent.ts:5: * @standard ISO 20022 + ECB FX-rates
src/agents/registered/design.agent.ts:6: * @standard WCAG 2.2 + WAI-ARIA 1.2 + ISO 9241-110 dialogue-principles
src/agents/registered/engineering.agent.ts:5: * @standard SOX §404 + ISO 19011:2018 §6.4.6 + COSO 2013
src/agents/registered/hr.agent.ts:5: * @standard ISO IAS-19 employee-benefits + IAS-26 retirement-benefits
src/agents/registered/hr.training.ts:19: * @standard SFIA 8 responsibility-levels (the level → M-value depth)
src/agents/registered/legal.agent.ts:5: * @standard GDPR Art-7 consent + Art-15 access + Art-17 erasure
src/agents/registered/legal.agent.ts:6: * @standard eIDAS qualified-trust-services
src/agents/registered/legal.conflict.ts:19: * @standard ISO 19011 — the verdict is a deterministic function of the party graph
src/agents/registered/marketing.agent.ts:5: * @standard GDPR consent-tracking @feature marketing
src/agents/registered/ops.agent.ts:5: * @standard ISO 41001 facility-management + ISO 55000 asset-management
src/agents/registered/product.agent.ts:5: * @standard PMI PMBOK 7th-edition project-management
src/agents/registered/sales.agent.ts:5: * @standard IFRS IFRS-15 §9 contract-with-customer
src/agriculture/accountable.ts:21: * @standard IFRS IAS-41 §13 — harvest: biological asset → inventory at fair-value-less-costs-to-sell
src/agriculture/accountable.ts:22: * @standard IFRS 15 — revenue recognized as the performance obligation is satisfied (prepay → delivered)
src/agriculture/accountable.ts:23: * @standard IFRS IAS-21 — foreign-exchange differences recognized in P&L on settlement/re-measurement
src/agriculture/accountable.ts:24: * @standard IFRS/IAS double-entry — every movement is a balanced pair, Σ(credit − debit) = 0
src/ai/ai-security.ts:153: * @standard NIST FIPS-180-4 sha-256
src/ai/ai-security.ts:154: * @standard ISO 27037:2012 evidence-preservation
src/ai/ai-security.ts:17: * @standard NIST FIPS-180-4 sha-256 audit-row-hash
src/ai/ai-security.ts:18: * @standard ISO 27037:2012 evidence-preservation
src/ai/anomaly-detection.ts:11: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/audit-summarisation.ts:10: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/bank-matching.ts:12: * @standard ISO 20022 camt.053 §Ntry.RmtInf.Ustrd
src/ai/bank-matching.ts:13: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/cache-vote.ts:16: * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
src/ai/cloudflare-ai.ts:42: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/cloudflare-ai.ts:43: * @standard ISO/IEC 42001:2023 ai-management-system
src/ai/cloudflare-ai.ts:44: * @standard NIST AI-RMF-1.0 ai-risk-management-framework
src/ai/cloudflare-ai.ts:45: * @standard NIST FIPS-180-4 sha-256 audit-row-hash
src/ai/cloudflare-ai.ts:46: * @standard ISO 27037:2012 evidence-preservation
src/ai/document-classification.ts:10: * @standard WCAG 2.1 AA (alt-text on classified images)
src/ai/document-classification.ts:9: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/durable-objects.ts:174: * @standard FIPS 180-4 sha-256 (leaf hashing)
src/ai/durable-objects.ts:175: * @standard RFC 8785 JSON canonicalization
src/ai/durable-objects.ts:17: * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation
src/ai/embed-document.ts:12: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/hs-code-suggestion.ts:8: * @standard WCO HS Convention 2022 harmonised-commodity-description-and-coding-system
src/ai/hs-code-suggestion.ts:9: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/index.ts:9: * @standard ISO/IEC 42001:2023 ai-management-system
src/ai/invoice-ocr.ts:11: * @standard EN-16931:2017 semantic-invoice-model
src/ai/invoice-ocr.ts:12: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/models/index.ts:17: * @standard EU AI Act 2024 risk-classification + transparency
src/ai/models/index.ts:18: * @standard RFC-4122 §4.3 uuid (content-addressed model identity)
src/ai/models/service.ts:20: * @standard EU AI Act 2024 risk-classification + transparency
src/ai/sanctions-screening.ts:13: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/sanctions-screening.ts:14: * @standard FATF R.7 sanctions-screening-obligations
src/ai/sanctions-screening.ts:15: * @standard FATF R.12 politically-exposed-persons
src/ai/semantic-search.ts:10: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/suggestions/index.ts:17: * @standard rfc-9562 uuid suggestion-id
src/ai/suggestions/index.ts:18: * @standard ISO-8601-1:2019 date-time inference-time
src/ai/suggestions/index.ts:19: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/suggestions/index.ts:20: * @standard ISO/IEC 42001:2023 ai-management-system
src/ai/suggestions/index.ts:21: * @standard NIST AI-RMF-1.0 ai-risk-management-framework
src/ai/tax-classification.ts:10: * @standard UN/CEFACT 5305 duty-tax-fee-category-coded
src/ai/tax-classification.ts:11: * @standard ISO/IEC 23894:2023 ai-risk-management
src/ai/tax-classification.ts:9: * @standard EN-16931:2017 §BT-151 invoiced-item-vat-category-code
src/allocation/index.ts:43: * @standard SFIA 8 responsibility-levels (1..7) — job-type categorisation
src/allocation/index.ts:44: * @standard ESCO / ISCO-08 competency framework (skill level)
src/allocation/index.ts:45: * @standard Hamilton (largest-remainder) apportionment — integer fair division
src/analytics/BudgetVsActualCard.tsx:10: * @standard ECMA-262 ECMAScript-2024 baseline
src/analytics/BudgetVsActualCard.tsx:11: * @standard ISO-4217:2015 currency-codes monetary-display
src/analytics/CostAnalysisCard.tsx:10: * @standard ECMA-262 ECMAScript-2024 baseline
src/analytics/FinancialRatiosCard.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/analytics/KPIDashboard.tsx:10: * @standard ISO-4217:2015 currency-codes monetary-display
src/analytics/KPIDashboard.tsx:9: * @standard ECMA-262 ECMAScript-2024 baseline
src/analytics/TrendAnalysisCard.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/analytics/TrendAnalysisCard.tsx:9: * @standard ISO-8601-1:2019 date-time period
src/analytics/index.ts:16: * @standard ISO/IEC-25010:2023 quality model — a computed read-out across quality aspects
src/analytics/max-tamper-cost.test.ts:6: * @standard ISO/IEC-29119:2022 software testing (computed invariant)
src/analytics/max-tamper-cost.ts:14: * @standard NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2
src/analytics/test.ts:7: * @standard ISO/IEC-29119:2022 software testing (computed invariants, full-aspect coverage)
src/analytics/types.ts:14: * @standard ISO-4217:2015 currency-codes monetary-amount-display
src/analytics/types.ts:15: * @standard ISO-8601-1:2019 date-time as-of-date
src/anchor/index.ts:14: * @standard RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422
src/anchor/index.ts:15: * @standard NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)
src/anchoring/index.ts:27: * @standard W3C Verifiable Credentials Data Model 2.0
src/anchoring/index.ts:28: * @standard ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)
src/anchoring/index.ts:29: * @standard RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors
src/api/audit/events/index.ts:22: * @standard ISO-19011:2018 audit-trail external-system-evidence
src/api/audit/events/index.ts:23: * @standard ISO/IEC-27007:2020 isms-auditing
src/app/(api)/api/subscriptions/create/route.ts:5: * @standard ISO-4217:2015 currency-codes
src/app/(api)/api/webhooks/stripe/route.ts:7: * @standard HMAC-SHA256 stripe-signature-scheme
src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts:4: * @standard sitemaps.org 0.9 sitemap-protocol
src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts:5: * @standard W3C XML 1.0
src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts:9: * @standard ISO-8601-1:2019 date-time lastmod
src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts:4: * @standard sitemaps.org 0.9 sitemap-protocol
src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts:5: * @standard W3C XML 1.0
src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts:9: * @standard ISO-8601-1:2019 date-time lastmod
src/app/(frontend)/[locale]/[slug]/page.tsx:4: * @standard schema.org WebPage
src/app/(frontend)/[locale]/[slug]/page.tsx:5: * @standard W3C HTML5 Living Standard
src/app/(frontend)/[locale]/[slug]/page.tsx:6: * @standard Open-Graph Protocol metadata
src/app/(frontend)/[locale]/layout.tsx:10: * @standard W3C HTML5 lang-attribute
src/app/(frontend)/[locale]/layout.tsx:5: * @standard BCP-47 language-tag
src/app/(frontend)/[locale]/layout.tsx:8: * @standard ECMA-402 internationalization-api
src/app/(frontend)/[locale]/layout.tsx:9: * @standard Unicode-CLDR locale-data
src/app/(frontend)/[locale]/not-found.tsx:5: * @standard schema.org WebPage
src/app/(frontend)/[locale]/not-found.tsx:6: * @standard BCP-47 language-tag
src/app/(frontend)/[locale]/page.tsx:4: * @standard schema.org WebSite
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:4: * @standard schema.org Article
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:5: * @standard schema.org BlogPosting
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:6: * @standard Open-Graph Protocol article-metadata
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:7: * @standard ISO-8601-1:2019 date-time published-at
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:8: * @standard BCP-47 language-tag
src/app/(frontend)/[locale]/posts/page.tsx:4: * @standard schema.org Blog
src/app/(frontend)/[locale]/posts/page.tsx:5: * @standard schema.org CollectionPage
src/app/(frontend)/[locale]/posts/page.tsx:6: * @standard schema.org ItemList
src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx:4: * @standard schema.org CollectionPage
src/app/(frontend)/[locale]/products/[slug]/page.tsx:4: * @standard schema.org Product
src/app/(frontend)/[locale]/products/[slug]/page.tsx:5: * @standard schema.org Offer
src/app/(frontend)/[locale]/products/[slug]/page.tsx:6: * @standard ISO-4217:2015 currency-codes
src/app/(frontend)/[locale]/products/[slug]/page.tsx:7: * @standard GS1 GTIN global-trade-item-number
src/app/(frontend)/[locale]/products/page.tsx:4: * @standard schema.org Product
src/app/(frontend)/[locale]/products/page.tsx:5: * @standard schema.org ItemList
src/app/(frontend)/[locale]/products/page.tsx:6: * @standard ISO-4217:2015 currency-codes price
src/app/(frontend)/[locale]/products/page.tsx:7: * @standard GS1 GTIN global-trade-item-number
src/app/(frontend)/[locale]/search/page.tsx:4: * @standard schema.org SearchResultsPage
src/app/(frontend)/[locale]/search/page.tsx:5: * @standard schema.org SearchAction
src/app/(frontend)/layout.tsx:4: * @standard W3C HTML5 Living Standard
src/app/(frontend)/layout.tsx:5: * @standard W3C CSS Living Standard
src/app/(frontend)/layout.tsx:6: * @standard schema.org WebSite
src/app/(frontend)/layout.tsx:7: * @standard BCP-47 language-tag html-lang-attribute
src/app/(frontend)/next/coherence/route.ts:31: * @standard DSP rPPG green-channel pulse extraction (0.7..4 Hz)
src/app/(frontend)/next/preview/route.ts:9: * @standard HMAC-SHA256 RFC 2104 preview-secret
src/app/(frontend)/next/seed/route.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control admin-only
src/app/(frontend)/next/system/health/route.ts:8: * @standard draft-inadarei-api-health-check health-check-response-format
src/app/(frontend)/not-found.tsx:5: * @standard schema.org WebPage
src/app/(frontend)/tenant-domains/[tenant]/[...slug]/page.tsx:4: * @standard schema.org WebPage
src/app/(frontend)/tenant-domains/layout.tsx:6: * @standard BCP-47 language-tag
src/app/(frontend)/tenant-slugs/[tenant]/[...slug]/page.tsx:4: * @standard schema.org WebPage
src/app/(frontend)/tenant-slugs/layout.tsx:6: * @standard BCP-47 language-tag
src/app/my-route/route.ts:6: * @standard OpenAPI 3.1 api-description
src/architecture/invariant/by-agent.ts:43: * @standard ISO/IEC 25010:2023 §5.2 performance — selective
src/architecture/invariant/by-agent.ts:45: * @standard ISO 19011:2018 §6.4.6 (per-agent law audit-trailed)
src/architecture/invariant/checks.ts:1033: * @standard EN-16931:2017 semantic-data-model-electronic-invoice
src/architecture/invariant/checks.ts:1034: * @standard ISO 19011:2018 §6.4.6 audit-evidence
src/architecture/invariant/checks.ts:1233: * @standard ISO 19011:2018 §6.4 audit-evidence
src/architecture/invariant/checks.ts:1261: * @standard ISO/IEC 25010:2023 performance-efficiency
src/architecture/invariant/checks.ts:1262: * @standard SQL-92 §5.4 indexing-strategy
src/architecture/invariant/checks.ts:1313: * @standard rfc-5545 icalendar-cron
src/architecture/invariant/checks.ts:1362: * @standard NIST FIPS-180-4 sha-256
src/architecture/invariant/checks.ts:1363: * @standard ISO 27037:2012 evidence-preservation
src/architecture/invariant/checks.ts:144: * @standard ISO 37000:2021 governance-of-organizations
src/architecture/invariant/checks.ts:1472: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:1505: * @standard BCP-47 + W3C i18n key-naming-best-practices
src/architecture/invariant/checks.ts:1541: * @standard ISO/IEC 12207 software-life-cycle (event graph
src/architecture/invariant/checks.ts:1574: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:1591: * @standard RFC 9562 + RFC 8785 + NIST FIPS 180-4
src/architecture/invariant/checks.ts:1646: * @standard RFC 9562 §5.8 + RFC 8785
src/architecture/invariant/checks.ts:1682: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:1708: * @standard RFC 9562 §5.8 + RFC 8785
src/architecture/invariant/checks.ts:1745: * @standard Schema.org JSON-LD 1.1 + Open Graph + Microdata 1.1
src/architecture/invariant/checks.ts:1773: * @standard W3C VC Data Model 2.0 + RFC 8785 + Law 8 (RRRRR)
src/architecture/invariant/checks.ts:181: * @standard ISO/IEC 25010:2023 §5 modularity — one atom = one folder
src/architecture/invariant/checks.ts:2105: * @standard W3C JSON-LD 1.1 + Schema.org Action
src/architecture/invariant/checks.ts:2132: * @standard MCP 0.6 — tools/list naming convention
src/architecture/invariant/checks.ts:2163: * @standard ISO 27001 A.5.10 access-control-policy
src/architecture/invariant/checks.ts:2237: * @standard MCP 0.6 — tools/list naming convention
src/architecture/invariant/checks.ts:2417: * @standard Lamport 1978 — distributed-system causal ordering
src/architecture/invariant/checks.ts:2452: * @standard W3C Web Components composition pattern
src/architecture/invariant/checks.ts:2521: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:2581: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:2617: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:2757: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:2803: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/architecture/invariant/checks.ts:2862: * @standard ISO 27001:2022 A.5.10 access-control-policy
src/architecture/invariant/checks.ts:2863: * @standard ISO 27002:2022 §5.4 segregation-of-duties
src/architecture/invariant/checks.ts:2864: * @standard ISO 19011:2018 §6.4.6 audit-evidence
src/architecture/invariant/checks.ts:2926: * @standard ISO 27001 A.5.15 access-control
src/architecture/invariant/checks.ts:2927: * @standard ISO 27002 §5.4 segregation-of-duties (TypeScript-enforced)
src/architecture/invariant/checks.ts:3032: * @standard ISO 27001 A.5.23 cloud-service-tenant-isolation
src/architecture/invariant/checks.ts:3033: * @standard ISO 27002 §5.4 segregation-of-duties (single-surface audit)
src/architecture/invariant/checks.ts:3249: * @standard ISO/IEC 25010:2023 §5.4 modularity — locality of reference
src/architecture/invariant/checks.ts:3322: * @standard ISO/IEC 25010:2023 §5 modularity — naming uniformity (one word)
src/architecture/invariant/checks.ts:3390: * @standard ISO/IEC 25010:2023 §5 modularity — naming uniformity
src/architecture/invariant/checks.ts:3435: * @standard ISO/IEC 25010:2023 §5.4 modularity — every unit connected
src/architecture/invariant/checks.ts:736: * @standard ISO 27002:2022 §5.4 + COBIT 5 PO4.11 + ISO 19011 §6.4.6
src/architecture/invariant/checks.ts:753: * @standard ISO 27002:2022 §5.4 segregation-of-duties
src/architecture/invariant/checks.ts:754: * @standard COBIT 5 PO4.11
src/architecture/invariant/checks.ts:814: * @standard ISO/IEC 25010:2023 §5 modularity-and-maintainability
src/architecture/invariant/checks.ts:908: * @standard ISO/IEC 25012:2008 §4 data-quality accuracy-and-consistency
src/architecture/invariant/checks.ts:966: * @standard ISO 19011:2018 §6.4 audit-evidence
src/architecture/invariant/checks.ts:967: * @standard IFRS Foundation issued-standards-as-of-2026-05
src/architecture/invariant/index.ts:20: * @standard ISO/IEC 25010:2023 quality-model
src/architecture/invariant/onInit.ts:20: * @standard ISO/IEC 25010:2023 reliability-fault-tolerance
src/architecture/invariant/trinity.ts:51: * @standard ISO/IEC 25010:2023 §5.4 reusability — generator sets
src/architecture/invariant/trinity.ts:52: * @standard W3C JSON-LD 1.1 — typed law manifests
src/architecture/invariant/types.ts:27: * @standard ISO/IEC 25010:2023 functional-suitability + reliability
src/archival/index.ts:10: * @standard Filecoin storage proofs (Spacegap / Spacetime)
src/archival/index.ts:8: * @standard W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid
src/archival/index.ts:9: * @standard Arweave Pay-Once-Store-Forever
src/audit/compliance/reporting/index.ts:13: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/audit/compliance/reporting/index.ts:14: * @standard OECD Transfer Pricing Guidelines:2022 Documentation
src/audit/compliance/reporting/index.ts:15: * @standard IAS-1:2023 Presentation of Financial Statements
src/audit/compliance/reporting/index.ts:16: * @standard BEPS Action 13:2021 Transfer Pricing Documentation
src/audit/compliance/reporting/index.ts:17: * @standard OECD Pillar Two:2023 Global Minimum Tax
src/audit/compliance/reporting/index.ts:18: * @standard GDPR Art. 32 Data Protection
src/audit/compliance/reporting/index.ts:19: * @standard NIST SP 800-92 Computer Security Incident Handling
src/audit/compliance/reporting/service.ts:15: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/audit/compliance/reporting/service.ts:16: * @standard OECD Transfer Pricing Guidelines:2022 Documentation Section
src/audit/compliance/reporting/service.ts:17: * @standard IAS-1:2023 Presentation of Financial Statements (disclosure)
src/audit/compliance/reporting/service.ts:18: * @standard GDPR Art. 32 (data protection in audit reports)
src/audit/compliance/reporting/service.ts:19: * @standard NIST SP 800-92 (computer security incident handling in audit)
src/audit/compliance/reporting/standard.ts:10: * @standard OECD Pillar Two:2023 Global Minimum Tax
src/audit/compliance/reporting/standard.ts:11: * @standard GDPR Art. 32 Data Protection
src/audit/compliance/reporting/standard.ts:12: * @standard NIST SP 800-92 Computer Security Incident Handling
src/audit/compliance/reporting/standard.ts:6: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/audit/compliance/reporting/standard.ts:7: * @standard OECD Transfer Pricing Guidelines:2022 Documentation
src/audit/compliance/reporting/standard.ts:8: * @standard IAS-1:2023 Presentation of Financial Statements
src/audit/compliance/reporting/standard.ts:9: * @standard BEPS Action 13:2021 Transfer Pricing Documentation
src/audit/events/index.ts:41: * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
src/audit/events/index.ts:42: * @standard ISO-19011:2018 §6.5 audit-conclusions
src/audit/events/index.ts:43: * @standard ISO/IEC 27037:2012 evidence-preservation
src/audit/submissions/index.ts:14: * @standard BG Наредба-Н-18 §Приложение-38 audit-file-submission-log
src/audit/trail/after/change/index.ts:21: * @standard rfc-9562 uuid event-id
src/audit/trail/after/change/index.ts:39: * @standard NIST FIPS-180-4 sha-256
src/audit/trail/write-audit-event.ts:46: * @standard ISO 19011:2018 §6.4.6 audit-evidence (every write tamper-evident)
src/audit/trail/write-audit-event.ts:47: * @standard SOX §404 internal controls (tamper-evidence + queryable form)
src/audit/trail/write-audit-event.ts:48: * @standard ISO 27001 Annex A.12.4 logging + monitoring
src/audit/trail/write-audit-event.ts:49: * @standard NIST SP 800-92 §3.4 log integrity
src/aura/find-gaps.ts:25: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/auth/index.ts:11: * @standard OWASP-ASVS V4 access-control
src/auth/index.ts:190: * @standard NIST INCITS-359-2012 rbac object-scoped-role-assignment
src/auth/index.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/auth/index.ts:5: * @standard NIST SP-800-162 attribute-based-access-control
src/auto/set/timestamp/index.ts:7: * @standard ISO-8601-1:2019 date-time utc-canonical
src/balance/index.ts:24: * @standard double-entry bookkeeping (Pacioli, 1494) — every credit a debit; imbalance is the bug
src/bank/accounts/bank/reconciliations/index.ts:14: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/bank/reconciliations/index.ts:15: * @standard ISO-8601-1:2019 date-time reconciliation-date
src/bank/accounts/bank/reconciliations/index.ts:16: * @standard ISO-20022 camt.053 bank-to-customer-statement (input)
src/bank/accounts/bank/transactions/index.ts:31: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/bank/accounts/bank/transactions/index.ts:32: * @standard ISO-20022 ExternalBankTransactionDomain1Code
src/bank/accounts/bank/transactions/index.ts:33: * @standard ISO-20022 ExternalBankTransactionFamily1Code
src/bank/accounts/bank/transactions/index.ts:34: * @standard ISO-20022 ExternalBankTransactionSubFamily1Code
src/bank/accounts/bank/transactions/index.ts:35: * @standard ISO-20022 EntryStatus2Code
src/bank/accounts/bank/transactions/index.ts:36: * @standard ISO-20022 CreditDebitCode
src/bank/accounts/bank/transactions/index.ts:37: * @standard ISO-20022 ChargeBearerType1Code
src/bank/accounts/bank/transactions/index.ts:38: * @standard ISO-11649:2009 financial-services-creditor-reference
src/bank/accounts/bank/transactions/index.ts:39: * @standard ISO-13616-1:2020 iban
src/bank/accounts/bank/transactions/index.ts:40: * @standard ISO-9362:2022 bic
src/bank/accounts/bank/transactions/index.ts:41: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/bank/transactions/index.ts:42: * @standard ISO-8601-1:2019 date-time value-date booking-date matched-at
src/bank/accounts/index.ts:10: * @standard ISO-20022 financial-messaging account-identification
src/bank/accounts/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/index.ts:8: * @standard ISO-13616-1:2020 iban
src/bank/accounts/index.ts:9: * @standard ISO-9362:2022 bic
src/bank/accounts/payment/runs/index.ts:20: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/bank/accounts/payment/runs/index.ts:21: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/bank/accounts/payment/runs/index.ts:22: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/bank/accounts/payment/runs/index.ts:23: * @standard ISO-13616-1:2020 iban
src/bank/accounts/payment/runs/index.ts:24: * @standard ISO-9362:2022 bic
src/bank/accounts/payment/runs/index.ts:25: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/payment/runs/index.ts:26: * @standard ISO-8601-1:2019 date-time creation-execution
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.test.ts:9: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:26: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:27: * @standard ISO-13616-1:2020 iban
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:28: * @standard ISO-9362:2022 bic
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:29: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:30: * @standard ISO-8601-1:2019 date-time payment-date
src/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:16: * @standard ISO/IEC-29119:2022 software-testing
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:45: * @standard ISO-8601-1:2019 date-time period payment-date
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:46: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/payroll/runs/index.ts:17: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/bank/accounts/payroll/runs/index.ts:18: * @standard ISO-13616-1:2020 iban
src/bank/accounts/payroll/runs/index.ts:19: * @standard ISO-9362:2022 bic
src/bank/accounts/payroll/runs/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/bank/accounts/payroll/runs/index.ts:21: * @standard ISO-8601-1:2019 date-time period payment-date
src/bank/reconciliation.service/index.ts:4: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/bank/reconciliation.service/index.ts:5: * @standard ISO-13616-1:2020 iban
src/bank/reconciliation.service/index.ts:6: * @standard ISO-9362:2022 bic
src/bank/reconciliation.service/index.ts:7: * @standard ISO-4217:2015 currency-codes
src/bank/reconciliation.service/index.ts:8: * @standard ISO-8601-1:2019 date-time statement-date value-date
src/bank/statement/import.service/index.ts:10: * @standard ISO-8601-1:2019 date-time
src/bank/statement/import.service/index.ts:4: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/bank/statement/import.service/index.ts:5: * @standard MT940 swift-statement-message legacy
src/bank/statement/import.service/index.ts:6: * @standard OFX-2.2 open-financial-exchange
src/bank/statement/import.service/index.ts:7: * @standard ISO-13616-1:2020 iban
src/bank/statement/import.service/index.ts:8: * @standard ISO-9362:2022 bic
src/bank/statement/import.service/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/base/accounting/field/index.ts:115: * @standard UN/CEFACT Recommendation 20 unit-of-measure-codes
src/base/accounting/field/index.ts:176: * @standard ISO-19011:2018 audit-trail
src/base/accounting/field/index.ts:308: * @standard ISO 3166-1:2020 country-codes
src/base/accounting/field/index.ts:327: * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
src/base/accounting/field/index.ts:4: * @standard ISO-4217:2015 currency-codes
src/base/accounting/field/index.ts:5: * @standard ISO-8601-1:2019 date-time
src/base/accounting/field/index.ts:92: * @standard UN/CEFACT Recommendation 20 unit-of-measure-codes
src/base/accounting/field/index.ts:93: * @standard EN-16931 §BT-130 invoiced-quantity-unit-of-measure
src/bcp/47/index.ts:4: * @standard BCP-47 language-tag
src/bcp/47/language-tag.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/bcp/47/language-tag.test.ts:5: * @standard BCP-47 language-tag
src/bcp/47/language-tag.ts:4: * @standard BCP-47 language-tag
src/bcp/47/locale-utils.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/bcp/47/locale-utils.test.ts:5: * @standard BCP-47 language-tag
src/bcp/47/locale-utils.test.ts:8: * @standard ECMA-402 internationalization-api
src/bcp/47/locale-utils.ts:5: * @standard BCP-47 language-tag
src/bcp/47/locale-utils.ts:8: * @standard ECMA-402 internationalization-api
src/bcp/47/locale-utils.ts:9: * @standard Unicode-CLDR locale-data
src/before/dashboard/index.tsx:6: * @standard WAI-ARIA 1.2 status-role
src/before/dashboard/index.tsx:8: * @standard BCP-47 language-tag
src/before/login/index.tsx:6: * @standard W3C HTML5 form-validation
src/before/login/index.tsx:7: * @standard BCP-47 language-tag
src/beyond/agent-capability.ts:25: * @standard NIST INCITS 359 RBAC (Role-Based Access Control)
src/beyond/agent-capability.ts:26: * @standard ISO/IEC 27002:2022 A.5.18 access-rights
src/beyond/agent-capability.ts:27: * @standard EU GDPR Art. 25 data-protection-by-design
src/beyond/agent-capability.ts:28: * @standard EU AI Act Art. 14 human-oversight (role-bound oversight)
src/beyond/ai-audit.ts:10: * @standard EU AI Act 2024/1689 Art. 13 + Annex IV (technical documentation)
src/beyond/ai-audit.ts:11: * @standard ISO/IEC 23894:2023 AI risk management
src/beyond/ai-audit.ts:12: * @standard NIST AI RMF 1.0 (2023)
src/beyond/bitemporal/index.ts:6: * @standard SQL:2011 system-versioned + application-time tables
src/beyond/bitemporal/index.ts:7: * @standard ISO/IEC 9075-2:2016 §4.15.10 temporal-tables
src/beyond/carbon/index.ts:5: * @standard ESRS E1 climate-change-disclosures
src/beyond/carbon/index.ts:6: * @standard EU CSRD 2022/2464 sustainability-reporting-directive
src/beyond/carbon/index.ts:7: * @standard GHG Protocol Scope-2 location-based
src/beyond/erasure/index.ts:28: * @standard ISO 27040 §6.3 cryptographic-erasure
src/beyond/erasure/index.ts:29: * @standard NIST SP 800-88 Rev.1 media-sanitization (cryptographic erase)
src/beyond/explainability/index.ts:10: * @standard XBRL inline-XBRL (machine-explainability of values)
src/beyond/explainability/index.ts:11: * @standard ISO/IEC 23053 AI-systems-with-machine-learning (explainability)
src/beyond/explainability/index.ts:9: * @standard EU AI Act 2024/1689 Art. 13 (transparency for high-risk)
src/beyond/index.ts:18: * @standard W3C PROV + ESRS E1 + EU AI Act + NIST FIPS 203/204
src/beyond/pqc/index.ts:10: * @standard NIST FIPS 203 ML-KEM (Module-Lattice Key Encapsulation)
src/beyond/pqc/index.ts:11: * @standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
src/beyond/pqc/index.ts:12: * @standard NIST SP 800-208 stateful-hash-based-signatures
src/beyond/provenance/index.ts:10: * @standard W3C PROV-DM (Provenance Data Model)
src/beyond/provenance/index.ts:11: * @standard W3C PROV-O (PROV Ontology — RDF)
src/beyond/replay/index.ts:13: * @standard ISRS 4400 agreed-upon-procedures (replay verification)
src/beyond/replay/index.ts:14: * @standard ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability
src/beyond/reversibility/index.ts:8: * @standard GDPR Art. 17 right-to-erasure
src/beyond/reversibility/index.ts:9: * @standard ISO 19011:2018 §6.4.6 audit-evidence (reversal trail)
src/beyond/tenant-isolation.ts:12: * @standard ISO/IEC 27001 A.5.34 privacy-protection
src/beyond/tenant-isolation.ts:13: * @standard GDPR Art. 32 security-of-processing
src/beyond/tenant-isolation.ts:14: * @standard ISO 19944 cloud-services data-flow + jurisdiction
src/beyond/types/index.ts:10: * @standard ISRS 4400 agreed-upon-procedures (replay verification)
src/beyond/types/index.ts:11: * @standard ESRS E1 (climate change disclosures — gCO2e per activity)
src/beyond/types/index.ts:12: * @standard NIST SP 800-208 stateful-hash-based-signatures (PQC)
src/beyond/types/index.ts:13: * @standard NIST FIPS 203 ML-KEM + FIPS 204 ML-DSA (PQC, 2024)
src/beyond/types/index.ts:14: * @standard ISO 19944 cloud-services data-flow + jurisdiction
src/beyond/types/index.ts:15: * @standard XBRL inline-XBRL (machine-explainability of financial values)
src/beyond/types/index.ts:8: * @standard W3C PROV (Provenance Data Model)
src/beyond/types/index.ts:9: * @standard EU AI Act 2024/1689 (Annex IV — technical documentation)
src/bg/identifier/index.ts:11: * @standard ЕГН regulation (Наредба РД-02-20-9/2012 on the population register)
src/bg/identifier/index.ts:12: * @standard БУЛСТАТ register law (Закон за регистър БУЛСТАТ) — ЕИК checksum
src/bg/identifier/index.ts:13: * @standard ISO-7064 check-character-systems (the modulo family these implement)
src/billing/stripeWebhookHandlers.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/billing/stripeWebhookHandlers.test.ts:7: * @standard ISO-4217:2015 currency-codes
src/billing/stripeWebhookHandlers.ts:18: * @standard NIST FIPS-198-1 keyed-hash-message-authentication
src/billing/stripeWebhookHandlers.ts:19: * @standard PCI-DSS v4.0 §3 protect-stored-account-data
src/billing/stripeWebhookHandlers.ts:20: * @standard PCI-DSS v4.0 §4 protect-cardholder-data-with-strong-cryptography-during-transmission
src/billing/stripeWebhookHandlers.ts:21: * @standard PCI-DSS v4.0 §10 log-and-monitor-access-to-system-components
src/billing/stripeWebhookHandlers.ts:429: * @standard ISO-4217:2015 currency-codes refund-amount
src/billing/stripeWebhookHandlers.ts:430: * @standard ISO-8601-1:2019 date-time refunded-at
src/billing/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/billing/test.ts:7: * @standard ISO-4217:2015 currency-codes
src/biological/assets/index.ts:12: * @standard IFRS IAS-41 §10 recognition-criteria
src/biological/assets/index.ts:13: * @standard IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell
src/biological/assets/index.ts:14: * @standard IFRS IAS-41 §13 biological-transformation
src/biological/assets/index.ts:15: * @standard IFRS IAS-41 §26 gains-losses-recognised-in-pnl
src/biological/assets/index.ts:16: * @standard IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment
src/biological/assets/index.ts:17: * @standard IFRS IAS-41 §40 disclosure-by-class
src/biological/assets/index.ts:18: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/biological/assets/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/biological/assets/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/biomass/index.ts:13: * @standard IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split
src/biomass/index.ts:14: * @standard FAO — forest growth-and-yield / mean annual increment (MAI)
src/blocks/archive/block/config.ts:4: * @standard schema.org ItemList
src/blocks/archive/block/config.ts:5: * @standard schema.org CollectionPage
src/blocks/banner/config.ts:4: * @standard W3C HTML5 aside-element
src/blocks/banner/config.ts:5: * @standard WAI-ARIA 1.2 status-role
src/blocks/call/to/action/config.ts:4: * @standard schema.org Action
src/blocks/call/to/action/config.ts:5: * @standard W3C HTML5 anchor-element
src/blocks/code/config.ts:4: * @standard schema.org SoftwareSourceCode
src/blocks/code/config.ts:5: * @standard W3C HTML5 pre-and-code-elements
src/blocks/code/config.ts:6: * @standard ECMA-262 ECMAScript language-token
src/blocks/content/config.ts:4: * @standard W3C HTML5 article-section-elements
src/blocks/content/config.ts:5: * @standard schema.org WebPageElement
src/blocks/content/config.ts:6: * @standard CommonMark 0.31 markdown-fallback
src/blocks/form/Component.tsx:20: * @standard ECMA-262 ECMAScript-2024 baseline
src/blocks/form/config.ts:4: * @standard W3C HTML5 form-validation
src/blocks/form/config.ts:5: * @standard WAI-ARIA 1.2 form-roles
src/blocks/form/refactored-utilities.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing integration-test-level
src/blocks/form/refactored-utilities.test.ts:8: * @standard BCP-47 language-tag
src/blocks/form/refactored-utilities.test.ts:9: * @standard ECMA-402 internationalization-api
src/blocks/media/block/config.ts:4: * @standard schema.org ImageObject
src/blocks/media/block/config.ts:5: * @standard schema.org VideoObject
src/blocks/media/block/config.ts:6: * @standard W3C HTML5 figure-and-figcaption
src/blocks/media/block/config.ts:8: * @standard ISO/IEC-14496 mpeg-4 video
src/blocks/media/block/config.ts:9: * @standard ISO/IEC-10918 jpeg
src/bookable/resources/bookings/index.ts:11: * @standard ISO-18513:2021 tourism-services-vocabulary check-in check-out
src/bookable/resources/bookings/index.ts:12: * @standard ISO-8601-1:2019 date-time start-end-windows
src/bookable/resources/bookings/index.ts:13: * @standard ISO-4217:2015 currency-codes pricing
src/bookable/resources/bookings/index.ts:14: * @standard rfc-5545 icalendar-rrule recurring-bookings
src/bookable/resources/bookings/index.ts:15: * @standard HTNG-2017 hotel-technology-next-generation
src/bookable/resources/bookings/index.ts:16: * @standard OpenTravel Alliance reservation-message
src/bookable/resources/index.ts:11: * @standard ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)
src/bookable/resources/index.ts:12: * @standard ISO-3166-1:2020 country-codes resource-country
src/bookable/resources/index.ts:13: * @standard ISO-4217:2015 currency-codes pricing
src/bookable/resources/index.ts:14: * @standard ISO-8601-1:2019 date-time availability-windows
src/bookable/resources/index.ts:15: * @standard ISO-55000:2014 asset-management resource-as-asset
src/bookable/resources/index.ts:16: * @standard ISO-41001:2018 facility-management bookable-spaces
src/budget/plannings/index.ts:27: * @standard ISO-4217:2015 currency-codes
src/budget/plannings/index.ts:28: * @standard ISO-8601-1:2019 date-time fiscal-year period
src/bulk/op/index.ts:12: * @standard ISO 20022 camt.053 pain.001 pain.008
src/bulk/op/index.ts:13: * @standard EN-16931:2017 (UBL / CII import)
src/bulk/op/index.ts:14: * @standard rfc-4180 csv-format
src/bulk/op/index.ts:15: * @standard ISO/IEC 19503:2005 XMI
src/business/chain/backfill-producers.ts:17: * @standard ISO/IEC 25010:2023 §5.4 reusability — single-source-of-truth wiring
src/business/chain/chain-context.ts:18: * @standard ISO-3166-1:2020 country-codes
src/business/chain/chain-context.ts:19: * @standard ISO-4217:2015 currency-codes
src/business/chain/types.ts:19: * @standard ISO/IEC 19510:2013 BPMN-2.0 (process notation, companion)
src/business/chain/types.ts:20: * @standard ISO/IEC 25010:2023 functional-suitability functional-completeness
src/business/chain/wire-producers.ts:19: * @standard ISO/IEC 25010:2023 §5.4 reusability — single wiring path
src/camt053/import.service/index.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing
src/camt053/import.service/index.test.ts:8: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/camt053/import.service/index.ts:17: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/camt053/import.service/index.ts:18: * @standard ISO-13616-1:2020 iban
src/camt053/import.service/index.ts:19: * @standard ISO-9362:2022 bic
src/camt053/import.service/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/camt053/import.service/index.ts:21: * @standard ISO-8601-1:2019 date-time
src/camt053/import.service/index.ts:260: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/capture/media/index.ts:23: * @standard W3C WebVTT video-text-track-format
src/capture/media/index.ts:24: * @standard ISO/IEC 14496-30 timed-text-formats
src/capture/media/index.ts:25: * @standard ISO 19011:2018 audit-trail test-evidence
src/capture/media/index.ts:80: * @standard W3C WebVTT
src/card/index.tsx:6: * @standard schema.org Article
src/card/index.tsx:7: * @standard W3C HTML5 article-element
src/carriers/index.ts:10: * @standard ISO-8601-1:2019 date-time effective-from
src/carriers/index.ts:11: * @standard INCOTERMS 2020 international-commercial-terms
src/carriers/index.ts:12: * @standard IATA DGR dangerous-goods-regulations
src/carriers/index.ts:13: * @standard IMDG-Code maritime-dangerous-goods
src/carriers/index.ts:14: * @standard UPU-S10 universal-postal-union shipment-identifier
src/cases/index.ts:17: * @standard UN-COFOG-03 public-order-and-safety law-courts
src/cases/index.ts:18: * @standard ISO-19011:2018 ISA-500 evidence chain-of-custody append-only
src/categories/index.ts:15: * @standard schema.org Category
src/categories/index.ts:16: * @standard schema.org DefinedTerm taxonomic-term
src/chains/bulk/import/cycle/bulk-import-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/bulk/import/cycle/bulk-import-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/consignment/cycle/consignment-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/consignment/cycle/consignment-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/crm/lead/to/cash/crm-lead-to-cash-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/crm/lead/to/cash/crm-lead-to-cash-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/esg/reporting/cycle/esg-reporting-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/esg/reporting/cycle/esg-reporting-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/facility/maintenance/cycle/facility-maintenance-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/facility/maintenance/cycle/facility-maintenance-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/h2r/hire/to/retire/h2r-hire-to-retire-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/h2r/hire/to/retire/h2r-hire-to-retire-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/ifrs16/lease/cycle/ifrs16-lease-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/ifrs16/lease/cycle/ifrs16-lease-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/intercompany/consolidation/intercompany-consolidation-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/intercompany/consolidation/intercompany-consolidation-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/kyc/sanctions/review/kyc-sanctions-review-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/kyc/sanctions/review/kyc-sanctions-review-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/manufacturing/cycle/manufacturing-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/manufacturing/cycle/manufacturing-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/multi/invoice/payment/allocation/multi-invoice-payment-allocation-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/multi/invoice/payment/allocation/multi-invoice-payment-allocation-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/multi/vendor/pr/split/award/multi-vendor-pr-split-award-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/multi/vendor/pr/split/award/multi-vendor-pr-split-award-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/notification/dispatch/notification-dispatch-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/notification/dispatch/notification-dispatch-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/o2c/good/o2c-goods-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/o2c/good/o2c-goods-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/o2c/services/over/time/o2c-services-over-time-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/o2c/services/over/time/o2c-services-over-time-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/procure/to/pay/procure-to-pay-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/procure/to/pay/procure-to-pay-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/provision/lifecycle/provision-lifecycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/provision/lifecycle/provision-lifecycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/record/to/report/record-to-report-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/record/to/report/record-to-report-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/resource/booking/cycle/resource-booking-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/resource/booking/cycle/resource-booking-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/subscription/billing/cycle/subscription-billing-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/subscription/billing/cycle/subscription-billing-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chains/workflow/approval/cycle/workflow-approval-cycle-page.tsx:8: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/chains/workflow/approval/cycle/workflow-approval-cycle-page.tsx:9: * @standard WCAG-2.1-AA contrast text-spacing
src/chakra/index.ts:15: * @standard ISO-16:1975 a432-tuning-reference (pitch from position)
src/chats/index.ts:15: * @standard W3C ActivityPub server-to-server activity-distribution (the model)
src/chats/index.ts:16: * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
src/chats/index.ts:17: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
src/classify/tax/id/index.ts:12: * @standard ISO-3166-1:2020 country-codes alpha-2
src/cloning/boot.ts:20: * @standard W3C Verifiable Credentials Data Model 2.0
src/cloning/genome.ts:10: * @standard RFC 9562 §5.8 + RFC 8785 (genome-uuid is content-addressable)
src/cloning/genome.ts:11: * @standard W3C PROV (genome carries source-instance lineage)
src/cloning/index.ts:9: * @standard W3C Verifiable Credentials Data Model 2.0
src/cloning/publish.ts:5: * @standard W3C Activity Streams 2.0 (federated content envelope)
src/cloning/publish.ts:6: * @standard NIST FIPS 204 ML-DSA (when sign fn provided)
src/cloning/verify.ts:10: * @standard RFC 9562 §5.8 + RFC 8785
src/closing/period/checker/index.ts:14: * @standard IAS-34:2023 (period structure, interim closing requirements)
src/closing/period/checker/index.ts:15: * @standard SAF-T:3.0.2 (period coding, regulatory audit trail)
src/cloudflare/index.ts:102: * @standard ISO/IEC 25010:2023 §5.2 reliability — fail-fast at boot
src/cloudflare/index.ts:10: * @standard W3C Service Worker §4 (Workers compat)
src/cloudflare/index.ts:9: * @standard Cloudflare Workers Runtime API
src/cloudflare/mediator-uuid-crypto.test.ts:20: * @standard RFC 8032 EdDSA, NIST SP 800-38D AES-GCM, NIST SP 800-57 §5.6
src/cloudflare/plugin-access.ts:41: * @standard ISO 27001 A.5.15 access-control
src/cloudflare/plugin-access.ts:42: * @standard ISO 27002 §5.4 segregation-of-duties (TypeScript-enforced)
src/cloudflare/plugin-helper.ts:27: * @standard ISO 27001 A.5.23 cloud-service-tenant-isolation
src/coherence/index.ts:18: * @standard DSP magnitude-spectrum (DFT) + the 0.7..4 Hz human-pulse band
src/collection/archive/index.tsx:4: * @standard schema.org ItemList
src/collection/archive/index.tsx:5: * @standard schema.org CollectionPage
src/collection/archive/index.tsx:6: * @standard W3C HTML5 section-element
src/collections/index.test.ts:10: * @standard ISO/IEC-29119:2022 software-testing (one computed invariant, full coverage)
src/collections/index.test.ts:67: * @standard double-entry (Pacioli, 1494) — the path is the type's atoms, no slack
src/collections/test.ts:10: * @standard ISO/IEC-29119:2022 software-testing (one computed invariant, full coverage)
src/color/index.ts:8: * @standard A432 tuning; the 7-chakra visible spectrum (Do..Ti / root..crown)
src/command/index.ts:13: * @standard schema.org Action — the imperative move (here, the workflow step's verb)
src/commerce/index.ts:21: * @standard Stripe API v2024-10-28-acacia
src/commerce/index.ts:22: * @standard Cloudflare Workers API (deployments + durable-object namespaces)
src/commerce/index.ts:23: * @standard W3C Verifiable Credentials Data Model 2.0 (subscription receipts)
src/commitments/and/contingencies/index.ts:13: * @standard ISO-8601-1:2019 date-time
src/commitments/and/contingencies/index.ts:14: * @standard ISO-4217:2015 currency-codes
src/commitments/index.ts:23: * @standard SOX §302 management-certification internal-controls
src/commitments/index.ts:24: * @standard SOX §404 internal-controls spending-authority
src/commitments/index.ts:25: * @standard COSO Internal-Control-Integrated-Framework 2013 authorization
src/commitments/index.ts:26: * @standard IFRS IFRS-15 §10 contract-with-customer
src/commitments/index.ts:27: * @standard IFRS IAS-1 presentation-of-financial-statements
src/commitments/index.ts:28: * @standard ISO-4217:2015 currency-codes
src/commitments/index.ts:29: * @standard ISO-8601-1:2019 date-time authorization-date
src/communication/index.ts:9: * @standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid
src/competency/gap/index.ts:10: * @standard ISO 30405:2016 essential-vs-optional (mandatory gating)
src/competency/gap/index.ts:9: * @standard SFIA 8 responsibility-levels-1-7 (the shared held/required scale)
src/competency/index.ts:11: * @standard SFIA 8 proficiency-levels
src/competency/index.ts:12: * @standard ISO 30405:2016 essential-vs-desirable (mandatory flag)
src/competition/index.ts:14: * @standard ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)
src/compliance/frameworks/compliance/requirements/compliance/gaps/index.ts:4: * @standard ISO-37301:2021 compliance-management
src/compliance/frameworks/compliance/requirements/index.ts:4: * @standard ISO-37301:2021 obligation-register
src/compliance/frameworks/index.ts:4: * @standard ISO-37301:2021 compliance-management-systems
src/compliance/frameworks/index.ts:5: * @standard COSO-2013 internal-control-integrated-framework
src/compost/index.ts:14: * @standard US Composting Council — compost maturity/stability (C:N criteria)
src/compost/index.ts:15: * @standard SARE, Building Soils for Better Crops — organic-matter management
src/compost/index.ts:16: * @standard USDA NOP 7 CFR §205.203 — compost and raw-manure rules
src/config/address-formats/index.ts:23: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/config/address-formats/index.ts:24: * @standard UPU-S42 international-postal-addressing
src/config/address-formats/index.ts:25: * @standard ISO-3166-1:2020 country-codes alpha-2
src/config/address-formats/index.ts:26: * @standard ISO-3166-2:2020 subdivisions
src/config/address-formats/index.ts:27: * @standard BCP-47 language-tag field-labels
src/config/appCollectionsRegistry.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing configuration-test
src/config/country-apis/index.ts:133: * @standard ISO-4217:2015 currency-codes
src/config/country-apis/index.ts:134: * @standard SDMX 2.1 statistical-data-and-metadata-exchange
src/config/country-apis/index.ts:135: * @standard ISO-8601-1:2019 date-time
src/config/country-apis/index.ts:21: * @standard ISO-3166-1:2020 country-codes alpha-2
src/config/country-apis/index.ts:22: * @standard ISO-20022 financial-messages cross-references
src/config/country-specifics/index.ts:14: * @standard ISO-3166-1:2020 country-codes alpha-2
src/config/country-specifics/index.ts:15: * @standard ISO-4217:2015 §3 currency-fraction-units (minor-unit decimals)
src/config/country-specifics/index.ts:16: * @standard ISO-13616-1:2020 iban
src/config/country-specifics/index.ts:17: * @standard EN-16931:2017 §BG-1 invoice-content e-invoicing-mandates
src/config/examples/index.ts:4: * @standard ISO-3166-1:2020 country-codes
src/config/examples/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/config/examples/index.ts:6: * @standard BCP-47 language-tag
src/config/iso-4217-numeric/index.ts:33: * @standard ISO 4217 Annex A list of currency codes (alphabetic + numeric)
src/config/iso-4217-numeric/index.ts:34: * @standard ISO 20022 ActiveOrHistoricCurrencyCode
src/config/iso-4217-numeric/index.ts:35: * @standard SWIFT MT 103 §59 — currency element
src/config/iso-4217-numeric/index.ts:36: * @standard EN 16931 §BG-4 + BT-5 — DocumentCurrencyCode
src/config/iso-4217-numeric/index.ts:37: * @standard Berlin Group XS2A §AccountReference
src/config/iso-4217-special/index.ts:55: * @standard ISO 4217:2015 §6.5 X-codes
src/config/iso-4217-special/index.ts:56: * @standard ISO 4217 Annex A.1 list of currency codes
src/config/iso-4217-special/index.ts:57: * @standard ISO 20022 pacs.008.001 §Ccy (accepts every X-code)
src/config/iso-4217-special/index.ts:58: * @standard LBMA Gold Bullion Price spec (XAU rate source)
src/config/iso-4217-special/index.ts:59: * @standard SDR Valuation Basket (XDR rate composition — currently
src/config/iso-4217-special/index.ts:61: * @standard IFRS 9 §3.2 reclassification (X-coded balances reclassify
src/config/regional-defaults/index.ts:122: * @standard ISO-4217:2015 §5 alphabetic-codes
src/config/regional-defaults/index.ts:145: * @standard ISO-3166-1:2020 country-codes alpha-2
src/config/regional-defaults/index.ts:146: * @standard ISO-4217:2015 currency-codes
src/config/regional-defaults/index.ts:147: * @standard BCP-47 language-tag
src/config/regional-defaults/index.ts:35: * @standard ISO-4217:2015 currency-codes alphabetic
src/config/regional-defaults/index.ts:36: * @standard ISO-3166-1:2020 country-codes alpha-2
src/config/regional-defaults/index.ts:37: * @standard BCP-47 language-tag locale-identifier
src/config/regional-defaults/index.ts:58: * @standard ISO-4217:2015 §5 alphabetic-codes
src/config/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing configuration-test
src/config/types/index.ts:6: * @standard ISO-3166-1:2020 country-codes
src/config/types/index.ts:7: * @standard ISO-4217:2015 currency-codes
src/config/types/index.ts:8: * @standard ISO-17442-1:2020 lei
src/config/types/index.ts:9: * @standard BCP-47 language-tag
src/connections/index.ts:20: * @standard W3C ActivityStreams 2.0 social-graph-vocabulary (Follow/Block/Like)
src/connections/index.ts:21: * @standard W3C ActivityPub server-to-server federation (the cross-platform sync)
src/connections/index.ts:22: * @standard OASIS UBL 2.1 business-relationship (B2B trade edges)
src/connections/index.ts:23: * @standard Peppol BIS billing-and-procurement (B2B / B2G interoperability)
src/connections/index.ts:24: * @standard ISO 20022 financial-business-party-relationships
src/connections/index.ts:25: * @standard RFC-4122 §4.3 content-uuid edge-identity
src/consent/records/index.ts:8: * @standard ISO-8601-1:2019 date-time given-at withdrawn-at
src/conservation/index.ts:12: * @standard Noether's theorem (E. Noether, 1918) — continuous symmetry ⇔ conserved quantity
src/conservation/index.ts:13: * @standard First Law of Thermodynamics — energy is conserved in an isolated system
src/conservation/index.ts:14: * @standard Double-entry bookkeeping (Pacioli, 1494) — Σdebit = Σcredit
src/consistency/apply/consistency-loop.test.ts:19: * @standard ISO/IEC 25010:2023 §5.5 testability — round-trip the agent loop
src/consistency/apply/index.ts:21: * @standard ISO/IEC 25010:2023 §5.7 modifiability — single deterministic path
src/consistency/apply/index.ts:355: * @standard ISO/IEC-29119:2022 software-testing system-test-level
src/consistency/apply/index.ts:417: * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
src/consistency/apply/index.ts:418: * @standard WCAG-2.1-AA contrast text-spacing
src/consistency/apply/index.ts:524: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/consolidation/eliminations/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/consolidation/eliminations/index.ts:13: * @standard ISO-8601-1:2019 date-time consolidation-date
src/constitution/index.ts:13: * @standard ISO 37000:2021 governance-of-organizations principle-of-purpose
src/convention/addressed/index.ts:29: * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant — identity derived from content
src/convention/complete/index.ts:24: * @standard schema.org — the type vocabulary, collided to single words
src/convention/dry/index.ts:21: * @standard schema.org — the type vocabulary, collided to single words
src/convention/folded/index.ts:30: * @standard schema.org — the type vocabulary, collided to single words
src/convention/fronted/index.ts:38: * @standard schema.org — the type vocabulary, collided to single words
src/convention/honest/index.ts:31: * @standard schema.org — the type vocabulary, collided to single words
src/convention/lawful/index.ts:27: * @standard schema.org — the type vocabulary, collided to single words
src/convention/link/index.ts:24: * @standard CommonMark / Obsidian `[[wikilink]]` syntax — resolved by normalized leaf word
src/convention/named/index.ts:40: * @standard schema.org — the type vocabulary, collided to single words
src/convention/reciprocal/index.ts:27: * @standard schema.org — the type vocabulary, collided to single words
src/convention/sourced/index.ts:27: * @standard schema.org — the type vocabulary, collided to single words
src/convention/triggered/index.ts:28: * @standard schema.org — the type vocabulary, collided to single words
src/convention/twinned/index.ts:34: * @standard schema.org — the type vocabulary, collided to single words
src/cost/centers/index.ts:14: * @standard ISO-3166-1:2020 country-codes geographic-segment-tagging
src/cost/centers/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/cost/centers/job/positions/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/cost/centers/job/positions/recruiting/pipelines/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/cost/centers/purchase/requisitions/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/cost/centers/purchase/requisitions/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/cost/index.ts:10: * @standard ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)
src/cost/index.ts:159: * @standard CRAQ — Terrace & Freedman, USENIX ATC 2009
src/cost/index.ts:169: * @standard DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)
src/country/api/client/index.ts:15: * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
src/country/api/client/index.ts:338: * @standard ISO-4217:2015 currency-codes
src/country/api/client/index.ts:339: * @standard ISO-8601-1:2019 date-time
src/country/api/client/index.ts:410: * @standard ISO-4217:2015 currency-codes
src/country/api/client/index.ts:411: * @standard SDMX 2.1 statistical-data-and-metadata-exchange
src/country/api/client/index.ts:412: * @standard ISO-8601-1:2019 date-time
src/country/api/client/index.ts:474: * @standard ISO-4217:2015 currency-codes
src/country/api/client/index.ts:475: * @standard ISO-3166-1:2020 country-codes alpha-2
src/country/api/client/index.ts:514: * @standard ISO-4217:2015 currency-codes
src/country/api/client/index.ts:515: * @standard ISO-3166-1:2020 country-codes alpha-2
src/country/api/client/index.ts:579: * @standard EN-16931:2017 §B2G semantic-model
src/country/api/client/index.ts:580: * @standard Peppol-BIS-3.0 billing
src/country/api/client/index.ts:602: * @standard ISO-3166-1:2020 BG country-code
src/country/api/client/index.ts:603: * @standard EN-16931:2017 §BT-31 seller-vat-identifier
src/country/api/client/index.ts:618: * @standard ISO-3166-1:2020 BG country-code
src/country/api/client/index.ts:632: * @standard PSD2 EU 2015/2366 ais-pis
src/country/api/client/index.ts:633: * @standard Berlin Group NextGenPSD2 v1.3
src/country/client/berlin-group-psd2.ts:112: * @standard Berlin Group NextGenPSD2 v1.3 §5.1.1 read-account-list
src/country/client/berlin-group-psd2.ts:12: * @standard PSD2 EU 2015/2366 ais-pis
src/country/client/berlin-group-psd2.ts:13: * @standard Berlin Group NextGenPSD2 v1.3
src/country/client/berlin-group-psd2.ts:147: * @standard Berlin Group NextGenPSD2 v1.3 §5.3.1 payment-initiation
src/country/client/berlin-group-psd2.ts:148: * @standard ISO-20022 pain.001.001.09 sepa-credit-transfer-initiation
src/country/client/berlin-group-psd2.ts:14: * @standard ISO-20022 pain.001 sepa-credit-transfer
src/country/client/berlin-group-psd2.ts:68: * @standard rfc-6749 §4.4 client-credentials-grant
src/country/client/bg-bank-statement-pdf.ts:27: * @standard ISO-3166-1:2020 BG country-code
src/country/client/bg-bank-statement-pdf.ts:28: * @standard ISO-13616-1:2020 iban BG-22
src/country/client/bg-bank-statement-pdf.ts:29: * @standard ISO-20022 camt.053 bank-to-customer-statement (target shape)
src/country/client/bg-bank-statement-pdf.ts:30: * @standard ISO-32000-2:2020 pdf source-document
src/country/client/bg-bank-statement-pdf.ts:31: * @standard ISO-4217:2015 currency-codes
src/country/client/bg-bank-statement-pdf.ts:32: * @standard ISO-8601-1:2019 date-time
src/country/client/bg-holidays.ts:15: * @standard ISO-3166-1:2020 BG country-code
src/country/client/bg-holidays.ts:16: * @standard ISO-8601-1:2019 date-time
src/country/client/bg-hybrid-invoice.ts:15: * @standard ISO-19005-3:2012 pdf-a-3
src/country/client/bg-hybrid-invoice.ts:16: * @standard EN-16931:2017+A1:2019 §6 hybrid-invoice
src/country/client/bg-hybrid-invoice.ts:17: * @standard rfc-2046 mime-application-xml
src/country/client/bg-hybrid-invoice.ts:18: * @standard ISO-3166-1:2020 BG country-code
src/country/client/bg-nap-mtls.ts:11: * @standard ISO-3166-1:2020 BG country-code
src/country/client/bg-nap-mtls.ts:122: * @standard OECD SAF-T 2.0 BG variant
src/country/client/bg-nap-mtls.ts:12: * @standard OECD SAF-T 2.0 BG-SAF-T submission
src/country/client/bg-nap-mtls.ts:13: * @standard rfc-5246 tls-1.2
src/country/client/bg-nap-mtls.ts:14: * @standard rfc-8446 tls-1.3
src/country/client/bg-pades-signer.ts:192: * @standard rfc-5280 internet-x509-public-key-infrastructure
src/country/client/bg-pades-signer.ts:21: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/country/client/bg-pades-signer.ts:22: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/country/client/bg-pades-signer.ts:23: * @standard rfc-5652 cms-detached-signature
src/country/client/bg-pades-signer.ts:24: * @standard ISO-3166-1:2020 BG country-code
src/country/client/bg-pades-signer.ts:92: * @standard rfc-5652 cms-detached-signature
src/country/client/bg-pades-signer.ts:93: * @standard NIST FIPS-180-4 sha-256 message-digest
src/country/client/bg-vat.ts:13: * @standard ISO-3166-1:2020 BG country-code
src/country/client/bg-vat.ts:14: * @standard ISO-4217:2015 currency-codes
src/country/client/bg-vat.ts:15: * @standard EN-16931:2017 §BG-23 invoice-line-tax-category
src/country/client/bg-vat.ts:16: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/country/client/pdf-text-extractor-default.ts:18: * @standard ISO-32000-2:2020 pdf source-document
src/country/client/pdf-text-extractor-default.ts:19: * @standard W3C HTML5 (extracted text consumed downstream)
src/country/client/sign-cms-node.ts:17: * @standard rfc-5652 cms-detached-signature
src/country/client/sign-cms-node.ts:18: * @standard rfc-3447 pkcs1 rsa-signature
src/country/client/sign-cms-node.ts:19: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/country/clients/bg/bank/parser/fibank.ts:6: * @standard ISO-3166-1:2020 BG country-code
src/country/clients/bg/bank/parser/fibank.ts:7: * @standard ISO-13616-1:2020 iban BG-22
src/country/clients/bg/bank/parser/fibank.ts:8: * @standard ISO-32000-2:2020 pdf source-document
src/country/clients/bg/bank/parser/index.ts:12: * @standard ISO-3166-1:2020 BG country-code
src/country/clients/bg/bank/parser/unicredit-bulbank.ts:6: * @standard ISO-3166-1:2020 BG country-code
src/country/clients/bg/bank/parser/unicredit-bulbank.ts:7: * @standard ISO-13616-1:2020 iban BG-22
src/country/clients/bg/bank/parser/unicredit-bulbank.ts:8: * @standard ISO-32000-2:2020 pdf source-document
src/country/context/index.ts:28: * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
src/country/fallback/index.test.ts:14: * @standard ISO 3166-1 §6 user-assigned codes (ZZ)
src/country/fallback/index.test.ts:15: * @standard CLDR ZZ Unknown Region
src/country/fallback/index.test.ts:16: * @standard UN M.49 — 001 World numeric
src/country/fallback/index.ts:47: * @standard ISO 3166-1 §6 user-assigned codes
src/country/fallback/index.ts:48: * @standard CLDR ZZ Unknown Region
src/country/fallback/index.ts:49: * @standard UN M.49 — 001 World (numeric)
src/country/fallback/index.ts:50: * @standard ISO 3166-2 — subdivision codes (handled by country-context)
src/country/fallback/index.ts:51: * @standard EU VIES — alpha-2 country code element
src/country/fallback/index.ts:52: * @standard SWIFT BIC §3 country code (BIC normalises ZZ → reject; ERPax stores)
src/cross/index.ts:16: * @standard NIST INCITS-359 role-based-access-control
src/cross/index.ts:17: * @standard ISO 27002 §5.15 access-control + §5.3 segregation-of-duties
src/csrd/disclosures/index.ts:15: * @standard EU CSRD Directive 2022/2464
src/csrd/disclosures/index.ts:16: * @standard EU ESRS 1 General Requirements
src/csrd/disclosures/index.ts:17: * @standard EU ESRS 2 General Disclosures
src/csrd/disclosures/index.ts:18: * @standard ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)
src/csrd/disclosures/index.ts:19: * @standard EU EFRAG ESRS-XBRL taxonomy
src/currency/fallback/currency-uuid.ts:57: * @standard RFC 9562 §5.8 uuidv8 (the bottom-half hash family)
src/currency/fallback/currency-uuid.ts:58: * @standard RFC 8785 JCS (the canonicalisation that makes equivalence work)
src/currency/fallback/currency-uuid.ts:59: * @standard ISO 4217 §6.5 (X-codes — the currency identity layer)
src/currency/fallback/index.test.ts:19: * @standard ISO 4217 §6.5 "No currency" (XXX numeric 999)
src/currency/fallback/index.ts:448: * @standard IFRS 7 §22 fair-value hierarchy (each quote's source maps to a level)
src/currency/fallback/index.ts:449: * @standard IAS 21 §38 presentation-currency translation
src/currency/fallback/index.ts:55: * @standard ISO 4217 §6.5 "No currency" — code XXX, numeric 999
src/currency/fallback/index.ts:56: * @standard EN 16931 §BG-7 currency-code element (XXX accepted)
src/currency/fallback/index.ts:57: * @standard ISO 20022 pacs.008.001.10 §Ccy attribute (XXX accepted)
src/currency/fallback/index.ts:58: * @standard IFRS 1 §IG7 non-monetary items presentation
src/currency/rates/index.ts:14: * @standard ISO-4217:2015 currency-codes from-currency to-currency
src/currency/rates/index.ts:15: * @standard ISO-8601-1:2019 date-time rate-date
src/currency/reconciliation/index.ts:14: * @standard ISO-4217:2023 (currency codes, decimal places)
src/currency/reconciliation/index.ts:15: * @standard IFRS-21:2023 (translation of foreign operations)
src/currency/reconciliation/index.ts:16: * @standard IFRS-9:2023 (foreign exchange gains/losses)
src/currency/reconciliation/index.ts:17: * @standard SAF-T:3.0.2 (multi-currency period coding)
src/customer/segments/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/customers/contracts/contract/amendments/index.ts:21: * @standard IFRS IFRS-15 §20 contract-modifications
src/customers/contracts/contract/amendments/index.ts:22: * @standard IFRS IFRS-15 §10 contract-with-customer
src/customers/contracts/contract/amendments/index.ts:23: * @standard IFRS IAS-8 accounting-policies changes
src/customers/contracts/contract/amendments/index.ts:24: * @standard IFRS IAS-1 presentation-of-financial-statements
src/customers/contracts/contract/amendments/index.ts:25: * @standard US-GAAP ASC-606-10-25-13 contract-modifications
src/customers/contracts/contract/amendments/index.ts:26: * @standard ISO-8601-1:2019 date-time amendment-effective-date
src/customers/contracts/contract/amendments/index.ts:27: * @standard ISO-4217:2015 currency-codes
src/customers/contracts/contract/performances/index.ts:22: * @standard IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition
src/customers/contracts/contract/performances/index.ts:23: * @standard IFRS IFRS-15 §35 over-time-recognition
src/customers/contracts/contract/performances/index.ts:24: * @standard IFRS IFRS-15 §22 performance-obligations
src/customers/contracts/contract/performances/index.ts:25: * @standard IFRS IAS-1 presentation-of-financial-statements
src/customers/contracts/contract/performances/index.ts:26: * @standard US-GAAP ASC-606-10-25-25 performance-obligations
src/customers/contracts/contract/performances/index.ts:27: * @standard US-GAAP ASC-606-10-25-27 transfer-of-control
src/customers/contracts/contract/performances/index.ts:28: * @standard ISO-8601-1:2019 date-time completion-dates
src/customers/contracts/contract/performances/index.ts:29: * @standard ISO-4217:2015 currency-codes
src/customers/contracts/contract/signatures/index.ts:20: * @standard IFRS IFRS-15 §10 contract-with-customer
src/customers/contracts/contract/signatures/index.ts:21: * @standard IFRS IFRS-15 §23 contract-identification
src/customers/contracts/contract/signatures/index.ts:22: * @standard US-GAAP ASC-606-10-25-1 contract-existence
src/customers/contracts/contract/signatures/index.ts:23: * @standard SOX §302 management-certification audit-trail
src/customers/contracts/contract/signatures/index.ts:24: * @standard eIDAS Regulation (EU) 2014/910 electronic-signature
src/customers/contracts/contract/signatures/index.ts:25: * @standard ISO-8601-1:2019 date-time signature-timestamp
src/customers/contracts/index.ts:22: * @standard IFRS IFRS-15 §10 contract-with-customer
src/customers/contracts/index.ts:23: * @standard IFRS IFRS-15 §17 contract-combination
src/customers/contracts/index.ts:24: * @standard IFRS IFRS-15 §22 performance-obligations
src/customers/contracts/index.ts:25: * @standard IFRS IFRS-15 §47 transaction-price decomposition
src/customers/contracts/index.ts:26: * @standard IFRS IFRS-15 §50-59 variable-consideration
src/customers/contracts/index.ts:27: * @standard IFRS IFRS-15 §60-65 financing-component
src/customers/contracts/index.ts:28: * @standard IFRS IAS-1 presentation-of-financial-statements
src/customers/contracts/index.ts:29: * @standard US-GAAP ASC-606-10-25 contract-existence
src/customers/contracts/index.ts:30: * @standard US-GAAP ASC-606-10-25-9 contract-combination
src/customers/contracts/index.ts:31: * @standard US-GAAP ASC-606-10-25-13 contract-modifications
src/customers/contracts/index.ts:32: * @standard ISO-4217:2015 currency-codes
src/customers/contracts/index.ts:33: * @standard ISO-8601-1:2019 date-time effective-from effective-to
src/customers/contracts/performance/obligations/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/customers/contracts/performance/obligations/index.ts:21: * @standard ISO-8601-1:2019 date-time satisfaction-date
src/customers/index.ts:10: * @standard ISO-4217:2015 currency-codes default-currency
src/customers/index.ts:11: * @standard ISO-3166-1:2020 country-codes via-addresses
src/customers/index.ts:12: * @standard ISO-17442-1:2020 lei
src/customers/index.ts:13: * @standard ISO-13616-1:2020 iban
src/customers/index.ts:14: * @standard EN-16931:2017 §BG-7 buyer
src/customers/kyc/checks/index.ts:4: * @standard ISO/IEC-19794 biometric-data-interchange-formats
src/customers/kyc/checks/index.ts:5: * @standard FATF-Recommendation-10 customer-due-diligence
src/customers/projects/index.ts:19: * @standard ISO-8601-1:2019 date-time
src/customers/projects/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/customers/projects/project/milestones/index.ts:10: * @standard ISO-8601-1:2019 date-time
src/customers/projects/project/milestones/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/customers/projects/project/tasks/index.ts:13: * @standard ISO-8601-1:2019 date-time
src/customers/projects/wip/snapshots/index.ts:15: * @standard ISO-8601-1:2019 date-time
src/customers/projects/wip/snapshots/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/customers/quotes/index.ts:8: * @standard ISO-4217:2015 currency-codes
src/customers/quotes/index.ts:9: * @standard ISO-8601-1:2019 date-time issued-at expires-at
src/customers/sales/orders/index.ts:25: * @standard UBL-2.1 Order document-schema
src/customers/sales/orders/index.ts:26: * @standard UN-EDIFACT ORDERS d96a customer-order
src/customers/sales/orders/index.ts:27: * @standard UN-EDIFACT ORDRSP d96a order-response
src/customers/sales/orders/index.ts:28: * @standard Peppol-BIS-3.0 Order ordering-process
src/customers/sales/orders/index.ts:29: * @standard EN-16931:2017 §BG-13 delivery-information (downstream of the order)
src/customers/sales/orders/returns/index.ts:4: * @standard ISO-8601-1:2019 date-time
src/customers/sales/orders/shipments/customs/declarations/index.ts:11: * @standard ISO-8601-1:2019 date-time declaration-date
src/customers/sales/orders/shipments/customs/declarations/index.ts:12: * @standard ISO-3166-1:2020 country-codes country-of-origin
src/customers/sales/orders/shipments/customs/declarations/index.ts:13: * @standard ISO-4217:2015 currency-codes valuation-currency
src/customers/sales/orders/shipments/customs/declarations/index.ts:14: * @standard WCO HS Convention harmonised-system
src/customers/sales/orders/shipments/customs/declarations/index.ts:15: * @standard EU UCC Regulation 952/2013 union-customs-code
src/customers/sales/orders/shipments/customs/declarations/index.ts:16: * @standard WCO Data Model 3.x customs-data-elements
src/customers/sales/orders/shipments/index.ts:4: * @standard ISO-8601-1:2019 date-time shipped-at delivered-at
src/customers/sales/orders/shipments/index.ts:5: * @standard EN-16931:2017 §BG-13 delivery-information
src/customers/sales/orders/shipments/index.ts:6: * @standard ISO-3166-1:2020 country-codes ship-from ship-to
src/customers/sales/orders/shipments/tracking/events/index.ts:12: * @standard ISO-8601-1:2019 date-time event-time
src/customers/sales/orders/shipments/tracking/events/index.ts:13: * @standard INCOTERMS 2020 control-transfer-points
src/customers/sales/orders/shipments/tracking/events/index.ts:14: * @standard EDIFACT IFTSTA international-multimodal-status-message
src/dashboard/index.tsx:16: * @standard ECMA-262 ECMAScript-2024 baseline
src/dashboard/index.tsx:17: * @standard ISO-4217:2015 currency-codes monetary-display
src/data/processing/activities/index.ts:8: * @standard ISO-8601-1:2019 date-time review-due-at
src/data/subject/requests/index.ts:8: * @standard ISO-8601-1:2019 date-time submitted-at completed-at
src/decentralization/index.ts:12: * @standard Nakamoto coefficient (Srinivasan & Lee, 2017)
src/decentralization/index.ts:13: * @standard Herfindahl–Hirschman Index (HHI)
src/decentralization/index.ts:14: * @standard Gini coefficient
src/decentralization/index.ts:15: * @standard Barabási–Albert preferential attachment (1999) — why flat networks re-centralize
src/decompression/index.ts:44: * @standard Haldane half-time model (idealised compartments double 5·10·20·40)
src/decompression/index.ts:45: * @standard Bühlmann ZH-L16 — 16 compartments, gradient-factor / M-value theory
src/decompression/index.ts:46: * @standard SFIA 8 responsibility-levels (1..7) — the M-value depth axis
src/default/lexical/index.ts:4: * @standard W3C HTML5 Living Standard rich-text-output
src/default/lexical/index.ts:5: * @standard CommonMark 0.31 markdown-fallback
src/default/lexical/index.ts:7: * @standard BCP-47 language-tag locale-aware-content
src/default/lexical/index.ts:9: * @standard schema.org HTMLRichText
src/depreciation.service/index.ts:21: * @standard ISO-8601-1:2019 date-time period-start period-end
src/depreciation.service/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/derive/country/from/iban/index.ts:10: * @standard ISO-13616-1:2020 iban
src/derive/country/from/iban/index.ts:11: * @standard ISO-3166-1:2020 country-codes alpha-2
src/did/index.ts:8: * @standard W3C DID Core v1.0 — https://www.w3.org/TR/did-core/
src/did/index.ts:9: * @standard W3C DID Specification Registries
src/digit/index.ts:19: * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
src/dimension/index.ts:27: * @standard W3C Web Components composition pattern
src/dimension/index.ts:28: * @standard ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries
src/discriminator/index.ts:12: * @standard ECMA-262 ECMAScript-2024 baseline
src/diversity/index.ts:11: * @standard Shannon (1948) A Mathematical Theory of Communication — information entropy
src/diversity/index.ts:12: * @standard Simpson (1949) Measurement of Diversity — Nature 163:688
src/diversity/index.ts:13: * @standard Pielou (1966) The Measurement of Diversity in Different Types of Biological Collections
src/domain/verification/index.ts:14: * @standard RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation
src/drone/index.ts:13: * @standard RFC 9562 §5.8 content-uuid (the nodes a drone flies)
src/ecommerce/access/adminOnlyFieldAccess.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/ecommerce/access/customerOnlyFieldAccess.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/ecommerce/access/isAdmin.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control
src/ecommerce/access/isCustomer.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control
src/ecommerce/access/isDocumentOwner.ts:7: * @standard NIST INCITS-359-2012 role-based-access-control
src/ecommerce/access/utilities.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/ecommerce/configureEcommercePlugin/index.ts:10: * @standard ISO-8601-1:2019 date-time
src/ecommerce/configureEcommercePlugin/index.ts:8: * @standard ISO-4217:2015 currency-codes
src/ecommerce/configureEcommercePlugin/index.ts:9: * @standard ISO-3166-1:2020 country-codes
src/ecommerce/createTenantStripePaymentMethod/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:20: * @standard ISO-4217:2015 currency-codes
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:21: * @standard ISO-8601-1:2019 date-time activated-at completed-at cancelled-at refunded-at
src/ecommerce/productValidation/index.ts:6: * @standard GS1 GTIN global-trade-item-number
src/ecommerce/productValidation/index.ts:7: * @standard schema.org Product
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:8: * @standard ISO-4217:2015 currency-codes
src/ecommerce/stripe/tenantConfirmOrder.ts:8: * @standard ISO-4217:2015 currency-codes
src/ecommerce/stripe/tenantConfirmOrder.ts:9: * @standard ISO-8601-1:2019 date-time confirmed-at
src/ecommerce/stripe/tenantStripeWebhook.ts:9: * @standard HMAC-SHA256 RFC 2104 signature-scheme
src/ecosystem/index.ts:14: * @standard Tansley (1935) — coined "ecosystem": organisms plus environment as one system
src/ecosystem/index.ts:15: * @standard Lindeman, The Trophic-Dynamic Aspect of Ecology (1942) — ~10% energy per level
src/ecosystem/index.ts:16: * @standard Elton (1958) vs May, Will a Large Complex System be Stable? (1972) — diversity–stability debate
src/edifact/export.service/index.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing
src/edifact/export.service/index.test.ts:8: * @standard UN-EDIFACT D.96A
src/edifact/export.service/index.test.ts:9: * @standard ISO-9735:2002 edifact-syntax-rules
src/edifact/export.service/index.ts:16: * @standard UN-EDIFACT D.96A
src/edifact/export.service/index.ts:17: * @standard ISO-9735:2002 edifact-syntax-rules
src/element/index.ts:7: * @standard IUPAC periodic table — periods, groups, main-group valence
src/element/index.ts:8: * @standard Lewis octet rule (duet for period 1) — stability = a full outer shell
src/email/tenantAwareResendEmailAdapter/index.ts:24: * @standard BCP-47 language-tag email-locale
src/emission/index.ts:16: * @standard IPCC AR5 (2014) — 100-yr Global Warming Potentials (Table 8.A.1)
src/emission/index.ts:17: * @standard GHG Protocol Corporate Standard (Scope 1 / 2 / 3)
src/emission/index.ts:18: * @standard ISO 14064 — Greenhouse gas quantification and reporting
src/emit/domain/event/index.ts:15: * @standard ISO-8601-1:2019 date-time event-timestamp
src/employees/expense/reports/index.ts:10: * @standard ISO-4217:2015 currency-codes
src/employees/expense/reports/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/employees/index.ts:10: * @standard ISO-3166-2:2020 subdivision-codes
src/employees/index.ts:11: * @standard ISO-13616-1:2020 iban payroll-bank-account
src/employees/index.ts:12: * @standard ISO-9362:2022 bic payroll-bank-account
src/employees/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/employees/index.ts:14: * @standard ISO-8601-1:2019 date-time hire-date termination-date
src/employees/index.ts:15: * @standard ISO-17442-1:2020 lei employer-identifier
src/employees/index.ts:9: * @standard ISO-3166-1:2020 country-codes citizenship work-country
src/employees/leave/requests/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/employees/performance/reviews/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/employees/sales/commissions/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/employees/sales/commissions/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/employees/share/based/payments/index.ts:10: * @standard IFRS IFRS-2 §10-§13 equity-settled-share-based-payment
src/employees/share/based/payments/index.ts:11: * @standard IFRS IFRS-2 §15-§19 vesting-conditions
src/employees/share/based/payments/index.ts:12: * @standard IFRS IFRS-2 §30-§33 cash-settled-share-based-payment
src/employees/share/based/payments/index.ts:13: * @standard IFRS IFRS-2 §44 disclosure-requirements
src/employees/share/based/payments/index.ts:14: * @standard US-GAAP ASC-718 stock-compensation
src/employees/share/based/payments/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/employees/share/based/payments/index.ts:16: * @standard ISO-8601-1:2019 date-time grant-vesting-exercise
src/employees/time/entries/index.ts:8: * @standard ISO-8601-1:2019 date-time work-date
src/employees/time/entries/index.ts:9: * @standard ISO-4217:2015 currency-codes hourly-rate
src/en/16931/collection-alignment.test.ts:10: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/en/16931/collection-alignment.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/en/16931/index.ts:4: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/en/16931/types.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing
src/en/16931/types.test.ts:8: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/en/16931/types.ts:101: * @standard EN-16931:2017 BG-30 line-vat-information
src/en/16931/types.ts:119: * @standard EN-16931:2017 BG-25 invoice-line
src/en/16931/types.ts:13: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/en/16931/types.ts:14: * @standard ISO-4217:2015 currency-codes
src/en/16931/types.ts:15: * @standard ISO-8601-1:2019 date-time
src/en/16931/types.ts:168: * @standard EN-16931:2017 BG-27 invoice-line-allowances
src/en/16931/types.ts:182: * @standard EN-16931:2017 BG-28 invoice-line-charges
src/en/16931/types.ts:198: * @standard EN-16931:2017 BG-20 document-level-allowances
src/en/16931/types.ts:220: * @standard EN-16931:2017 BG-21 document-level-charges
src/en/16931/types.ts:238: * @standard EN-16931:2017 BG-23 vat-breakdown
src/en/16931/types.ts:260: * @standard EN-16931:2017 BG-22 document-totals
src/en/16931/types.ts:28: * @standard EN-16931:2017 BT-3 invoice-type-code
src/en/16931/types.ts:292: * @standard EN-16931:2017 BG-1 invoice
src/en/16931/types.ts:29: * @standard UN-CEFACT 1001 document-name-code
src/en/16931/types.ts:49: * @standard EN-16931:2017 BT-151 vat-category-code
src/en/16931/types.ts:50: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/en/16931/types.ts:60: * @standard EN-16931:2017 BT-81 payment-means-type-code
src/en/16931/types.ts:61: * @standard UN-CEFACT 4461 payment-means
src/en/16931/types.ts:81: * @standard EN-16931:2017 BG-29 price-details
src/en/16931/validate.ts:6: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/en/16931/validate.ts:7: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/en/16931/validate.ts:8: * @standard UN-CEFACT 1001 document-name-code
src/en/16931/validate.ts:9: * @standard UN-CEFACT 4461 payment-means
src/entanglement/index.ts:22: * @standard ER=EPR — Maldacena & Susskind, "Cool horizons for entangled black holes" (2013)
src/entity/types/index.ts:11: * @standard COSO-2013 entity-classification
src/entry/index.ts:24: * @standard IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)
src/entry/index.ts:25: * @standard FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation
src/entry/index.ts:26: * @standard ISO 20022: debtor/creditor are the two signs of ONE transfer
src/erpax/api/surface/index.ts:11: * @standard ISO-8601:2019 date-and-time-extended-format
src/error/codedError.ts:10: * @standard OWASP-ASVS V7 error-handling-and-logging
src/error/errorCodes.ts:9: * @standard OWASP-ASVS V7 error-handling-and-logging
src/error/httpApiError.ts:7: * @standard OWASP-ASVS V7 error-handling-and-logging
src/error/index.ts:11: * @standard OWASP-ASVS V7 error-handling-and-logging
src/error/registry.ts:10: * @standard OWASP-ASVS V7 error-handling-and-logging
src/error/uuid/index.ts:47: * @standard ISO/IEC 25010:2023 §5.6 reliability
src/error/uuid/index.ts:48: * @standard NIST SP 800-92 §3.4 log integrity (errors as audited events)
src/error/uuid/index.ts:49: * @standard W3C Problem Details for HTTP APIs (RFC 9457 — type + title + status)
src/error/uuid/index.ts:50: * @standard ISO 19011:2018 §6.4.6 audit-evidence (errors are evidence)
src/etsi/en/319/142/evidence-attestation.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/etsi/en/319/142/evidence-attestation.test.ts:6: * @standard ISO-19005-2:2011 pdf-a-2
src/etsi/en/319/142/evidence-attestation.test.ts:7: * @standard ISO-14289-1:2014 pdf-ua-1
src/etsi/en/319/142/evidence-attestation.test.ts:8: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/etsi/en/319/142/index.ts:4: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/etsi/en/319/142/index.ts:5: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/etsi/en/319/142/profile.ts:18: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/etsi/en/319/142/profile.ts:19: * @standard ETSI-TS-119-142-1 pades-cms-signature-format
src/etsi/en/319/142/profile.ts:20: * @standard ETSI-EN-319-122-1 cades-baseline-profile (CMS basis for PAdES)
src/etsi/en/319/142/profile.ts:21: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/etsi/en/319/142/profile.ts:22: * @standard rfc-3161 timestamp-protocol
src/etsi/en/319/142/profile.ts:23: * @standard rfc-5652 cryptographic-message-syntax
src/etsi/en/319/142/profile.ts:48: * @standard ETSI-EN-319-142-1 §5.1 baseline-profile-attribute-oids
src/etsi/en/319/142/signature-dictionary.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/etsi/en/319/142/signature-dictionary.test.ts:6: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/etsi/en/319/142/signature-dictionary.test.ts:7: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/etsi/en/319/142/signature-dictionary.ts:20: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/etsi/en/319/142/signature-dictionary.ts:21: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/etsi/en/319/142/signature-dictionary.ts:22: * @standard rfc-5652 cryptographic-message-syntax
src/eu/ai/act/index.ts:10: * @standard EU AI Act 2024 Regulation (EU) 2024/1689
src/eu/ai/act/index.ts:11: * @standard ISO/IEC 23894:2023 ai-risk-management
src/eu/ai/act/index.ts:12: * @standard ISO/IEC 42001:2023 ai-management-system
src/eu/ai/act/index.ts:13: * @standard NIST AI-RMF-1.0 ai-risk-management-framework
src/eu/csrd/esr/index.ts:10: * @standard EU ESRS 1 General Requirements
src/eu/csrd/esr/index.ts:11: * @standard EU ESRS 2 General Disclosures
src/eu/csrd/esr/index.ts:12: * @standard EU ESRS E1 Climate Change (companion to GHG Protocol)
src/eu/csrd/esr/index.ts:13: * @standard IFRS S1 General Sustainability Disclosures
src/eu/csrd/esr/index.ts:14: * @standard IFRS S2 Climate-Related Disclosures
src/eu/csrd/esr/index.ts:15: * @standard EU EFRAG ESRS-XBRL taxonomy
src/eu/csrd/esr/index.ts:9: * @standard EU CSRD Directive 2022/2464
src/event/emitter.service/index.ts:212:   * @standard ISO/IEC-29119:2022 software-testing test-isolation
src/event/emitter.service/index.ts:8: * @standard ISO-8601-1:2019 date-time event-timestamp
src/evidence/attestation/index.ts:20: * @standard ISO-32000-2:2020 pdf
src/evidence/attestation/index.ts:21: * @standard ISO-19005-2:2011 pdf-a-2
src/evidence/attestation/index.ts:22: * @standard ISO-14289-1:2014 pdf-ua-1
src/evidence/attestation/index.ts:23: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/evidence/attestation/index.ts:24: * @standard ISO-8601-1:2019 date-time
src/evidence/attestations/index.ts:13: * @standard ISO-19005-2:2011 pdf-a-2
src/evidence/attestations/index.ts:14: * @standard ISO-14289-1:2014 pdf-ua-1
src/evidence/attestations/index.ts:15: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/evidence/attestations/index.ts:16: * @standard ISO-19011:2018 audit-trail visual-evidence
src/exchange/index.ts:6: * @standard ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)
src/exchange/index.ts:7: * @standard GDPR Art.5(1)(c) data-minimisation (release only the granted fields)
src/export/standards-import.ts:22: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/export/standards-import.ts:23: * @standard Peppol-BIS-3.0 billing
src/export/standards-import.ts:24: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/export/standards-import.ts:25: * @standard UBL-2.1 universal-business-language
src/export/standards.service.ts:124: * @standard RFC-6838 mime-type
src/export/standards.service.ts:20: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/export/standards.service.ts:21: * @standard Peppol-BIS-3.0 billing
src/export/standards.service.ts:22: * @standard UBL-2.1 universal-business-language
src/export/standards.service.ts:23: * @standard UN-EDIFACT D.96A
src/export/standards.service.ts:24: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/export/standards.service.ts:25: * @standard ISO-9735:2002 edifact-syntax-rules
src/export/types.ts:13: * @standard ISO-8601-1:2019 date-time (asOfDate)
src/export/types.ts:14: * @standard ISO/IEC-29500:2016 office-open-xml (xlsx)
src/export/types.ts:15: * @standard ISO-19005-2:2011 pdf-a-2 (archival — see @/standards/iso-19005)
src/export/types.ts:16: * @standard ISO-14289-1:2014 pdf-ua-1 (accessibility — see @/standards/iso-14289)
src/factory/collection-factory.test.ts:13: * @standard ISO/IEC 25010:2023 §5.5 testability — factory dedup contract
src/factory/collection-factory.ts:70: * @standard ISO/IEC 25010:2023 §5.4 reusability — DRY by factory
src/factory/recompute-parent-aggregates.ts:22: * @standard EN-16931:2017 BT-106/109/110/112 document-totals
src/factory/recompute-parent-aggregates.ts:23: * @standard ISA-95 IEC-62264 production-order-aggregation
src/fair/value/measurements/index.ts:10: * @standard IFRS IFRS-13 §9 fair-value-definition
src/fair/value/measurements/index.ts:11: * @standard IFRS IFRS-13 §72 fair-value-hierarchy-three-levels
src/fair/value/measurements/index.ts:12: * @standard IFRS IFRS-13 §76 level-1-quoted-prices
src/fair/value/measurements/index.ts:13: * @standard IFRS IFRS-13 §81 level-2-observable-inputs
src/fair/value/measurements/index.ts:14: * @standard IFRS IFRS-13 §86 level-3-unobservable-inputs
src/fair/value/measurements/index.ts:15: * @standard IFRS IFRS-13 §93 disclosure-requirements
src/fair/value/measurements/index.ts:16: * @standard US-GAAP ASC-820 fair-value-measurement
src/fair/value/measurements/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/fair/value/measurements/index.ts:18: * @standard ISO-8601-1:2019 date-time measurement-date
src/feature/registry/index.ts:26: * @standard ISO/IEC 25010:2023 quality-model functional-suitability
src/feature/registry/index.ts:27: * @standard NIST INCITS-359-2012 role-based-access-control
src/federation/exchange.ts:6: * @standard W3C Linked Data Notifications + ActivityPub
src/federation/index.ts:10: * @standard W3C Activity Streams 2.0 + ActivityPub + LDN
src/federation/index.ts:11: * @standard W3C Verifiable Credentials Data Model 2.0
src/federation/types.ts:10: * @standard W3C Linked Data Notifications (LDN)
src/federation/types.ts:11: * @standard ActivityPub server-to-server protocol
src/federation/types.ts:12: * @standard W3C Verifiable Credentials Data Model 2.0
src/federation/types.ts:9: * @standard W3C Activity Streams 2.0 (federated content envelope)
src/financial/reporting.service/index.ts:4: * @standard ISO-4217:2015 currency-codes
src/financial/reporting.service/index.ts:5: * @standard ISO-8601-1:2019 date-time fiscal-period
src/financial/reporting.service/index.ts:6: * @standard BCP-47 language-tag i18n
src/financial/statements/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/financial/statements/index.ts:17: * @standard ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at
src/financial/statements/index.ts:18: * @standard BCP-47 language-tag
src/fiscal/devices/index.ts:16: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register
src/fiscal/devices/sales/index.ts:23: * @standard BG Наредба-Н-18 §СУПТО sale-register · УНП · no-delete · сторно
src/fiscal/index.ts:8: * @standard BG Наредба-Н-18 §СУПТО
src/fiscal/period/index.ts:10: * @standard ISO-4217:2023 Currency codes
src/fiscal/period/index.ts:11: * @standard SAF-T:3.0.2 Standard Audit File for Tax
src/fiscal/period/index.ts:12: * @standard XBRL-GL General Ledger
src/fiscal/period/index.ts:13: * @standard GDPR:2016/679 Art. 32 Security of processing
src/fiscal/period/index.ts:14: * @standard eIDAS:2014/910/EU Electronic signatures
src/fiscal/period/index.ts:15: * @standard SOX:2002 Sec. 404 Internal control assessment
src/fiscal/period/index.ts:16: * @standard NIST-SP-800-92 Audit logging
src/fiscal/period/index.ts:8: * @standard IAS-34:2023 Interim Financial Reporting
src/fiscal/period/index.ts:9: * @standard ISO-8601:2019 Date/Time representation
src/fiscal/period/resolver/index.ts:11: * @standard IAS-34:2023 (period structure, quarterly alignment)
src/fiscal/period/resolver/index.ts:12: * @standard ISO-8601:2019 (week numbering, date arithmetic, leap year)
src/fiscal/period/resolver/index.ts:13: * @standard ISO-4217:2023 (currency context)
src/fiscal/period/resolver/index.ts:14: * @standard SAF-T:3.0.2 (regulatory period coding)
src/fiscal/periods/carbon/emissions/index.ts:13: * @standard ISO 14064-1:2018 organisation-level-ghg-quantification
src/fiscal/periods/carbon/emissions/index.ts:14: * @standard ISO 14067:2018 carbon-footprint-of-products
src/fiscal/periods/carbon/emissions/index.ts:15: * @standard GHG Protocol Corporate Standard (revised 2015)
src/fiscal/periods/carbon/emissions/index.ts:16: * @standard GHG Protocol Scope 2 Guidance (2015)
src/fiscal/periods/carbon/emissions/index.ts:17: * @standard GHG Protocol Scope 3 Standard (2011)
src/fiscal/periods/carbon/emissions/index.ts:18: * @standard EU ESRS E1 §44-50 ghg-emissions-disclosure
src/fiscal/periods/carbon/emissions/index.ts:19: * @standard EU ESRS E1 AR-25 location-vs-market-based
src/fiscal/periods/earnings/per/shares/index.ts:11: * @standard IFRS IAS-33 §10 basic-eps
src/fiscal/periods/earnings/per/shares/index.ts:12: * @standard IAS-33 §11-§19 weighted-average-number-of-ordinary-shares
src/fiscal/periods/earnings/per/shares/index.ts:13: * @standard IFRS IAS-33 §30-§63 diluted-eps
src/fiscal/periods/earnings/per/shares/index.ts:14: * @standard IFRS IAS-33 §66-§70 disclosure
src/fiscal/periods/earnings/per/shares/index.ts:15: * @standard US-GAAP ASC-260 earnings-per-share
src/fiscal/periods/earnings/per/shares/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/fiscal/periods/earnings/per/shares/index.ts:17: * @standard ISO-8601-1:2019 date-time period-end
src/fiscal/periods/fiscal/period/snapshots/index.ts:10: * @standard GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)
src/fiscal/periods/fiscal/period/snapshots/index.ts:11: * @standard eIDAS:2014/910/EU (signature on critical amendments)
src/fiscal/periods/fiscal/period/snapshots/index.ts:12: * @standard SOX:2002 (access control audit evidence, change log)
src/fiscal/periods/fiscal/period/snapshots/index.ts:13: * @standard NIST-SP-800-92 (audit logging, integrity verification)
src/fiscal/periods/index.ts:19: * @standard ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering
src/fiscal/periods/index.ts:20: * @standard IAS-34:2023 interim-financial-reporting period-structure quarterly-alignment
src/fiscal/periods/index.ts:21: * @standard ISO-4217:2015 currency-code per-fiscal-configuration
src/fiscal/periods/index.ts:22: * @standard SAF-T 3.0.2 regulatory-period-coding audit-file-structure
src/fiscal/periods/index.ts:23: * @standard XBRL-GL fiscal-context general-ledger-reporting
src/fiscal/periods/post/balance/sheet/events/index.ts:10: * @standard IFRS IAS-10 §3 adjusting-vs-non-adjusting-events
src/fiscal/periods/post/balance/sheet/events/index.ts:11: * @standard IFRS IAS-10 §8 adjusting-events-recognise
src/fiscal/periods/post/balance/sheet/events/index.ts:12: * @standard IFRS IAS-10 §10 non-adjusting-events-disclose
src/fiscal/periods/post/balance/sheet/events/index.ts:13: * @standard IFRS IAS-10 §17 going-concern-after-reporting-date
src/fiscal/periods/post/balance/sheet/events/index.ts:14: * @standard IFRS IAS-10 §21 disclosure-requirements
src/fiscal/periods/post/balance/sheet/events/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/fiscal/periods/post/balance/sheet/events/index.ts:16: * @standard ISO-8601-1:2019 date-time event-date authorisation-date
src/fiscal/periods/prior/period/adjustments/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/fiscal/periods/prior/period/adjustments/index.ts:12: * @standard ISO-8601-1:2019 date-time adjustment-date post-date
src/fiscal/periods/provisions/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/fiscal/periods/provisions/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/fiscal/periods/tax/periods/index.ts:14:  * @standard OECD tax-period-coding
src/fiscal/periods/tax/periods/index.ts:15: * @standard SAF-T OECD reporting-period
src/fiscal/periods/tax/periods/index.ts:16: * @standard ISO-8601-1:2019 period-dates
src/fiscal/periods/tax/periods/transfer/pricing/adjustments/index.ts:13:  * @standard OECD Transfer-Pricing-Guidelines-2022
src/fiscal/periods/tax/periods/transfer/pricing/adjustments/index.ts:15: * @standard US IRC §482 arms-length
src/fixed/assets/depreciation/schedules/hooks/depreciation.ts:23: * @standard ISO-8601-1:2019 date-time depreciation-period
src/fixed/assets/depreciation/schedules/index.ts:8: * @standard ISO-8601-1:2019 date-time period-end
src/fixed/assets/depreciation/schedules/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/fixed/assets/index.ts:24: * @standard ISO-4217:2015 currency-codes
src/fixed/assets/index.ts:25: * @standard ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date
src/footer/config.ts:4: * @standard schema.org WPFooter
src/footer/config.ts:5: * @standard W3C HTML5 footer-element
src/footer/config.ts:6: * @standard WAI-ARIA 1.2 contentinfo-landmark-role
src/footer/config.ts:7: * @standard BCP-47 language-tag
src/fx/transactions/index.ts:11: * @standard ISO-4217:2015 currency-codes from-to-currency-pair
src/fx/transactions/index.ts:12: * @standard ISO-8601-1:2019 date-time transaction-date
src/generate/meta/index.ts:6: * @standard W3C-HTML5 §4.2.5 meta-element
src/generate/meta/index.ts:7: * @standard OGP open-graph-protocol-1.0
src/generate/reversing/entry/index.ts:18: * @standard IAS-34:2023 Interim closing reversals required at period start
src/generate/reversing/entry/index.ts:19: * @standard SAF-T:3.0.2 Reversal entries must have distinct GL accounts + posting dates
src/get/enabled/locales/for/tenant/index.ts:5: * @standard BCP-47 language-tag
src/get/enabled/locales/for/tenant/index.ts:7: * @standard ECMA-402 internationalization-api
src/get/enabled/locales/for/tenant/index.ts:8: * @standard EU 1958/1 official-languages-of-the-european-union
src/get/preview/secret/index.ts:5: * @standard NIST SP-800-108 key-derivation-function
src/get/tenant/from/request/index.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control tenant-scope
src/get/user/tenant/i/ds/index.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control user-role-assignment
src/ghg/protocol/index.ts:10: * @standard GHG Protocol Scope 2 Guidance (2015)
src/ghg/protocol/index.ts:11: * @standard GHG Protocol Scope 3 Standard (2011)
src/ghg/protocol/index.ts:12: * @standard ISO 14064-1:2018 organisation-level-ghg-quantification
src/ghg/protocol/index.ts:13: * @standard EU ESRS E1 §44-50 ghg-emissions-disclosure (companion)
src/ghg/protocol/index.ts:14: * @standard IFRS S2 §29-32 climate-related-metrics (companion)
src/ghg/protocol/index.ts:9: * @standard GHG Protocol Corporate Standard (revised 2015)
src/gl/account.service/index.ts:4: * @standard ISO-4217:2015 currency-codes account-currency
src/gl/account/resolver/index.ts:24: * @standard ISO-4217:2015 currency-codes
src/gl/accounts/account/reconciliations/index.ts:21: * @standard ISO-8601-1:2019 date-time as-of-date approved-at
src/gl/accounts/account/reconciliations/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/gl/accounts/bank/statements/hooks/bank-statement.ts:20: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/gl/accounts/bank/statements/hooks/bank-statement.ts:21: * @standard ISO-13616-1:2020 iban
src/gl/accounts/bank/statements/hooks/bank-statement.ts:22: * @standard ISO-9362:2022 bic
src/gl/accounts/bank/statements/hooks/bank-statement.ts:23: * @standard ISO-4217:2015 currency-codes
src/gl/accounts/bank/statements/hooks/bank-statement.ts:24: * @standard ISO-8601-1:2019 date-time statement-date transaction-date
src/gl/accounts/bank/statements/index.ts:18: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/gl/accounts/bank/statements/index.ts:19: * @standard ISO-13616-1:2020 iban
src/gl/accounts/bank/statements/index.ts:20: * @standard ISO-9362:2022 bic
src/gl/accounts/bank/statements/index.ts:21: * @standard ISO-4217:2015 currency-codes
src/gl/accounts/bank/statements/index.ts:22: * @standard ISO-8601-1:2019 date-time statement-date period-start reconciled-at
src/gl/accounts/index.ts:10: * @standard ISO-4217:2015 currency-codes account-currency
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.test.ts:11: * @standard ISO/IEC-29119:2022 software-testing
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts:31: * @standard ISO-8601-1:2019 date-time posted-date
src/gl/accounts/period/end/adjustments/index.ts:19: * @standard ISO-8601-1:2019 date-time period posted-at
src/gl/accounts/recurring/journals/index.ts:15: * @standard ISO-8601-1:2019 date-time recurrence
src/gl/accounts/recurring/journals/index.ts:16: * @standard rfc-5545 icalendar-rrule recurrence-rule
src/gl/accounts/tax/calculations/index.ts:17: * @standard ISO-3166-1:2020 country-codes jurisdiction
src/gl/accounts/tax/calculations/index.ts:18: * @standard ISO-3166-2:2020 subdivision-codes jurisdiction
src/gl/accounts/tax/calculations/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/gl/accounts/tax/calculations/index.ts:20: * @standard ISO-8601-1:2019 date-time period posted-at filed-at paid-at
src/gl/accounts/tax/calculations/index.ts:21: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/gl/posting.service/index.ts:796:   * @standard ISO 20022 camt.053 reconciliation
src/gl/posting.service/index.ts:8: * @standard ISO-8601-1:2019 date-time posted-date
src/gl/posting.service/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/gl/posting/rules/index.ts:11: * @standard ISO-8601-1:2019 effective-date
src/google/workspace/fusion-transforms.ts:22: * @standard RFC 9562 §5.8 content-addressed uuidv8 (the fusion identity)
src/google/workspace/fusion-transforms.ts:23: * @standard IFRS/IAS double-entry (Σdebit = Σcredit) — the sheets→journal fusion
src/google/workspace/fusion.ts:17: * @standard RFC 9562 §5.8 content-addressed uuidv8 (the fusion identity)
src/google/workspace/registry.ts:16: * @standard IETF RFC 6749 OAuth 2.0 authorization-framework
src/google/workspace/registry.ts:17: * @standard OpenID Connect Core 1.0 (Google as the OIDC provider)
src/google/workspace/registry.ts:18: * @standard Google API Discovery Service (the live machine-readable surface)
src/governance/index.ts:17: * @standard ISO 37000:2021 governance-of-organizations
src/government/grants/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/government/grants/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/graph/index.ts:8: * @standard directed graph (nodes + edges), breadth-first reachability
src/harmony/index.ts:11: * @standard just intonation (5-limit) — the perfect (1:1, 2:1, 3:2, 4:3) and
src/header/config.ts:4: * @standard schema.org WPHeader
src/header/config.ts:5: * @standard W3C HTML5 header-element
src/header/config.ts:6: * @standard WAI-ARIA 1.2 banner-landmark-role
src/header/config.ts:8: * @standard BCP-47 language-tag
src/heart/color/index.ts:7: * @standard A432 tuning; Anahata (4th chakra) = green
src/heart/index.ts:13: * @standard A432 tuning; Anahata = the 4th chakra (green)
src/held/for/sale/classifications/index.ts:12: * @standard IFRS IFRS-5 §6-§9 classification-criteria
src/held/for/sale/classifications/index.ts:13: * @standard IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts
src/held/for/sale/classifications/index.ts:14: * @standard IFRS IFRS-5 §25 depreciation-suspended
src/held/for/sale/classifications/index.ts:15: * @standard IFRS IFRS-5 §31-§40 discontinued-operations-presentation
src/held/for/sale/classifications/index.ts:16: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/held/for/sale/classifications/index.ts:17: * @standard US-GAAP ASC-205-20 discontinued-operations
src/held/for/sale/classifications/index.ts:18: * @standard US-GAAP ASC-360-10 long-lived-assets-held-for-sale
src/held/for/sale/classifications/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/held/for/sale/classifications/index.ts:20: * @standard ISO-8601-1:2019 date-time classification-date
src/hero/config.ts:4: * @standard W3C HTML5 section-element
src/hero/config.ts:5: * @standard schema.org WebPageElement
src/hero/config.ts:6: * @standard WAI-ARIA 1.2 region-landmark-role
src/horo/index.ts:20: * @standard ISO-16:1975 a432-tuning-reference (the anchor; value from position)
src/i18n/harvest/index.ts:30: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/i18n/harvest/index.ts:31: * @standard BCP-47 language tags
src/i18n/index.ts:11: * @standard ECMA-402 internationalization-api
src/i18n/index.ts:12: * @standard Unicode-CLDR locale-data
src/i18n/index.ts:13: * @standard W3C Internationalization-Best-Practices
src/i18n/index.ts:7: * @standard BCP-47 language-tag
src/i18n/localization/index.ts:10: * @standard ECMA-402 internationalization-api
src/i18n/localization/index.ts:11: * @standard Unicode-CLDR locale-data
src/i18n/localization/index.ts:12: * @standard EU 1958/1 official-languages-of-the-european-union
src/i18n/localization/index.ts:8: * @standard BCP-47 language-tag
src/i18n/request/index.ts:7: * @standard BCP-47 language-tag
src/i18n/request/index.ts:9: * @standard ECMA-402 internationalization-api
src/i18n/routing/index.ts:10: * @standard W3C URL Living Standard
src/i18n/routing/index.ts:11: * @standard ECMA-402 internationalization-api
src/i18n/routing/index.ts:7: * @standard BCP-47 language-tag
src/iban/index.ts:10: * @standard ISO-7064:2003 mod-97-10 check-digits
src/iban/index.ts:9: * @standard ISO-13616-1:2020 iban
src/identification/index.ts:41: * @standard RFC 9562 §5.8 uuidv8
src/identification/index.ts:42: * @standard RFC 7515 JWS compact form
src/identification/index.ts:43: * @standard W3C DID Core 1.0 (DID syntax)
src/identification/index.ts:44: * @standard ISO/IEC 25010:2023 §5.3 operability (one input → one resolver)
src/identity/element/index.ts:46: * @standard ISO/IEC 25010:2023 §5.4 reusability — identity by abstraction
src/identity/element/index.ts:47: * @standard NIST FIPS 180-4 SHA-256 (uuid hash)
src/identity/element/index.ts:48: * @standard RFC 9562 §5.8 uuidv8 (uuid construction)
src/ifrs/15/collection-alignment.test.ts:12: * @standard ISO/IEC-29119:2022 software-testing
src/ifrs/15/index.ts:6: * @standard ISO-4217:2015 currency-codes
src/ifrs/15/types.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/ifrs/15/types.ts:7: * @standard ISO-4217:2015 currency-codes
src/ifrs/15/types.ts:8: * @standard ISO-8601-1:2019 date-time
src/ifrs/15/validate.ts:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/ifrs/16/index.ts:6: * @standard ISO-4217:2015 currency-codes
src/ifrs/16/types.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/ifrs/16/types.ts:7: * @standard ISO-4217:2015 currency-codes
src/ifrs/16/types.ts:8: * @standard ISO-8601-1:2019 date-time
src/ifrs/16/validate.ts:4: * @standard ISO/IEC-29119:2022 software-testing runtime-guards
src/incoterms/2020/index.ts:12: * @standard ICC INCOTERMS 2020 publication-no-723E
src/incoterms/2020/index.ts:13: * @standard ISO 6346 freight-container-code (related)
src/ingest/index.ts:6: * @standard idempotent upsert by content-address (re-runnable, no cursor needed)
src/insurance/contracts/index.ts:12: * @standard IFRS IFRS-17 §3 scope
src/insurance/contracts/index.ts:13: * @standard IFRS IFRS-17 §32 general-measurement-model-building-blocks
src/insurance/contracts/index.ts:14: * @standard IFRS IFRS-17 §38 contractual-service-margin
src/insurance/contracts/index.ts:15: * @standard IFRS IFRS-17 §53 premium-allocation-approach-simplified
src/insurance/contracts/index.ts:16: * @standard IFRS IFRS-17 §B100 variable-fee-approach
src/insurance/contracts/index.ts:17: * @standard IFRS IFRS-17 §93 disclosure-requirements
src/insurance/contracts/index.ts:18: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/insurance/contracts/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/insurance/contracts/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/integrity/content-uuid.test.ts:4: * @standard RFC 9562 §5.8 + RFC 8785 + FIPS 180-4
src/integrity/content-uuid.ts:42: * @standard RFC 9562 §5.8 name-based UUID (version 8, custom layout)
src/integrity/content-uuid.ts:43: * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
src/integrity/content-uuid.ts:44: * @standard ISO/IEC 10118 hash functions
src/integrity/content-uuid.ts:45: * @standard NIST FIPS 180-4 SHA-256
src/integrity/envelope.test.ts:17: * @standard NIST SP 800-38D AES-GCM (AEAD authentication failure case)
src/integrity/envelope.test.ts:18: * @standard RFC 5869 HKDF (the key derivation step)
src/integrity/envelope.ts:48: * @standard NIST SP 800-38D AES-GCM
src/integrity/envelope.ts:49: * @standard NIST SP 800-57 §5.6 key-management lifecycles
src/integrity/envelope.ts:50: * @standard RFC 5116 AEAD
src/integrity/envelope.ts:51: * @standard RFC 5869 HKDF
src/integrity/envelope.ts:52: * @standard ISO/IEC 27040 §6.7 storage security
src/integrity/envelope.ts:53: * @standard ISO/IEC 27001 Annex A.10.1.1 cryptographic-controls policy
src/integrity/envelope.ts:54: * @standard GDPR Article 32(1)(a) encryption of personal data
src/integrity/envelope.ts:55: * @standard HIPAA §164.312(a)(2)(iv) encryption of ePHI
src/integrity/envelope.ts:56: * @standard PCI DSS 4.0 §3.5 strong cryptography
src/integrity/index.ts:7: * @standard RFC 9562 §5.8 + RFC 8785 + ISO/IEC 10118 + NIST FIPS 180-4
src/integrity/resource-bound.ts:30: * @standard NIST FIPS 180-4 sha-256 (the content-uuid digest) — second-preimage 2^256, collision 2^128
src/integrity/resource-bound.ts:31: * @standard Landauer 1961 / Bennett 1982 — kT·ln2 minimum per irreversible bit op
src/integrity/signatures.test.ts:15: * @standard RFC 8032 EdDSA / Ed25519
src/integrity/signatures.test.ts:16: * @standard RFC 7515 JWS compact serialization
src/integrity/signatures.ts:43: * @standard RFC 8032 EdDSA (Ed25519)
src/integrity/signatures.ts:44: * @standard RFC 7515 JSON Web Signature (alg names)
src/integrity/signatures.ts:45: * @standard ETSI EN 319 132-1 XAdES
src/integrity/signatures.ts:46: * @standard ETSI EN 319 142-1 PAdES
src/integrity/signatures.ts:47: * @standard eIDAS Regulation (EU) 910/2014 §3.12 qualified electronic signature
src/integrity/signatures.ts:48: * @standard ISO/IEC 27001 Annex A.10 cryptographic controls
src/integrity/signatures.ts:49: * @standard NIST SP 800-57 §5.6 key-management lifecycles
src/integrity/tamper-proof-uuid-field.ts:36: * @standard RFC 9562 §5.8 + RFC 8785 + NIST FIPS 180-4
src/integrity/tamper-reverse-cost.ts:42: * @standard RFC 4634 / NIST FIPS 180-4 (sha-256 collision resistance)
src/integrity/tamper-reverse-cost.ts:43: * @standard RFC 8032 Ed25519 SUF-CMA security parameter
src/integrity/tamper-reverse-cost.ts:44: * @standard GDPR Article 32 "appropriate technical measures"
src/integrity/tamper-reverse-cost.ts:45: * @standard eIDAS Annex II §1(f) cryptographic strength requirement
src/integrity/tamper-reverse-cost.ts:46: * @standard PCI DSS 4.0 §3.6.1 strong cryptography
src/integrity/tamper-reverse-cost.ts:47: * @standard NIST SP 800-57 §5.6 security strength categorisation
src/integrity/tenant-key-registry.ts:33: * @standard NIST SP 800-57 §5.6 key-management lifecycles
src/integrity/tenant-key-registry.ts:34: * @standard ISO/IEC 27001 Annex A.10.1.2 key-management policy
src/integrity/tenant-key-registry.ts:35: * @standard PCI DSS 4.0 §3.6 key-management procedures
src/integrity/type-uuid.ts:51: * @standard W3C JSON-LD 1.1 + JSON Schema (draft 2020-12)
src/integrity/type-uuid.ts:52: * @standard RFC 9562 §5.8 + RFC 8785 (canonical type uuid)
src/integrity/type-uuid.ts:53: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
src/integrity/type-uuid.ts:54: * @standard W3C Verifiable Credentials Data Model 2.0 (typed claims)
src/integrity/uuid-linked-chain.ts:39: * @standard FIPS 180-4 sha-256
src/integrity/uuid-linked-chain.ts:40: * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
src/integrity/uuid-linked-chain.ts:41: * @standard RFC 9562 §5.8 name-based UUID
src/integrity/uuid-ref.ts:27: * @standard RFC 9562 §5.8 + RFC 8785
src/integrity/uuid-short.ts:40: * @standard RFC 9562 §5.8 — uuidv8 (full form for verification)
src/integrity/uuid-short.ts:41: * @standard ISO/IEC 25010:2023 §5.3 usability — discoverability
src/integrity/uuid-short.ts:42: * @standard ISO/IEC 27001 §A.9.4.5 (information access restriction)
src/integrity/uuid-stream.ts:52: * @standard RFC 9562 §5.8 + RFC 8785 (uuid composition)
src/integrity/uuid-stream.ts:53: * @standard W3C VC Data Model 2.0 (verifiable replicas)
src/integrity/uuid-stream.ts:54: * @standard Topology — torus + Hilbert-space replicas (Hatcher 2002)
src/integrity/uuid-stream.ts:55: * @standard ISO/IEC 25010:2023 §5.2 performance + §5.7 modularity
src/intercompany/reconciliation/index.ts:15: * @standard IAS-27:2023 (consolidated and separate financial statements)
src/intercompany/reconciliation/index.ts:16: * @standard IAS-28:2023 (associates and joint ventures)
src/intercompany/reconciliation/index.ts:17: * @standard IFRS-3:2023 (business combinations)
src/intercompany/reconciliation/index.ts:18: * @standard IFRS-10:2023 (consolidated financial statements)
src/intercompany/reconciliation/index.ts:19: * @standard IFRS-11:2023 (joint arrangements)
src/intercompany/reconciliation/index.ts:20: * @standard SAF-T:3.0.2 (multi-entity audit trail)
src/internal/controls/audit/findings/court-docket.ts:11: * @standard ISO-19011:2018 audit-finding
src/internal/controls/audit/findings/index.ts:7: * @standard ISO-19011:2018 audit-finding
src/internal/controls/audit/findings/index.ts:8: * @standard ISO/IEC-27007:2020 ISMS-auditing
src/internal/controls/audit/findings/remediation/plans/index.ts:4: * @standard COSO-2013 deficiency-remediation
src/internal/controls/control/tests/audit/samples/index.ts:4: * @standard ISA-530 audit-sampling
src/internal/controls/control/tests/index.ts:7: * @standard ISO-19011:2018 audit-sampling
src/internal/controls/index.ts:4: * @standard COSO-2013 internal-control-integrated-framework
src/internal/controls/index.ts:6: * @standard PCAOB AS 2201 ICFR-audit
src/internal/policies/index.ts:5: * @standard ISO-37301:2021 compliance-policy
src/internal/policies/policy/versions/index.ts:5: * @standard ISO-9001:2015 §7.5 documented-information-control
src/invoices/credit/memos/index.ts:18: * @standard ISO-4217:2015 currency-codes
src/invoices/credit/memos/index.ts:19: * @standard ISO-8601-1:2019 date-time issued-at applied-at settled-at
src/invoices/credit/memos/index.ts:20: * @standard EN-16931:2017 credit-note-semantic-model
src/invoices/credit/memos/refunds/index.ts:10: * @standard ISO-20022 pacs.004 payment-return
src/invoices/credit/memos/refunds/index.ts:8: * @standard ISO-4217:2015 currency-codes
src/invoices/credit/memos/refunds/index.ts:9: * @standard ISO-8601-1:2019 date-time refunded-at
src/invoices/dunning/cycles/index.ts:21: * @standard ISO-8601-1:2019 date-time stage-due-date
src/invoices/dunning/cycles/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/invoices/hooks/encryptSensitiveFields.ts:8: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/invoices/hooks/gl-hooks-emit-events.test.ts:13: * @standard ISO/IEC-29119:2022 software-testing
src/invoices/index.ts:48: * @standard EN-16931:2017 semantic-data-model-electronic-invoice
src/invoices/index.ts:49: * @standard EN-16931:2017 §BG-22 document-totals
src/invoices/index.ts:50: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/invoices/index.ts:51: * @standard EN-16931:2017 BT-3 invoice-type-code
src/invoices/index.ts:52: * @standard EN-16931:2017 BT-5 invoice-currency-code
src/invoices/index.ts:53: * @standard Peppol-BIS-3.0 billing electronic-invoicing
src/invoices/index.ts:54: * @standard UN-EDIFACT INVOIC d96a
src/invoices/index.ts:55: * @standard UN-CEFACT 1001 document-name-code
src/invoices/index.ts:56: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/invoices/index.ts:57: * @standard UBL-2.1 universal-business-language
src/invoices/index.ts:58: * @standard ISO-4217:2015 currency-codes
src/invoices/index.ts:59: * @standard ISO-8601-1:2019 date-time invoice-date due-date
src/invoices/invoice/lines/hooks/beforeValidate.ts:10: * @standard EN-16931:2017 §BG-25 invoice-line
src/invoices/invoice/lines/hooks/recomputeInvoiceTotals.ts:17: * @standard EN-16931:2017 BT-106/109/110/112/115 document-totals
src/invoices/invoice/lines/hooks/recomputeItemInventory.ts:17: * @standard US-GAAP ASC-330 inventory
src/invoices/invoice/lines/index.ts:35: * @standard EN-16931:2017 §BG-25 invoice-line
src/invoices/invoice/lines/index.ts:36: * @standard EN-16931:2017 §BG-29 price-details
src/invoices/invoice/lines/index.ts:37: * @standard EN-16931:2017 §BG-30 line-vat-information
src/invoices/invoice/lines/index.ts:38: * @standard EN-16931:2017 §BG-27 invoice-line-allowances
src/invoices/invoice/lines/index.ts:39: * @standard EN-16931:2017 §BG-28 invoice-line-charges
src/invoices/invoice/lines/index.ts:40: * @standard EN-16931:2017 BT-126 invoice-line-identifier
src/invoices/invoice/lines/index.ts:41: * @standard EN-16931:2017 BT-131 invoice-line-net-amount
src/invoices/invoice/lines/index.ts:42: * @standard EN-16931:2017 BT-151 vat-category-code
src/invoices/invoice/lines/index.ts:43: * @standard Peppol-BIS-3.0 billing line-detail
src/invoices/invoice/lines/index.ts:44: * @standard UN-EDIFACT INVOIC §LIN line-segment
src/invoices/invoice/lines/index.ts:45: * @standard ISO-4217:2015 currency-codes
src/invoices/invoice/lines/index.ts:46: * @standard UN-CEFACT-5305 tax-category-codes
src/invoices/payments/hooks/beforeValidate.ts:4: * @standard ISO-20022 financial-messaging
src/invoices/payments/hooks/payment.ts:31: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/invoices/payments/hooks/payment.ts:32: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/invoices/payments/hooks/payment.ts:33: * @standard ISO-4217:2015 currency-codes
src/invoices/payments/hooks/recomputeInvoicePaid.ts:14: * @standard EN-16931:2017 BT-113/115 paid-amount amount-due-for-payment
src/invoices/payments/index.ts:23: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/invoices/payments/index.ts:24: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/invoices/payments/index.ts:25: * @standard ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer
src/invoices/payments/index.ts:26: * @standard ISO-4217:2015 currency-codes
src/invoices/payments/index.ts:27: * @standard ISO-8601-1:2019 date-time payment-date value-date
src/invoices/payments/index.ts:28: * @standard ISO-13616-1:2020 iban
src/invoices/payments/index.ts:29: * @standard ISO-9362:2022 bic
src/invoices/payments/payment/allocations/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/invoices/payments/payment/allocations/index.ts:18: * @standard ISO-8601-1:2019 date-time allocation-date
src/is/super/admin/index.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
src/iso/13616/iban-bg.ts:20: * @standard ISO-13616-1:2020 BG-22 iban-bulgaria
src/iso/13616/iban-bg.ts:21: * @standard ISO-7064:2003 mod-97-10 check-digits
src/iso/13616/iban-bg.ts:22: * @standard ISO-3166-1:2020 BG country-code
src/iso/13616/iban-bg.ts:23: * @standard BNB Регламент 3 §3 bank-account-numbering
src/iso/13616/iban.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/13616/iban.test.ts:5: * @standard ISO-13616-1:2020 iban
src/iso/13616/iban.test.ts:6: * @standard ISO-7064:2003 check-character-systems mod-97-10
src/iso/13616/iban.ts:19: * @standard ISO-13616-1:2020 §6 verification
src/iso/13616/iban.ts:20: * @standard ISO-7064:2003 mod-97-10
src/iso/13616/iban.ts:4: * @standard ISO-13616-1:2020 iban
src/iso/13616/iban.ts:5: * @standard ISO-7064:2003 check-character-systems mod-97-10
src/iso/13616/index.ts:4: * @standard ISO-13616-1:2020 iban
src/iso/14289/index.ts:4: * @standard ISO-14289-1:2014 pdf-ua-1
src/iso/14289/index.ts:5: * @standard ISO-14289-2:2024 pdf-ua-2
src/iso/14289/profile.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/14289/profile.test.ts:5: * @standard ISO-14289-1:2014 pdf-ua-1
src/iso/14289/profile.test.ts:6: * @standard ISO-14289-2:2024 pdf-ua-2
src/iso/14289/profile.ts:21: * @standard ISO-14289-1:2014 pdf-ua-1
src/iso/14289/profile.ts:22: * @standard ISO-14289-2:2024 pdf-ua-2
src/iso/14289/profile.ts:23: * @standard W3C WCAG-2.1 web-content-accessibility-guidelines
src/iso/19005/index.ts:4: * @standard ISO-19005-1:2005 pdf-a-1
src/iso/19005/index.ts:5: * @standard ISO-19005-2:2011 pdf-a-2
src/iso/19005/index.ts:6: * @standard ISO-19005-3:2012 pdf-a-3
src/iso/19005/metadata.ts:10: * @standard W3C XMP-1.0 metadata-platform
src/iso/19005/metadata.ts:11: * @standard rfc-3066 language-tag (xml:lang)
src/iso/19005/metadata.ts:9: * @standard ISO-19005-1:2005 §6.7 metadata-stream
src/iso/19005/profile.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/19005/profile.test.ts:5: * @standard ISO-19005-1:2005 pdf-a-1
src/iso/19005/profile.test.ts:6: * @standard ISO-19005-2:2011 pdf-a-2
src/iso/19005/profile.test.ts:7: * @standard ISO-19005-3:2012 pdf-a-3
src/iso/19005/profile.ts:17: * @standard ISO-19005-1:2005 pdf-a-1
src/iso/19005/profile.ts:18: * @standard ISO-19005-2:2011 pdf-a-2
src/iso/19005/profile.ts:19: * @standard ISO-19005-3:2012 pdf-a-3
src/iso/19005/profile.ts:20: * @standard ISO-32000-1:2008 pdf-1.7
src/iso/19011/collection-alignment.test.ts:10: * @standard ISO-19011:2018 §6.4.6 audit-evidence
src/iso/19011/collection-alignment.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/iso/19011/index.ts:4: * @standard ISO-19011:2018 audit-trail
src/iso/19011/types.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/iso/19011/types.test.ts:9: * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
src/iso/19011/types.ts:10: * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
src/iso/19011/types.ts:11: * @standard ISO-19011:2018 §6.5 audit-conclusions
src/iso/19011/types.ts:24: * @standard ISO-19011:2018 §6.4.6 audit-evidence
src/iso/19011/types.ts:98:   * @standard ISO-8601-1:2019 date-time event-timestamp
src/iso/20022/collection-alignment.test.ts:10: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/iso/20022/collection-alignment.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/iso/20022/index.ts:4: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/iso/20022/types.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing
src/iso/20022/types.test.ts:8: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/iso/20022/types.ts:104: * @standard ISO-13616-1:2020 iban
src/iso/20022/types.ts:10: * @standard ISO-13616-1:2020 iban
src/iso/20022/types.ts:11: * @standard ISO-9362:2022 bic
src/iso/20022/types.ts:120: * @standard ISO-11649:2009 financial-services-creditor-reference
src/iso/20022/types.ts:12: * @standard ISO-4217:2015 currency-codes
src/iso/20022/types.ts:137: * @standard ISO-20022 RemittanceInformation16
src/iso/20022/types.ts:13: * @standard ISO-8601-1:2019 date-time
src/iso/20022/types.ts:155: * @standard ISO-20022 ReportEntry10
src/iso/20022/types.ts:156: * @standard ISO-20022 EntryTransaction10
src/iso/20022/types.ts:197: * @standard ISO-20022 BankToCustomerStatementV08
src/iso/20022/types.ts:230: * @standard ISO-20022 CustomerCreditTransferInitiationV09
src/iso/20022/types.ts:252: * @standard ISO-20022 PaymentInstruction30
src/iso/20022/types.ts:26: * @standard ISO-20022 ExternalBankTransactionDomain1Code
src/iso/20022/types.ts:276: * @standard ISO-20022 CreditTransferTransaction34
src/iso/20022/types.ts:27: * @standard ISO-20022 ExternalBankTransactionFamily1Code
src/iso/20022/types.ts:28: * @standard ISO-20022 ExternalBankTransactionSubFamily1Code
src/iso/20022/types.ts:296: * @standard ISO-20022 CustomerDirectDebitInitiationV08
src/iso/20022/types.ts:313: * @standard ISO-20022 PaymentInstruction23
src/iso/20022/types.ts:342: * @standard ISO-20022 DirectDebitTransactionInformation23
src/iso/20022/types.ts:367: * @standard ISO-20022 PaymentReturnV09
src/iso/20022/types.ts:384: * @standard ISO-20022 PaymentTransaction109
src/iso/20022/types.ts:42: * @standard ISO-20022 EntryStatus2Code
src/iso/20022/types.ts:49: * @standard ISO-20022 CreditDebitCode
src/iso/20022/types.ts:57: * @standard ISO-20022 ChargeBearerType1Code
src/iso/20022/types.ts:67: * @standard ISO-20022 PostalAddress24
src/iso/20022/types.ts:84: * @standard ISO-20022 PartyIdentification135
src/iso/20022/types.ts:85: * @standard ISO-9362:2022 bic
src/iso/20022/types.ts:86: * @standard ISO-17442-1:2020 lei
src/iso/20022/types.ts:9: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/iso/20022/validate.ts:5: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/iso/27002/access-coverage.test.ts:13: * @standard ISO/IEC-29119:2022 software-testing
src/iso/27002/access-coverage.test.ts:14: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/access-coverage.test.ts:15: * @standard ISO-27001:2022 isms-annex-a-controls
src/iso/27002/coverage.ts:10: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/coverage.ts:11: * @standard ISO-27001:2022 isms-annex-a-controls
src/iso/27002/index.ts:4: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/index.ts:5: * @standard ISO-27001:2022 isms-annex-a-controls
src/iso/27002/types.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/iso/27002/types.test.ts:9: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/types.ts:10: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/types.ts:11: * @standard ISO-27001:2022 isms-annex-a-controls
src/iso/27002/types.ts:19: * @standard ISO-27002:2022 §4 themes
src/iso/27002/types.ts:28: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/validate.ts:7: * @standard ISO-27002:2022 information-security-controls
src/iso/27002/validate.ts:8: * @standard ISO-27001:2022 isms-annex-a-controls
src/iso/3166/1/country/bg-bank-statement-pdf.test.ts:10: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg-bank-statement-pdf.test.ts:11: * @standard ISO-13616-1:2020 iban BG-22
src/iso/3166/1/country/bg-bank-statement-pdf.test.ts:12: * @standard ISO-32000-2:2020 pdf source-document
src/iso/3166/1/country/bg-bank-statement-pdf.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-clients.test.ts:10: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-clients.test.ts:11: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg-clients.test.ts:12: * @standard ISO-4217:2015 currency-codes
src/iso/3166/1/country/bg-clients.test.ts:13: * @standard PSD2 EU 2015/2366 ais-pis
src/iso/3166/1/country/bg-completeness.test.ts:24: * @standard ISO/IEC-29119:2022 software-testing test-meta-coverage
src/iso/3166/1/country/bg-completeness.test.ts:25: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg-generic-clients.test.ts:10: * @standard Berlin Group NextGenPSD2 v1.3
src/iso/3166/1/country/bg-generic-clients.test.ts:11: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg-generic-clients.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-generic-clients.test.ts:9: * @standard PSD2 EU 2015/2366 ais-pis
src/iso/3166/1/country/bg-holidays.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-holidays.test.ts:6: * @standard ISO-8601-1:2019 date-time
src/iso/3166/1/country/bg-holidays.test.ts:7: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg-hybrid-invoice.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-hybrid-invoice.test.ts:6: * @standard ISO-19005-3:2012 pdf-a-3
src/iso/3166/1/country/bg-hybrid-invoice.test.ts:7: * @standard EN-16931:2017+A1:2019 §6 hybrid-invoice
src/iso/3166/1/country/bg-hybrid-invoice.test.ts:8: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg-pades-signer.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-pades-signer.test.ts:6: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/iso/3166/1/country/bg-pades-signer.test.ts:7: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/iso/3166/1/country/bg-pades-signer.test.ts:8: * @standard rfc-5652 cms-detached-signature
src/iso/3166/1/country/bg-vat.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg-vat.test.ts:6: * @standard EN-16931:2017 §BG-23 invoice-line-tax-category
src/iso/3166/1/country/bg-vat.test.ts:7: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/iso/3166/1/country/bg.test.ts:10: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg.test.ts:11: * @standard ISO-4217:2015 EUR reporting-currency
src/iso/3166/1/country/bg.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/bg.ts:21: * @standard ISO-3166-1:2020 BG country-code
src/iso/3166/1/country/bg.ts:22: * @standard ISO-4217:2015 EUR reporting-currency
src/iso/3166/1/country/bg.ts:23: * @standard BCP-47 bg-BG locale
src/iso/3166/1/country/bg.ts:24: * @standard ISO-13616-1:2020 iban BG-22
src/iso/3166/1/country/bg.ts:25: * @standard EN-16931:2017 §B2G e-invoicing
src/iso/3166/1/country/bg.ts:26: * @standard Peppol-BIS-3.0 billing optional
src/iso/3166/1/country/eu-fallback-rates.test.ts:10: * @standard ISO-3166-1:2020 country-codes alpha-2
src/iso/3166/1/country/eu-fallback-rates.test.ts:11: * @standard SDMX 2.1 statistical-data-and-metadata-exchange
src/iso/3166/1/country/eu-fallback-rates.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/eu-fallback-rates.test.ts:9: * @standard ISO-4217:2015 currency-codes
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:11: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:12: * @standard ISO-3166-1:2020 country-codes alpha-2
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:13: * @standard EN-16931:2017 §B2G semantic-model
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:14: * @standard Peppol-BIS-3.0 billing
src/iso/3166/1/country/index.ts:4: * @standard ISO-3166-1:2020 country-codes alpha-2
src/iso/3166/1/country/types.ts:16: * @standard ISO-3166-1:2020 country-codes alpha-2
src/iso/3166/1/country/types.ts:17: * @standard ISO-4217:2015 currency-codes
src/iso/3166/1/country/types.ts:18: * @standard ISO-8601-1:2019 date-time fiscal-period
src/iso/3166/1/index.ts:4: * @standard ISO-3166-1:2020 country-codes
src/iso/3166/1/validate.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/1/validate.test.ts:5: * @standard ISO-3166-1:2020 country-codes
src/iso/3166/1/validate.ts:14: * @standard ISO-3166-1:2020 §6 alpha-2
src/iso/3166/1/validate.ts:22: * @standard ISO-3166-1:2020 §7 alpha-3
src/iso/3166/1/validate.ts:4: * @standard ISO-3166-1:2020 country-codes
src/iso/3166/2/index.ts:4: * @standard ISO-3166-2:2020 subdivision-codes
src/iso/3166/2/validate.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/3166/2/validate.test.ts:5: * @standard ISO-3166-2:2020 subdivision-codes
src/iso/3166/2/validate.ts:18: * @standard ISO-3166-2:2020 §5 code-element
src/iso/3166/2/validate.ts:4: * @standard ISO-3166-2:2020 subdivision-codes
src/iso/4217/index.ts:4: * @standard ISO-4217:2015 currency-codes
src/iso/4217/validate.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/4217/validate.test.ts:5: * @standard ISO-4217:2015 currency-codes
src/iso/4217/validate.ts:16: * @standard ISO-4217:2015 §5 alphabetic-codes
src/iso/4217/validate.ts:4: * @standard ISO-4217:2015 currency-codes
src/iso/7064/egn-bg.test.ts:10: * @standard ISO-7064:2003 mod-11 check-digit
src/iso/7064/egn-bg.test.ts:11: * @standard BG ЕГН Закон за гражданската регистрация
src/iso/7064/egn-bg.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/iso/7064/egn-bg.ts:24: * @standard BG ЕГН Закон за гражданската регистрация
src/iso/7064/egn-bg.ts:25: * @standard ISO-7064:2003 mod-11 check-digit
src/iso/7064/egn-bg.ts:26: * @standard ISO-8601-1:2019 date-time encoded-birth-date
src/iso/7064/index.ts:6: * @standard ISO-7064:2003 check-character-systems
src/iso/8601/coerce.ts:14: * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
src/iso/8601/coerce.ts:15: * @standard ECMA-262 Date.prototype.toISOString
src/iso/8601/coerce.ts:4: * @standard ISO-8601-1:2019 date-time
src/iso/8601/format-date-time.ts:10: * @standard ECMA-402 internationalization-api Intl.DateTimeFormat
src/iso/8601/format-date-time.ts:8: * @standard ISO-8601-1:2019 date-time input-canonical-form
src/iso/8601/format-date-time.ts:9: * @standard ECMA-262 Date.prototype
src/iso/8601/index.ts:4: * @standard ISO-8601-1:2019 date-time
src/iso/8601/validate.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/8601/validate.test.ts:5: * @standard ISO-8601-1:2019 date-time
src/iso/8601/validate.ts:22: * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
src/iso/8601/validate.ts:4: * @standard ISO-8601-1:2019 date-time
src/iso/9362/bic.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso/9362/bic.test.ts:5: * @standard ISO-9362:2022 bic
src/iso/9362/bic.ts:16: * @standard ISO-9362:2022 §6 structure
src/iso/9362/bic.ts:4: * @standard ISO-9362:2022 bic
src/iso/9362/index.ts:4: * @standard ISO-9362:2022 bic
src/iso20022/export.service/index.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/iso20022/export.service/index.test.ts:5: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/iso20022/export.service/index.ts:17: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/iso20022/export.service/index.ts:18: * @standard ISO-13616-1:2020 iban
src/iso20022/export.service/index.ts:19: * @standard ISO-9362:2022 bic
src/iso20022/export.service/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/iso20022/export.service/index.ts:21: * @standard ISO-8601-1:2019 date-time
src/iso20022/export.service/index.ts:240: * @standard ISO-20022 pain.001.001.09 customer-credit-transfer-initiation
src/iso20022/export.service/index.ts:357: * @standard ISO-20022 pain.008.001.08 customer-direct-debit-initiation
src/items/batches/index.ts:15: * @standard ISO 9001:2015 §8.5.2 identification-and-traceability
src/items/batches/index.ts:16: * @standard ISO 22005:2007 feed-and-food-chain-traceability
src/items/batches/index.ts:17: * @standard GS1 General Specifications AI(10) batch/lot AI(17) expiry AI(11) production-date
src/items/batches/index.ts:18: * @standard EU Regulation 178/2002 Art 18 one-step-back-one-step-forward
src/items/batches/index.ts:19: * @standard FDA 21 CFR 211.122 211.130 pharma-lot-control
src/items/batches/index.ts:20: * @standard IATF 16949:2016 §8.5.2.1 automotive-traceability
src/items/batches/index.ts:21: * @standard ISO-8601-1:2019 date-time manufacture-expiry-dates
src/items/bills/of/materials/index.ts:16: * @standard ISO-8601-1:2019 date-time effective-from / to
src/items/bills/of/materials/index.ts:17: * @standard ISA-95:2013 enterprise-control-system-integration §B.4
src/items/bills/of/materials/index.ts:18: * @standard ISO 22400:2014 manufacturing-operations-management KPIs
src/items/bills/of/materials/work/orders/cost/variances/index.ts:11: * @standard ISO-8601-1:2019 date-time variance-date
src/items/bills/of/materials/work/orders/operation/runs/index.ts:14: * @standard ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response
src/items/bills/of/materials/work/orders/operation/runs/index.ts:15: * @standard ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)
src/items/bills/of/materials/work/orders/operation/runs/index.ts:16: * @standard ISO-8601-1:2019 date-time start-completion
src/items/bills/of/materials/work/orders/production/receipts/index.ts:12: * @standard ISO-8601-1:2019 date-time receipt-date
src/items/bills/of/materials/work/orders/production/receipts/index.ts:13: * @standard ISA-95:2013 §B.5 production-execution
src/items/bills/of/materials/work/orders/routings/index.ts:12: * @standard ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing
src/items/bills/of/materials/work/orders/routings/index.ts:13: * @standard ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)
src/items/bills/of/materials/work/orders/routings/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/items/hooks/beforeValidate.ts:10: * @standard GS1 GTIN global-trade-item-number
src/items/hooks/beforeValidate.ts:9: * @standard UN-CEFACT UNSPSC product-classification
src/items/index.ts:18: * @standard UN-CEFACT UNSPSC product-classification
src/items/index.ts:19: * @standard GS1 GTIN global-trade-item-number
src/items/index.ts:20: * @standard ISO-4217:2015 currency-codes price-currency
src/items/index.ts:21: * @standard EN-16931:2017 §BG-31 item-information
src/items/index.ts:22: * @standard EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)
src/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:11: * @standard ISO/IEC-29119:2022 software-testing
src/items/inventory/movements/index.ts:11: * @standard ISO-8601-1:2019 date-time movement-at posted-at
src/items/inventory/movements/index.ts:12: * @standard ISO-3166-1:2020 country-codes via location
src/items/packages/index.ts:11: * @standard GS1 General Specifications AI(00) SSCC serial-shipping-container-code
src/items/packages/index.ts:12: * @standard ISO/IEC 15459-1:2014 unique-identification transport-units
src/items/packages/index.ts:13: * @standard GS1 Logistic Label
src/items/packages/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/items/packages/index.ts:15: * @standard UN/CEFACT Recommendation 21 packaging-codes
src/items/purchase/orders/goods/receipts/index.ts:21: * @standard ISO-8601-1:2019 date-time received-at
src/items/purchase/orders/goods/receipts/index.ts:22: * @standard EN-16931:2017 §BG-13 delivery-information
src/items/purchase/orders/index.ts:34: * @standard ISO-8601-1:2019 date-time order-date due-date
src/items/purchase/orders/index.ts:35: * @standard ISO-4217:2015 currency-codes
src/items/purchase/orders/index.ts:36: * @standard EN-16931:2017 §BG-13 buyer-reference
src/items/purchase/orders/index.ts:37: * @standard UN-EDIFACT ORDERS d96a
src/items/purchase/orders/index.ts:38: * @standard INCOTERMS-2020 delivery-terms-and-risk-transfer
src/items/quality/inspections/index.ts:10: * @standard ISO-8601-1:2019 date-time inspection-date
src/items/quality/inspections/index.ts:11: * @standard ISO 9001:2015 §8.7 control-of-nonconforming-outputs
src/items/quality/inspections/index.ts:12: * @standard ISO 9001:2015 §9.1.3 analysis-and-evaluation
src/items/quality/inspections/index.ts:13: * @standard ISO 17025:2017 testing-and-calibration-laboratories
src/jobs/bnbRatesSync/index.ts:16: * @standard ISO-3166-1:2020 BG country-code
src/jobs/bnbRatesSync/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/jobs/bnbRatesSync/index.ts:18: * @standard ISO-8601-1:2019 date-time effective-date
src/jobs/dunningJob.test.ts:10: * @standard ISO-8601-1:2019 date-time
src/jobs/dunningJob.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/jobs/dunningJob.test.ts:9: * @standard EN-16931:2017 dunning-notice
src/jobs/dunningJob/index.ts:14: * @standard EN-16931:2017 dunning-notice
src/jobs/dunningJob/index.ts:15: * @standard ISO-8601-1:2019 date-time pastDueSinceAt gracePeriodEndsAt
src/jobs/salesAuditFileJob.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/jobs/salesAuditFileJob.test.ts:5: * @standard BG Наредба-Н-18 §Приложение-38
src/jobs/salesAuditFileJob/index.ts:11: * @standard BG Наредба-Н-18 §Приложение-38 monthly-audit-file
src/journal/entries/gl/postings/index.ts:26: * @standard ISO-8601-1:2019 date-time posted-date
src/journal/entries/hooks/balanced-entry.ts:21: * @standard ECMA-262 ECMAScript-2024 baseline
src/journal/entries/hooks/balanced-entry.ts:22: * @standard IEEE-754-2019 binary-floating-point integer-cents-only
src/journal/entries/index.ts:29: * @standard ISO-8601-1:2019 date-time entry-date posted-date approval-date
src/journal/entries/rounding/adjustments/index.ts:10: * @standard ISO-4217:2015 currency-codes from-to-currency-pair
src/journal/entries/rounding/adjustments/index.ts:11: * @standard ISO-8601-1:2019 date-time adjustment-date
src/journal/entry/service/index.ts:12: * @standard ISO-8601-1:2019 date-time entry-date posted-date
src/journal/entry/service/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/leads/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/leads/index.ts:12: * @standard ISO-3166-1:2020 country-codes
src/leads/opportunities/index.ts:10: * @standard ISO-4217:2015 currency-codes
src/leads/opportunities/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/lease.service/index.ts:21: * @standard ISO-4217:2015 currency-codes
src/lease.service/index.ts:22: * @standard ISO-8601-1:2019 date-time
src/lease.service/index.ts:23: * @standard IEEE-754-2019 binary-floating-point avoid-for-money
src/lease.service/lease-service.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/leases/index.ts:47: * @standard ISO-4217:2015 currency-codes
src/leases/index.ts:48: * @standard ISO-8601-1:2019 date-time commencement-date end-date
src/leases/lease/modifications/index.ts:17: * @standard ISO-8601-1:2019 date-time
src/leases/lease/modifications/index.ts:18: * @standard ISO-4217:2015 currency-codes
src/leases/lease/period/postings/hooks/lease-period-posting.test.ts:26: * @standard ISO/IEC-29119:2022 software-testing
src/leases/lease/period/postings/hooks/lease-period-posting.ts:32: * @standard ISO-8601-1:2019 date-time period-end posted-at
src/leases/lease/period/postings/index.ts:21: * @standard ISO-8601-1:2019 date-time period-start period-end
src/leases/lease/period/postings/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/legal/entities/audit/committees/audit/committee/members/index.ts:5: * @standard SEC Rule 10A-3 audit-committee-independence
src/legal/entities/audit/committees/audit/committee/members/index.ts:6: * @standard NYSE 303A.07 audit-committee
src/legal/entities/audit/committees/audit/committee/minutes/index.ts:6: * @standard ISO-8601-1:2019 meeting-date
src/legal/entities/audit/committees/index.ts:5: * @standard SEC Rule 10A-3 audit-committee
src/legal/entities/beneficial/owners/index.ts:4: * @standard ISO-17442-1:2020 lei
src/legal/entities/board/actions/index.ts:4: * @standard OECD G20 principles-of-corporate-governance
src/legal/entities/board/actions/index.ts:6: * @standard ISO-37000:2021 governance-of-organizations
src/legal/entities/business/combinations/index.ts:11: * @standard IFRS IFRS-3 §10-§13 identifying-the-acquirer
src/legal/entities/business/combinations/index.ts:12: * @standard IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired
src/legal/entities/business/combinations/index.ts:13: * @standard IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain
src/legal/entities/business/combinations/index.ts:14: * @standard IFRS IFRS-3 §B41-B49 reverse-acquisitions
src/legal/entities/business/combinations/index.ts:15: * @standard IFRS IFRS-10 §B86 consolidation
src/legal/entities/business/combinations/index.ts:16: * @standard US-GAAP ASC-805 business-combinations
src/legal/entities/business/combinations/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/legal/entities/business/combinations/index.ts:18: * @standard ISO-8601-1:2019 date-time acquisition-date
src/legal/entities/compliance/deadlines/compliance/notifications/index.ts:4: * @standard ISO-37301:2021 compliance-management
src/legal/entities/compliance/deadlines/compliance/notifications/index.ts:5: * @standard ISO-8601-1:2019 notified-at
src/legal/entities/compliance/deadlines/index.ts:4: * @standard ISO-37301:2021 compliance-management-systems
src/legal/entities/compliance/deadlines/index.ts:5: * @standard ISO-8601-1:2019 due-date
src/legal/entities/consolidations/audit/reports/index.ts:14:  * @standard ISA-700 auditor-report
src/legal/entities/disclosure/checklists/index.ts:5: * @standard SEC Regulation S-K disclosure
src/legal/entities/fiscal/calendars/index.ts:11: * @standard IAS-34:2023 (period metadata: quarter, fiscal year, period label)
src/legal/entities/fiscal/calendars/index.ts:12: * @standard ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)
src/legal/entities/fiscal/calendars/index.ts:13: * @standard ISO-4217:2023 (currencyCode inherited from FiscalPeriods)
src/legal/entities/fiscal/calendars/index.ts:14: * @standard SAF-T:3.0.2 (regulatoryCode for audit file period coding, e.g., P01_2026)
src/legal/entities/fiscal/calendars/index.ts:15: * @standard XBRL (period context for financial statement generation)
src/legal/entities/fiscal/calendars/index.ts:16: * @standard GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)
src/legal/entities/fiscal/calendars/index.ts:17: * @standard SOX:2402 (audit-trail via chainLeafUuid)
src/legal/entities/index.ts:21: * @standard ISO-3166-1:2020 country-codes
src/legal/entities/index.ts:22: * @standard ISO-4217:2015 currency-codes functional-currency
src/legal/entities/index.ts:23: * @standard ISO-17442-1:2020 lei legal-entity-identifier
src/legal/entities/index.ts:24: * @standard ISO-8601-1:2019 date-time effective-period
src/legal/entities/intercompany/transactions/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/legal/entities/intercompany/transactions/index.ts:13: * @standard ISO-8601-1:2019 date-time transaction-date
src/legal/entities/internal/audit/functions/index.ts:4: * @standard IIA IPPF international-professional-practices-framework
src/legal/entities/management/assessment/icfrs/index.ts:5: * @standard COSO-2013 internal-control-integrated-framework
src/legal/entities/management/assessment/icfrs/index.ts:6: * @standard PCAOB AS 2201 ICFR
src/legal/entities/regulatory/reports/index.ts:4: * @standard SAF-T OECD standard-audit-file-tax
src/legal/entities/regulatory/reports/index.ts:5: * @standard XBRL business-reporting
src/legal/entities/risk/registers/index.ts:4: * @standard COSO ERM-2017 enterprise-risk-management
src/legal/entities/risk/registers/index.ts:5: * @standard ISO-31000:2018 risk-management
src/legal/entities/transfer/pricing/files/index.ts:15: * @standard ISO-8601-1:2019 date-time
src/legal/entities/transfer/pricing/files/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/legislation/index.ts:24: * @standard ISO 37000:2021 governance-of-organizations (the body of governing rules)
src/link/Component.tsx:10: * @standard BCP-47 language-tag locale-aware-routing
src/link/Component.tsx:7: * @standard W3C HTML5 anchor-element
src/link/field.ts:5: * @standard W3C URL Living Standard
src/link/field.ts:6: * @standard W3C HTML5 anchor-element
src/link/field.ts:7: * @standard BCP-47 language-tag locale-aware
src/link/group.ts:5: * @standard W3C HTML5 nav-element
src/link/index.ts:10: * @standard W3C HTML5 nav-element
src/link/index.ts:11: * @standard BCP-47 language-tag locale-aware-routing
src/link/index.ts:8: * @standard W3C URL Living Standard
src/link/index.ts:9: * @standard W3C HTML5 anchor-element
src/llm/uuid/index.ts:24: * @standard RFC 9562 §5.8 (uuidv8 structured content-uuid)
src/llm/uuid/index.ts:25: * @standard NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)
src/locale/fallback/index.test.ts:18: * @standard RFC 5646 §4.1 'und' undetermined language subtag
src/locale/fallback/index.ts:38: * @standard RFC 5646 §4.1 — `und` undetermined language subtag
src/locale/fallback/index.ts:39: * @standard BCP-47 — language tags
src/locale/fallback/index.ts:40: * @standard ISO 639-2 — und (Undetermined) defined here originally
src/locale/fallback/index.ts:41: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/locale/fallback/index.ts:42: * @standard ECMA-402 internationalization-api §6.2.3 (Intl.Locale tolerates 'und')
src/localize/index.ts:38: * @standard RFC 9562 §5.8 (uuidv8 structured, name-based)
src/localize/index.ts:39: * @standard ITU-T X.667 / ISO-IEC 9834-8 (UUID ↔ OID 2.25 arc)
src/localize/index.ts:40: * @standard RFC 3061 (urn:oid: namespace) · RFC 4122 §3 (urn:uuid:)
src/localize/index.ts:41: * @standard BCP-47 (locale tags) · EU 1958/1 (official EU languages)
src/localize/index.ts:42: * @standard NIST SP 800-107r1 §5.1 (hash strengths — via tamper-cost)
src/logic/index.ts:9: * @standard classical propositional consistency (no P ∧ ¬P) grounded in the horo ring
src/lot/variants/index.ts:23: * @standard ISA-95:2013 / IEC-62264-1 material-lot sublot
src/lot/work/phases/index.ts:25: * @standard ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing-step
src/lot/work/phases/index.ts:26: * @standard ISO-22400-2:2014 manufacturing-operations efficiency throughput
src/lots/index.ts:25: * @standard ISA-95:2013 / IEC-62264-1 §B.3 production-schedule production-order
src/lots/index.ts:26: * @standard ISO-22400-2:2014 manufacturing-operations throughput
src/maintenance/requests/index.ts:10: * @standard ISO-41001:2018 §8.1 facility-management operational-control
src/maintenance/requests/index.ts:11: * @standard ISO-41011:2017 facility-management vocabulary
src/maintenance/requests/index.ts:12: * @standard ISO-55000:2014 asset-management corrective-maintenance
src/maintenance/requests/index.ts:13: * @standard ISO-8601-1:2019 date-time reported-at sla
src/maintenance/work/orders/index.ts:12: * @standard ISO-41001:2018 §8.1 facility-management operational-control
src/maintenance/work/orders/index.ts:13: * @standard ISO-55000:2014 asset-management work-management
src/maintenance/work/orders/index.ts:14: * @standard ISO-55001:2014 asset-management management-systems
src/maintenance/work/orders/index.ts:15: * @standard ISO-14224:2016 reliability-and-maintenance-data
src/maintenance/work/orders/index.ts:16: * @standard EN-13306:2017 maintenance-terminology
src/maintenance/work/orders/index.ts:17: * @standard ISO-8601-1:2019 date-time scheduled-actual
src/manufacturing/seed/operations.ts:22: * @standard IEC 62264-1:2013 §B.4 process-segment (each operation is one segment)
src/manufacturing/seed/operations.ts:23: * @standard ESCO v1.2 / ISCO-08 occupation-unit-group (the per-operation competency)
src/manufacturing/seed/operations.ts:24: * @standard UN/CEFACT Rec 20 unit-of-measure (UoM-aware quantities)
src/manufacturing/seed/positions.ts:18: * @standard ISCO-08 (ILO) occupation unit-group — the 4-digit global anchor
src/manufacturing/seed/positions.ts:19: * @standard Bulgarian НКПД-2011 (national extension of ISCO-08) — the 8-digit code
src/manufacturing/seed/positions.ts:20: * @standard SFIA 8 responsibility-levels (1..7) — the autonomy axis (positions service)
src/manufacturing/seed/standards.ts:12: * @standard ISCO-08 · ESCO v1.2 · НКПД-2011 · NACE Rev.2.1 · IEC 62264-1:2013 · UN/CEFACT Rec 20 · EN-16931 · SFIA 8
src/marketing/CountryShowcase.tsx:7: * @standard ISO-3166-1:2020 country-codes alpha-2
src/marketing/CountryShowcase.tsx:8: * @standard ISO-4217:2015 currency-codes
src/marketing/CountryShowcase.tsx:9: * @standard BCP-47 language-tag
src/marketing/LiveAuditCounter.tsx:9: * @standard schema.org QuantitativeValue
src/marketing/PricingTable.tsx:10: * @standard schema.org Offer pricing
src/marketing/PricingTable.tsx:11: * @standard ISO-4217:2015 currency-codes
src/marketing/StandardsBadges.tsx:10: * @standard W3C HTML5 living-standard
src/marketing/StandardsBadges.tsx:9: * @standard schema.org Thing badge-credibility
src/marketing/types.ts:11: * @standard schema.org WebPageElement
src/marketing/types.ts:12: * @standard W3C HTML5 Living Standard
src/mcp/tool/metadata/index.ts:29: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/mcp/tool/metadata/index.ts:30: * @standard BCP-47 language tags
src/mcp/tool/metadata/index.ts:31: * @standard EU 1958/1 official-languages-of-the-european-union
src/media/Component.tsx:4: * @standard schema.org ImageObject
src/media/Component.tsx:5: * @standard schema.org VideoObject
src/media/Component.tsx:7: * @standard ISO/IEC-14496 mpeg-4 video
src/media/Component.tsx:8: * @standard ISO/IEC-10918 jpeg
src/media/audit/evidences/index.ts:4: * @standard ISA-500 audit-evidence
src/media/audit/evidences/index.ts:5: * @standard PCAOB AS-1105 audit-evidence
src/media/index.ts:18: * @standard ISO/IEC-23008 high-efficiency-coding
src/media/index.ts:19: * @standard ISO/IEC-10918 jpeg
src/media/index.ts:20: * @standard W3C PNG image
src/media/index.ts:21: * @standard W3C SVG
src/media/products/hooks/beforeChange.ts:11: * @standard ISO-4217:2015 currency-codes
src/media/products/hooks/beforeChange.ts:8: * @standard schema.org Product
src/media/products/index.ts:30: * @standard schema.org Product
src/media/products/index.ts:31: * @standard GS1 GTIN global-trade-item-number
src/media/products/index.ts:32: * @standard UN-CEFACT UNSPSC product-classification
src/media/products/index.ts:33: * @standard ISO-4217:2015 currency-codes
src/media/products/index.ts:34: * @standard BCP-47 language-tag i18n
src/media/sepa/mandates/index.ts:14: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/media/sepa/mandates/index.ts:15: * @standard ISO-13616-1:2020 iban
src/media/sepa/mandates/index.ts:16: * @standard ISO-9362:2022 bic
src/media/sepa/mandates/index.ts:17: * @standard ISO-8601-1:2019 date-time signature-date expiry-date
src/membership/admin/mutate/access/index.ts:17: * @standard NIST INCITS-359-2012 role-based-access-control
src/memories/index.ts:30: * @standard ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer
src/memories/index.ts:31: * @standard ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)
src/merge/open/graph/index.ts:4: * @standard OGP open-graph-protocol-1.0
src/merge/open/graph/index.ts:5: * @standard W3C-HTML5 §4.2.5 meta-element
src/message/index.ts:11: * @standard RFC 9562 §5.8 (the structured uuid carries the message)
src/messages/index.ts:11: * @standard ISO-8601-1:2019 date-time sent-read-timestamps
src/messages/index.ts:12: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation
src/meta/automation/index.ts:26: * @standard ISO/IEC 25010:2023 §5.7 modifiability (self-modifying with audit)
src/metatron/index.ts:19: * @standard RFC 9562 §5.8 content-uuid (total merge) + K13 / cuboctahedron
src/migrate/quaternary/index.ts:19: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/mineral/resource/assets/index.ts:11: * @standard IFRS IFRS-6 §3 scope-exploration-and-evaluation
src/mineral/resource/assets/index.ts:12: * @standard IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation
src/mineral/resource/assets/index.ts:13: * @standard IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles
src/mineral/resource/assets/index.ts:14: * @standard IFRS IFRS-6 §18-§22 impairment-of-EE-assets
src/mineral/resource/assets/index.ts:15: * @standard IFRS IFRS-6 §23-§25 disclosure
src/mineral/resource/assets/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/mineral/resource/assets/index.ts:17: * @standard ISO-8601-1:2019 date-time
src/modal/CreateJournalEntryModal.tsx:10: * @standard ISO-8601-1:2019 date-time entry-date
src/modal/CreateJournalEntryModal.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/modal/CreateJournalEntryModal.tsx:9: * @standard ISO-4217:2015 currency-codes monetary-amount
src/money/index.ts:4: * @standard ISO-4217:2015 currency-codes
src/money/money.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/money/money.test.ts:5: * @standard ISO-4217:2015 currency-codes
src/money/money.test.ts:6: * @standard IEEE-754-2019 binary-floating-point avoid-for-money
src/money/money.ts:15: * @standard ISO-4217:2015 §5 alphabetic-codes
src/money/money.ts:4: * @standard ISO-4217:2015 currency-codes
src/money/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/money/test.ts:5: * @standard ISO-4217:2015 currency-codes
src/money/test.ts:6: * @standard IEEE-754-2019 binary-floating-point avoid-for-money
src/multi/currency.service/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/multi/currency.service/index.ts:13: * @standard ISO-3166-1:2020 country-codes alpha-2 tenant-country
src/multi/currency.service/index.ts:14: * @standard ISO-8601-1:2019 date-time rate-date
src/multi/currency.service/index.ts:15: * @standard BCP-47 language-tag locale-formatting
src/multi/currency/closing/index.ts:10: * @standard IFRS-9:2023 Foreign exchange gains/losses
src/multi/currency/closing/index.ts:11: * @standard SAF-T:3.0.2 Standard Audit File for Tax (multi-currency)
src/multi/currency/closing/index.ts:12: * @standard XBRL-GL General Ledger (multi-currency)
src/multi/currency/closing/index.ts:13: * @standard GDPR:2016/679 Art. 32 Security of processing
src/multi/currency/closing/index.ts:14: * @standard NIST-SP-800-92 Audit logging
src/multi/currency/closing/index.ts:8: * @standard ISO-4217:2023 Currency codes
src/multi/currency/closing/index.ts:9: * @standard IFRS-21:2023 Translation of foreign operations
src/multi/search/index.ts:38: * @standard ISO/IEC 25010:2023 §5.3 operability (one input → many sources)
src/multi/search/index.ts:39: * @standard Schema.org Action — search-action (Slice YYYYYY presents these MCP-callable)
src/nace/rev2/index.ts:10: * @standard UN ISIC Rev.4 (companion)
src/nace/rev2/index.ts:11: * @standard NAICS 2022 (US/CA/MX companion)
src/nace/rev2/index.ts:9: * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
src/naredba/n/18/index.ts:8: * @standard BG Наредба-Н-18 §СУПТО retail-fiscal-regime
src/naredba/n/18/index.ts:9: * @standard BG ЗДДС §118 fiscal-receipt-obligation
src/naredba/n/18/scope.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/naredba/n/18/scope.test.ts:7: * @standard BG Наредба-Н-18 §чл.3-ал.1
src/naredba/n/18/scope.ts:19: * @standard BG Наредба-Н-18 §чл.3-ал.1 fiscalization-scope-by-payment
src/naredba/n/18/scope.ts:20: * @standard BG ЗДДС §118 fiscal-receipt-obligation
src/naredba/n/18/scope.ts:21: * @standard BG ЗПУПС payment-services (PSP transfers)
src/naredba/n/18/unp.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/naredba/n/18/unp.test.ts:5: * @standard BG Наредба-Н-18 §СУПТО УНП unique-sales-number
src/naredba/n/18/unp.ts:19: * @standard BG Наредба-Н-18 §СУПТО УНП unique-sales-number
src/naredba/n/18/vat-groups.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/naredba/n/18/vat-groups.test.ts:5: * @standard BG Наредба-Н-18 §Приложение-1 fiscal-device-tax-groups
src/naredba/n/18/vat-groups.ts:16: * @standard BG Наредба-Н-18 §Приложение-1 fiscal-device-tax-groups данъчни-групи
src/naredba/n/18/vat-groups.ts:17: * @standard EU 2006/112/EC vat-system-directive (rate bands)
src/navigation/index.tsx:6: * @standard ECMA-262 ECMAScript-2024 baseline
src/nist/incits/359/conventions.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/nist/incits/359/conventions.test.ts:5: * @standard POSIX-1.2017 §1.6.1.1 file-mode-bits
src/nist/incits/359/conventions.test.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control vocabulary-layer
src/nist/incits/359/conventions.ts:21: * @standard POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source
src/nist/incits/359/conventions.ts:22: * @standard NIST INCITS-359-2012 role-based-access-control vocabulary-layer
src/nist/incits/359/index.ts:8: * @standard NIST INCITS-359-2012 role-based-access-control
src/nist/incits/359/index.ts:9: * @standard NIST SP-800-162 attribute-based-access-control
src/nist/incits/359/payload.ts:4: * @standard NIST INCITS-359-2012 §5.2 administrative-functions
src/nist/incits/359/predicates.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/nist/incits/359/predicates.test.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control
src/nist/incits/359/predicates.ts:4: * @standard NIST INCITS-359-2012 §5 core-rbac-predicates
src/nist/incits/359/types.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/nist/sp/800/108/derive-secret.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/nist/sp/800/108/derive-secret.test.ts:5: * @standard NIST SP-800-108 key-derivation-function
src/nist/sp/800/108/derive-secret.test.ts:6: * @standard NIST FIPS-198-1 hmac
src/nist/sp/800/108/derive-secret.test.ts:7: * @standard NIST FIPS-180-4 sha-256
src/nist/sp/800/108/index.ts:4: * @standard NIST SP-800-108 key-derivation-function
src/nist/sp/800/108/kdf.ts:10: * @standard NIST FIPS-198-1 hmac
src/nist/sp/800/108/kdf.ts:11: * @standard NIST FIPS-180-4 sha-256
src/nist/sp/800/108/kdf.ts:9: * @standard NIST SP-800-108 key-derivation-function
src/nist/sp/800/38/aes-gcm.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/nist/sp/800/38/aes-gcm.test.ts:5: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/nist/sp/800/38/aes-gcm.test.ts:6: * @standard NIST FIPS-197 aes-256
src/nist/sp/800/38/aes-gcm.ts:10: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/nist/sp/800/38/aes-gcm.ts:11: * @standard NIST FIPS-197 aes-256
src/nist/sp/800/38/aes-gcm.ts:12: * @standard NIST FIPS-180-4 sha-256
src/nist/sp/800/38/aes-gcm.ts:54: * @standard NIST SP-800-38D §6 ghash + §7.1 encrypt
src/nist/sp/800/38/aes-gcm.ts:88: * @standard NIST SP-800-38D §7.2 decrypt-and-verify
src/nist/sp/800/38/index.ts:4: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/notification/index.ts:17: * @standard rfc-5321 simple-mail-transfer-protocol
src/notification/index.ts:18: * @standard rfc-5322 internet-message-format
src/notification/index.ts:19: * @standard rfc-2616 §14.10 https-keep-alive
src/notification/subscriber.ts:13: * @standard rfc-5321 simple-mail-transfer-protocol
src/notification/subscriber.ts:14: * @standard rfc-5322 internet-message-format
src/oauth/index.ts:6: * @standard IETF RFC 6749 OAuth 2.0 (grant types, token lifecycle)
src/oauth/index.ts:7: * @standard IETF RFC 6750 Bearer token usage
src/oecd/tpg/index.ts:5: * @standard OECD TPG 2022 transfer-pricing-guidelines
src/oecd/tpg/index.ts:6: * @standard OECD BEPS Action 13 master-file-local-file-cbcr
src/oecd/tpg/index.ts:7: * @standard EU DAC-4 country-by-country-reporting
src/oecd/tpg/index.ts:8: * @standard OECD Pillar Two GloBE 15% global minimum tax (companion)
src/operators/index.ts:13: * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature
src/pack/items/index.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/pack/items/index.ts:28: * @standard ISA-95:2013 §B.5 production-operations dispatch line
src/pack/items/index.ts:29: * @standard UN/CEFACT Rec20 mass (gram) per-unit
src/pack/items/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/packs/index.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/packs/index.ts:31: * @standard ISA-95:2013 §B.5 production-operations dispatch
src/packs/index.ts:32: * @standard UN/CEFACT Rec20 weight (kilogram) · volume (cubic-metre)
src/packs/index.ts:33: * @standard GS1 logistics SSCC carton-identity (the `number` / `barcode`)
src/packs/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/page/AnalyticsPage.tsx:13: * @standard ECMA-262 ECMAScript-2024 baseline
src/page/range/index.tsx:6: * @standard ECMA-402 internationalization-api Intl.NumberFormat
src/page/range/index.tsx:7: * @standard BCP-47 language-tag
src/pages/access/superAdminOrTenantAdmin.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control
src/pages/hooks/beforeChange.ts:8: * @standard ISO-8601-1:2019 date-time published-at
src/pages/hooks/revalidatePage.ts:12: * @standard W3C HTML5 Living Standard
src/pages/index.ts:31: * @standard schema.org WebPage
src/pages/index.ts:32: * @standard W3C HTML5 Living Standard
src/pages/index.ts:33: * @standard BCP-47 language-tag i18n-routing
src/pages/index.ts:34: * @standard ECMA-402 internationalization-api
src/pagination/index.tsx:5: * @standard W3C HTML5 nav-element
src/pagination/index.tsx:6: * @standard WAI-ARIA 1.2 navigation-landmark-role
src/party/aging.service.ts:8: * @standard ISO-8601-1:2019 date-time days-between-arithmetic
src/payable/aging.service.ts:11: * @standard ISO-8601-1:2019 date-time as-of-date
src/payable/analytics.service.ts:6: * @standard ISO-4217:2015 currency-codes
src/payable/analytics.service.ts:7: * @standard ISO-8601-1:2019 date-time
src/payable/analytics.service.ts:8: * @standard ISO-17442-1:2020 lei vendor-identification
src/payable/discounts.service.ts:10: * @standard ISO-8601-1:2019 date-time discount-deadline
src/payable/discounts.service.ts:7: * @standard EN-16931:2017 §BG-20 document-level-allowances
src/payable/discounts.service.ts:8: * @standard EN-16931:2017 §BG-22 document-level-charges
src/payable/discounts.service.ts:9: * @standard ISO-4217:2015 currency-codes
src/payable/index.ts:4: * @standard EN-16931:2017 §BG-4 seller
src/payable/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/payable/index.ts:6: * @standard ISO-8601-1:2019 date-time
src/payable/workflow.service.ts:8: * @standard EN-16931:2017 invoice-lifecycle
src/payload.config.api.test.ts:10: * @standard OpenAPI 3.1 api-description
src/payload.config.api.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing integration-test-level
src/payload.config.multi-tenant-admin.test.ts:10: * @standard ISO/IEC-29119:2022 software-testing integration-test-level
src/payload.config.multi-tenant-admin.test.ts:11: * @standard NIST INCITS-359-2012 role-based-access-control
src/payload.config.sdk-rest.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing integration-test-level
src/payload.config.sdk-rest.test.ts:9: * @standard OpenAPI 3.1 api-description
src/payload.config.tenant.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing integration-test-level
src/payload.config.ts:517:       * @standard EN-16931:2017 §BG-3 invoice-status-cascade
src/payload.config.ts:535:       * @standard ISO-3166-1:2020 BG country-code
src/payload.config.ts:536:       * @standard ISO-4217:2015 currency-codes
src/payload.config.ts:555:       * @standard BG Наредба-Н-18 §Приложение-38 standardized-audit-file
src/payment/methods/hooks/encryptSensitiveFields.ts:8: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/payment/methods/index.ts:15: * @standard ISO-13616-1:2020 iban bank-account-reference
src/payment/methods/index.ts:16: * @standard ISO-9362:2022 bic bank-routing
src/payment/methods/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/payment/methods/index.ts:22: * @standard NIST SP-800-38D aes-gcm
src/peace/index.ts:8: * @standard NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)
src/peppol/bis/3/index.ts:4: * @standard Peppol-BIS-3.0 billing
src/peppol/bis/3/index.ts:5: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/peppol/bis/3/index.ts:6: * @standard UBL-2.1 universal-business-language
src/peppol/bis/3/index.ts:7: * @standard ISO-6523-1:1998 participant-identifier-scheme
src/peppol/bis/3/types.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/peppol/bis/3/types.test.ts:5: * @standard Peppol-BIS-3.0 billing
src/peppol/bis/3/types.test.ts:6: * @standard ISO-6523-1:1998 participant-identifier-scheme
src/peppol/bis/3/types.ts:101: * @standard Peppol-BIS-3.0 EndpointID
src/peppol/bis/3/types.ts:10: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/peppol/bis/3/types.ts:111: * @standard Peppol-BIS-3.0 envelope
src/peppol/bis/3/types.ts:11: * @standard UBL-2.1 universal-business-language
src/peppol/bis/3/types.ts:12: * @standard ISO-6523-1:1998 participant-identifier-scheme
src/peppol/bis/3/types.ts:130: * @standard Peppol-BIS-3.0 billing
src/peppol/bis/3/types.ts:131: * @standard EN-16931:2017 semantic-model-electronic-invoice
src/peppol/bis/3/types.ts:25: * @standard Peppol-BIS-3.0 customization-id
src/peppol/bis/3/types.ts:35: * @standard Peppol-BIS-3.0 profile-id
src/peppol/bis/3/types.ts:45: * @standard Peppol-BIS-3.0 document-type-id
src/peppol/bis/3/types.ts:56: * @standard ISO-6523-1:1998 organization-identification-scheme
src/peppol/bis/3/types.ts:57: * @standard Peppol-BIS-3.0 participant-identifier-scheme
src/peppol/bis/3/types.ts:90: * @standard Peppol-BIS-3.0 EndpointID
src/peppol/bis/3/types.ts:9: * @standard Peppol-BIS-3.0 billing
src/peppol/bis/3/validate.ts:4: * @standard Peppol-BIS-3.0 billing
src/peppol/bis/3/validate.ts:5: * @standard ISO-6523-1:1998 participant-identifier-scheme
src/peppol/export.service/index.test.ts:10: * @standard UBL-2.1 universal-business-language
src/peppol/export.service/index.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/peppol/export.service/index.test.ts:9: * @standard Peppol-BIS-3.0 billing
src/peppol/export.service/index.ts:13: * @standard Peppol-BIS-3.0 billing
src/peppol/export.service/index.ts:14: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/peppol/export.service/index.ts:15: * @standard UBL-2.1 universal-business-language
src/peppol/export.service/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/peppol/export.service/index.ts:218: * @standard Peppol-BIS-3.0 billing
src/peppol/export.service/index.ts:219: * @standard EN-16931:2017 semantic-model
src/peppol/export.service/index.ts:220: * @standard UBL-2.1 universal-business-language
src/peppol/import.service/index.test.ts:10: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/peppol/import.service/index.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/peppol/import.service/index.test.ts:9: * @standard Peppol-BIS-3.0 billing
src/peppol/import.service/index.ts:16: * @standard Peppol-BIS-3.0 billing
src/peppol/import.service/index.ts:17: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/peppol/import.service/index.ts:18: * @standard UBL-2.1 universal-business-language
src/peppol/import.service/index.ts:19: * @standard ISO-6523-1:1998 participant-identifier-scheme
src/peppol/import.service/index.ts:303: * @standard Peppol-BIS-3.0 billing
src/peppol/import.service/index.ts:304: * @standard EN-16931:2017 semantic-model
src/period/end/adjustment.service/index.ts:21: * @standard ISO-8601-1:2019 date-time period
src/period/end/adjustment.service/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/period/end/closing/index.ts:10: * @standard XBRL-GL General Ledger
src/period/end/closing/index.ts:11: * @standard GDPR:2016/679 Art. 32 Security of processing
src/period/end/closing/index.ts:12: * @standard eIDAS:2014/910/EU Electronic signatures
src/period/end/closing/index.ts:13: * @standard SOX:2002 Sec. 404 Internal control assessment
src/period/end/closing/index.ts:14: * @standard NIST-SP-800-92 Audit logging
src/period/end/closing/index.ts:8: * @standard IAS-34:2023 Interim Financial Reporting
src/period/end/closing/index.ts:9: * @standard SAF-T:3.0.2 Standard Audit File for Tax
src/period/locks/index.ts:14: * @standard ISO-8601-1:2019 locked-at
src/persist/api/audit/event/index.ts:15: * @standard ISO-19011:2018 audit-trail external-system-evidence
src/persist/api/audit/event/index.ts:16: * @standard ISO-3166-1:2020 country-codes alpha-2
src/perspective/index.ts:16: * @standard ISO 20022 party-role-perspective (debtor/creditor are one transfer)
src/platform/readiness/index.ts:16: * @standard MCP 0.6 — tools/list extension
src/platform/readiness/index.ts:17: * @standard W3C JSON-LD 1.1 (manifest is JSON-serializable + linkable)
src/plugin/dimensions.ts:36: * @standard W3C JSON-LD 1.1 — typed dimensional manifests
src/plugin/dimensions.ts:37: * @standard ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries
src/plugin/dimensions.ts:38: * @standard Topology — 10 vortices form the torus surface (§0b + CCCCCCC)
src/plugins/auth/access/field-access.ts:8: * @standard NIST INCITS-359-2012 role-based-access-control
src/plugins/auth/access/index.ts:10: * @standard NIST SP-800-162 attribute-based-access-control
src/plugins/auth/access/index.ts:9: * @standard NIST INCITS-359-2012 role-based-access-control
src/plugins/auth/access/predicates.ts:111: * @standard NIST INCITS-359-2012 role-based-access-control
src/plugins/auth/access/predicates.ts:36: * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
src/plugins/auth/access/predicates.ts:79: * @standard NIST INCITS-359-2012 role-based-access-control
src/plugins/auth/access/predicates.ts:7: * @standard NIST INCITS-359-2012 role-based-access-control
src/plugins/mcpScopes/index.ts:31: * @standard ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)
src/plugins/mcpScopes/index.ts:32: * @standard ISO/IEC 27001 §A.9.4.1 information access restriction
src/plugins/naming/index.ts:28: * @standard RFC 9562 §5.8 name-based UUID (the digest source)
src/plugins/taggable/index.ts:21: * @standard RFC-4122 §4.3 uuid
src/plugins/versions/index.ts:29: * @standard ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)
src/populate/published/at/index.ts:4: * @standard ISO-8601-1:2019 date-time
src/position/index.ts:31: * @standard SFIA 8 responsibility-levels (1..7) — the job-type / autonomy axis
src/position/index.ts:32: * @standard ESCO / ISCO-08 occupational classification
src/position/index.ts:33: * @standard UN COFOG (Classification of the Functions of Government) — the `function` code
src/post/close/analytics/service.ts:14: * @standard IAS-34:2023 Interim Financial Reporting
src/post/close/analytics/service.ts:15: * @standard IFRS-8:2023 Operating Segments
src/post/close/analytics/service.ts:16: * @standard IAS-1:2023 Presentation of Financial Statements
src/post/close/analytics/service.ts:17: * @standard COSO Internal Control Framework
src/post/close/analytics/service.ts:18: * @standard GAAP VRE (Variance Reporting and Explanation) Guidelines
src/posts/hooks/populateAuthors.ts:12: * @standard schema.org Person author
src/posts/hooks/populateAuthors.ts:13: * @standard schema.org Article author
src/posts/hooks/revalidatePost.ts:12: * @standard W3C HTML5 Living Standard
src/posts/index.ts:38: * @standard schema.org Article
src/posts/index.ts:39: * @standard schema.org BlogPosting
src/posts/index.ts:40: * @standard W3C HTML5 Living Standard
src/posts/index.ts:41: * @standard BCP-47 language-tag i18n-routing
src/posts/index.ts:42: * @standard ECMA-402 internationalization-api
src/power/index.ts:31: * @standard NIST SP 800-107r1 §5.1 (hash strengths) · NIST SP 800-57 Part 1 r5 §5.6
src/product/price/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/proof/bitcoin/genesi/index.ts:23: * @standard Nakamoto (2008) "Bitcoin: A Peer-to-Peer Electronic Cash System" §§3–4 (PoW + chain)
src/proof/bitcoin/genesi/index.ts:24: * @standard NIST FIPS 180-4 SHA-256 (double-SHA256 block hash)
src/proof/bitcoin/genesi/index.ts:25: * @standard Bitcoin Core — genesis block (height 0, hash 000000000019d6…ce26f)
src/proof/dry-proof.ts:35: * @standard W3C JSON-LD 1.1 + Schema.org Dataset vocabulary
src/proof/dry-proof.ts:36: * @standard W3C VC Data Model 2.0 (proof-as-verifiable-claim)
src/proof/dry-proof.ts:37: * @standard ISO/IEC 25010:2023 §5.5 testability + §5.7 modularity
src/proof/dry-proof.ts:38: * @standard ISO 19011:2018 §6.4.6 (audit-evidence + traceability)
src/proof/merkle/dag/index.ts:21: * @standard Git object model — SHA-1 over `"<type> <len>\0<content>"` (commits include parent)
src/proof/merkle/dag/index.ts:22: * @standard NIST FIPS 180-4 (the underlying hash); RFC 9562 §5.8 (the erpax content-uuid twin)
src/proof/projection/index.ts:25: * @standard RFC 9562 §5.8 (content-uuid v8, the forward projection) · RFC 8785 (JCS)
src/proof/projection/index.ts:26: * @standard SEC 2 secp256k1 / FIPS 186-4 P-256 (ECDLP — the inverse key recovery)
src/proof/projection/index.ts:27: * @standard NIST SP 800-57 Part 1 r5 §5.6.1 (anchor key strengths)
src/properties/index.ts:10: * @standard ISO-41001:2018 facility-management-management-systems
src/properties/index.ts:11: * @standard ISO-41011:2017 facility-management-vocabulary
src/properties/index.ts:12: * @standard ISO-41013:2017 facility-management-scope
src/properties/index.ts:13: * @standard ISO-55000:2014 asset-management property-as-asset
src/properties/index.ts:14: * @standard ISO-19650-1:2018 information-management-using-bim
src/properties/index.ts:15: * @standard ISO-3166-1:2020 country-codes property-country
src/properties/index.ts:16: * @standard ISO-3166-2:2020 subdivision-codes property-region
src/properties/index.ts:17: * @standard NACE-Rev.2 economic-activity-of-occupants
src/properties/index.ts:18: * @standard EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)
src/properties/investment/properties/index.ts:11: * @standard IFRS IAS-40 §5 definition-investment-property
src/properties/investment/properties/index.ts:12: * @standard IFRS IAS-40 §30 measurement-model-election
src/properties/investment/properties/index.ts:13: * @standard IFRS IAS-40 §33 fair-value-model
src/properties/investment/properties/index.ts:14: * @standard IFRS IAS-40 §56 cost-model
src/properties/investment/properties/index.ts:15: * @standard IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property
src/properties/investment/properties/index.ts:16: * @standard IFRS IAS-40 §74 disclosure-requirements
src/properties/investment/properties/index.ts:17: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/properties/investment/properties/index.ts:18: * @standard US-GAAP ASC-360 long-lived-assets (no separate IP standard)
src/properties/investment/properties/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/properties/investment/properties/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/properties/spaces/index.ts:10: * @standard ISO-41001:2018 facility-management-management-systems
src/properties/spaces/index.ts:11: * @standard ISO-41011:2017 §3.3.5 facility-management space-vocabulary
src/properties/spaces/index.ts:12: * @standard ISO-19650-1:2018 information-management-using-bim
src/properties/spaces/index.ts:13: * @standard EN-15221-6:2011 facility-management area-and-space-measurement
src/provider/index.tsx:6: * @standard W3C CSS-Color-4 color-contrast
src/pwa/index.ts:44: * @standard W3C Service Workers (W3C-SW)
src/pwa/index.ts:45: * @standard W3C Web App Manifest (W3C-WAM)
src/pwa/index.ts:46: * @standard W3C Push API + W3C Notifications API
src/pwa/index.ts:47: * @standard W3C Cache API + W3C IndexedDB 3.0 + W3C OPFS
src/pwa/index.ts:48: * @standard RFC 9562 §5.8 + RFC 8785 (uuid composition)
src/quantum/aura/index.ts:19: * @standard Baumgratz, Cramer & Plenio, "Quantifying Coherence," PRL 113 140401 (2014)
src/quantum/cache/index.ts:9: * @standard RFC 9562 §5.8 content-uuid (the cache key)
src/quantum/calculator/index.ts:9: * @standard the digital-root / mod-9 group ([[rodin]])
src/quantum/chat/index.ts:8: * @standard merkle hash-chain; RFC 9562 §5.8 content-uuid
src/quantum/communication/index.ts:10: * @standard no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid
src/quantum/entanglement/index.ts:18: * @standard ER=EPR (Maldacena & Susskind, 2013); monogamy (Coffman–Kundu–Wootters, PRA 61 052306, 2000)
src/quantum/graph/index.ts:9: * @standard symmetric (reciprocal) entanglement — directed-link entropy → 0
src/quantum/gravity/index.ts:18: * @standard ER=EPR (Maldacena & Susskind, "Cool horizons for entangled black holes", 2013)
src/quantum/math/index.ts:13: * @standard the digital-root / mod-9 group ([[rodin]]); RFC 9562 §5.8 content-uuid
src/quantum/matrix/index.ts:19: * @standard ER=EPR (Maldacena–Susskind 2013) — entanglement IS the adjacency geometry; RFC 9562 §5.8
src/quantum/port/index.ts:10: * @standard RFC 9562 §5.8 content-uuid (the port identity)
src/quantum/pwa/index.ts:12: * @standard W3C Web App Manifest + Service Worker (content-addressed cache)
src/quantum/query/index.ts:9: * @standard RFC 9562 §5.8 content-uuid (the query cache key)
src/quantum/schema/index.ts:12: * @standard RFC 9562 §5.8 content-uuid; schema.org
src/quantum/sql/index.ts:9: * @standard RFC 9562 §5.8 content-uuid (the query cache key)
src/quantum/translator/index.ts:18: * @standard Johnson et al. (2017, arXiv:1611.04558); RFC 9562 §5.8 content-uuid (the interlingua)
src/quantum/type/index.ts:12: * @standard RFC 9562 §5.8 content-uuid
src/quantum/typography/index.ts:9: * @standard tamper-cost = entangled dimensions (the holographic principle)
src/quantum/wallet/index.ts:9: * @standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)
src/query/fingerprint/index.test.ts:18: * @standard ISO/IEC 9075-2 SQL/Foundation keyword inventory
src/query/fingerprint/index.test.ts:19: * @standard RFC 8785 JSON Canonicalization Scheme (params)
src/query/fingerprint/index.ts:57: * @standard ISO/IEC 9075-2 SQL/Foundation (keyword inventory)
src/query/fingerprint/index.ts:58: * @standard RFC 8785 JSON Canonicalization Scheme (for params digest)
src/query/fingerprint/index.ts:59: * @standard NIST FIPS 180-4 SHA-256
src/readme/index.ts:29: * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan → the README)
src/readme/index.ts:30: * @standard ISO-19011:2018 §6.4 audit-evidence (every number traces to a source)
src/realtime/index.ts:9: * @standard append-only log + cursor (the pull-based realtime model)
src/realtime/translator/index.ts:9: * @standard interlingua (language-independent meaning) over the realtime tail
src/receipt/index.ts:10: * @standard RFC 8785 JSON canonicalization (the content the uuid addresses)
src/receipt/index.ts:11: * @standard NIST FIPS 180-4 SHA-256 (the chain + content hash)
src/receipts/index.ts:22: * @standard BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt
src/receivable/aging.service.ts:10: * @standard ISO-8601-1:2019 date-time as-of-date
src/receivable/allowance.service.ts:7: * @standard ISO-4217:2015 currency-codes
src/receivable/analytics.service.ts:7: * @standard ISO-4217:2015 currency-codes
src/receivable/analytics.service.ts:8: * @standard ISO-8601-1:2019 date-time period
src/receivable/index.ts:4: * @standard EN-16931:2017 invoice-fields
src/receivable/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/receivable/index.ts:6: * @standard ISO-8601-1:2019 date-time
src/receivable/workflow.service.ts:6: * @standard EN-16931:2017 invoice-lifecycle
src/registry/index.ts:8: * @standard W3C Linked Data + JSON-LD (live standards expressed as LD)
src/registry/index.ts:9: * @standard ISO/IEC 15938-5 (multimedia content description framework)
src/regulatory/deferral/accounts/index.ts:10: * @standard IFRS IFRS-14 §3 scope-first-time-adopter
src/regulatory/deferral/accounts/index.ts:11: * @standard IFRS IFRS-14 §16 continuation-of-previous-GAAP
src/regulatory/deferral/accounts/index.ts:12: * @standard IFRS IFRS-14 §27 disclosure-requirements
src/regulatory/deferral/accounts/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/regulatory/deferral/accounts/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/relocate/index.ts:12: * @standard gravity — mass curves placement (the DRY / flatten law)
src/remote/media/import/index.ts:8: * @standard ISO/IEC-23008 mpeg-image
src/remote/media/import/index.ts:9: * @standard ISO/IEC-10918 jpeg
src/render/index.ts:16: * @standard the analog aura — colour/sound/vibration as projections of one content-uuid (A432)
src/rfc/3986/generate-preview-path.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/3986/generate-preview-path.test.ts:6: * @standard W3C URL Living Standard
src/rfc/3986/generate-preview-path.test.ts:7: * @standard BCP-47 language-tag
src/rfc/3986/generate-preview-path.ts:5: * @standard W3C URL Living Standard
src/rfc/3986/generate-preview-path.ts:6: * @standard BCP-47 language-tag locale
src/rfc/3986/get-url.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/3986/get-url.ts:7: * @standard W3C URL Living Standard
src/rfc/3986/url-utils.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/3986/url-utils.test.ts:6: * @standard W3C URL Living Standard
src/rfc/3986/url-utils.ts:5: * @standard W3C URL Living Standard
src/rfc/3986/url-utils.ts:6: * @standard ECMA-262 URL-class
src/rfc/6585/rate-limit.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/6585/rate-limit.test.ts:8: * @standard OWASP-ASVS V2.2 authentication-throttling
src/rfc/6585/rate-limit.ts:10: * @standard OWASP-ASVS V2.2 authentication-throttling
src/rfc/6585/rate-limit.ts:11: * @standard NIST SP-800-63B §5.2.2 rate-limiting
src/rfc/9110/cache.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/9110/cache.ts:8: * @standard W3C HTTP-Cache stale-while-revalidate
src/rfc/9110/cache.ts:9: * @standard BCP-47 language-tag locale-keyed-cache
src/rfc/9110/get-document.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/9110/get-document.test.ts:6: * @standard BCP-47 language-tag locale-keyed-cache
src/rfc/9110/get-globals.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rfc/9110/get-globals.ts:6: * @standard BCP-47 language-tag locale-keyed-cache
src/rfc/9110/get-redirects.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/rich/text/index.tsx:4: * @standard W3C HTML5 Living Standard rich-text-output
src/rich/text/index.tsx:5: * @standard CommonMark 0.31 markdown-fallback
src/rich/text/index.tsx:6: * @standard schema.org HTMLRichText
src/rodin/coil/index.ts:21: * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring (mod 9)
src/rodin/index.ts:24: * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring (mod 9)
src/roles/hooks/validateRoleDefinition.ts:9: * @standard NIST INCITS-359-2012 role-based-access-control role-binding
src/roles/index.ts:11: * @standard NIST INCITS-359-2012 role-based-access-control
src/roles/registry/index.ts:19: * @standard ISO 27002:2022 §5.4 segregation-of-duties
src/roles/registry/index.ts:20: * @standard COBIT 5 PO4.11 segregation-of-duties
src/roles/registry/index.ts:21: * @standard SOX §404 internal-controls + §302 officer-certifications
src/roles/registry/index.ts:22: * @standard NIST INCITS-359-2012 role-based-access-control
src/roles/user/roles/hooks/preventDuplicateAssignment.ts:12: * @standard NIST INCITS-359-2012 role-based-access-control role-assignment
src/roles/user/roles/index.ts:10: * @standard NIST INCITS-359-2012 role-based-access-control role-assignment
src/rolify/index.ts:10: * @standard NIST INCITS-359 RBAC (resource-scoped roles)
src/rolify/index.ts:11: * @standard EN-16931 business-terms (the party roles BG-4 Seller / BG-7 Buyer / BG-10 Payee …)
src/routing/index.ts:6: * @standard NIST AI RMF (risk-proportionate controls) — map risk → control strength
src/saf/t/export.service/index.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/saf/t/export.service/index.test.ts:9: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/export.service/index.ts:1246: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/export.service/index.ts:30: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/export.service/index.ts:31: * @standard ISO-3166-1:2020 country-codes
src/saf/t/export.service/index.ts:32: * @standard ISO-4217:2015 currency-codes
src/saf/t/export.service/index.ts:33: * @standard ISO-8601-1:2019 date-time
src/saf/t/export.service/source-documents.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/saf/t/export.service/source-documents.test.ts:5: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/export.service/xml.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing
src/saf/t/export.service/xml.test.ts:8: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/index.ts:4: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/types.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/saf/t/types.test.ts:9: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/types.ts:103: * @standard OECD SAF-T 2.0 Header
src/saf/t/types.ts:12: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/types.ts:139: * @standard OECD SAF-T 2.0 GeneralLedgerAccounts
src/saf/t/types.ts:13: * @standard ISO-3166-1:2020 country-codes
src/saf/t/types.ts:14: * @standard ISO-4217:2015 currency-codes
src/saf/t/types.ts:15: * @standard ISO-8601-1:2019 date-time
src/saf/t/types.ts:168: * @standard OECD SAF-T 2.0 Customer
src/saf/t/types.ts:183: * @standard OECD SAF-T 2.0 Supplier
src/saf/t/types.ts:195: * @standard OECD SAF-T 2.0 Product
src/saf/t/types.ts:211: * @standard OECD SAF-T 2.0 TaxTableEntry
src/saf/t/types.ts:227: * @standard OECD SAF-T 2.0 MasterFiles
src/saf/t/types.ts:243: * @standard OECD SAF-T 2.0 Line
src/saf/t/types.ts:266: * @standard OECD SAF-T 2.0 Transaction
src/saf/t/types.ts:28: * @standard OECD SAF-T 2.0 AddressStructure
src/saf/t/types.ts:291: * @standard OECD SAF-T 2.0 Journal
src/saf/t/types.ts:302: * @standard OECD SAF-T 2.0 GeneralLedgerEntries
src/saf/t/types.ts:318: * @standard OECD SAF-T 2.0 SourceDocuments
src/saf/t/types.ts:329: * @standard OECD SAF-T 2.0 InvoiceLine
src/saf/t/types.ts:351: * @standard OECD SAF-T 2.0 SalesInvoice
src/saf/t/types.ts:384: * @standard OECD SAF-T 2.0 Payment
src/saf/t/types.ts:414: * @standard OECD SAF-T 2.0 PaymentMechanism
src/saf/t/types.ts:440: * @standard OECD SAF-T 2.0 MovementOfGoods
src/saf/t/types.ts:44: * @standard OECD SAF-T 2.0 PartyInfoStructure
src/saf/t/types.ts:467: * @standard OECD SAF-T 2.0 SourceDocuments
src/saf/t/types.ts:500: * @standard OECD SAF-T 2.0 AuditFile
src/saf/t/types.ts:63: * @standard OECD SAF-T 2.0 AmountStructure
src/saf/t/types.ts:79: * @standard OECD SAF-T 2.0 TaxInformationStructure
src/saf/t/validate.ts:4: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/saf/t/validate.ts:53: * @standard OECD SAF-T 2.0 GeneralLedgerEntries
src/safely/index.ts:14: * @standard ISO/IEC 25010 §5.5 testability + §5.8 fault-tolerance (graceful degradation)
src/safety/mode/index.ts:42: * @standard ISO/IEC 27001 Annex A.14.2.5 secure-systems-engineering
src/safety/mode/index.ts:43: * @standard NIST SP 800-160 §3.4.2 trustworthy secure design
src/safety/mode/index.ts:44: * @standard OWASP ASVS V14 Configuration (hard-coded production mode)
src/sale/audit-file.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/audit-file.test.ts:6: * @standard BG Наредба-Н-18 §Приложение-38
src/sale/audit-file.ts:17: * @standard BG Наредба-Н-18 §Приложение-38 standardized-audit-file
src/sale/audit-file.ts:18: * @standard OECD SAF-T 2.0 (universal base profile)
src/sale/daily-report.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/daily-report.test.ts:6: * @standard BG Наредба-Н-18 §дневен-отчет · §Приложение-1
src/sale/daily-report.ts:14: * @standard BG Наредба-Н-18 §дневен-отчет · §Приложение-1 tax-groups
src/sale/fiscal-context.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/sale/fiscal-context.test.ts:7: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-regime
src/sale/fiscal-context.ts:21: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-regime
src/sale/fiscal-context.ts:22: * @standard ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency
src/sale/fiscal-receipt.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/fiscal-receipt.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО касов-бон
src/sale/fiscal-receipt.ts:14: * @standard BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt
src/sale/fiscalize-revenue.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/sale/fiscalize-revenue.test.ts:7: * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1
src/sale/fiscalize-revenue.ts:16: * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 fiscalization-scope
src/sale/operator-code.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/operator-code.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature
src/sale/operator-code.ts:12: * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature УНП-second-segment
src/sale/order-fiscalization.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/sale/order-fiscalization.test.ts:7: * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
src/sale/order-fiscalization.ts:10: * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
src/sale/receipt-subscriber.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/receipt-subscriber.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО касов-бон
src/sale/receipt-subscriber.ts:8: * @standard BG Наредба-Н-18 §СУПТО касов-бон issuance-on-close
src/sale/reverse-sale.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/reverse-sale.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО сторно
src/sale/reverse-sale.ts:12: * @standard BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original
src/sale/sale-event.ts:8: * @standard BG Наредба-Н-18 §СУПТО sale-lifecycle
src/sale/sale-immutability.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/sale-immutability.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО no-delete · reversal-only
src/sale/sale-immutability.ts:13: * @standard BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation
src/sale/submit-audit-file.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/submit-audit-file.test.ts:6: * @standard BG Наредба-Н-18 §Приложение-38
src/sale/submit-audit-file.ts:8: * @standard BG Наредба-Н-18 §Приложение-38 audit-file-submission
src/sale/submit-audit-file.ts:9: * @standard OECD SAF-T 2.0 (universal base)
src/sale/subscription-fiscalization.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/sale/subscription-fiscalization.test.ts:7: * @standard BG Наредба-Н-18 §СУПТО · §чл.3-ал.1 card-payment-in-scope
src/sale/subscription-fiscalization.ts:14: * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 card-payment-in-scope
src/sale/unp-sequence.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/unp-sequence.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО УНП
src/sale/unp-sequence.ts:16: * @standard BG Наредба-Н-18 §СУПТО УНП per-fiscal-device-gapless-sequence
src/sale/validate-fiscal-refs.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/validate-fiscal-refs.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature
src/sale/validate-fiscal-refs.ts:13: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature
src/sale/virtual-device.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/sale/virtual-device.test.ts:6: * @standard BG Наредба-Н-18 §алтернативен-режим
src/sale/virtual-device.ts:15: * @standard BG Наредба-Н-18 §алтернативен-режим e-shop-card-payments
src/sale/virtual-device.ts:16: * @standard BG Наредба-Н-18 §Приложение-38 (monthly reporting — the audit file)
src/sandbox/index.ts:7: * @standard NIST SP-800-162 ABAC (capability-scoped authorization)
src/sandbox/index.ts:8: * @standard OWASP-ASVS V5 untrusted-input / least-privilege
src/scheduled/task/registry.ts:20: * @standard rfc-5545 icalendar (cron-style schedules)
src/scheduled/task/registry.ts:21: * @standard ISO-8601-1:2019 date-time
src/scheduled/task/types.ts:4: * @standard rfc-5545 icalendar-cron
src/schema/test/index.ts:17: * @standard ISO/IEC 25010:2023 quality-model (integrity, modularity)
src/schema/test/index.ts:18: * @standard RFC 9562 §5.8 (uuidv8 content-uuid) — the collision unit
src/scope/index.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/scope/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/sdk/accounting-client/index.ts:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/search/engine/optimization/index.ts:9: * @standard schema.org + Open Graph discoverability; on-page keyword coverage
src/sectors/index.ts:14: * @standard UN SNA-2008 institutional-sectors (S.11/S.12 corporations · S.13 government · S.14 households · S.15 NPISH)
src/sectors/index.ts:15: * @standard UN ISIC Rev.4 international-standard-industrial-classification (economic activity)
src/sectors/index.ts:16: * @standard EU NACE Rev.2 economic-activities
src/sectors/index.ts:17: * @standard UN COFOG classification-of-the-functions-of-government (10 divisions)
src/sectors/index.ts:18: * @standard UN/Johns-Hopkins ICNPO international-classification-of-non-profit-organizations (civil society)
src/sectors/index.ts:19: * @standard UN COICOP household-consumption-functions
src/sectors/index.ts:20: * @standard UN 2030-Agenda Sustainable-Development-Goals (17 goals — society's outcomes)
src/sectors/index.ts:21: * @standard ISO 3166-1:2020 country-codes (geographic level)
src/security/header/headers.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/security/header/headers.test.ts:6: * @standard W3C CSP-3 content-security-policy
src/security/header/headers.test.ts:7: * @standard W3C Referrer-Policy
src/security/header/headers.test.ts:8: * @standard W3C Permissions-Policy
src/security/header/headers.test.ts:9: * @standard OWASP-ASVS V14 configuration
src/security/header/headers.ts:10: * @standard W3C CSP-3 content-security-policy
src/security/header/headers.ts:11: * @standard W3C Referrer-Policy
src/security/header/headers.ts:12: * @standard W3C Permissions-Policy
src/security/header/headers.ts:13: * @standard OWASP-ASVS V14 configuration
src/security/header/headers.ts:14: * @standard OWASP Secure-Headers-Project
src/security/header/index.ts:5: * @standard W3C CSP-3
src/security/header/index.ts:6: * @standard W3C Permissions-Policy
src/security/remote/access/index.ts:19: * @standard NIST SP 800-162 ABAC · NIST SP 800-107r1 §5.1 · CWE-59
src/seed/erpax-product-pages.ts:31: * @standard schema.org Product
src/seed/erpax-product-pages.ts:32: * @standard schema.org WebSite breadcrumb
src/seed/erpax-product-pages.ts:33: * @standard ISO-25010 usability marketing-content
src/seed/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/seed/index.ts:9: * @standard BCP-47 language-tag locale-bundled-fixtures
src/seeding/seedSubscriptionPlans.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/seeding/seedSubscriptionPlans.test.ts:5: * @standard ISO-4217:2015 currency-codes
src/seeding/seedSubscriptionPlans.ts:10: * @standard ISO-4217:2015 currency-codes
src/seeds/template/bg-nss.ts:17: * @standard ISO-3166-1:2020 BG country-code
src/seeds/template/bg-nss.ts:18: * @standard BG-NSS national-statutory-chart-of-accounts
src/seeds/template/compliance.ts:6: * @standard ISO-3166-1:2020 country-codes alpha-2
src/seeds/template/compliance.ts:7: * @standard ISO-4217:2015 currency-codes
src/seeds/template/compliance.ts:8: * @standard EN-16931:2017 e-invoicing
src/seeds/template/templates.test.ts:11: * @standard ISO/IEC-29119:2022 software-testing
src/seeds/template/templates.test.ts:12: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/seeds/template/templates.test.ts:13: * @standard ISO-3166-1:2020 country-codes alpha-2
src/seeds/template/templates.test.ts:14: * @standard ISO-4217:2015 currency-codes
src/seeds/template/templates.ts:10: * @standard ISO-3166-1:2020 country-codes alpha-2
src/seeds/template/templates.ts:11: * @standard ISO-4217:2015 currency-codes
src/seeds/template/types.ts:10: * @standard ISO-3166-1:2020 country-codes alpha-2
src/seeds/template/types.ts:11: * @standard ISO-4217:2015 currency-codes
src/self/accounting/index.ts:18: * @standard IFRS IFRS-15 §31-§45 (revenue recognition)
src/self/accounting/index.ts:19: * @standard IFRS IAS-18 (deprecated, superseded by IFRS-15)
src/self/accounting/index.ts:20: * @standard EU VAT Directive 2006/112/EC + DAC8
src/self/accounting/index.ts:21: * @standard EU EBA FINREP + COREP technical standards
src/self/accounting/index.ts:22: * @standard CSRD 2022/2464 + ESRS E1-S4 + IFRS S1/S2
src/self/closure/index.test.ts:21: * @standard ISO/IEC 25010:2023 §5.6.2 fault tolerance
src/self/closure/index.ts:37: * @standard ISO 22301 business-continuity (BC-V tier — self-hosted continuity)
src/self/closure/index.ts:38: * @standard ISO/IEC 25010:2023 §5.6.2 fault tolerance
src/self/closure/provider/federation.ts:34: * @standard ISO/IEC 25010:2023 §5.6 reliability
src/self/closure/provider/notification.ts:31: * @standard ISO/IEC 25010:2023 §5.6 reliability
src/self/closure/provider/notification.ts:32: * @standard GDPR Article 6(1)(b) contractual basis for in-app messaging
src/self/closure/provider/notification.ts:33: * @standard ePrivacy Directive 2002/58/EC §13 (in-app exempt from cookie/SMS rules)
src/self/closure/provider/notification.ts:34: * @standard NIST SP 800-34 §3.4 contingency planning
src/self/closure/provider/search.ts:26: * @standard ISO/IEC 25010:2023 §5.6 reliability
src/self/closure/provider/signing.ts:52: * @standard RFC 8032 EdDSA Ed25519
src/self/closure/provider/signing.ts:53: * @standard RFC 7515 JSON Web Signature
src/self/closure/provider/signing.ts:54: * @standard eIDAS Regulation (EU) 910/2014 §3.11 AdES (this provider)
src/self/closure/provider/signing.ts:55: * @standard ETSI EN 319 102-1 §4.3 signature creation
src/self/closure/provider/signing.ts:56: * @standard ETSI EN 319 132-1 XAdES (export compatibility)
src/self/closure/provider/signing.ts:57: * @standard ETSI EN 319 142-1 PAdES (export compatibility)
src/self/closure/types.ts:47: * @standard ISO/IEC 25010:2023 §5.6 reliability — fault tolerance via redundancy
src/self/closure/types.ts:48: * @standard ISO 22301 business-continuity (self-hosted continuity tier)
src/self/closure/types.ts:49: * @standard ISO 27001 Annex A.17 information-security continuity
src/self/closure/types.ts:50: * @standard NIST SP 800-34 Rev. 1 §3.4 contingency planning
src/self/closure/types.ts:51: * @standard BCBS 239 §5 IT infrastructure (single-point-of-failure avoidance)
src/self/reference/erpax.profile.ts:11: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness (self-coherence)
src/self/research/index.ts:24: * @standard NIST SP 800-162 ABAC — the access scope is the ownership boundary
src/self/research/index.ts:25: * @standard OWASP ASVS V5 — least-privilege / IDOR-prevention (no cross-actor read)
src/self/research/index.ts:26: * @standard NIST SP 800-63B §6.1.3 — owner-authorized credential recovery
src/self/similar/index.ts:15: * @standard the hologram — 6 generators → 36 Cayley cells, 0 free parameters
src/self/sufficient/index.ts:25: * @standard NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)
src/self/sufficient/index.ts:26: * @standard NIST SP 800-161r1 (supply-chain / external-dependency risk)
src/shared/AddressBlock.tsx:14: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/shared/AddressBlock.tsx:15: * @standard UPU-S42 international-postal-addressing
src/shared/AddressBlock.tsx:16: * @standard ISO-3166-1:2020 country-codes alpha-2
src/shared/AddressBlock.tsx:17: * @standard W3C HTML5 address-element
src/shared/AuditedTimestamp.tsx:13: * @standard ISO-8601-1:2019 date-time utc-canonical
src/shared/AuditedTimestamp.tsx:14: * @standard W3C HTML5 time-element
src/shared/AuditedTimestamp.tsx:15: * @standard ECMA-402 internationalization-api intl-datetimeformat
src/shared/AuditedTimestamp.tsx:16: * @standard BCP-47 language-tag locale-formatting
src/shared/Money.tsx:14: * @standard ISO-4217:2015 §5 alphabetic-codes
src/shared/Money.tsx:15: * @standard ECMA-402 internationalization-api intl-numberformat
src/shared/Money.tsx:16: * @standard IEEE-754-2019 binary-floating-point integer-cents-only
src/shared/Money.tsx:17: * @standard BCP-47 language-tag locale-formatting
src/shared/field.ts:106: * @standard ISO-8601-1:2019 date-time
src/shared/field.ts:10: * @standard ISO-8601-1:2019 date-time
src/shared/field.ts:11: * @standard ISO-27001:2022 A.5.23 cloud-service-tenant-isolation
src/shared/field.ts:12: * @standard ISO-27002:2022 §5.15 access-control
src/shared/field.ts:201: * @standard ISO-19011:2018 audit-trail
src/shared/field.ts:419: * @standard ISO 3166-1:2020 country-codes
src/shared/field.ts:42: * @standard ISO-4217:2015 currency-codes
src/shared/field.ts:438: * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
src/shared/field.ts:80: * @standard ISO-4217:2015 currency decimal-place validation
src/shared/field.ts:9: * @standard ISO-4217:2015 currency-codes
src/shared/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/shared/index.ts:18: * @standard ISO-8601-1:2019 date-time
src/shared/index.ts:19: * @standard ISO-3166-1:2020 country-codes alpha-2
src/shared/index.ts:20: * @standard ISO-19160-4:2017 addressing
src/shared/index.ts:21: * @standard ECMA-402 internationalization-api
src/shared/index.ts:22: * @standard BCP-47 language-tag
src/shared/index.ts:23: * @standard W3C HTML5 living-standard
src/shareds/documentPreviewAdmin.ts:15: * @standard BCP-47 language-tag locale
src/shares/index.ts:29: * @standard NIST SP 800-162 §3 attribute-based-access-control
src/shares/index.ts:30: * @standard ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights
src/shares/index.ts:31: * @standard ISO/IEC 27001 Annex A.9.4.1 information-access-restriction
src/shares/index.ts:32: * @standard eIDAS §3 sealed-grants (sign/admin)
src/shred/index.ts:16: * @standard GDPR (EU 2016/679) Art.17 (erasure) · Art.5(1)(c) (minimisation) · Art.25 (by design)
src/shred/index.ts:17: * @standard NIST SP 800-88 r1 §2.5 (cryptographic erase as sanitisation)
src/signal/index.ts:16: * @standard ISO-16:1975 a432-tuning-reference (pitch); value from position.
src/singularity/index.ts:22: * @standard Penrose, "Gravitational Collapse and Space-Time Singularities," PRL 14 57 (1965)
src/site/tenant/where/index.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control tenant-isolation
src/skill/router/competencies.ts:16: * @standard ESCO v1.2 skills-pillar sub-classification + reusability tiers
src/skill/router/competencies.ts:17: * @standard SFIA 8 responsibility-levels 1..7 (held vs required; gap = required − held)
src/skill/router/merge.ts:20: * @standard ESCO/SFIA — installed skills enter the same competency taxonomy
src/skill/router/prose-entropy.ts:15: * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
src/skill/router/rating.ts:17: * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
src/skill/router/subgraph.ts:19: * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
src/social/graph/index.ts:10: * @standard W3C ActivityStreams 2.0 Follow/Accept reciprocity
src/spec/generator/chain-registry-generator.ts:16: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
src/spec/generator/e2e-spec-extractor.ts:24: * @standard ISO/IEC-29119:2022 software-testing test-evidence
src/spec/generator/e2e-spec-extractor.ts:25: * @standard ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
src/spec/generator/evidence-collector.ts:38: * @standard ISO/IEC-29119:2022 software-testing test-evidence
src/spec/generator/evidence-collector.ts:39: * @standard ISO-19011:2018 §6.4.6 audit-evidence visual-evidence
src/spec/generator/extractor.ts:13: *   @standard      <body> <id> [free-text]
src/spec/generator/extractor.ts:37: * @standard ISO/IEC 25010:2023 §5 modularity-and-maintainability
src/spec/generator/extractor.ts:38: * @standard ISO/IEC 12207 software-life-cycle
src/spec/generator/i18n-audit.ts:11: * @standard ISO 19011:2018 §6.4 audit-evidence
src/spec/generator/i18n-audit.ts:12: * @standard ISO/IEC 25023:2016 §8 quality-measurement-functionality-completeness
src/spec/generator/i18n-audit.ts:13: * @standard BCP-47 language-tag
src/spec/generator/i18n-keys.ts:31: * @standard BCP-47 language-tag
src/spec/generator/i18n-keys.ts:32: * @standard W3C i18n key-naming-best-practices
src/spec/generator/i18n-stub-filler.ts:10: * @standard BCP-47 language-tag
src/spec/generator/i18n-stub-filler.ts:9: * @standard ISO/IEC 25023:2016 §8 functional-completeness
src/spec/generator/index.ts:10: * @standard ISO/IEC 25010:2023 §5 modularity-and-maintainability
src/spec/generator/marketing-page-generator.ts:40: * @standard W3C HTML5 §4 sectioning
src/spec/generator/marketing-page-generator.ts:41: * @standard WCAG 2.2 §1.4.3 contrast-aa  (color tokens reserved CSS vars)
src/spec/generator/marketing-page-generator.ts:42: * @standard WAI-ARIA 1.2 landmark-roles
src/spec/generator/marketing-page-generator.ts:43: * @standard ISO/IEC-29119:2022 software-testing test-evidence (citations preserved)
src/spec/generator/multimedia-generator.ts:30: * @standard ISO/IEC-29119:2022 software-testing test-evidence
src/spec/generator/multimedia-generator.ts:31: * @standard ISO-19011:2018 §6.4.6 audit-evidence visual-evidence
src/spec/generator/multimedia-generator.ts:32: * @standard W3C HTML5 video + img + figure
src/spec/generator/seed-generator.ts:179: * @standard ${chain.standards.join('\n * @standard ')}
src/spec/generator/seed-generator.ts:34: * @standard ISO/IEC 25010:2023 §5.4 reusability
src/spec/generator/spec-templates.ts:23: * @standard ICU-MessageFormat (template grammar — adopted via Mustache)
src/spec/generator/spec-templates.ts:24: * @standard W3C i18n composable-translations
src/spec/generator/spec-templates.ts:25: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/spec/generator/test-generator.ts:157: * @standard ${chain.standards.join('\n * @standard ')}
src/spec/generator/test-generator.ts:247: * @standard ${chain.standards.join('\n * @standard ')}
src/spec/generator/test-generator.ts:28: * @standard ISO/IEC 25010:2023 §5.5 testability
src/spec/generator/translation-generator.ts:69: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/spec/generator/translation-generator.ts:70: * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
src/spec/generator/translation-generator.ts:71: * @standard BCP-47 language-tag
src/spec/generator/translation-generator.ts:72: * @standard W3C i18n key-naming-best-practices
src/spec/generator/types.ts:12: * @standard ISO/IEC 25010:2023 §5 modularity
src/spec/generator/types.ts:13: * @standard ISO/IEC 12207 software-life-cycle
src/sql/index.ts:9: * @standard SQL SELECT (a minimal subset); deterministic canonicalisation
src/standard/truth/index.ts:25: * @standard ISO-19011:2018 6.4.6 audit-evidence (a citation needs evidence)
src/standards/catalogue.test.ts:7: * @standard ISO/IEC-29119:2022 software-testing (invariant coverage)
src/standards/catalogue.test.ts:8: * @standard ISO/IEC-25010:2023 §5.4 reusability (one join, two frontends)
src/standards/catalogue.ts:11: * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan, two consumers)
src/standards/catalogue.ts:12: * @standard ISO-19011:2018 §6.4 audit-evidence (the citation index)
src/standards/index.test.ts:3: * @standard ISO/IEC-29119:2022 software-testing (invariant coverage)
src/standards/index.test.ts:4: * @standard ISO-19011:2018 §6.4 audit-evidence (the collection is the citation registry)
src/standards/index.ts:26: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/standards/index.ts:27: * @standard ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)
src/standards/index.ts:28: * @standard W3C JSON-LD 1.1 (citation as live linked-data)
src/standards/registry.ts:17: * @standard ISO-19011:2018 audit-evidence (a curated register of cited norms)
src/standards/registry.ts:18: * @standard ISO/IEC-25010:2023 §5.1 functional-completeness
src/standards/seed.ts:19: * @standard ISO-19011:2018 §6.4 audit-evidence (citingModules = the trail)
src/sti/schema-org.ts:19: * @standard schema.org (the universal type vocabulary; Thing + subClassOf)
src/sti/schema-org.ts:20: * @standard JSON-LD 1.1 W3C-REC (the structured-data serialization)
src/sti/vocabulary/index.ts:14: * @standard schema.org (the universal type vocabulary, collided to single words)
src/storage/independence/index.ts:62: * @standard ISO/IEC 27040:2024 — storage security (data integrity)
src/storage/independence/index.ts:63: * @standard W3C Verifiable Data Registry conformance (storage layer)
src/storage/independence/index.ts:64: * @standard RFC 9562 §5.8 + RFC 8785 (content-derived uuids)
src/storage/redundancy/index.ts:8: * @standard ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)
src/stream/index.ts:45: * @standard ReactiveX / W3C Streams API (AsyncIterable surface)
src/stream/index.ts:46: * @standard ISO/IEC 25010:2023 §5.2 performance — throughput
src/stream/index.ts:47: * @standard Lamport 1978 — distributed-system causal ordering
src/subscription/gate/index.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/subscription/gate/index.test.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control
src/subscription/gate/index.ts:12: * @standard NIST INCITS-359-2012 role-based-access-control
src/subscription/gate/index.ts:214: * @standard NIST INCITS-359-2012 role-based-access-control
src/subscription/plans/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:23: * @standard ISO-4217:2015 currency-codes
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:24: * @standard ISO-8601-1:2019 date-time period-boundaries
src/subscription/plans/subscriptions/hooks/encryptSensitiveFields.ts:8: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/subscription/plans/subscriptions/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/subscription/plans/subscriptions/index.ts:14: * @standard ISO-8601-1:2019 date-time period-start period-end
src/subscription/plans/subscriptions/usage/records/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/subscription/plans/subscriptions/usage/records/index.ts:16: * @standard ISO-8601-1:2019 date-time event-time billing-period
src/subscription/plans/subscriptions/usage/records/index.ts:17: * @standard rfc-9562 uuid event-id
src/sustainability/index.ts:14: * @standard Verhulst logistic growth (1838) — carrying capacity K; dN/dt = r·N·(1 − N/K)
src/sustainability/index.ts:15: * @standard Prigogine dissipative structures (Nobel Chemistry, 1977) — order by dissipation
src/sustainability/index.ts:16: * @standard Brundtland Report, Our Common Future (1987) — canonical sustainability definition
src/sustainability/index.ts:17: * @standard Second Law of Thermodynamics — local order requires entropy export
src/svg/hero/generator/index.ts:17: * @standard W3C SVG-1.1 scalable-vector-graphics
src/svg/hero/generator/index.ts:18: * @standard ISO/IEC-29500 office-open-xml media-embedding-target
src/tag/field.ts:20: * @standard ISO-25964-1:2011 controlled-vocabulary
src/tag/list.ts:21: * @standard ISO-25964-1:2011 controlled-vocabulary delimited-entry
src/tag/setTagList.ts:19: * @standard ISO-25964-1:2011 thesaurus assignment
src/tag/setTagList.ts:20: * @standard RFC-4122 §4.3 uuid content-addressed-dedup
src/tag/taggedWith.ts:18: * @standard ISO-25964-1:2011 thesauri retrieval
src/tags/index.ts:21: * @standard ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary
src/tags/index.ts:22: * @standard RFC-4122 §4.3 uuid content-addressed-id
src/tags/taggings/index.ts:30: * @standard ISO-25964-1:2011 thesauri associative-relationships
src/tags/taggings/index.ts:31: * @standard RFC-4122 §4.3 uuid content-addressed-dedup
src/tamper/cost/index.ts:44: * @standard NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)
src/tamper/cost/index.ts:45: * @standard RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)
src/tamper/cost/index.ts:46: * @standard ISO-19011:2018 §6.5 (audit evidence integrity)
src/tamper/cost/index.ts:47: * @standard CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
src/tamper/cost/index.ts:48: * @standard DeepSeek-Prover-V2 — recursive subgoal decomposition, Lean-4 kernel-checked invariants
src/tax/automation.service/index.ts:17: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/tax/automation.service/index.ts:18: * @standard ISO-3166-1:2020 country-codes jurisdiction
src/tax/automation.service/index.ts:19: * @standard ISO-3166-2:2020 subdivision-codes jurisdiction
src/tax/jurisdictions/deferred/tax/items/index.ts:11: * @standard IFRS IAS-12 §15-§68 income-taxes
src/tax/jurisdictions/deferred/tax/items/index.ts:12: * @standard IFRS IAS-12 §29 deductible-temporary-differences
src/tax/jurisdictions/deferred/tax/items/index.ts:13: * @standard IFRS IAS-12 §34 deferred-tax-asset-recognition
src/tax/jurisdictions/deferred/tax/items/index.ts:14: * @standard IFRS IAS-12 §47 measurement-using-substantively-enacted-rate
src/tax/jurisdictions/deferred/tax/items/index.ts:15: * @standard IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities
src/tax/jurisdictions/deferred/tax/items/index.ts:16: * @standard US-GAAP ASC-740 income-taxes
src/tax/jurisdictions/deferred/tax/items/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/tax/jurisdictions/deferred/tax/items/index.ts:18: * @standard ISO-8601-1:2019 date-time origination-reversal
src/tax/jurisdictions/index.ts:14: * @standard ISO-3166-1:2020 country-codes alpha-2
src/tax/jurisdictions/index.ts:15: * @standard ISO-3166-2:2020 subdivision-codes
src/tax/jurisdictions/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/tax/jurisdictions/index.ts:17: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/tax/jurisdictions/tax/codes/index.ts:15: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/tax/jurisdictions/tax/codes/index.ts:16: * @standard UN-CEFACT-5305 tax-category-codes
src/tax/jurisdictions/tax/codes/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/tax/jurisdictions/tax/codes/index.ts:18: * @standard ISO-8601-1:2019 date-time
src/tax/jurisdictions/tax/returns/index.ts:4: * @standard ISO-8601-1:2019 date-time period filed-at
src/tax/jurisdictions/tax/returns/index.ts:5: * @standard ISO-3166-1:2020 country-codes jurisdiction
src/tax/jurisdictions/tax/returns/index.ts:6: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/tax/period/reconciliation/index.ts:15: * @standard IAS-12:2023 (income taxes)
src/tax/period/reconciliation/index.ts:16: * @standard IFRS-16:2023 (leases — tax implications)
src/tax/period/reconciliation/index.ts:17: * @standard OECD Transfer Pricing Guidelines:2022
src/tax/period/reconciliation/index.ts:18: * @standard BEPS Action 13:2021 (transfer pricing documentation)
src/tax/period/reconciliation/index.ts:19: * @standard OECD Pillar Two:2023 (global minimum tax)
src/tax/period/reconciliation/index.ts:20: * @standard SAF-T:3.0.2 (multi-entity, multi-jurisdiction audit trail)
src/taxing/jurisdictions/entity/legal/structures/index.ts:5: * @standard ISO-17442-1:2020 legal-entity-identifier
src/taxing/jurisdictions/index.ts:4: * @standard ISO-3166-1:2020 country-codes
src/taxing/jurisdictions/index.ts:5: * @standard OECD tax-jurisdiction
src/taxing/jurisdictions/index.ts:6: * @standard EU Directive 2006/112/EC VAT
src/taxing/jurisdictions/reporting/standards/index.ts:6: * @standard ESRS EU-sustainability-reporting
src/taxing/jurisdictions/reporting/standards/reporting/mappings/index.ts:4: * @standard XBRL-GL global-ledger-taxonomy
src/taxing/jurisdictions/reporting/standards/reporting/mappings/index.ts:5: * @standard IFRS-Taxonomy reporting-mapping
src/taxing/jurisdictions/reporting/standards/reporting/mappings/index.ts:6: * @standard SAF-T OECD mapping
src/taxing/jurisdictions/statutory/report/templates/index.ts:4: * @standard SAF-T OECD audit-file
src/taxing/jurisdictions/statutory/report/templates/index.ts:5: * @standard XBRL business-reporting
src/taxing/jurisdictions/statutory/report/templates/index.ts:6: * @standard IFRS-Taxonomy
src/taxing/jurisdictions/statutory/report/templates/statutory/field/mappings/index.ts:4: * @standard SAF-T OECD standard-audit-file-tax
src/taxing/jurisdictions/statutory/report/templates/statutory/field/mappings/index.ts:5: * @standard XBRL taxonomy-mapping
src/taxing/jurisdictions/statutory/report/templates/statutory/field/mappings/index.ts:6: * @standard EN-16931 e-invoicing-semantic-model
src/tenant/context/index.ts:37: * @standard ISO-3166-1:2020 country-codes alpha-2 cascade-source
src/tenant/context/index.ts:38: * @standard ISO-4217:2015 currency-codes alphabetic cascade-source
src/tenant/context/index.ts:39: * @standard BCP-47 language-tag locale-cascade
src/tenant/context/index.ts:40: * @standard ECMA-402 internationalization-api
src/tenant/remote/secret/index.ts:5: * @standard NIST SP-800-108 key-derivation-function (sibling: `getPreviewSecret`)
src/tenant/role/index.ts:13: * @standard ISO/IEC 25010:2023 §5.4 reusability
src/tenant/role/registry.ts:10: * @standard ISO/IEC 25010:2023 §5.4 reusability
src/tenant/role/types.ts:14: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/tenant/role/types.ts:15: * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
src/tenant/roles/profile/bank.profile.ts:9: * @standard Basel III/IV + BCBS 239 + CRR + CRD + IFRS 9 ECL + AnaCredit
src/tenant/roles/profile/country.profile.ts:49: * @standard ISO 3166-1 alpha-2/3/numeric — country codes
src/tenant/roles/profile/country.profile.ts:50: * @standard UN M49 + UN SDG indicator framework
src/tenant/roles/profile/country.profile.ts:51: * @standard IMF GFSM 2014 + World Bank IDS + OECD GovDB
src/tenant/roles/profile/country.profile.ts:52: * @standard OECD BEPS Pillar 2 + CRS + DAC6/7/8
src/tenant/roles/profile/country.profile.ts:53: * @standard WCO HS + WTO GATS + WTO TRIPS + UN/CEFACT
src/tenant/roles/profile/country.profile.ts:54: * @standard SWIFT BIC + ISO 13616 IBAN + ISO 20022
src/tenant/roles/profile/country.profile.ts:55: * @standard W3C DID Core 1.0 (sovereign DID) + W3C VC Data Model 2.0
src/tenant/roles/profile/government.profile.ts:9: * @standard IPSAS 1-42 + GFSM 2014 + EU procurement directives +
src/tenant/roles/profile/payment-provider.profile.ts:10: * @standard PSD2 + PSD3 + EBA RTS + EMD2 + ISO 20022 + Berlin Group +
src/tenant/scoped/read/index.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/tenant/scoped/read/index.test.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control
src/tenants/access/updateAndDelete.ts:9: * @standard NIST INCITS-359-2012 role-based-access-control
src/tenants/hooks/initializeTrial.ts:11: * @standard ISO-8601-1:2019 date-time trial-period
src/tenants/index.ts:106:     * @standard ISO-3166-1:2020 country-codes alpha-2 identity.country
src/tenants/index.ts:107:     * @standard ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency
src/tenants/index.ts:108:     * @standard BCP-47 language-tag localization.defaultLocale
src/tenants/index.ts:109:     * @standard ECMA-402 internationalization-api locale-cascade
src/tenants/index.ts:18: * @standard ISO-17442-1:2020 lei legal-entity-identifier
src/tenants/index.ts:19: * @standard ISO-3166-1:2020 country-codes alpha-2
src/tenants/index.ts:20: * @standard ISO-4217:2015 currency-codes default-currency
src/tenants/index.ts:21: * @standard BCP-47 language-tag default-locale
src/terminals/index.ts:13: * @standard BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal
src/test/hooks/index.ts:10: * @standard A432 tuning; green = whole aura (a passing test)
src/testing/config-discovery-advanced.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery-advanced.test.ts:5: * @standard JSON-Schema 2020-12 schema-validation
src/testing/config-discovery-types/index.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery-types/index.ts:5: * @standard JSON-Schema 2020-12 schema-validation
src/testing/config-discovery.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery.test.ts:5: * @standard JSON-Schema 2020-12 schema-validation
src/testing/config-discovery/index.ts:1169: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery/index.ts:1182: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery/index.ts:1192: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery/index.ts:7: * @standard ISO/IEC-29119:2022 software-testing
src/testing/config-discovery/index.ts:8: * @standard JSON-Schema 2020-12 schema-validation
src/testing/index.ts:10: * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
src/testing/index.ts:11: * @standard JSON-Schema 2020-12 schema-validation
src/testing/index.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/testing/index.ts:9: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/testing/test-seed-factory.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
src/testing/test-seed-factory.test.ts:5: * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
src/testing/test-seed-factory/index.ts:15: * @standard ISO/IEC-29119:2022 software-testing
src/testing/test-seed-factory/index.ts:16: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/testing/test-seed-factory/index.ts:17: * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
src/testing/test-seed-factory/index.ts:37: * @standard ISO/IEC-29119:2022 software-testing
src/testing/test-seed-factory/index.ts:56: * @standard ISO/IEC-29119:2022 software-testing test-fixture-categorization
src/testing/test-seed-factory/index.ts:723:   * @standard ISO/IEC-29119:2022 software-testing test-fixture
src/testing/test-setup.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
src/testing/test-setup.test.ts:5: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/testing/test-setup/index.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/testing/test-setup/index.ts:6: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/topology/torus.ts:49: * @standard Topology — torus / closed manifold (Hatcher 2002)
src/topology/torus.ts:50: * @standard ISO/IEC 25010:2023 §5.2 performance — resource envelope
src/topology/torus.ts:51: * @standard ISO/IEC 30134 — KPIs for resource efficiency
src/train/index.ts:24: * @standard SFIA 8 responsibility-levels-1-7 (the held/required/efficiency scale)
src/train/index.ts:25: * @standard ISO 30405:2016 essential-vs-optional (mandatory gates the surface)
src/transaction/failures/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/transaction/failures/index.ts:12: * @standard ISO-8601-1:2019 date-time transaction-date
src/translate/index.ts:20: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags
src/translation/index.ts:19: * @standard BCP-47 language tags
src/translation/index.ts:20: * @standard RFC 9562 §5.8 content-uuid (the messaging-uuid)
src/translation/index.ts:21: * @standard schema.org translationOfWork / workTranslation (collided to one word)
src/translations/collect/index.ts:27: * @standard BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)
src/translations/index.ts:38: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/translations/index.ts:39: * @standard BCP-47 language tags
src/translations/index.ts:40: * @standard EU 1958/1 official-languages-of-the-european-union
src/translator/index.ts:15: * @standard Johnson et al., "Google's Multilingual NMT System: Enabling Zero-Shot Translation," TACL (2017), arXiv:1611.04558
src/trinity/index.ts:13: * @standard the file is architecture — the detail lives in the folder PATH, never the filename
src/types/auth/index.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/types/bank-reconciliation/index.ts:4: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/types/bank-reconciliation/index.ts:5: * @standard ISO-13616-1:2020 iban
src/types/bank-reconciliation/index.ts:6: * @standard ISO-9362:2022 bic
src/types/bank-reconciliation/index.ts:7: * @standard ISO-4217:2015 currency-codes
src/types/bank-reconciliation/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/types/events/index.ts:135: * @standard EN-16931:2017 BG-25 invoice-line
src/types/events/index.ts:632: * @standard IAS-2 §10 absorbed-cost
src/types/events/index.ts:633: * @standard ISA-95 §B.5 production-order-completion
src/types/events/index.ts:64: * @standard EN-16931:2017 BG-25 invoice-line
src/types/events/index.ts:655: * @standard IAS-2 §21 cost-formulas-variances
src/types/events/index.ts:679: * @standard IFRS-16 §44 §45(c) §46(a) lease-modification
src/types/events/index.ts:704: * @standard IFRS-15 §126 milestone-billing
src/types/events/index.ts:724: * @standard IFRS-15 §B14 §B18 cost-to-cost
src/types/events/index.ts:725: * @standard IFRS-15 §107 §108 contract-asset-contract-liability
src/types/events/index.ts:7: * @standard ISO-8601-1:2019 date-time event-timestamp
src/types/financial-statements/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/types/financial-statements/index.ts:6: * @standard ISO-8601-1:2019 date-time fiscal-period
src/types/gl-account/index.ts:5: * @standard ISO-4217:2015 currency-codes account-currency
src/types/multi-currency/index.ts:10: * @standard ISO-4217:2015 currency-codes
src/types/multi-currency/index.ts:11: * @standard ISO-8601-1:2019 date-time rate-date
src/types/parties/index.ts:10: * @standard ISO-8601-1:2019 date-time issue-date due-date
src/types/parties/index.ts:8: * @standard EN-16931:2017 invoice-and-credit-note
src/types/parties/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/types/payables/index.ts:10: * @standard US-IRS Form-1099 information-return
src/types/payables/index.ts:4: * @standard EN-16931:2017 §BG-4 seller
src/types/payables/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/types/payables/index.ts:6: * @standard ISO-8601-1:2019 date-time bill-date due-date
src/types/payables/index.ts:7: * @standard ISO-17442-1:2020 lei vendor-identification
src/types/period-end/index.ts:4: * @standard ISO-8601-1:2019 date-time period
src/types/receivables/index.ts:4: * @standard EN-16931:2017 §BG-7 buyer
src/types/receivables/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/types/receivables/index.ts:6: * @standard ISO-8601-1:2019 date-time invoice-date due-date
src/types/sti/index.ts:18: * @standard ECMA-262 ECMAScript-2024 baseline
src/types/tenant/index.ts:10: * @standard ISO-3166-1:2020 country-codes
src/types/tenant/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/types/tenant/index.ts:12: * @standard BCP-47 language-tag
src/types/tenant/index.ts:9: * @standard ISO-17442-1:2020 lei legal-entity-identifier
src/typography/index.ts:9: * @standard CommonMark + the vitepress markdown extensions
src/un/cefact/5305/index.ts:14: * @standard UN/CEFACT Trade Data Element 5305 duty-tax-fee-category-code
src/un/cefact/5305/index.ts:15: * @standard EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)
src/un/edifact/index.ts:4: * @standard UN-EDIFACT D.96A
src/un/edifact/index.ts:5: * @standard ISO-9735:2002 edifact-syntax-rules
src/un/edifact/types.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/un/edifact/types.test.ts:5: * @standard UN-EDIFACT D.96A
src/un/edifact/types.test.ts:6: * @standard ISO-9735:2002 edifact-syntax-rules
src/un/edifact/types.ts:108: * @standard UN-EDIFACT D.96A BGM beginning-of-message
src/un/edifact/types.ts:10: * @standard ISO-9735:2002 edifact-syntax-rules
src/un/edifact/types.ts:131: * @standard UN-EDIFACT D.96A DTM date-time-period
src/un/edifact/types.ts:146: * @standard UN-EDIFACT D.96A NAD name-and-address
src/un/edifact/types.ts:178: * @standard UN-EDIFACT D.96A LIN line-item
src/un/edifact/types.ts:193: * @standard UN-EDIFACT D.96A IMD item-description
src/un/edifact/types.ts:206: * @standard UN-EDIFACT D.96A QTY quantity
src/un/edifact/types.ts:223: * @standard UN-EDIFACT D.96A PRI price-details
src/un/edifact/types.ts:237: * @standard UN-EDIFACT D.96A MOA monetary-amount
src/un/edifact/types.ts:251: * @standard UN-EDIFACT D.96A TAX tax-duty-fee
src/un/edifact/types.ts:25: * @standard ISO-9735:2002 syntax-identifier
src/un/edifact/types.ts:265: * @standard UN-EDIFACT D.96A invoic-line
src/un/edifact/types.ts:279: * @standard UN-EDIFACT D.96A INVOIC invoice
src/un/edifact/types.ts:297: * @standard UN-EDIFACT D.96A DESADV despatch-advice
src/un/edifact/types.ts:316: * @standard UN-EDIFACT D.96A PAYMUL multiple-payment-order
src/un/edifact/types.ts:32: * @standard UN-EDIFACT message-types
src/un/edifact/types.ts:337: * @standard UN-EDIFACT D.96A interchange
src/un/edifact/types.ts:41: * @standard UN-EDIFACT D.96A UNB interchange-header
src/un/edifact/types.ts:61: * @standard UN-EDIFACT D.96A UNH message-header
src/un/edifact/types.ts:78: * @standard UN-EDIFACT D.96A UNT message-trailer
src/un/edifact/types.ts:91: * @standard UN-EDIFACT D.96A UNZ interchange-trailer
src/un/edifact/types.ts:9: * @standard UN-EDIFACT D.96A invoice-message
src/un/edifact/validate.ts:4: * @standard UN-EDIFACT D.96A
src/un/edifact/validate.ts:5: * @standard ISO-9735:2002 edifact-syntax-rules
src/update/fiscal/calendar/on/period/change/index.ts:21: * @standard GDPR:2016/679 (audit trail, access control)
src/update/fiscal/calendar/on/period/change/index.ts:22: * @standard SOX:2002 (change log, access control evidence)
src/update/fiscal/calendar/on/period/change/index.ts:23: * @standard Law 60 (immutable chain leaf)
src/update/fiscal/calendar/on/period/change/index.ts:24: * @standard Law 64 (error-uuid for federation replay)
src/users/access/create.ts:12: * @standard NIST INCITS-359-2012 role-based-access-control
src/users/access/read.ts:16: * @standard NIST INCITS-359-2012 role-based-access-control
src/users/access/updateAndDelete.ts:11: * @standard NIST INCITS-359-2012 role-based-access-control
src/users/endpoints/externalUsersLogin.ts:21: * @standard OWASP-ASVS V2.2 authentication-throttling
src/users/hooks/ensureUniqueUsername.ts:25: * @standard W3C HTML5 input-validation client-side
src/users/hooks/firstUserSuperAdmin.ts:17: * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
src/users/index.ts:229:     * @standard BCP-47 language-tag user-locale-preference
src/users/index.ts:230:     * @standard ECMA-402 internationalization-api
src/users/index.ts:55: * @standard BCP-47 language-tag user-locale
src/utility/aging-dry-keys.test.ts:15: * @standard ISO/IEC-29119:2022 software-testing
src/utility/aging-dry-keys.test.ts:16: * @standard ISO-8601-1:2019 date-time
src/utility/bank-reconciliation-report.test.ts:23: * @standard ISO/IEC-29119:2022 software-testing
src/utility/bank-reconciliation-report.test.ts:24: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/utility/calculations.ts:224: * @standard ISO-8601-1:2019 date-time days-between-arithmetic
src/utility/calculations.ts:7: * @standard ISO-4217:2015 currency-codes
src/utility/calculations.ts:8: * @standard IEEE-754-2019 binary-floating-point avoid-for-money
src/utility/depreciation-methods.test.ts:12: * @standard ISO/IEC-29119:2022 software-testing
src/utility/depreciation-methods.test.ts:13: * @standard ISO-4217:2015 currency-codes
src/utility/period-lock.ts:15: * @standard ISO-8601-1:2019 date-time utc-canonical-form
src/uuid/chain/index.ts:41: * @standard RFC 9562 §5.8 uuidv8
src/uuid/chain/index.ts:42: * @standard RFC 8785 JSON Canonicalization Scheme
src/uuid/chain/index.ts:43: * @standard NIST FIPS 180-4 SHA-256
src/uuid/chain/index.ts:44: * @standard ISO/IEC 23257-1 blockchain reference architecture
src/uuid/chain/index.ts:45: * @standard ITU-T Y.4810 DLT terminology
src/uuid/format/coverage.ts:17: * @standard ISO/IEC 27001 Annex A.18.2.3 technical compliance review
src/uuid/format/coverage.ts:18: * @standard NIST SP 800-53 CM-2 baseline configuration
src/uuid/format/index.ts:56: * @standard RFC 9562 §5.8 uuidv8 (custom formats)
src/uuid/format/index.ts:57: * @standard RFC 4122 §4.1.2 variant bits
src/uuid/format/index.ts:58: * @standard NIST FIPS 180-4 SHA-256 (the truncated digest source)
src/uuid/format/index.ts:59: * @standard ITU-T X.667 / ISO/IEC 9834-8 (uuid registration)
src/uuid/format/index.ts:84: * @standard RFC 9562 §5.9 Nil UUID
src/uuid/governance/index.ts:43: * @standard W3C DID Core 1.0
src/uuid/governance/index.ts:44: * @standard W3C Verifiable Credentials Data Model 2.0
src/uuid/governance/index.ts:45: * @standard ISO/IEC TR 23244 blockchain governance
src/uuid/governance/index.ts:46: * @standard eIDAS §6 electronic identification
src/uuid/kv/index.ts:52: * @standard RFC 9562 §5.8 uuidv8 (both sides)
src/uuid/kv/index.ts:53: * @standard RFC 8785 JCS (canonicalisation that makes equivalence hold)
src/uuid/kv/index.ts:54: * @standard NIST FIPS 180-4 SHA-256
src/uuid/llm/index.ts:21: * @standard RFC 9562 §5.8 (uuidv8 structured content-uuid — the decode source)
src/uuid/llm/index.ts:22: * @standard ITU-T X.667 (uuid ↔ 2.25 OID, via localize)
src/uuid/llm/index.ts:23: * @standard ISO-16:1975 a432 (the signal anchor — color+sound from position)
src/uuid/matrix/index.ts:38: * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant
src/uuid/matrix/matrix.generated.ts:10: * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + the horo digital-root ring
src/uuid/projection/index.ts:10: * @standard CSS Color 4 hsl() (the colour facet)
src/uuid/projection/index.ts:9: * @standard RFC 9562 §5.8 content-addressed uuidv8 (the identity the facets hang on)
src/uuid/share/index.ts:47: * @standard NIST SP 800-162 ABAC
src/uuid/share/index.ts:48: * @standard ISO/IEC 27001 Annex A.9.2.3 + A.9.4.1
src/uuid/share/index.ts:49: * @standard eIDAS §3 (sealed grants)
src/uuid/share/index.ts:50: * @standard GDPR Article 32(1)(b)
src/validate/address/index.ts:22: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/validate/address/index.ts:23: * @standard UPU-S42 international-postal-addressing
src/validate/address/index.ts:24: * @standard ISO-3166-1:2020 country-codes alpha-2 per-tenant-jurisdiction
src/validate/audit/compliance/reporting/index.ts:17: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/validate/audit/compliance/reporting/index.ts:18: * @standard OECD Transfer Pricing Guidelines:2022 Documentation
src/validate/audit/compliance/reporting/index.ts:19: * @standard IAS-1:2023 Presentation of Financial Statements
src/validate/audit/compliance/reporting/index.ts:20: * @standard GDPR Art. 32 Data Protection
src/validate/audit/compliance/reporting/index.ts:21: * @standard NIST SP 800-92 Computer Security Incident Handling
src/validate/closing/period/index.ts:14: * @standard IAS-34:2023 Period closing prerequisites
src/validate/closing/period/index.ts:15: * @standard SAF-T:3.0.2 Period coding determinism
src/validate/consolidation/readiness/index.ts:15: * @standard IAS-27:2023 Consolidated financial statements
src/validate/consolidation/readiness/index.ts:16: * @standard IFRS-10:2023 Consolidated financial statements (control definition)
src/validate/consolidation/readiness/index.ts:17: * @standard SAF-T:3.0.2 Multi-entity audit trail
src/validate/fiscal/period/posting/index.ts:23: * @standard IAS-34:2023 (period context for interim reporting)
src/validate/fiscal/period/posting/index.ts:24: * @standard Law 60 (chain leaf, immutable audit)
src/validate/fiscal/period/posting/index.ts:25: * @standard GDPR:2016/679 (access control, audit trail)
src/validate/fiscal/period/posting/index.ts:26: * @standard SOX:2002 (period-lock enforcement, access control)
src/validate/multi/currency/closing/index.ts:19: * @standard ISO-4217:2023 Currency codes + decimal places
src/validate/multi/currency/closing/index.ts:20: * @standard IFRS-21:2023 Translation of foreign operations
src/validate/multi/currency/closing/index.ts:21: * @standard IFRS-9:2023 Foreign exchange gains/losses
src/validate/multi/currency/closing/index.ts:22: * @standard SAF-T:3.0.2 Multi-currency period coding
src/validate/post/close/analytics/index.ts:17: * @standard IAS-34:2023 Interim Financial Reporting
src/validate/post/close/analytics/index.ts:18: * @standard IFRS-8:2023 Operating Segments
src/validate/post/close/analytics/index.ts:19: * @standard IAS-1:2023 Presentation of Financial Statements
src/validate/post/close/analytics/index.ts:20: * @standard COSO Internal Control Framework
src/validate/tax/period/closing/index.ts:16: * @standard IAS-12:2023 Income taxes
src/validate/tax/period/closing/index.ts:17: * @standard IFRS-16:2023 Leases (tax lease modifications)
src/validate/tax/period/closing/index.ts:18: * @standard OECD Transfer Pricing Guidelines:2022 Section D
src/validate/tax/period/closing/index.ts:19: * @standard BEPS Action 13:2021 Transfer Pricing Documentation
src/validate/tax/period/closing/index.ts:20: * @standard OECD Pillar Two:2023 Global Minimum Tax
src/validate/tax/period/closing/index.ts:21: * @standard SAF-T:3.0.2 Multi-entity audit trail
src/vendors/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/vendors/index.ts:12: * @standard ISO-3166-1:2020 country-codes via-addresses
src/vendors/index.ts:13: * @standard ISO-13616-1:2020 iban
src/vendors/index.ts:14: * @standard ISO-9362:2022 bic
src/vendors/index.ts:15: * @standard ISO-17442-1:2020 lei
src/vendors/index.ts:16: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/vendors/index.ts:17: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/vendors/index.ts:18: * @standard EN-16931:2017 §BG-4 seller
src/vendors/vendor/quotes/index.ts:10: * @standard ISO-8601-1:2019 date-time
src/vendors/vendor/quotes/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/vendors/vendor/quotes/index.ts:14: * @standard ISO 9001:2015 §8.4 control-of-externally-provided-processes
src/vendors/vendor/scorecards/index.ts:10: * @standard ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation
src/vendors/vendor/scorecards/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/vendors/vendor/scorecards/index.ts:9: * @standard ISO 9001:2015 §8.4 control-of-externally-provided-processes
src/verification/index.ts:13: * @standard RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)
src/version/index.ts:16: * @standard SemVer 2.0.0 — `MAJOR.MINOR.PATCH+<build-metadata>` (the corpus-uuid is build metadata)
src/versions/cross/index.ts:22: * @standard RFC 9562 §5.8 uuidv8 (the content-addressed version id)
src/versions/cross/index.ts:23: * @standard RFC 8785 JCS (deterministic content canonicalization)
src/vocabulary/index.ts:13: * @standard ISO 25964 / SKOS — a controlled vocabulary: terms from one shared scheme
src/vocabulary/test.ts:8: * @standard ISO 25964 / SKOS — controlled vocabulary
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:16: * @standard ISO-8601-1:2019 date-time as-of-date
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:18: * @standard ISO-8601-1:2019 date-time sale-date
src/warehouse/locations/consignment/arrangements/index.ts:16: * @standard EN-16931:2017 §BG-15 deliver-to-information
src/warehouse/locations/consignment/arrangements/index.ts:17: * @standard INCOTERMS 2020 (CPT / CIP / DDP control-transfer points)
src/warehouse/locations/consignment/arrangements/index.ts:18: * @standard ISO-3166-1:2020 country-codes
src/warehouse/locations/consignment/arrangements/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/warehouse/locations/index.ts:10: * @standard ISO-3166-2:2020 subdivision-codes location-region
src/warehouse/locations/index.ts:11: * @standard ISO-6346:2022 freight-container-coding-and-marking
src/warehouse/locations/index.ts:12: * @standard EN-16931:2017 §BG-15 deliver-to-information
src/warehouse/locations/index.ts:9: * @standard ISO-3166-1:2020 country-codes location-country
src/wave/index.ts:27: * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
src/wco/hs/index.ts:10: * @standard EU CN Code (Combined Nomenclature) Regulation (EEC) 2658/87
src/wco/hs/index.ts:11: * @standard US HTS (Harmonized Tariff Schedule)
src/wco/hs/index.ts:9: * @standard WCO Harmonised System Convention (effective 1988, latest revision 2022)
src/website/index.ts:25: * @standard W3C HTML5 § sectioning + WCAG 2.2 §1.4.3
src/website/index.ts:26: * @standard Schema.org Article + WebSite + SoftwareApplication
src/website/marketing-skills.ts:18: * @standard Schema.org WebPage + Article + SoftwareApplication
src/website/marketing-skills.ts:19: * @standard W3C HTML5 §4 sectioning + WCAG 2.2 §1.4.3 contrast
src/website/marketing-skills.ts:20: * @standard Open Graph protocol (Facebook 2010+) + Twitter Cards
src/website/seo-vortex.ts:27: * @standard Schema.org WebPage + Article + SoftwareApplication +
src/website/seo-vortex.ts:29: * @standard Open Graph protocol (Facebook 2010+) + Twitter Cards
src/website/seo-vortex.ts:30: * @standard W3C JSON-LD 1.1 + Microdata 1.1
src/website/seo-vortex.ts:31: * @standard Sitemap.xml protocol 0.9 (sitemaps.org) + Sitemap-Index
src/website/seo-vortex.ts:32: * @standard RFC 9694 robots.txt + REP (Robots Exclusion Protocol)
src/website/seo-vortex.ts:33: * @standard ISO/IEC 25010:2023 §5.3 usability — discoverability
src/website/shadcn-components.ts:26: * @standard shadcn/ui (Radix UI + Tailwind CSS)
src/website/shadcn-components.ts:27: * @standard W3C WAI-ARIA 1.2 + WCAG 2.2 AA
src/website/shadcn-components.ts:28: * @standard W3C Open Graph + Schema.org (carried by surrounding pages)
src/widget/AccountReconciliationsPanel.tsx:7: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/AuditLogWidget.tsx:7: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/BalanceSheetWidget.tsx:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/CostCentersPanel.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/DunningCyclesPanel.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/EmployeesPanel.tsx:7: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/IncomeStatementWidget.tsx:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/LeasePeriodPostingsPanel.tsx:14: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/LeasesPanel.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/PaymentRunsPanel.tsx:10: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/widget/PaymentRunsPanel.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/PaymentRunsPanel.tsx:9: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/widget/PayrollRunsPanel.tsx:8: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/QuickActionsWidget.tsx:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/widget/QuickActionsWidget.tsx:5: * @standard WCAG-2.1 §2.1 keyboard-accessible
src/widget/TrialBalanceWidget.tsx:4: * @standard ECMA-262 ECMAScript-2024 baseline
src/work/centers/index.ts:11: * @standard ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy
src/work/centers/index.ts:12: * @standard ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)
src/work/centers/index.ts:13: * @standard ISO-8601-1:2019 date-time
src/work/centers/operations/index.ts:10: * @standard ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
src/work/centers/operations/index.ts:11: * @standard ISO-22400-2:2014 manufacturing-operations KPIs
src/work/orders/index.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/work/orders/index.ts:64: * @standard ISA-95:2013 §B.5 production-operations-management work-order-execution
src/work/orders/index.ts:65: * @standard ISO-8601-1:2019 date-time started·completed·estimated
src/work/orders/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/work/phases/index.ts:23: * @standard ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
src/work/phases/index.ts:24: * @standard ISO-22400-2:2014 manufacturing-operations KPIs standard-time
src/work/shifts/index.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/work/shifts/index.ts:31: * @standard ISA-95:2013 / IEC-62264-1 §B.5 personnel + production-performance
src/work/shifts/index.ts:32: * @standard ISO-22400-2:2014 manufacturing-operations KPIs (labour efficiency / utilisation)
src/work/shifts/index.ts:33: * @standard ISO-8601-1:2019 date-time shift-start/finish/close
src/work/shifts/index.ts:34: * @standard ILO C001 hours-of-work presence-minutes
src/work/shifts/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/workflow/concatenate/index.ts:19: * @standard ISO/IEC 19510:2013 BPMN-2.0 — a free monoid over the workflow step
src/workflow/definitions/index.ts:15: * @standard ISO/IEC 19510:2013 BPMN-2.0
src/workflow/definitions/index.ts:16: * @standard ISO-8601-1:2019 date-time
src/workflow/definitions/seed.ts:14: * @standard OMG BPMN 2.0 business-process-model-and-notation
src/workflow/definitions/seed.ts:15: * @standard IFRS-15 revenue US-GAAP ASC-606 IAS-19 employee-benefits
src/workflow/definitions/seed.ts:16: * @standard EN-16931 e-invoicing ISO-20022 payments ISA-95 production
src/workflow/definitions/seed.ts:17: * @standard ISO-19011 audit ActivityPub social-federation
src/workflow/definitions/workflow/instances/index.ts:13: * @standard ISO/IEC 19510:2013 BPMN-2.0
src/workflow/definitions/workflow/instances/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/workflow/engine/index.ts:13: * @standard OMG BPMN 2.0 process-execution-semantics
src/workflow/index.ts:22: * @standard ISO/IEC 19510:2013 BPMN-2.0
src/xml/escape/index.ts:8: * @standard XML-1.0 §2.4 predefined-entities
tests/e2e/admin-evidence.e2e.spec.ts:25: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/admin-evidence.e2e.spec.ts:26: * @standard ISO/IEC-29119-3:2021 test-documentation
tests/e2e/admin-evidence.e2e.spec.ts:27: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/admin.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/admin.e2e.spec.ts:12: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/adminPayloadUiEmailLabels.ts:10: * @standard ECMA-402 internationalization-api
tests/e2e/adminPayloadUiEmailLabels.ts:7: * @standard ISO/IEC-29119:2022 software-testing test-fixture
tests/e2e/adminPayloadUiEmailLabels.ts:8: * @standard BCP-47 language-tag
tests/e2e/categories/admin-data.e2e.spec.ts:10: * @standard ISO/IEC-29119-3:2021 test-documentation
tests/e2e/categories/admin-data.e2e.spec.ts:9: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/categories/compliance-evidence.e2e.spec.ts:10: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/categories/compliance-evidence.e2e.spec.ts:11: * @standard OECD SAF-T 2.0 audit-file
tests/e2e/categories/cross-cutting.e2e.spec.ts:6: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/categories/public-content.e2e.spec.ts:10: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/categories/public-content.e2e.spec.ts:11: * @standard W3C HTML5 article-section-elements
tests/e2e/erp-workflows/bulk-import-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/consignment-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/crm-lead-to-cash.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/esg-reporting-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/facility-maintenance-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/h2r-hire-to-retire.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/ifrs16-lease-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/intercompany-consolidation.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/kyc-sanctions-review.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/manufacturing-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/multi-invoice-payment-allocation.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/multi-vendor-pr-split-award.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/notification-dispatch.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/o2c-goods.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/o2c-services-over-time.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/order-to-cash.e2e.spec.ts:16: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/order-to-cash.e2e.spec.ts:17: * @standard ISO/IEC-29119-3:2021 test-documentation
tests/e2e/erp-workflows/procure-to-pay.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/procure-to-pay.e2e.spec.ts:12: * @standard ISO/IEC-29119-3:2021 test-documentation
tests/e2e/erp-workflows/provision-lifecycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/record-to-report.e2e.spec.ts:12: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/record-to-report.e2e.spec.ts:13: * @standard OECD SAF-T 2.0 audit-file
tests/e2e/erp-workflows/resource-booking-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/subscription-billing-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/erp-workflows/workflow-approval-cycle.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/form.e2e.spec.ts:6: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/form.e2e.spec.ts:7: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/form.e2e.spec.ts:8: * @standard W3C HTML5 form-validation
tests/e2e/frontend.e2e.spec.ts:4: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/frontend.e2e.spec.ts:5: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/frontend.e2e.spec.ts:6: * @standard W3C HTML5 Living Standard
tests/e2e/frontend.e2e.spec.ts:8: * @standard BCP-47 language-tag locale-routing
tests/e2e/i18n.e2e.spec.ts:10: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/i18n.e2e.spec.ts:11: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/i18n.e2e.spec.ts:12: * @standard BCP-47 language-tag
tests/e2e/i18n.e2e.spec.ts:16: * @standard ECMA-402 internationalization-api
tests/e2e/i18n.e2e.spec.ts:17: * @standard Unicode-CLDR locale-data
tests/e2e/i18n.e2e.spec.ts:18: * @standard EU 1958/1 official-languages-of-the-european-union
tests/e2e/search.e2e.spec.ts:6: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/search.e2e.spec.ts:7: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/search.e2e.spec.ts:9: * @standard schema.org SearchAction
tests/e2e/standards/audit/saf-t-export-flow.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/audit/saf-t-export-flow.e2e.spec.ts:12: * @standard OECD SAF-T 2.0 audit-file
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:10: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/compliance/sox-404-evidence-trail.e2e.spec.ts:17: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:19: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:20: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:21: * @standard Peppol-BIS-3.0 billing
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:22: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/ifrs/industry-template-pick.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:16: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:17: * @standard ISO-3166-1:2020 BG country-code
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:18: * @standard ISO-13616-1:2020 iban BG-22
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:19: * @standard ISO-20022 camt.053 bank-to-customer-statement
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:20: * @standard PSD2 EU 2015/2366 ais-pis
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:21: * @standard Berlin Group NextGenPSD2 v1.3
tests/e2e/standards/iso-3166-1/default-country-bg.e2e.spec.ts:15: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/iso-3166-1/default-country-bg.e2e.spec.ts:16: * @standard ISO-3166-1:2020 BG country-code
tests/e2e/standards/iso-3166-1/default-country-bg.e2e.spec.ts:17: * @standard ISO-4217:2015 EUR reporting-currency
tests/e2e/tenant.e2e.spec.ts:10: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/tenant.e2e.spec.ts:9: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/helpers/evidence.ts:166: * @standard ISO/IEC-29119:2022 software-testing test-resilience
tests/helpers/evidence.ts:17: * @standard ISO/IEC-29119:2022 software-testing test-evidence
tests/helpers/evidence.ts:18: * @standard W3C WebDriver-BiDi browser-automation
tests/helpers/login.ts:4: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
tests/helpers/login.ts:5: * @standard W3C WebDriver-BiDi browser-automation
tests/helpers/mock-payload.ts:16: * @standard ISO/IEC-29119:2022 software-testing test-double
tests/helpers/payloadSdkRest.ts:4: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
tests/helpers/payloadSdkRest.ts:8: * @standard OpenAPI 3.1 api-description
tests/helpers/sdk.ts:10: * @standard OpenAPI 3.1 api-description
tests/helpers/sdk.ts:6: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
tests/helpers/seedTenant.ts:4: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
tests/helpers/seedTenant.ts:5: * @standard ISO-17442-1:2020 lei
tests/helpers/seedTenant.ts:6: * @standard ISO-3166-1:2020 country-codes
tests/helpers/seedTenant.ts:7: * @standard ISO-4217:2015 currency-codes
tests/helpers/seedUser.ts:4: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
tests/helpers/standards-fixtures.ts:22: * @standard ISO/IEC-29119:2022 software-testing test-fixture
tests/helpers/standards-fixtures.ts:23: * @standard ISO-20022 camt.053 bank-to-customer-statement
tests/helpers/standards-fixtures.ts:24: * @standard SAF-T-2.0 oecd audit-file
tests/helpers/standards-fixtures.ts:25: * @standard UN-EDIFACT D96A invoic
```

## @rfc

```text
src/allow/public/read/tenant/index.ts:8: * @rfc 9110 §13 caching
src/app/(api)/api/subscriptions/create/route.ts:4: * @rfc 9110 http-semantics
src/app/(api)/api/webhooks/stripe/route.ts:4: * @rfc 8615 well-known-uri webhook-discovery
src/app/(api)/api/webhooks/stripe/route.ts:5: * @rfc 9110 http-semantics
src/app/(api)/api/webhooks/stripe/route.ts:6: * @rfc 2104 hmac signature-verification
src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts:6: * @rfc 9110 http-semantics
src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts:7: * @rfc 9110 §13 caching
src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts:8: * @rfc 3986 uniform-resource-identifier
src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts:6: * @rfc 9110 http-semantics
src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts:7: * @rfc 9110 §13 caching
src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts:8: * @rfc 3986 uniform-resource-identifier
src/app/(frontend)/[locale]/[slug]/page.tsx:7: * @rfc 9110 §15.4 redirection-3xx (via PayloadRedirects)
src/app/(frontend)/[locale]/layout.tsx:6: * @rfc 5646 tags-for-identifying-languages
src/app/(frontend)/[locale]/layout.tsx:7: * @rfc 4647 matching-of-language-tags
src/app/(frontend)/[locale]/not-found.tsx:4: * @rfc 9110 §15.5.5 404-not-found
src/app/(frontend)/[locale]/posts/page.tsx:7: * @rfc 5005 web-feed-paging-and-archiving
src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx:5: * @rfc 5005 web-feed-paging-and-archiving
src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx:6: * @rfc 3986 uniform-resource-identifier page-number-segment
src/app/(frontend)/[locale]/search/page.tsx:6: * @rfc 3986 uniform-resource-identifier query-component
src/app/(frontend)/layout.tsx:10: * @rfc 9110 http-semantics
src/app/(frontend)/next/coherence/route.ts:30: * @rfc 9110 http-semantics  @rfc 8259 json
src/app/(frontend)/next/exit-preview/route.ts:4: * @rfc 9110 http-semantics
src/app/(frontend)/next/exit-preview/route.ts:5: * @rfc 6265 cookies draft-mode-cookie
src/app/(frontend)/next/preview/route.ts:5: * @rfc 9110 http-semantics
src/app/(frontend)/next/preview/route.ts:6: * @rfc 9110 §15.4 redirection-3xx
src/app/(frontend)/next/preview/route.ts:7: * @rfc 3986 uniform-resource-identifier
src/app/(frontend)/next/preview/route.ts:8: * @rfc 6265 cookies draft-mode-cookie
src/app/(frontend)/next/seed/route.ts:4: * @rfc 9110 http-semantics
src/app/(frontend)/next/system/health/route.ts:6: * @rfc 9110 http-semantics
src/app/(frontend)/next/system/health/route.ts:7: * @rfc 9110 §15.6.4 503-service-unavailable
src/app/(frontend)/not-found.tsx:4: * @rfc 9110 §15.5.5 404-not-found
src/app/(frontend)/tenant-domains/[tenant]/[...slug]/page.tsx:5: * @rfc 3986 uniform-resource-identifier
src/app/(frontend)/tenant-domains/[tenant]/[...slug]/page.tsx:6: * @rfc 9110 http-semantics
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:4: * @rfc 9110 http-semantics
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:5: * @rfc 7519 jwt session-token
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:6: * @rfc 6265 cookies
src/app/(frontend)/tenant-domains/[tenant]/page.tsx:4: * @rfc 3986 uniform-resource-identifier host-component
src/app/(frontend)/tenant-domains/layout.tsx:4: * @rfc 3986 uniform-resource-identifier host-component
src/app/(frontend)/tenant-domains/layout.tsx:5: * @rfc 9110 http-semantics host-header
src/app/(frontend)/tenant-slugs/[tenant]/[...slug]/page.tsx:5: * @rfc 3986 uniform-resource-identifier
src/app/(frontend)/tenant-slugs/[tenant]/[...slug]/page.tsx:6: * @rfc 9110 http-semantics
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:4: * @rfc 9110 http-semantics
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:5: * @rfc 7519 jwt session-token
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:6: * @rfc 6265 cookies
src/app/(frontend)/tenant-slugs/[tenant]/page.tsx:4: * @rfc 3986 uniform-resource-identifier path-component
src/app/(frontend)/tenant-slugs/layout.tsx:4: * @rfc 3986 uniform-resource-identifier path-component
src/app/(frontend)/tenant-slugs/layout.tsx:5: * @rfc 9110 http-semantics
src/app/my-route/route.ts:4: * @rfc 9110 http-semantics
src/app/my-route/route.ts:5: * @rfc 8259 json
src/audit/events/index.ts:44: * @rfc 5424 §6.2.1 syslog-severity-levels
src/bank/statement/import.service/index.ts:11: * @rfc 4180 csv
src/bcp/47/language-tag.test.ts:6: * @rfc 5646 tags-for-identifying-languages
src/bcp/47/language-tag.test.ts:7: * @rfc 4647 matching-of-language-tags
src/bcp/47/language-tag.ts:18: * @rfc 5646 §2.1 syntax
src/bcp/47/language-tag.ts:5: * @rfc 5646 tags-for-identifying-languages
src/bcp/47/language-tag.ts:6: * @rfc 4647 matching-of-language-tags
src/bcp/47/locale-utils.test.ts:6: * @rfc 5646 tags-for-identifying-languages
src/bcp/47/locale-utils.test.ts:7: * @rfc 4647 matching-of-language-tags
src/bcp/47/locale-utils.ts:6: * @rfc 5646 tags-for-identifying-languages
src/bcp/47/locale-utils.ts:7: * @rfc 4647 matching-of-language-tags
src/billing/stripeWebhookHandlers.test.ts:5: * @rfc 9110 http-semantics webhook-delivery
src/billing/stripeWebhookHandlers.test.ts:6: * @rfc 8615 well-known-uri webhook-discovery
src/billing/stripeWebhookHandlers.ts:15: * @rfc 9110 http-semantics webhook-receiver
src/billing/stripeWebhookHandlers.ts:16: * @rfc 8259 json payload-encoding
src/billing/stripeWebhookHandlers.ts:17: * @rfc 2104 hmac signature-verification
src/billing/stripeWebhookHandlers.ts:37: * @rfc 9110 http-semantics
src/billing/test.ts:5: * @rfc 9110 http-semantics webhook-delivery
src/billing/test.ts:6: * @rfc 8615 well-known-uri webhook-discovery
src/blocks/archive/block/config.ts:6: * @rfc 5005 web-feed-paging-and-archiving
src/blocks/archive/block/config.ts:7: * @rfc 3986 uniform-resource-identifier pagination-links
src/blocks/call/to/action/config.ts:6: * @rfc 3986 uniform-resource-identifier
src/blocks/form/Component.tsx:21: * @rfc 5322 internet-message-format email-field-validation
src/blocks/form/config.ts:6: * @rfc 5322 internet-message-format email-field-format
src/blocks/form/refactored-utilities.test.ts:6: * @rfc 3986 uniform-resource-identifier
src/blocks/form/refactored-utilities.test.ts:7: * @rfc 9110 http-semantics
src/blocks/media/block/config.ts:7: * @rfc 6838 mime-type
src/card/index.tsx:8: * @rfc 3986 uniform-resource-identifier
src/categories/index.ts:14: * @rfc 3986 uri slug-to-url
src/country/client/berlin-group-psd2.ts:15: * @rfc 6749 oauth-2.0
src/country/client/berlin-group-psd2.ts:16: * @rfc 7519 jwt
src/default/lexical/index.ts:6: * @rfc 3986 uniform-resource-identifier link-fields
src/ecommerce/configureEcommercePlugin/index.ts:11: * @rfc 9110 http-semantics
src/ecommerce/configureEcommercePlugin/index.ts:12: * @rfc 8615 well-known-uri webhook-discovery
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:11: * @rfc 9110 http-semantics
src/ecommerce/stripe/tenantConfirmOrder.ts:15: * @rfc 9110 http-semantics
src/ecommerce/stripe/tenantStripeWebhook.ts:7: * @rfc 9110 http-semantics webhook-delivery
src/ecommerce/stripe/tenantStripeWebhook.ts:8: * @rfc 8615 well-known-uri webhook-discovery
src/email/tenantAwareResendEmailAdapter/index.ts:18: * @rfc 5321 smtp envelope
src/email/tenantAwareResendEmailAdapter/index.ts:19: * @rfc 5322 internet-message-format header-fields
src/email/tenantAwareResendEmailAdapter/index.ts:20: * @rfc 6532 internationalized-email-addresses
src/email/tenantAwareResendEmailAdapter/index.ts:21: * @rfc 6376 dkim domain-keys-identified-mail (delivered via Resend)
src/email/tenantAwareResendEmailAdapter/index.ts:22: * @rfc 7208 spf sender-policy-framework (delivered via Resend)
src/email/tenantAwareResendEmailAdapter/index.ts:23: * @rfc 7489 dmarc (delivered via Resend)
src/emit/domain/event/index.ts:14: * @rfc 9562 uuid event-id
src/ensure/unique/slug/within/tenant/index.ts:16: * @rfc 3986 uniform-resource-identifier slug
src/erpax/api/surface/index.ts:10: * @rfc 3339 date-and-time-on-the-internet
src/erpax/api/surface/index.ts:9: * @rfc 3986 uri syntax-of-paths
src/error/codedError.ts:9: * @rfc 7807 problem-details-for-http-apis sister-type
src/error/errorCodes.ts:7: * @rfc 7807 problem-details-for-http-apis type-fragment
src/error/errorCodes.ts:8: * @rfc 9110 §15 status-codes
src/error/httpApiError.ts:4: * @rfc 7807 problem-details-for-http-apis
src/error/httpApiError.ts:5: * @rfc 9110 §15 status-codes
src/error/httpApiError.ts:6: * @rfc 8259 json
src/error/index.ts:10: * @rfc 9110 §10.3 error-responses
src/error/index.ts:8: * @rfc 7807 problem-details-for-http-apis
src/error/index.ts:9: * @rfc 9110 §15 status-codes
src/error/registry.ts:8: * @rfc 7807 problem-details-for-http-apis
src/error/registry.ts:9: * @rfc 9110 §15 status-codes
src/event/emitter.service/index.ts:9: * @rfc 9562 uuid event-id
src/export/standards.service.ts:26: * @rfc 6838 mime-type
src/fetch/remote/file/index.ts:10: * @rfc 9110 §15.4 redirection-3xx
src/fetch/remote/file/index.ts:11: * @rfc 3986 uri filename-extraction
src/fetch/remote/file/index.ts:12: * @rfc 6838 media-type-registration
src/fetch/remote/file/index.ts:9: * @rfc 9110 http-semantics
src/generate/meta/index.ts:8: * @rfc 3986 §5.3 reference-resolution
src/get/enabled/locales/for/tenant/index.ts:6: * @rfc 5646 tags-for-identifying-languages
src/get/me/user/index.ts:4: * @rfc 6265 cookies session-cookie
src/get/me/user/index.ts:5: * @rfc 7519 jwt session-token
src/get/me/user/index.ts:6: * @rfc 5322 internet-message-format email-field
src/get/media/url/index.ts:11: * @rfc 3986 §2.1 percent-encoding
src/get/media/url/index.ts:12: * @rfc 3986 §3.4 query-component
src/get/preview/secret/index.ts:6: * @rfc 5869 hkdf
src/get/tenant/from/request/index.ts:5: * @rfc 6265 http-state-management cookies
src/i18n/index.ts:10: * @rfc 8259 json
src/i18n/index.ts:8: * @rfc 5646 tags-for-identifying-languages
src/i18n/index.ts:9: * @rfc 4647 matching-of-language-tags
src/i18n/localization/index.ts:9: * @rfc 5646 tags-for-identifying-languages
src/i18n/request/index.ts:10: * @rfc 9110 http-semantics accept-language-fallback
src/i18n/request/index.ts:8: * @rfc 5646 tags-for-identifying-languages
src/i18n/routing/index.ts:8: * @rfc 3986 uniform-resource-identifier locale-path-segment
src/i18n/routing/index.ts:9: * @rfc 9110 http-semantics
src/invoices/hooks/encryptSensitiveFields.ts:9: * @rfc 5116 authenticated-encryption-with-associated-data
src/iso/19011/types.ts:147:   * @rfc 9110 §5.6 trace-context-correlation-id
src/iso/19011/types.ts:41: * @rfc 5424 §6.2.1 syslog-severity-levels
src/iso/19011/types.ts:76:   * @rfc 9110 §5.6 trace-context-correlation-id
src/link/Component.tsx:6: * @rfc 3986 uniform-resource-identifier
src/link/field.ts:4: * @rfc 3986 uniform-resource-identifier
src/link/group.ts:4: * @rfc 3986 uniform-resource-identifier
src/link/index.ts:7: * @rfc 3986 uniform-resource-identifier
src/live/preview/listener/index.tsx:6: * @rfc 6455 the-websocket-protocol
src/live/preview/listener/index.tsx:7: * @rfc 9110 http-semantics
src/media/Component.tsx:6: * @rfc 6838 mime-type
src/media/hooks/beforeChange.ts:6: * @rfc 6838 mime-type media-type
src/media/index.ts:17: * @rfc 6838 mime-type media-type
src/media/products/hooks/beforeChange.ts:10: * @rfc 6838 mime-type media-type
src/media/products/hooks/beforeChange.ts:9: * @rfc 3986 uri remote-media-source
src/media/products/index.ts:35: * @rfc 3986 uri slug-to-url
src/merge/open/graph/index.ts:6: * @rfc 3986 §5.3 reference-resolution
src/nist/sp/800/108/derive-secret.test.ts:8: * @rfc 2104 hmac
src/nist/sp/800/108/derive-secret.test.ts:9: * @rfc 5869 hkdf
src/nist/sp/800/108/kdf.ts:12: * @rfc 2104 hmac
src/nist/sp/800/108/kdf.ts:13: * @rfc 5869 hkdf hmac-based-key-derivation
src/nist/sp/800/38/aes-gcm.test.ts:7: * @rfc 5116 authenticated-encryption-with-associated-data
src/nist/sp/800/38/aes-gcm.ts:13: * @rfc 5116 authenticated-encryption-with-associated-data
src/pages/hooks/beforeChange.ts:10: * @rfc 3986 uri remote-media-source
src/pages/hooks/revalidatePage.ts:10: * @rfc 9110 §13 caching
src/pages/hooks/revalidatePage.ts:11: * @rfc 9111 http-caching
src/pages/index.ts:30: * @rfc 3986 uri slug-to-url
src/pagination/index.tsx:7: * @rfc 5005 web-feed-paging-and-archiving
src/pagination/index.tsx:8: * @rfc 3986 uniform-resource-identifier page-number-query
src/payload.config.api.test.ts:8: * @rfc 9110 http-semantics
src/payload.config.api.test.ts:9: * @rfc 7807 problem-details-for-http-apis
src/payload.config.sdk-rest.test.ts:6: * @rfc 9110 http-semantics
src/payload.config.sdk-rest.test.ts:7: * @rfc 7519 jwt session-token
src/payload.config.sdk-rest.test.ts:8: * @rfc 8259 json
src/payload/redirect/index.tsx:5: * @rfc 9110 §15.4 redirection-3xx
src/payload/redirect/index.tsx:6: * @rfc 9110 §15.4.2 301-moved-permanently
src/payload/redirect/index.tsx:7: * @rfc 9110 §15.4.3 302-found
src/payload/redirect/index.tsx:8: * @rfc 9110 §15.5.5 404-not-found
src/payload/redirect/index.tsx:9: * @rfc 3986 uniform-resource-identifier
src/payload/sdk/index.ts:6: * @rfc 3986 uri base-url-resolution
src/payload/sdk/index.ts:7: * @rfc 9110 http-semantics
src/payload/sdk/index.ts:8: * @rfc 6265 http-state-management cookies-credentials-include
src/payment/methods/hooks/encryptSensitiveFields.ts:9: * @rfc 5116 authenticated-encryption-with-associated-data
src/payment/methods/index.ts:23: * @rfc 5116 authenticated-encryption-with-associated-data
src/posts/hooks/beforeChange.ts:8: * @rfc 3986 uri remote-media-source
src/posts/hooks/revalidatePost.ts:10: * @rfc 9110 §13 caching
src/posts/hooks/revalidatePost.ts:11: * @rfc 9111 http-caching
src/posts/index.ts:37: * @rfc 3986 uri slug-to-url
src/remote/media/import/index.ts:5: * @rfc 3986 uniform-resource-identifier remote-source
src/remote/media/import/index.ts:6: * @rfc 6838 mime-type media-type
src/remote/media/import/index.ts:7: * @rfc 9110 http-semantics fetch
src/revalidate/redirect/index.ts:4: * @rfc 9110 §15.4 redirection-3xx
src/revalidate/redirect/index.ts:5: * @rfc 9110 §13 caching
src/revalidate/redirect/index.ts:6: * @rfc 9111 http-caching
src/rfc/3986/generate-preview-path.test.ts:5: * @rfc 3986 uniform-resource-identifier
src/rfc/3986/generate-preview-path.ts:4: * @rfc 3986 uniform-resource-identifier preview-path
src/rfc/3986/get-url.test.ts:5: * @rfc 3986 uniform-resource-identifier
src/rfc/3986/get-url.test.ts:6: * @rfc 9110 http-semantics host-header forwarded-host
src/rfc/3986/get-url.test.ts:7: * @rfc 7239 forwarded
src/rfc/3986/get-url.ts:24: * @rfc 7239 forwarded x-forwarded-host x-forwarded-proto
src/rfc/3986/get-url.ts:4: * @rfc 3986 uniform-resource-identifier
src/rfc/3986/get-url.ts:5: * @rfc 9110 http-semantics host-header
src/rfc/3986/get-url.ts:6: * @rfc 7239 forwarded http-extension
src/rfc/3986/index.ts:4: * @rfc 3986 uniform-resource-identifier
src/rfc/3986/url-utils.test.ts:5: * @rfc 3986 uniform-resource-identifier
src/rfc/3986/url-utils.ts:4: * @rfc 3986 uniform-resource-identifier
src/rfc/6585/index.ts:4: * @rfc 6585 §4 too-many-requests-429
src/rfc/6585/rate-limit.test.ts:5: * @rfc 6585 §4 too-many-requests-429
src/rfc/6585/rate-limit.test.ts:6: * @rfc 9110 §15.5.29 too-many-requests-429
src/rfc/6585/rate-limit.test.ts:7: * @rfc 9110 §10.2.4 retry-after-header
src/rfc/6585/rate-limit.ts:41: * @rfc 6585 §4 enforcement
src/rfc/6585/rate-limit.ts:7: * @rfc 6585 §4 too-many-requests-429
src/rfc/6585/rate-limit.ts:8: * @rfc 9110 §15.5.29 too-many-requests-429 superseding-spec
src/rfc/6585/rate-limit.ts:90: * @rfc 9110 §10.2.4 retry-after-header
src/rfc/6585/rate-limit.ts:9: * @rfc 9110 http-semantics
src/rfc/9110/cache.test.ts:5: * @rfc 9110 §13 caching
src/rfc/9110/cache.test.ts:6: * @rfc 9111 http-caching
src/rfc/9110/cache.ts:5: * @rfc 9110 §13 caching
src/rfc/9110/cache.ts:6: * @rfc 9111 http-caching
src/rfc/9110/cache.ts:7: * @rfc 7234 http-1.1-caching obsolete-but-cited
src/rfc/9110/get-document.test.ts:5: * @rfc 9110 §13 caching
src/rfc/9110/get-document.ts:4: * @rfc 9110 §13 caching
src/rfc/9110/get-document.ts:5: * @rfc 9111 http-caching
src/rfc/9110/get-globals.test.ts:5: * @rfc 9110 §13 caching
src/rfc/9110/get-globals.ts:4: * @rfc 9110 §13 caching
src/rfc/9110/get-globals.ts:5: * @rfc 9111 http-caching
src/rfc/9110/get-redirects.test.ts:5: * @rfc 9110 §15.4 redirection-3xx
src/rfc/9110/get-redirects.test.ts:6: * @rfc 9110 §15.4.2 301-moved-permanently
src/rfc/9110/get-redirects.test.ts:7: * @rfc 9110 §15.4.3 302-found
src/rfc/9110/get-redirects.ts:4: * @rfc 9110 §13 caching
src/rfc/9110/get-redirects.ts:5: * @rfc 9110 §15.4 redirection-3xx
src/rfc/9110/index.ts:4: * @rfc 9110 §13 caching
src/sale/audit-file.ts:20: * @rfc 8259 json
src/sdk/accounting-client/index.ts:5: * @rfc 9110 http-semantics REST-client
src/sdk/accounting-client/index.ts:6: * @rfc 8259 json payload-encoding
src/sdk/accounting-client/index.ts:7: * @rfc 7519 json-web-token bearer-auth
src/security/header/headers.test.ts:5: * @rfc 6797 hsts http-strict-transport-security
src/security/header/headers.ts:8: * @rfc 6797 hsts http-strict-transport-security
src/security/header/headers.ts:9: * @rfc 9110 http-semantics
src/security/header/index.ts:4: * @rfc 6797 hsts
src/seed/index.ts:7: * @rfc 9110 http-semantics seed-endpoint
src/seeding/seedSubscriptionPlans.ts:9: * @rfc 3986 uri syntax-of-slug
src/shareds/documentPreviewAdmin.ts:14: * @rfc 3986 uri preview-url-construction
src/spec/generator/extractor.ts:18: *   @rfc           <id> [free-text]             ← body inferred as 'RFC'
src/spec/generator/i18n-audit.ts:14: * @rfc 8259 json
src/spec/generator/i18n-keys.ts:33: * @rfc 8259 json
src/spec/generator/i18n-stub-filler.ts:11: * @rfc 8259 json
src/standards/catalogue.test.ts:9: * @rfc 9562 content-uuid (every standard is content-addressed)
src/standards/catalogue.ts:13: * @rfc 9562 content-uuid (each standard row is content-addressed)
src/subscription/plans/subscriptions/hooks/encryptSensitiveFields.ts:9: * @rfc 5116 authenticated-encryption-with-associated-data
src/tenant.service/index.ts:15: * @rfc 9110 http-semantics
src/testing/config-discovery-advanced.test.ts:6: * @rfc 8259 json
src/testing/config-discovery-types/index.ts:6: * @rfc 8259 json
src/testing/config-discovery.test.ts:6: * @rfc 8259 json
src/testing/config-discovery/index.ts:9: * @rfc 8259 json
src/testing/index.ts:12: * @rfc 8259 json
src/transaction/failures/index.ts:13: * @rfc 7807 problem-details-for-http-apis status-code
src/types/events/index.ts:6: * @rfc 9562 uuid event-id
src/users/endpoints/externalUsersLogin.ts:17: * @rfc 9110 http-semantics
src/users/endpoints/externalUsersLogin.ts:18: * @rfc 7519 jwt session-payload
src/users/endpoints/externalUsersLogin.ts:19: * @rfc 6265 http-state-management cookies
src/users/endpoints/externalUsersLogin.ts:20: * @rfc 6585 §4 too-many-requests rate-limiting
src/users/hooks/setCookieBasedOnDomain.ts:20: * @rfc 6265 http-state-management cookies
src/users/hooks/setCookieBasedOnDomain.ts:21: * @rfc 6265bis cookie-domain-attribute
src/users/hooks/setCookieBasedOnDomain.ts:22: * @rfc 9110 http-semantics host-header
src/users/index.ts:52: * @rfc 5322 internet-message-format email
src/users/index.ts:53: * @rfc 5321 smtp envelope
src/users/index.ts:54: * @rfc 6532 internationalized-email-addresses
tests/e2e/admin.e2e.spec.ts:13: * @rfc 6265 cookies session
tests/e2e/admin.e2e.spec.ts:14: * @rfc 7519 jwt session-token
tests/e2e/adminPayloadUiEmailLabels.ts:9: * @rfc 5646 tags-for-identifying-languages
tests/e2e/form.e2e.spec.ts:9: * @rfc 5322 internet-message-format email-field
tests/e2e/i18n.e2e.spec.ts:13: * @rfc 5646 tags-for-identifying-languages
tests/e2e/i18n.e2e.spec.ts:14: * @rfc 4647 matching-of-language-tags
tests/e2e/i18n.e2e.spec.ts:15: * @rfc 9110 http-semantics accept-language
tests/e2e/search.e2e.spec.ts:8: * @rfc 3986 uniform-resource-identifier search-query-parameter
tests/helpers/login.ts:6: * @rfc 6265 cookies session
tests/helpers/login.ts:7: * @rfc 7519 jwt session-token
tests/helpers/payloadSdkRest.ts:5: * @rfc 9110 http-semantics
tests/helpers/payloadSdkRest.ts:6: * @rfc 8259 json
tests/helpers/payloadSdkRest.ts:7: * @rfc 7519 jwt session-token
tests/helpers/sdk.ts:7: * @rfc 9110 http-semantics
tests/helpers/sdk.ts:8: * @rfc 8259 json
tests/helpers/sdk.ts:9: * @rfc 7519 jwt session-token
tests/helpers/seedUser.ts:5: * @rfc 5322 internet-message-format email-fixture
```

## @compliance

```text
Binary file src/anti/corruption/cross-entity.ts matches
src/accounting/debit-credit.ts:15: * @compliance SOX §404 internal-controls
src/accounting/reports.service.ts:27: * @compliance SOX §302 disclosure-controls
src/activities/index.ts:10: * @compliance GDPR Art.5(1)(c) data-minimisation
src/activities/index.ts:11: * @compliance GDPR Art.30 records-of-processing-activities
src/address/validation/index.ts:19: * @compliance GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires
src/admin/TenantManagement.tsx:7: * @compliance SOC-2 CC6.1 logical-access-controls
src/admin/bar/index.tsx:8: * @compliance WCAG-2.1 §2.4.1 bypass-blocks
src/agents/mcp/tool/versions.ts:24: * @compliance SOX §404 internal-controls record-retention
src/ai/ai-security.ts:23: * @compliance GDPR Art.5(1)(c) data-minimisation
src/ai/ai-security.ts:24: * @compliance EU AI Act 2024 Art.13 transparency
src/ai/anomaly-detection.ts:13: * @compliance SOX §404 internal-controls journal-entry-control TOM-JE-01
src/ai/anomaly-detection.ts:14: * @compliance ISO 27002 §8.16 monitoring-activities
src/ai/anomaly-detection.ts:15: * @compliance EU AI Act 2024 limited-risk
src/ai/audit-summarisation.ts:12: * @compliance SOX §404 internal-controls walk-through-narration
src/ai/audit-summarisation.ts:13: * @compliance EU AI Act 2024 limited-risk
src/ai/bank-matching.ts:15: * @compliance EU AI Act 2024 limited-risk
src/ai/cloudflare-ai.ts:47: * @compliance GDPR Art.5(1)(c) data-minimisation
src/ai/cloudflare-ai.ts:48: * @compliance GDPR Art.22 automated-individual-decision-making
src/ai/cloudflare-ai.ts:49: * @compliance GDPR Art.22(3) right-to-human-intervention
src/ai/cloudflare-ai.ts:50: * @compliance EU AI Act 2024 transparency-and-risk-classification
src/ai/cloudflare-ai.ts:51: * @compliance SOX §404 internal-controls ai-assisted-decision
src/ai/document-classification.ts:11: * @compliance EU AI Act 2024 minimal-risk
src/ai/durable-objects.ts:19: * @compliance SOX §404 internal-controls atomic-state
src/ai/embed-document.ts:14: * @compliance EU AI Act 2024 minimal-risk
src/ai/hs-code-suggestion.ts:10: * @compliance EU UCC §6 customs-declaration
src/ai/hs-code-suggestion.ts:11: * @compliance EU AI Act 2024 limited-risk
src/ai/index.ts:10: * @compliance GDPR Art.22(3) right-to-human-intervention
src/ai/index.ts:11: * @compliance EU AI Act 2024 transparency-and-risk-classification
src/ai/invoice-ocr.ts:13: * @compliance GDPR Art.5(1)(c) data-minimisation
src/ai/invoice-ocr.ts:14: * @compliance GDPR Art.22(3) right-to-human-intervention
src/ai/invoice-ocr.ts:15: * @compliance EU AI Act 2024 limited-risk-transparency
src/ai/models/index.ts:19: * @compliance GDPR data-residency (`euHostable` — EU PoPs for EU tenants)
src/ai/models/index.ts:21: * @compliance SOX §404 internal-controls
src/ai/models/service.ts:21: * @compliance GDPR data-residency (Cloudflare EU PoPs for EU tenants)
src/ai/sanctions-screening.ts:16: * @compliance EU CFSP consolidated-sanctions-list
src/ai/sanctions-screening.ts:17: * @compliance EU AMLD5 §13(1)(d)
src/ai/sanctions-screening.ts:18: * @compliance EU AI Act 2024 Annex III high-risk
src/ai/sanctions-screening.ts:19: * @compliance GDPR Art.22 automated-individual-decision-making
src/ai/sanctions-screening.ts:20: * @compliance GDPR Art.22(3) right-to-human-intervention
src/ai/semantic-search.ts:13: * @compliance EU AI Act 2024 minimal-risk
src/ai/suggestions/index.ts:22: * @compliance GDPR Art.22 automated-individual-decision-making
src/ai/suggestions/index.ts:23: * @compliance GDPR Art.22(3) right-to-human-intervention
src/ai/suggestions/index.ts:24: * @compliance EU AI Act 2024 risk-classification + transparency
src/ai/suggestions/index.ts:25: * @compliance SOX §404 internal-controls ai-assisted-decision TOM-AI-01
src/ai/tax-classification.ts:12: * @compliance EU AI Act 2024 limited-risk
src/allow/public/read/tenant/index.ts:9: * @compliance GDPR Art.5(1)(c) data-minimization
src/anti/corruption/index.ts:23: * @compliance SOX §404 segregation-of-duties internal-controls
src/api/audit/events/index.ts:25: * @compliance SOX §404 internal-controls external-system-traceability
src/api/audit/events/index.ts:26: * @compliance EU 910/2014 eidas signature-evidence
src/app/(api)/api/subscriptions/create/route.ts:10: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/app/(api)/api/subscriptions/create/route.ts:9: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/app/(api)/api/webhooks/stripe/route.ts:8: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/app/(api)/api/webhooks/stripe/route.ts:9: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/app/(frontend)/[locale]/[slug]/page.tsx:8: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/[locale]/layout.tsx:11: * @compliance WCAG-2.1 §3.1.1 language-of-page
src/app/(frontend)/[locale]/layout.tsx:12: * @compliance WCAG-2.1 §3.1.2 language-of-parts
src/app/(frontend)/[locale]/not-found.tsx:7: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:9: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/[locale]/posts/page.tsx:8: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx:7: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/app/(frontend)/[locale]/products/[slug]/page.tsx:8: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe
src/app/(frontend)/[locale]/products/[slug]/page.tsx:9: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/[locale]/products/page.tsx:8: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/[locale]/search/page.tsx:7: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/layout.tsx:8: * @compliance WCAG-2.1 §1.4.3 contrast-minimum
src/app/(frontend)/layout.tsx:9: * @compliance WCAG-2.1 §3.1.1 language-of-page
src/app/(frontend)/next/system/health/route.ts:9: * @compliance SOC-2 CC7.2 system-monitoring
src/app/(frontend)/not-found.tsx:6: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/tenant-domains/[tenant]/[...slug]/page.tsx:8: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:10: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/tenant-slugs/[tenant]/[...slug]/page.tsx:8: * @compliance WCAG-2.1 level-AA
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:10: * @compliance WCAG-2.1 level-AA
src/architecture/invariant/checks.ts:145: * @compliance Venice Commission Rule of Law
src/architecture/invariant/checks.ts:1592: * @compliance SOX §404 (Byzantine tamper detection)
src/architecture/invariant/checks.ts:1648: * @compliance SOX §404 referential integrity
src/architecture/invariant/onInit.ts:19: * @compliance SOX §404 internal-controls boot-time-verification
src/architecture/invariant/types.ts:29: * @compliance SOX §404 internal-controls invariants
src/audit/events/index.ts:45: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/audit/events/index.ts:46: * @compliance SOX §302 disclosure-controls
src/audit/events/index.ts:47: * @compliance SOX §404 internal-controls evidence-preservation
src/audit/events/index.ts:48: * @compliance GDPR Art.30 records-of-processing-activities
src/audit/submissions/index.ts:16: * @compliance SOX §404 internal-controls
src/audit/trail/after/change/index.ts:23: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/audit/trail/after/change/index.ts:24: * @compliance SOX §404 internal-controls evidence-preservation
src/auth/index.ts:12: * @compliance SOC-2 CC6.1 logical-access-controls
src/authenticated/index.ts:7: * @compliance SOC-2 CC6.1 logical-access-controls
src/auto/populate/created/by/index.ts:8: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/auto/populate/created/by/index.ts:9: * @compliance SOX §404 internal-controls
src/auto/populate/tenant/index.ts:12: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/auto/set/timestamp/index.ts:9: * @compliance SOX §404 internal-controls verifiable-event-time
src/bank/accounts/bank/reconciliations/index.ts:20: * @compliance SOX §404 internal-controls TOM-CSH-01 cash-balance-proof
src/bank/accounts/bank/transactions/index.ts:46: * @compliance SOX §404 internal-controls bank-reconciliation
src/bank/accounts/index.ts:14: * @compliance SOX §404 internal-controls cash-management
src/bank/accounts/payment/runs/index.ts:30: * @compliance SOX §404 internal-controls preparer-authoriser-segregation
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:33: * @compliance SOX §404 internal-controls
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:48: * @compliance SOX §302 disclosure-controls
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:49: * @compliance SOX §404 internal-controls four-eyes
src/bank/accounts/payroll/runs/index.ts:28: * @compliance SOX §302 disclosure-controls
src/bank/accounts/payroll/runs/index.ts:29: * @compliance SOX §404 internal-controls four-eyes
src/bank/accounts/payroll/runs/index.ts:30: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/bank/accounts/payroll/runs/index.ts:31: * @compliance GDPR Art.30 records-of-processing-activities
src/bank/reconciliation.service/index.ts:485:   * @compliance SOX §404 internal-controls
src/bank/reconciliation.service/index.ts:651:   * @compliance SOX §404 internal-controls bank-reconciliation
src/before/dashboard/index.tsx:7: * @compliance WCAG-2.1 §1.4.3 contrast-minimum
src/before/login/index.tsx:8: * @compliance WCAG-2.1 §3.3.1 error-identification
src/beyond/erasure/index.ts:30: * @compliance GDPR Art. 17 right-to-erasure (irrevocable via key destruction)
src/billing/stripeWebhookHandlers.test.ts:10: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data tokenized
src/billing/stripeWebhookHandlers.ts:23: * @compliance SOC-2 CC7.2 system-monitoring-event-logging
src/billing/stripeWebhookHandlers.ts:434: * @compliance SOX §404 internal-controls refund-control
src/billing/test.ts:10: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data tokenized
src/biological/assets/index.ts:22: * @compliance SOX §404 internal-controls TOM-AGRI-01
src/blocks/banner/config.ts:6: * @compliance WCAG-2.1 §1.4.3 contrast-minimum
src/blocks/banner/config.ts:7: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/blocks/call/to/action/config.ts:7: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/blocks/call/to/action/config.ts:8: * @compliance WCAG-2.1 §2.4.6 headings-and-labels
src/blocks/code/config.ts:7: * @compliance WCAG-2.1 §1.4.10 reflow horizontal-scroll
src/blocks/content/config.ts:7: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/blocks/content/config.ts:8: * @compliance WCAG-2.1 §1.4.10 reflow
src/blocks/form/config.ts:10: * @compliance GDPR Art.6(1)(a) consent
src/blocks/form/config.ts:7: * @compliance WCAG-2.1 §1.3.5 identify-input-purpose
src/blocks/form/config.ts:8: * @compliance WCAG-2.1 §3.3.1 error-identification
src/blocks/form/config.ts:9: * @compliance WCAG-2.1 §3.3.2 labels-or-instructions
src/blocks/media/block/config.ts:10: * @compliance WCAG-2.1 §1.1.1 non-text-content alt-text
src/blocks/media/block/config.ts:11: * @compliance WCAG-2.1 §1.2.5 audio-description
src/bookable/resources/bookings/index.ts:22: * @compliance SOX §404 internal-controls revenue-completeness TOM-RES-01
src/bookable/resources/bookings/index.ts:23: * @compliance GDPR Art.6(1)(b) lawful-basis-contract guest-data
src/bookable/resources/index.ts:18: * @compliance SOX §404 internal-controls revenue-completeness
src/budget/plannings/index.ts:33: * @compliance SOX §404 internal-controls budget-approval-workflow
src/bulk/op/index.ts:17: * @compliance SOX §404 internal-controls bulk-import-completeness
src/business/chain/run-chain.ts:12: * @compliance SOX §404 internal-controls process-evidence
src/business/chain/types.ts:22: * @compliance SOX §404 internal-controls process-evidence
src/capture/media/index.ts:26: * @compliance WCAG-2.1 §1.2.2 captions-prerecorded
src/capture/media/index.ts:27: * @compliance WCAG-2.1 §1.2.5 audio-description-prerecorded
src/card/index.tsx:10: * @compliance WCAG-2.1 §2.5.5 target-size
src/card/index.tsx:9: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/carriers/index.ts:16: * @compliance SOX §404 internal-controls carrier-master TOM-LOG-01
src/chain/event/emitter/index.ts:15: * @compliance SOX §404 internal-controls process-evidence
src/collection/archive/index.tsx:7: * @compliance WCAG-2.1 §2.4.1 bypass-blocks
src/commitments/and/contingencies/index.ts:23: * @compliance SOX §404 internal-controls disclosure-completeness
src/commitments/index.ts:30: * @compliance GDPR Art.6(1)(b) lawful-basis-contract-processing
src/compliance/frameworks/compliance/requirements/compliance/gaps/index.ts:6: * @compliance SOX §404 deficiency
src/compliance/frameworks/compliance/requirements/index.ts:5: * @compliance SOX §404 control-objective
src/config/address-formats/index.ts:28: * @compliance GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires
src/config/appCollections/index.ts:9: * @compliance SOX §404 internal-controls config-as-code
src/config/country-apis/index.ts:23: * @compliance EU 2014/55 b2g-e-invoicing portals
src/config/country-apis/index.ts:24: * @compliance AMLD-5 ubo-registry-access
src/config/country-specifics/index.ts:20: * @compliance EU 2014/55 b2g-e-invoicing
src/config/types/index.ts:11: * @compliance GDPR Art.4(7) data-controller
src/connections/index.ts:26: * @compliance GDPR Art 17 right-to-erasure Art 21 right-to-object (mute/block)
src/consent/records/index.ts:10: * @compliance GDPR Art.7 conditions-for-consent
src/consent/records/index.ts:11: * @compliance GDPR Art.7(3) right-to-withdraw-consent
src/consent/records/index.ts:12: * @compliance ISO-27701:2019 §6.3.1.4 record-of-consent
src/consent/records/index.ts:9: * @compliance GDPR Art.6(1)(a) lawful-basis-consent
src/consolidation/eliminations/index.ts:19: * @compliance SOX §404 internal-controls consolidation-control TOM-CON-01
src/constitution/index.ts:14: * @compliance Venice Commission Rule of Law (entrenched fundamental guarantees)
src/cost/centers/index.ts:20: * @compliance SOX §302 disclosure-controls segment-disclosure
src/cost/centers/job/positions/recruiting/pipelines/index.ts:10: * @compliance GDPR Art.6(1)(b) recruitment-lawful-basis
src/cost/centers/job/positions/recruiting/pipelines/index.ts:11: * @compliance GDPR Art.5(1)(e) storage-limitation
src/cost/centers/job/positions/recruiting/pipelines/index.ts:12: * @compliance EU Equal Treatment Directive 2000/78
src/cost/centers/job/positions/recruiting/pipelines/index.ts:13: * @compliance ADA / EEOC US-equal-opportunity
src/cost/centers/purchase/requisitions/index.ts:13: * @compliance SOX §404 internal-controls four-eyes
src/country/api/client/index.ts:516: * @compliance EU 2006/112/EC vat-system-directive Art.214
src/country/api/client/index.ts:548: * @compliance AMLD-5 ubo-screening
src/country/api/client/index.ts:549: * @compliance EU 2580/2001 cfsp-restrictive-measures
src/country/api/client/index.ts:581: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/country/client/berlin-group-psd2.ts:20: * @compliance EU 2015/2366 strong-customer-authentication
src/country/client/bg-bank-statement-pdf.ts:34: * @compliance SOX §404 internal-controls fx-revaluation-evidence
src/country/client/bg-holidays.ts:18: * @compliance Кодекс на труда чл.154 official-holidays
src/country/client/bg-hybrid-invoice.ts:20: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/country/client/bg-nap-mtls.ts:123: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/country/client/bg-nap-mtls.ts:18: * @compliance EU 910/2014 eidas qualified-electronic-seal
src/country/client/bg-nap-mtls.ts:19: * @compliance SOX §404 internal-controls process-walk-through
src/country/client/bg-pades-signer.ts:26: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/country/client/bg-pades-signer.ts:94: * @compliance EU 910/2014 eidas Art.28 qualified-seal evidence
src/country/client/bg-vat.ts:17: * @compliance EU 2006/112/EC vat-system-directive
src/country/client/sign-cms-node.ts:23: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/country/context/index.ts:30: * @compliance EU 2014/55 b2g-e-invoicing-mandate-resolution
src/csrd/disclosures/index.ts:23: * @compliance EU SFDR 2019/2088 sustainable-finance
src/csrd/disclosures/index.ts:24: * @compliance EU Taxonomy Regulation 2020/852
src/csrd/disclosures/index.ts:25: * @compliance OECD GRI Standards
src/customers/contracts/contract/amendments/index.ts:28: * @compliance SOX §302 management-certification contract-approvals
src/customers/contracts/contract/amendments/index.ts:29: * @compliance GDPR Art.6(1)(b) lawful-basis-contract-modification
src/customers/contracts/contract/performances/index.ts:30: * @compliance SOX §404 internal-controls revenue-completeness TOM-AR-04
src/customers/contracts/contract/signatures/index.ts:26: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/customers/contracts/index.ts:34: * @compliance SOX §404 internal-controls contract-approval
src/customers/contracts/index.ts:35: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/customers/contracts/performance/obligations/index.ts:30: * @compliance SOX §404 internal-controls revenue-recognition
src/customers/index.ts:17: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/customers/index.ts:18: * @compliance GDPR Art.5 data-minimization
src/customers/kyc/checks/index.ts:6: * @compliance EU-AMLD-6 Directive-2018/1673 anti-money-laundering
src/customers/kyc/checks/index.ts:7: * @compliance USA-PATRIOT-Act §326 customer-identification-program
src/customers/kyc/checks/index.ts:8: * @compliance EU-Regulation-2015/847 wire-transfers
src/customers/projects/index.ts:27: * @compliance SOX §404 internal-controls
src/customers/projects/wip/snapshots/index.ts:21: * @compliance SOX §404 internal-controls revenue-recognition
src/customers/quotes/index.ts:13: * @compliance SOX §404 internal-controls quote-approval
src/customers/sales/orders/index.ts:34: * @compliance EU-VAT-Directive 2006/112/EC supply-of-goods-or-services
src/customers/sales/orders/returns/index.ts:10: * @compliance SOX §404 internal-controls return-approval
src/customers/sales/orders/shipments/customs/declarations/index.ts:18: * @compliance EU UCC §6 customs-declaration
src/customers/sales/orders/shipments/customs/declarations/index.ts:19: * @compliance OECD BEPS Action 13 transfer-pricing-documentation
src/customers/sales/orders/shipments/index.ts:8: * @compliance SOX §404 internal-controls dispatch-controls
src/customers/sales/orders/shipments/tracking/events/index.ts:17: * @compliance SOX §404 internal-controls delivery-evidence TOM-LOG-02
src/data/processing/activities/index.ts:10: * @compliance GDPR Art.30(2) records-processor
src/data/processing/activities/index.ts:11: * @compliance GDPR Art.5(1)(e) storage-limitation
src/data/processing/activities/index.ts:12: * @compliance ISO-27701:2019 §6.3.1 records-of-processing
src/data/processing/activities/index.ts:9: * @compliance GDPR Art.30(1) records-controller
src/data/subject/requests/index.ts:10: * @compliance GDPR Art.16 right-to-rectification
src/data/subject/requests/index.ts:11: * @compliance GDPR Art.17 right-to-erasure
src/data/subject/requests/index.ts:12: * @compliance GDPR Art.18 right-to-restriction
src/data/subject/requests/index.ts:13: * @compliance GDPR Art.20 right-to-data-portability
src/data/subject/requests/index.ts:14: * @compliance GDPR Art.21 right-to-object
src/data/subject/requests/index.ts:15: * @compliance GDPR Art.12(3) one-month-response-deadline
src/data/subject/requests/index.ts:9: * @compliance GDPR Art.15 right-of-access
src/default/lexical/index.ts:8: * @compliance WCAG-2.1 level-AA accessibility
src/depreciation.service/index.ts:28: * @compliance SOX §404 internal-controls capital-asset-register
src/ecommerce/access/adminOrPublishedStatus.ts:15: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/ecommerce/access/customerOnlyFieldAccess.ts:6: * @compliance GDPR Art.5(1)(c) data-minimization
src/ecommerce/access/isDocumentOwner.ts:10: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/ecommerce/access/isDocumentOwner.ts:11: * @compliance SOC-2 CC6.1 logical-access-controls
src/ecommerce/configureEcommercePlugin/index.ts:13: * @compliance PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data tokenized
src/ecommerce/configureEcommercePlugin/index.ts:14: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
src/ecommerce/configureEcommercePlugin/index.ts:15: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/ecommerce/configureEcommercePlugin/index.ts:16: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/ecommerce/configureEcommercePlugin/index.ts:21: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/ecommerce/configureEcommercePlugin/index.ts:22: * @compliance SOC-2 CC6.1 logical-access-controls
src/ecommerce/createTenantStripePaymentMethod/index.ts:10: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/ecommerce/createTenantStripePaymentMethod/index.ts:8: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/ecommerce/createTenantStripePaymentMethod/index.ts:9: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:27: * @compliance SOX §404 internal-controls quote-to-cash
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:5: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:6: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:7: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/ecommerce/stripe/tenantConfirmOrder.ts:5: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/ecommerce/stripe/tenantConfirmOrder.ts:6: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/ecommerce/stripe/tenantConfirmOrder.ts:7: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/ecommerce/stripe/tenantStripeWebhook.ts:5: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography signature-verification
src/ecommerce/stripe/tenantStripeWebhook.ts:6: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/email/tenantAwareResendEmailAdapter/index.ts:27: * @compliance GDPR Art.32 security-of-processing
src/email/tenantAwareResendEmailAdapter/index.ts:28: * @compliance CAN-SPAM US-15-USC-7701
src/emit/domain/event/index.ts:17: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/emit/domain/event/index.ts:18: * @compliance SOX §404 internal-controls
src/employees/expense/reports/index.ts:13: * @compliance GDPR Art.5 PII receipt-images
src/employees/expense/reports/index.ts:14: * @compliance SOX §404 internal-controls four-eyes
src/employees/index.ts:20: * @compliance SOX §404 internal-controls payroll-master
src/employees/index.ts:21: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/employees/index.ts:22: * @compliance GDPR Art.9 special-categories-of-personal-data
src/employees/index.ts:23: * @compliance GDPR Art.30 records-of-processing-activities
src/employees/leave/requests/index.ts:24: * @compliance EU Working Time Directive 2003/88/EC minimum-leave
src/employees/leave/requests/index.ts:25: * @compliance US FMLA family-medical-leave-act
src/employees/leave/requests/index.ts:26: * @compliance BG Labour Code Art.155-176
src/employees/performance/reviews/index.ts:10: * @compliance EU Equal Treatment Directive 2000/78
src/employees/performance/reviews/index.ts:9: * @compliance GDPR Art.5 PII processing
src/employees/sales/commissions/index.ts:17: * @compliance SOX §404 internal-controls commission-completeness
src/employees/share/based/payments/index.ts:18: * @compliance SOX §404 internal-controls TOM-EQU-01
src/employees/time/entries/index.ts:14: * @compliance SOX §404 internal-controls payroll-evidence
src/employees/time/entries/index.ts:15: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/enforce/document/tenant/for/user/index.ts:18: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/enforce/document/tenant/for/user/index.ts:19: * @compliance SOC-2 CC6.1 logical-access-controls
src/enforce/segregation/of/duty/index.ts:10: * @compliance SOX §404 internal-controls four-eyes-principle
src/enforce/segregation/of/duty/index.ts:11: * @compliance SOC-2 CC6.3 logical-access-controls
src/entity/types/index.ts:12: * @compliance SOX §302 entity-type-determination
src/error/index.ts:13: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/error/registry.ts:12: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/etsi/en/319/142/evidence-attestation.test.ts:10: * @compliance SOX §404 internal-controls process-walk-through
src/etsi/en/319/142/evidence-attestation.test.ts:11: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/etsi/en/319/142/index.ts:6: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/etsi/en/319/142/profile.ts:24: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/etsi/en/319/142/signature-dictionary.test.ts:9: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/etsi/en/319/142/signature-dictionary.ts:24: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/eu/ai/act/index.ts:14: * @compliance GDPR Art.22 automated-individual-decision-making
src/event/emitter.service/index.ts:11: * @compliance SOC-2 CC7.2 system-monitoring
src/event/emitter.service/index.ts:12: * @compliance SOX §404 internal-controls
src/evidence/attestation/index.ts:26: * @compliance SOX §404 internal-controls process-walk-through
src/evidence/attestation/index.ts:27: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/evidence/attestations/index.ts:18: * @compliance SOX §404 internal-controls process-walk-through
src/evidence/attestations/index.ts:19: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/factory/auto-populate-tenant.ts:10: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/factory/recompute-parent-aggregates.ts:25: * @compliance SOX §404 internal-controls total-completeness
src/fair/value/measurements/index.ts:20: * @compliance SOX §404 internal-controls TOM-FV-01 valuation-process
src/feature/registry/index.ts:32: * @compliance SOC-2 CC6.1 logical-access-controls
src/financial/reporting.service/index.ts:12: * @compliance SOX §302 disclosure-controls
src/financial/statements/index.ts:25: * @compliance SOX §302 disclosure-controls
src/financial/statements/index.ts:26: * @compliance SOX §404 internal-controls
src/fiscal/devices/sales/index.ts:27: * @compliance SOX §404 internal-controls
src/fiscal/periods/carbon/emissions/index.ts:22: * @compliance EU SFDR PAI 1 ghg-emissions
src/fiscal/periods/carbon/emissions/index.ts:23: * @compliance EU CBAM Carbon Border Adjustment Mechanism (when applicable)
src/fiscal/periods/carbon/emissions/index.ts:24: * @compliance EU Taxonomy DNSH climate-mitigation
src/fiscal/periods/earnings/per/shares/index.ts:19: * @compliance SOX §404 internal-controls
src/fiscal/periods/index.ts:26: * @compliance SOX §404 period-close-integrity access-control-evidence
src/fiscal/periods/index.ts:27: * @compliance GDPR Art 5(1)(f) audit-trail-integrity
src/fiscal/periods/index.ts:28: * @compliance eIDAS Regulation 910/2014 qualified-electronic-signature on-amendments
src/fiscal/periods/post/balance/sheet/events/index.ts:18: * @compliance SOX §404 internal-controls TOM-CL-03
src/fiscal/periods/prior/period/adjustments/index.ts:17: * @compliance SOX §404 internal-controls restatement-control TOM-PPA-01
src/fiscal/periods/prior/period/adjustments/index.ts:18: * @compliance SOX §906 ceo-cfo-certification material-misstatement
src/fiscal/periods/provisions/index.ts:23: * @compliance SOX §404 internal-controls liability-completeness
src/fiscal/periods/tax/periods/transfer/pricing/adjustments/index.ts:14: * @compliance OECD BEPS Action-13 country-by-country
src/fixed/assets/depreciation/schedules/hooks/depreciation.ts:25: * @compliance SOX §404 internal-controls capital-asset-register
src/fixed/assets/depreciation/schedules/index.ts:14: * @compliance SOX §404 internal-controls
src/fixed/assets/index.ts:30: * @compliance SOX §404 internal-controls capital-asset-register
src/fx/transactions/index.ts:20: * @compliance SOX §404 internal-controls fx-control TOM-FX-01
src/get/me/user/index.ts:10: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/get/me/user/index.ts:11: * @compliance SOC-2 CC6.1 logical-access-controls
src/get/user/tenant/i/ds/index.ts:8: * @compliance SOX §404 internal-controls
src/gl/account/resolver/index.ts:28: * @compliance SOX §404 internal-controls per-tenant-coa
src/gl/accounts/account/reconciliations/index.ts:26: * @compliance SOX §404 internal-controls reconciliation-sign-off
src/gl/accounts/bank/statements/hooks/bank-statement.ts:27: * @compliance SOX §404 internal-controls cash-management
src/gl/accounts/bank/statements/index.ts:25: * @compliance SOX §404 internal-controls reconciliation-evidence
src/gl/accounts/index.ts:15: * @compliance SOX §404 internal-controls
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.test.ts:15: * @compliance SOX §404 internal-controls four-eyes
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts:33: * @compliance SOX §404 internal-controls four-eyes
src/gl/accounts/period/end/adjustments/index.ts:23: * @compliance SOX §404 internal-controls
src/gl/accounts/recurring/journals/index.ts:22: * @compliance SOX §404 internal-controls automated-controls
src/gl/accounts/tax/calculations/index.ts:24: * @compliance SOX §404 internal-controls tax-position
src/gl/posting.service/index.ts:13: * @compliance SOX §404 internal-controls
src/gl/posting.service/index.ts:799:   * @compliance SOX §404 internal-controls bank-reconciliation
src/gl/posting/rules/index.ts:10: * @compliance SOX §404 internal-controls
src/governance/index.ts:18: * @compliance one-person-one-vote (Venice Commission Code of Good Practice in Electoral Matters)
src/government/grants/index.ts:20: * @compliance EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)
src/government/grants/index.ts:21: * @compliance OECD BEPS Action 13 country-by-country (when grants ≥ threshold)
src/header/config.ts:7: * @compliance WCAG-2.1 §2.4.1 bypass-blocks skip-link
src/held/for/sale/classifications/index.ts:22: * @compliance SOX §404 internal-controls
src/hero/config.ts:7: * @compliance WCAG-2.1 §1.4.3 contrast-minimum hero-overlay
src/hero/config.ts:8: * @compliance WCAG-2.1 §2.4.6 headings-and-labels
src/insurance/contracts/index.ts:22: * @compliance Solvency II / IAIS ICS — actuarial reserving link
src/insurance/contracts/index.ts:23: * @compliance SOX §404 internal-controls TOM-INS-01
src/integrity/content-uuid.ts:47: * @compliance SOX §404 internal-controls (Byzantine tamper detection)
src/integrity/tamper-proof-uuid-field.ts:38: * @compliance SOX §404 (Byzantine tamper detection at the row level)
src/integrity/uuid-ref.ts:29: * @compliance SOX §404 (referential integrity without cascade rules)
src/internal/controls/audit/findings/index.ts:9: * @compliance SOX §404 internal-controls deficiency-tracking
src/internal/controls/audit/findings/remediation/plans/index.ts:5: * @compliance SOX §404 control-remediation
src/internal/controls/control/tests/index.ts:8: * @compliance SOX §404 internal-controls testing-evidence
src/internal/controls/index.ts:5: * @compliance SOX §404 internal-controls
src/internal/policies/policy/acknowledgments/index.ts:5: * @compliance SOX §404 control-attestation
src/invoices/credit/memos/index.ts:25: * @compliance SOX §404 internal-controls credit-memo-approval
src/invoices/credit/memos/refunds/index.ts:14: * @compliance SOX §404 internal-controls refund-approval
src/invoices/credit/memos/refunds/index.ts:15: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe
src/invoices/dunning/cycles/index.ts:27: * @compliance SOX §404 internal-controls bad-debt-evidence
src/invoices/dunning/cycles/index.ts:28: * @compliance GDPR Art.6(1)(f) lawful-basis-legitimate-interest collections
src/invoices/hooks/bill.ts:21: * @compliance SOX §404 internal-controls
src/invoices/hooks/encryptSensitiveFields.ts:10: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/invoices/hooks/gl-hooks-emit-events.test.ts:19: * @compliance SOX §404 internal-controls
src/invoices/hooks/invoice.ts:25: * @compliance SOX §404 internal-controls
src/invoices/index.ts:62: * @compliance SOX §404 internal-controls
src/invoices/payments/hooks/afterChange.ts:16: * @compliance SOX §404 internal-controls
src/invoices/payments/hooks/beforeChange.ts:9: * @compliance SOX §404 period-close-integrity
src/invoices/payments/hooks/payment.ts:38: * @compliance SOX §404 internal-controls
src/invoices/payments/index.ts:32: * @compliance SOX §404 internal-controls
src/invoices/payments/payment/allocations/index.ts:23: * @compliance SOX §404 internal-controls cash-allocation TOM-AR-02
src/is/super/admin/index.ts:8: * @compliance SOC-2 CC6.3 privileged-access-management
src/iso/14289/profile.ts:25: * @compliance EU 2014/55 b2g-procurement-accessibility
src/iso/14289/profile.ts:26: * @compliance EU 2019/882 european-accessibility-act
src/iso/19005/profile.ts:22: * @compliance EU 2014/55 b2g-e-invoicing-archival
src/iso/19011/types.test.ts:11: * @compliance SOX §404 internal-controls
src/iso/19011/types.ts:12: * @compliance SOX §404 internal-controls evidence-preservation
src/iso/19011/types.ts:13: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/iso/19011/types.ts:14: * @compliance GDPR Art.30 records-of-processing-activities
src/iso/27002/access-coverage.test.ts:17: * @compliance SOC-2 trust-services-criteria
src/iso/27002/coverage.ts:13: * @compliance SOC-2 trust-services-criteria
src/iso/27002/types.ts:12: * @compliance SOC-2 trust-services-criteria
src/iso/3166/1/country/bg-completeness.test.ts:27: * @compliance SOX §404 internal-controls country-coverage-matrix
src/iso/3166/1/country/bg-generic-clients.test.ts:15: * @compliance EU 910/2014 eidas qualified-electronic-seal
src/iso/3166/1/country/bg-holidays.test.ts:9: * @compliance Кодекс на труда чл.154
src/iso/3166/1/country/bg-hybrid-invoice.test.ts:10: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/iso/3166/1/country/bg-pades-signer.test.ts:10: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/iso/3166/1/country/bg-vat.test.ts:8: * @compliance EU 2006/112/EC vat-system-directive
src/iso/3166/1/country/bg.ts:28: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:16: * @compliance EU 2006/112/EC vat-system-directive
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:17: * @compliance AMLD-5 ubo-screening
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:18: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/iso/7064/egn-bg.test.ts:13: * @compliance GDPR Art.9 special-category-data
src/iso/7064/egn-bg.ts:27: * @compliance AMLD-5 ubo-personal-identifier
src/iso/7064/egn-bg.ts:28: * @compliance GDPR Art.9 special-category-data
src/items/batches/index.ts:24: * @compliance SOX §404 internal-controls traceability-control TOM-TRACE-01
src/items/bills/of/materials/index.ts:23: * @compliance SOX §404 internal-controls bom-engineering-change-control
src/items/bills/of/materials/work/orders/cost/variances/index.ts:15: * @compliance SOX §404 internal-controls variance-disposition TOM-PROD-03
src/items/bills/of/materials/work/orders/operation/runs/index.ts:20: * @compliance SOX §404 internal-controls production-control
src/items/bills/of/materials/work/orders/production/receipts/index.ts:17: * @compliance SOX §404 internal-controls production-control TOM-PROD-02
src/items/bills/of/materials/work/orders/routings/index.ts:18: * @compliance SOX §404 internal-controls production-control
src/items/hooks/afterChange.ts:13: * @compliance SOX §404 internal-controls
src/items/hooks/item.ts:21: * @compliance SOX §404 internal-controls
src/items/inventory/movements/hooks/inventory-movement.ts:21: * @compliance SOX §404 internal-controls cycle-count
src/items/inventory/movements/index.ts:17: * @compliance SOX §404 internal-controls inventory-cycle-count
src/items/purchase/orders/goods/receipts/index.ts:28: * @compliance SOX §404 internal-controls three-way-match
src/items/purchase/orders/index.ts:44: * @compliance SOX §404 internal-controls three-way-match
src/items/purchase/orders/index.ts:45: * @compliance INCOTERMS-2020 delivery-responsibility-consistency
src/items/quality/inspections/index.ts:15: * @compliance SOX §404 internal-controls quality-control TOM-QC-01
src/items/quality/inspections/index.ts:16: * @compliance ISO 9001:2015 §8.7 quality-management-system
src/jobs/bnbRatesSync/index.ts:21: * @compliance SOX §404 internal-controls fx-revaluation-evidence
src/jobs/dunningJob.test.ts:12: * @compliance SOX §404 internal-controls
src/jobs/dunningJob/index.ts:17: * @compliance SOX §404 internal-controls
src/jobs/dunningJob/index.ts:18: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/journal/entries/gl/postings/index.ts:30: * @compliance SOX §404 internal-controls
src/journal/entries/hooks/balanced-entry.ts:27: * @compliance SOX §404 internal-controls
src/journal/entries/index.ts:34: * @compliance SOX §404 internal-controls
src/journal/entries/rounding/adjustments/index.ts:16: * @compliance SOX §404 internal-controls rounding-control TOM-RND-01
src/journal/entry/service/index.ts:18: * @compliance SOX §404 internal-controls
src/leads/index.ts:13: * @compliance GDPR Art.5 data-minimisation
src/leads/index.ts:14: * @compliance GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)
src/leases/index.ts:56: * @compliance SOX §404 internal-controls capital-asset-register
src/leases/lease/modifications/index.ts:26: * @compliance SOX §404 internal-controls liability-completeness
src/leases/lease/period/postings/hooks/lease-period-posting.ts:34: * @compliance SOX §404 internal-controls
src/leases/lease/period/postings/index.ts:27: * @compliance SOX §404 internal-controls capital-asset-register
src/legal/entities/audit/committees/audit/committee/members/index.ts:4: * @compliance SOX §301 audit-committee-composition
src/legal/entities/audit/committees/audit/committee/minutes/index.ts:4: * @compliance SOX §301 audit-committee-records
src/legal/entities/audit/committees/index.ts:4: * @compliance SOX §301 audit-committee
src/legal/entities/beneficial/owners/index.ts:5: * @compliance EU-AMLD-5 Directive-2018/843 ubo-register
src/legal/entities/beneficial/owners/index.ts:6: * @compliance US-CTA Corporate-Transparency-Act-2021 beneficial-ownership
src/legal/entities/beneficial/owners/index.ts:7: * @compliance FATF-Recommendation-24 transparency-of-legal-persons
src/legal/entities/board/actions/index.ts:5: * @compliance SOX §404 governance
src/legal/entities/business/combinations/index.ts:20: * @compliance SOX §404 internal-controls TOM-MA-01 PPA-process
src/legal/entities/closing/entries/index.ts:16: * @compliance SOX §404 period-close-integrity
src/legal/entities/consolidations/audit/reports/index.ts:16: * @compliance SOX §404 internal-controls
src/legal/entities/consolidations/audit/reports/post/close/analytics/reports/index.ts:14: * @compliance SOX §404 close-monitoring
src/legal/entities/index.ts:33: * @compliance OECD BEPS Action 13 master-file-entity-list
src/legal/entities/index.ts:34: * @compliance EU DAC-6 reportable-cross-border-arrangements
src/legal/entities/intercompany/transactions/index.ts:19: * @compliance SOX §404 internal-controls intercompany-control TOM-IC-01
src/legal/entities/intercompany/transactions/index.ts:20: * @compliance OECD BEPS Action 13 transfer-pricing-documentation
src/legal/entities/internal/audit/functions/index.ts:6: * @compliance SOX §404 internal-controls
src/legal/entities/management/assessment/icfrs/index.ts:4: * @compliance SOX §404(a) management-assessment-ICFR
src/legal/entities/management/certifications/index.ts:4: * @compliance SOX §302 corporate-responsibility
src/legal/entities/management/certifications/index.ts:5: * @compliance SOX §906 criminal-certification
src/legal/entities/regulatory/reports/index.ts:6: * @compliance local-regulatory-filing
src/legal/entities/transfer/pricing/files/index.ts:17: * @compliance OECD BEPS Action 13 transfer-pricing-documentation
src/legal/entities/transfer/pricing/files/index.ts:18: * @compliance OECD TPG 2022 transfer-pricing-guidelines
src/legal/entities/transfer/pricing/files/index.ts:19: * @compliance EU DAC-4 country-by-country-reporting
src/legal/entities/transfer/pricing/files/index.ts:20: * @compliance EU 2016/881 administrative-cooperation-tax
src/legal/entities/transfer/pricing/files/index.ts:21: * @compliance OECD Pillar Two GloBE (15% global minimum tax)
src/legislation/index.ts:25: * @compliance Venice Commission Rule of Law (law public, prospective, stable, equally applied)
src/link/Component.tsx:8: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/link/Component.tsx:9: * @compliance WCAG-2.1 §2.4.9 link-purpose-link-only
src/link/field.ts:8: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/link/group.ts:6: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/link/index.ts:12: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/link/index.ts:13: * @compliance WCAG-2.1 §2.4.9 link-purpose-link-only
src/lot/work/phases/index.ts:28: * @compliance SOX §404 internal-controls production-control
src/lots/index.ts:30: * @compliance SOX §404 internal-controls production-control
src/maintenance/requests/index.ts:15: * @compliance SOX §404 internal-controls fm-service-delivery
src/maintenance/work/orders/index.ts:22: * @compliance SOX §404 internal-controls capex-vs-opex-classification
src/marketing/CountryShowcase.tsx:11: * @compliance WCAG-2.1 §1.3.1 info-and-relationships table-semantics
src/marketing/LiveAuditCounter.tsx:11: * @compliance SOX §404 internal-controls evidence-preservation
src/marketing/PricingTable.tsx:14: * @compliance WCAG-2.1 level-AA pricing-table-accessibility
src/marketing/StandardsBadges.tsx:12: * @compliance WCAG-2.1 §1.1.1 alt-text-on-decorative-icons
src/marketing/types.ts:13: * @compliance WCAG-2.1 level-AA marketing-component-accessibility
src/media/Component.tsx:9: * @compliance WCAG-2.1 §1.1.1 non-text-content alt-text
src/media/hooks/beforeChange.ts:8: * @compliance GDPR Art.5(1)(c) data-minimization
src/media/index.ts:22: * @compliance GDPR Art.5(1)(c) data-minimization no-pii-in-filenames
src/media/index.ts:23: * @compliance GDPR Art.32 security-of-processing
src/media/products/index.ts:36: * @compliance WCAG-2.1 level-AA accessibility
src/media/sepa/mandates/index.ts:21: * @compliance SOX §404 internal-controls
src/media/sepa/mandates/index.ts:22: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/media/sepa/mandates/index.ts:23: * @compliance EPC130-08 sepa-direct-debit-rulebook
src/membership/admin/mutate/access/index.ts:22: * @compliance SOC-2 CC6.1 logical-access-controls
src/messages/index.ts:14: * @compliance GDPR Art 5(1)(e) storage-limitation retention
src/middleware/accounting/tenant-scope.ts:16: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/middleware/accounting/tenant-scope.ts:17: * @compliance GDPR Art.32 security-of-processing
src/middleware/accounting/tenant-scope.ts:18: * @compliance SOC-2 CC6.1 logical-access-controls
src/mineral/resource/assets/index.ts:19: * @compliance SOX §404 internal-controls
src/nace/rev2/index.ts:12: * @compliance EU CSRD ESRS 2 §80(b) sector-classification
src/nist/incits/359/index.ts:14: * @compliance SOC-2 CC6.1 logical-access-controls
src/nist/incits/359/index.ts:15: * @compliance SOC-2 CC6.3 access-removal
src/nist/incits/359/index.ts:16: * @compliance SOX §404 internal-controls
src/nist/sp/800/108/kdf.ts:17: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/nist/sp/800/38/aes-gcm.test.ts:10: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/nist/sp/800/38/aes-gcm.test.ts:11: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/nist/sp/800/38/aes-gcm.ts:16: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/nist/sp/800/38/aes-gcm.ts:17: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/notification/index.ts:20: * @compliance GDPR Art.7 transactional-email-consent
src/notification/subscriber.ts:15: * @compliance GDPR Art.7 transactional-consent
src/page/range/index.tsx:8: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/pages/access/superAdminOrTenantAdmin.ts:9: * @compliance SOC-2 CC6.1 logical-access-controls
src/pages/index.ts:35: * @compliance WCAG-2.1 level-AA accessibility
src/pagination/index.tsx:9: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/party/workflow.service.ts:9: * @compliance SOX §404 internal-controls
src/payable/workflow.service.ts:13: * @compliance SOX §404 internal-controls
src/payload.config.multi-tenant-admin.test.ts:15: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/payload.config.multi-tenant-admin.test.ts:16: * @compliance SOC-2 CC6.1 logical-access-controls
src/payload.config.tenant.test.ts:7: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/payload.config.tenant.test.ts:8: * @compliance SOC-2 CC6.1 logical-access-controls
src/payment/methods/hooks/encryptSensitiveFields.ts:10: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
src/payment/methods/hooks/encryptSensitiveFields.ts:11: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/payment/methods/hooks/encryptSensitiveFields.ts:12: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/payment/methods/index.ts:18: * @compliance PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data
src/payment/methods/index.ts:19: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
src/payment/methods/index.ts:20: * @compliance GDPR Art.32 security-of-processing
src/period/end/adjustment.service/index.ts:32: * @compliance SOX §404 internal-controls
src/period/locks/index.ts:12:  * @compliance SOX §404 period-close-integrity
src/persist/api/audit/event/index.ts:18: * @compliance SOX §404 internal-controls external-system-traceability
src/plugins/auth/access/field-access.ts:13: * @compliance SOC-2 CC6.1 logical-access-controls
src/plugins/auth/access/field-access.ts:41: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/plugins/auth/access/field-access.ts:69: * @compliance SOC-2 CC7.2 system-monitoring
src/plugins/auth/access/index.ts:16: * @compliance SOC-2 CC6.1 logical-access-controls
src/plugins/auth/access/predicates.ts:114: * @compliance SOC-2 CC6.2 prior-to-issuing-system-access
src/plugins/auth/access/predicates.ts:38: * @compliance SOC-2 CC6.3 privileged-access-management
src/plugins/auth/access/predicates.ts:83: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/plugins/auth/access/predicates.ts:84: * @compliance SOC-2 CC6.1 logical-access-controls
src/plugins/versions/index.ts:30: * @compliance SOX §404 internal-controls record-retention
src/posts/hooks/populateAuthors.ts:14: * @compliance GDPR Art.5(1)(c) data-minimization
src/posts/hooks/populateAuthors.ts:15: * @compliance GDPR Art.32 security-of-processing
src/posts/index.ts:43: * @compliance WCAG-2.1 level-AA accessibility
src/properties/index.ts:23: * @compliance SOX §404 internal-controls real-estate-portfolio
src/properties/investment/properties/index.ts:22: * @compliance SOX §404 internal-controls
src/properties/spaces/index.ts:15: * @compliance SOX §404 internal-controls space-allocation
src/provider/index.tsx:4: * @compliance WCAG-2.1 §1.4.3 contrast-minimum
src/provider/index.tsx:5: * @compliance WCAG-2.1 §1.4.11 non-text-contrast
src/receivable/allowance.service.ts:9: * @compliance SOX §404 internal-controls
src/receivable/workflow.service.ts:11: * @compliance SOX §404 internal-controls
src/regulatory/deferral/accounts/index.ts:16: * @compliance SOX §404 internal-controls
src/remote/media/import/index.ts:10: * @compliance GDPR Art.5(1)(c) data-minimization
src/rfc/6585/rate-limit.ts:15: * @compliance SOC-2 CC6.1 logical-access-controls
src/rich/text/index.tsx:7: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/rich/text/index.tsx:8: * @compliance WCAG-2.1 §1.4.10 reflow
src/roles/hooks/validateRoleDefinition.ts:12: * @compliance SOX §404 internal-controls
src/roles/index.ts:15: * @compliance SOC-2 CC6.1 logical-access-controls
src/roles/index.ts:16: * @compliance SOX §404 internal-controls
src/roles/user/roles/hooks/preventDuplicateAssignment.ts:15: * @compliance SOC-2 CC6.3 access-removal
src/roles/user/roles/hooks/preventDuplicateAssignment.ts:16: * @compliance SOX §404 internal-controls
src/roles/user/roles/index.ts:15: * @compliance SOC-2 CC6.3 access-removal
src/saf/t/export.service/index.ts:35: * @compliance SOX §404 internal-controls
src/saf/t/types.ts:19: * @compliance SOX §404 internal-controls
src/sale/sale-immutability.ts:15: * @compliance SOX §404 internal-controls
src/scheduled/task/registry.ts:23: * @compliance SOX §404 internal-controls automated-controls
src/scheduled/task/registry.ts:24: * @compliance GDPR Art.5(1)(e) storage-limitation (retention purges)
src/scheduled/task/runner.ts:16: * @compliance SOX §404 internal-controls automated-controls
src/scope/index.ts:9: * @compliance SOC-2 CC6.1 logical-access-controls
src/security/header/headers.ts:17: * @compliance SOC-2 CC6.6 boundary-protection
src/seed/erpax-product-pages.ts:34: * @compliance WCAG-2.1 level-AA accessible-marketing-pages
src/seeding/seedSubscriptionPlans.ts:12: * @compliance SOC-2 CC8.1 change-management
src/seeds/template/bg-nss.ts:20: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/seeds/template/compliance.ts:9: * @compliance EU 2014/55 b2g-e-invoicing-mandate-resolution
src/separation/index.ts:12: * @compliance Montesquieu separation-of-powers (legislative · executive · judicial)
src/separation/index.ts:13: * @compliance SOX §404 segregation-of-duties (the same invariant, public-office scale)
src/shared/AddressBlock.tsx:18: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/shared/AuditedTimestamp.tsx:18: * @compliance WCAG-2.1 §1.3.1 info-and-relationships time-semantics
src/shared/Money.tsx:20: * @compliance WCAG-2.1 §1.3.1 info-and-relationships tabular-num
src/shared/index.ts:26: * @compliance WCAG-2.1 level-AA shared-atom-accessibility
src/shareds/versionedDrafts.ts:10: * @compliance SOX §404 internal-controls record-retention
src/shareds/versionedDrafts.ts:11: * @compliance GDPR Art.5(1)(e) storage-limitation maxPerDoc-cap
src/shares/index.ts:33: * @compliance GDPR Article 32(1)(b) ongoing-confidentiality
src/shares/index.ts:34: * @compliance SOX §404 access-controls audit-evidenced-via-chain
src/spec/generator/evidence-collector.ts:40: * @compliance SOX §404 process-walk-through-controls
src/spec/generator/extractor.ts:15: *   @compliance    <body> <id> [free-text]      ← alias for @standard
src/spec/generator/marketing-page-generator.ts:44: * @compliance SOX §404 process-walk-through-controls
src/spec/generator/multimedia-generator.ts:33: * @compliance SOX §404 process-walk-through-controls
src/spec/generator/multimedia-generator.ts:34: * @compliance ISO-27001 A.5.36 conformance-with-policies
src/standard/collection/hook/index.ts:15: * @compliance SOX §404 internal-controls provenance
src/subscription/gate/index.test.ts:10: * @compliance SOC-2 CC6.1 logical-access-controls
src/subscription/gate/index.ts:14: * @compliance SOC-2 CC6.1 logical-access-controls
src/subscription/gate/index.ts:216: * @compliance SOC-2 CC6.1 logical-access-controls
src/subscription/plans/index.ts:12: * @compliance SOX §404 internal-controls
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:30: * @compliance SOX §404 internal-controls revenue-recognition
src/subscription/plans/subscriptions/hooks/encryptSensitiveFields.ts:10: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/subscription/plans/subscriptions/index.ts:18: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/subscription/plans/subscriptions/index.ts:19: * @compliance SOX §404 internal-controls
src/subscription/plans/subscriptions/usage/records/index.ts:21: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/subscription/plans/subscriptions/usage/records/index.ts:22: * @compliance SOC-2 CC7.4 system-monitoring-and-detection
src/svg/hero/generator/index.ts:19: * @compliance WCAG-2.1 §1.4.3 contrast-minimum minimum-4.5-1
src/tags/index.ts:24: * @compliance SOX §404 internal-controls
src/tags/taggings/index.ts:33: * @compliance SOX §404 internal-controls
src/tax/jurisdictions/deferred/tax/items/index.ts:20: * @compliance SOX §404 internal-controls TOM-TAX-02
src/tax/jurisdictions/tax/returns/index.ts:10: * @compliance SOX §404 internal-controls tax-position
src/tenant.service/index.ts:13: * @compliance GDPR Art.28 processor
src/tenant.service/index.ts:14: * @compliance SOC-2 CC6.1 logical-access-controls
src/tenant/context/index.ts:44: * @compliance GDPR Art.12 transparent-information user-language-of-choice
src/tenant/remote/secret/index.ts:10: * @compliance PCI-DSS-4.0 §3.2 tokenized-payment-method
src/tenant/remote/secret/index.ts:11: * @compliance GDPR Art.32 security-of-processing
src/tenant/scoped/read/index.test.ts:10: * @compliance SOC-2 CC6.1 logical-access-controls
src/tenant/scoped/read/index.test.ts:9: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/tenant/scoped/read/index.ts:17: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/tenant/scoped/read/index.ts:18: * @compliance SOC-2 CC6.1 logical-access-controls
src/tenants/access/updateAndDelete.ts:12: * @compliance GDPR Art.28 processor-controls
src/tenants/access/updateAndDelete.ts:13: * @compliance SOC-2 CC6.1 logical-access-controls
src/tenants/hooks/initializeTrial.ts:14: * @compliance SOX §404 internal-controls
src/tenants/index.ts:22: * @compliance GDPR Art.4(7) data-controller
src/tenants/index.ts:23: * @compliance GDPR Art.30 records-of-processing-activities
src/tenants/index.ts:26: * @compliance SOC-2 CC6.1 logical-access-controls
src/transaction/failures/index.ts:15: * @compliance SOX §404 internal-controls failure-disposition TOM-FAIL-01
src/transaction/failures/index.ts:16: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/transaction/failures/index.ts:17: * @compliance SOC-2 CC7.3 system-incident-response
src/types/bank-reconciliation/index.ts:163: * @compliance SOX §404 internal-controls
src/types/events/index.ts:10: * @compliance SOX §404 internal-controls
src/types/events/index.ts:270: * @compliance SOX §404 internal-controls cycle-count
src/types/events/index.ts:411: * @compliance SOX §404 internal-controls
src/types/events/index.ts:499: * @compliance SOX §404 internal-controls quote-to-cash
src/types/events/index.ts:9: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/types/financial-statements/index.ts:11: * @compliance SOX §302 disclosure-controls
src/types/period-end/index.ts:11: * @compliance SOX §404 internal-controls
src/types/tenant/index.ts:19: * @compliance GDPR Art.4(7) data-controller
src/users/access/create.ts:16: * @compliance SOC-2 CC6.2 access-provisioning
src/users/access/read.ts:20: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/users/access/read.ts:21: * @compliance SOC-2 CC6.1 logical-access-controls
src/users/access/updateAndDelete.ts:15: * @compliance SOC-2 CC6.3 access-removal
src/users/endpoints/externalUsersLogin.ts:25: * @compliance GDPR Art.32 security-of-processing
src/users/endpoints/externalUsersLogin.ts:26: * @compliance SOC-2 CC6.1 logical-access-controls
src/users/hooks/setCookieBasedOnDomain.ts:25: * @compliance SOC-2 CC6.1 logical-access-controls
src/users/index.ts:231:     * @compliance GDPR Art.12 transparent-information user-language-of-choice
src/users/index.ts:59: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/users/index.ts:60: * @compliance GDPR Art.32 security-of-processing
src/users/index.ts:61: * @compliance SOC-2 CC6.1 logical-access-controls
src/utility/bank-reconciliation-report.test.ts:27: * @compliance SOX §404 internal-controls
src/utility/depreciation-methods.test.ts:17: * @compliance SOX §404 internal-controls capital-asset-register
src/utility/period-lock.ts:19: * @compliance SOX §404 period-close-integrity
src/validate/address/index.ts:26: * @compliance GDPR Art.5(1)(c) data-minimisation
src/vendors/index.ts:21: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/vendors/vendor/quotes/index.ts:12: * @compliance OECD BEPS Action 13 transfer-pricing-evidence
src/vendors/vendor/quotes/index.ts:13: * @compliance SOX §404 internal-controls vendor-selection
src/vendors/vendor/scorecards/index.ts:13: * @compliance SOX §404 internal-controls vendor-management
src/versions/cross/index.ts:25: * @compliance SOX §404 internal-controls record-retention
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:22: * @compliance SOX §404 internal-controls inventory-segregation TOM-INV-03
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:26: * @compliance SOX §404 internal-controls revenue-completeness TOM-AR-04
src/warehouse/locations/consignment/arrangements/index.ts:26: * @compliance SOX §404 internal-controls revenue-deferral TOM-AR-04
src/warehouse/locations/index.ts:16: * @compliance SOX §404 internal-controls inventory-segregation
src/widget/AccountReconciliationsPanel.tsx:10: * @compliance SOX §404 internal-controls reconciliation-sign-off
src/widget/AuditLogWidget.tsx:10: * @compliance SOX §404 internal-controls
src/widget/AuditLogWidget.tsx:9: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/widget/BalanceSheetWidget.tsx:8: * @compliance SOX §404 internal-controls
src/widget/EmployeesPanel.tsx:10: * @compliance GDPR Art.9 special-categories
src/widget/IncomeStatementWidget.tsx:8: * @compliance SOX §404 internal-controls
src/widget/LeasePeriodPostingsPanel.tsx:19: * @compliance SOX §404 internal-controls capital-asset-register
src/widget/QuickActionsWidget.tsx:7: * @compliance SOX §404 internal-controls
src/widget/TrialBalanceWidget.tsx:8: * @compliance SOX §404 internal-controls trial-balance-evidence
src/work/centers/index.ts:18: * @compliance SOX §404 internal-controls production-control
src/work/centers/operations/index.ts:13: * @compliance SOX §404 internal-controls production-control
src/work/orders/index.ts:69: * @compliance SOX §404 internal-controls production-control TOM-PROD-01
src/work/phases/index.ts:26: * @compliance SOX §404 internal-controls production-control
src/work/shifts/index.ts:38: * @compliance SOX §404 internal-controls payroll-and-production-control
src/workflow/definitions/index.ts:17: * @compliance SOX §404 internal-controls multi-step-approval
src/workflow/definitions/index.ts:18: * @compliance ISO-27002 §5.4 segregation-of-duties
src/workflow/definitions/workflow/instances/index.ts:16: * @compliance SOX §404 internal-controls workflow-execution
src/workflow/index.ts:24: * @compliance SOX §404 internal-controls workflow-execution
tests/e2e/admin-evidence.e2e.spec.ts:29: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/admin.e2e.spec.ts:17: * @compliance WCAG-2.1 level-AA accessibility
tests/e2e/categories/admin-data.e2e.spec.ts:12: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/categories/compliance-evidence.e2e.spec.ts:13: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/categories/cross-cutting.e2e.spec.ts:10: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/categories/public-content.e2e.spec.ts:13: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
tests/e2e/categories/public-content.e2e.spec.ts:14: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/erp-workflows/order-to-cash.e2e.spec.ts:19: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/erp-workflows/procure-to-pay.e2e.spec.ts:14: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/erp-workflows/record-to-report.e2e.spec.ts:15: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/form.e2e.spec.ts:10: * @compliance WCAG-2.1 level-AA accessibility
tests/e2e/form.e2e.spec.ts:11: * @compliance GDPR Art.6(1)(a) consent
tests/e2e/frontend.e2e.spec.ts:7: * @compliance WCAG-2.1 level-AA accessibility
tests/e2e/search.e2e.spec.ts:10: * @compliance WCAG-2.1 level-AA accessibility
tests/e2e/standards/audit/saf-t-export-flow.e2e.spec.ts:14: * @compliance EU 2014/55 b2g-e-invoicing-mandate
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:12: * @compliance GDPR Art.5 principles-of-processing
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:13: * @compliance GDPR Art.15-22 data-subject-rights
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:14: * @compliance GDPR Art.30 records-of-processing
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:15: * @compliance GDPR Art.32 security-of-processing
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:16: * @compliance ISO-27701:2019 §6.3.1 records-of-processing
tests/e2e/standards/compliance/sox-404-evidence-trail.e2e.spec.ts:19: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/standards/compliance/sox-404-evidence-trail.e2e.spec.ts:20: * @compliance SOX §302 cfo-certification disclosure-controls
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:24: * @compliance EU 2014/55 b2g-e-invoicing-mandate
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:25: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:17: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/standards/ifrs/industry-template-pick.e2e.spec.ts:16: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:23: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:24: * @compliance EU 2015/2366 strong-customer-authentication
tests/e2e/standards/iso-3166-1/default-country-bg.e2e.spec.ts:19: * @compliance SOX §404 internal-controls process-walk-through
tests/e2e/tenant.e2e.spec.ts:13: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
tests/e2e/tenant.e2e.spec.ts:14: * @compliance SOC-2 CC6.1 logical-access-controls
tests/helpers/evidence.ts:20: * @compliance SOX §404 internal-controls process-walk-through
tests/helpers/evidence.ts:21: * @compliance ISO-27001 A.5.36 conformance-with-policies
tests/helpers/standards-fixtures.ts:27: * @compliance SOX §404 internal-controls process-walk-through
```

## @accounting

```text
src/accounting/debit-credit.ts:10: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/accounting/debit-credit.ts:11: * @accounting IFRS Conceptual-Framework recognition-derecognition
src/accounting/debit-credit.ts:12: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/accounting/debit-credit.ts:13: * @accounting US-GAAP ASC-810 consolidation
src/accounting/fields-money-fix.ts:11: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/accounting/fields-money-fix.ts:12: * @accounting US-GAAP ASC-210 balance-sheet
src/accounting/financial-analysis.ts:4: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/accounting/financial-analysis.ts:5: * @accounting IFRS IAS-7 statement-of-cash-flows
src/accounting/financial-analysis.ts:6: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/accounting/financial-analysis.ts:7: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/accounting/margin.ts:15: * @accounting IFRS IAS-2 inventories (cost) + IAS-1 (gross margin presentation)
src/accounting/reports.service.ts:15: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/accounting/reports.service.ts:16: * @accounting IFRS IAS-7 statement-of-cash-flows
src/accounting/reports.service.ts:17: * @accounting IFRS IFRS-9 expected-credit-loss aging
src/accounting/reports.service.ts:18: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/accounting/reports.service.ts:19: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/accounting/reports.service.ts:20: * @accounting US-GAAP ASC-310 receivables ar-aging
src/accounting/reports.service.ts:21: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/accounting/reports.service.ts:22: * @accounting US-GAAP ASC-405 liabilities ap-aging
src/accounting/reports.service.ts:23: * @accounting OECD SAF-T 2.0 standard-audit-file-tax
src/accounting/token-ledger.ts:16: * @accounting IFRS IAS-1 + IFRS-15 §B16 metered usage
src/ai/bank-matching.ts:14: * @accounting IFRS IAS-7 §44 reconciliation
src/analytics/BudgetVsActualCard.tsx:12: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/analytics/BudgetVsActualCard.tsx:13: * @accounting US-GAAP ASC-270 interim-reporting variance-analysis
src/analytics/CostAnalysisCard.tsx:11: * @accounting IFRS IAS-2 inventories cost-of-inventories
src/analytics/CostAnalysisCard.tsx:12: * @accounting US-GAAP ASC-330 inventory cost-of-goods-sold
src/analytics/FinancialRatiosCard.tsx:10: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/analytics/FinancialRatiosCard.tsx:9: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/analytics/KPIDashboard.tsx:11: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/analytics/KPIDashboard.tsx:12: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/analytics/types.ts:16: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/analytics/types.ts:17: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/app/(api)/api/subscriptions/create/route.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/app/(api)/api/subscriptions/create/route.ts:7: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/app/(api)/api/subscriptions/create/route.ts:8: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/bank/accounts/bank/reconciliations/index.ts:17: * @accounting IFRS IAS-7 §6 §44 cash-flow-reconciliation
src/bank/accounts/bank/reconciliations/index.ts:18: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/bank/accounts/bank/transactions/index.ts:43: * @accounting IFRS IAS-7 statement-of-cash-flows
src/bank/accounts/bank/transactions/index.ts:44: * @accounting US-GAAP ASC-230 cash-flows
src/bank/accounts/index.ts:12: * @accounting IFRS IAS-7 statement-of-cash-flows cash-and-equivalents
src/bank/accounts/payment/runs/index.ts:27: * @accounting IFRS IAS-7 statement-of-cash-flows
src/bank/accounts/payment/runs/index.ts:28: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:31: * @accounting IFRS IAS-7 statement-of-cash-flows payroll-disbursement
src/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:17: * @accounting IFRS IAS-19 employee-benefits
src/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:18: * @accounting US-GAAP ASC-710 compensation-general
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:39: * @accounting IFRS IAS-19 employee-benefits short-term
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:40: * @accounting IFRS IAS-19 §51 defined-contribution-plans
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:41: * @accounting IFRS IFRS-8 operating-segments
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:42: * @accounting US-GAAP ASC-710 compensation-general
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:43: * @accounting US-GAAP ASC-715 compensation-retirement-benefits
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:44: * @accounting US-GAAP ASC-280 segment-reporting
src/bank/accounts/payroll/runs/index.ts:22: * @accounting IFRS IAS-19 employee-benefits short-term
src/bank/accounts/payroll/runs/index.ts:23: * @accounting IFRS IAS-19 §51 defined-contribution-plans
src/bank/accounts/payroll/runs/index.ts:24: * @accounting IFRS IAS-26 §13 §14 §17 retirement-benefit-plan-reporting (employer-side contributions feed the §17 plan-asset disclosures)
src/bank/accounts/payroll/runs/index.ts:25: * @accounting US-GAAP ASC-710 compensation-general
src/bank/accounts/payroll/runs/index.ts:26: * @accounting US-GAAP ASC-715 compensation-retirement-benefits
src/bank/reconciliation.service/index.ts:483:   * @accounting IFRS IAS-7 statement-of-cash-flows
src/bank/reconciliation.service/index.ts:648:   * @accounting IFRS IAS-7 statement-of-cash-flows
src/bank/reconciliation.service/index.ts:649:   * @accounting US-GAAP ASC-310 receivables returned-checks
src/bank/reconciliation.service/index.ts:9: * @accounting IFRS IAS-7 statement-of-cash-flows
src/base/accounting/field/index.ts:8: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/billing/stripeWebhookHandlers.test.ts:8: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/billing/stripeWebhookHandlers.test.ts:9: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/billing/stripeWebhookHandlers.ts:22: * @accounting IFRS-15 revenue-from-contracts-with-customers
src/billing/stripeWebhookHandlers.ts:431: * @accounting IFRS IFRS-15 §B22 customer-options-for-refund
src/billing/stripeWebhookHandlers.ts:432: * @accounting US-GAAP ASC-606-10-25-13 contract-modification-with-refund
src/billing/test.ts:8: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/billing/test.ts:9: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/bookable/resources/bookings/index.ts:17: * @accounting IFRS IFRS-15 §35 over-time-recognition (multi-night stay)
src/bookable/resources/bookings/index.ts:18: * @accounting IFRS IFRS-15 §38 point-in-time-recognition (single-use)
src/bookable/resources/bookings/index.ts:19: * @accounting IFRS IFRS-15 §B20-B27 right-of-return cancellation-policy
src/bookable/resources/bookings/index.ts:20: * @accounting US-GAAP ASC-606-10-25-27 over-time-criteria
src/budget/plannings/index.ts:29: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/budget/plannings/index.ts:30: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/budget/plannings/index.ts:31: * @accounting US-GAAP ASC-270 interim-reporting
src/commitments/and/contingencies/index.ts:15: * @accounting IFRS IAS-37 §10 contingent-liability-definition
src/commitments/and/contingencies/index.ts:16: * @accounting IFRS IAS-37 §27-30 recognition-prohibition
src/commitments/and/contingencies/index.ts:17: * @accounting IFRS IAS-37 §86-92 disclosure-requirements
src/commitments/and/contingencies/index.ts:18: * @accounting IFRS IAS-1 §112(c) other-disclosures
src/commitments/and/contingencies/index.ts:19: * @accounting IFRS IFRS-15 §B50 onerous-contract-disclosure
src/commitments/and/contingencies/index.ts:20: * @accounting US-GAAP ASC-440 commitments
src/commitments/and/contingencies/index.ts:21: * @accounting US-GAAP ASC-450-20-50 loss-contingency-disclosure
src/config/country-apis/index.ts:136: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/config/country-specifics/index.ts:18: * @accounting IFRS IAS-1 §51 fiscal-period
src/config/country-specifics/index.ts:19: * @accounting US-GAAP ASC-270 interim-reporting fiscal-year
src/config/examples/index.ts:7: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/config/regional-defaults/index.ts:38: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates functional-currency
src/config/regional-defaults/index.ts:39: * @accounting US-GAAP ASC-830 foreign-currency-matters reporting-currency
src/config/types/index.ts:10: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/consolidation/eliminations/index.ts:14: * @accounting IFRS IFRS-10 §B86 consolidated-financial-statements
src/consolidation/eliminations/index.ts:15: * @accounting IFRS IAS-21 §39 foreign-currency-translation-on-consolidation
src/consolidation/eliminations/index.ts:16: * @accounting US-GAAP ASC-810-10-45 consolidation-elimination
src/consolidation/eliminations/index.ts:17: * @accounting US-GAAP ASC-830-30 foreign-currency-translation
src/cost/centers/index.ts:16: * @accounting IFRS IAS-1 §99 statement-of-comprehensive-income
src/cost/centers/index.ts:17: * @accounting IFRS IFRS-8 operating-segments
src/cost/centers/index.ts:18: * @accounting US-GAAP ASC-280 segment-reporting
src/cost/centers/job/positions/index.ts:10: * @accounting IFRS IAS-19 employee-benefits (planned-headcount accruals)
src/country/api/client/index.ts:340: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/country/api/client/index.ts:413: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/country/api/client/index.ts:476: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/country/client/bg-vat.ts:18: * @accounting IFRS IAS-1 presentation-rounding
src/csrd/disclosures/index.ts:20: * @accounting IFRS S1 general-sustainability-disclosure
src/csrd/disclosures/index.ts:21: * @accounting IFRS S2 climate-disclosures
src/currency/rates/index.ts:16: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/currency/rates/index.ts:17: * @accounting US-GAAP ASC-830 foreign-currency-matters
src/customer/segments/index.ts:10: * @accounting IFRS IFRS-15 §4 portfolio-practical-expedient
src/customer/segments/index.ts:11: * @accounting IFRS IFRS-8 §22 disclosure-of-segment-information
src/customers/contracts/performance/obligations/index.ts:22: * @accounting IFRS IFRS-15 §22 distinct-performance-obligation
src/customers/contracts/performance/obligations/index.ts:23: * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
src/customers/contracts/performance/obligations/index.ts:24: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/customers/contracts/performance/obligations/index.ts:25: * @accounting IFRS IFRS-15 §38 point-in-time-recognition
src/customers/contracts/performance/obligations/index.ts:26: * @accounting IFRS IFRS-15 §41-§43 progress-measurement
src/customers/contracts/performance/obligations/index.ts:27: * @accounting US-GAAP ASC-606-10-25-14 distinct-goods-services
src/customers/contracts/performance/obligations/index.ts:28: * @accounting US-GAAP ASC-606-10-25-31 progress-measurement
src/customers/index.ts:15: * @accounting IFRS IFRS-9 financial-instruments accounts-receivable
src/customers/index.ts:16: * @accounting US-GAAP ASC-310 receivables
src/customers/projects/index.ts:21: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/customers/projects/index.ts:22: * @accounting IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
src/customers/projects/index.ts:23: * @accounting IFRS IFRS-15 §126 milestone-billing
src/customers/projects/index.ts:24: * @accounting US-GAAP ASC-606-10-25-27 over-time-criteria
src/customers/projects/index.ts:25: * @accounting IFRS IAS-1 §125 estimation-uncertainty (project budgets)
src/customers/projects/project/milestones/index.ts:12: * @accounting IFRS IFRS-15 §126 milestone-billing
src/customers/projects/project/milestones/index.ts:13: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/customers/projects/project/milestones/index.ts:14: * @accounting US-GAAP ASC-606-10-25-30 milestone-method
src/customers/projects/project/tasks/index.ts:14: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/customers/projects/project/tasks/index.ts:15: * @accounting IFRS IFRS-15 §B18 cost-to-cost
src/customers/projects/wip/snapshots/index.ts:17: * @accounting IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
src/customers/projects/wip/snapshots/index.ts:18: * @accounting IFRS IFRS-15 §107 §108 §109 contract-asset-contract-liability
src/customers/projects/wip/snapshots/index.ts:19: * @accounting US-GAAP ASC-606-10-45-1 contract-asset
src/customers/quotes/index.ts:10: * @accounting IFRS IFRS-15 §10 contract-with-customer
src/customers/quotes/index.ts:11: * @accounting US-GAAP ASC-606-10-25 contract-existence
src/customers/sales/orders/index.ts:30: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/customers/sales/orders/index.ts:31: * @accounting IFRS IFRS-15 §10 contract-with-customer (order = contract or modification)
src/customers/sales/orders/index.ts:32: * @accounting IFRS IFRS-15 §31 transfer-of-control
src/customers/sales/orders/index.ts:33: * @accounting US-GAAP ASC-606 revenue-from-contracts
src/customers/sales/orders/returns/index.ts:5: * @accounting IFRS IFRS-15 §B22 right-of-return-revenue-reversal
src/customers/sales/orders/returns/index.ts:6: * @accounting IFRS IAS-2 inventories return-to-stock
src/customers/sales/orders/returns/index.ts:7: * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
src/customers/sales/orders/returns/index.ts:8: * @accounting US-GAAP ASC-330 inventory cost-flow
src/customers/sales/orders/shipments/tracking/events/index.ts:16: * @accounting IFRS IFRS-15 §38 point-in-time-revenue-recognition
src/dashboard/index.tsx:18: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/depreciation.service/index.ts:23: * @accounting IFRS IAS-16 §62 depreciation-methods
src/depreciation.service/index.ts:24: * @accounting IFRS IAS-36 impairment-of-assets
src/depreciation.service/index.ts:25: * @accounting US-GAAP ASC-360-10-35 depreciation
src/depreciation.service/index.ts:26: * @accounting OECD SAF-T §3 fixed-asset-register
src/ecommerce/configureEcommercePlugin/index.ts:17: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ecommerce/configureEcommercePlugin/index.ts:18: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:22: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:23: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:24: * @accounting IFRS IAS-2 inventories cogs-recognition
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:25: * @accounting US-GAAP ASC-330 inventory cogs-recognition
src/ecommerce/productValidation/index.ts:4: * @accounting IFRS IAS-2 inventories quantity-tracking
src/ecommerce/productValidation/index.ts:5: * @accounting US-GAAP ASC-330 inventory
src/ecommerce/stripe/tenantConfirmOrder.ts:10: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ecommerce/stripe/tenantConfirmOrder.ts:11: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/employees/expense/reports/index.ts:11: * @accounting IFRS IAS-19 employee-benefits
src/employees/expense/reports/index.ts:12: * @accounting IFRS IAS-21 §28 fx-on-reimbursement
src/employees/index.ts:16: * @accounting IFRS IAS-19 employee-benefits
src/employees/index.ts:17: * @accounting US-GAAP ASC-710 compensation-general
src/employees/index.ts:18: * @accounting US-GAAP ASC-715 compensation-retirement-benefits
src/employees/leave/requests/index.ts:21: * @accounting IFRS IAS-19 §11 §13 §14 short-term-employee-benefits
src/employees/leave/requests/index.ts:22: * @accounting IFRS IAS-19 §16 accumulating-paid-absences
src/employees/leave/requests/index.ts:23: * @accounting US-GAAP ASC-710-10-25 compensated-absences
src/employees/sales/commissions/index.ts:13: * @accounting IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining
src/employees/sales/commissions/index.ts:14: * @accounting IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation
src/employees/sales/commissions/index.ts:15: * @accounting US-GAAP ASC-340-40-25-1 incremental-costs
src/employees/time/entries/index.ts:10: * @accounting IFRS IAS-19 employee-benefits short-term
src/employees/time/entries/index.ts:11: * @accounting US-GAAP ASC-710 compensation-general
src/employees/time/entries/index.ts:12: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress
src/en/16931/types.ts:16: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/en/16931/types.ts:17: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/factory/collection-factory.ts:74: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/feature/registry/index.ts:30: * @accounting IFRS IFRS-15 §22 performance-obligations
src/feature/registry/index.ts:31: * @accounting IFRS IFRS-15 §B16 usage-based-revenue
src/financial/reporting.service/index.ts:10: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/financial/reporting.service/index.ts:7: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/financial/reporting.service/index.ts:8: * @accounting IFRS IAS-7 statement-of-cash-flows
src/financial/reporting.service/index.ts:9: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/financial/statements/index.ts:19: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/financial/statements/index.ts:20: * @accounting IFRS IAS-34 §8 §10 interim-financial-reporting (when statementType ∈ Q1/Q2/Q3 the §10 condensed format applies)
src/financial/statements/index.ts:21: * @accounting IFRS IFRS-18 §9 §10 §40 presentation-and-disclosure (effective 2027-01 — replaces IAS-1 with structured operating/investing/financing categories)
src/financial/statements/index.ts:22: * @accounting IFRS IFRS-7 §31-§42 financial-instruments-disclosures (statement notes consume IFRS-7 risk-management disclosures)
src/financial/statements/index.ts:23: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/financial/statements/index.ts:24: * @accounting US-GAAP ASC-270 interim-reporting
src/fiscal/devices/sales/index.ts:24: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/fiscal/devices/sales/index.ts:25: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/fiscal/periods/carbon/emissions/index.ts:20: * @accounting IFRS S2 §29-32 climate-related-metrics
src/fiscal/periods/index.ts:24: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/fiscal/periods/index.ts:25: * @accounting US-GAAP ASC-210 balance-sheet
src/fiscal/periods/prior/period/adjustments/index.ts:13: * @accounting IFRS IAS-8 §42-49 errors-of-prior-periods
src/fiscal/periods/prior/period/adjustments/index.ts:14: * @accounting US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections
src/fiscal/periods/prior/period/adjustments/index.ts:15: * @accounting US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments
src/fiscal/periods/provisions/index.ts:16: * @accounting IFRS IAS-37 §14 recognition-of-provisions
src/fiscal/periods/provisions/index.ts:17: * @accounting IFRS IAS-37 §36 §37 §39 measurement-best-estimate
src/fiscal/periods/provisions/index.ts:18: * @accounting IFRS IAS-37 §66 §67 onerous-contracts
src/fiscal/periods/provisions/index.ts:19: * @accounting IFRS IAS-37 §70 §83 disclosure-requirements
src/fiscal/periods/provisions/index.ts:20: * @accounting US-GAAP ASC-450-20-25 loss-contingencies
src/fiscal/periods/provisions/index.ts:21: * @accounting US-GAAP ASC-410 asset-retirement-obligations
src/fixed/assets/depreciation/schedules/hooks/depreciation.ts:20: * @accounting IFRS IAS-16 §62 depreciation-methods
src/fixed/assets/depreciation/schedules/hooks/depreciation.ts:21: * @accounting IFRS IAS-36 impairment-of-assets
src/fixed/assets/depreciation/schedules/hooks/depreciation.ts:22: * @accounting US-GAAP ASC-360-10-35 depreciation
src/fixed/assets/depreciation/schedules/index.ts:10: * @accounting IFRS IAS-16 property-plant-and-equipment depreciation
src/fixed/assets/depreciation/schedules/index.ts:11: * @accounting IFRS IAS-36 impairment-of-assets
src/fixed/assets/depreciation/schedules/index.ts:12: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/fixed/assets/index.ts:26: * @accounting IFRS IAS-16 property-plant-and-equipment
src/fixed/assets/index.ts:27: * @accounting IFRS IAS-36 impairment-of-assets
src/fixed/assets/index.ts:28: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/fx/transactions/index.ts:13: * @accounting IFRS IAS-21 §21 §23 §28 §29 effects-of-changes-in-foreign-exchange-rates
src/fx/transactions/index.ts:14: * @accounting IFRS IAS-21 §39 foreign-currency-translation
src/fx/transactions/index.ts:15: * @accounting IFRS IAS-32 §11 financial-instruments-presentation (every FX-revaluation row meets the IAS-32 financial-instrument definition)
src/fx/transactions/index.ts:16: * @accounting IFRS IFRS-7 §22 hedging-disclosures (when FX-revaluation is part of a designated hedge per IFRS-9)
src/fx/transactions/index.ts:17: * @accounting US-GAAP ASC-830-10-45 foreign-currency-translation
src/fx/transactions/index.ts:18: * @accounting US-GAAP ASC-830-20 foreign-currency-transactions
src/gl/account.service/index.ts:5: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/gl/account.service/index.ts:6: * @accounting US-GAAP ASC-210 balance-sheet
src/gl/account.service/index.ts:7: * @accounting OECD SAF-T §2 general-ledger-accounts
src/gl/account/resolver/index.ts:25: * @accounting IFRS IAS-1 chart-of-accounts
src/gl/account/resolver/index.ts:26: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/gl/accounts/account/reconciliations/index.ts:23: * @accounting IFRS IAS-7 statement-of-cash-flows bank-reconciliation
src/gl/accounts/bank/statements/hooks/bank-statement.ts:25: * @accounting IFRS IAS-7 statement-of-cash-flows
src/gl/accounts/bank/statements/index.ts:23: * @accounting IFRS IAS-7 statement-of-cash-flows
src/gl/accounts/index.ts:11: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/gl/accounts/index.ts:12: * @accounting US-GAAP ASC-210 balance-sheet
src/gl/accounts/index.ts:13: * @accounting OECD SAF-T §2 general-ledger-accounts
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.test.ts:12: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.test.ts:13: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts:28: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts:29: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts:30: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/gl/accounts/period/end/adjustments/index.ts:20: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/gl/accounts/period/end/adjustments/index.ts:21: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/gl/accounts/period/end/adjustments/index.ts:22: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/gl/accounts/recurring/journals/index.ts:17: * @accounting IFRS IAS-1 §27 accrual-basis-of-accounting
src/gl/accounts/recurring/journals/index.ts:18: * @accounting IFRS IAS-1 §29 §30 separate-presentation
src/gl/accounts/recurring/journals/index.ts:19: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/gl/accounts/recurring/journals/index.ts:20: * @accounting US-GAAP ASC-720 other-expenses
src/gl/accounts/tax/calculations/index.ts:22: * @accounting OECD SAF-T tax-table
src/gl/posting.service/index.ts:10: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/gl/posting.service/index.ts:11: * @accounting OECD SAF-T §3 transactions
src/gl/posting.service/index.ts:583:   * @accounting IFRS IAS-16 §62 depreciation-methods
src/gl/posting.service/index.ts:584:   * @accounting US-GAAP ASC-360-10-35 depreciation
src/gl/posting.service/index.ts:653:   * @accounting IFRS IAS-2 §10 §28 §36 inventories
src/gl/posting.service/index.ts:654:   * @accounting US-GAAP ASC-330-10-30 inventory-valuation
src/gl/posting.service/index.ts:797:   * @accounting IFRS IAS-7 §6 statement-of-cash-flows reconciliation
src/gl/posting/rules/index.ts:9:  * @accounting IFRS IAS-1 double-entry
src/government/grants/index.ts:13: * @accounting IFRS IAS-20 §7 §8 §10 recognition
src/government/grants/index.ts:14: * @accounting IFRS IAS-20 §12 §13 income-or-asset-presentation
src/government/grants/index.ts:15: * @accounting IFRS IAS-20 §17 §18 §28 §32 disclosure
src/government/grants/index.ts:16: * @accounting IFRS IAS-20 §39 disclosure-government-assistance
src/government/grants/index.ts:17: * @accounting US-GAAP ASC-958-605 contributions
src/government/grants/index.ts:18: * @accounting US-GAAP ASC-832 government-assistance-disclosure
src/ifrs/15/collection-alignment.test.ts:13: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ifrs/15/collection-alignment.test.ts:14: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ifrs/15/index.ts:4: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ifrs/15/index.ts:5: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ifrs/15/types.test.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ifrs/15/types.test.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ifrs/15/types.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ifrs/15/types.ts:123: * @accounting IFRS IFRS-15 §22 performance-obligation
src/ifrs/15/types.ts:124: * @accounting IFRS IFRS-15 §27 distinct-criteria
src/ifrs/15/types.ts:125: * @accounting US-GAAP ASC-606-10-25-14 performance-obligation
src/ifrs/15/types.ts:193: * @accounting IFRS IFRS-15 §47 transaction-price
src/ifrs/15/types.ts:194: * @accounting US-GAAP ASC-606-10-32 transaction-price
src/ifrs/15/types.ts:229: * @accounting IFRS IFRS-15 §50-§59 variable-consideration
src/ifrs/15/types.ts:230: * @accounting IFRS IFRS-15 §56 constraint
src/ifrs/15/types.ts:24: * @accounting IFRS IFRS-15 §32 recognition-timing
src/ifrs/15/types.ts:251: * @accounting IFRS IFRS-15 §73-§86 allocation
src/ifrs/15/types.ts:252: * @accounting US-GAAP ASC-606-10-32-28 allocation
src/ifrs/15/types.ts:25: * @accounting US-GAAP ASC-606-10-25-30 recognition-timing
src/ifrs/15/types.ts:278: * @accounting IFRS IFRS-15 §31-§38 recognition
src/ifrs/15/types.ts:279: * @accounting US-GAAP ASC-606-10-25 recognition
src/ifrs/15/types.ts:318: * @accounting IFRS IFRS-15 §107 contract-asset
src/ifrs/15/types.ts:319: * @accounting US-GAAP ASC-606-10-45-3 contract-asset
src/ifrs/15/types.ts:32: * @accounting IFRS IFRS-15 §41-§43 progress-measurement
src/ifrs/15/types.ts:335: * @accounting IFRS IFRS-15 §106 contract-liability
src/ifrs/15/types.ts:336: * @accounting US-GAAP ASC-606-10-45-2 contract-liability
src/ifrs/15/types.ts:33: * @accounting US-GAAP ASC-606-10-25-31 progress-measurement
src/ifrs/15/types.ts:353: * @accounting IFRS IFRS-15 §B22 refund-liability
src/ifrs/15/types.ts:354: * @accounting US-GAAP ASC-606-10-32-10 refund-liability
src/ifrs/15/types.ts:62: * @accounting IFRS IFRS-15 §53 variable-consideration-estimation
src/ifrs/15/types.ts:78: * @accounting IFRS IFRS-15 §10 contract-identification
src/ifrs/15/types.ts:79: * @accounting IFRS IFRS-15 §17 contract-combination
src/ifrs/15/types.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ifrs/15/validate.ts:5: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/ifrs/15/validate.ts:6: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/ifrs/16/index.ts:4: * @accounting IFRS IFRS-16 leases
src/ifrs/16/index.ts:5: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/ifrs/16/types.test.ts:10: * @accounting IFRS IFRS-16 leases
src/ifrs/16/types.test.ts:11: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/ifrs/16/types.ts:103: * @accounting IFRS IFRS-16 §36 effective-interest-method
src/ifrs/16/types.ts:104: * @accounting US-GAAP ASC-842-20-35 subsequent-measurement-lessee
src/ifrs/16/types.ts:10: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/ifrs/16/types.ts:130: * @accounting IFRS IFRS-16 §44-§46 modifications
src/ifrs/16/types.ts:156: * @accounting IFRS IFRS-16 §22-§24 rou-asset-initial-measurement
src/ifrs/16/types.ts:157: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/ifrs/16/types.ts:192: * @accounting IFRS IFRS-16 §26-§28 liability-initial-measurement
src/ifrs/16/types.ts:193: * @accounting IFRS IFRS-16 §36-§38 liability-subsequent-measurement
src/ifrs/16/types.ts:212: * @accounting IFRS IFRS-16 leases
src/ifrs/16/types.ts:213: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/ifrs/16/types.ts:31: * @accounting IFRS IFRS-16 §5 recognition-exemptions
src/ifrs/16/types.ts:32: * @accounting IFRS IFRS-16 §22 initial-recognition
src/ifrs/16/types.ts:33: * @accounting US-GAAP ASC-842-10-25-2 finance-vs-operating
src/ifrs/16/types.ts:56: * @accounting IFRS IFRS-16 §26 discount-rate-selection
src/ifrs/16/types.ts:74: * @accounting IFRS IFRS-16 §44-§46 modifications
src/ifrs/16/types.ts:75: * @accounting US-GAAP ASC-842-10-25-8 lease-modifications
src/ifrs/16/types.ts:9: * @accounting IFRS IFRS-16 leases lessee
src/ifrs/16/validate.ts:5: * @accounting IFRS IFRS-16 leases
src/ifrs/16/validate.ts:6: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/invoices/credit/memos/index.ts:21: * @accounting IFRS IFRS-15 §B22 refund-liability
src/invoices/credit/memos/index.ts:22: * @accounting IFRS IFRS-15 §B47 contract-cancellation
src/invoices/credit/memos/index.ts:23: * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
src/invoices/credit/memos/refunds/index.ts:11: * @accounting IFRS IFRS-15 §B22 refund-liability-settlement
src/invoices/credit/memos/refunds/index.ts:12: * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
src/invoices/dunning/cycles/index.ts:23: * @accounting IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach
src/invoices/dunning/cycles/index.ts:24: * @accounting US-GAAP ASC-326-20 cecl-credit-losses
src/invoices/dunning/cycles/index.ts:25: * @accounting US-GAAP ASC-310 receivables
src/invoices/hooks/bill.ts:17: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/invoices/hooks/bill.ts:18: * @accounting US-GAAP ASC-405 liabilities
src/invoices/hooks/bill.ts:19: * @accounting US-GAAP ASC-705 cost-of-sales-and-services
src/invoices/hooks/gl-hooks-emit-events.test.ts:14: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/invoices/hooks/gl-hooks-emit-events.test.ts:15: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/invoices/hooks/gl-hooks-emit-events.test.ts:16: * @accounting IFRS IAS-7 statement-of-cash-flows
src/invoices/hooks/gl-hooks-emit-events.test.ts:17: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/invoices/hooks/invoice.ts:20: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/invoices/hooks/invoice.ts:21: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/invoices/hooks/invoice.ts:22: * @accounting US-GAAP ASC-310 receivables
src/invoices/hooks/invoice.ts:23: * @accounting US-GAAP ASC-330 inventory cogs-recognition
src/invoices/index.ts:60: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/invoices/index.ts:61: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/invoices/invoice/lines/hooks/recomputeInvoiceTotals.ts:18: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/invoices/invoice/lines/hooks/recomputeItemInventory.ts:18: * @accounting IFRS IAS-2 inventories
src/invoices/invoice/lines/index.ts:47: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/invoices/invoice/lines/index.ts:48: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/invoices/payments/hooks/afterChange.ts:13: * @accounting IFRS IAS-7 statement-of-cash-flows
src/invoices/payments/hooks/afterChange.ts:14: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/invoices/payments/hooks/beforeChange.ts:8: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/invoices/payments/hooks/payment.ts:34: * @accounting IFRS IAS-7 statement-of-cash-flows
src/invoices/payments/hooks/payment.ts:35: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/invoices/payments/hooks/payment.ts:36: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers settlement
src/invoices/payments/hooks/recomputeInvoicePaid.ts:15: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/invoices/payments/index.ts:30: * @accounting IFRS IAS-7 statement-of-cash-flows
src/invoices/payments/index.ts:31: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/invoices/payments/payment/allocations/index.ts:19: * @accounting IFRS IFRS-15 §47 §53 transaction-price-allocation
src/invoices/payments/payment/allocations/index.ts:20: * @accounting US-GAAP ASC-606-10-32 transaction-price
src/invoices/payments/payment/allocations/index.ts:21: * @accounting IFRS IAS-7 §6 cash-flow-classification
src/iso/20022/types.ts:14: * @accounting IFRS IAS-7 statement-of-cash-flows
src/iso/3166/1/country/bg-clients.test.ts:15: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/iso/3166/1/country/bg.ts:27: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/iso/3166/1/country/eu-fallback-rates.test.ts:13: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/items/batches/index.ts:22: * @accounting IFRS IAS-2 §23-§27 cost-formula-specific-identification
src/items/bills/of/materials/index.ts:19: * @accounting IFRS IAS-2 §10 §13 cost-of-conversion
src/items/bills/of/materials/index.ts:20: * @accounting IFRS IAS-2 §13 systematic-allocation-of-fixed-overheads
src/items/bills/of/materials/index.ts:21: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/items/bills/of/materials/work/orders/cost/variances/index.ts:12: * @accounting IFRS IAS-2 §21 standard-cost-method
src/items/bills/of/materials/work/orders/cost/variances/index.ts:13: * @accounting US-GAAP ASC-330-10-30 standard-cost-variance-recognition
src/items/bills/of/materials/work/orders/operation/runs/index.ts:17: * @accounting IFRS IAS-2 §12 cost-of-conversion
src/items/bills/of/materials/work/orders/operation/runs/index.ts:18: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/items/bills/of/materials/work/orders/production/receipts/index.ts:14: * @accounting IFRS IAS-2 §10 §12 cost-of-conversion
src/items/bills/of/materials/work/orders/production/receipts/index.ts:15: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/items/bills/of/materials/work/orders/routings/index.ts:15: * @accounting IFRS IAS-2 §12 cost-of-conversion operation-time
src/items/bills/of/materials/work/orders/routings/index.ts:16: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/items/hooks/afterChange.ts:10: * @accounting IFRS IAS-2 inventories
src/items/hooks/afterChange.ts:11: * @accounting US-GAAP ASC-330 inventory cost-of-goods-sold
src/items/hooks/item.ts:18: * @accounting IFRS IAS-2 inventories
src/items/hooks/item.ts:19: * @accounting US-GAAP ASC-330 inventory cost-flow
src/items/index.ts:23: * @accounting IFRS IAS-2 inventories
src/items/index.ts:24: * @accounting US-GAAP ASC-330 inventory
src/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:12: * @accounting IFRS IAS-2 §10 §28 §36 inventories
src/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:13: * @accounting US-GAAP ASC-330 inventory
src/items/inventory/movements/hooks/inventory-movement.ts:17: * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
src/items/inventory/movements/hooks/inventory-movement.ts:18: * @accounting IFRS IAS-2 §28 net-realisable-value
src/items/inventory/movements/hooks/inventory-movement.ts:19: * @accounting US-GAAP ASC-330 inventory
src/items/inventory/movements/index.ts:13: * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
src/items/inventory/movements/index.ts:14: * @accounting US-GAAP ASC-330 inventory cost-flow
src/items/inventory/movements/index.ts:15: * @accounting US-GAAP ASC-606 cogs-recognition
src/items/purchase/orders/goods/receipts/index.ts:23: * @accounting IFRS IAS-2 inventories goods-in-transit
src/items/purchase/orders/goods/receipts/index.ts:24: * @accounting IFRS-15 §38-42 revenue-recognition FOB-point-timing
src/items/purchase/orders/goods/receipts/index.ts:25: * @accounting US-GAAP ASC-330 inventory at-cost
src/items/purchase/orders/index.ts:39: * @accounting IFRS IAS-37 provisions-and-contingent-liabilities commitment
src/items/purchase/orders/index.ts:40: * @accounting IFRS-15 §38-42 revenue-recognition FOB-driven-GL-posting-timing
src/items/purchase/orders/index.ts:41: * @accounting US-GAAP ASC 405 liabilities accounts-payable
src/jobs/bnbRatesSync/index.ts:20: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/jobs/dunningJob.test.ts:5: * @accounting IFRS IFRS-9 expected-credit-loss impairment
src/jobs/dunningJob.test.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/jobs/dunningJob.test.ts:7: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/jobs/dunningJob.test.ts:8: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/jobs/dunningJob/index.ts:10: * @accounting IFRS IFRS-9 expected-credit-loss impairment
src/jobs/dunningJob/index.ts:11: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/jobs/dunningJob/index.ts:12: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/jobs/dunningJob/index.ts:13: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/journal/entries/gl/postings/index.ts:27: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/journal/entries/gl/postings/index.ts:28: * @accounting OECD SAF-T §3 transactions
src/journal/entries/hooks/balanced-entry.ts:23: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/journal/entries/hooks/balanced-entry.ts:24: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/journal/entries/hooks/balanced-entry.ts:25: * @accounting OECD SAF-T §3 journal-entries
src/journal/entries/index.ts:30: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/journal/entries/index.ts:31: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/journal/entries/index.ts:32: * @accounting OECD SAF-T §3 journal-entries
src/journal/entries/rounding/adjustments/index.ts:12: * @accounting IFRS IAS-1 §51(e) level-of-rounding-disclosure
src/journal/entries/rounding/adjustments/index.ts:13: * @accounting IFRS IAS-21 §39 foreign-currency-translation
src/journal/entries/rounding/adjustments/index.ts:14: * @accounting US-GAAP ASC-205-10-45 presentation-rounding
src/journal/entry/service/index.ts:14: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/journal/entry/service/index.ts:15: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/journal/entry/service/index.ts:16: * @accounting OECD SAF-T §3 journal-entries
src/journal/entry/service/index.ts:35:   * @accounting IFRS IFRS-8 operating-segments
src/journal/entry/service/index.ts:36:   * @accounting US-GAAP ASC-280 segment-reporting
src/leads/opportunities/index.ts:11: * @accounting IFRS IFRS-15 §9 contract-existence-criteria
src/lease.service/index.ts:104: * @accounting IFRS IFRS-16 §26 present-value-of-payments
src/lease.service/index.ts:158: * @accounting IFRS IFRS-16 §22-§24 rou-asset-initial-measurement
src/lease.service/index.ts:159: * @accounting IFRS IFRS-16 §26-§28 liability-initial-measurement
src/lease.service/index.ts:224: * @accounting IFRS IFRS-16 §31 §36 §38 amortisation
src/lease.service/index.ts:24: * @accounting IFRS IFRS-16 §22-§24 rou-asset-initial-measurement
src/lease.service/index.ts:25: * @accounting IFRS IFRS-16 §26-§28 liability-initial-measurement
src/lease.service/index.ts:26: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/lease.service/index.ts:27: * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
src/lease.service/index.ts:28: * @accounting US-GAAP ASC-842-20-30 initial-measurement
src/lease.service/index.ts:29: * @accounting US-GAAP ASC-842-20-35 subsequent-measurement
src/lease.service/index.ts:303: * @accounting IFRS IFRS-16 §36-§38 effective-interest-method
src/lease.service/index.ts:59: * @accounting IFRS IFRS-16 §36 effective-interest-method
src/lease.service/lease-service.test.ts:10: * @accounting US-GAAP ASC-842-20-30 / -35
src/lease.service/lease-service.test.ts:9: * @accounting IFRS IFRS-16 §22-§38
src/leases/index.ts:49: * @accounting IFRS IFRS-16 leases lessee-recognition
src/leases/index.ts:50: * @accounting IFRS IFRS-16 §22-§35 initial-measurement-rou-asset
src/leases/index.ts:51: * @accounting IFRS IFRS-16 §26-§28 initial-measurement-lease-liability
src/leases/index.ts:52: * @accounting IFRS IFRS-16 §29-§31 subsequent-measurement-rou
src/leases/index.ts:53: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/leases/index.ts:54: * @accounting US-GAAP ASC-842-20-25 finance-vs-operating-lease
src/leases/lease/modifications/index.ts:19: * @accounting IFRS IFRS-16 §44 separate-lease-criterion
src/leases/lease/modifications/index.ts:20: * @accounting IFRS IFRS-16 §45 not-separate-lease-modification
src/leases/lease/modifications/index.ts:21: * @accounting IFRS IFRS-16 §46 partial-or-full-termination
src/leases/lease/modifications/index.ts:22: * @accounting IFRS IFRS-16 §B43 §B44 lease-modification-examples
src/leases/lease/modifications/index.ts:23: * @accounting US-GAAP ASC-842-10-25-8 lease-modification-classification
src/leases/lease/modifications/index.ts:24: * @accounting US-GAAP ASC-842-10-25-11 ASC-842-10-25-12 ASC-842-10-25-13
src/leases/lease/period/postings/hooks/lease-period-posting.test.ts:27: * @accounting IFRS IFRS-16 §29-§31 §36-§38 leases
src/leases/lease/period/postings/hooks/lease-period-posting.test.ts:28: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/leases/lease/period/postings/hooks/lease-period-posting.ts:29: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/leases/lease/period/postings/hooks/lease-period-posting.ts:30: * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
src/leases/lease/period/postings/hooks/lease-period-posting.ts:31: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/leases/lease/period/postings/index.ts:23: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/leases/lease/period/postings/index.ts:24: * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
src/leases/lease/period/postings/index.ts:25: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/legal/entities/closing/entries/index.ts:14:  * @accounting IFRS IAS-1 presentation-of-financial-statements
src/legal/entities/closing/entries/index.ts:15: * @accounting US-GAAP ASC-205 presentation
src/legal/entities/consolidations/audit/reports/post/close/analytics/reports/index.ts:13:  * @accounting IFRS IAS-1 financial-statement-analysis
src/legal/entities/consolidations/index.ts:13:  * @accounting IFRS-10 consolidated-financial-statements
src/legal/entities/consolidations/index.ts:14: * @accounting IAS-27 separate-financial-statements
src/legal/entities/consolidations/index.ts:15: * @accounting US-GAAP ASC-810 consolidation
src/legal/entities/debt/schedules/index.ts:4: * @accounting IFRS-9 financial-instruments
src/legal/entities/debt/schedules/index.ts:5: * @accounting IAS-1 current-non-current-classification
src/legal/entities/debt/schedules/index.ts:6: * @accounting US-GAAP ASC-470 debt
src/legal/entities/disclosure/checklists/index.ts:4: * @accounting IFRS IAS-1 disclosure-requirements
src/legal/entities/index.ts:25: * @accounting IFRS IFRS-10 §B86 consolidation-procedures
src/legal/entities/index.ts:26: * @accounting IFRS IFRS-12 §10 §11 §B4-B6 disclosure-of-interests-in-other-entities
src/legal/entities/index.ts:27: * @accounting IFRS IAS-27 §9 separate-financial-statements (parent-only FS use this same legal-entity registry)
src/legal/entities/index.ts:28: * @accounting IFRS IFRS-18 §9 §10 presentation-and-disclosure (effective 2027-01 — entity-level taxonomy)
src/legal/entities/index.ts:29: * @accounting IFRS IAS-21 §9 functional-currency
src/legal/entities/index.ts:30: * @accounting IFRS IAS-1 §138 disclosure-of-name-and-domicile
src/legal/entities/index.ts:31: * @accounting US-GAAP ASC-810-10-45 consolidation
src/legal/entities/index.ts:32: * @accounting US-GAAP ASC-280 segment-reporting
src/legal/entities/intercompany/transactions/index.ts:14: * @accounting IFRS IFRS-10 §B86 consolidated-financial-statements
src/legal/entities/intercompany/transactions/index.ts:15: * @accounting IFRS IAS-24 related-party-disclosures
src/legal/entities/intercompany/transactions/index.ts:16: * @accounting US-GAAP ASC-810-10 consolidation
src/legal/entities/intercompany/transactions/index.ts:17: * @accounting US-GAAP ASC-850 related-party-disclosures
src/legal/entities/related/party/transactions/index.ts:4: * @accounting IAS-24 related-party-disclosures
src/legal/entities/related/party/transactions/index.ts:5: * @accounting US-GAAP ASC-850 related-party-disclosures
src/legal/entities/segment/reportings/index.ts:4: * @accounting IFRS-8 operating-segments
src/legal/entities/segment/reportings/index.ts:5: * @accounting US-GAAP ASC-280 segment-reporting
src/lot/variants/index.ts:24: * @accounting double-entry — every counter is a balanced number; the variant
src/lots/index.ts:27: * @accounting double-entry — the lot total IS the sum of its variant postings;
src/maintenance/work/orders/index.ts:18: * @accounting IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance
src/maintenance/work/orders/index.ts:19: * @accounting IFRS IAS-2 §10 cost-of-purchase materials-issued
src/maintenance/work/orders/index.ts:20: * @accounting US-GAAP ASC-360 ppe-maintenance
src/marketing/CountryShowcase.tsx:10: * @accounting IFRS / US-GAAP / FRS / JGAAP / ASBE / INDAS
src/marketing/PricingTable.tsx:12: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/marketing/PricingTable.tsx:13: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/media/sepa/mandates/index.ts:18: * @accounting IFRS IFRS-9 financial-instruments
src/media/sepa/mandates/index.ts:19: * @accounting US-GAAP ASC-310 receivables
src/modal/CreateJournalEntryModal.tsx:11: * @accounting IFRS double-entry-bookkeeping
src/modal/CreateJournalEntryModal.tsx:12: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/money/index.ts:5: * @accounting IFRS IAS-21 foreign-currency-translation
src/money/money.test.ts:7: * @accounting IFRS IAS-21 foreign-currency-translation
src/money/money.ts:5: * @accounting IFRS IAS-21 foreign-currency-translation
src/money/money.ts:6: * @accounting US-GAAP ASC-830 foreign-currency-matters
src/money/test.ts:7: * @accounting IFRS IAS-21 foreign-currency-translation
src/multi/currency.service/index.ts:16: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates functional-currency
src/multi/currency.service/index.ts:17: * @accounting IFRS IAS-29 financial-reporting-in-hyperinflationary-economies
src/multi/currency.service/index.ts:18: * @accounting US-GAAP ASC-830 foreign-currency-matters reporting-currency
src/pack/items/index.ts:30: * @accounting IFRS IAS-2 §10 finished-goods at dispatch
src/packs/index.ts:34: * @accounting IFRS IAS-2 §10 finished-goods carried to dispatch
src/page/AnalyticsPage.tsx:14: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/party/aging.service.ts:10: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/party/aging.service.ts:11: * @accounting US-GAAP ASC-310 receivables
src/party/aging.service.ts:12: * @accounting US-GAAP ASC-405 liabilities
src/party/aging.service.ts:9: * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
src/payable/aging.service.ts:10: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/payable/aging.service.ts:7: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/payable/aging.service.ts:8: * @accounting IFRS IAS-7 statement-of-cash-flows
src/payable/aging.service.ts:9: * @accounting US-GAAP ASC-405 liabilities
src/payable/analytics.service.ts:4: * @accounting US-GAAP ASC-405 liabilities
src/payable/analytics.service.ts:5: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/payable/discounts.service.ts:11: * @accounting US-GAAP ASC-705 cost-of-sales-and-services discount-recognition
src/payable/index.ts:7: * @accounting US-GAAP ASC-405 liabilities
src/payable/workflow.service.ts:10: * @accounting US-GAAP ASC-405 liabilities
src/payable/workflow.service.ts:9: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/payload.config.ts:515:       * @accounting IFRS IFRS-9 impairment-and-credit-losses
src/payload.config.ts:516:       * @accounting US-GAAP ASC-326 measurement-of-credit-losses
src/payload.config.ts:537:       * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/period/end/adjustment.service/index.ts:23: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/period/end/adjustment.service/index.ts:24: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/period/end/adjustment.service/index.ts:25: * @accounting IFRS IAS-16 property-plant-and-equipment depreciation
src/period/end/adjustment.service/index.ts:26: * @accounting IFRS IAS-19 employee-benefits payroll-accrual
src/period/end/adjustment.service/index.ts:27: * @accounting IFRS IAS-23 borrowing-costs interest-accrual
src/period/end/adjustment.service/index.ts:28: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/period/end/adjustment.service/index.ts:29: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/period/end/adjustment.service/index.ts:30: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/period/end/adjustment.service/index.ts:31: * @accounting US-GAAP ASC-405 liabilities accrued-expenses
src/period/locks/index.ts:13: * @accounting IFRS IAS-1 reporting-period
src/product/price/index.ts:21: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/product/price/index.ts:22: * @accounting US-GAAP ASC-830 foreign-currency-matters
src/properties/index.ts:19: * @accounting IFRS IAS-16 property-plant-and-equipment owned-property
src/properties/index.ts:20: * @accounting IFRS IFRS-16 §22 right-of-use-asset leased-property
src/properties/index.ts:21: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/receivable/aging.service.ts:7: * @accounting IFRS IFRS-9 financial-instruments expected-credit-loss
src/receivable/aging.service.ts:8: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/receivable/aging.service.ts:9: * @accounting US-GAAP ASC-310 receivables
src/receivable/allowance.service.ts:4: * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
src/receivable/allowance.service.ts:5: * @accounting US-GAAP ASC-326 §20 current-expected-credit-loss
src/receivable/allowance.service.ts:6: * @accounting US-GAAP ASC-310 receivables
src/receivable/analytics.service.ts:4: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/receivable/analytics.service.ts:5: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/receivable/analytics.service.ts:6: * @accounting US-GAAP ASC-310 receivables
src/receivable/index.ts:7: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/receivable/workflow.service.ts:7: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/receivable/workflow.service.ts:8: * @accounting IFRS IFRS-9 written_off impairment
src/receivable/workflow.service.ts:9: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/saf/t/types.ts:16: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/saf/t/types.ts:17: * @accounting US-GAAP ASC-205 presentation
src/sale/fiscalize-revenue.ts:17: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/sale/order-fiscalization.ts:11: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/sale/subscription-fiscalization.ts:15: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/sdk/accounting-client/index.ts:10: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/sdk/accounting-client/index.ts:9: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/seeding/seedSubscriptionPlans.test.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/seeding/seedSubscriptionPlans.test.ts:7: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/seeding/seedSubscriptionPlans.ts:11: * @accounting IFRS-15 revenue-from-contracts-with-customers
src/seeds/template/bg-nss.ts:19: * @accounting IFRS IAS-1 §54 minimum-line-items
src/seeds/template/templates.test.ts:15: * @accounting IFRS IAS-1 §54 minimum-line-items
src/seeds/template/templates.test.ts:16: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/seeds/template/templates.ts:12: * @accounting IFRS IAS-1 §54 minimum-line-items
src/seeds/template/templates.ts:13: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/seeds/template/types.ts:12: * @accounting IFRS IAS-1 §54 minimum-line-items
src/shared/Money.tsx:18: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/shared/field.ts:13: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/shared/field.ts:240: * @accounting IAS-1 financial-position reporting-entities
src/shared/index.ts:24: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/spec/generator/extractor.ts:14: *   @accounting    <body> <id> [free-text]      ← alias for @standard
src/subscription/gate/index.test.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/subscription/gate/index.test.ts:7: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/subscription/gate/index.test.ts:8: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/subscription/gate/index.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/subscription/gate/index.ts:11: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/subscription/gate/index.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/subscription/plans/hooks/index.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/subscription/plans/hooks/index.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/subscription/plans/index.ts:10: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/subscription/plans/index.ts:11: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:25: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:26: * @accounting IFRS IFRS-15 §IFRS-15.31 revenue-recognition
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:27: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:28: * @accounting US-GAAP ASC-606-10-25 contract-modifications
src/subscription/plans/subscriptions/index.ts:15: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/subscription/plans/subscriptions/index.ts:16: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/subscription/plans/subscriptions/index.ts:17: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/subscription/plans/subscriptions/usage/records/index.ts:18: * @accounting IFRS IFRS-15 §B16 §B17 §B18 §B19 usage-based-revenue
src/subscription/plans/subscriptions/usage/records/index.ts:19: * @accounting US-GAAP ASC-606-10-32-40 usage-based-pricing
src/tax/automation.service/index.ts:20: * @accounting OECD SAF-T tax-table
src/tax/jurisdictions/index.ts:18: * @accounting OECD SAF-T jurisdiction-codes
src/tax/jurisdictions/tax/codes/index.ts:19: * @accounting OECD SAF-T tax-table
src/tax/jurisdictions/tax/returns/index.ts:7: * @accounting OECD SAF-T 2.0 standard-audit-file-tax
src/tax/jurisdictions/tax/returns/index.ts:8: * @accounting US-GAAP ASC-740 income-taxes
src/taxing/jurisdictions/entity/legal/structures/index.ts:4: * @accounting IFRS-10 §B86 reporting-entity
src/taxing/jurisdictions/reporting/standards/index.ts:4: * @accounting IFRS reporting-framework
src/taxing/jurisdictions/reporting/standards/index.ts:5: * @accounting US-GAAP reporting-framework
src/tenant/context/index.ts:41: * @accounting IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
src/tenant/context/index.ts:42: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/tenants/hooks/initializeTrial.ts:12: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/tenants/hooks/initializeTrial.ts:13: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/tenants/index.ts:110:     * @accounting IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
src/types/bank-reconciliation/index.ts:161: * @accounting IFRS IAS-7 statement-of-cash-flows
src/types/bank-reconciliation/index.ts:239: * @accounting IFRS IAS-7 statement-of-cash-flows
src/types/bank-reconciliation/index.ts:240: * @accounting US-GAAP ASC-310 receivables returned-checks
src/types/bank-reconciliation/index.ts:9: * @accounting IFRS IAS-7 statement-of-cash-flows
src/types/events/index.ts:265: * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
src/types/events/index.ts:266: * @accounting IFRS IAS-2 §28 net-realisable-value
src/types/events/index.ts:267: * @accounting US-GAAP ASC-330 inventory
src/types/events/index.ts:268: * @accounting US-GAAP ASC-330-10-30 inventory-valuation
src/types/events/index.ts:298:     * @accounting IFRS IAS-2 §25 cost-formulas
src/types/events/index.ts:299:     * @accounting US-GAAP ASC-330-10-30 inventory-valuation
src/types/events/index.ts:314: * @accounting IFRS IAS-16 §62 depreciation-methods
src/types/events/index.ts:315: * @accounting US-GAAP ASC-360-10-35 depreciation
src/types/events/index.ts:407: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/types/events/index.ts:408: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/types/events/index.ts:409: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/types/events/index.ts:494: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/types/events/index.ts:495: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/types/events/index.ts:496: * @accounting IFRS IAS-2 inventories cogs-recognition
src/types/events/index.ts:497: * @accounting US-GAAP ASC-330 inventory cogs-recognition
src/types/financial-statements/index.ts:10: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/types/financial-statements/index.ts:7: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/types/financial-statements/index.ts:8: * @accounting IFRS IAS-7 statement-of-cash-flows
src/types/financial-statements/index.ts:9: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/types/gl-account/index.ts:6: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/types/gl-account/index.ts:7: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/types/gl-account/index.ts:8: * @accounting US-GAAP ASC-210 balance-sheet
src/types/gl-account/index.ts:9: * @accounting OECD SAF-T §2 general-ledger-accounts
src/types/multi-currency/index.ts:12: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates functional-currency
src/types/multi-currency/index.ts:13: * @accounting IFRS IAS-29 financial-reporting-in-hyperinflationary-economies
src/types/multi-currency/index.ts:14: * @accounting US-GAAP ASC-830 foreign-currency-matters reporting-currency
src/types/parties/index.ts:11: * @accounting IFRS IFRS-9 expected-credit-loss
src/types/parties/index.ts:12: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/types/payables/index.ts:8: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/types/payables/index.ts:9: * @accounting US-GAAP ASC-405 liabilities
src/types/period-end/index.ts:10: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/types/period-end/index.ts:5: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/types/period-end/index.ts:6: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/types/period-end/index.ts:7: * @accounting IFRS IAS-16 property-plant-and-equipment depreciation
src/types/period-end/index.ts:8: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/types/period-end/index.ts:9: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/types/receivables/index.ts:7: * @accounting IFRS IFRS-9 IFRS-15
src/types/receivables/index.ts:8: * @accounting US-GAAP ASC-310 ASC-326 ASC-606
src/types/tenant/index.ts:13: * @accounting IFRS International-Financial-Reporting-Standards
src/types/tenant/index.ts:14: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/types/tenant/index.ts:15: * @accounting CN-ASBE Chinese-Accounting-Standards-for-Business-Enterprises
src/types/tenant/index.ts:16: * @accounting IN-IndAS Indian-Accounting-Standards
src/types/tenant/index.ts:17: * @accounting JP-J-GAAP Japanese-GAAP
src/types/tenant/index.ts:18: * @accounting GB-FRS UK-Financial-Reporting-Standards
src/utility/aging-dry-keys.test.ts:17: * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
src/utility/aging-dry-keys.test.ts:18: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/utility/bank-reconciliation-report.test.ts:25: * @accounting IFRS IAS-7 statement-of-cash-flows
src/utility/calculations.ts:113: * @accounting IFRS IAS-16 §62 depreciation-methods double-declining-balance
src/utility/calculations.ts:114: * @accounting US-GAAP ASC-360-10-35-7 declining-balance
src/utility/calculations.ts:137: * @accounting IFRS IAS-16 §62 depreciation-methods sum-of-years-digits
src/utility/calculations.ts:138: * @accounting US-GAAP ASC-360-10-35 depreciation
src/utility/calculations.ts:160: * @accounting IFRS IAS-16 §62 depreciation-methods units-of-production
src/utility/calculations.ts:161: * @accounting US-GAAP ASC-360-10-35 depreciation activity-method
src/utility/calculations.ts:96: * @accounting IFRS IAS-16 §62 depreciation-methods diminishing-balance
src/utility/calculations.ts:97: * @accounting US-GAAP ASC-360-10-35 depreciation declining-balance
src/utility/calculations.ts:9: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utility/depreciation-methods.test.ts:14: * @accounting IFRS IAS-16 §62 depreciation-methods
src/utility/depreciation-methods.test.ts:15: * @accounting US-GAAP ASC-360-10-35 depreciation
src/utility/period-lock.ts:16: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utility/period-lock.ts:17: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/utility/period-lock.ts:18: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/vendors/index.ts:19: * @accounting US-GAAP ASC-405 liabilities
src/vendors/index.ts:20: * @accounting US-IRS Form-1099 information-return
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:17: * @accounting IFRS IAS-2 §6 inventories-held-at-other-location
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:18: * @accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:19: * @accounting US-GAAP ASC-330 inventory-location-tracked
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:20: * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:19: * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:20: * @accounting IFRS IFRS-15 §38 point-in-time-control-transfer
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:21: * @accounting IFRS IFRS-15 §B77-B78 consignment-control
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:22: * @accounting IFRS IAS-2 §34 cost-of-inventories-recognised-as-expense
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:23: * @accounting US-GAAP ASC-606-10-25-30 control-passing
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:24: * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
src/warehouse/locations/consignment/arrangements/index.ts:20: * @accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
src/warehouse/locations/consignment/arrangements/index.ts:21: * @accounting IFRS IFRS-15 §38 point-in-time-control-transfer
src/warehouse/locations/consignment/arrangements/index.ts:22: * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
src/warehouse/locations/consignment/arrangements/index.ts:23: * @accounting US-GAAP ASC-606-10-55-80 consignment-control
src/warehouse/locations/consignment/arrangements/index.ts:24: * @accounting IFRS IAS-2 §6 inventory-held-at-other-location
src/warehouse/locations/index.ts:13: * @accounting IFRS IAS-2 inventories location-tracked
src/warehouse/locations/index.ts:14: * @accounting US-GAAP ASC-330 inventory location-tracked
src/widget/AccountReconciliationsPanel.tsx:8: * @accounting IFRS IAS-7 statement-of-cash-flows bank-reconciliation
src/widget/BalanceSheetWidget.tsx:5: * @accounting IFRS IAS-1 §54 statement-of-financial-position
src/widget/BalanceSheetWidget.tsx:6: * @accounting US-GAAP ASC-210-10 balance-sheet-classification-of-current-assets-and-liabilities
src/widget/CostCentersPanel.tsx:10: * @accounting US-GAAP ASC-280 segment-reporting
src/widget/CostCentersPanel.tsx:9: * @accounting IFRS IFRS-8 operating-segments
src/widget/DunningCyclesPanel.tsx:10: * @accounting US-GAAP ASC-326-20 cecl-credit-losses
src/widget/DunningCyclesPanel.tsx:9: * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
src/widget/EmployeesPanel.tsx:8: * @accounting IFRS IAS-19 employee-benefits
src/widget/IncomeStatementWidget.tsx:5: * @accounting IFRS IAS-1 §81A presentation-of-profit-or-loss-and-other-comprehensive-income
src/widget/IncomeStatementWidget.tsx:6: * @accounting US-GAAP ASC-220-10 income-statement-reporting-comprehensive-income
src/widget/LeasePeriodPostingsPanel.tsx:15: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/widget/LeasePeriodPostingsPanel.tsx:16: * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
src/widget/LeasePeriodPostingsPanel.tsx:17: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/widget/LeasesPanel.tsx:10: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/widget/LeasesPanel.tsx:9: * @accounting IFRS IFRS-16 leases lessee-disclosure
src/widget/PayrollRunsPanel.tsx:10: * @accounting US-GAAP ASC-710 compensation-general
src/widget/PayrollRunsPanel.tsx:9: * @accounting IFRS IAS-19 employee-benefits
src/widget/TrialBalanceWidget.tsx:5: * @accounting IFRS IAS-1 §54 statement-of-financial-position
src/widget/TrialBalanceWidget.tsx:6: * @accounting US-GAAP ASC-205-10 presentation-of-financial-statements
src/work/centers/index.ts:14: * @accounting IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead
src/work/centers/index.ts:15: * @accounting IFRS IAS-2 §13 normal-capacity-overhead-absorption
src/work/centers/index.ts:16: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/work/orders/index.ts:66: * @accounting IFRS IAS-2 §10 §12 cost-of-conversion (the piece-rate wage = direct labour)
src/work/orders/index.ts:67: * @accounting IFRS IAS-19 §11 short-term-employee-benefits piece-rate
src/work/shifts/index.ts:35: * @accounting IFRS IAS-2 §12 cost-of-conversion direct-labour (the `wage` feed)
src/work/shifts/index.ts:36: * @accounting US-GAAP ASC-330-10-30 inventory-cost
tests/e2e/categories/compliance-evidence.e2e.spec.ts:14: * @accounting IFRS IAS-1 presentation-of-financial-statements
tests/e2e/categories/compliance-evidence.e2e.spec.ts:15: * @accounting US-GAAP ASC-810 consolidation
tests/e2e/erp-workflows/order-to-cash.e2e.spec.ts:20: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
tests/e2e/erp-workflows/order-to-cash.e2e.spec.ts:21: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
tests/e2e/erp-workflows/procure-to-pay.e2e.spec.ts:15: * @accounting IFRS IAS-1 §54 minimum-line-items
tests/e2e/erp-workflows/procure-to-pay.e2e.spec.ts:16: * @accounting US-GAAP ASC-705 cost-of-sales-and-services
tests/e2e/erp-workflows/record-to-report.e2e.spec.ts:16: * @accounting IFRS IAS-1 presentation-of-financial-statements
tests/e2e/erp-workflows/record-to-report.e2e.spec.ts:17: * @accounting IFRS IAS-7 statement-of-cash-flows
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:12: * @accounting IFRS IFRS-16 leases lessee-accounting
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:13: * @accounting IFRS IFRS-16 §22 rou-asset-initial-measurement
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:14: * @accounting IFRS IFRS-16 §26 liability-initial-measurement
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:15: * @accounting US-GAAP ASC-842-20 lessee-accounting
tests/e2e/standards/ifrs/industry-template-pick.e2e.spec.ts:12: * @accounting IFRS IAS-1 §54 minimum-line-items
tests/e2e/standards/ifrs/industry-template-pick.e2e.spec.ts:13: * @accounting IFRS IAS-2 §10 inventories-cost-formula
tests/e2e/standards/ifrs/industry-template-pick.e2e.spec.ts:14: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
```

## @security

```text
src/activities/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/admin/TenantFilters.tsx:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation admin-interface
src/admin/TenantManagement.tsx:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation admin-CRUD
src/admin/TenantManagement.tsx:6: * @security ISO-27002 §5.15 access-control admin-interface
src/ai/ai-security.ts:19: * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
src/ai/ai-security.ts:20: * @security ISO-27002 §5.34 ai-output-validation
src/ai/ai-security.ts:21: * @security OWASP-LLM-Top-10:2025 LLM01 prompt-injection
src/ai/ai-security.ts:22: * @security OWASP-LLM-Top-10:2025 LLM02 sensitive-information-disclosure
src/ai/cloudflare-ai.ts:53: * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
src/ai/cloudflare-ai.ts:54: * @security ISO-27002 §5.34 ai-output-validation
src/ai/cloudflare-ai.ts:55: * @security OWASP-LLM-Top-10:2025 LLM01 prompt-injection
src/ai/cloudflare-ai.ts:56: * @security OWASP-LLM-Top-10:2025 LLM02 sensitive-information-disclosure
src/ai/durable-objects.ts:18: * @security ISO-27002 §5.4 segregation-of-duties race-free
src/ai/embed-document.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ai/models/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ai/semantic-search.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ai/semantic-search.ts:12: * @security ISO-27002 §5.15 access-control
src/ai/suggestions/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ai/suggestions/index.ts:28: * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
src/ai/suggestions/index.ts:29: * @security ISO-27002 §5.34 ai-output-validation
src/allow/public/read/tenant/index.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/allow/public/read/tenant/index.ts:6: * @security ISO-27002 §5.15 access-control
src/allow/public/read/tenant/index.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/anti/corruption/index.ts:24: * @security ISO-27001 A.8.15 logging A.8.16 monitoring (tamper detection)
src/anyone/index.ts:4: * @security ISO-27002 §5.15 access-control intentional-public-read
src/app/(api)/api/subscriptions/create/route.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(api)/api/webhooks/stripe/route.ts:10: * @security ISO-27001 A.5.17 authentication-information webhook-secret
src/app/(api)/api/webhooks/stripe/route.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/[locale]/layout.tsx:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-from-request
src/app/(frontend)/next/preview/route.ts:10: * @security ISO-27002 §5.15 access-control preview-secret
src/app/(frontend)/next/preview/route.ts:11: * @security ISO-27001 A.5.17 authentication-information secret-management
src/app/(frontend)/next/seed/route.ts:6: * @security ISO-27001 A.5.18 access-rights
src/app/(frontend)/next/seed/route.ts:7: * @security ISO-27002 §5.15 access-control
src/app/(frontend)/tenant-domains/[tenant]/[...slug]/page.tsx:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:7: * @security ISO-27001 A.5.16 identity-management
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:8: * @security ISO-27001 A.5.17 authentication-information
src/app/(frontend)/tenant-domains/[tenant]/login/page.tsx:9: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-domains/[tenant]/page.tsx:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-domains/layout.tsx:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-slugs/[tenant]/[...slug]/page.tsx:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:7: * @security ISO-27001 A.5.16 identity-management
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:8: * @security ISO-27001 A.5.17 authentication-information
src/app/(frontend)/tenant-slugs/[tenant]/login/page.tsx:9: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-slugs/[tenant]/page.tsx:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/app/(frontend)/tenant-slugs/layout.tsx:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/audit/events/index.ts:49: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/audit/events/index.ts:50: * @security ISO-27002 §8.15 logging
src/audit/submissions/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/auth/index.ts:10: * @security ISO-27002 §5.4 segregation-of-duties
src/auth/index.ts:191: * @security ISO-27001 A.5.15 access-control
src/auth/index.ts:6: * @security ISO-27001 A.5.15 access-control
src/auth/index.ts:7: * @security ISO-27001 A.5.18 access-rights
src/auth/index.ts:8: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/auth/index.ts:9: * @security ISO-27002 §5.15 access-control
src/authenticated/index.ts:4: * @security ISO-27001 A.5.16 identity-management
src/authenticated/index.ts:5: * @security ISO-27002 §5.15 access-control
src/authenticated/index.ts:6: * @security ISO-27002 §8.5 secure-authentication
src/authenticated/or/published/index.ts:5: * @security ISO-27001 A.5.18 access-rights
src/authenticated/or/published/index.ts:6: * @security ISO-27002 §5.15 access-control
src/authenticated/or/published/index.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/auto/populate/created/by/index.ts:10: * @security ISO-27002 §5.15 access-control
src/auto/populate/tenant/index.ts:10: * @security ISO-27002 §5.15 access-control
src/auto/populate/tenant/index.ts:9: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
src/bank/accounts/bank/reconciliations/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/bank/accounts/bank/transactions/index.ts:47: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/bank/accounts/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/bank/accounts/index.ts:16: * @security ISO-27002 §8.24 use-of-cryptography iban-bic-encryption
src/bank/accounts/payment/runs/index.ts:31: * @security ISO-27002 §5.4 segregation-of-duties
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:34: * @security ISO-27002 §5.4 segregation-of-duties treasury-preparer
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:50: * @security ISO-27002 §5.4 segregation-of-duties
src/bank/accounts/payroll/runs/index.ts:32: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/bank/accounts/payroll/runs/index.ts:33: * @security ISO-27002 §5.4 segregation-of-duties
src/bank/accounts/payroll/runs/index.ts:34: * @security ISO-27002 §5.34 privacy-and-protection-of-pii
src/bank/accounts/payroll/runs/index.ts:35: * @security ISO-27002 §8.11 data-masking
src/base/accounting/field/index.ts:177: * @security ISO-27002 §5.4 segregation-of-duties approver-visibility
src/base/accounting/field/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-field
src/base/accounting/field/index.ts:7: * @security ISO-27002 §5.15 access-control
src/billing/stripeWebhookHandlers.test.ts:11: * @security ISO-27001 A.5.17 authentication-information webhook-signing-secret
src/billing/stripeWebhookHandlers.ts:24: * @security ISO-27001 A.5.14 information-transfer
src/billing/stripeWebhookHandlers.ts:25: * @security ISO-27002 §8.16 monitoring-activities
src/billing/test.ts:11: * @security ISO-27001 A.5.17 authentication-information webhook-signing-secret
src/biological/assets/index.ts:23: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/bookable/resources/bookings/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/bookable/resources/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/budget/plannings/index.ts:34: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/budget/plannings/index.ts:35: * @security ISO-27002 §5.4 segregation-of-duties approval-vs-creation
src/bulk/op/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/carriers/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/carriers/index.ts:18: * @security ISO-27002 §8.24 use-of-cryptography api-credentials-encryption
src/cases/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation party-scoped-read
src/categories/hooks/beforeChange.ts:6: * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
src/commitments/and/contingencies/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/compliance/frameworks/compliance/requirements/compliance/gaps/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/compliance/frameworks/compliance/requirements/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/compliance/frameworks/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/connections/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/consent/records/index.ts:14: * @security ISO-27001 A.5.34 privacy-and-pii
src/consolidation/eliminations/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/cost/centers/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/cost/centers/job/positions/index.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/cost/centers/job/positions/recruiting/pipelines/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/cost/centers/purchase/requisitions/index.ts:14: * @security ISO-27002 §5.4 segregation-of-duties
src/cost/centers/purchase/requisitions/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/country/client/berlin-group-psd2.ts:18: * @security ISO-27001 A.5.16 identity-management
src/country/client/berlin-group-psd2.ts:19: * @security ISO-27001 A.5.17 authentication-information
src/country/client/bg-nap-mtls.ts:16: * @security ISO-27001 A.5.16 identity-management
src/country/client/bg-nap-mtls.ts:17: * @security ISO-27001 A.8.24 use-of-cryptography
src/country/client/bg-pades-signer.ts:27: * @security ISO-27001 A.5.16 identity-management
src/country/client/bg-pades-signer.ts:28: * @security ISO-27001 A.8.24 use-of-cryptography
src/country/client/sign-cms-node.ts:21: * @security ISO-27001 A.5.16 identity-management
src/country/client/sign-cms-node.ts:22: * @security ISO-27001 A.8.24 use-of-cryptography
src/csrd/disclosures/index.ts:26: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/currency/rates/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customer/segments/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/contracts/index.ts:36: * @security ISO-27002 §5.4 segregation-of-duties
src/customers/kyc/checks/index.ts:10: * @security ISO-27001 A.5.34 privacy-and-pii
src/customers/projects/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/projects/project/milestones/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/projects/project/tasks/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/projects/wip/snapshots/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/quotes/index.ts:14: * @security ISO-27002 §5.4 segregation-of-duties
src/customers/sales/orders/index.ts:36: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/sales/orders/returns/index.ts:11: * @security ISO-27002 §5.4 segregation-of-duties
src/customers/sales/orders/shipments/customs/declarations/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/customers/sales/orders/shipments/tracking/events/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/data/processing/activities/index.ts:14: * @security ISO-27001 A.5.34 privacy-and-pii
src/data/subject/requests/index.ts:17: * @security ISO-27001 A.5.34 privacy-and-pii
src/ecommerce/access/adminOnlyFieldAccess.ts:5: * @security ISO-27001 A.5.18 access-rights
src/ecommerce/access/adminOnlyFieldAccess.ts:6: * @security ISO-27002 §5.15 access-control
src/ecommerce/access/adminOrPublishedStatus.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ecommerce/access/adminOrPublishedStatus.ts:13: * @security ISO-27002 §5.15 access-control
src/ecommerce/access/adminOrPublishedStatus.ts:14: * @security ISO-27002 §8.3 information-access-restriction
src/ecommerce/access/customerOnlyFieldAccess.ts:5: * @security ISO-27002 §5.15 access-control
src/ecommerce/access/isAdmin.ts:7: * @security ISO-27001 A.5.18 access-rights
src/ecommerce/access/isAdmin.ts:8: * @security ISO-27002 §5.15 access-control
src/ecommerce/access/isCustomer.ts:7: * @security ISO-27002 §5.15 access-control
src/ecommerce/access/isDocumentOwner.ts:8: * @security ISO-27001 A.5.18 access-rights
src/ecommerce/access/isDocumentOwner.ts:9: * @security ISO-27002 §5.15 access-control
src/ecommerce/access/utilities.ts:5: * @security ISO-27001 A.5.18 access-rights
src/ecommerce/access/utilities.ts:6: * @security ISO-27002 §5.15 access-control
src/ecommerce/configureEcommercePlugin/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-stripe-keys
src/ecommerce/configureEcommercePlugin/index.ts:20: * @security ISO-27002 §5.17 authentication-information secret-management
src/ecommerce/createTenantStripePaymentMethod/index.ts:12: * @security ISO-27001 A.5.17 authentication-information secret-management
src/ecommerce/createTenantStripePaymentMethod/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ecommerce/createTenantStripePaymentMethod/index.ts:14: * @security ISO-27002 §8.24 use-of-cryptography
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:10: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ecommerce/stripe/tenantAwareInitiatePayment.ts:9: * @security ISO-27001 A.5.17 authentication-information secret-management
src/ecommerce/stripe/tenantConfirmOrder.ts:12: * @security ISO-27001 A.5.17 authentication-information secret-management
src/ecommerce/stripe/tenantConfirmOrder.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ecommerce/stripe/tenantStripeWebhook.ts:10: * @security ISO-27001 A.5.17 authentication-information webhook-secret
src/ecommerce/stripe/tenantStripeWebhook.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ecommerce/stripe/tenantStripeWebhook.ts:12: * @security ISO-27002 §8.24 use-of-cryptography
src/email/tenantAwareResendEmailAdapter/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-key
src/email/tenantAwareResendEmailAdapter/index.ts:26: * @security ISO-27002 §5.17 authentication-information secret-management
src/employees/expense/reports/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/employees/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/employees/index.ts:25: * @security ISO-27002 §5.34 privacy-and-protection-of-pii
src/employees/index.ts:26: * @security ISO-27002 §8.11 data-masking
src/employees/leave/requests/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/employees/performance/reviews/index.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/employees/sales/commissions/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/employees/share/based/payments/index.ts:19: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/employees/time/entries/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/enforce/document/tenant/for/user/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/enforce/document/tenant/for/user/index.ts:16: * @security ISO-27002 §5.15 access-control
src/enforce/document/tenant/for/user/index.ts:17: * @security ISO-27002 §8.3 information-access-restriction
src/enforce/segregation/of/duty/index.ts:9: * @security ISO-27002 §5.4 segregation-of-duties
src/ensure/unique/slug/within/tenant/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/ensure/unique/slug/within/tenant/index.ts:18: * @security ISO-27002 §5.15 access-control
src/factory/auto-populate-tenant.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/factory/auto-populate-tenant.ts:8: * @security ISO-27002 § 5.15 access-control
src/factory/collection-factory.ts:71: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-required
src/factory/collection-factory.ts:72: * @security ISO-27002 §5.15 access-control role-required
src/fair/value/measurements/index.ts:21: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/feature/registry/index.ts:28: * @security ISO-27001 A.5.15 access-control
src/feature/registry/index.ts:29: * @security ISO-27002 §5.15 access-control feature-entitlement
src/fetch/remote/file/index.ts:13: * @security ISO-27002 §8.23 web-filtering
src/financial/statements/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/financial/statements/index.ts:28: * @security ISO-27002 §5.4 segregation-of-duties certifier-vs-preparer
src/fiscal/devices/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/fiscal/devices/sales/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/fiscal/periods/carbon/emissions/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/fiscal/periods/earnings/per/shares/index.ts:20: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/fiscal/periods/index.ts:29: * @security ISO-27002 §5.4 segregation-of-duties closer-vs-creator locker-vs-creator
src/fiscal/periods/post/balance/sheet/events/index.ts:19: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/fiscal/periods/prior/period/adjustments/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/fiscal/periods/provisions/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/fixed/assets/index.ts:31: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/fx/transactions/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/get/enabled/locales/for/tenant/index.ts:9: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/get/me/user/index.ts:7: * @security ISO-27001 A.5.16 identity-management
src/get/me/user/index.ts:8: * @security ISO-27001 A.5.17 authentication-information
src/get/me/user/index.ts:9: * @security ISO-27002 §8.5 secure-authentication
src/get/preview/secret/index.ts:7: * @security ISO-27002 §5.17 authentication-information secret-management
src/get/tenant/from/request/index.ts:7: * @security ISO-27001 A.5.18 access-rights
src/get/tenant/from/request/index.ts:8: * @security ISO-27002 §5.15 access-control
src/get/user/tenant/i/ds/index.ts:6: * @security ISO-27001 A.5.18 access-rights
src/get/user/tenant/i/ds/index.ts:7: * @security ISO-27002 §5.15 access-control
src/gl/account/resolver/index.ts:29: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/gl/accounts/account/reconciliations/index.ts:27: * @security ISO-27002 §5.4 segregation-of-duties preparer-vs-reviewer
src/gl/accounts/bank/statements/index.ts:26: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/gl/accounts/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/gl/accounts/period/end/adjustments/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/gl/accounts/period/end/adjustments/index.ts:25: * @security ISO-27002 §5.4 segregation-of-duties approval-vs-creation
src/gl/accounts/recurring/journals/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/gl/accounts/tax/calculations/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/government/grants/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/held/for/sale/classifications/index.ts:23: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/insurance/contracts/index.ts:24: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/internal/controls/audit/findings/remediation/plans/index.ts:6: * @security ISO-27001 A.10 improvement
src/internal/controls/audit/findings/remediation/plans/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/internal/controls/control/tests/audit/samples/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/internal/controls/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/internal/policies/index.ts:4: * @security ISO-27001 A.5.1 policies-for-information-security
src/internal/policies/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/internal/policies/policy/acknowledgments/index.ts:4: * @security ISO-27001 A.5.1 policy-acknowledgement
src/internal/policies/policy/acknowledgments/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/internal/policies/policy/versions/index.ts:4: * @security ISO-27001 A.5.1 policies
src/internal/policies/policy/versions/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/invoices/credit/memos/index.ts:26: * @security ISO-27002 §5.4 segregation-of-duties issuer-vs-approver
src/invoices/dunning/cycles/index.ts:29: * @security ISO-27002 §5.4 segregation-of-duties write-off-approval
src/invoices/hooks/bill.ts:22: * @security ISO-27002 §5.4 segregation-of-duties
src/invoices/hooks/encryptSensitiveFields.ts:11: * @security ISO-27002 §8.24 use-of-cryptography
src/invoices/hooks/encryptSensitiveFields.ts:12: * @security ISO-27001 A.8.24 use-of-cryptography
src/invoices/invoice/lines/hooks/beforeValidate.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/invoices/payments/hooks/beforeValidate.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/invoices/payments/payment/allocations/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/is/super/admin/index.ts:5: * @security ISO-27001 A.5.18 access-rights
src/is/super/admin/index.ts:6: * @security ISO-27002 §5.15 access-control
src/is/super/admin/index.ts:7: * @security ISO-27002 §8.2 privileged-access-rights
src/iso/19011/types.ts:25: * @security ISO-27002 §8.15 logging
src/iso/3166/1/country/bg-generic-clients.test.ts:13: * @security ISO-27001 A.5.16 identity-management
src/iso/3166/1/country/bg-generic-clients.test.ts:14: * @security ISO-27001 A.8.24 use-of-cryptography
src/items/batches/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/bills/of/materials/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/bills/of/materials/work/orders/cost/variances/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/bills/of/materials/work/orders/operation/runs/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/bills/of/materials/work/orders/production/receipts/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/bills/of/materials/work/orders/routings/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/hooks/beforeValidate.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/inventory/movements/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/packages/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/items/purchase/orders/goods/receipts/index.ts:29: * @security ISO-27002 §5.4 segregation-of-duties receiver-vs-requester
src/items/purchase/orders/index.ts:46: * @security ISO-27002 §5.4 segregation-of-duties requester-vs-approver
src/items/quality/inspections/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/journal/entries/gl/postings/index.ts:31: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/journal/entries/index.ts:35: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/journal/entries/index.ts:36: * @security ISO-27002 §5.4 segregation-of-duties
src/journal/entries/rounding/adjustments/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/journal/entry/service/index.ts:19: * @security ISO-27002 §5.4 segregation-of-duties
src/leads/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/leads/opportunities/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/leases/index.ts:57: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/leases/lease/modifications/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/leases/lease/period/postings/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/audit/committees/audit/committee/members/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/audit/committees/audit/committee/minutes/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/audit/committees/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/beneficial/owners/index.ts:9: * @security ISO-27001 A.5.34 privacy-and-pii
src/legal/entities/board/actions/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/business/combinations/index.ts:21: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/compliance/deadlines/compliance/notifications/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/compliance/deadlines/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/debt/schedules/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/disclosure/checklists/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/index.ts:36: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/intercompany/transactions/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/internal/audit/functions/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/management/assessment/icfrs/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/management/certifications/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/regulatory/reports/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/related/party/transactions/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/risk/registers/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/segment/reportings/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/legal/entities/transfer/pricing/files/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/lot/variants/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/lot/work/phases/index.ts:29: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/lots/index.ts:31: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/maintenance/requests/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/maintenance/work/orders/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/media/audit/evidences/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/media/hooks/beforeChange.ts:7: * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
src/media/sepa/mandates/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/membership/admin/mutate/access/index.ts:18: * @security ISO-27001 A.5.18 access-rights
src/membership/admin/mutate/access/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/membership/admin/mutate/access/index.ts:20: * @security ISO-27002 §5.15 access-control
src/membership/admin/mutate/access/index.ts:21: * @security ISO-27002 §5.4 segregation-of-duties
src/middleware/accounting/index.ts:4: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/middleware/accounting/index.ts:5: * @security ISO-27002 §5.15 access-control
src/middleware/accounting/tenant-scope.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/middleware/accounting/tenant-scope.ts:14: * @security ISO-27002 §5.15 access-control
src/middleware/accounting/tenant-scope.ts:15: * @security ISO-27002 §8.3 information-access-restriction
src/mineral/resource/assets/index.ts:20: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/nist/incits/359/conventions.test.ts:7: * @security ISO-27002 §5.15 access-control
src/nist/incits/359/conventions.ts:23: * @security ISO-27002 §5.15 access-control
src/nist/incits/359/index.ts:10: * @security ISO-27001 A.5.18 access-rights
src/nist/incits/359/index.ts:11: * @security ISO-27002 §5.15 access-control
src/nist/incits/359/index.ts:12: * @security ISO-27002 §5.16 identity-management
src/nist/incits/359/index.ts:13: * @security ISO-27002 §5.4 segregation-of-duties
src/nist/incits/359/payload.ts:5: * @security ISO-27001 A.5.18 access-rights
src/nist/incits/359/payload.ts:6: * @security ISO-27002 §5.15 access-control
src/nist/incits/359/predicates.test.ts:6: * @security ISO-27001 A.5.18 access-rights
src/nist/incits/359/predicates.test.ts:7: * @security ISO-27002 §5.15 access-control
src/nist/incits/359/predicates.ts:5: * @security ISO-27001 A.5.18 access-rights
src/nist/incits/359/predicates.ts:6: * @security ISO-27002 §5.15 access-control
src/nist/incits/359/types.ts:5: * @security ISO-27001 A.5.18 access-rights
src/nist/incits/359/types.ts:6: * @security ISO-27002 §5.15 access-control
src/nist/sp/800/108/kdf.ts:14: * @security ISO-27001 A.8.24 use-of-cryptography
src/nist/sp/800/108/kdf.ts:15: * @security ISO-27002 §8.24 use-of-cryptography
src/nist/sp/800/108/kdf.ts:16: * @security ISO-27002 §5.17 authentication-information secret-management
src/nist/sp/800/38/aes-gcm.test.ts:8: * @security ISO-27001 A.8.24 use-of-cryptography
src/nist/sp/800/38/aes-gcm.test.ts:9: * @security ISO-27002 §8.24 use-of-cryptography
src/nist/sp/800/38/aes-gcm.ts:14: * @security ISO-27001 A.8.24 use-of-cryptography
src/nist/sp/800/38/aes-gcm.ts:15: * @security ISO-27002 §8.24 use-of-cryptography
src/notification/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/operators/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/pack/items/index.ts:32: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/packs/index.ts:36: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/pages/access/superAdminOrTenantAdmin.ts:7: * @security ISO-27001 A.5.18 access-rights
src/pages/access/superAdminOrTenantAdmin.ts:8: * @security ISO-27002 §5.15 access-control
src/pages/hooks/beforeChange.ts:9: * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
src/party/workflow.service.ts:8: * @security ISO-27002 §5.4 segregation-of-duties
src/payable/workflow.service.ts:12: * @security ISO-27002 §5.4 segregation-of-duties three-way-match
src/payload.config.multi-tenant-admin.test.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/payload.config.multi-tenant-admin.test.ts:13: * @security ISO-27002 §5.15 access-control
src/payload.config.multi-tenant-admin.test.ts:14: * @security ISO-27002 §8.3 information-access-restriction
src/payload.config.tenant.test.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/payload.config.tenant.test.ts:6: * @security ISO-27002 §5.15 access-control
src/payload/sdk/index.ts:9: * @security ISO-27002 §8.5 secure-authentication
src/payment/methods/hooks/encryptSensitiveFields.ts:13: * @security ISO-27002 §8.24 use-of-cryptography
src/payment/methods/hooks/encryptSensitiveFields.ts:14: * @security ISO-27001 A.8.24 use-of-cryptography
src/payment/methods/index.ts:21: * @security ISO-27002 §8.24 use-of-cryptography
src/plugins/auth/access/field-access.ts:10: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/plugins/auth/access/field-access.ts:11: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/field-access.ts:12: * @security ISO-27002 § 5.18 access-rights
src/plugins/auth/access/field-access.ts:39: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/plugins/auth/access/field-access.ts:40: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/field-access.ts:67: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/field-access.ts:68: * @security ISO-27002 § 5.18 access-rights
src/plugins/auth/access/field-access.ts:9: * @security ISO-27001 A.5.18 access-rights
src/plugins/auth/access/index.ts:11: * @security ISO-27001 A.5.15 access-control
src/plugins/auth/access/index.ts:12: * @security ISO-27001 A.5.18 access-rights
src/plugins/auth/access/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/plugins/auth/access/index.ts:14: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/index.ts:15: * @security ISO-27002 § 5.4 segregation-of-duties
src/plugins/auth/access/predicates.ts:10: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/predicates.ts:112: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/predicates.ts:113: * @security ISO-27002 § 5.18 access-rights
src/plugins/auth/access/predicates.ts:11: * @security ISO-27002 § 5.18 access-rights
src/plugins/auth/access/predicates.ts:12: * @security ISO-27002 § 8.2 privileged-access-rights
src/plugins/auth/access/predicates.ts:37: * @security ISO-27002 § 8.2 privileged-access-rights
src/plugins/auth/access/predicates.ts:58: * @security ISO-27001 A.5.16 identity-management
src/plugins/auth/access/predicates.ts:59: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/predicates.ts:60: * @security ISO-27002 § 8.5 secure-authentication
src/plugins/auth/access/predicates.ts:80: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/plugins/auth/access/predicates.ts:81: * @security ISO-27002 § 5.15 access-control
src/plugins/auth/access/predicates.ts:82: * @security ISO-27002 § 8.3 information-access-restriction
src/plugins/auth/access/predicates.ts:8: * @security ISO-27001 A.5.18 access-rights
src/plugins/auth/access/predicates.ts:9: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/plugins/auth/context/tenant-context.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/plugins/auth/context/tenant-context.ts:7: * @security ISO-27002 § 5.15 access-control
src/posts/hooks/beforeChange.ts:7: * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
src/posts/hooks/populateAuthors.ts:16: * @security ISO-27002 §8.11 data-masking
src/properties/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/properties/investment/properties/index.ts:23: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/properties/spaces/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/receipts/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/regulatory/deferral/accounts/index.ts:17: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/remote/media/import/index.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/rfc/3986/generate-preview-path.test.ts:8: * @security ISO-27002 §5.15 access-control preview-secret
src/rfc/3986/generate-preview-path.ts:7: * @security ISO-27002 §5.15 access-control preview-secret
src/rfc/6585/rate-limit.ts:12: * @security ISO-27001 A.5.16 identity-management
src/rfc/6585/rate-limit.ts:13: * @security ISO-27001 A.5.17 authentication-information
src/rfc/6585/rate-limit.ts:14: * @security ISO-27002 §8.5 secure-authentication
src/roles/hooks/validateRoleDefinition.ts:10: * @security ISO-27001 A.5.18 access-rights
src/roles/hooks/validateRoleDefinition.ts:11: * @security ISO-27002 §5.15 access-control
src/roles/index.ts:12: * @security ISO-27001 A.5.18 access-rights
src/roles/index.ts:13: * @security ISO-27002 §5.15 access-control
src/roles/index.ts:14: * @security ISO-27002 §5.16 identity-management
src/roles/user/roles/hooks/preventDuplicateAssignment.ts:13: * @security ISO-27001 A.5.18 access-rights
src/roles/user/roles/hooks/preventDuplicateAssignment.ts:14: * @security ISO-27002 §5.4 segregation-of-duties
src/roles/user/roles/index.ts:11: * @security ISO-27001 A.5.18 access-rights
src/roles/user/roles/index.ts:12: * @security ISO-27002 §5.15 access-control
src/roles/user/roles/index.ts:13: * @security ISO-27002 §5.4 segregation-of-duties
src/scope/collectionScopes.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/scope/collectionScopes.ts:6: * @security ISO-27002 §5.15 access-control
src/scope/collectionScopes.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/scope/constants.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/scope/constants.ts:6: * @security ISO-27002 §5.15 access-control
src/scope/filters.ts:5: * @security ISO-27002 §5.15 access-control
src/scope/filters.ts:6: * @security ISO-27002 §8.3 information-access-restriction
src/scope/index.test.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/scope/index.test.ts:6: * @security ISO-27002 §5.15 access-control
src/scope/index.test.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/scope/index.ts:6: * @security ISO-27001 A.5.23 information-security-for-cloud-services tenant-isolation
src/scope/index.ts:7: * @security ISO-27002 §5.15 access-control
src/scope/index.ts:8: * @security ISO-27002 §8.3 information-access-restriction
src/scope/test.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/scope/test.ts:6: * @security ISO-27002 §5.15 access-control
src/scope/test.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/scope/types.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/scope/types.ts:6: * @security ISO-27002 §5.15 access-control
src/sectors/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/security/header/headers.ts:15: * @security ISO-27001 A.8.20 networks-security
src/security/header/headers.ts:16: * @security ISO-27002 §8.20 networks-security
src/shared/field.ts:202: * @security ISO-27002 §5.4 segregation-of-duties approver-visibility
src/shares/index.ts:35: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/site/tenant/where/index.ts:5: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/site/tenant/where/index.ts:6: * @security ISO-27002 §8.3 information-access-restriction
src/spec/generator/extractor.ts:17: *   @security      <body> <id> [free-text]      ← alias for @standard
src/standard/collection/hook/index.ts:14: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-field
src/subscription/gate/index.test.ts:9: * @security ISO-27002 §5.15 access-control
src/subscription/gate/index.ts:13: * @security ISO-27002 §5.15 access-control
src/subscription/gate/index.ts:215: * @security ISO-27002 §5.15 access-control feature-entitlement
src/subscription/plans/subscriptions/hooks/encryptSensitiveFields.ts:11: * @security ISO-27002 §8.24 use-of-cryptography
src/subscription/plans/subscriptions/hooks/encryptSensitiveFields.ts:12: * @security ISO-27001 A.8.24 use-of-cryptography
src/subscription/plans/subscriptions/index.ts:20: * @security ISO-27002 §8.24 use-of-cryptography
src/subscription/plans/subscriptions/usage/records/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/tags/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/tags/taggings/index.ts:34: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/tax/jurisdictions/deferred/tax/items/index.ts:21: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/taxing/jurisdictions/entity/legal/structures/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/taxing/jurisdictions/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/taxing/jurisdictions/reporting/standards/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/taxing/jurisdictions/reporting/standards/reporting/mappings/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/taxing/jurisdictions/statutory/report/templates/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/taxing/jurisdictions/statutory/report/templates/statutory/field/mappings/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/tenant.service/index.ts:10: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/tenant.service/index.ts:11: * @security ISO-27002 §5.15 access-control
src/tenant.service/index.ts:12: * @security ISO-27002 §8.30 outsourced-development
src/tenant/context/index.ts:43: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-config
src/tenant/remote/secret/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-keys
src/tenant/remote/secret/index.ts:7: * @security ISO-27001 A.5.17 authentication-information secret-management
src/tenant/remote/secret/index.ts:8: * @security ISO-27002 §5.17 secret-management
src/tenant/remote/secret/index.ts:9: * @security ISO-27002 §8.24 use-of-cryptography
src/tenant/scoped/read/index.test.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/tenant/scoped/read/index.test.ts:7: * @security ISO-27002 §5.15 access-control
src/tenant/scoped/read/index.test.ts:8: * @security ISO-27002 §8.3 information-access-restriction
src/tenant/scoped/read/index.ts:14: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/tenant/scoped/read/index.ts:15: * @security ISO-27002 §5.15 access-control
src/tenant/scoped/read/index.ts:16: * @security ISO-27002 §8.3 information-access-restriction
src/tenants/access/updateAndDelete.ts:10: * @security ISO-27001 A.5.23 information-security-for-cloud-services tenant-isolation
src/tenants/access/updateAndDelete.ts:11: * @security ISO-27002 §5.15 access-control
src/tenants/index.ts:111:     * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-sandbox-config
src/tenants/index.ts:24: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/tenants/index.ts:25: * @security ISO-27002 §5.15 access-control
src/terminals/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/transaction/failures/index.ts:18: * @security ISO-27001 A.5.24 incident-management-planning
src/transaction/failures/index.ts:19: * @security ISO-27002 §5.27 information-security-event-correction
src/types/auth/index.ts:5: * @security ISO-27001 A.5.16 identity-management
src/types/auth/index.ts:6: * @security ISO-27001 A.5.18 access-rights
src/types/auth/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/types/auth/index.ts:8: * @security ISO-27002 §5.15 access-control
src/types/tenant/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/users/access/create.ts:13: * @security ISO-27001 A.5.18 access-rights
src/users/access/create.ts:14: * @security ISO-27002 §5.15 access-control
src/users/access/create.ts:15: * @security ISO-27002 §5.16 identity-management
src/users/access/isAccessingSelf.ts:4: * @security ISO-27002 §5.15 access-control self-service
src/users/access/read.ts:17: * @security ISO-27001 A.5.18 access-rights
src/users/access/read.ts:18: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/users/access/read.ts:19: * @security ISO-27002 §5.15 access-control
src/users/access/updateAndDelete.ts:12: * @security ISO-27001 A.5.18 access-rights
src/users/access/updateAndDelete.ts:13: * @security ISO-27002 §5.15 access-control
src/users/access/updateAndDelete.ts:14: * @security ISO-27002 §5.4 segregation-of-duties
src/users/endpoints/externalUsersLogin.ts:22: * @security ISO-27001 A.5.16 identity-management
src/users/endpoints/externalUsersLogin.ts:23: * @security ISO-27001 A.5.17 authentication-information
src/users/endpoints/externalUsersLogin.ts:24: * @security ISO-27002 §8.5 secure-authentication
src/users/hooks/ensureUniqueUsername.ts:23: * @security ISO-27001 A.5.16 identity-management
src/users/hooks/ensureUniqueUsername.ts:24: * @security ISO-27002 §5.16 identity-management
src/users/hooks/firstUserSuperAdmin.ts:18: * @security ISO-27001 A.5.18 access-rights genesis-owner
src/users/hooks/setCookieBasedOnDomain.ts:23: * @security ISO-27001 A.5.17 authentication-information
src/users/hooks/setCookieBasedOnDomain.ts:24: * @security ISO-27002 §8.5 secure-authentication
src/users/index.ts:232:     * @security ISO-27002 §5.15 access-control per-user-feature-flags
src/users/index.ts:56: * @security ISO-27001 A.5.16 identity-management
src/users/index.ts:57: * @security ISO-27001 A.5.17 authentication-information
src/users/index.ts:58: * @security ISO-27002 §8.5 secure-authentication
src/utility/period-lock.ts:20: * @security ISO-27002 §5.4 segregation-of-duties
src/validate/address/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/vendors/vendor/quotes/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/vendors/vendor/scorecards/index.ts:14: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/vendors/vendor/scorecards/index.ts:15: * @security ISO-27001 A.5.19 information-security-supplier-relationships
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/warehouse/locations/consignment/arrangements/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/warehouse/locations/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/widget/AccountReconciliationsPanel.tsx:11: * @security ISO-27002 §5.4 segregation-of-duties
src/widget/EmployeesPanel.tsx:11: * @security ISO-27002 §5.34 privacy-and-protection-of-pii
src/work/centers/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/work/centers/operations/index.ts:14: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/work/orders/index.ts:70: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/work/phases/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/work/shifts/index.ts:39: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/workflow/definitions/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/workflow/definitions/workflow/instances/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
tests/e2e/admin-evidence.e2e.spec.ts:30: * @security ISO-27001 A.5.16 identity-management
tests/e2e/admin-evidence.e2e.spec.ts:31: * @security ISO-27001 A.5.17 authentication-information
tests/e2e/admin.e2e.spec.ts:15: * @security ISO-27001 A.5.16 identity-management
tests/e2e/admin.e2e.spec.ts:16: * @security ISO-27001 A.5.17 authentication-information
tests/e2e/categories/cross-cutting.e2e.spec.ts:8: * @security ISO-27001 A.5.16 identity-management
tests/e2e/categories/cross-cutting.e2e.spec.ts:9: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:17: * @security ISO-27001 A.5.34 privacy-and-pii
tests/e2e/standards/compliance/sox-404-evidence-trail.e2e.spec.ts:21: * @security ISO-27002 §5.4 segregation-of-duties
tests/e2e/tenant.e2e.spec.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
tests/e2e/tenant.e2e.spec.ts:12: * @security ISO-27002 §5.15 access-control
tests/helpers/login.ts:8: * @security ISO-27001 A.5.17 authentication-information
tests/helpers/seedTenant.ts:8: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
tests/helpers/seedUser.ts:6: * @security ISO-27001 A.5.16 identity-management
```

## @audit

```text
Binary file src/voting/index.ts matches
src/accounting/debit-credit.ts:14: * @audit ISO-19011:2018 audit-trail double-entry-invariant
src/accounting/fields-money-fix.ts:13: * @audit ISO-19011:2018 audit-trail integer-only-arithmetic
src/accounting/financial-analysis.ts:10: * @audit ISO-19011:2018 audit-trail
src/accounting/margin.ts:16: * @audit ISO-19011 — cost and margin are deterministic functions of materials + labor + price
src/accounting/reports.service.ts:26: * @audit ISO-19011:2018 audit-trail read-only-queries
src/accounting/token-ledger.ts:17: * @audit ISO-19011 double-entry-invariant (debits = credits)
src/activities/index.ts:12: * @audit ISO-19011:2018 audit-trail crm-activity
src/address/validation/index.ts:20: * @audit ISO-19011:2018 audit-trail address-validation
src/admin/TenantManagement.tsx:8: * @audit ISO-19011:2018 audit-trail admin-actions
src/agent/access/index.ts:14: * @audit the reached uuid is content-addressed (modality-free); trustNative marks the MCP door only
src/agent/blocks.ts:40: * @audit ISO 19011:2018 §6.4.6 (every block composition audit-trailed)
src/agent/harmonics.ts:25: * @audit Conservation Law 55 (tamper-reversibility-cost) — the fight is priced, not forbidden
src/agent/memory-writer.ts:27: * @audit Conservation Law 8 content-uuid
src/agent/memory-writer.ts:28: * @audit Conservation Law 10 referential-harmony
src/agent/sync/discovery.ts:21: * @audit Conservation Law 8 content-uuid · Law 62 coverage (each fill ↑ coverage)
src/agent/sync/horo.ts:30: * @audit Conservation Law 8 content-uuid · merge (many members, one breath/dedupe)
src/agent/team.ts:18: * @audit Conservation Law 8 content-uuid · merge set-union (no coordination)
src/agent/types.ts:16: * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
src/agent/ui/index.ts:11: * @audit every facet computed from the atom's content-uuid; coverage read live from the matrix
src/agents/accounting/finance.agent.ts:20: * @audit ISO-19011:2018 §6.4.6 audit-evidence
src/agents/mcp/atom-catalogue.generated.ts:10: * @audit ISO 19011:2018 §6.4.6 (catalogue traceable to the SKILL.md corpus)
src/agents/mcp/auto-generated.ts:45: * @audit ISO 19011:2018 §6.4.6 (auto-generation traceable to spec)
src/agents/mcp/dry-clean.test.ts:16: * @audit Conservation Law 50 mcp-dry-cleanliness
src/agents/mcp/dry-clean.ts:32: * @audit ISO 19011:2018 §6.4.6 (every duplication finding audit-trailed)
src/agents/mcp/i18n.ts:36: * @audit ISO 19011:2018 §6.4.6 (audit-evidence available in user's locale)
src/agents/mcp/presentation.ts:36: * @audit ISO 19011:2018 §6.4.6 (MCP surface SEO-traceable)
src/agents/mcp/rebuild-from-source.ts:38: * @audit ISO 19011:2018 §6.4.6 (rebuild plan audit-trailed)
src/agents/mcp/self-test.ts:35: * @audit ISO 19011:2018 §6.4.6 (every test result audit-trailed)
src/agents/mcp/standardization.ts:29: * @audit ISO 19011:2018 §6.4.6 (every tool standards-traceable)
src/agents/mcp/state-mutators.test.ts:20: * @audit ISO 27002 §5.4 segregation-of-duties (pinned scope)
src/agents/mcp/tool/_guards.test.ts:28: * @audit ISO 19011:2018 §6.4.6 (security-policy regression coverage)
src/agents/mcp/tool/_guards.ts:35: * @audit Conservation Law 58 uuid-self-protection (tenant-scope branch)
src/agents/mcp/tool/batch.ts:22: * @audit Conservation Law 4 event-graph-closure (emitOnStatusTransition fires per row)
src/agents/mcp/tool/chain.ts:15: * @audit Conservation Law 60 binding-uuid-is-blockchain-leaf
src/agents/mcp/tool/cloudflare.ts:9: * @audit Conservation Law 38 mcp-tool-standardization
src/agents/mcp/tool/consistency.ts:21: * @audit Conservation Law 38 mcp-tool-standardization (per-area boundaries)
src/agents/mcp/tool/error.ts:14: * @audit Conservation Law 64 errors-are-first-class-uuids
src/agents/mcp/tool/events.ts:9: * @audit Conservation Law 4 event-graph-closure
src/agents/mcp/tool/format.ts:15: * @audit Conservation Law 61 uuid-carries-features
src/agents/mcp/tool/governance.ts:12: * @audit Conservation Law 63 uuid-self-governance
src/agents/mcp/tool/integrity-extensions.ts:19: * @audit Conservation Law 8 + 55 (tamper-reversibility-cost)
src/agents/mcp/tool/kv.ts:20: * @audit Conservation Law 8 + 47 + 57 (universal uuid mapping)
src/agents/mcp/tool/security.ts:19: * @audit Conservation Law 58 uuid-self-protection
src/agents/mcp/tool/share.ts:15: * @audit Conservation Law 59 uuid-based-sharing-with-rbac
src/agents/registered/consistency.agent.ts:23: * @audit ISO 19011:2018 §6.4.6 (proposal + resolution audit-trailed)
src/agents/registered/hr.training.ts:20: * @audit ISO 19011 — the plan, the rate and the debt are deterministic functions of the gap
src/agents/registered/legal.conflict.ts:20: * @audit ABA Model Rule 1.7 conflict-of-interest (named; the form is the merge law)
src/ai/anomaly-detection.ts:12: * @audit ISO-19011:2018 §6.4.6 audit-evidence
src/ai/audit-summarisation.ts:11: * @audit ISO 19011:2018 §6.4.6 audit-evidence
src/ai/cloudflare-ai.ts:52: * @audit ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail
src/ai/durable-objects.ts:176: * @audit Conservation Law 8 content-uuid (per-leaf)
src/ai/durable-objects.ts:177: * @audit ISO 19011:2018 §6.4.6 tamper-evident audit-trail
src/ai/durable-objects.ts:20: * @audit ISO-19011:2018 audit-trail coordination-evidence
src/ai/models/index.ts:20: * @audit ISO-19011:2018 audit-trail model-catalogue-changes
src/ai/suggestions/index.ts:26: * @audit ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail
src/allocation/index.ts:46: * @audit ISO 19011 — reward is a deterministic, auditable function (no discretion)
src/analytics/TrendAnalysisCard.tsx:10: * @audit ISO-19011:2018 audit-trail trend-analysis
src/analytics/index.ts:17: * @audit computed on the live uuid-matrix + balance/entropy/standards, never hand-asserted
src/analytics/max-tamper-cost.ts:15: * @audit composed from @/tamper/cost crackVerdict at @/balance live coverage; never hand-asserted
src/analytics/test.ts:8: * @audit the report is recomputed from the live matrix, never a fixture
src/anchoring/index.ts:30: * @audit Conservation Law 55/62 (tamper cost; the anchor is mandatory external entropy)
src/anti/corruption/index.ts:22: * @audit ISO-19011:2018 audit-trail integrity-verification
src/api/audit/events/index.ts:24: * @audit ISO-19011:2018 audit-trail
src/app/(api)/api/subscriptions/create/route.ts:12: * @audit ISO-19011:2018 audit-trail
src/app/(api)/api/webhooks/stripe/route.ts:12: * @audit ISO-19011:2018 audit-trail
src/app/(frontend)/next/coherence/route.ts:32: * @audit ISO-19011:2018 reading logged to Analytics Engine (ANALYTICS_AI binding)
src/app/(frontend)/next/seed/route.ts:8: * @audit ISO-19011:2018 audit-trail seed-runs
src/architecture/invariant/checks.ts:1167: * @audit ISO-19011:2018 §6.4 audit-evidence-seed-schema-consistency
src/architecture/invariant/checks.ts:1234: * @audit  registry-vs-implementation traceability
src/architecture/invariant/checks.ts:1364: * @audit ISO-19011:2018 §6.4.6 audit-evidence-immutability
src/architecture/invariant/checks.ts:1575: * @audit ISO 19011:2018 §6.4.6
src/architecture/invariant/checks.ts:1593: * @audit ISO 19011:2018 §6.4.6
src/architecture/invariant/checks.ts:1647: * @audit ISO 19011:2018 §6.4.6
src/architecture/invariant/checks.ts:1683: * @audit ISO 19011:2018 §6.4.6 (self-coherence audit-trailed)
src/architecture/invariant/checks.ts:1709: * @audit ISO 19011:2018 §6.4.6 (clone-integrity provable at build time)
src/architecture/invariant/checks.ts:1746: * @audit ISO 19011:2018 §6.4.6 (SEO coupling provable per publish)
src/architecture/invariant/checks.ts:1774: * @audit ISO 19011:2018 §6.4.6 (vote aggregates audit-trailed)
src/architecture/invariant/checks.ts:182: * @audit ISO 19011:2018 §6.4 audit-evidence
src/architecture/invariant/checks.ts:2106: * @audit ISO 19011:2018 §6.4.6 (MCP surface SEO-traceable)
src/architecture/invariant/checks.ts:2133: * @audit ISO 19011:2018 §6.4.6 (every tool standards-traceable)
src/architecture/invariant/checks.ts:2164: * @audit ISO 27002 §5.4 segregation-of-duties
src/architecture/invariant/checks.ts:2238: * @audit ISO 19011:2018 §6.4.6 (every barrel-exported factory traceable to live surface)
src/architecture/invariant/checks.ts:2418: * @audit ISO 19011:2018 §6.4.6 (stream windows audit-trailed)
src/architecture/invariant/checks.ts:2453: * @audit ISO 19011:2018 §6.4.6 (every block composition audit-trailed)
src/architecture/invariant/checks.ts:2522: * @audit ISO 19011:2018 §6.4.6 event-graph closure (Law 4)
src/architecture/invariant/checks.ts:2582: * @audit Law 10 referential-harmony
src/architecture/invariant/checks.ts:2618: * @audit Law 10 referential-harmony (static counterpart)
src/architecture/invariant/checks.ts:2758: * @audit Law 10 referential-harmony (slug-uniqueness)
src/architecture/invariant/checks.ts:2804: * @audit ISO 19011:2018 §6.4.6 (persistence-trail for audit-evidence)
src/architecture/invariant/checks.ts:2865: * @audit Conservation Law 38 mcp-tool-standardization
src/architecture/invariant/checks.ts:2928: * @audit Conservation Law 38 mcp-tool-standardization
src/architecture/invariant/checks.ts:3034: * @audit ISO 19011:2018 §6.4.6 tamper-evident audit-trail (single path)
src/architecture/invariant/checks.ts:3250: * @audit Law 10 referential-harmony
src/architecture/invariant/checks.ts:3323: * @audit generic-naming-law — one concatenated word per atom
src/architecture/invariant/checks.ts:3391: * @audit [[config]] — collections are plural, models/pages singular
src/architecture/invariant/checks.ts:3436: * @audit double-entry of structure ([[balance]])
src/architecture/invariant/checks.ts:815: * @audit ISO 19011:2018 §6.4 audit-evidence
src/architecture/invariant/checks.ts:909: * @audit ISO 19011:2018 §6.4 audit-evidence
src/architecture/invariant/checks.ts:9: * @audit ISO-19011:2018 §6.4 audit-evidence-invariants
src/architecture/invariant/index.ts:19: * @audit ISO-19011:2018 §6.4 audit-evidence-invariants
src/architecture/invariant/onInit.ts:18: * @audit ISO-19011:2018 §6.4 audit-evidence-runtime-gate
src/architecture/invariant/trinity.ts:53: * @audit ISO 19011:2018 §6.4.6 (Trinity verdict at every audit)
src/architecture/invariant/types.ts:28: * @audit ISO-19011:2018 §6.4 audit-evidence
src/audit/events/index.ts:51: * @audit ISO-19011:2018 audit-trail
src/audit/submissions/index.ts:15: * @audit ISO-19011:2018 §6.4 audit-evidence
src/audit/trail/after/change/index.ts:22: * @audit ISO-19011:2018 §6.4.6 audit-evidence-collection
src/audit/trail/write-audit-event.test.ts:17: * @audit Conservation Law 8 content-addressable integrity (chainLeafUuid)
src/audit/trail/write-audit-event.test.ts:18: * @audit Conservation Law 53 self-referential-closure (pending reconciliation)
src/audit/trail/write-audit-event.ts:50: * @audit Conservation Law 8 content-addressable integrity
src/audit/trail/write-audit-event.ts:51: * @audit Conservation Law 53 self-referential-closure (pending-leaf reconciliation)
src/aura/find-gaps.ts:26: * @audit ISO 19011:2018 §6.4.6 audit-evidence
src/aura/index.ts:12: * @audit one resolver imported everywhere -- zero duplicated walk/norm/isRealDir
src/aura/live/index.ts:13: * @audit each frame counts the live atoms at a horo position; the signal is computed per step
src/aura/propose/index.ts:12: * @audit no link invented -- every proposal is a co-occurrence the tree witnesses
src/authenticated/or/published/index.ts:8: * @audit ISO-19011:2018 audit-trail draft-vs-published
src/auto/populate/created/by/index.ts:7: * @audit ISO-19011:2018 audit-trail authorship-attribution
src/auto/populate/tenant/index.ts:11: * @audit ISO-19011:2018 audit-trail before-validate-hooks
src/auto/set/timestamp/index.ts:8: * @audit ISO-19011:2018 audit-trail status-transition-timestamp
src/balance/index.ts:25: * @audit computed on the live uuid-matrix atom names, never hand-asserted
src/bank/accounts/bank/reconciliations/index.ts:19: * @audit ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation
src/bank/accounts/bank/transactions/index.ts:45: * @audit ISO-19011:2018 audit-trail reconciliation-line-evidence
src/bank/accounts/index.ts:13: * @audit ISO-19011:2018 audit-trail bank-account-master
src/bank/accounts/payment/runs/index.ts:29: * @audit ISO-19011:2018 audit-trail
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/bank/accounts/payroll/runs/hooks/payroll-disbursement.ts:32: * @audit ISO-19011:2018 audit-trail payroll-disbursement
src/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:19: * @audit ISO-19011:2018 audit-trail
src/bank/accounts/payroll/runs/hooks/payroll-run.ts:47: * @audit ISO-19011:2018 audit-trail payroll-evidence
src/bank/accounts/payroll/runs/index.ts:27: * @audit ISO-19011:2018 audit-trail payroll-evidence
src/bank/reconciliation.service/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/bank/reconciliation.service/index.ts:484:   * @audit ISO-19011:2018 audit-trail bank-reconciliation
src/bank/reconciliation.service/index.ts:592:   * @audit ISO-19011:2018 audit-trail aging-of-reconciling-items
src/bank/reconciliation.service/index.ts:650:   * @audit ISO-19011:2018 audit-trail adjusting-entry
src/bank/statement/import.service/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/billing/stripeWebhookHandlers.ts:433: * @audit ISO-19011:2018 audit-trail refund-cash-leg
src/biological/assets/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-biological-assets
src/biomass/index.ts:15: * @audit computed, never hand-asserted
src/bookable/resources/bookings/index.ts:21: * @audit ISO-19011:2018 audit-trail booking-lifecycle
src/bookable/resources/index.ts:17: * @audit ISO-19011:2018 audit-trail resource-master-changes
src/brow/index.ts:14: * @audit note, colour and uuid computed from the position math, never hand-asserted
src/budget/plannings/index.ts:32: * @audit ISO-19011:2018 audit-trail
src/bulk/op/index.ts:16: * @audit ISO-19011:2018 audit-trail bulk-ops-evidence
src/business/chain/backfill-producers.ts:18: * @audit ISO 19011:2018 §6.4.6 producer→event traceability
src/business/chain/chain-context.ts:17: * @audit ISO-19011:2018 audit-trail seed-evidence
src/business/chain/gen-doc.ts:9: * @audit ISO-19011:2018 audit-trail registry-traceability
src/business/chain/run-chain.ts:11: * @audit ISO-19011:2018 §6.4.6 audit-evidence
src/business/chain/types.ts:21: * @audit ISO-19011:2018 §6.4.6 audit-evidence-process
src/business/chain/wire-producers.ts:20: * @audit ISO 19011:2018 §6.4.6 producer→event traceability via BUSINESS_CHAINS
src/camt053/import.service/index.test.ts:9: * @audit ISO-19011:2018 audit-trail
src/camt053/import.service/index.ts:22: * @audit ISO-19011:2018 audit-trail
src/capture/media/index.ts:28: * @audit ISO-19011:2018 audit-trail test-recording-provenance
src/carriers/index.ts:15: * @audit ISO-19011:2018 audit-trail carrier-master
src/cases/index.ts:19: * @audit ISO-19011:2018 audit-trail file·hear·rule·seal
src/categories/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/chain/event/emitter/index.ts:14: * @audit ISO-19011:2018 audit-trail event-emit
src/chains/bulk/import/cycle/bulk-import-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/consignment/cycle/consignment-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/crm/lead/to/cash/crm-lead-to-cash-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/esg/reporting/cycle/esg-reporting-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/facility/maintenance/cycle/facility-maintenance-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/h2r/hire/to/retire/h2r-hire-to-retire-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/ifrs16/lease/cycle/ifrs16-lease-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/intercompany/consolidation/intercompany-consolidation-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/kyc/sanctions/review/kyc-sanctions-review-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/manufacturing/cycle/manufacturing-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/multi/invoice/payment/allocation/multi-invoice-payment-allocation-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/multi/vendor/pr/split/award/multi-vendor-pr-split-award-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/notification/dispatch/notification-dispatch-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/o2c/good/o2c-goods-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/o2c/services/over/time/o2c-services-over-time-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/procure/to/pay/procure-to-pay-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/provision/lifecycle/provision-lifecycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/record/to/report/record-to-report-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/resource/booking/cycle/resource-booking-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/subscription/billing/cycle/subscription-billing-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chains/workflow/approval/cycle/workflow-approval-cycle-page.tsx:10: * @audit ISO 9241-210:2019 human-centred-design
src/chakra/index.ts:16: * @audit note, colour and uuid computed from the position math, never hand-asserted
src/classify/tax/id/index.ts:13: * @audit ISO-19011:2018 audit-trail tax-id-classification-evidence
src/cloning/boot.ts:21: * @audit ISO 19011:2018 §6.4.6 (clone provenance preserved)
src/cloning/index.ts:10: * @audit ISO 19011:2018 §6.4.6 (clone provenance + Conservation Law 24)
src/cloning/verify.ts:11: * @audit ISO 19011:2018 §6.4.6
src/cloudflare/mediator-uuid-crypto.test.ts:21: * @audit Conservation Law 8 + Law 47 (uuid-anchored crypto)
src/cloudflare/plugin-access.ts:43: * @audit Conservation Law 38 mcp-tool-standardization
src/cloudflare/plugin-helper.ts:28: * @audit Conservation Law 38 mcp-tool-standardization
src/coherence/index.ts:19: * @audit computed from the input trace, never hand-asserted
src/collections/index.test.ts:11: * @audit ISO-19011:2018 §6.4 audit-evidence (every registered collection node verified)
src/collections/index.test.ts:68: * @audit computed from the live collections barrel + each node's slug, never hand-listed
src/collections/test.ts:11: * @audit ISO-19011:2018 §6.4 audit-evidence (every registered collection node verified)
src/collide/index.ts:17: * @audit collide is DEFINED here and DEFERRED — never applied to the live matrix in this atom
src/collider/index.ts:12: * @audit each check is a live computation in @/convention; the verdict is coverageCostLog2 of the product, never assumed
src/commitments/and/contingencies/index.ts:22: * @audit ISO-19011:2018 audit-trail off-balance-sheet
src/commitments/index.ts:31: * @audit ISO-19011:2018 audit-trail authorization-evidence
src/compliance/frameworks/compliance/requirements/compliance/gaps/index.ts:5: * @audit ISO-19011:2018 nonconformity
src/component/index.ts:19: * @audit a component's visible identity IS its atom-uuid pixel — computed, never hand-styled
src/compost/index.ts:17: * @audit computed, never hand-asserted
src/config/appCollections/index.ts:8: * @audit ISO-19011:2018 audit-trail config-completeness
src/config/appCollectionsRegistry.test.ts:6: * @audit ISO-19011:2018 audit-trail config-completeness
src/config/iso-4217-special/index.ts:63: * @audit Conservation Law 53 self-referential-closure (X-codes are
src/config/test.ts:6: * @audit ISO-19011:2018 audit-trail config-completeness
src/connections/index.ts:27: * @audit ISO-19011:2018 audit-trail transparent-relationship-ledger
src/consent/records/index.ts:13: * @audit ISO-19011:2018 audit-trail consent-evidence
src/conservation/index.ts:15: * @audit computed, never hand-asserted
src/consistency/apply/consistency-loop.test.ts:20: * @audit ISO 19011:2018 §6.4.6 — synthetic drift + recovery audit-trailable
src/consistency/apply/index.ts:20: * @audit ISO 19011:2018 §6.4.6 — applied-by-mcp transformations audited
src/consistency/apply/index.ts:356: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
src/consistency/apply/index.ts:419: * @audit ISO 9241-210:2019 human-centred-design
src/consistency/apply/index.ts:525: * @audit Slice PPPPPPPP-cont CREATE_GAP emergence
src/consolidation/eliminations/index.ts:18: * @audit ISO-19011:2018 audit-trail consolidation-evidence
src/convention/fresh/index.ts:27: * @audit imports + existence scanned LIVE from src/scripts/.vitepress; coverage never hand-asserted
src/convention/import/index.ts:15: * @audit coverage = importPurity() from @/tamper/import — scanned live over src, never hand-asserted
src/convention/index.ts:8: * @audit each coverage is a live computation in its atom; this file only collects them, no logic
src/convention/sealed/index.ts:13: * @audit catches + leaks scanned live from src; coverage = (catches − leaks)/catches, never assumed
src/convention/shallow/index.ts:16: * @audit coverage = importPurity() read live from @/tamper/import; never re-implemented, never defaulted
src/cost/centers/index.ts:19: * @audit ISO-19011:2018 audit-trail
src/cost/centers/job/positions/index.ts:11: * @audit ISO-19011:2018 audit-trail headcount-evidence
src/cost/centers/job/positions/recruiting/pipelines/index.ts:14: * @audit ISO-19011:2018 audit-trail recruiting-evidence
src/cost/centers/purchase/requisitions/index.ts:15: * @audit ISO-19011:2018 audit-trail requisition-evidence
src/country/api/client/index.ts:16: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/api/client/index.ts:477: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/api/client/index.ts:517: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/api/client/index.ts:550: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/api/client/index.ts:582: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/client/berlin-group-psd2.ts:17: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/client/bg-bank-statement-pdf.ts:33: * @audit ISO-19011:2018 audit-trail bank-statement-evidence
src/country/client/bg-holidays.ts:17: * @audit ISO-19011:2018 audit-trail business-day-evidence
src/country/client/bg-hybrid-invoice.ts:19: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/country/client/bg-nap-mtls.ts:15: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/country/client/bg-pades-signer.ts:25: * @audit ISO-19011:2018 audit-trail signature-evidence
src/country/client/bg-vat.ts:19: * @audit ISO-19011:2018 audit-trail vat-calculation-evidence
src/country/client/pdf-text-extractor-default.ts:20: * @audit ISO-19011:2018 audit-trail document-extraction-evidence
src/country/client/sign-cms-node.ts:20: * @audit ISO-19011:2018 audit-trail signature-evidence
src/country/clients/bg/bank/parser/fibank.ts:9: * @audit ISO-19011:2018 audit-trail bank-statement-evidence
src/country/clients/bg/bank/parser/index.ts:13: * @audit ISO-19011:2018 audit-trail bank-statement-evidence
src/country/clients/bg/bank/parser/unicredit-bulbank.ts:9: * @audit ISO-19011:2018 audit-trail bank-statement-evidence
src/country/context/index.ts:29: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/country/fallback/index.test.ts:17: * @audit Conservation Law 54 universal-identity-element (country instance)
src/country/fallback/index.ts:53: * @audit Conservation Law 54 universal-identity-element (country instance)
src/crown/index.ts:11: * @audit note, colour and uuid computed from the position math, never hand-asserted
src/csrd/disclosures/index.ts:22: * @audit ISAE 3000 limited-assurance (rises to reasonable-assurance under CSRD by 2028)
src/currency/fallback/currency-uuid.ts:60: * @audit Conservation Law 8  content-addressable integrity
src/currency/fallback/currency-uuid.ts:61: * @audit Conservation Law 47 type-level uuid
src/currency/fallback/currency-uuid.ts:62: * @audit Conservation Law 53 self-referential-closure (XXX identity)
src/currency/fallback/currency-uuid.ts:63: * @audit Conservation Law 54 universal identity element (this module formalises it for currency)
src/currency/fallback/index.test.ts:20: * @audit Conservation Law 53 self-referential-closure (currency identity element)
src/currency/fallback/index.ts:59: * @audit Conservation Law 53 self-referential-closure (currency identity element)
src/currency/rates/index.ts:18: * @audit ISO-19011:2018 audit-trail rate-update
src/customer/segments/index.ts:12: * @audit ISO-19011:2018 audit-trail crm-segmentation
src/customers/contracts/contract/amendments/index.ts:30: * @audit ISO-19011:2018 audit-trail amendment-lifecycle
src/customers/contracts/contract/performances/index.ts:31: * @audit ISO-19011:2018 audit-trail performance-evidence
src/customers/contracts/contract/signatures/index.ts:27: * @audit ISO-19011:2018 audit-trail e-signature-evidence
src/customers/contracts/index.ts:37: * @audit ISO-19011:2018 audit-trail contract-lifecycle
src/customers/contracts/performance/obligations/index.ts:29: * @audit ISO-19011:2018 audit-trail po-satisfaction
src/customers/kyc/checks/index.ts:9: * @audit ISO-19011:2018 audit-trail kyc-evidence
src/customers/projects/index.ts:26: * @audit ISO-19011:2018 audit-trail wip-evidence
src/customers/projects/project/milestones/index.ts:15: * @audit ISO-19011:2018 audit-trail milestone-evidence
src/customers/projects/project/tasks/index.ts:16: * @audit ISO-19011:2018 audit-trail wbs-evidence
src/customers/projects/wip/snapshots/index.ts:20: * @audit ISO-19011:2018 audit-trail wip-evidence
src/customers/quotes/index.ts:12: * @audit ISO-19011:2018 audit-trail quote-issuance
src/customers/sales/orders/index.ts:35: * @audit ISO-19011:2018 audit-trail
src/customers/sales/orders/returns/index.ts:9: * @audit ISO-19011:2018 audit-trail rma-evidence
src/customers/sales/orders/shipments/customs/declarations/index.ts:17: * @audit ISO-19011:2018 audit-trail customs-evidence
src/customers/sales/orders/shipments/index.ts:7: * @audit ISO-19011:2018 audit-trail fulfillment-evidence
src/customers/sales/orders/shipments/tracking/events/index.ts:15: * @audit ISO-19011:2018 audit-trail shipment-tracking
src/data/processing/activities/index.ts:13: * @audit ISO-19011:2018 audit-trail ropa-evidence
src/data/subject/requests/index.ts:16: * @audit ISO-19011:2018 audit-trail dsr-evidence
src/db/index.ts:11: * @audit the key is the content's uuid (content-addressed); dedup and the round-trip are computed
src/decentralization/index.ts:16: * @audit computed, never hand-asserted
src/decompression/index.ts:47: * @audit ISO 19011 — pay-over-time is a deterministic, auditable curve (no discretion)
src/default/index.ts:11: * @audit the architectural default is computed from the name (uuid → digit); nothing is assigned
src/deploy/index.ts:11: * @audit the band is the doubling 1·2·4·8; its consonance is computed by @/harmony, the order never assumed
src/depreciation.service/index.ts:27: * @audit ISO-19011:2018 audit-trail depreciation-evidence
src/design/index.ts:20: * @audit every token/palette entry is computed from an atom's uuid via pixel(); no hardcoded hex
src/development/research/index.ts:10: * @audit the cross binding is computed (entangle over the pair); never hand-asserted
src/digit/index.ts:20: * @audit the digit address is computed from the live matrix, never hand-maintained
src/dimension/index.ts:29: * @audit ISO 19011:2018 §6.4.6 (every dimensional plugin audit-trailed)
src/diversity/index.ts:14: * @audit computed, never hand-asserted
src/dna/index.ts:15: * @audit computed from the live matrix parent-chain; never hand-asserted
src/domain/verification/index.ts:15: * @audit the record value is the content-uuid (@/verification); computed, never hand-asserted
src/drone/index.ts:14: * @audit ISO 19011:2018 §6.4 reconnaissance is read-only evidence-gathering
src/dry/index.ts:11: * @audit the dry-clean is computed from the tree, never a hand-run script
src/dual/torus/fusion/index.ts:10: * @audit fuse is the merge of two content-addressed poles; the fusion cost is the double-torus ∞ law
src/duality/index.ts:15: * @audit dual pairs are read from the SKILL.md markers and trusted only when intentional — never asserted
src/dust/index.ts:21: * @audit composed from @/quantum (the live-matrix proof); the dust IS the proof, scattered
src/ecommerce/hooks/emitOrderLifecycleEvents.ts:26: * @audit ISO-19011:2018 audit-trail order-lifecycle
src/ecommerce/productValidation/index.ts:8: * @audit ISO-19011:2018 audit-trail
src/ecommerce/stripe/tenantConfirmOrder.ts:14: * @audit ISO-19011:2018 audit-trail
src/ecommerce/stripe/tenantStripeWebhook.ts:13: * @audit ISO-19011:2018 audit-trail
src/ecosystem/index.ts:17: * @audit computed, never hand-asserted
src/edifact/export.service/index.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/edifact/export.service/index.ts:18: * @audit ISO-19011:2018 audit-trail
src/emergence/index.ts:20: * @audit thirds are COMPUTED from the poles (horo composeSteps + uuid merge), never asserted
src/emission/index.ts:19: * @audit computed, never hand-asserted
src/emit/domain/event/index.ts:16: * @audit ISO-19011:2018 audit-trail event-log
src/employees/expense/reports/index.ts:15: * @audit ISO-19011:2018 audit-trail expense-evidence
src/employees/index.ts:19: * @audit ISO-19011:2018 audit-trail employee-master
src/employees/leave/requests/index.ts:27: * @audit ISO-19011:2018 audit-trail leave-evidence
src/employees/performance/reviews/index.ts:11: * @audit ISO-19011:2018 audit-trail performance-evidence
src/employees/sales/commissions/index.ts:16: * @audit ISO-19011:2018 audit-trail commission-evidence
src/employees/share/based/payments/index.ts:17: * @audit ISO 19011:2018 §6.4.6 audit-evidence-equity-grants
src/employees/time/entries/index.ts:13: * @audit ISO-19011:2018 audit-trail time-tracking-evidence
src/en/16931/collection-alignment.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/en/16931/types.test.ts:9: * @audit ISO-19011:2018 audit-trail
src/enforce/document/tenant/for/user/index.ts:20: * @audit ISO-19011:2018 audit-trail
src/enforce/segregation/of/duty/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/ensure/unique/slug/within/tenant/index.ts:19: * @audit ISO-19011:2018 audit-trail
src/entanglement/index.ts:23: * @audit computed from the live matrix edges + uuids; never hand-asserted
src/entropy/index.ts:15: * @audit computed from the live matrix, never hand-asserted
src/error/codedError.ts:11: * @audit ISO-19011:2018 audit-trail
src/error/index.ts:12: * @audit ISO-19011:2018 audit-trail error-tracing
src/error/registry.ts:11: * @audit ISO-19011:2018 audit-trail
src/error/uuid/index.test.ts:16: * @audit Conservation Law 64 errors-are-first-class-uuids
src/error/uuid/index.ts:51: * @audit Conservation Law 64 errors-are-first-class-uuids
src/etsi/en/319/142/evidence-attestation.test.ts:9: * @audit ISO-19011:2018 audit-trail visual-evidence sox-evidence-pack
src/etsi/en/319/142/profile.ts:25: * @audit ISO-19011:2018 audit-trail signature-evidence
src/etsi/en/319/142/signature-dictionary.test.ts:8: * @audit ISO-19011:2018 audit-trail signature-evidence
src/etsi/en/319/142/signature-dictionary.ts:23: * @audit ISO-19011:2018 audit-trail signature-evidence
src/event/emitter.service/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/evidence/attestation/index.ts:25: * @audit ISO-19011:2018 audit-trail visual-evidence sox-evidence-pack
src/evidence/attestations/index.ts:17: * @audit ISO-19011:2018 audit-trail attestation-evidence
src/expand/index.ts:23: * @audit composed from @/entropy + @/uuid/matrix (the live-matrix readings); re-proves nothing
src/expense/index.ts:14: * @audit entropy read live from @/entropy + @/tamper/import; billed as a balanced double-entry, never asserted
src/export/standards-import.ts:26: * @audit ISO-19011:2018 audit-trail
src/export/standards.service.ts:27: * @audit ISO-19011:2018 audit-trail
src/factory/auto-populate-tenant.ts:9: * @audit ISO-19011:2018 audit-trail before-validate-hooks
src/factory/collection-factory.test.ts:14: * @audit ISO 19011:2018 §6.4.6 — regression-guard for shared-field collision
src/factory/collection-factory.ts:227: * @audit ISO 19011:2018 §6.4.6 — backwards-compat path for collections
src/factory/collection-factory.ts:73: * @audit ISO-19011:2018 §6.4.6 audit-trail beforeValidate-tenant-populator
src/factory/recompute-parent-aggregates.ts:24: * @audit ISO-19011:2018 audit-trail derived-total-provenance
src/fair/value/measurements/index.ts:19: * @audit ISO 19011:2018 §6.4.6 audit-evidence-fair-value
src/fields/index.ts:7: * @audit Flat namespace to eliminate circular imports and duplicate definitions.
src/financial/reporting.service/index.ts:11: * @audit ISO-19011:2018 audit-trail
src/financial/statements/index.ts:29: * @audit ISO-19011:2018 audit-trail
src/fiscal/devices/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/fiscal/devices/sales/index.ts:26: * @audit ISO-19011:2018 audit-trail
src/fiscal/periods/carbon/emissions/index.ts:21: * @audit ISAE 3410 greenhouse-gas-statements
src/fiscal/periods/earnings/per/shares/index.ts:18: * @audit ISO 19011:2018 §6.4.6 audit-evidence-eps-computation
src/fiscal/periods/index.ts:30: * @audit ISO-19011:2018 audit-trail status-transition
src/fiscal/periods/post/balance/sheet/events/index.ts:17: * @audit ISO 19011:2018 §6.4.6 audit-evidence-subsequent-events
src/fiscal/periods/prior/period/adjustments/index.ts:16: * @audit ISO-19011:2018 audit-trail prior-period-restatement
src/fiscal/periods/provisions/index.ts:22: * @audit ISO-19011:2018 audit-trail provision-evidence
src/fixed/assets/depreciation/schedules/hooks/depreciation.ts:24: * @audit ISO-19011:2018 audit-trail period-expense
src/fixed/assets/depreciation/schedules/index.ts:13: * @audit ISO-19011:2018 audit-trail depreciation-evidence
src/fixed/assets/index.ts:29: * @audit ISO-19011:2018 audit-trail
src/fold/index.ts:14: * @audit depth/merges are the binary-fold math; the corpus counts are read live from the matrix
src/forge/index.ts:16: * @audit every field is read/derived from the live matrix indexes — never hand-asserted
src/fusion/index.ts:17: * @audit computed from the live matrix, never hand-asserted
src/fusion/reactor/index.ts:13: * @audit computed from the live matrix, never hand-asserted
src/fx/transactions/index.ts:19: * @audit ISO-19011:2018 audit-trail fx-revaluation-evidence
src/gl/account.service/index.ts:8: * @audit ISO-19011:2018 audit-trail
src/gl/account/resolver/index.ts:27: * @audit ISO-19011:2018 audit-trail account-resolution
src/gl/accounts/account/reconciliations/index.ts:24: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/gl/accounts/account/reconciliations/index.ts:25: * @audit ISO-19011:2018 audit-evidence preparer-reviewer-segregation
src/gl/accounts/bank/statements/hooks/bank-statement.ts:26: * @audit ISO-19011:2018 audit-trail bank-statement-import
src/gl/accounts/bank/statements/index.ts:24: * @audit ISO-19011:2018 audit-trail
src/gl/accounts/index.ts:14: * @audit ISO-19011:2018 audit-trail chart-of-accounts-change
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.test.ts:14: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts:32: * @audit ISO-19011:2018 audit-trail period-end-adjustment-evidence
src/gl/accounts/period/end/adjustments/index.ts:26: * @audit ISO-19011:2018 audit-trail
src/gl/accounts/recurring/journals/index.ts:21: * @audit ISO-19011:2018 audit-trail recurring-evidence
src/gl/accounts/tax/calculations/index.ts:23: * @audit ISO-19011:2018 audit-trail
src/gl/posting.service/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/gl/posting.service/index.ts:585:   * @audit ISO-19011:2018 audit-trail period-expense
src/gl/posting.service/index.ts:655:   * @audit ISO-19011:2018 audit-trail stock-ledger
src/gl/posting.service/index.ts:798:   * @audit ISO-19011:2018 audit-trail reconciliation-evidence
src/government/grants/index.ts:19: * @audit ISO-19011:2018 audit-trail grant-evidence
src/gravity/index.ts:16: * @audit computed from the live matrix, never hand-asserted
src/harmony/index.ts:13: * @audit harmony-checked horo bands (the horo state-ring law)
src/held/for/sale/classifications/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-disposal-classification
src/humandesign/index.ts:23: * @audit the combinatorics are computed; the metaphysics is named, never claimed
src/i18n/harvest/index.ts:32: * @audit ISO 19011:2018 §6.4.6 (harvest changes audit-trailed)
src/identification/index.ts:45: * @audit Conservation Law 10 referential-harmony (resolution = uuid-binding check)
src/identification/index.ts:46: * @audit Conservation Law 46 uuid-short-display (short uuid kinds enumerated)
src/identity/element/index.test.ts:24: * @audit Conservation Law 54 universal-identity-element
src/identity/element/index.ts:49: * @audit Conservation Law 53 self-referential-closure (identity element is the role's internal-fallback)
src/identity/element/index.ts:50: * @audit Conservation Law 54 universal-identity-element (this module formalises it)
src/identity/element/index.ts:51: * @audit Conservation Law 8 content-addressable integrity
src/identity/element/index.ts:52: * @audit Conservation Law 47 type uuid (each slot is a typed family)
src/ifrs/15/collection-alignment.test.ts:15: * @audit ISO-19011:2018 audit-trail
src/ifrs/15/types.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/ifrs/15/types.ts:11: * @audit ISO-19011:2018 audit-trail
src/ifrs/15/types.ts:280: * @audit ISO-19011:2018 audit-trail revenue-evidence
src/ifrs/16/types.test.ts:12: * @audit ISO-19011:2018 audit-trail
src/ifrs/16/types.ts:11: * @audit ISO-19011:2018 audit-trail
src/insurance/contracts/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
src/integrity/content-uuid.ts:46: * @audit ISO 19011:2018 §6.4.6 audit-evidence
src/integrity/envelope.ts:57: * @audit ISO 19011:2018 §6.4.6 (every encrypt/decrypt produces an audit-events row)
src/integrity/index.ts:8: * @audit ISO 19011:2018 §6.4.6 + SOX §404
src/integrity/resource-bound.ts:32: * @audit Conservation Law 55 (tamper-reversibility-cost) — physical bound
src/integrity/signatures.ts:50: * @audit ISO 19011:2018 §6.4.6 (every verification produces an audit-events row)
src/integrity/tamper-proof-uuid-field.ts:37: * @audit ISO 19011:2018 §6.4.6
src/integrity/tamper-reverse-cost.test.ts:15: * @audit Conservation Law 55 tamper-reversibility-cost
src/integrity/tamper-reverse-cost.ts:48: * @audit Conservation Law 8 + Slice TTTTTTTT (uuid-linked chain)
src/integrity/tamper-reverse-cost.ts:49: * @audit Conservation Law 23 (self-observation — every dim witnesses every other)
src/integrity/tamper-reverse-cost.ts:50: * @audit Conservation Law 53 (self-referential closure — internal fallback can replay)
src/integrity/tamper-reverse-cost.ts:51: * @audit Conservation Law 54 (universal identity element — baseline per dim)
src/integrity/tamper-reverse-cost.ts:52: * @audit Conservation Law 55 (this module — tamper-reversibility-cost)
src/integrity/tenant-key-registry.ts:36: * @audit ISO 19011:2018 §6.4.6 (every key fetch produces an audit row)
src/integrity/type-uuid.ts:55: * @audit ISO 19011:2018 §6.4.6 (type evolution audit-trailed)
src/integrity/uuid-linked-chain.ts:42: * @audit Conservation Law 8 content-uuid (per-leaf)
src/integrity/uuid-linked-chain.ts:43: * @audit Conservation Law 9 storage-redundancy (linkable across stores)
src/integrity/uuid-linked-chain.ts:44: * @audit ISO 19011:2018 §6.4.6 tamper-evident audit evidence
src/integrity/uuid-ref.ts:28: * @audit ISO 19011:2018 §6.4.6
src/integrity/uuid-short.ts:43: * @audit ISO 19011:2018 §6.4.6 (UI surfaces audit-trailed for length compliance)
src/integrity/uuid-stream.ts:56: * @audit ISO 19011:2018 §6.4.6 (every replica audit-trailed by uuid)
src/interactive/index.ts:11: * @audit the interactive face is renderAtom over the node's content-uuid; coverage read live from the matrix
src/internal/controls/audit/findings/court-docket.ts:12: * @audit ISO-19011:2018 audit-trail self-assessment
src/internal/controls/audit/findings/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/internal/controls/control/tests/audit/samples/index.ts:5: * @audit ISO-19011:2018 sampling-methodology
src/internal/controls/control/tests/index.ts:9: * @audit ISO-19011:2018 audit-trail
src/invoices/credit/memos/index.ts:24: * @audit ISO-19011:2018 audit-trail
src/invoices/credit/memos/refunds/index.ts:13: * @audit ISO-19011:2018 audit-trail refund-evidence
src/invoices/dunning/cycles/index.ts:26: * @audit ISO-19011:2018 audit-trail collections-evidence
src/invoices/hooks/bill.ts:20: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/invoices/hooks/gl-hooks-emit-events.test.ts:18: * @audit ISO-19011:2018 audit-trail event-driven-posting
src/invoices/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/invoices/hooks/invoice.ts:24: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/invoices/index.ts:63: * @audit ISO-19011:2018 audit-trail
src/invoices/invoice/lines/hooks/beforeValidate.ts:12: * @audit ISO-19011:2018 audit-trail
src/invoices/invoice/lines/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/invoices/invoice/lines/hooks/recomputeItemInventory.ts:19: * @audit ISO-19011:2018 audit-trail on-hand-provenance
src/invoices/payments/hooks/afterChange.ts:15: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/invoices/payments/hooks/beforeChange.ts:10: * @audit ISO-19011:2018 audit-trail
src/invoices/payments/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/invoices/payments/hooks/payment.ts:37: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/invoices/payments/index.ts:33: * @audit ISO-19011:2018 audit-trail
src/invoices/payments/payment/allocations/index.ts:22: * @audit ISO-19011:2018 audit-trail allocation-evidence
src/iso/13616/iban-bg.ts:24: * @audit ISO-19011:2018 audit-trail bank-account-evidence
src/iso/14289/profile.test.ts:7: * @audit ISO-19011:2018 audit-trail accessibility-conformance-evidence
src/iso/14289/profile.ts:24: * @audit ISO-19011:2018 audit-trail accessibility-conformance-evidence
src/iso/19005/metadata.ts:12: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/iso/19005/profile.test.ts:8: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/iso/19005/profile.ts:21: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/iso/19011/collection-alignment.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/iso/19011/types.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/iso/19011/types.ts:89: * @audit ISO-19011:2018 §6.4.6 audit-evidence
src/iso/20022/collection-alignment.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/iso/20022/types.test.ts:9: * @audit ISO-19011:2018 audit-trail
src/iso/20022/types.ts:15: * @audit ISO-19011:2018 audit-trail
src/iso/27002/access-coverage.test.ts:16: * @audit ISO-19011:2018 audit-trail control-coverage-evidence
src/iso/27002/coverage.ts:12: * @audit ISO-19011:2018 audit-trail control-coverage-evidence
src/iso/27002/types.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/iso/3166/1/country/bg-bank-statement-pdf.test.ts:13: * @audit ISO-19011:2018 audit-trail bank-statement-evidence
src/iso/3166/1/country/bg-clients.test.ts:14: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/iso/3166/1/country/bg-completeness.test.ts:26: * @audit ISO-19011:2018 audit-trail country-implementation-evidence
src/iso/3166/1/country/bg-generic-clients.test.ts:12: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/iso/3166/1/country/bg-holidays.test.ts:8: * @audit ISO-19011:2018 audit-trail business-day-evidence
src/iso/3166/1/country/bg-hybrid-invoice.test.ts:9: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/iso/3166/1/country/bg-pades-signer.test.ts:9: * @audit ISO-19011:2018 audit-trail signature-evidence
src/iso/3166/1/country/bg-vat.test.ts:9: * @audit ISO-19011:2018 audit-trail vat-calculation-evidence
src/iso/3166/1/country/bg.test.ts:12: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/iso/3166/1/country/bg.ts:29: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/iso/3166/1/country/eu-fallback-rates.test.ts:12: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/iso/3166/1/country/eu-fallback-resolvers.test.ts:15: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/iso/3166/1/country/index.ts:5: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/iso/3166/1/country/types.ts:19: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/iso/7064/egn-bg.test.ts:12: * @audit ISO-19011:2018 audit-trail
src/iso/7064/egn-bg.ts:29: * @audit ISO-19011:2018 audit-trail kyc-evidence
src/iso20022/export.service/index.test.ts:6: * @audit ISO-19011:2018 audit-trail
src/iso20022/export.service/index.ts:22: * @audit ISO-19011:2018 audit-trail
src/items/batches/index.ts:23: * @audit ISO-19011:2018 audit-trail lot-genealogy-evidence
src/items/bills/of/materials/index.ts:22: * @audit ISO-19011:2018 audit-trail bom-version-control
src/items/bills/of/materials/work/orders/cost/variances/index.ts:14: * @audit ISO-19011:2018 audit-trail variance-evidence
src/items/bills/of/materials/work/orders/operation/runs/index.ts:19: * @audit ISO-19011:2018 audit-trail production-execution
src/items/bills/of/materials/work/orders/production/receipts/index.ts:16: * @audit ISO-19011:2018 audit-trail production-receipt-evidence
src/items/bills/of/materials/work/orders/routings/index.ts:17: * @audit ISO-19011:2018 audit-trail routing-changes
src/items/hooks/afterChange.ts:12: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/items/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/items/hooks/item.ts:20: * @audit ISO-19011:2018 audit-trail
src/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:14: * @audit ISO-19011:2018 audit-trail
src/items/inventory/movements/hooks/inventory-movement.ts:20: * @audit ISO-19011:2018 audit-trail stock-ledger-evidence
src/items/inventory/movements/index.ts:16: * @audit ISO-19011:2018 audit-trail stock-ledger
src/items/packages/index.ts:16: * @audit ISO-19011:2018 audit-trail packing-evidence
src/items/purchase/orders/goods/receipts/index.ts:26: * @audit ISO-19011:2018 audit-trail receipt-evidence
src/items/purchase/orders/goods/receipts/index.ts:27: * @audit IFRS-15 §31 revenue-substantiation shipment-FOB-date
src/items/purchase/orders/index.ts:42: * @audit ISO-19011:2018 audit-trail purchase-commitment
src/items/purchase/orders/index.ts:43: * @audit IFRS-15 §38-42 GL-posting-timing FOB-point-substantiation
src/items/quality/inspections/index.ts:14: * @audit ISO-19011:2018 audit-trail inspection-evidence
src/jobs/bnbRatesSync/index.ts:19: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/jobs/dunningJob.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/jobs/dunningJob/index.ts:16: * @audit ISO-19011:2018 audit-trail
src/jobs/salesAuditFileJob/index.ts:12: * @audit ISO-19011:2018 §6.4 audit-evidence
src/journal/entries/gl/postings/index.ts:29: * @audit ISO-19011:2018 audit-trail
src/journal/entries/hooks/balanced-entry.ts:26: * @audit ISO-19011:2018 audit-trail double-entry-invariant
src/journal/entries/index.ts:33: * @audit ISO-19011:2018 audit-trail
src/journal/entries/rounding/adjustments/index.ts:15: * @audit ISO-19011:2018 audit-trail rounding-evidence
src/journal/entry/service/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/karma/index.ts:14: * @audit composed from @/entry (the double-entry); the balance is computed, never hand-asserted
src/leads/index.ts:15: * @audit ISO-19011:2018 audit-trail crm-pipeline
src/leads/opportunities/index.ts:12: * @audit ISO-19011:2018 audit-trail crm-pipeline
src/lease.service/index.ts:30: * @audit ISO-19011:2018 audit-trail
src/lease.service/lease-service.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/leases/index.ts:55: * @audit ISO-19011:2018 audit-trail
src/leases/lease/modifications/index.ts:25: * @audit ISO-19011:2018 audit-trail lease-modification-evidence
src/leases/lease/period/postings/hooks/lease-period-posting.test.ts:29: * @audit ISO-19011:2018 audit-trail
src/leases/lease/period/postings/hooks/lease-period-posting.ts:33: * @audit ISO-19011:2018 audit-trail period-evidence
src/leases/lease/period/postings/index.ts:26: * @audit ISO-19011:2018 audit-trail period-evidence
src/legal/entities/audit/committees/audit/committee/minutes/index.ts:5: * @audit ISO-19011:2018 audit-evidence
src/legal/entities/audit/committees/index.ts:6: * @audit ISO-19011:2018 oversight
src/legal/entities/beneficial/owners/index.ts:8: * @audit ISO-19011:2018 audit-trail ubo-evidence
src/legal/entities/business/combinations/index.ts:19: * @audit ISO 19011:2018 §6.4.6 audit-evidence-business-combination
src/legal/entities/consolidations/audit/reports/index.ts:15: * @audit ISO-19011:2018 reporting
src/legal/entities/disclosure/checklists/index.ts:6: * @audit ISO-19011:2018 completeness
src/legal/entities/index.ts:35: * @audit ISO-19011:2018 audit-trail entity-master
src/legal/entities/intercompany/transactions/index.ts:18: * @audit ISO-19011:2018 audit-trail intercompany-evidence
src/legal/entities/internal/audit/functions/index.ts:5: * @audit ISO-19011:2018 audit-programme
src/legal/entities/transfer/pricing/files/index.ts:22: * @audit ISO-19011:2018 audit-trail tp-evidence
src/legislation/index.ts:26: * @audit ISO-19011:2018 §6.4 audit-evidence (every law content-addressed + citable)
src/llm/uuid/index.ts:26: * @audit Conservation Law 8 (content-uuid) · 61 (uuid carries its own features)
src/locale/fallback/index.test.ts:19: * @audit Conservation Law 54 universal-identity-element
src/locale/fallback/index.ts:43: * @audit Conservation Law 53 self-referential-closure
src/locale/fallback/index.ts:44: * @audit Conservation Law 54 universal-identity-element (this is the locale instance)
src/localize/index.ts:43: * @audit Conservation Law 8 (content-uuid) · 55 (tamper-reverse-cost) · 62 (coverage)
src/lot/variants/index.ts:26: * @audit ISO-19011:2018 audit-trail variant-counter-changes
src/lot/work/phases/index.ts:27: * @audit ISO-19011:2018 audit-trail routing-step-changes
src/lots/index.ts:29: * @audit ISO-19011:2018 audit-trail lot-lifecycle confirmed·started·finished·closed
src/maintenance/requests/index.ts:14: * @audit ISO-19011:2018 audit-trail maintenance-request-evidence
src/maintenance/work/orders/index.ts:21: * @audit ISO-19011:2018 audit-trail work-order-evidence
src/mala/index.ts:17: * @audit the 108 identities + digital root are computed; the dualities-on-round read live from @/duality
src/manufacturing/seed/operations.ts:118: * @audit etrima_production.employee_contracts — BGN, min 90 · median 227 · max 960
src/manufacturing/seed/operations.ts:25: * @audit derived from etrima_production.work_phases — no value re-typed
src/manufacturing/seed/operations.ts:96: * @audit etrima_production.work_shifts — median 75%, p99 167%, attractor at 100%
src/manufacturing/seed/positions.ts:21: * @audit derived from etrima_production.positions — codes + pay not re-typed
src/manufacturing/seed/standards.ts:13: * @audit catalogue-only clients (clientImplemented:false) — endpoints are real, modules pending
src/marketing/LiveAuditCounter.tsx:10: * @audit ISO-19011:2018 audit-trail live-evidence
src/marketing/StandardsBadges.tsx:11: * @audit ISO-19011:2018 audit-trail standards-citation-index
src/marketing/types.ts:14: * @audit ISO-19011:2018 audit-trail data-driven-marketing
src/mcp/tool/metadata/index.ts:32: * @audit Conservation Law 38 mcp-tool-standardization (per-tool metadata)
src/media/audit/evidences/index.ts:6: * @audit ISO-19011:2018 evidence
src/media/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/media/products/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/media/sepa/mandates/index.ts:20: * @audit ISO-19011:2018 audit-trail mandate-evidence
src/membership/admin/mutate/access/index.ts:23: * @audit ISO-19011:2018 audit-trail
src/memories/index.ts:32: * @audit Conservation Law 8 content-uuid (per-memory contentUuid)
src/memories/index.ts:33: * @audit Conservation Law 10 referential-harmony (relatedTo graph)
src/message/index.ts:12: * @audit the uuid is self-decoding — every channel is an independent verify level
src/messages/index.ts:13: * @audit ISO-19011:2018 audit-trail message-provenance
src/meta/automation/index.ts:25: * @audit ISO 19011:2018 §6.4.6 (proposals + their resolution audit-trailed)
src/metatron/index.ts:20: * @audit counts computed on the live matrix, never hand-asserted
src/middleware/accounting/tenant-scope.ts:19: * @audit ISO-19011:2018 audit-trail
src/migrate/quaternary/index.ts:20: * @audit the folder law is computed from the live tree, never hand-maintained
src/mineral/resource/assets/index.ts:18: * @audit ISO 19011:2018 §6.4.6 audit-evidence-EE-assets
src/mirror/index.ts:14: * @audit forward/backward are the two word-orders; the value is the digital root of a commutative sum
src/modal/CreateJournalEntryModal.tsx:13: * @audit ISO-19011:2018 audit-trail journal-entry-creation
src/multi/currency.service/index.ts:19: * @audit ISO-19011:2018 audit-trail
src/multi/search/index.ts:40: * @audit Conservation Law 53 self-referential-closure (this is the internal half)
src/name/index.ts:11: * @audit uuidOfName is total — defined for ANY name, so every name folds; the identity is computed
src/naredba/n/18/unp.ts:20: * @audit ISO-19011:2018 audit-trail (УНП ties order ↔ fiscal-receipt ↔ payment)
src/navel/index.ts:11: * @audit note·colour·uuid computed from the position math, never hand-asserted
src/nist/incits/359/payload.ts:7: * @audit ISO-19011:2018 audit-trail role-assignment
src/notification/index.ts:21: * @audit ISO-19011:2018 audit-trail notification-evidence
src/notification/subscriber.ts:16: * @audit ISO-19011:2018 §6.4.6 audit-evidence-notification
src/observe/index.ts:16: * @audit observe/project are content-address folds; grounded is computed, hallucination is the negative
src/operators/index.ts:14: * @audit ISO-19011:2018 audit-trail
src/pack/items/index.ts:31: * @audit ISO-19011:2018 audit-trail dispatch line
src/packs/index.ts:35: * @audit ISO-19011:2018 audit-trail dispatch
src/pages/access/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/pages/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/particle/index.ts:11: * @audit composed from the live matrix node + its mass; never hand-asserted
src/party/aging.service.ts:13: * @audit ISO-19011:2018 audit-trail
src/party/workflow.service.ts:7: * @audit ISO-19011:2018 audit-trail state-transitions
src/patent/index.ts:23: * @audit anteriority is a timestamp comparison over anchor-bound digests; obviousness is a merge identity
src/payable/aging.service.ts:12: * @audit ISO-19011:2018 audit-trail
src/payable/workflow.service.ts:11: * @audit ISO-19011:2018 audit-trail state-transitions
src/payload.config.multi-tenant-admin.test.ts:17: * @audit ISO-19011:2018 audit-trail
src/payload.config.ts:518:       * @audit ISO-19011:2018 audit-trail dunning-cycle
src/payload.config.ts:538:       * @audit ISO-19011:2018 audit-trail external-system-evidence
src/payload.config.ts:556:       * @audit ISO-19011:2018 §6.4 audit-evidence
src/payload/command/index.ts:10: * @audit the command list is the installed CLI's; each uuid and the fold are computed
src/payment/methods/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/peppol/bis/3/types.test.ts:7: * @audit ISO-19011:2018 audit-trail
src/peppol/bis/3/types.ts:13: * @audit ISO-19011:2018 audit-trail
src/peppol/export.service/index.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/peppol/export.service/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/peppol/import.service/index.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/peppol/import.service/index.ts:20: * @audit ISO-19011:2018 audit-trail
src/period/end/adjustment.service/index.ts:33: * @audit ISO-19011:2018 audit-trail
src/persist/api/audit/event/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/pixel/index.ts:14: * @audit colour computed from the uuid's digit, never painted on
src/plasma/index.ts:17: * @audit ionization read from the live reciprocity/entropy; the cutoff is the double-torus floor
src/platform/readiness/index.ts:18: * @audit ISO 19011:2018 §6.4.6 (readiness audit-trailed)
src/plugin/dimensions.ts:39: * @audit ISO 19011:2018 §6.4.6 (every collection traceable to a dimension)
src/plugins/naming/index.ts:29: * @audit Conservation Law 8 content-uuid (schema identifiers are uuids too)
src/populate/published/at/index.ts:5: * @audit ISO-19011:2018 audit-trail publication-timestamp
src/position/index.ts:34: * @audit ISO 19011:2018 §6.4.6 — conditions are content-addressed, tamper-evident
src/posts/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/power/index.ts:32: * @audit Conservation Law 55 (tamper cost grows with history; audit stays O(N))
src/power/index.ts:33: * @audit Conservation Law 62 (coverage → ∞ ; here driven by live usage)
src/proof/bitcoin/genesi/index.ts:26: * @audit Conservation Law 55 (tamper cost grows with history; audit stays O(N))
src/proof/dry-proof.ts:39: * @audit ISO/IEC 27001 §A.18.2 (independent review of conformance)
src/proof/merkle/dag/index.ts:23: * @audit Conservation Law 55 (tamper cost grows with history; audit stays O(N))
src/proof/projection/index.ts:28: * @audit Conservation Law 55/62 (forge ≫ verify; coverage → ∞ at the anchor)
src/properties/index.ts:22: * @audit ISO-19011:2018 audit-trail property-master-changes
src/properties/investment/properties/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-investment-property
src/properties/spaces/index.ts:14: * @audit ISO-19011:2018 audit-trail space-master-changes
src/pwa/index.ts:49: * @audit ISO 19011:2018 §6.4.6 (PWA cache + queue audit-trailed)
src/quantum/accounting/index.ts:17: * @audit composed from @/dna (lineage) + @/karma (the double-entry); computed on the live matrix
src/quantum/app/index.ts:10: * @audit the proof is computed over the live matrix, never hand-asserted
src/quantum/aura/index.ts:20: * @audit composed from ../../entanglement (reciprocity) + ../../entropy (orphans); computed
src/quantum/consultant/index.ts:19: * @audit aspects + coverage read live from the corpus; the consultation ROI from quantum/consulting
src/quantum/consulting/index.ts:19: * @audit marginal cost is 0 on a cache hit; ROI = profit / sunk-cost → ∞ as reuses → ∞
src/quantum/entanglement/index.ts:19: * @audit composed from ../../entanglement + ../index.ts; computed on the live matrix
src/quantum/gravity/index.ts:19: * @audit composed from the live matrix mass + the double-torus cost; never hand-asserted
src/quantum/index.ts:18: * @audit computed from the live matrix, never hand-asserted
src/quantum/karma/index.ts:13: * @audit composed from @/dna (the chain) + @/karma (the net); computed on the live matrix
src/quantum/law/index.ts:15: * @audit the law-suffix is read from each SKILL.md ending, never asserted
src/quantum/marine/index.ts:21: * @audit zones are computed from distance; general average is proportional to value — never asserted
src/quantum/math/index.ts:14: * @audit composed from @/horo (number root) + @/digit (uuid root); computed
src/quantum/matrix/index.ts:20: * @audit computed from the live matrix, never hand-asserted
src/quantum/particle/index.ts:11: * @audit composed from @/particle (uuid) + @/digit (the ring digit); computed
src/quantum/reality/index.ts:9: * @audit composed from the live matrix collapse; never hand-asserted
src/quantum/research/index.ts:14: * @audit cost = agents × tokens (the run's real spend); value = entropy reduced; the ledger balances
src/quantum/train/index.ts:25: * @audit the agent-count bound is the merge/cache law; the 2/3 is the rodin ratio, marked symbolic
src/quantum/translator/index.ts:19: * @audit composed from ../../translator + ../../entanglement; computed on the live matrix
src/quantum/vocabulary/index.ts:10: * @audit the pull is computed over the live matrix + vocabulary; never hand-asserted
src/query/fingerprint/index.test.ts:20: * @audit Conservation Law 8 + Law 47 (content uuid at the type level)
src/query/fingerprint/index.ts:60: * @audit Conservation Law 8  content-addressable integrity (the queryUuid itself)
src/query/fingerprint/index.ts:61: * @audit Conservation Law 47 type uuid (ContentUuid<SqlQuery> is the type-level brand)
src/query/fingerprint/index.ts:62: * @audit Conservation Law 53 self-referential-closure (cached query result is the search-index fallback)
src/readme/index.ts:31: * @audit the README is content-addressed to its sources — readme:check is the trail
src/reality/index.ts:9: * @audit reality = the live matrix root; computed, never hand-asserted
src/receipts/index.ts:23: * @audit ISO-19011:2018 audit-trail
src/receivable/aging.service.ts:11: * @audit ISO-19011:2018 audit-trail
src/receivable/allowance.service.ts:8: * @audit ISO-19011:2018 audit-trail
src/receivable/workflow.service.ts:10: * @audit ISO-19011:2018 audit-trail state-transitions
src/recycle/index.ts:22: * @audit waste computed from entropy.orphans on the live matrix; recycling never fabricates a link
src/regulatory/deferral/accounts/index.ts:15: * @audit ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral
src/relocate/index.ts:13: * @audit computed over the live uuid-matrix mass ([[gravity]]); never hand-asserted
src/remote/media/import/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/render/index.ts:15: * @audit colour/sound/vibration all computed from the uuid's digit (pixel · signal · rodin), never painted on
src/research/development/index.ts:10: * @audit the cross binding is computed (entangle over the pair); never hand-asserted
src/reveal/index.ts:17: * @audit emergent triads are computed from the live matrix edges, never asserted
src/rodin/coil/index.ts:22: * @audit every residue computed on (ℤ/9ℤ) via @/horo, never hand-asserted
src/rodin/index.ts:25: * @audit every quantity computed from the residues / live matrix, never asserted
src/roles/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/roles/registry/index.ts:23: * @audit ISO-19011:2018 §6.4.6 audit-evidence-role-traceability
src/roles/user/roles/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/roles/user/roles/index.ts:14: * @audit ISO-19011:2018 audit-trail
src/root/index.ts:14: * @audit note·colour·uuid computed from the position math, never hand-asserted
src/sacral/index.ts:15: * @audit note·colour·uuid computed from the position math, never hand-asserted
src/saf/t/export.service/index.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/saf/t/export.service/index.ts:34: * @audit ISO-19011:2018 audit-trail tax-authority-audit-file
src/saf/t/export.service/source-documents.test.ts:6: * @audit ISO-19011:2018 audit-trail
src/saf/t/export.service/xml.test.ts:9: * @audit ISO-19011:2018 audit-trail
src/saf/t/types.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/saf/t/types.ts:18: * @audit ISO-19011:2018 audit-trail tax-authority-audit-file
src/safety/mode/index.test.ts:15: * @audit Conservation Law 58 uuid-self-protection
src/safety/mode/index.ts:45: * @audit Conservation Law 58 uuid-self-protection
src/sale/audit-file.ts:19: * @audit ISO-19011:2018 §6.4 audit-evidence
src/sale/daily-report.ts:15: * @audit ISO-19011:2018 §6.4 audit-evidence
src/sale/fiscal-receipt.ts:15: * @audit ISO-19011:2018 audit-trail
src/sale/fiscalize-revenue.ts:18: * @audit ISO-19011:2018 audit-trail event-driven
src/sale/operator-code.ts:13: * @audit ISO-19011:2018 audit-trail
src/sale/order-fiscalization.ts:12: * @audit ISO-19011:2018 audit-trail event-driven
src/sale/receipt-subscriber.ts:9: * @audit ISO-19011:2018 audit-trail event-driven
src/sale/reverse-sale.ts:13: * @audit ISO-19011:2018 audit-trail
src/sale/sale-event.ts:9: * @audit ISO-19011:2018 audit-trail event-driven
src/sale/sale-immutability.ts:14: * @audit ISO-19011:2018 audit-trail
src/sale/submit-audit-file.ts:10: * @audit ISO-19011:2018 §6.4 audit-evidence
src/sale/subscription-fiscalization.ts:16: * @audit ISO-19011:2018 audit-trail event-driven
src/sale/unp-sequence.ts:17: * @audit ISO-19011:2018 audit-trail
src/sale/validate-fiscal-refs.ts:14: * @audit ISO-19011:2018 audit-trail
src/sale/virtual-device.ts:17: * @audit ISO-19011:2018 audit-trail
src/scheduled/task/index.ts:7: * @audit ISO-19011:2018 §6.4.6 audit-evidence-scheduled-actions
src/scheduled/task/registry.ts:22: * @audit ISO-19011:2018 §6.4.6 audit-evidence-scheduled-actions
src/scheduled/task/runner.ts:15: * @audit ISO-19011:2018 §6.4.6 audit-evidence-scheduled-actions
src/scheduled/task/types.ts:5: * @audit ISO-19011:2018 §6.4.6
src/schema/test/index.ts:19: * @audit ISO 19011:2018 §6.5 (audit-evidence integrity)
src/scope/collectionScopes.ts:8: * @audit ISO-19011:2018 audit-trail
src/scope/constants.ts:7: * @audit ISO-19011:2018 audit-trail draft-vs-published
src/scope/filters.ts:7: * @audit ISO-19011:2018 audit-trail draft-vs-published
src/sdk/accounting-client/index.ts:11: * @audit ISO-19011:2018 audit-trail
src/search/engine/index.ts:8: * @audit pure over the live matrix node set; never hand-asserted
src/sectors/index.ts:22: * @audit ISO-19011:2018 audit-trail transparent-societal-ledger
src/seed/erpax-product-pages.ts:35: * @audit ISO-19011:2018 audit-trail seed-provenance
src/seed/index.ts:10: * @audit ISO-19011:2018 audit-trail seed-runs
src/seeds/template/compliance.ts:10: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/seeds/template/templates.test.ts:17: * @audit ISO-19011:2018 audit-trail seed-evidence
src/seeds/template/templates.ts:14: * @audit ISO-19011:2018 audit-trail seed-evidence
src/self/accounting/index.ts:23: * @audit ISO 19011:2018 §6.4.6 (every booking + filing + payment audit-trailed)
src/self/closure/index.test.ts:22: * @audit Conservation Law 53 self-referential-closure
src/self/closure/index.ts:39: * @audit Conservation Law 53 self-referential-closure
src/self/closure/provider/federation.ts:35: * @audit Conservation Law 24 cloning / mitosis (federation as self-replication)
src/self/closure/provider/federation.ts:36: * @audit Conservation Law 53 self-referential-closure
src/self/closure/provider/index.ts:26: * @audit Conservation Law 53 self-referential-closure
src/self/closure/provider/notification.ts:35: * @audit Conservation Law 53 self-referential-closure
src/self/closure/provider/search.ts:27: * @audit Conservation Law 53 self-referential-closure (search-index role)
src/self/closure/provider/signing.ts:58: * @audit Conservation Law 53 self-referential-closure
src/self/closure/types.ts:52: * @audit Conservation Law 53 self-referential-closure
src/self/reference/erpax.profile.ts:12: * @audit ISO 19011:2018 §6.4.6 (platform observes itself)
src/self/similar/index.ts:16: * @audit every quantity computed on (ℤ/9ℤ) via @/horo + @/rodin, never asserted
src/self/sufficient/index.ts:27: * @audit Conservation Law 53 (self-referential closure — internal fallback can replay)
src/self/sufficient/index.ts:28: * @audit Conservation Law 54 (universal identity element — every case already defined)
src/seo/index.ts:12: * @audit every field derived from the atom; seoCoverage reads the live tree, the gap is computed not assumed
src/shared/AddressBlock.tsx:19: * @audit ISO-19011:2018 audit-trail consistent-rendering
src/shared/AuditedTimestamp.tsx:17: * @audit ISO-19011:2018 audit-trail consistent-timestamps
src/shared/Money.tsx:19: * @audit ISO-19011:2018 audit-trail consistent-formatting
src/shared/address-validation.ts:9: * @audit ISO-19011:2018 audit-trail relocation-record
src/shared/common.ts:9: * @audit ISO-19011:2018 audit-trail relocation-record
src/shared/index.ts:25: * @audit ISO-19011:2018 audit-trail consistent-rendering
src/shareds/versionedDrafts.ts:9: * @audit ISO-19011:2018 audit-trail content-versioning
src/shares/index.ts:36: * @audit Conservation Law 59 uuid-based-sharing-with-rbac
src/shred/index.ts:18: * @audit content-uuid over the CipherEnvelope ⇒ shred preserves the chain (Law 8/55/60)
src/singularity/index.ts:23: * @audit composed from the live matrix mass + the double-torus cost; never hand-asserted
src/spec/extract.ts:16: * @audit ISO-19011:2018 §6.4.6 audit-evidence-spec-traceability
src/spec/generator/chain-registry-generator.ts:17: * @audit ISO 19011:2018 §6.4.6 spec-traceability
src/spec/generator/e2e-spec-extractor.ts:26: * @audit single-source-of-truth: spec ↔ generated captions
src/spec/generator/evidence-collector.ts:41: * @audit ISO-27001 A.5.36 conformance-with-policies
src/spec/generator/extractor.ts:16: *   @audit         <body> <id> [free-text]      ← alias for @standard
src/spec/generator/index.ts:11: * @audit ISO 19011:2018 §6.4 audit-evidence-spec-traceability
src/spec/generator/marketing-page-generator.ts:45: * @audit ISO-19011:2018 §6.4.6 audit-evidence visual-evidence
src/spec/generator/seed-generator.ts:35: * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
src/spec/generator/test-generator.ts:29: * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
src/stack/index.ts:17: * @audit the path is a verified palindrome; the new state is the input folded through every hop, computed
src/standard/collection/hook/index.ts:13: * @audit ISO-19011:2018 audit-trail
src/standard/truth/index.ts:26: * @audit the banner law is computed from the live tree, never hand-maintained
src/standards/index.ts:29: * @audit Conservation Law 27 standards-as-live-objects
src/standards/index.ts:30: * @audit Conservation Law 28 standards-supersession-tracking
src/standards/index.ts:31: * @audit Conservation Law 38 mcp-tool-standardization
src/storage/independence/index.ts:65: * @audit ISO 19011:2018 §6.4.6 (cross-backend verification audit-trailed)
src/stream/index.ts:48: * @audit ISO 19011:2018 §6.4.6 (every stream window audit-trailed)
src/strength/index.ts:12: * @audit strength = coverageCostLog2(dryness, slices); dryness read live from the dry residue, computed
src/subscription/plans/hooks/index.ts:11: * @audit ISO-19011:2018 audit-trail
src/subscription/plans/subscriptions/hooks/emitLifecycleEvents.ts:29: * @audit ISO-19011:2018 audit-trail subscription-lifecycle
src/subscription/plans/subscriptions/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/subscription/plans/subscriptions/usage/records/index.ts:20: * @audit ISO-19011:2018 audit-trail usage-evidence
src/sustainability/index.ts:18: * @audit computed, never hand-asserted
src/svg/hero/generator/index.ts:20: * @audit ISO-19011:2018 audit-trail seed-media-provenance
src/tags/index.ts:23: * @audit ISO-19011:2018 audit-trail label-changes
src/tags/taggings/counter.ts:13: * @audit ISO-19011:2018 audit-trail denormalised-aggregate
src/tags/taggings/index.ts:32: * @audit ISO-19011:2018 audit-trail tagging-provenance
src/tamper/cost/index.ts:49: * @audit Conservation Law 55/60 (tamper cost cascades through the uuid-chain)
src/tamper/cost/index.ts:50: * @audit Conservation Law 62 (coverage) enlarged by the invariant (semantic) + replica axes
src/tamper/import/index.ts:16: * @audit imports read from source; an index import resolves to a dir carrying index.ts, a deep one to a file
src/tax/jurisdictions/deferred/tax/items/index.ts:19: * @audit ISO 19011:2018 §6.4.6 audit-evidence-deferred-tax
src/tax/jurisdictions/tax/returns/index.ts:9: * @audit ISO-19011:2018 audit-trail tax-filing-evidence
src/tenant/context/index.ts:45: * @audit ISO-19011:2018 audit-trail config-cascade-resolution
src/tenant/role/types.ts:16: * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
src/tenant/roles/profile/country.profile.ts:56: * @audit ISO 19011:2018 §6.4.6 (treaty + multilateral envelope audit-trailed)
src/tenants/access/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/tenants/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/tenants/index.ts:112:     * @audit ISO-19011:2018 audit-trail config-change
src/terminals/index.ts:14: * @audit ISO-19011:2018 audit-trail
src/testing/config-discovery/index.ts:10: * @audit ISO-19011:2018 audit-trail config-discovery
src/testing/index.ts:13: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/testing/test-seed-factory.test.ts:6: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/testing/test-seed-factory/index.ts:18: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/testing/test-seed-factory/index.ts:38: * @audit ISO-19011:2018 audit-trail seed-validation
src/testing/test-seed-factory/index.ts:57: * @audit ISO-19011:2018 audit-trail seed-evidence-traceability
src/testing/test-setup/index.ts:7: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/throat/index.ts:14: * @audit note·colour·uuid computed from the position math, never hand-asserted
src/topology/torus.ts:52: * @audit ISO 19011:2018 §6.4.6 (every torus traversal audit-trailed)
src/train/index.ts:26: * @audit ISO 19011 — efficiency, debt and pay are deterministic functions of the gap
src/transaction/failures/index.ts:14: * @audit ISO-19011:2018 audit-trail failure-evidence
src/translations/collect/index.ts:28: * @audit aura gap parity — a non-atom word here is a mint-queue word there
src/translations/collect/test.ts:15: * @audit the matrix is never broken — green by construction, recomputed not trusted
src/translations/index.ts:41: * @audit Conservation Law 8 content-uuid
src/translations/index.ts:42: * @audit Conservation Law 10 referential-harmony (relatedTo back to the source row)
src/translations/index.ts:43: * @audit ISO 19011:2018 §6.4.6 (translation changes audit-trailed)
src/translator/index.ts:16: * @audit the interlingua is the content-uuid; computed from the live matrix, never hand-asserted
src/types/bank-reconciliation/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/types/bank-reconciliation/index.ts:162: * @audit ISO-19011:2018 audit-trail bank-reconciliation
src/types/bank-reconciliation/index.ts:215: * @audit ISO-19011:2018 audit-trail aging-of-reconciling-items
src/types/events/index.ts:269: * @audit ISO-19011:2018 audit-trail stock-ledger-evidence
src/types/events/index.ts:316: * @audit ISO-19011:2018 audit-trail period-expense
src/types/events/index.ts:410: * @audit ISO-19011:2018 audit-trail subscription-lifecycle
src/types/events/index.ts:498: * @audit ISO-19011:2018 audit-trail order-lifecycle
src/types/events/index.ts:8: * @audit ISO-19011:2018 audit-trail event-log
src/types/gl-account/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/types/multi-currency/index.ts:15: * @audit ISO-19011:2018 audit-trail
src/types/parties/index.ts:53: * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
src/types/period-end/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/ui/agent/index.ts:10: * @audit agentOf inverts agent/ui's route; the round-trip is the balance, computed not asserted
src/un/edifact/types.test.ts:7: * @audit ISO-19011:2018 audit-trail
src/un/edifact/types.ts:11: * @audit ISO-19011:2018 audit-trail
src/users/access/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/users/endpoints/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/users/hooks/firstUserSuperAdmin.ts:19: * @audit ISO-19011:2018 audit-trail genesis
src/users/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/users/index.ts:233:     * @audit ISO-19011:2018 audit-trail user-config-change
src/utility/aging-dry-keys.test.ts:19: * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
src/utility/bank-reconciliation-report.test.ts:26: * @audit ISO-19011:2018 audit-trail bank-reconciliation
src/utility/calculations.ts:199: * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
src/utility/depreciation-methods.test.ts:16: * @audit ISO-19011:2018 audit-trail period-expense-evidence
src/utility/period-lock.ts:21: * @audit ISO-19011:2018 audit-trail
src/uuid/chain/index.test.ts:16: * @audit Conservation Law 60 binding-uuid-is-blockchain-leaf
src/uuid/chain/index.ts:46: * @audit Conservation Law 8 + 47 + 55 + 57 + 60
src/uuid/format/coverage.ts:19: * @audit Conservation Law 61 + 62
src/uuid/format/index.test.ts:18: * @audit Conservation Law 61 uuid-carries-features
src/uuid/format/index.ts:60: * @audit Conservation Law 61 uuid-carries-features
src/uuid/governance/index.test.ts:16: * @audit Conservation Law 63 uuid-self-governance
src/uuid/governance/index.ts:47: * @audit Conservation Law 63 uuid-self-governance
src/uuid/kv/index.test.ts:18: * @audit Conservation Law 8 + 47 (uuid family at both sides of the pair)
src/uuid/kv/index.ts:55: * @audit Conservation Law 8 content-addressable integrity
src/uuid/kv/index.ts:56: * @audit Conservation Law 47 type uuid
src/uuid/kv/index.ts:57: * @audit Conservation Law 53 self-referential-closure (identity element
src/uuid/kv/index.ts:59: * @audit Conservation Law 54 universal identity element
src/uuid/kv/index.ts:60: * @audit Conservation Law 56 dynamic-trust (chain-of-bindings supersedes
src/uuid/llm/index.ts:24: * @audit Conservation Law 61 (uuid carries its own features) · 62 (coverage)
src/uuid/matrix/matrix.generated.ts:11: * @audit aura gap=0 parity (.claude/skills/aura/scan.mjs)
src/uuid/share/index.test.ts:17: * @audit Conservation Law 59 uuid-based-sharing-with-rbac
src/uuid/share/index.ts:51: * @audit Conservation Law 59 uuid-based-sharing
src/validate/address/index.ts:25: * @audit ISO-19011:2018 audit-trail address-validation
src/vendors/vendor/quotes/index.ts:15: * @audit ISO-19011:2018 audit-trail rfq-evidence
src/vendors/vendor/scorecards/index.ts:12: * @audit ISO-19011:2018 audit-trail vendor-evaluation
src/verification/index.ts:14: * @audit the token is the content-uuid; computed, never hand-asserted
src/version/index.ts:17: * @audit the version is derived, not declared — re-derivable from SKILL_INDEX on any clone
src/versions/cross/index.ts:24: * @audit ISO 19011:2018 §6.4.6 audit-evidence (the version chain IS the trail)
src/vitepress/index.ts:13: * @audit route computed from the path (path = address), pixel computed from the uuid — never assigned
src/vocabulary/index.ts:14: * @audit computed over the live uuid-matrix atoms against ./words.ts; never hand-asserted
src/vocabulary/test.ts:9: * @audit recomputed from the live matrix against ./words.ts, never a fixture
src/warehouse/locations/consignment/arrangements/consignment/inventories/index.ts:21: * @audit ISO-19011:2018 audit-trail consignment-on-hand-evidence
src/warehouse/locations/consignment/arrangements/consignment/sales/index.ts:25: * @audit ISO-19011:2018 audit-trail consignment-sale-evidence
src/warehouse/locations/consignment/arrangements/index.ts:25: * @audit ISO-19011:2018 audit-trail consignment-arrangement-evidence
src/warehouse/locations/index.ts:15: * @audit ISO-19011:2018 audit-trail location-master-changes
src/wave/index.ts:26: * @audit the entropy a wave borrows is read from the live matrix, never hand-asserted
src/website/seo-vortex.ts:34: * @audit ISO 19011:2018 §6.4.6 (every published SEO artefact audit-trailed)
src/widget/AccountReconciliationsPanel.tsx:9: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/widget/AuditLogWidget.tsx:8: * @audit ISO-19011:2018 audit-trail viewer
src/widget/BalanceSheetWidget.tsx:7: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/widget/CostCentersPanel.tsx:11: * @audit ISO-19011:2018 audit-trail
src/widget/DunningCyclesPanel.tsx:11: * @audit ISO-19011:2018 audit-trail
src/widget/EmployeesPanel.tsx:9: * @audit ISO-19011:2018 audit-trail
src/widget/IncomeStatementWidget.tsx:7: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/widget/LeasePeriodPostingsPanel.tsx:18: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/widget/LeasesPanel.tsx:11: * @audit ISO-19011:2018 audit-trail
src/widget/PaymentRunsPanel.tsx:11: * @audit ISO-19011:2018 audit-trail
src/widget/PayrollRunsPanel.tsx:11: * @audit ISO-19011:2018 audit-trail
src/widget/QuickActionsWidget.tsx:6: * @audit ISO-19011:2018 audit-trail user-action-traceability
src/widget/TrialBalanceWidget.tsx:7: * @audit ISO-19011:2018 audit-trail debit-credit-symmetry
src/work/centers/index.ts:17: * @audit ISO-19011:2018 audit-trail capacity-resource-changes
src/work/centers/operations/index.ts:12: * @audit ISO-19011:2018 audit-trail operation-definition-changes
src/work/orders/index.ts:68: * @audit ISO-19011:2018 audit-trail production-execution
src/work/phases/index.ts:25: * @audit ISO-19011:2018 audit-trail work-phase-definition-changes
src/work/shifts/index.ts:37: * @audit ISO-19011:2018 audit-trail labour-recording
src/workflow/concatenate/index.ts:20: * @audit pure — the algebra + an injected NAME→effect registry; effects at the boundary
src/workflow/definitions/index.ts:19: * @audit ISO-19011:2018 audit-trail workflow-evidence
src/workflow/definitions/workflow/instances/index.ts:15: * @audit ISO-19011:2018 §6.4.6 audit-evidence-workflow
src/workflow/index.ts:23: * @audit ISO-19011:2018 §6.4.6 audit-evidence-workflow
src/writing/index.ts:10: * @audit the principles are the coherence law applied to prose — craft, not decoration
tests/e2e/admin-evidence.e2e.spec.ts:28: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/categories/admin-data.e2e.spec.ts:11: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/categories/compliance-evidence.e2e.spec.ts:12: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/categories/cross-cutting.e2e.spec.ts:7: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/categories/public-content.e2e.spec.ts:12: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/erp-workflows/bulk-import-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/consignment-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/crm-lead-to-cash.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/esg-reporting-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/facility-maintenance-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/h2r-hire-to-retire.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/ifrs16-lease-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/intercompany-consolidation.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/kyc-sanctions-review.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/manufacturing-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/multi-invoice-payment-allocation.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/multi-vendor-pr-split-award.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/notification-dispatch.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/o2c-goods.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/o2c-services-over-time.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/order-to-cash.e2e.spec.ts:18: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/procure-to-pay.e2e.spec.ts:13: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/provision-lifecycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/record-to-report.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/resource-booking-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/subscription-billing-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/erp-workflows/workflow-approval-cycle.e2e.spec.ts:14: * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
tests/e2e/standards/audit/saf-t-export-flow.e2e.spec.ts:13: * @audit ISO-19011:2018 audit-trail visual-evidence saf-t-evidence-pack
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:11: * @audit ISO-19011:2018 audit-trail visual-evidence dpo-evidence-pack
tests/e2e/standards/compliance/sox-404-evidence-trail.e2e.spec.ts:18: * @audit ISO-19011:2018 audit-trail visual-evidence sox-evidence-pack
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:23: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:16: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/standards/ifrs/industry-template-pick.e2e.spec.ts:15: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts:22: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/e2e/standards/iso-3166-1/default-country-bg.e2e.spec.ts:18: * @audit ISO-19011:2018 audit-trail country-decision-evidence
tests/helpers/evidence.ts:167: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/helpers/evidence.ts:19: * @audit ISO-19011:2018 audit-trail visual-evidence
tests/helpers/mock-payload.ts:17: * @audit ISO-19011:2018 audit-trail test-fixture
tests/helpers/seedTenant.ts:9: * @audit ISO-19011:2018 audit-trail seed-cleanup
tests/helpers/seedUser.ts:7: * @audit ISO-19011:2018 audit-trail seed-cleanup
tests/helpers/standards-fixtures.ts:26: * @audit ISO-19011:2018 audit-trail standards-evidence
```

## @quality

```text
src/admin/TenantFilters.tsx:7: * @quality ISO-25010 usability admin-tooling
src/analytics/FinancialRatiosCard.tsx:11: * @quality ISO-25010 functional-suitability derived-metric
src/analytics/KPIDashboard.tsx:13: * @quality ISO-25010 functional-suitability derived-metric
src/analytics/TrendAnalysisCard.tsx:11: * @quality ISO-25010 functional-suitability historical-projection
src/analytics/types.ts:18: * @quality ISO-25010 maintainability shared-vocabulary
src/blocks/form/Component.tsx:22: * @quality ISO-25010 usability form-rendering
src/dashboard/index.tsx:19: * @quality ISO-25010 usability dashboard-presentation
src/discriminator/index.ts:13: * @quality ISO-25010 maintainability single-discriminator-vocabulary
src/horo/index.ts:21: * @quality ISO-25010 maintainability bounded-stable-state-space
src/navigation/index.tsx:7: * @quality ISO-25010 usability navigation
src/page/AnalyticsPage.tsx:15: * @quality ISO-25010 usability page-composition
src/types/sti/index.ts:19: * @quality ISO-25010 maintainability discriminated-subtype-safety
```
