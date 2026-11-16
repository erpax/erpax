# Standards citation index (generated)

> **Generated.** Do not edit by hand. Regenerate with
> `bash scripts/standards-citation-index.sh --write-index`. CI verifies this file is fresh via
> `bash scripts/standards-citation-index.sh --verify-index`.
>
> Source of truth: the JSDoc banners in code. This file is the
> materialised output of `bash scripts/standards-citation-index.sh`.

## @standard

```text
src/access/collections/search/readAccess.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/access/collections/shared/abilityAccess.ts:12: * @standard NIST INCITS-359-2012 §6.1 permission-assignment · §6.2 review-functions
src/access/collections/shared/anyone.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/access/collections/shared/appAccess.ts:17: * @standard NIST INCITS-359-2012 §6.1 permission-assignment
src/access/collections/shared/createMembershipAdminMutateAccess.ts:17: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/shared/isAdmin.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/shared/isDocumentOwner.ts:7: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/shared/multiTenantRead.ts:11: * @standard OWASP-ASVS V4 access-control
src/access/collections/shared/multiTenantRead.ts:165: * @standard NIST INCITS-359-2012 rbac object-scoped-role-assignment
src/access/collections/shared/multiTenantRead.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/shared/multiTenantRead.ts:5: * @standard NIST SP-800-162 attribute-based-access-control
src/access/collections/shared/partyAccess.ts:10: * @standard NIST INCITS-359-2012 §6.1 object-scoped role assignment
src/access/collections/shared/superAdminOnly.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/tenants/updateAndDeleteAccess.ts:9: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/users/createAccess.ts:12: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/users/readAccess.ts:16: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/collections/users/updateAndDeleteAccess.ts:11: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/fields/shared/adminOnlyFieldAccess.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/fields/shared/isCustomer.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control
src/access/index.ts:19: * @standard NIST SP 800-162 ABAC
src/access/index.ts:20: * @standard ISO 27001 A.5.10 access-control-policy
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
src/app/(frontend)/[locale]/page.tsx:7: * @standard schema.org WebSite
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:4: * @standard schema.org Article
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:5: * @standard schema.org BlogPosting
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:6: * @standard Open-Graph Protocol article-metadata
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:7: * @standard ISO-8601-1:2019 date-time published-at
src/app/(frontend)/[locale]/posts/[slug]/page.tsx:8: * @standard BCP-47 language-tag
src/app/(frontend)/[locale]/posts/page.tsx:4: * @standard schema.org Blog
src/app/(frontend)/[locale]/posts/page.tsx:5: * @standard schema.org CollectionPage
src/app/(frontend)/[locale]/posts/page.tsx:6: * @standard schema.org ItemList
src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx:4: * @standard schema.org CollectionPage
src/app/(frontend)/[locale]/pricing/page.tsx:8: * @standard schema.org Offer pricing
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
src/app/(frontend)/next/share/route.ts:11: * @standard OGP open-graph-protocol-1.0 og:image
src/app/(frontend)/next/system/health/route.ts:8: * @standard draft-inadarei-api-health-check health-check-response-format
src/app/(frontend)/not-found.tsx:5: * @standard schema.org WebPage
src/app/(frontend)/tenant-domains/[tenant]/[...slug]/page.tsx:4: * @standard schema.org WebPage
src/app/(frontend)/tenant-domains/layout.tsx:6: * @standard BCP-47 language-tag
src/app/(frontend)/tenant-slugs/[tenant]/[...slug]/page.tsx:4: * @standard schema.org WebPage
src/app/(frontend)/tenant-slugs/layout.tsx:6: * @standard BCP-47 language-tag
src/app/my-route/route.ts:6: * @standard OpenAPI 3.1 api-description
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
src/collections/account-reconciliations/index.ts:21: * @standard ISO-8601-1:2019 date-time as-of-date approved-at
src/collections/account-reconciliations/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/collections/activities/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/collections/activities/index.ts:9: * @standard rfc-5545 icalendar
src/collections/ai-suggestions/index.ts:17: * @standard rfc-9562 uuid suggestion-id
src/collections/ai-suggestions/index.ts:18: * @standard ISO-8601-1:2019 date-time inference-time
src/collections/ai-suggestions/index.ts:19: * @standard ISO/IEC 23894:2023 ai-risk-management
src/collections/ai-suggestions/index.ts:20: * @standard ISO/IEC 42001:2023 ai-management-system
src/collections/ai-suggestions/index.ts:21: * @standard NIST AI-RMF-1.0 ai-risk-management-framework
src/collections/api-audit-events/index.ts:22: * @standard ISO-19011:2018 audit-trail external-system-evidence
src/collections/api-audit-events/index.ts:23: * @standard ISO/IEC-27007:2020 isms-auditing
src/collections/audit-committee-minutes/index.ts:6: * @standard ISO-8601-1:2019 meeting-date
src/collections/audit-committees/index.ts:5: * @standard SEC Rule 10A-3 audit-committee
src/collections/audit-events/index.ts:41: * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
src/collections/audit-events/index.ts:42: * @standard ISO-19011:2018 §6.5 audit-conclusions
src/collections/audit-events/index.ts:43: * @standard ISO/IEC 27037:2012 evidence-preservation
src/collections/audit-evidence/index.ts:4: * @standard ISA-500 audit-evidence
src/collections/audit-evidence/index.ts:5: * @standard PCAOB AS-1105 audit-evidence
src/collections/audit-findings/index.ts:7: * @standard ISO-19011:2018 audit-finding
src/collections/audit-findings/index.ts:8: * @standard ISO/IEC-27007:2020 ISMS-auditing
src/collections/audit-reports/index.ts:14:  * @standard ISA-700 auditor-report
src/collections/audit-samples/index.ts:4: * @standard ISA-530 audit-sampling
src/collections/audit-submissions/index.ts:14: * @standard BG Наредба-Н-18 §Приложение-38 audit-file-submission-log
src/collections/bank-accounts/index.ts:10: * @standard ISO-20022 financial-messaging account-identification
src/collections/bank-accounts/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/collections/bank-accounts/index.ts:8: * @standard ISO-13616-1:2020 iban
src/collections/bank-accounts/index.ts:9: * @standard ISO-9362:2022 bic
src/collections/bank-reconciliations/index.ts:14: * @standard ISO-4217:2015 currency-codes
src/collections/bank-reconciliations/index.ts:15: * @standard ISO-8601-1:2019 date-time reconciliation-date
src/collections/bank-reconciliations/index.ts:16: * @standard ISO-20022 camt.053 bank-to-customer-statement (input)
src/collections/bank-statements/index.ts:16: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/collections/bank-statements/index.ts:17: * @standard ISO-13616-1:2020 iban
src/collections/bank-statements/index.ts:18: * @standard ISO-9362:2022 bic
src/collections/bank-statements/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/collections/bank-statements/index.ts:20: * @standard ISO-8601-1:2019 date-time statement-date period-start reconciled-at
src/collections/bank-transactions/index.ts:31: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/collections/bank-transactions/index.ts:32: * @standard ISO-20022 ExternalBankTransactionDomain1Code
src/collections/bank-transactions/index.ts:33: * @standard ISO-20022 ExternalBankTransactionFamily1Code
src/collections/bank-transactions/index.ts:34: * @standard ISO-20022 ExternalBankTransactionSubFamily1Code
src/collections/bank-transactions/index.ts:35: * @standard ISO-20022 EntryStatus2Code
src/collections/bank-transactions/index.ts:36: * @standard ISO-20022 CreditDebitCode
src/collections/bank-transactions/index.ts:37: * @standard ISO-20022 ChargeBearerType1Code
src/collections/bank-transactions/index.ts:38: * @standard ISO-11649:2009 financial-services-creditor-reference
src/collections/bank-transactions/index.ts:39: * @standard ISO-13616-1:2020 iban
src/collections/bank-transactions/index.ts:40: * @standard ISO-9362:2022 bic
src/collections/bank-transactions/index.ts:41: * @standard ISO-4217:2015 currency-codes
src/collections/bank-transactions/index.ts:42: * @standard ISO-8601-1:2019 date-time value-date booking-date matched-at
src/collections/batches/index.ts:15: * @standard ISO 9001:2015 §8.5.2 identification-and-traceability
src/collections/batches/index.ts:16: * @standard ISO 22005:2007 feed-and-food-chain-traceability
src/collections/batches/index.ts:17: * @standard GS1 General Specifications AI(10) batch/lot AI(17) expiry AI(11) production-date
src/collections/batches/index.ts:18: * @standard EU Regulation 178/2002 Art 18 one-step-back-one-step-forward
src/collections/batches/index.ts:19: * @standard FDA 21 CFR 211.122 211.130 pharma-lot-control
src/collections/batches/index.ts:20: * @standard IATF 16949:2016 §8.5.2.1 automotive-traceability
src/collections/batches/index.ts:21: * @standard ISO-8601-1:2019 date-time manufacture-expiry-dates
src/collections/beneficial-owners/index.ts:4: * @standard ISO-17442-1:2020 lei
src/collections/bills-of-materials/index.ts:16: * @standard ISO-8601-1:2019 date-time effective-from / to
src/collections/bills-of-materials/index.ts:17: * @standard ISA-95:2013 enterprise-control-system-integration §B.4
src/collections/bills-of-materials/index.ts:18: * @standard ISO 22400:2014 manufacturing-operations-management KPIs
src/collections/biological-assets/index.ts:12: * @standard IFRS IAS-41 §10 recognition-criteria
src/collections/biological-assets/index.ts:13: * @standard IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell
src/collections/biological-assets/index.ts:14: * @standard IFRS IAS-41 §13 biological-transformation
src/collections/biological-assets/index.ts:15: * @standard IFRS IAS-41 §26 gains-losses-recognised-in-pnl
src/collections/biological-assets/index.ts:16: * @standard IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment
src/collections/biological-assets/index.ts:17: * @standard IFRS IAS-41 §40 disclosure-by-class
src/collections/biological-assets/index.ts:18: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/collections/biological-assets/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/collections/biological-assets/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/collections/board-actions/index.ts:4: * @standard OECD G20 principles-of-corporate-governance
src/collections/board-actions/index.ts:6: * @standard ISO-37000:2021 governance-of-organizations
src/collections/bookable-resources/index.ts:11: * @standard ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)
src/collections/bookable-resources/index.ts:12: * @standard ISO-3166-1:2020 country-codes resource-country
src/collections/bookable-resources/index.ts:13: * @standard ISO-4217:2015 currency-codes pricing
src/collections/bookable-resources/index.ts:14: * @standard ISO-8601-1:2019 date-time availability-windows
src/collections/bookable-resources/index.ts:15: * @standard ISO-55000:2014 asset-management resource-as-asset
src/collections/bookable-resources/index.ts:16: * @standard ISO-41001:2018 facility-management bookable-spaces
src/collections/bookings/index.ts:11: * @standard ISO-18513:2021 tourism-services-vocabulary check-in check-out
src/collections/bookings/index.ts:12: * @standard ISO-8601-1:2019 date-time start-end-windows
src/collections/bookings/index.ts:13: * @standard ISO-4217:2015 currency-codes pricing
src/collections/bookings/index.ts:14: * @standard rfc-5545 icalendar-rrule recurring-bookings
src/collections/bookings/index.ts:15: * @standard HTNG-2017 hotel-technology-next-generation
src/collections/bookings/index.ts:16: * @standard OpenTravel Alliance reservation-message
src/collections/budget-planning/index.ts:23: * @standard ISO-4217:2015 currency-codes
src/collections/budget-planning/index.ts:24: * @standard ISO-8601-1:2019 date-time fiscal-year period
src/collections/business-combinations/index.ts:11: * @standard IFRS IFRS-3 §10-§13 identifying-the-acquirer
src/collections/business-combinations/index.ts:12: * @standard IFRS IFRS-3 §18-§31 recognition-and-measurement-of-net-assets-acquired
src/collections/business-combinations/index.ts:13: * @standard IFRS IFRS-3 §32 goodwill-or-bargain-purchase-gain
src/collections/business-combinations/index.ts:14: * @standard IFRS IFRS-3 §B41-B49 reverse-acquisitions
src/collections/business-combinations/index.ts:15: * @standard IFRS IFRS-10 §B86 consolidation
src/collections/business-combinations/index.ts:16: * @standard US-GAAP ASC-805 business-combinations
src/collections/business-combinations/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/business-combinations/index.ts:18: * @standard ISO-8601-1:2019 date-time acquisition-date
src/collections/carbon-emissions/index.ts:13: * @standard ISO 14064-1:2018 organisation-level-ghg-quantification
src/collections/carbon-emissions/index.ts:14: * @standard ISO 14067:2018 carbon-footprint-of-products
src/collections/carbon-emissions/index.ts:15: * @standard GHG Protocol Corporate Standard (revised 2015)
src/collections/carbon-emissions/index.ts:16: * @standard GHG Protocol Scope 2 Guidance (2015)
src/collections/carbon-emissions/index.ts:17: * @standard GHG Protocol Scope 3 Standard (2011)
src/collections/carbon-emissions/index.ts:18: * @standard EU ESRS E1 §44-50 ghg-emissions-disclosure
src/collections/carbon-emissions/index.ts:19: * @standard EU ESRS E1 AR-25 location-vs-market-based
src/collections/carriers/index.ts:10: * @standard ISO-8601-1:2019 date-time effective-from
src/collections/carriers/index.ts:11: * @standard INCOTERMS 2020 international-commercial-terms
src/collections/carriers/index.ts:12: * @standard IATA DGR dangerous-goods-regulations
src/collections/carriers/index.ts:13: * @standard IMDG-Code maritime-dangerous-goods
src/collections/carriers/index.ts:14: * @standard UPU-S10 universal-postal-union shipment-identifier
src/collections/cases/index.ts:17: * @standard UN-COFOG-03 public-order-and-safety law-courts
src/collections/cases/index.ts:18: * @standard ISO-19011:2018 ISA-500 evidence chain-of-custody append-only
src/collections/categories/index.ts:13: * @standard schema.org Category
src/collections/categories/index.ts:14: * @standard schema.org DefinedTerm taxonomic-term
src/collections/chat/index.ts:15: * @standard W3C ActivityPub server-to-server activity-distribution (the model)
src/collections/chat/index.ts:16: * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
src/collections/chat/index.ts:17: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
src/collections/commitments/index.ts:23: * @standard SOX §302 management-certification internal-controls
src/collections/commitments/index.ts:24: * @standard SOX §404 internal-controls spending-authority
src/collections/commitments/index.ts:25: * @standard COSO Internal-Control-Integrated-Framework 2013 authorization
src/collections/commitments/index.ts:26: * @standard IFRS IFRS-15 §10 contract-with-customer
src/collections/commitments/index.ts:27: * @standard IFRS IAS-1 presentation-of-financial-statements
src/collections/commitments/index.ts:28: * @standard ISO-4217:2015 currency-codes
src/collections/commitments/index.ts:29: * @standard ISO-8601-1:2019 date-time authorization-date
src/collections/compliance-deadlines/index.ts:4: * @standard ISO-37301:2021 compliance-management-systems
src/collections/compliance-deadlines/index.ts:5: * @standard ISO-8601-1:2019 due-date
src/collections/compliance-frameworks/index.ts:4: * @standard ISO-37301:2021 compliance-management-systems
src/collections/compliance-frameworks/index.ts:5: * @standard COSO-2013 internal-control-integrated-framework
src/collections/compliance-gaps/index.ts:4: * @standard ISO-37301:2021 compliance-management
src/collections/compliance-requirements/index.ts:4: * @standard ISO-37301:2021 obligation-register
src/collections/connections/index.ts:20: * @standard W3C ActivityStreams 2.0 social-graph-vocabulary (Follow/Block/Like)
src/collections/connections/index.ts:21: * @standard W3C ActivityPub server-to-server federation (the cross-platform sync)
src/collections/connections/index.ts:22: * @standard OASIS UBL 2.1 business-relationship (B2B trade edges)
src/collections/connections/index.ts:23: * @standard Peppol BIS billing-and-procurement (B2B / B2G interoperability)
src/collections/connections/index.ts:24: * @standard ISO 20022 financial-business-party-relationships
src/collections/connections/index.ts:25: * @standard RFC-4122 §4.3 content-uuid edge-identity
src/collections/consent-records/index.ts:8: * @standard ISO-8601-1:2019 date-time given-at withdrawn-at
src/collections/consignment-arrangements/index.ts:16: * @standard EN-16931:2017 §BG-15 deliver-to-information
src/collections/consignment-arrangements/index.ts:17: * @standard INCOTERMS 2020 (CPT / CIP / DDP control-transfer points)
src/collections/consignment-arrangements/index.ts:18: * @standard ISO-3166-1:2020 country-codes
src/collections/consignment-arrangements/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/collections/consignment-inventory/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/collections/consignment-inventory/index.ts:16: * @standard ISO-8601-1:2019 date-time as-of-date
src/collections/consignment-sales/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/consignment-sales/index.ts:18: * @standard ISO-8601-1:2019 date-time sale-date
src/collections/consolidation-eliminations/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/collections/consolidation-eliminations/index.ts:13: * @standard ISO-8601-1:2019 date-time consolidation-date
src/collections/contracts/index.ts:22: * @standard IFRS IFRS-15 §10 contract-with-customer
src/collections/contracts/index.ts:23: * @standard IFRS IFRS-15 §17 contract-combination
src/collections/contracts/index.ts:24: * @standard IFRS IFRS-15 §22 performance-obligations
src/collections/contracts/index.ts:25: * @standard IFRS IFRS-15 §47 transaction-price decomposition
src/collections/contracts/index.ts:26: * @standard IFRS IFRS-15 §50-59 variable-consideration
src/collections/contracts/index.ts:27: * @standard IFRS IFRS-15 §60-65 financing-component
src/collections/contracts/index.ts:28: * @standard IFRS IAS-1 presentation-of-financial-statements
src/collections/contracts/index.ts:29: * @standard US-GAAP ASC-606-10-25 contract-existence
src/collections/contracts/index.ts:30: * @standard US-GAAP ASC-606-10-25-9 contract-combination
src/collections/contracts/index.ts:31: * @standard US-GAAP ASC-606-10-25-13 contract-modifications
src/collections/contracts/index.ts:32: * @standard ISO-4217:2015 currency-codes
src/collections/contracts/index.ts:33: * @standard ISO-8601-1:2019 date-time effective-from effective-to
src/collections/control-tests/index.ts:7: * @standard ISO-19011:2018 audit-sampling
src/collections/cost-centers/index.ts:14: * @standard ISO-3166-1:2020 country-codes geographic-segment-tagging
src/collections/cost-centers/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/collections/cost-variances/index.ts:11: * @standard ISO-8601-1:2019 date-time variance-date
src/collections/credit-memos/index.ts:27: * @standard ISO-4217:2015 currency-codes
src/collections/credit-memos/index.ts:28: * @standard ISO-8601-1:2019 date-time issued-at applied-at settled-at
src/collections/credit-memos/index.ts:29: * @standard EN-16931:2017 credit-note-semantic-model
src/collections/credit-memos/index.ts:30: * @standard ISO-20022 pacs.004 payment-return
src/collections/csrd-disclosures/index.ts:15: * @standard EU CSRD Directive 2022/2464
src/collections/csrd-disclosures/index.ts:16: * @standard EU ESRS 1 General Requirements
src/collections/csrd-disclosures/index.ts:17: * @standard EU ESRS 2 General Disclosures
src/collections/csrd-disclosures/index.ts:18: * @standard ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)
src/collections/csrd-disclosures/index.ts:19: * @standard EU EFRAG ESRS-XBRL taxonomy
src/collections/currency-rates/index.ts:14: * @standard ISO-4217:2015 currency-codes from-currency to-currency
src/collections/currency-rates/index.ts:15: * @standard ISO-8601-1:2019 date-time rate-date
src/collections/customer-segments/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/collections/customs-declarations/index.ts:11: * @standard ISO-8601-1:2019 date-time declaration-date
src/collections/customs-declarations/index.ts:12: * @standard ISO-3166-1:2020 country-codes country-of-origin
src/collections/customs-declarations/index.ts:13: * @standard ISO-4217:2015 currency-codes valuation-currency
src/collections/customs-declarations/index.ts:14: * @standard WCO HS Convention harmonised-system
src/collections/customs-declarations/index.ts:15: * @standard EU UCC Regulation 952/2013 union-customs-code
src/collections/customs-declarations/index.ts:16: * @standard WCO Data Model 3.x customs-data-elements
src/collections/data-processing-activities/index.ts:8: * @standard ISO-8601-1:2019 date-time review-due-at
src/collections/data-subject-requests/index.ts:8: * @standard ISO-8601-1:2019 date-time submitted-at completed-at
src/collections/deferred-tax-items/index.ts:11: * @standard IFRS IAS-12 §15-§68 income-taxes
src/collections/deferred-tax-items/index.ts:12: * @standard IFRS IAS-12 §29 deductible-temporary-differences
src/collections/deferred-tax-items/index.ts:13: * @standard IFRS IAS-12 §34 deferred-tax-asset-recognition
src/collections/deferred-tax-items/index.ts:14: * @standard IFRS IAS-12 §47 measurement-using-substantively-enacted-rate
src/collections/deferred-tax-items/index.ts:15: * @standard IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities
src/collections/deferred-tax-items/index.ts:16: * @standard US-GAAP ASC-740 income-taxes
src/collections/deferred-tax-items/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/deferred-tax-items/index.ts:18: * @standard ISO-8601-1:2019 date-time origination-reversal
src/collections/depreciation-schedules/index.ts:8: * @standard ISO-8601-1:2019 date-time period-end
src/collections/depreciation-schedules/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/collections/disclosure-checklists/index.ts:5: * @standard SEC Regulation S-K disclosure
src/collections/earnings-per-share/index.ts:11: * @standard IFRS IAS-33 §10 basic-eps
src/collections/earnings-per-share/index.ts:12: * @standard IAS-33 §11-§19 weighted-average-number-of-ordinary-shares
src/collections/earnings-per-share/index.ts:13: * @standard IFRS IAS-33 §30-§63 diluted-eps
src/collections/earnings-per-share/index.ts:14: * @standard IFRS IAS-33 §66-§70 disclosure
src/collections/earnings-per-share/index.ts:15: * @standard US-GAAP ASC-260 earnings-per-share
src/collections/earnings-per-share/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/collections/earnings-per-share/index.ts:17: * @standard ISO-8601-1:2019 date-time period-end
src/collections/employees/index.ts:10: * @standard ISO-3166-2:2020 subdivision-codes
src/collections/employees/index.ts:11: * @standard ISO-13616-1:2020 iban payroll-bank-account
src/collections/employees/index.ts:12: * @standard ISO-9362:2022 bic payroll-bank-account
src/collections/employees/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/collections/employees/index.ts:14: * @standard ISO-8601-1:2019 date-time hire-date termination-date
src/collections/employees/index.ts:15: * @standard ISO-17442-1:2020 lei employer-identifier
src/collections/employees/index.ts:9: * @standard ISO-3166-1:2020 country-codes citizenship work-country
src/collections/entity-legal-structures/index.ts:5: * @standard ISO-17442-1:2020 legal-entity-identifier
src/collections/entity-types/index.ts:11: * @standard COSO-2013 entity-classification
src/collections/evidence-attestations/index.ts:13: * @standard ISO-19005-2:2011 pdf-a-2
src/collections/evidence-attestations/index.ts:14: * @standard ISO-14289-1:2014 pdf-ua-1
src/collections/evidence-attestations/index.ts:15: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/collections/evidence-attestations/index.ts:16: * @standard ISO-19011:2018 audit-trail visual-evidence
src/collections/expense-reports/index.ts:10: * @standard ISO-4217:2015 currency-codes
src/collections/expense-reports/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/collections/fair-value-measurements/index.ts:10: * @standard IFRS IFRS-13 §9 fair-value-definition
src/collections/fair-value-measurements/index.ts:11: * @standard IFRS IFRS-13 §72 fair-value-hierarchy-three-levels
src/collections/fair-value-measurements/index.ts:12: * @standard IFRS IFRS-13 §76 level-1-quoted-prices
src/collections/fair-value-measurements/index.ts:13: * @standard IFRS IFRS-13 §81 level-2-observable-inputs
src/collections/fair-value-measurements/index.ts:14: * @standard IFRS IFRS-13 §86 level-3-unobservable-inputs
src/collections/fair-value-measurements/index.ts:15: * @standard IFRS IFRS-13 §93 disclosure-requirements
src/collections/fair-value-measurements/index.ts:16: * @standard US-GAAP ASC-820 fair-value-measurement
src/collections/fair-value-measurements/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/fair-value-measurements/index.ts:18: * @standard ISO-8601-1:2019 date-time measurement-date
src/collections/financial-statements/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/financial-statements/index.ts:18: * @standard ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at
src/collections/financial-statements/index.ts:19: * @standard BCP-47 language-tag
src/collections/fiscal-calendars/index.ts:11: * @standard IAS-34:2023 (period metadata: quarter, fiscal year, period label)
src/collections/fiscal-calendars/index.ts:12: * @standard ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)
src/collections/fiscal-calendars/index.ts:13: * @standard ISO-4217:2023 (currencyCode inherited from FiscalPeriods)
src/collections/fiscal-calendars/index.ts:14: * @standard SAF-T:3.0.2 (regulatoryCode for audit file period coding, e.g., P01_2026)
src/collections/fiscal-calendars/index.ts:15: * @standard XBRL (period context for financial statement generation)
src/collections/fiscal-calendars/index.ts:16: * @standard GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)
src/collections/fiscal-calendars/index.ts:17: * @standard SOX:2402 (audit-trail via chainLeafUuid)
src/collections/fiscal-devices/index.ts:16: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register
src/collections/fiscal-periods/index.ts:20: * @standard ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering
src/collections/fiscal-periods/index.ts:21: * @standard IAS-34:2023 interim-financial-reporting period-structure quarterly-alignment
src/collections/fiscal-periods/index.ts:22: * @standard ISO-4217:2015 currency-code per-fiscal-configuration
src/collections/fiscal-periods/index.ts:23: * @standard SAF-T 3.0.2 regulatory-period-coding audit-file-structure
src/collections/fiscal-periods/index.ts:24: * @standard XBRL-GL fiscal-context general-ledger-reporting
src/collections/fixed-assets/index.ts:27: * @standard ISO-4217:2015 currency-codes
src/collections/fixed-assets/index.ts:28: * @standard ISO-8601-1:2019 date-time acquisition-date in-service-date disposal-date
src/collections/fx-transactions/index.ts:11: * @standard ISO-4217:2015 currency-codes from-to-currency-pair
src/collections/fx-transactions/index.ts:12: * @standard ISO-8601-1:2019 date-time transaction-date
src/collections/gl-accounts/index.ts:10: * @standard ISO-4217:2015 currency-codes account-currency
src/collections/gl-postings/index.ts:30: * @standard ISO-8601-1:2019 date-time posted-date
src/collections/goods-receipts/index.ts:21: * @standard ISO-8601-1:2019 date-time received-at
src/collections/goods-receipts/index.ts:22: * @standard EN-16931:2017 §BG-13 delivery-information
src/collections/government-grants/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/collections/government-grants/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/collections/groups/index.ts:12: * @standard RFC-7643 §4.2 SCIM group resource — displayName, members
src/collections/groups/index.ts:13: * @standard NIST INCITS-359-2012 §5.1 users and groups
src/collections/held-for-sale-classifications/index.ts:12: * @standard IFRS IFRS-5 §6-§9 classification-criteria
src/collections/held-for-sale-classifications/index.ts:13: * @standard IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts
src/collections/held-for-sale-classifications/index.ts:14: * @standard IFRS IFRS-5 §25 depreciation-suspended
src/collections/held-for-sale-classifications/index.ts:15: * @standard IFRS IFRS-5 §31-§40 discontinued-operations-presentation
src/collections/held-for-sale-classifications/index.ts:16: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/collections/held-for-sale-classifications/index.ts:17: * @standard US-GAAP ASC-205-20 discontinued-operations
src/collections/held-for-sale-classifications/index.ts:18: * @standard US-GAAP ASC-360-10 long-lived-assets-held-for-sale
src/collections/held-for-sale-classifications/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/collections/held-for-sale-classifications/index.ts:20: * @standard ISO-8601-1:2019 date-time classification-date
src/collections/insurance-contracts/index.ts:12: * @standard IFRS IFRS-17 §3 scope
src/collections/insurance-contracts/index.ts:13: * @standard IFRS IFRS-17 §32 general-measurement-model-building-blocks
src/collections/insurance-contracts/index.ts:14: * @standard IFRS IFRS-17 §38 contractual-service-margin
src/collections/insurance-contracts/index.ts:15: * @standard IFRS IFRS-17 §53 premium-allocation-approach-simplified
src/collections/insurance-contracts/index.ts:16: * @standard IFRS IFRS-17 §B100 variable-fee-approach
src/collections/insurance-contracts/index.ts:17: * @standard IFRS IFRS-17 §93 disclosure-requirements
src/collections/insurance-contracts/index.ts:18: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/collections/insurance-contracts/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/collections/insurance-contracts/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/collections/intercompany-transactions/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/collections/intercompany-transactions/index.ts:13: * @standard ISO-8601-1:2019 date-time transaction-date
src/collections/internal-audit-function/index.ts:4: * @standard IIA IPPF international-professional-practices-framework
src/collections/internal-controls/index.ts:4: * @standard COSO-2013 internal-control-integrated-framework
src/collections/internal-controls/index.ts:6: * @standard PCAOB AS 2201 ICFR-audit
src/collections/internal-policies/index.ts:5: * @standard ISO-37301:2021 compliance-policy
src/collections/inventory-movements/index.ts:11: * @standard ISO-8601-1:2019 date-time movement-at posted-at
src/collections/inventory-movements/index.ts:12: * @standard ISO-3166-1:2020 country-codes via location
src/collections/investment-properties/index.ts:11: * @standard IFRS IAS-40 §5 definition-investment-property
src/collections/investment-properties/index.ts:12: * @standard IFRS IAS-40 §30 measurement-model-election
src/collections/investment-properties/index.ts:13: * @standard IFRS IAS-40 §33 fair-value-model
src/collections/investment-properties/index.ts:14: * @standard IFRS IAS-40 §56 cost-model
src/collections/investment-properties/index.ts:15: * @standard IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property
src/collections/investment-properties/index.ts:16: * @standard IFRS IAS-40 §74 disclosure-requirements
src/collections/investment-properties/index.ts:17: * @standard IFRS IFRS-13 fair-value-input-hierarchy
src/collections/investment-properties/index.ts:18: * @standard US-GAAP ASC-360 long-lived-assets (no separate IP standard)
src/collections/investment-properties/index.ts:19: * @standard ISO-4217:2015 currency-codes
src/collections/investment-properties/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/collections/invoice-lines/index.ts:33: * @standard EN-16931:2017 §BG-25 invoice-line
src/collections/invoice-lines/index.ts:34: * @standard EN-16931:2017 §BG-29 price-details
src/collections/invoice-lines/index.ts:35: * @standard EN-16931:2017 §BG-30 line-vat-information
src/collections/invoice-lines/index.ts:36: * @standard EN-16931:2017 §BG-27 invoice-line-allowances
src/collections/invoice-lines/index.ts:37: * @standard EN-16931:2017 §BG-28 invoice-line-charges
src/collections/invoice-lines/index.ts:38: * @standard EN-16931:2017 BT-126 invoice-line-identifier
src/collections/invoice-lines/index.ts:39: * @standard EN-16931:2017 BT-131 invoice-line-net-amount
src/collections/invoice-lines/index.ts:40: * @standard EN-16931:2017 BT-151 vat-category-code
src/collections/invoice-lines/index.ts:41: * @standard Peppol-BIS-3.0 billing line-detail
src/collections/invoice-lines/index.ts:42: * @standard UN-EDIFACT INVOIC §LIN line-segment
src/collections/invoice-lines/index.ts:43: * @standard ISO-4217:2015 currency-codes
src/collections/invoice-lines/index.ts:44: * @standard UN-CEFACT-5305 tax-category-codes
src/collections/invoices/index.ts:55: * @standard EN-16931:2017 semantic-data-model-electronic-invoice
src/collections/invoices/index.ts:56: * @standard EN-16931:2017 §BG-22 document-totals
src/collections/invoices/index.ts:57: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/collections/invoices/index.ts:58: * @standard EN-16931:2017 BT-3 invoice-type-code
src/collections/invoices/index.ts:59: * @standard EN-16931:2017 BT-5 invoice-currency-code
src/collections/invoices/index.ts:60: * @standard Peppol-BIS-3.0 billing electronic-invoicing
src/collections/invoices/index.ts:61: * @standard UN-EDIFACT INVOIC d96a
src/collections/invoices/index.ts:62: * @standard UN-CEFACT 1001 document-name-code
src/collections/invoices/index.ts:63: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/collections/invoices/index.ts:64: * @standard UBL-2.1 universal-business-language
src/collections/invoices/index.ts:65: * @standard ISO-4217:2015 currency-codes
src/collections/invoices/index.ts:66: * @standard ISO-8601-1:2019 date-time invoice-date due-date
src/collections/job-positions/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/collections/journal-entries/index.ts:27: * @standard ISO-8601-1:2019 date-time entry-date posted-date approval-date
src/collections/kyc-checks/index.ts:4: * @standard ISO/IEC-19794 biometric-data-interchange-formats
src/collections/kyc-checks/index.ts:5: * @standard FATF-Recommendation-10 customer-due-diligence
src/collections/leads/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/collections/leads/index.ts:12: * @standard ISO-3166-1:2020 country-codes
src/collections/lease-modifications/index.ts:17: * @standard ISO-8601-1:2019 date-time
src/collections/lease-modifications/index.ts:18: * @standard ISO-4217:2015 currency-codes
src/collections/lease-period-postings/index.ts:21: * @standard ISO-8601-1:2019 date-time period-start period-end
src/collections/lease-period-postings/index.ts:22: * @standard ISO-4217:2015 currency-codes
src/collections/leases/index.ts:47: * @standard ISO-4217:2015 currency-codes
src/collections/leases/index.ts:48: * @standard ISO-8601-1:2019 date-time commencement-date end-date
src/collections/leave-requests/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/collections/legal-entities/index.ts:21: * @standard ISO-3166-1:2020 country-codes
src/collections/legal-entities/index.ts:22: * @standard ISO-4217:2015 currency-codes functional-currency
src/collections/legal-entities/index.ts:23: * @standard ISO-17442-1:2020 lei legal-entity-identifier
src/collections/legal-entities/index.ts:24: * @standard ISO-8601-1:2019 date-time effective-period
src/collections/lot-variants/index.ts:26: * @standard ISA-95:2013 / IEC-62264-1 material-lot sublot
src/collections/lot-work-phases/index.ts:25: * @standard ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing-step
src/collections/lot-work-phases/index.ts:26: * @standard ISO-22400-2:2014 manufacturing-operations efficiency throughput
src/collections/lots/index.ts:25: * @standard ISA-95:2013 / IEC-62264-1 §B.3 production-schedule production-order
src/collections/lots/index.ts:26: * @standard ISO-22400-2:2014 manufacturing-operations throughput
src/collections/maintenance-work-orders/index.ts:12: * @standard ISO-41001:2018 §8.1 facility-management operational-control
src/collections/maintenance-work-orders/index.ts:13: * @standard ISO-55000:2014 asset-management work-management
src/collections/maintenance-work-orders/index.ts:14: * @standard ISO-55001:2014 asset-management management-systems
src/collections/maintenance-work-orders/index.ts:15: * @standard ISO-14224:2016 reliability-and-maintenance-data
src/collections/maintenance-work-orders/index.ts:16: * @standard EN-13306:2017 maintenance-terminology
src/collections/maintenance-work-orders/index.ts:17: * @standard ISO-8601-1:2019 date-time scheduled-actual
src/collections/management-assessment-icfr/index.ts:5: * @standard COSO-2013 internal-control-integrated-framework
src/collections/management-assessment-icfr/index.ts:6: * @standard PCAOB AS 2201 ICFR
src/collections/media/index.ts:17: * @standard ISO/IEC-23008 high-efficiency-coding
src/collections/media/index.ts:18: * @standard ISO/IEC-10918 jpeg
src/collections/media/index.ts:19: * @standard W3C PNG image
src/collections/media/index.ts:20: * @standard W3C SVG
src/collections/memories/index.ts:30: * @standard ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer
src/collections/memories/index.ts:31: * @standard ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)
src/collections/messages/index.ts:11: * @standard ISO-8601-1:2019 date-time sent-read-timestamps
src/collections/messages/index.ts:12: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/mineral-resource-assets/index.ts:11: * @standard IFRS IFRS-6 §3 scope-exploration-and-evaluation
src/collections/mineral-resource-assets/index.ts:12: * @standard IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation
src/collections/mineral-resource-assets/index.ts:13: * @standard IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles
src/collections/mineral-resource-assets/index.ts:14: * @standard IFRS IFRS-6 §18-§22 impairment-of-EE-assets
src/collections/mineral-resource-assets/index.ts:15: * @standard IFRS IFRS-6 §23-§25 disclosure
src/collections/mineral-resource-assets/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/collections/mineral-resource-assets/index.ts:17: * @standard ISO-8601-1:2019 date-time
src/collections/operators/index.ts:13: * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature
src/collections/opportunities/index.ts:10: * @standard ISO-4217:2015 currency-codes
src/collections/opportunities/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/collections/org-units/index.ts:10: * @standard NIST INCITS-359-2012 §5.1 users
src/collections/org-units/index.ts:9: * @standard RFC-4519 §2.19 organizationalUnit (LDAP `ou`)
src/collections/pack-items/index.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/collections/pack-items/index.ts:29: * @standard ISA-95:2013 §B.5 production-operations dispatch line
src/collections/pack-items/index.ts:30: * @standard UN/CEFACT Rec20 mass (gram) per-unit
src/collections/pack-items/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/collections/packages/index.ts:11: * @standard GS1 General Specifications AI(00) SSCC serial-shipping-container-code
src/collections/packages/index.ts:12: * @standard ISO/IEC 15459-1:2014 unique-identification transport-units
src/collections/packages/index.ts:13: * @standard GS1 Logistic Label
src/collections/packages/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/collections/packages/index.ts:15: * @standard UN/CEFACT Recommendation 21 packaging-codes
src/collections/packs/index.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/collections/packs/index.ts:32: * @standard ISA-95:2013 §B.5 production-operations dispatch
src/collections/packs/index.ts:33: * @standard UN/CEFACT Rec20 weight (kilogram) · volume (cubic-metre)
src/collections/packs/index.ts:34: * @standard GS1 logistics SSCC carton-identity (the `number` / `barcode`)
src/collections/packs/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/collections/pages/index.ts:27: * @standard schema.org WebPage
src/collections/pages/index.ts:28: * @standard W3C HTML5 Living Standard
src/collections/pages/index.ts:29: * @standard BCP-47 language-tag i18n-routing
src/collections/pages/index.ts:30: * @standard ECMA-402 internationalization-api
src/collections/parties/index.ts:14: * @standard ISO-4217:2015 currency-codes
src/collections/parties/index.ts:15: * @standard ISO-3166-1:2020 country-codes via-addresses
src/collections/parties/index.ts:16: * @standard ISO-13616-1:2020 iban
src/collections/parties/index.ts:17: * @standard ISO-9362:2022 bic
src/collections/parties/index.ts:18: * @standard ISO-17442-1:2020 lei
src/collections/parties/index.ts:19: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/collections/parties/index.ts:20: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/collections/parties/index.ts:21: * @standard EN-16931:2017 §BG-4 seller §BG-7 buyer
src/collections/payment-allocations/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/payment-allocations/index.ts:18: * @standard ISO-8601-1:2019 date-time allocation-date
src/collections/payment-runs/index.ts:20: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/collections/payment-runs/index.ts:21: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/collections/payment-runs/index.ts:22: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/collections/payment-runs/index.ts:23: * @standard ISO-13616-1:2020 iban
src/collections/payment-runs/index.ts:24: * @standard ISO-9362:2022 bic
src/collections/payment-runs/index.ts:25: * @standard ISO-4217:2015 currency-codes
src/collections/payment-runs/index.ts:26: * @standard ISO-8601-1:2019 date-time creation-execution
src/collections/payroll-runs/index.ts:17: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/collections/payroll-runs/index.ts:18: * @standard ISO-13616-1:2020 iban
src/collections/payroll-runs/index.ts:19: * @standard ISO-9362:2022 bic
src/collections/payroll-runs/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/collections/payroll-runs/index.ts:21: * @standard ISO-8601-1:2019 date-time period payment-date
src/collections/performance-obligations/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/collections/performance-obligations/index.ts:21: * @standard ISO-8601-1:2019 date-time satisfaction-date
src/collections/performance-reviews/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/collections/period-end-adjustments/index.ts:17: * @standard ISO-8601-1:2019 date-time period posted-at
src/collections/period-locks/index.ts:14: * @standard ISO-8601-1:2019 locked-at
src/collections/posts/index.ts:37: * @standard schema.org Article
src/collections/posts/index.ts:38: * @standard schema.org BlogPosting
src/collections/posts/index.ts:39: * @standard W3C HTML5 Living Standard
src/collections/posts/index.ts:40: * @standard BCP-47 language-tag i18n-routing
src/collections/posts/index.ts:41: * @standard ECMA-402 internationalization-api
src/collections/prior-period-adjustments/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/collections/prior-period-adjustments/index.ts:12: * @standard ISO-8601-1:2019 date-time adjustment-date post-date
src/collections/production-receipts/index.ts:12: * @standard ISO-8601-1:2019 date-time receipt-date
src/collections/production-receipts/index.ts:13: * @standard ISA-95:2013 §B.5 production-execution
src/collections/project-milestones/index.ts:10: * @standard ISO-8601-1:2019 date-time
src/collections/project-milestones/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/collections/project-tasks/index.ts:13: * @standard ISO-8601-1:2019 date-time
src/collections/projects/index.ts:19: * @standard ISO-8601-1:2019 date-time
src/collections/projects/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/collections/properties/index.ts:10: * @standard ISO-41001:2018 facility-management-management-systems
src/collections/properties/index.ts:11: * @standard ISO-41011:2017 facility-management-vocabulary
src/collections/properties/index.ts:12: * @standard ISO-41013:2017 facility-management-scope
src/collections/properties/index.ts:13: * @standard ISO-55000:2014 asset-management property-as-asset
src/collections/properties/index.ts:14: * @standard ISO-19650-1:2018 information-management-using-bim
src/collections/properties/index.ts:15: * @standard ISO-3166-1:2020 country-codes property-country
src/collections/properties/index.ts:16: * @standard ISO-3166-2:2020 subdivision-codes property-region
src/collections/properties/index.ts:17: * @standard NACE-Rev.2 economic-activity-of-occupants
src/collections/properties/index.ts:18: * @standard EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)
src/collections/provisions/index.ts:20: * @standard ISO-8601-1:2019 date-time
src/collections/provisions/index.ts:21: * @standard ISO-4217:2015 currency-codes
src/collections/quality-inspections/index.ts:10: * @standard ISO-8601-1:2019 date-time inspection-date
src/collections/quality-inspections/index.ts:11: * @standard ISO 9001:2015 §8.7 control-of-nonconforming-outputs
src/collections/quality-inspections/index.ts:12: * @standard ISO 9001:2015 §9.1.3 analysis-and-evaluation
src/collections/quality-inspections/index.ts:13: * @standard ISO 17025:2017 testing-and-calibration-laboratories
src/collections/receipts/index.ts:19: * @standard BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt
src/collections/recruiting-pipeline/index.ts:9: * @standard ISO-8601-1:2019 date-time
src/collections/recurring-journals/index.ts:15: * @standard ISO-8601-1:2019 date-time recurrence
src/collections/recurring-journals/index.ts:16: * @standard rfc-5545 icalendar-rrule recurrence-rule
src/collections/regulatory-deferral-accounts/index.ts:10: * @standard IFRS IFRS-14 §3 scope-first-time-adopter
src/collections/regulatory-deferral-accounts/index.ts:11: * @standard IFRS IFRS-14 §16 continuation-of-previous-GAAP
src/collections/regulatory-deferral-accounts/index.ts:12: * @standard IFRS IFRS-14 §27 disclosure-requirements
src/collections/regulatory-deferral-accounts/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/collections/regulatory-deferral-accounts/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/collections/regulatory-reports/index.ts:4: * @standard SAF-T OECD standard-audit-file-tax
src/collections/regulatory-reports/index.ts:5: * @standard XBRL business-reporting
src/collections/returns/index.ts:4: * @standard ISO-8601-1:2019 date-time
src/collections/risk-register/index.ts:4: * @standard COSO ERM-2017 enterprise-risk-management
src/collections/risk-register/index.ts:5: * @standard ISO-31000:2018 risk-management
src/collections/roles/index.ts:11: * @standard NIST INCITS-359-2012 role-based-access-control
src/collections/rounding-adjustments/index.ts:10: * @standard ISO-4217:2015 currency-codes from-to-currency-pair
src/collections/rounding-adjustments/index.ts:11: * @standard ISO-8601-1:2019 date-time adjustment-date
src/collections/sales-commissions/index.ts:11: * @standard ISO-8601-1:2019 date-time
src/collections/sales-commissions/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/collections/sales/index.ts:28: * @standard BG Наредба-Н-18 §СУПТО sale-register · УНП · no-delete · сторно
src/collections/sectors/index.ts:14: * @standard UN SNA-2008 institutional-sectors (S.11/S.12 corporations · S.13 government · S.14 households · S.15 NPISH)
src/collections/sectors/index.ts:15: * @standard UN ISIC Rev.4 international-standard-industrial-classification (economic activity)
src/collections/sectors/index.ts:16: * @standard EU NACE Rev.2 economic-activities
src/collections/sectors/index.ts:17: * @standard UN COFOG classification-of-the-functions-of-government (10 divisions)
src/collections/sectors/index.ts:18: * @standard UN/Johns-Hopkins ICNPO international-classification-of-non-profit-organizations (civil society)
src/collections/sectors/index.ts:19: * @standard UN COICOP household-consumption-functions
src/collections/sectors/index.ts:20: * @standard UN 2030-Agenda Sustainable-Development-Goals (17 goals — society's outcomes)
src/collections/sectors/index.ts:21: * @standard ISO 3166-1:2020 country-codes (geographic level)
src/collections/share-based-payments/index.ts:10: * @standard IFRS IFRS-2 §10-§13 equity-settled-share-based-payment
src/collections/share-based-payments/index.ts:11: * @standard IFRS IFRS-2 §15-§19 vesting-conditions
src/collections/share-based-payments/index.ts:12: * @standard IFRS IFRS-2 §30-§33 cash-settled-share-based-payment
src/collections/share-based-payments/index.ts:13: * @standard IFRS IFRS-2 §44 disclosure-requirements
src/collections/share-based-payments/index.ts:14: * @standard US-GAAP ASC-718 stock-compensation
src/collections/share-based-payments/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/collections/share-based-payments/index.ts:16: * @standard ISO-8601-1:2019 date-time grant-vesting-exercise
src/collections/shares/index.ts:29: * @standard NIST SP 800-162 §3 attribute-based-access-control
src/collections/shares/index.ts:30: * @standard ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights
src/collections/shares/index.ts:31: * @standard ISO/IEC 27001 Annex A.9.4.1 information-access-restriction
src/collections/shares/index.ts:32: * @standard eIDAS §3 sealed-grants (sign/admin)
src/collections/shipments/index.ts:4: * @standard ISO-8601-1:2019 date-time shipped-at delivered-at
src/collections/shipments/index.ts:5: * @standard EN-16931:2017 §BG-13 delivery-information
src/collections/shipments/index.ts:6: * @standard ISO-3166-1:2020 country-codes ship-from ship-to
src/collections/spaces/index.ts:10: * @standard ISO-41001:2018 facility-management-management-systems
src/collections/spaces/index.ts:11: * @standard ISO-41011:2017 §3.3.5 facility-management space-vocabulary
src/collections/spaces/index.ts:12: * @standard ISO-19650-1:2018 information-management-using-bim
src/collections/spaces/index.ts:13: * @standard EN-15221-6:2011 facility-management area-and-space-measurement
src/collections/standards/index.ts:26: * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
src/collections/standards/index.ts:27: * @standard ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)
src/collections/standards/index.ts:28: * @standard W3C JSON-LD 1.1 (citation as live linked-data)
src/collections/standards/test.ts:2: * @standard ISO/IEC-29119:2022 software-testing
src/collections/statutory-report-templates/index.ts:4: * @standard SAF-T OECD audit-file
src/collections/statutory-report-templates/index.ts:5: * @standard XBRL business-reporting
src/collections/statutory-report-templates/index.ts:6: * @standard IFRS-Taxonomy
src/collections/subscription-plans/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/collections/subscriptions/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/collections/subscriptions/index.ts:14: * @standard ISO-8601-1:2019 date-time period-start period-end
src/collections/taggings/index.ts:30: * @standard ISO-25964-1:2011 thesauri associative-relationships
src/collections/taggings/index.ts:31: * @standard RFC-4122 §4.3 uuid content-addressed-dedup
src/collections/tags/index.ts:21: * @standard ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary
src/collections/tags/index.ts:22: * @standard RFC-4122 §4.3 uuid content-addressed-id
src/collections/tax-calculations/index.ts:15: * @standard ISO-3166-1:2020 country-codes jurisdiction
src/collections/tax-calculations/index.ts:16: * @standard ISO-3166-2:2020 subdivision-codes jurisdiction
src/collections/tax-calculations/index.ts:17: * @standard ISO-4217:2015 currency-codes
src/collections/tax-calculations/index.ts:18: * @standard ISO-8601-1:2019 date-time period posted-at filed-at paid-at
src/collections/tax-calculations/index.ts:19: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/collections/tax-codes/index.ts:14: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/collections/tax-codes/index.ts:15: * @standard UN-CEFACT-5305 tax-category-codes
src/collections/tax-codes/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/collections/tax-codes/index.ts:17: * @standard ISO-8601-1:2019 date-time
src/collections/tax-jurisdictions/index.ts:25: * @standard ISO-3166-1:2020 country-codes alpha-2
src/collections/tax-jurisdictions/index.ts:26: * @standard ISO-3166-2:2020 subdivision-codes
src/collections/tax-jurisdictions/index.ts:27: * @standard ISO-4217:2015 currency-codes
src/collections/tax-jurisdictions/index.ts:28: * @standard EU Directive 2006/112/EC VAT
src/collections/tax-jurisdictions/index.ts:29: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/collections/tax-periods/index.ts:14:  * @standard OECD tax-period-coding
src/collections/tax-periods/index.ts:15: * @standard SAF-T OECD reporting-period
src/collections/tax-periods/index.ts:16: * @standard ISO-8601-1:2019 period-dates
src/collections/tax-returns/index.ts:4: * @standard ISO-8601-1:2019 date-time period filed-at
src/collections/tax-returns/index.ts:5: * @standard ISO-3166-1:2020 country-codes jurisdiction
src/collections/tax-returns/index.ts:6: * @standard EN-16931:2017 §BG-23 vat-breakdown
src/collections/tenants/index.ts:154:     * @standard ISO-3166-1:2020 country-codes alpha-2 identity.country
src/collections/tenants/index.ts:155:     * @standard ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency
src/collections/tenants/index.ts:156:     * @standard BCP-47 language-tag localization.defaultLocale
src/collections/tenants/index.ts:157:     * @standard ECMA-402 internationalization-api locale-cascade
src/collections/tenants/index.ts:25: * @standard ISO-17442-1:2020 lei legal-entity-identifier
src/collections/tenants/index.ts:26: * @standard ISO-3166-1:2020 country-codes alpha-2
src/collections/tenants/index.ts:27: * @standard ISO-4217:2015 currency-codes default-currency
src/collections/tenants/index.ts:28: * @standard BCP-47 language-tag default-locale
src/collections/terminals/index.ts:14: * @standard BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal
src/collections/test.ts:10: * @standard ISO/IEC-29119:2022 software-testing (one computed invariant, full coverage)
src/collections/time-entries/index.ts:8: * @standard ISO-8601-1:2019 date-time work-date
src/collections/time-entries/index.ts:9: * @standard ISO-4217:2015 currency-codes hourly-rate
src/collections/tracking-events/index.ts:12: * @standard ISO-8601-1:2019 date-time event-time
src/collections/tracking-events/index.ts:13: * @standard INCOTERMS 2020 control-transfer-points
src/collections/tracking-events/index.ts:14: * @standard EDIFACT IFTSTA international-multimodal-status-message
src/collections/transaction-failures/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/collections/transaction-failures/index.ts:12: * @standard ISO-8601-1:2019 date-time transaction-date
src/collections/transfer-pricing-adjustments/index.ts:13:  * @standard OECD Transfer-Pricing-Guidelines-2022
src/collections/transfer-pricing-adjustments/index.ts:15: * @standard US IRC §482 arms-length
src/collections/transfer-pricing-files/index.ts:15: * @standard ISO-8601-1:2019 date-time
src/collections/transfer-pricing-files/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/collections/translations/index.ts:37: * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
src/collections/translations/index.ts:38: * @standard BCP-47 language tags
src/collections/translations/index.ts:39: * @standard EU 1958/1 official-languages-of-the-european-union
src/collections/usage-records/index.ts:15: * @standard ISO-4217:2015 currency-codes
src/collections/usage-records/index.ts:16: * @standard ISO-8601-1:2019 date-time event-time billing-period
src/collections/usage-records/index.ts:17: * @standard rfc-9562 uuid event-id
src/collections/users/index.ts:104: * @standard BCP-47 language-tag user-locale
src/collections/users/index.ts:379:     * @standard BCP-47 language-tag user-locale-preference
src/collections/users/index.ts:380:     * @standard ECMA-402 internationalization-api
src/collections/warehouse-locations/index.ts:10: * @standard ISO-3166-2:2020 subdivision-codes location-region
src/collections/warehouse-locations/index.ts:11: * @standard ISO-6346:2022 freight-container-coding-and-marking
src/collections/warehouse-locations/index.ts:12: * @standard EN-16931:2017 §BG-15 deliver-to-information
src/collections/warehouse-locations/index.ts:9: * @standard ISO-3166-1:2020 country-codes location-country
src/collections/wip-snapshots/index.ts:15: * @standard ISO-8601-1:2019 date-time
src/collections/wip-snapshots/index.ts:16: * @standard ISO-4217:2015 currency-codes
src/collections/work-centers/index.ts:11: * @standard ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy
src/collections/work-centers/index.ts:12: * @standard ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)
src/collections/work-centers/index.ts:13: * @standard ISO-8601-1:2019 date-time
src/collections/work-orders/index.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/collections/work-orders/index.ts:66: * @standard ISA-95:2013 §B.5 production-operations-management work-order-execution
src/collections/work-orders/index.ts:67: * @standard ISO-8601-1:2019 date-time started·completed·estimated
src/collections/work-orders/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/collections/work-phases/index.ts:23: * @standard ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
src/collections/work-phases/index.ts:24: * @standard ISO-22400-2:2014 manufacturing-operations KPIs standard-time
src/collections/work-shifts/index.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/collections/work-shifts/index.ts:32: * @standard ISA-95:2013 / IEC-62264-1 §B.5 personnel + production-performance
src/collections/work-shifts/index.ts:33: * @standard ISO-22400-2:2014 manufacturing-operations KPIs (labour efficiency / utilisation)
src/collections/work-shifts/index.ts:34: * @standard ISO-8601-1:2019 date-time shift-start/finish/close
src/collections/work-shifts/index.ts:35: * @standard ILO C001 hours-of-work presence-minutes
src/collections/work-shifts/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/collections/workflow-definitions/index.ts:15: * @standard ISO/IEC 19510:2013 BPMN-2.0
src/collections/workflow-definitions/index.ts:16: * @standard ISO-8601-1:2019 date-time
src/collections/workflow-instances/index.ts:13: * @standard ISO/IEC 19510:2013 BPMN-2.0
src/collections/workflow-instances/index.ts:14: * @standard ISO-8601-1:2019 date-time
src/components/admin/bar/index.tsx:6: * @standard W3C HTML5 nav-element
src/components/admin/bar/index.tsx:7: * @standard WAI-ARIA 1.2 toolbar-role
src/components/before/dashboard/index.tsx:6: * @standard WAI-ARIA 1.2 status-role
src/components/before/dashboard/index.tsx:8: * @standard BCP-47 language-tag
src/components/before/login/index.tsx:6: * @standard W3C HTML5 form-validation
src/components/before/login/index.tsx:7: * @standard BCP-47 language-tag
src/components/card/index.tsx:6: * @standard schema.org Article
src/components/card/index.tsx:7: * @standard W3C HTML5 article-element
src/components/collection/archive/index.tsx:4: * @standard schema.org ItemList
src/components/collection/archive/index.tsx:5: * @standard schema.org CollectionPage
src/components/collection/archive/index.tsx:6: * @standard W3C HTML5 section-element
src/components/ecommerce/access/utilities.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/components/ecommerce/catalogue/index.ts:26: * @standard UN-CEFACT UNSPSC product-classification
src/components/ecommerce/catalogue/index.ts:27: * @standard GS1 GTIN global-trade-item-number
src/components/ecommerce/catalogue/index.ts:28: * @standard ISO-4217:2015 currency-codes price-currency
src/components/ecommerce/catalogue/index.ts:29: * @standard EN-16931:2017 §BG-31 item-information
src/components/ecommerce/catalogue/index.ts:30: * @standard EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)
src/components/ecommerce/orders/index.ts:61: * @standard UBL-2.1 Order (OASIS) §Order
src/components/ecommerce/orders/index.ts:62: * @standard UN-EDIFACT ORDERS d96a purchase-order-message
src/components/ecommerce/orders/index.ts:63: * @standard Peppol-BIS-3.0 Order ordering-process
src/components/ecommerce/orders/index.ts:64: * @standard EN-16931:2017 §BG-4 seller · §BG-7 buyer (the tenant and `party`, by `side`)
src/components/ecommerce/orders/index.ts:65: * @standard EN-16931:2017 §BG-13 delivery-information (downstream of the order)
src/components/ecommerce/orders/index.ts:66: * @standard ISO-8601-1:2019 date-time · ISO-4217:2015 currency · ISO-3166-1:2020 country
src/components/ecommerce/orders/index.ts:67: * @standard UN/CEFACT Rec20 units-of-measure · ICC Incoterms-2020 delivery-terms
src/components/ecommerce/plugin/index.ts:10: * @standard ISO-8601-1:2019 date-time
src/components/ecommerce/plugin/index.ts:8: * @standard ISO-4217:2015 currency-codes
src/components/ecommerce/plugin/index.ts:9: * @standard ISO-3166-1:2020 country-codes
src/components/ecommerce/product/validation/index.ts:6: * @standard GS1 GTIN global-trade-item-number
src/components/ecommerce/product/validation/index.ts:7: * @standard schema.org Product
src/components/ecommerce/stripe/payment/index.ts:11: * @standard ISO-4217:2015 currency-codes
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:8: * @standard ISO-4217:2015 currency-codes
src/components/ecommerce/stripe/tenantConfirmOrder.ts:8: * @standard ISO-4217:2015 currency-codes
src/components/ecommerce/stripe/tenantConfirmOrder.ts:9: * @standard ISO-8601-1:2019 date-time confirmed-at
src/components/ecommerce/stripe/tenantStripeWebhook.ts:9: * @standard HMAC-SHA256 RFC 2104 signature-scheme
src/components/link/cms.tsx:10: * @standard BCP-47 language-tag locale-aware-routing
src/components/link/cms.tsx:7: * @standard W3C HTML5 anchor-element
src/components/link/field/index.ts:5: * @standard W3C URL Living Standard
src/components/link/field/index.ts:6: * @standard W3C HTML5 anchor-element
src/components/link/field/index.ts:7: * @standard BCP-47 language-tag locale-aware
src/components/link/group/index.ts:5: * @standard W3C HTML5 nav-element
src/components/media/Component.tsx:4: * @standard schema.org ImageObject
src/components/media/Component.tsx:5: * @standard schema.org VideoObject
src/components/media/Component.tsx:7: * @standard ISO/IEC-14496 mpeg-4 video
src/components/media/Component.tsx:8: * @standard ISO/IEC-10918 jpeg
src/components/media/products/hooks/beforeChange.ts:11: * @standard ISO-4217:2015 currency-codes
src/components/media/products/hooks/beforeChange.ts:8: * @standard schema.org Product
src/components/media/products/index.ts:30: * @standard schema.org Product
src/components/media/products/index.ts:31: * @standard GS1 GTIN global-trade-item-number
src/components/media/products/index.ts:32: * @standard UN-CEFACT UNSPSC product-classification
src/components/media/products/index.ts:33: * @standard ISO-4217:2015 currency-codes
src/components/media/products/index.ts:34: * @standard BCP-47 language-tag i18n
src/components/page/range/index.tsx:6: * @standard ECMA-402 internationalization-api Intl.NumberFormat
src/components/page/range/index.tsx:7: * @standard BCP-47 language-tag
src/components/pagination/index.tsx:5: * @standard W3C HTML5 nav-element
src/components/pagination/index.tsx:6: * @standard WAI-ARIA 1.2 navigation-landmark-role
src/components/provider/index.tsx:6: * @standard W3C CSS-Color-4 color-contrast
src/components/rich/text/index.tsx:4: * @standard W3C HTML5 Living Standard rich-text-output
src/components/rich/text/index.tsx:5: * @standard CommonMark 0.31 markdown-fallback
src/components/rich/text/index.tsx:6: * @standard schema.org HTMLRichText
src/components/vocabulary/marketing/CountryShowcase.tsx:7: * @standard ISO-3166-1:2020 country-codes alpha-2
src/components/vocabulary/marketing/CountryShowcase.tsx:8: * @standard ISO-4217:2015 currency-codes
src/components/vocabulary/marketing/CountryShowcase.tsx:9: * @standard BCP-47 language-tag
src/components/vocabulary/marketing/PricingTable.tsx:10: * @standard schema.org Offer pricing
src/components/vocabulary/marketing/PricingTable.tsx:11: * @standard ISO-4217:2015 currency-codes
src/fields/number/measureFields.ts:10: * @standard UN/CEFACT Recommendation 20 unit-of-measure-codes
src/fields/relationship/auditFields.ts:11: * @standard ISO-19011:2018 audit-trail
src/fields/text/countryCodeField.ts:13: * @standard ISO 3166-1:2020 country-codes
src/fields/text/naceCodeField.ts:7: * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
src/fields/text/unitOfMeasureField.ts:13: * @standard UN/CEFACT Recommendation 20 unit-of-measure-codes
src/fields/text/unitOfMeasureField.ts:14: * @standard EN-16931 §BT-130 invoiced-quantity-unit-of-measure
src/globals/footer/config.ts:4: * @standard schema.org WPFooter
src/globals/footer/config.ts:5: * @standard W3C HTML5 footer-element
src/globals/footer/config.ts:6: * @standard WAI-ARIA 1.2 contentinfo-landmark-role
src/globals/footer/config.ts:7: * @standard BCP-47 language-tag
src/globals/header/config.ts:4: * @standard schema.org WPHeader
src/globals/header/config.ts:5: * @standard W3C HTML5 header-element
src/globals/header/config.ts:6: * @standard WAI-ARIA 1.2 banner-landmark-role
src/globals/header/config.ts:8: * @standard BCP-47 language-tag
src/hooks/collections/audit-reports/validateAuditComplianceReporting.ts:17: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/hooks/collections/audit-reports/validateAuditComplianceReporting.ts:18: * @standard OECD Transfer Pricing Guidelines:2022 Documentation
src/hooks/collections/audit-reports/validateAuditComplianceReporting.ts:19: * @standard IAS-1:2023 Presentation of Financial Statements
src/hooks/collections/audit-reports/validateAuditComplianceReporting.ts:20: * @standard GDPR Art. 32 Data Protection
src/hooks/collections/audit-reports/validateAuditComplianceReporting.ts:21: * @standard NIST SP 800-92 Computer Security Incident Handling
src/hooks/collections/business-chain/wireChainProducersFor.ts:19: * @standard ISO/IEC 25010:2023 §5.4 reusability — single wiring path
src/hooks/collections/closing-entries/generateReversingEntries.ts:18: * @standard IAS-34:2023 Interim closing reversals required at period start
src/hooks/collections/closing-entries/generateReversingEntries.ts:19: * @standard SAF-T:3.0.2 Reversal entries must have distinct GL accounts + posting dates
src/hooks/collections/closing-entries/validateClosingPeriod.ts:14: * @standard IAS-34:2023 Period closing prerequisites
src/hooks/collections/closing-entries/validateClosingPeriod.ts:15: * @standard SAF-T:3.0.2 Period coding determinism
src/hooks/collections/closing-entries/validateMultiCurrencyClosing.ts:20: * @standard ISO-4217:2023 Currency codes + decimal places
src/hooks/collections/closing-entries/validateMultiCurrencyClosing.ts:21: * @standard IFRS-21:2023 Translation of foreign operations
src/hooks/collections/closing-entries/validateMultiCurrencyClosing.ts:22: * @standard IFRS-9:2023 Foreign exchange gains/losses
src/hooks/collections/closing-entries/validateMultiCurrencyClosing.ts:23: * @standard SAF-T:3.0.2 Multi-currency period coding
src/hooks/collections/cmspage/populatePublishedAt.ts:4: * @standard ISO-8601-1:2019 date-time
src/hooks/collections/cmspage/revalidatePage.ts:10: * @standard W3C HTML5 Living Standard
src/hooks/collections/consolidations/validateConsolidationReadiness.ts:15: * @standard IAS-27:2023 Consolidated financial statements
src/hooks/collections/consolidations/validateConsolidationReadiness.ts:16: * @standard IFRS-10:2023 Consolidated financial statements (control definition)
src/hooks/collections/consolidations/validateConsolidationReadiness.ts:17: * @standard SAF-T:3.0.2 Multi-entity audit trail
src/hooks/collections/fiscal-periods/updateFiscalCalendarOnPeriodChange.ts:28: * @standard GDPR:2016/679 (audit trail, access control)
src/hooks/collections/fiscal-periods/updateFiscalCalendarOnPeriodChange.ts:29: * @standard SOX:2002 (change log, access control evidence)
src/hooks/collections/fiscal-periods/updateFiscalCalendarOnPeriodChange.ts:30: * @standard Law 60 (immutable chain leaf)
src/hooks/collections/fiscal-periods/updateFiscalCalendarOnPeriodChange.ts:31: * @standard Law 64 (error-uuid for federation replay)
src/hooks/collections/gl-postings/validateFiscalPeriodPosting.ts:44: * @standard IAS-34:2023 (period context for interim reporting)
src/hooks/collections/gl-postings/validateFiscalPeriodPosting.ts:45: * @standard Law 60 (chain leaf, immutable audit)
src/hooks/collections/gl-postings/validateFiscalPeriodPosting.ts:46: * @standard GDPR:2016/679 (access control, audit trail)
src/hooks/collections/gl-postings/validateFiscalPeriodPosting.ts:47: * @standard SOX:2002 (period-lock enforcement, access control)
src/hooks/collections/invoices-invoice-lines/itemInventory.ts:17: * @standard US-GAAP ASC-330 inventory
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:31: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:32: * @standard ISO-20022 pain.008 customer-direct-debit-initiation
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:33: * @standard ISO-4217:2015 currency-codes
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.test.ts:26: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.ts:32: * @standard ISO-8601-1:2019 date-time period-end posted-at
src/hooks/collections/orders/assignBuyerParty.ts:10: * @standard NIST INCITS-359-2012 §6.1 object-scoped role assignment
src/hooks/collections/orders/assignBuyerParty.ts:9: * @standard EN-16931:2017 §BG-7 buyer
src/hooks/collections/orders/grantApps.ts:15: * @standard NIST INCITS-359-2012 §6.1 permission-assignment
src/hooks/collections/parties/classifyTaxId.ts:12: * @standard ISO-3166-1:2020 country-codes alpha-2
src/hooks/collections/post-close-analytics-reports/validatePostCloseAnalytics.ts:17: * @standard IAS-34:2023 Interim Financial Reporting
src/hooks/collections/post-close-analytics-reports/validatePostCloseAnalytics.ts:18: * @standard IFRS-8:2023 Operating Segments
src/hooks/collections/post-close-analytics-reports/validatePostCloseAnalytics.ts:19: * @standard IAS-1:2023 Presentation of Financial Statements
src/hooks/collections/post-close-analytics-reports/validatePostCloseAnalytics.ts:20: * @standard COSO Internal Control Framework
src/hooks/collections/posts/populateAuthors.ts:12: * @standard schema.org Person author
src/hooks/collections/posts/populateAuthors.ts:13: * @standard schema.org Article author
src/hooks/collections/posts/revalidatePost.ts:10: * @standard W3C HTML5 Living Standard
src/hooks/collections/roles/validateRoleDefinition.ts:9: * @standard NIST INCITS-359-2012 role-based-access-control role-binding
src/hooks/collections/sale/assignSaleUnpHook.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/sale/assignSaleUnpHook.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО УНП
src/hooks/collections/sale/assignSaleUnpHook.ts:16: * @standard BG Наредба-Н-18 §СУПТО УНП per-fiscal-device-gapless-sequence
src/hooks/collections/sale/deriveSaleOperatorCodeHook.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/sale/deriveSaleOperatorCodeHook.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature
src/hooks/collections/sale/deriveSaleOperatorCodeHook.ts:12: * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature УНП-second-segment
src/hooks/collections/sale/emitSaleClosedHook.ts:8: * @standard BG Наредба-Н-18 §СУПТО sale-lifecycle
src/hooks/collections/sale/enforceSaleImmutability.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/sale/enforceSaleImmutability.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО no-delete · reversal-only
src/hooks/collections/sale/enforceSaleImmutability.ts:13: * @standard BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation
src/hooks/collections/sale/validateReferenceHook.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/sale/validateReferenceHook.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature
src/hooks/collections/sale/validateReferenceHook.ts:13: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature
src/hooks/collections/shared/auditTrailAfterChange.ts:21: * @standard rfc-9562 uuid event-id
src/hooks/collections/shared/auditTrailAfterChange.ts:40: * @standard NIST FIPS-180-4 sha-256
src/hooks/collections/shared/autoSetTimestamp.ts:7: * @standard ISO-8601-1:2019 date-time utc-canonical
src/hooks/collections/shared/bankStatementImportedHook.ts:21: * @standard ISO-20022 camt.053 bank-to-customer-statement
src/hooks/collections/shared/bankStatementImportedHook.ts:22: * @standard ISO-13616-1:2020 iban
src/hooks/collections/shared/bankStatementImportedHook.ts:23: * @standard ISO-9362:2022 bic
src/hooks/collections/shared/bankStatementImportedHook.ts:24: * @standard ISO-4217:2015 currency-codes
src/hooks/collections/shared/bankStatementImportedHook.ts:25: * @standard ISO-8601-1:2019 date-time statement-date transaction-date
src/hooks/collections/shared/depreciationSchedulePostingHook.ts:23: * @standard ISO-8601-1:2019 date-time depreciation-period
src/hooks/collections/shared/deriveCountryFromIban.ts:10: * @standard ISO-13616-1:2020 iban
src/hooks/collections/shared/deriveCountryFromIban.ts:11: * @standard ISO-3166-1:2020 country-codes alpha-2
src/hooks/collections/shared/payrollDisbursementHook.test.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/shared/payrollDisbursementHook.test.ts:9: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/hooks/collections/shared/payrollDisbursementHook.ts:26: * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
src/hooks/collections/shared/payrollDisbursementHook.ts:27: * @standard ISO-13616-1:2020 iban
src/hooks/collections/shared/payrollDisbursementHook.ts:28: * @standard ISO-9362:2022 bic
src/hooks/collections/shared/payrollDisbursementHook.ts:29: * @standard ISO-4217:2015 currency-codes
src/hooks/collections/shared/payrollDisbursementHook.ts:30: * @standard ISO-8601-1:2019 date-time payment-date
src/hooks/collections/shared/payrollRunPostingHook.ts:45: * @standard ISO-8601-1:2019 date-time period payment-date
src/hooks/collections/shared/payrollRunPostingHook.ts:46: * @standard ISO-4217:2015 currency-codes
src/hooks/collections/shared/periodEndAdjustmentPostingHook.test.ts:11: * @standard ISO/IEC-29119:2022 software-testing
src/hooks/collections/shared/periodEndAdjustmentPostingHook.ts:31: * @standard ISO-8601-1:2019 date-time posted-date
src/hooks/collections/shared/validateBalancedEntry.ts:21: * @standard ECMA-262 ECMAScript-2024 baseline
src/hooks/collections/shared/validateBalancedEntry.ts:22: * @standard IEEE-754-2019 binary-floating-point integer-cents-only
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:23: * @standard ISO-4217:2015 currency-codes
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:24: * @standard ISO-8601-1:2019 date-time period-boundaries
src/hooks/collections/subscription-plans-subscriptions/encryptSubscriptionData.ts:8: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/hooks/collections/tax-periods/validateTaxPeriodClosing.ts:16: * @standard IAS-12:2023 Income taxes
src/hooks/collections/tax-periods/validateTaxPeriodClosing.ts:17: * @standard IFRS-16:2023 Leases (tax lease modifications)
src/hooks/collections/tax-periods/validateTaxPeriodClosing.ts:18: * @standard OECD Transfer Pricing Guidelines:2022 Section D
src/hooks/collections/tax-periods/validateTaxPeriodClosing.ts:19: * @standard BEPS Action 13:2021 Transfer Pricing Documentation
src/hooks/collections/tax-periods/validateTaxPeriodClosing.ts:20: * @standard OECD Pillar Two:2023 Global Minimum Tax
src/hooks/collections/tax-periods/validateTaxPeriodClosing.ts:21: * @standard SAF-T:3.0.2 Multi-entity audit trail
src/hooks/collections/tenants/createRoleGroups.ts:13: * @standard NIST INCITS-359-2012 §5.1 users and groups
src/hooks/collections/users/emitOrderLifecycleEvents.ts:20: * @standard ISO-4217:2015 currency-codes
src/hooks/collections/users/emitOrderLifecycleEvents.ts:21: * @standard ISO-8601-1:2019 date-time activated-at completed-at cancelled-at refunded-at
src/hooks/collections/users/enforceSeparation.ts:8: * @standard ISO-27002 §5.3 segregation-of-duties
src/hooks/collections/users/enforceSeparation.ts:9: * @standard ANSI/INCITS-359 static separation of duty
src/hooks/collections/users/firstUserSuperAdmin.ts:17: * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
src/hooks/collections/users/guardPrivilege.ts:24: * @standard NIST INCITS-359-2012 role-based-access-control
src/hooks/collections/users/refuseInactive.ts:7: * @standard RFC-7643 §4.1.1 SCIM `active`
src/hooks/collections/users/validateAddressHook.ts:22: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/hooks/collections/users/validateAddressHook.ts:23: * @standard UPU-S42 international-postal-addressing
src/hooks/collections/users/validateAddressHook.ts:24: * @standard ISO-3166-1:2020 country-codes alpha-2 per-tenant-jurisdiction
src/hooks/collections/utility/periodLock.ts:4: * @standard ISO-8601-1:2019 date-time utc-canonical-form
src/hooks/fields/users/ensureUniqueUsername.ts:25: * @standard W3C HTML5 input-validation client-side
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
src/jobs/audit/index.ts:11: * @standard BG Наредба-Н-18 §Приложение-38 monthly-audit-file
src/jobs/bnb/rates/sync/index.ts:17: * @standard ISO-3166-1:2020 BG country-code
src/jobs/bnb/rates/sync/index.ts:18: * @standard ISO-4217:2015 currency-codes
src/jobs/bnb/rates/sync/index.ts:19: * @standard ISO-8601-1:2019 date-time effective-date
src/jobs/dunning/job/index.ts:15: * @standard EN-16931:2017 dunning-notice
src/jobs/dunning/job/index.ts:16: * @standard ISO-8601-1:2019 date-time pastDueSinceAt gracePeriodEndsAt
src/packages/admin/providers/index.ts:23: * @standard RFC-7643 SCIM core schema · RFC-7644 SCIM protocol — the provider-neutral baseline
src/packages/admin/providers/index.ts:24: * @standard ISO/IEC-25010:2011 §4.2.3 interoperability
src/packages/admin/providers/scim/index.ts:9: * @standard RFC-7643 §3.1 common attributes · §4.1 User · §4.2 Group · §4.3 Enterprise User
src/packages/admin/providers/settings.ts:13: * @standard RFC-6749 OAuth 2.0 client registration (client id and secret)
src/packages/engine/index.ts:28: * @standard ISO/IEC-25010:2011 §4.2.7 modularity — a change to one app touches that app's plugin
src/payload.config.ts:533:       * @standard EN-16931:2017 §BG-3 invoice-status-cascade
src/payload.config.ts:551:       * @standard ISO-3166-1:2020 BG country-code
src/payload.config.ts:552:       * @standard ISO-4217:2015 currency-codes
src/payload.config.ts:574:       * @standard BG Наредба-Н-18 §Приложение-38 standardized-audit-file
src/plugins/handles/index.ts:40: * @standard RFC-9562 uuid · RFC-4648 §5 base64url · RFC-9110 §15.5.5 404
src/plugins/naming/index.ts:20: * @standard RFC 9562 §5.8 name-based UUID (the digest source)
src/plugins/taggable/index.ts:21: * @standard RFC-4122 §4.3 uuid
src/seed/content/index.ts:21: * @standard ISO-15836-1:2017 dublin-core title description
src/seed/erpax-product-pages.ts:31: * @standard schema.org Product
src/seed/erpax-product-pages.ts:32: * @standard schema.org WebSite breadcrumb
src/seed/erpax-product-pages.ts:33: * @standard ISO-25010 usability marketing-content
src/seed/etrima/index.ts:18: * @standard ISA-95:2013 / IEC-62264-1 production-operations-management
src/seed/forms/index.ts:28: * @standard ISO/IEC-25012:2008 data-quality — what a conversion preserves is stated, not assumed
src/seed/index.ts:8: * @standard ISO-8601-1:2019 date-time
src/seed/index.ts:9: * @standard BCP-47 language-tag locale-bundled-fixtures
src/seed/standards/index.ts:11: * @standard ISO-27001 §7.5 documented-information (the version of a cited standard is controlled)
src/utilities/ability/index.ts:33: * @standard NIST INCITS-359-2012 §6.1 permission-assignment · §6.2 review-functions
src/utilities/ability/roles/index.ts:19: * @standard NIST INCITS-359-2012 §6.1 permission-assignment
src/utilities/accounting/analysis/index.ts:8: * @standard ISO-4217:2015 currency-codes
src/utilities/accounting/analysis/index.ts:9: * @standard ISO-8601-1:2019 date-time as-of-date
src/utilities/accounting/reports/index.ts:24: * @standard ISO-4217:2015 currency-codes
src/utilities/accounting/reports/index.ts:25: * @standard ISO-8601-1:2019 date-time as-of-date period
src/utilities/address/validation/index.ts:16: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/utilities/address/validation/index.ts:17: * @standard UPU-S42 international-postal-addressing
src/utilities/address/validation/index.ts:18: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/agent/service/index.ts:20: * @standard RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)
src/utilities/agent/team/index.ts:18: * @standard RFC 9562 §5.8 content-addressed identity (agent + team uuid)
src/utilities/ai/durable-objects.ts:186: * @standard FIPS 180-4 sha-256 (leaf hashing)
src/utilities/ai/durable-objects.ts:187: * @standard RFC 8785 JSON canonicalization
src/utilities/ai/durable-objects.ts:20: * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation
src/utilities/allow/public/read/tenant/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/audit/compliance/reporting/index.ts:13: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/utilities/audit/compliance/reporting/index.ts:14: * @standard OECD Transfer Pricing Guidelines:2022 Documentation
src/utilities/audit/compliance/reporting/index.ts:15: * @standard IAS-1:2023 Presentation of Financial Statements
src/utilities/audit/compliance/reporting/index.ts:16: * @standard BEPS Action 13:2021 Transfer Pricing Documentation
src/utilities/audit/compliance/reporting/index.ts:17: * @standard OECD Pillar Two:2023 Global Minimum Tax
src/utilities/audit/compliance/reporting/index.ts:18: * @standard GDPR Art. 32 Data Protection
src/utilities/audit/compliance/reporting/index.ts:19: * @standard NIST SP 800-92 Computer Security Incident Handling
src/utilities/audit/compliance/reporting/service.ts:15: * @standard SAF-T:3.0.2 Standard Audit File (Tax)
src/utilities/audit/compliance/reporting/service.ts:16: * @standard OECD Transfer Pricing Guidelines:2022 Documentation Section
src/utilities/audit/compliance/reporting/service.ts:17: * @standard IAS-1:2023 Presentation of Financial Statements (disclosure)
src/utilities/audit/compliance/reporting/service.ts:18: * @standard GDPR Art. 32 (data protection in audit reports)
src/utilities/audit/compliance/reporting/service.ts:19: * @standard NIST SP 800-92 (computer security incident handling in audit)
src/utilities/audit/trail/write-audit-event.ts:46: * @standard ISO 19011:2018 §6.4.6 audit-evidence (every write tamper-evident)
src/utilities/audit/trail/write-audit-event.ts:47: * @standard SOX §404 internal controls (tamper-evidence + queryable form)
src/utilities/audit/trail/write-audit-event.ts:48: * @standard ISO 27001 Annex A.12.4 logging + monitoring
src/utilities/audit/trail/write-audit-event.ts:49: * @standard NIST SP 800-92 §3.4 log integrity
src/utilities/auth/context/index.ts:11: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/authenticated/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:16: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/bcp/47/index.ts:4: * @standard BCP-47 language-tag
src/utilities/bcp/47/language-tag.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/bcp/47/language-tag.test.ts:5: * @standard BCP-47 language-tag
src/utilities/bcp/47/language-tag.ts:4: * @standard BCP-47 language-tag
src/utilities/bcp/47/locale-utils.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/bcp/47/locale-utils.test.ts:5: * @standard BCP-47 language-tag
src/utilities/bcp/47/locale-utils.test.ts:8: * @standard ECMA-402 internationalization-api
src/utilities/bcp/47/locale-utils.ts:5: * @standard BCP-47 language-tag
src/utilities/bcp/47/locale-utils.ts:8: * @standard ECMA-402 internationalization-api
src/utilities/bcp/47/locale-utils.ts:9: * @standard Unicode-CLDR locale-data
src/utilities/billing/stripeWebhookHandlers.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/billing/stripeWebhookHandlers.test.ts:8: * @standard ISO-4217:2015 currency-codes
src/utilities/billing/stripeWebhookHandlers.ts:18: * @standard NIST FIPS-198-1 keyed-hash-message-authentication
src/utilities/billing/stripeWebhookHandlers.ts:19: * @standard PCI-DSS v4.0 §3 protect-stored-account-data
src/utilities/billing/stripeWebhookHandlers.ts:20: * @standard PCI-DSS v4.0 §4 protect-cardholder-data-with-strong-cryptography-during-transmission
src/utilities/billing/stripeWebhookHandlers.ts:21: * @standard PCI-DSS v4.0 §10 log-and-monitor-access-to-system-components
src/utilities/billing/stripeWebhookHandlers.ts:440: * @standard ISO-4217:2015 currency-codes refund-amount
src/utilities/billing/stripeWebhookHandlers.ts:441: * @standard ISO-8601-1:2019 date-time refunded-at
src/utilities/billing/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/billing/test.ts:8: * @standard ISO-4217:2015 currency-codes
src/utilities/business/chain/context.ts:18: * @standard ISO-3166-1:2020 country-codes
src/utilities/business/chain/context.ts:19: * @standard ISO-4217:2015 currency-codes
src/utilities/business/chain/types.ts:19: * @standard ISO/IEC 19510:2013 BPMN-2.0 (process notation, companion)
src/utilities/business/chain/types.ts:20: * @standard ISO/IEC 25010:2023 functional-suitability functional-completeness
src/utilities/closing/period/checker/index.ts:15: * @standard IAS-34:2023 (period structure, interim closing requirements)
src/utilities/closing/period/checker/index.ts:16: * @standard SAF-T:3.0.2 (period coding, regulatory audit trail)
src/utilities/cmspage/access/superAdminOrTenantAdmin.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/cmspage/hooks/beforeChange.ts:7: * @standard ISO-8601-1:2019 date-time published-at
src/utilities/coherence/index.ts:19: * @standard DSP magnitude-spectrum (DFT) + the 0.7..4 Hz human-pulse band
src/utilities/color/index.ts:9: * @standard A432 tuning; the 7-chakra visible spectrum (Do..Ti / root..crown)
src/utilities/config/address/formats/index.ts:23: * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
src/utilities/config/address/formats/index.ts:24: * @standard UPU-S42 international-postal-addressing
src/utilities/config/address/formats/index.ts:25: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/config/address/formats/index.ts:26: * @standard ISO-3166-2:2020 subdivisions
src/utilities/config/address/formats/index.ts:27: * @standard BCP-47 language-tag field-labels
src/utilities/config/country/specifics/index.ts:14: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/config/country/specifics/index.ts:15: * @standard ISO-4217:2015 §3 currency-fraction-units (minor-unit decimals)
src/utilities/config/country/specifics/index.ts:16: * @standard ISO-13616-1:2020 iban
src/utilities/config/country/specifics/index.ts:17: * @standard EN-16931:2017 §BG-1 invoice-content e-invoicing-mandates
src/utilities/config/regional/defaults/index.ts:115: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/config/regional/defaults/index.ts:116: * @standard ISO-4217:2015 currency-codes
src/utilities/config/regional/defaults/index.ts:117: * @standard BCP-47 language-tag
src/utilities/config/regional/defaults/index.ts:28: * @standard ISO-4217:2015 §5 alphabetic-codes
src/utilities/config/regional/defaults/index.ts:7: * @standard ISO-4217:2015 currency-codes alphabetic
src/utilities/config/regional/defaults/index.ts:8: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/config/regional/defaults/index.ts:92: * @standard ISO-4217:2015 §5 alphabetic-codes
src/utilities/config/regional/defaults/index.ts:9: * @standard BCP-47 language-tag locale-identifier
src/utilities/cost/bits/index.ts:138: * @standard CRAQ — Terrace & Freedman, USENIX ATC 2009
src/utilities/cost/bits/index.ts:13: * @standard NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2
src/utilities/cost/bits/index.ts:148: * @standard DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)
src/utilities/cost/bits/index.ts:14: * @standard RFC 9562 §8 — UUID security considerations
src/utilities/cost/bits/index.ts:15: * @standard CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
src/utilities/cost/bits/index.ts:16: * @standard DeepSeek-Prover-V2 — recursive, kernel-checked invariants
src/utilities/cost/bits/index.ts:46: * @standard RFC 9562 §5.8 (uuidv8) · §4.1 (variant)
src/utilities/cost/index.ts:11: * @standard ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)
src/utilities/country/api/client/index.ts:15: * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
src/utilities/country/api/client/index.ts:538: * @standard ISO-4217:2015 currency-codes
src/utilities/country/api/client/index.ts:539: * @standard SDMX 2.1 statistical-data-and-metadata-exchange
src/utilities/country/api/client/index.ts:540: * @standard ISO-8601-1:2019 date-time
src/utilities/country/api/client/index.ts:618: * @standard ISO-4217:2015 currency-codes
src/utilities/country/api/client/index.ts:619: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/country/api/client/index.ts:658: * @standard ISO-4217:2015 currency-codes
src/utilities/country/api/client/index.ts:659: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/country/api/client/index.ts:723: * @standard EN-16931:2017 §B2G semantic-model
src/utilities/country/api/client/index.ts:724: * @standard Peppol-BIS-3.0 billing
src/utilities/country/api/client/index.ts:746: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/api/client/index.ts:747: * @standard EN-16931:2017 §BT-31 seller-vat-identifier
src/utilities/country/api/client/index.ts:762: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/api/client/index.ts:776: * @standard PSD2 EU 2015/2366 ais-pis
src/utilities/country/api/client/index.ts:777: * @standard Berlin Group NextGenPSD2 v1.3
src/utilities/country/api/eu/index.ts:69: * @standard ISO-4217:2015 currency-codes
src/utilities/country/api/eu/index.ts:70: * @standard SDMX 2.1 statistical-data-and-metadata-exchange
src/utilities/country/api/eu/index.ts:71: * @standard ISO-8601-1:2019 date-time
src/utilities/country/api/index.ts:24: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/country/api/index.ts:25: * @standard ISO-20022 financial-messages cross-references
src/utilities/country/client/berlin-group-psd2.ts:113: * @standard Berlin Group NextGenPSD2 v1.3 §5.1.1 read-account-list
src/utilities/country/client/berlin-group-psd2.ts:13: * @standard PSD2 EU 2015/2366 ais-pis
src/utilities/country/client/berlin-group-psd2.ts:148: * @standard Berlin Group NextGenPSD2 v1.3 §5.3.1 payment-initiation
src/utilities/country/client/berlin-group-psd2.ts:149: * @standard ISO-20022 pain.001.001.09 sepa-credit-transfer-initiation
src/utilities/country/client/berlin-group-psd2.ts:14: * @standard Berlin Group NextGenPSD2 v1.3
src/utilities/country/client/berlin-group-psd2.ts:15: * @standard ISO-20022 pain.001 sepa-credit-transfer
src/utilities/country/client/berlin-group-psd2.ts:221: * @standard Berlin Group NextGenPSD2 v1.3 §5.2.1 consent-request
src/utilities/country/client/berlin-group-psd2.ts:287: * @standard Berlin Group NextGenPSD2 v1.3 §5.3.1 read-balance
src/utilities/country/client/berlin-group-psd2.ts:341: * @standard Berlin Group NextGenPSD2 v1.3 §5.4.1 read-transaction-list
src/utilities/country/client/berlin-group-psd2.ts:69: * @standard rfc-6749 §4.4 client-credentials-grant
src/utilities/country/client/bg-bank-statement-pdf.ts:28: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/client/bg-bank-statement-pdf.ts:29: * @standard ISO-13616-1:2020 iban BG-22
src/utilities/country/client/bg-bank-statement-pdf.ts:30: * @standard ISO-20022 camt.053 bank-to-customer-statement (target shape)
src/utilities/country/client/bg-bank-statement-pdf.ts:31: * @standard ISO-32000-2:2020 pdf source-document
src/utilities/country/client/bg-bank-statement-pdf.ts:32: * @standard ISO-4217:2015 currency-codes
src/utilities/country/client/bg-bank-statement-pdf.ts:33: * @standard ISO-8601-1:2019 date-time
src/utilities/country/client/bg-holidays.ts:17: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/client/bg-holidays.ts:18: * @standard ISO-8601-1:2019 date-time
src/utilities/country/client/bg-hybrid-invoice.ts:15: * @standard ISO-19005-3:2012 pdf-a-3
src/utilities/country/client/bg-hybrid-invoice.ts:16: * @standard EN-16931:2017+A1:2019 §6 hybrid-invoice
src/utilities/country/client/bg-hybrid-invoice.ts:17: * @standard rfc-2046 mime-application-xml
src/utilities/country/client/bg-hybrid-invoice.ts:18: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/client/bg-nap-mtls.ts:11: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/client/bg-nap-mtls.ts:122: * @standard OECD SAF-T 2.0 BG variant
src/utilities/country/client/bg-nap-mtls.ts:12: * @standard OECD SAF-T 2.0 BG-SAF-T submission
src/utilities/country/client/bg-nap-mtls.ts:13: * @standard rfc-5246 tls-1.2
src/utilities/country/client/bg-nap-mtls.ts:14: * @standard rfc-8446 tls-1.3
src/utilities/country/client/bg-pades-signer.ts:192: * @standard rfc-5280 internet-x509-public-key-infrastructure
src/utilities/country/client/bg-pades-signer.ts:21: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/utilities/country/client/bg-pades-signer.ts:22: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/utilities/country/client/bg-pades-signer.ts:23: * @standard rfc-5652 cms-detached-signature
src/utilities/country/client/bg-pades-signer.ts:24: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/client/bg-pades-signer.ts:93: * @standard rfc-5652 cms-detached-signature
src/utilities/country/client/bg-pades-signer.ts:94: * @standard NIST FIPS-180-4 sha-256 message-digest
src/utilities/country/client/bg-vat.ts:14: * @standard ISO-3166-1:2020 BG country-code
src/utilities/country/client/bg-vat.ts:15: * @standard ISO-4217:2015 currency-codes
src/utilities/country/client/bg-vat.ts:16: * @standard EN-16931:2017 §BG-23 invoice-line-tax-category
src/utilities/country/client/bg-vat.ts:17: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/utilities/country/client/pdf-text-extractor-default.ts:18: * @standard ISO-32000-2:2020 pdf source-document
src/utilities/country/client/pdf-text-extractor-default.ts:19: * @standard W3C HTML5 (extracted text consumed downstream)
src/utilities/country/client/sign-cms-node.ts:17: * @standard rfc-5652 cms-detached-signature
src/utilities/country/client/sign-cms-node.ts:18: * @standard rfc-3447 pkcs1 rsa-signature
src/utilities/country/client/sign-cms-node.ts:19: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/utilities/country/context/index.ts:28: * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
src/utilities/cross/index.ts:16: * @standard NIST INCITS-359 role-based-access-control
src/utilities/cross/index.ts:17: * @standard ISO 27002 §5.15 access-control + §5.3 segregation-of-duties
src/utilities/crypto/index.ts:10: * @standard FIPS 198-1 HMAC
src/utilities/crypto/index.ts:9: * @standard FIPS 180-4 SHA-256
src/utilities/currency/reconciliation/index.ts:15: * @standard ISO-4217:2023 (currency codes, decimal places)
src/utilities/currency/reconciliation/index.ts:16: * @standard IFRS-21:2023 (translation of foreign operations)
src/utilities/currency/reconciliation/index.ts:17: * @standard IFRS-9:2023 (foreign exchange gains/losses)
src/utilities/currency/reconciliation/index.ts:18: * @standard SAF-T:3.0.2 (multi-currency period coding)
src/utilities/default/lexical/index.ts:4: * @standard W3C HTML5 Living Standard rich-text-output
src/utilities/default/lexical/index.ts:5: * @standard CommonMark 0.31 markdown-fallback
src/utilities/default/lexical/index.ts:7: * @standard BCP-47 language-tag locale-aware-content
src/utilities/default/lexical/index.ts:9: * @standard schema.org HTMLRichText
src/utilities/depreciation/service/index.ts:22: * @standard ISO-8601-1:2019 date-time period-start period-end
src/utilities/depreciation/service/index.ts:23: * @standard ISO-4217:2015 currency-codes
src/utilities/digit/index.ts:5: * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
src/utilities/diversity/index.ts:12: * @standard Shannon (1948) A Mathematical Theory of Communication — information entropy
src/utilities/diversity/index.ts:13: * @standard Simpson (1949) Measurement of Diversity — Nature 163:688
src/utilities/diversity/index.ts:14: * @standard Pielou (1966) The Measurement of Diversity in Different Types of Biological Collections
src/utilities/double/entry/validator/index.ts:22: * @standard IAS 1 — an entry balances
src/utilities/edge/index.ts:13: * @standard RFC 6585 §4 429-too-many-requests
src/utilities/edge/index.ts:14: * @standard RFC 9110 §10.2.3 retry-after
src/utilities/emit/domain/event/index.ts:15: * @standard ISO-8601-1:2019 date-time event-timestamp
src/utilities/en/16931/collection-alignment.test.ts:10: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/utilities/en/16931/collection-alignment.test.ts:9: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/en/16931/index.ts:4: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/utilities/en/16931/types/index.ts:101: * @standard EN-16931:2017 BG-30 line-vat-information
src/utilities/en/16931/types/index.ts:119: * @standard EN-16931:2017 BG-25 invoice-line
src/utilities/en/16931/types/index.ts:13: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/utilities/en/16931/types/index.ts:14: * @standard ISO-4217:2015 currency-codes
src/utilities/en/16931/types/index.ts:15: * @standard ISO-8601-1:2019 date-time
src/utilities/en/16931/types/index.ts:168: * @standard EN-16931:2017 BG-27 invoice-line-allowances
src/utilities/en/16931/types/index.ts:182: * @standard EN-16931:2017 BG-28 invoice-line-charges
src/utilities/en/16931/types/index.ts:198: * @standard EN-16931:2017 BG-20 document-level-allowances
src/utilities/en/16931/types/index.ts:220: * @standard EN-16931:2017 BG-21 document-level-charges
src/utilities/en/16931/types/index.ts:238: * @standard EN-16931:2017 BG-23 vat-breakdown
src/utilities/en/16931/types/index.ts:260: * @standard EN-16931:2017 BG-22 document-totals
src/utilities/en/16931/types/index.ts:28: * @standard EN-16931:2017 BT-3 invoice-type-code
src/utilities/en/16931/types/index.ts:292: * @standard EN-16931:2017 BG-1 invoice
src/utilities/en/16931/types/index.ts:29: * @standard UN-CEFACT 1001 document-name-code
src/utilities/en/16931/types/index.ts:49: * @standard EN-16931:2017 BT-151 vat-category-code
src/utilities/en/16931/types/index.ts:50: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/utilities/en/16931/types/index.ts:60: * @standard EN-16931:2017 BT-81 payment-means-type-code
src/utilities/en/16931/types/index.ts:61: * @standard UN-CEFACT 4461 payment-means
src/utilities/en/16931/types/index.ts:81: * @standard EN-16931:2017 BG-29 price-details
src/utilities/en/16931/validate.ts:6: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
src/utilities/en/16931/validate.ts:7: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
src/utilities/en/16931/validate.ts:8: * @standard UN-CEFACT 1001 document-name-code
src/utilities/en/16931/validate.ts:9: * @standard UN-CEFACT 4461 payment-means
src/utilities/entry/index.ts:25: * @standard IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)
src/utilities/entry/index.ts:26: * @standard FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation
src/utilities/entry/index.ts:27: * @standard ISO 20022: debtor/creditor are the two signs of ONE transfer
src/utilities/erpax/api/surface/index.ts:11: * @standard ISO-8601:2019 date-and-time-extended-format
src/utilities/error/codedError.ts:10: * @standard OWASP-ASVS V7 error-handling-and-logging
src/utilities/error/errorCodes.ts:9: * @standard OWASP-ASVS V7 error-handling-and-logging
src/utilities/error/httpApiError.ts:7: * @standard OWASP-ASVS V7 error-handling-and-logging
src/utilities/error/index.ts:11: * @standard OWASP-ASVS V7 error-handling-and-logging
src/utilities/error/registry.ts:10: * @standard OWASP-ASVS V7 error-handling-and-logging
src/utilities/etsi/en/319/142/index.ts:4: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/utilities/etsi/en/319/142/index.ts:5: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/utilities/etsi/en/319/142/profile.ts:18: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/utilities/etsi/en/319/142/profile.ts:19: * @standard ETSI-TS-119-142-1 pades-cms-signature-format
src/utilities/etsi/en/319/142/profile.ts:20: * @standard ETSI-EN-319-122-1 cades-baseline-profile (CMS basis for PAdES)
src/utilities/etsi/en/319/142/profile.ts:21: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/utilities/etsi/en/319/142/profile.ts:22: * @standard rfc-3161 timestamp-protocol
src/utilities/etsi/en/319/142/profile.ts:23: * @standard rfc-5652 cryptographic-message-syntax
src/utilities/etsi/en/319/142/profile.ts:48: * @standard ETSI-EN-319-142-1 §5.1 baseline-profile-attribute-oids
src/utilities/etsi/en/319/142/signature-dictionary.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/etsi/en/319/142/signature-dictionary.test.ts:6: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/utilities/etsi/en/319/142/signature-dictionary.test.ts:7: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/utilities/etsi/en/319/142/signature-dictionary.ts:20: * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
src/utilities/etsi/en/319/142/signature-dictionary.ts:21: * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
src/utilities/etsi/en/319/142/signature-dictionary.ts:22: * @standard rfc-5652 cryptographic-message-syntax
src/utilities/eu/ai/act/index.ts:10: * @standard EU AI Act 2024 Regulation (EU) 2024/1689
src/utilities/eu/ai/act/index.ts:11: * @standard ISO/IEC 23894:2023 ai-risk-management
src/utilities/eu/ai/act/index.ts:12: * @standard ISO/IEC 42001:2023 ai-management-system
src/utilities/eu/ai/act/index.ts:13: * @standard NIST AI-RMF-1.0 ai-risk-management-framework
src/utilities/eu/csrd/esr/index.ts:10: * @standard EU ESRS 1 General Requirements
src/utilities/eu/csrd/esr/index.ts:11: * @standard EU ESRS 2 General Disclosures
src/utilities/eu/csrd/esr/index.ts:12: * @standard EU ESRS E1 Climate Change (companion to GHG Protocol)
src/utilities/eu/csrd/esr/index.ts:13: * @standard IFRS S1 General Sustainability Disclosures
src/utilities/eu/csrd/esr/index.ts:14: * @standard IFRS S2 Climate-Related Disclosures
src/utilities/eu/csrd/esr/index.ts:15: * @standard EU EFRAG ESRS-XBRL taxonomy
src/utilities/eu/csrd/esr/index.ts:9: * @standard EU CSRD Directive 2022/2464
src/utilities/event/emitter/service/index.ts:212:   * @standard ISO/IEC-29119:2022 software-testing test-isolation
src/utilities/event/emitter/service/index.ts:8: * @standard ISO-8601-1:2019 date-time event-timestamp
src/utilities/factory/collection/test.ts:13: * @standard ISO/IEC 25010:2023 §5.5 testability — factory dedup contract
src/utilities/factory/recompute-parent-aggregates.ts:25: * @standard EN-16931:2017 BT-106/109/110/112 document-totals
src/utilities/factory/recompute-parent-aggregates.ts:26: * @standard ISA-95 IEC-62264 production-order-aggregation
src/utilities/field/nested/index.ts:4: * @standard ISO/IEC 25010:2023 §5.6 maintainability (one truth, one address)
src/utilities/fiscal/index.ts:8: * @standard BG Наредба-Н-18 §СУПТО
src/utilities/fiscal/period/resolver/code/index.ts:10: * @standard XBRL period identifiers
src/utilities/fiscal/period/resolver/code/index.ts:9: * @standard SAF-T period coding
src/utilities/fiscal/period/resolver/index.ts:13: * @standard IAS-34:2023 (period structure, quarterly alignment)
src/utilities/fiscal/period/resolver/index.ts:14: * @standard ISO-8601:2019 (week numbering, date arithmetic, leap year)
src/utilities/fiscal/period/resolver/index.ts:15: * @standard ISO-4217:2023 (currency context)
src/utilities/fiscal/period/resolver/index.ts:16: * @standard SAF-T:3.0.2 (regulatory period coding)
src/utilities/fiscal/period/resolver/span/index.ts:9: * @standard ISO-8601:2019 week-numbering (the ISO week)
src/utilities/generate/meta/index.ts:6: * @standard W3C-HTML5 §4.2.5 meta-element
src/utilities/generate/meta/index.ts:7: * @standard OGP open-graph-protocol-1.0
src/utilities/get/preview/secret/index.ts:5: * @standard NIST SP-800-108 key-derivation-function
src/utilities/get/tenant/from/request/index.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control tenant-scope
src/utilities/get/user/tenant/i/ds/index.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control user-role-assignment
src/utilities/ghg/protocol/index.ts:10: * @standard GHG Protocol Scope 2 Guidance (2015)
src/utilities/ghg/protocol/index.ts:11: * @standard GHG Protocol Scope 3 Standard (2011)
src/utilities/ghg/protocol/index.ts:12: * @standard ISO 14064-1:2018 organisation-level-ghg-quantification
src/utilities/ghg/protocol/index.ts:13: * @standard EU ESRS E1 §44-50 ghg-emissions-disclosure (companion)
src/utilities/ghg/protocol/index.ts:14: * @standard IFRS S2 §29-32 climate-related-metrics (companion)
src/utilities/ghg/protocol/index.ts:9: * @standard GHG Protocol Corporate Standard (revised 2015)
src/utilities/gl/account/resolver/index.ts:24: * @standard ISO-4217:2015 currency-codes
src/utilities/horo/index.ts:23: * @standard ISO-16:1975 a432-tuning-reference (the anchor; value from position)
src/utilities/iban/index.ts:10: * @standard ISO-7064:2003 mod-97-10 check-digits
src/utilities/iban/index.ts:9: * @standard ISO-13616-1:2020 iban
src/utilities/image/index.ts:15: * @standard SVG 1.1 / SMIL animation · deterministic hash-to-art (identicon family)
src/utilities/image/share/index.ts:17: * @standard OGP open-graph-protocol-1.0 (og:image 1200×630)
src/utilities/image/share/index.ts:18: * @standard SVG 1.1 / SMIL animation
src/utilities/incoterms/2020/index.ts:12: * @standard ICC INCOTERMS 2020 publication-no-723E
src/utilities/incoterms/2020/index.ts:13: * @standard ISO 6346 freight-container-code (related)
src/utilities/integrity/base64url/index.ts:5: * @standard RFC 4648 §5 base64url — URL and filename safe alphabet
src/utilities/integrity/content/index.ts:42: * @standard RFC 9562 §5.8 name-based UUID (version 8, custom layout)
src/utilities/integrity/content/index.ts:43: * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
src/utilities/integrity/content/index.ts:44: * @standard ISO/IEC 10118 hash functions
src/utilities/integrity/content/index.ts:45: * @standard NIST FIPS 180-4 SHA-256
src/utilities/integrity/content/test.ts:4: * @standard RFC 9562 §5.8 + RFC 8785 + FIPS 180-4
src/utilities/integrity/envelope/index.ts:48: * @standard NIST SP 800-38D AES-GCM
src/utilities/integrity/envelope/index.ts:49: * @standard NIST SP 800-57 §5.6 key-management lifecycles
src/utilities/integrity/envelope/index.ts:50: * @standard RFC 5116 AEAD
src/utilities/integrity/envelope/index.ts:51: * @standard RFC 5869 HKDF
src/utilities/integrity/envelope/index.ts:52: * @standard ISO/IEC 27040 §6.7 storage security
src/utilities/integrity/envelope/index.ts:53: * @standard ISO/IEC 27001 Annex A.10.1.1 cryptographic-controls policy
src/utilities/integrity/envelope/index.ts:54: * @standard GDPR Article 32(1)(a) encryption of personal data
src/utilities/integrity/envelope/index.ts:55: * @standard HIPAA §164.312(a)(2)(iv) encryption of ePHI
src/utilities/integrity/envelope/index.ts:56: * @standard PCI DSS 4.0 §3.5 strong cryptography
src/utilities/integrity/envelope/test.ts:17: * @standard NIST SP 800-38D AES-GCM (AEAD authentication failure case)
src/utilities/integrity/envelope/test.ts:18: * @standard RFC 5869 HKDF (the key derivation step)
src/utilities/integrity/resource-bound.ts:31: * @standard NIST FIPS 180-4 sha-256 (the content-uuid digest) — second-preimage 2^256, collision 2^128
src/utilities/integrity/resource-bound.ts:32: * @standard Landauer 1961 / Bennett 1982 — kT·ln2 minimum per irreversible bit op
src/utilities/integrity/signatures/index.ts:43: * @standard RFC 8032 EdDSA (Ed25519)
src/utilities/integrity/signatures/index.ts:44: * @standard RFC 7515 JSON Web Signature (alg names)
src/utilities/integrity/signatures/index.ts:45: * @standard ETSI EN 319 132-1 XAdES
src/utilities/integrity/signatures/index.ts:46: * @standard ETSI EN 319 142-1 PAdES
src/utilities/integrity/signatures/index.ts:47: * @standard eIDAS Regulation (EU) 910/2014 §3.12 qualified electronic signature
src/utilities/integrity/signatures/index.ts:48: * @standard ISO/IEC 27001 Annex A.10 cryptographic controls
src/utilities/integrity/signatures/index.ts:49: * @standard NIST SP 800-57 §5.6 key-management lifecycles
src/utilities/integrity/signatures/test.ts:15: * @standard RFC 8032 EdDSA / Ed25519
src/utilities/integrity/signatures/test.ts:16: * @standard RFC 7515 JWS compact serialization
src/utilities/integrity/tamper-proof-uuid-field.ts:36: * @standard RFC 9562 §5.8 + RFC 8785 + NIST FIPS 180-4
src/utilities/integrity/tamper-reverse-cost.ts:43: * @standard RFC 4634 / NIST FIPS 180-4 (sha-256 collision resistance)
src/utilities/integrity/tamper-reverse-cost.ts:44: * @standard RFC 8032 Ed25519 SUF-CMA security parameter
src/utilities/integrity/tamper-reverse-cost.ts:45: * @standard GDPR Article 32 "appropriate technical measures"
src/utilities/integrity/tamper-reverse-cost.ts:46: * @standard eIDAS Annex II §1(f) cryptographic strength requirement
src/utilities/integrity/tamper-reverse-cost.ts:47: * @standard PCI DSS 4.0 §3.6.1 strong cryptography
src/utilities/integrity/tamper-reverse-cost.ts:48: * @standard NIST SP 800-57 §5.6 security strength categorisation
src/utilities/integrity/tenant-key-registry.ts:33: * @standard NIST SP 800-57 §5.6 key-management lifecycles
src/utilities/integrity/tenant-key-registry.ts:34: * @standard ISO/IEC 27001 Annex A.10.1.2 key-management policy
src/utilities/integrity/tenant-key-registry.ts:35: * @standard PCI DSS 4.0 §3.6 key-management procedures
src/utilities/integrity/type-uuid.ts:51: * @standard W3C JSON-LD 1.1 + JSON Schema (draft 2020-12)
src/utilities/integrity/type-uuid.ts:52: * @standard RFC 9562 §5.8 + RFC 8785 (canonical type uuid)
src/utilities/integrity/type-uuid.ts:53: * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
src/utilities/integrity/type-uuid.ts:54: * @standard W3C Verifiable Credentials Data Model 2.0 (typed claims)
src/utilities/integrity/uuid-linked-chain.ts:39: * @standard FIPS 180-4 sha-256
src/utilities/integrity/uuid-linked-chain.ts:40: * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
src/utilities/integrity/uuid-linked-chain.ts:41: * @standard RFC 9562 §5.8 name-based UUID
src/utilities/integrity/uuid-ref.ts:27: * @standard RFC 9562 §5.8 + RFC 8785
src/utilities/integrity/uuid-short.ts:40: * @standard RFC 9562 §5.8 — uuidv8 (full form for verification)
src/utilities/integrity/uuid-short.ts:41: * @standard ISO/IEC 25010:2023 §5.3 usability — discoverability
src/utilities/integrity/uuid-short.ts:42: * @standard ISO/IEC 27001 §A.9.4.5 (information access restriction)
src/utilities/intercompany/reconciliation/index.ts:19: * @standard IAS-27:2023 (consolidated and separate financial statements)
src/utilities/intercompany/reconciliation/index.ts:20: * @standard IAS-28:2023 (associates and joint ventures)
src/utilities/intercompany/reconciliation/index.ts:21: * @standard IFRS-3:2023 (business combinations)
src/utilities/intercompany/reconciliation/index.ts:22: * @standard IFRS-10:2023 (consolidated financial statements)
src/utilities/intercompany/reconciliation/index.ts:23: * @standard IFRS-11:2023 (joint arrangements)
src/utilities/intercompany/reconciliation/index.ts:24: * @standard SAF-T:3.0.2 (multi-entity audit trail)
src/utilities/internal/controls/audit/findings/court-docket.ts:11: * @standard ISO-19011:2018 audit-finding
src/utilities/invoices/hooks/deriveNumber.test.ts:4: * @standard EN-16931:2017 BT-1 invoice-number
src/utilities/invoices/hooks/deriveNumber.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/invoices/hooks/deriveNumber.ts:8: * @standard EN-16931:2017 BT-1 invoice-number
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:13: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/invoices/hooks/transition/index.ts:5: * @standard IFRS IAS-1 presentation (a reversal is a transition, never an edit)
src/utilities/invoices/invoice/lines/hooks/recomputeInvoiceTotals.ts:17: * @standard EN-16931:2017 BT-106/109/110/112/115 document-totals
src/utilities/invoices/payments/hooks/recomputeInvoicePaid.ts:14: * @standard EN-16931:2017 BT-113/115 paid-amount amount-due-for-payment
src/utilities/iso/13616/iban-bg.ts:20: * @standard ISO-13616-1:2020 BG-22 iban-bulgaria
src/utilities/iso/13616/iban-bg.ts:21: * @standard ISO-7064:2003 mod-97-10 check-digits
src/utilities/iso/13616/iban-bg.ts:22: * @standard ISO-3166-1:2020 BG country-code
src/utilities/iso/13616/iban-bg.ts:23: * @standard BNB Регламент 3 §3 bank-account-numbering
src/utilities/iso/13616/iban/index.ts:19: * @standard ISO-13616-1:2020 §6 verification
src/utilities/iso/13616/iban/index.ts:20: * @standard ISO-7064:2003 mod-97-10
src/utilities/iso/13616/iban/index.ts:4: * @standard ISO-13616-1:2020 iban
src/utilities/iso/13616/iban/index.ts:5: * @standard ISO-7064:2003 check-character-systems mod-97-10
src/utilities/iso/13616/iban/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/iso/13616/iban/test.ts:5: * @standard ISO-13616-1:2020 iban
src/utilities/iso/13616/iban/test.ts:6: * @standard ISO-7064:2003 check-character-systems mod-97-10
src/utilities/iso/13616/index.ts:4: * @standard ISO-13616-1:2020 iban
src/utilities/iso/14289/index.ts:4: * @standard ISO-14289-1:2014 pdf-ua-1
src/utilities/iso/14289/index.ts:5: * @standard ISO-14289-2:2024 pdf-ua-2
src/utilities/iso/14289/profile/index.ts:21: * @standard ISO-14289-1:2014 pdf-ua-1
src/utilities/iso/14289/profile/index.ts:22: * @standard ISO-14289-2:2024 pdf-ua-2
src/utilities/iso/14289/profile/index.ts:23: * @standard W3C WCAG-2.1 web-content-accessibility-guidelines
src/utilities/iso/14289/profile/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/iso/14289/profile/test.ts:5: * @standard ISO-14289-1:2014 pdf-ua-1
src/utilities/iso/14289/profile/test.ts:6: * @standard ISO-14289-2:2024 pdf-ua-2
src/utilities/iso/19005/index.ts:4: * @standard ISO-19005-1:2005 pdf-a-1
src/utilities/iso/19005/index.ts:5: * @standard ISO-19005-2:2011 pdf-a-2
src/utilities/iso/19005/index.ts:6: * @standard ISO-19005-3:2012 pdf-a-3
src/utilities/iso/19005/metadata.ts:10: * @standard W3C XMP-1.0 metadata-platform
src/utilities/iso/19005/metadata.ts:11: * @standard rfc-3066 language-tag (xml:lang)
src/utilities/iso/19005/metadata.ts:9: * @standard ISO-19005-1:2005 §6.7 metadata-stream
src/utilities/iso/19005/profile/index.ts:17: * @standard ISO-19005-1:2005 pdf-a-1
src/utilities/iso/19005/profile/index.ts:18: * @standard ISO-19005-2:2011 pdf-a-2
src/utilities/iso/19005/profile/index.ts:19: * @standard ISO-19005-3:2012 pdf-a-3
src/utilities/iso/19005/profile/index.ts:20: * @standard ISO-32000-1:2008 pdf-1.7
src/utilities/iso/19005/profile/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/iso/19005/profile/test.ts:5: * @standard ISO-19005-1:2005 pdf-a-1
src/utilities/iso/19005/profile/test.ts:6: * @standard ISO-19005-2:2011 pdf-a-2
src/utilities/iso/19005/profile/test.ts:7: * @standard ISO-19005-3:2012 pdf-a-3
src/utilities/iso/19011/index.ts:4: * @standard ISO-19011:2018 audit-trail
src/utilities/iso/19011/types/index.ts:10: * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
src/utilities/iso/19011/types/index.ts:11: * @standard ISO-19011:2018 §6.5 audit-conclusions
src/utilities/iso/19011/types/index.ts:24: * @standard ISO-19011:2018 §6.4.6 audit-evidence
src/utilities/iso/19011/types/index.ts:98:   * @standard ISO-8601-1:2019 date-time event-timestamp
src/utilities/iso/20022/index.ts:4: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/utilities/iso/20022/types/index.ts:104: * @standard ISO-13616-1:2020 iban
src/utilities/iso/20022/types/index.ts:10: * @standard ISO-13616-1:2020 iban
src/utilities/iso/20022/types/index.ts:11: * @standard ISO-9362:2022 bic
src/utilities/iso/20022/types/index.ts:120: * @standard ISO-11649:2009 financial-services-creditor-reference
src/utilities/iso/20022/types/index.ts:12: * @standard ISO-4217:2015 currency-codes
src/utilities/iso/20022/types/index.ts:137: * @standard ISO-20022 RemittanceInformation16
src/utilities/iso/20022/types/index.ts:13: * @standard ISO-8601-1:2019 date-time
src/utilities/iso/20022/types/index.ts:155: * @standard ISO-20022 ReportEntry10
src/utilities/iso/20022/types/index.ts:156: * @standard ISO-20022 EntryTransaction10
src/utilities/iso/20022/types/index.ts:197: * @standard ISO-20022 BankToCustomerStatementV08
src/utilities/iso/20022/types/index.ts:232: * @standard ISO-20022 BankToCustomerAccountReportV08
src/utilities/iso/20022/types/index.ts:250: * @standard ISO-20022 BankToCustomerDebitCreditNotificationV08
src/utilities/iso/20022/types/index.ts:267: * @standard ISO-20022 CustomerCreditTransferInitiationV09
src/utilities/iso/20022/types/index.ts:26: * @standard ISO-20022 ExternalBankTransactionDomain1Code
src/utilities/iso/20022/types/index.ts:27: * @standard ISO-20022 ExternalBankTransactionFamily1Code
src/utilities/iso/20022/types/index.ts:289: * @standard ISO-20022 PaymentInstruction30
src/utilities/iso/20022/types/index.ts:28: * @standard ISO-20022 ExternalBankTransactionSubFamily1Code
src/utilities/iso/20022/types/index.ts:313: * @standard ISO-20022 CreditTransferTransaction34
src/utilities/iso/20022/types/index.ts:334: * @standard ISO-20022 ExternalPaymentTransactionStatus1Code
src/utilities/iso/20022/types/index.ts:349: * @standard ISO-20022 CustomerPaymentStatusReportV10
src/utilities/iso/20022/types/index.ts:363: * @standard ISO-20022 PaymentTransaction110
src/utilities/iso/20022/types/index.ts:382: * @standard ISO-20022 CustomerDirectDebitInitiationV08
src/utilities/iso/20022/types/index.ts:399: * @standard ISO-20022 PaymentInstruction23
src/utilities/iso/20022/types/index.ts:428: * @standard ISO-20022 DirectDebitTransactionInformation23
src/utilities/iso/20022/types/index.ts:42: * @standard ISO-20022 EntryStatus2Code
src/utilities/iso/20022/types/index.ts:455: * @standard ISO-20022 FIToFICustomerCreditTransferV08
src/utilities/iso/20022/types/index.ts:469: * @standard ISO-20022 CreditTransferTransaction39
src/utilities/iso/20022/types/index.ts:492: * @standard ISO-20022 PaymentReturnV09
src/utilities/iso/20022/types/index.ts:49: * @standard ISO-20022 CreditDebitCode
src/utilities/iso/20022/types/index.ts:509: * @standard ISO-20022 PaymentTransaction109
src/utilities/iso/20022/types/index.ts:57: * @standard ISO-20022 ChargeBearerType1Code
src/utilities/iso/20022/types/index.ts:67: * @standard ISO-20022 PostalAddress24
src/utilities/iso/20022/types/index.ts:84: * @standard ISO-20022 PartyIdentification135
src/utilities/iso/20022/types/index.ts:85: * @standard ISO-9362:2022 bic
src/utilities/iso/20022/types/index.ts:86: * @standard ISO-17442-1:2020 lei
src/utilities/iso/20022/types/index.ts:9: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/utilities/iso/20022/validate.ts:5: * @standard ISO-20022:2022 universal-financial-industry-message-scheme
src/utilities/iso/27002/coverage.ts:10: * @standard ISO-27002:2022 information-security-controls
src/utilities/iso/27002/coverage.ts:11: * @standard ISO-27001:2022 isms-annex-a-controls
src/utilities/iso/27002/index.ts:4: * @standard ISO-27002:2022 information-security-controls
src/utilities/iso/27002/index.ts:5: * @standard ISO-27001:2022 isms-annex-a-controls
src/utilities/iso/27002/types/index.ts:10: * @standard ISO-27002:2022 information-security-controls
src/utilities/iso/27002/types/index.ts:11: * @standard ISO-27001:2022 isms-annex-a-controls
src/utilities/iso/27002/types/index.ts:19: * @standard ISO-27002:2022 §4 themes
src/utilities/iso/27002/types/index.ts:28: * @standard ISO-27002:2022 information-security-controls
src/utilities/iso/27002/validate.ts:7: * @standard ISO-27002:2022 information-security-controls
src/utilities/iso/27002/validate.ts:8: * @standard ISO-27001:2022 isms-annex-a-controls
src/utilities/iso/4217/index.ts:4: * @standard ISO-4217:2015 currency-codes
src/utilities/iso/4217/validate/index.ts:16: * @standard ISO-4217:2015 §5 alphabetic-codes
src/utilities/iso/4217/validate/index.ts:4: * @standard ISO-4217:2015 currency-codes
src/utilities/iso/4217/validate/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/iso/4217/validate/test.ts:5: * @standard ISO-4217:2015 currency-codes
src/utilities/iso/8601/coerce.ts:14: * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
src/utilities/iso/8601/coerce.ts:15: * @standard ECMA-262 Date.prototype.toISOString
src/utilities/iso/8601/coerce.ts:4: * @standard ISO-8601-1:2019 date-time
src/utilities/iso/8601/format-date-time.ts:10: * @standard ECMA-402 internationalization-api Intl.DateTimeFormat
src/utilities/iso/8601/format-date-time.ts:8: * @standard ISO-8601-1:2019 date-time input-canonical-form
src/utilities/iso/8601/format-date-time.ts:9: * @standard ECMA-262 Date.prototype
src/utilities/iso/8601/index.ts:4: * @standard ISO-8601-1:2019 date-time
src/utilities/iso/8601/validate/index.ts:22: * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
src/utilities/iso/8601/validate/index.ts:4: * @standard ISO-8601-1:2019 date-time
src/utilities/iso/8601/validate/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/iso/8601/validate/test.ts:5: * @standard ISO-8601-1:2019 date-time
src/utilities/iso/9362/bic/index.ts:16: * @standard ISO-9362:2022 §6 structure
src/utilities/iso/9362/bic/index.ts:4: * @standard ISO-9362:2022 bic
src/utilities/iso/9362/bic/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/iso/9362/bic/test.ts:5: * @standard ISO-9362:2022 bic
src/utilities/iso/9362/index.ts:4: * @standard ISO-9362:2022 bic
src/utilities/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:11: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/journal/entry/service/index.ts:12: * @standard ISO-8601-1:2019 date-time entry-date posted-date
src/utilities/journal/entry/service/index.ts:13: * @standard ISO-4217:2015 currency-codes
src/utilities/localize/index.ts:39: * @standard RFC 9562 §5.8 (uuidv8 structured, name-based)
src/utilities/localize/index.ts:40: * @standard ITU-T X.667 / ISO-IEC 9834-8 (UUID ↔ OID 2.25 arc)
src/utilities/localize/index.ts:41: * @standard RFC 3061 (urn:oid: namespace) · RFC 4122 §3 (urn:uuid:)
src/utilities/localize/index.ts:42: * @standard BCP-47 (locale tags) · EU 1958/1 (official EU languages)
src/utilities/localize/index.ts:43: * @standard NIST SP 800-107r1 §5.1 (hash strengths — via tamper-cost)
src/utilities/merge/open/graph/index.ts:4: * @standard OGP open-graph-protocol-1.0
src/utilities/merge/open/graph/index.ts:5: * @standard W3C-HTML5 §4.2.5 meta-element
src/utilities/message/index.ts:11: * @standard RFC 9562 §5.8 (the structured uuid carries the message)
src/utilities/naredba/n/18/index.ts:8: * @standard BG Наредба-Н-18 §СУПТО retail-fiscal-regime
src/utilities/naredba/n/18/index.ts:9: * @standard BG ЗДДС §118 fiscal-receipt-obligation
src/utilities/naredba/n/18/scope/index.ts:16: * @standard BG Наредба-Н-18 §чл.3-ал.1 fiscalization-scope-by-payment
src/utilities/naredba/n/18/scope/index.ts:17: * @standard BG ЗДДС §118 fiscal-receipt-obligation
src/utilities/naredba/n/18/scope/index.ts:18: * @standard BG ЗПУПС payment-services (PSP transfers)
src/utilities/naredba/n/18/scope/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/naredba/n/18/scope/test.ts:7: * @standard BG Наредба-Н-18 §чл.3-ал.1
src/utilities/naredba/n/18/unp/index.ts:19: * @standard BG Наредба-Н-18 §СУПТО УНП unique-sales-number
src/utilities/naredba/n/18/unp/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/naredba/n/18/unp/test.ts:5: * @standard BG Наредба-Н-18 §СУПТО УНП unique-sales-number
src/utilities/naredba/n/18/vat-groups.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/naredba/n/18/vat-groups.test.ts:5: * @standard BG Наредба-Н-18 §Приложение-1 fiscal-device-tax-groups
src/utilities/naredba/n/18/vat-groups.ts:16: * @standard BG Наредба-Н-18 §Приложение-1 fiscal-device-tax-groups данъчни-групи
src/utilities/naredba/n/18/vat-groups.ts:17: * @standard EU 2006/112/EC vat-system-directive (rate bands)
src/utilities/nist/incits/359/conventions/index.ts:21: * @standard POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source
src/utilities/nist/incits/359/conventions/index.ts:22: * @standard NIST INCITS-359-2012 role-based-access-control vocabulary-layer
src/utilities/nist/incits/359/conventions/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/nist/incits/359/conventions/test.ts:5: * @standard POSIX-1.2017 §1.6.1.1 file-mode-bits
src/utilities/nist/incits/359/conventions/test.ts:6: * @standard NIST INCITS-359-2012 role-based-access-control vocabulary-layer
src/utilities/nist/incits/359/index.ts:8: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/nist/incits/359/index.ts:9: * @standard NIST SP-800-162 attribute-based-access-control
src/utilities/nist/incits/359/payload.ts:4: * @standard NIST INCITS-359-2012 §5.2 administrative-functions
src/utilities/nist/incits/359/predicates/index.ts:4: * @standard NIST INCITS-359-2012 §5 core-rbac-predicates
src/utilities/nist/incits/359/predicates/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/nist/incits/359/predicates/test.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/nist/incits/359/types.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/nist/sp/800/108/derive-secret.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/nist/sp/800/108/derive-secret.test.ts:5: * @standard NIST SP-800-108 key-derivation-function
src/utilities/nist/sp/800/108/derive-secret.test.ts:6: * @standard NIST FIPS-198-1 hmac
src/utilities/nist/sp/800/108/derive-secret.test.ts:7: * @standard NIST FIPS-180-4 sha-256
src/utilities/nist/sp/800/108/index.ts:4: * @standard NIST SP-800-108 key-derivation-function
src/utilities/nist/sp/800/108/kdf.ts:10: * @standard NIST FIPS-198-1 hmac
src/utilities/nist/sp/800/108/kdf.ts:11: * @standard NIST FIPS-180-4 sha-256
src/utilities/nist/sp/800/108/kdf.ts:9: * @standard NIST SP-800-108 key-derivation-function
src/utilities/nist/sp/800/38/aes-gcm.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/nist/sp/800/38/aes-gcm.test.ts:5: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/utilities/nist/sp/800/38/aes-gcm.test.ts:6: * @standard NIST FIPS-197 aes-256
src/utilities/nist/sp/800/38/aes-gcm.ts:10: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/utilities/nist/sp/800/38/aes-gcm.ts:11: * @standard NIST FIPS-197 aes-256
src/utilities/nist/sp/800/38/aes-gcm.ts:12: * @standard NIST FIPS-180-4 sha-256
src/utilities/nist/sp/800/38/aes-gcm.ts:55: * @standard NIST SP-800-38D §6 ghash + §7.1 encrypt
src/utilities/nist/sp/800/38/aes-gcm.ts:89: * @standard NIST SP-800-38D §7.2 decrypt-and-verify
src/utilities/nist/sp/800/38/index.ts:4: * @standard NIST SP-800-38D aes-gcm authenticated-encryption
src/utilities/notification/index.ts:17: * @standard rfc-5321 simple-mail-transfer-protocol
src/utilities/notification/index.ts:18: * @standard rfc-5322 internet-message-format
src/utilities/notification/index.ts:19: * @standard rfc-2616 §14.10 https-keep-alive
src/utilities/notification/subscriber.ts:13: * @standard rfc-5321 simple-mail-transfer-protocol
src/utilities/notification/subscriber.ts:14: * @standard rfc-5322 internet-message-format
src/utilities/oecd/tpg/index.ts:5: * @standard OECD TPG 2022 transfer-pricing-guidelines
src/utilities/oecd/tpg/index.ts:6: * @standard OECD BEPS Action 13 master-file-local-file-cbcr
src/utilities/oecd/tpg/index.ts:7: * @standard EU DAC-4 country-by-country-reporting
src/utilities/oecd/tpg/index.ts:8: * @standard OECD Pillar Two GloBE 15% global minimum tax (companion)
src/utilities/party/aging.service.ts:9: * @standard ISO-8601-1:2019 date-time days-between-arithmetic
src/utilities/party/roles/index.ts:12: * @standard EN-16931:2017 §BG-4 seller · §BG-7 buyer · §BG-10 payee · §BG-13 deliver-to
src/utilities/party/roles/index.ts:13: * @standard UBL-2.1 Order — SellerSupplierParty · BuyerCustomerParty · OriginatorCustomerParty · Delivery/DeliveryParty · FreightForwarderParty
src/utilities/party/roles/index.ts:14: * @standard NIST INCITS-359-2012 §6.1 object-scoped role assignment
src/utilities/persist/api/audit/event/index.ts:15: * @standard ISO-19011:2018 audit-trail external-system-evidence
src/utilities/persist/api/audit/event/index.ts:16: * @standard ISO-3166-1:2020 country-codes alpha-2
src/utilities/perspective/index.ts:17: * @standard ISO 20022 party-role-perspective (debtor/creditor are one transfer)
src/utilities/post/close/analytics/service.ts:15: * @standard IAS-34:2023 Interim Financial Reporting
src/utilities/post/close/analytics/service.ts:16: * @standard IFRS-8:2023 Operating Segments
src/utilities/post/close/analytics/service.ts:17: * @standard IAS-1:2023 Presentation of Financial Statements
src/utilities/post/close/analytics/service.ts:18: * @standard COSO Internal Control Framework
src/utilities/post/close/analytics/service.ts:19: * @standard GAAP VRE (Variance Reporting and Explanation) Guidelines
src/utilities/product/price/index.ts:20: * @standard ISO-4217:2015 currency-codes
src/utilities/receipt/index.ts:11: * @standard RFC 8785 JSON canonicalization (the content the uuid addresses)
src/utilities/receipt/index.ts:12: * @standard NIST FIPS 180-4 SHA-256 (the chain + content hash)
src/utilities/receivable/aging/index.ts:12: * @standard ISO-8601-1:2019 date-time as-of-date
src/utilities/receivable/allowance/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/utilities/receivable/analytics/index.ts:10: * @standard ISO-8601-1:2019 date-time period
src/utilities/receivable/analytics/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/utilities/receivable/index.ts:4: * @standard EN-16931:2017 invoice-fields
src/utilities/receivable/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/utilities/receivable/index.ts:6: * @standard ISO-8601-1:2019 date-time
src/utilities/receivable/workflow/index.ts:8: * @standard EN-16931:2017 invoice-lifecycle
src/utilities/remote/media/import/index.ts:8: * @standard ISO/IEC-23008 mpeg-image
src/utilities/remote/media/import/index.ts:9: * @standard ISO/IEC-10918 jpeg
src/utilities/rfc/3986/generate-preview-path.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/3986/generate-preview-path.test.ts:6: * @standard W3C URL Living Standard
src/utilities/rfc/3986/generate-preview-path.test.ts:7: * @standard BCP-47 language-tag
src/utilities/rfc/3986/generate-preview-path.ts:5: * @standard W3C URL Living Standard
src/utilities/rfc/3986/generate-preview-path.ts:6: * @standard BCP-47 language-tag locale
src/utilities/rfc/3986/get-url.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/3986/get-url.ts:7: * @standard W3C URL Living Standard
src/utilities/rfc/3986/url-utils.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/3986/url-utils.test.ts:6: * @standard W3C URL Living Standard
src/utilities/rfc/3986/url-utils.ts:5: * @standard W3C URL Living Standard
src/utilities/rfc/3986/url-utils.ts:6: * @standard ECMA-262 URL-class
src/utilities/rfc/6585/rate-limit.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/6585/rate-limit.test.ts:8: * @standard OWASP-ASVS V2.2 authentication-throttling
src/utilities/rfc/6585/rate-limit.ts:11: * @standard OWASP-ASVS V2.2 authentication-throttling
src/utilities/rfc/6585/rate-limit.ts:12: * @standard NIST SP-800-63B §5.2.2 rate-limiting
src/utilities/rfc/9110/cache/index.ts:8: * @standard W3C HTTP-Cache stale-while-revalidate
src/utilities/rfc/9110/cache/index.ts:9: * @standard BCP-47 language-tag locale-keyed-cache
src/utilities/rfc/9110/cache/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/9110/get/document/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/9110/get/document/test.ts:6: * @standard BCP-47 language-tag locale-keyed-cache
src/utilities/rfc/9110/get/globals/index.ts:6: * @standard BCP-47 language-tag locale-keyed-cache
src/utilities/rfc/9110/get/globals/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rfc/9110/get/redirects/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/rodin/index.ts:24: * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring (mod 9)
src/utilities/roles/groups/index.ts:13: * @standard NIST INCITS-359-2012 §5.1 users and groups · role hierarchy through group nesting
src/utilities/roles/groups/index.ts:14: * @standard RFC-7643 §4.2 SCIM group resource — members may be groups
src/utilities/roles/registry/index.ts:19: * @standard ISO 27002:2022 §5.3 segregation-of-duties
src/utilities/roles/registry/index.ts:20: * @standard COBIT 5 PO4.11 segregation-of-duties
src/utilities/roles/registry/index.ts:21: * @standard SOX §404 internal-controls + §302 officer-certifications
src/utilities/roles/registry/index.ts:22: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/roles/separation/index.ts:10: * @standard ANSI/INCITS-359 static separation of duty (SSD) over user-role assignment
src/utilities/roles/separation/index.ts:9: * @standard ISO-27002 §5.3 segregation-of-duties (conflicting duties and areas of responsibility are separated)
src/utilities/run/cron/index.ts:24: * @standard RFC 6750 §2.1 — Bearer token in the Authorization header
src/utilities/saf/t/index.ts:4: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/utilities/saf/t/types/index.ts:103: * @standard OECD SAF-T 2.0 Header
src/utilities/saf/t/types/index.ts:12: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/utilities/saf/t/types/index.ts:139: * @standard OECD SAF-T 2.0 GeneralLedgerAccounts
src/utilities/saf/t/types/index.ts:13: * @standard ISO-3166-1:2020 country-codes
src/utilities/saf/t/types/index.ts:14: * @standard ISO-4217:2015 currency-codes
src/utilities/saf/t/types/index.ts:15: * @standard ISO-8601-1:2019 date-time
src/utilities/saf/t/types/index.ts:168: * @standard OECD SAF-T 2.0 Customer
src/utilities/saf/t/types/index.ts:183: * @standard OECD SAF-T 2.0 Supplier
src/utilities/saf/t/types/index.ts:195: * @standard OECD SAF-T 2.0 Product
src/utilities/saf/t/types/index.ts:211: * @standard OECD SAF-T 2.0 TaxTableEntry
src/utilities/saf/t/types/index.ts:227: * @standard OECD SAF-T 2.0 MasterFiles
src/utilities/saf/t/types/index.ts:243: * @standard OECD SAF-T 2.0 Line
src/utilities/saf/t/types/index.ts:266: * @standard OECD SAF-T 2.0 Transaction
src/utilities/saf/t/types/index.ts:28: * @standard OECD SAF-T 2.0 AddressStructure
src/utilities/saf/t/types/index.ts:291: * @standard OECD SAF-T 2.0 Journal
src/utilities/saf/t/types/index.ts:302: * @standard OECD SAF-T 2.0 GeneralLedgerEntries
src/utilities/saf/t/types/index.ts:318: * @standard OECD SAF-T 2.0 SourceDocuments
src/utilities/saf/t/types/index.ts:329: * @standard OECD SAF-T 2.0 InvoiceLine
src/utilities/saf/t/types/index.ts:351: * @standard OECD SAF-T 2.0 SalesInvoice
src/utilities/saf/t/types/index.ts:384: * @standard OECD SAF-T 2.0 Payment
src/utilities/saf/t/types/index.ts:414: * @standard OECD SAF-T 2.0 PaymentMechanism
src/utilities/saf/t/types/index.ts:440: * @standard OECD SAF-T 2.0 MovementOfGoods
src/utilities/saf/t/types/index.ts:44: * @standard OECD SAF-T 2.0 PartyInfoStructure
src/utilities/saf/t/types/index.ts:467: * @standard OECD SAF-T 2.0 SourceDocuments
src/utilities/saf/t/types/index.ts:500: * @standard OECD SAF-T 2.0 AuditFile
src/utilities/saf/t/types/index.ts:63: * @standard OECD SAF-T 2.0 AmountStructure
src/utilities/saf/t/types/index.ts:79: * @standard OECD SAF-T 2.0 TaxInformationStructure
src/utilities/saf/t/validate.ts:4: * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
src/utilities/saf/t/validate.ts:53: * @standard OECD SAF-T 2.0 GeneralLedgerEntries
src/utilities/safety/mode/index.ts:42: * @standard ISO/IEC 27001 Annex A.14.2.5 secure-systems-engineering
src/utilities/safety/mode/index.ts:43: * @standard NIST SP 800-160 §3.4.2 trustworthy secure design
src/utilities/safety/mode/index.ts:44: * @standard OWASP ASVS V14 Configuration (hard-coded production mode)
src/utilities/sale/audit-file.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/audit-file.test.ts:6: * @standard BG Наредба-Н-18 §Приложение-38
src/utilities/sale/audit-file.ts:17: * @standard BG Наредба-Н-18 §Приложение-38 standardized-audit-file
src/utilities/sale/audit-file.ts:18: * @standard OECD SAF-T 2.0 (universal base profile)
src/utilities/sale/fiscal/context/index.ts:21: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-regime
src/utilities/sale/fiscal/context/index.ts:22: * @standard ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency
src/utilities/sale/fiscal/context/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/fiscal/context/test.ts:7: * @standard BG Наредба-Н-18 §СУПТО fiscal-device-regime
src/utilities/sale/fiscal/receipt/index.ts:14: * @standard BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt
src/utilities/sale/fiscal/receipt/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/fiscal/receipt/test.ts:6: * @standard BG Наредба-Н-18 §СУПТО касов-бон
src/utilities/sale/fiscal/revenue/index.ts:6: * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 fiscalization-scope
src/utilities/sale/fiscal/revenue/test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/fiscal/revenue/test.ts:7: * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1
src/utilities/sale/order-fiscalization.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/order-fiscalization.test.ts:7: * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
src/utilities/sale/order-fiscalization.ts:11: * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
src/utilities/sale/receipt-subscriber.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/receipt-subscriber.test.ts:6: * @standard BG Наредба-Н-18 §СУПТО касов-бон
src/utilities/sale/receipt-subscriber.ts:8: * @standard BG Наредба-Н-18 §СУПТО касов-бон issuance-on-close
src/utilities/sale/reverse/index.ts:12: * @standard BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original
src/utilities/sale/reverse/test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/reverse/test.ts:6: * @standard BG Наредба-Н-18 §СУПТО сторно
src/utilities/sale/submit-audit-file.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/submit-audit-file.test.ts:6: * @standard BG Наредба-Н-18 §Приложение-38
src/utilities/sale/submit-audit-file.ts:8: * @standard BG Наредба-Н-18 §Приложение-38 audit-file-submission
src/utilities/sale/submit-audit-file.ts:9: * @standard OECD SAF-T 2.0 (universal base)
src/utilities/sale/subscription-fiscalization.test.ts:6: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/subscription-fiscalization.test.ts:7: * @standard BG Наредба-Н-18 §СУПТО · §чл.3-ал.1 card-payment-in-scope
src/utilities/sale/subscription-fiscalization.ts:15: * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 card-payment-in-scope
src/utilities/sale/virtual-device.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/sale/virtual-device.test.ts:6: * @standard BG Наредба-Н-18 §алтернативен-режим
src/utilities/sale/virtual-device.ts:15: * @standard BG Наредба-Н-18 §алтернативен-режим e-shop-card-payments
src/utilities/sale/virtual-device.ts:16: * @standard BG Наредба-Н-18 §Приложение-38 (monthly reporting — the audit file)
src/utilities/sandbox/index.ts:7: * @standard NIST SP-800-162 ABAC (capability-scoped authorization)
src/utilities/sandbox/index.ts:8: * @standard OWASP-ASVS V5 untrusted-input / least-privilege
src/utilities/semantic/index.ts:19: * @standard RFC 9110 §15.5.1 400-bad-request
src/utilities/semantic/index.ts:20: * @standard RFC 6585 §4 429-too-many-requests
src/utilities/shareds/documentPreviewAdmin.ts:15: * @standard BCP-47 language-tag locale
src/utilities/signal/index.ts:17: * @standard ISO-16:1975 a432-tuning-reference (pitch); value from position.
src/utilities/site/tenant/where/index.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control tenant-isolation
src/utilities/subscription/gate/index.ts:12: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/subscription/gate/index.ts:229: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/subscription/gate/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/subscription/gate/test.ts:5: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/tamper/cost/index.ts:49: * @standard NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)
src/utilities/tamper/cost/index.ts:50: * @standard RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)
src/utilities/tamper/cost/index.ts:51: * @standard ISO-19011:2018 §6.5 (audit evidence integrity)
src/utilities/tamper/cost/index.ts:52: * @standard CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
src/utilities/tamper/cost/index.ts:53: * @standard DeepSeek-Prover-V2 — recursive subgoal decomposition, Lean-4 kernel-checked invariants
src/utilities/tax/period/reconciliation/index.ts:19: * @standard IAS-12:2023 (income taxes)
src/utilities/tax/period/reconciliation/index.ts:20: * @standard IFRS-16:2023 (leases — tax implications)
src/utilities/tax/period/reconciliation/index.ts:21: * @standard OECD Transfer Pricing Guidelines:2022
src/utilities/tax/period/reconciliation/index.ts:22: * @standard BEPS Action 13:2021 (transfer pricing documentation)
src/utilities/tax/period/reconciliation/index.ts:23: * @standard OECD Pillar Two:2023 (global minimum tax)
src/utilities/tax/period/reconciliation/index.ts:24: * @standard SAF-T:3.0.2 (multi-entity, multi-jurisdiction audit trail)
src/utilities/team/comms/index.ts:14: * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/team/comms/index.ts:15: * @standard RFC 9562 §5.8 content-uuid event-identity
src/utilities/tenant/context/index.ts:37: * @standard ISO-3166-1:2020 country-codes alpha-2 cascade-source
src/utilities/tenant/context/index.ts:38: * @standard ISO-4217:2015 currency-codes alphabetic cascade-source
src/utilities/tenant/context/index.ts:39: * @standard BCP-47 language-tag locale-cascade
src/utilities/tenant/context/index.ts:40: * @standard ECMA-402 internationalization-api
src/utilities/tenant/remote/secret/index.ts:5: * @standard NIST SP-800-108 key-derivation-function (sibling: `getPreviewSecret`)
src/utilities/tenants/default/test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config-discovery-advanced.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config-discovery-advanced.test.ts:5: * @standard JSON-Schema 2020-12 schema-validation
src/utilities/testing/config-discovery.test.ts:4: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config-discovery.test.ts:5: * @standard JSON-Schema 2020-12 schema-validation
src/utilities/testing/config/discovery/index.ts:1170: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config/discovery/index.ts:1183: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config/discovery/index.ts:1193: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config/discovery/index.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/config/discovery/index.ts:9: * @standard JSON-Schema 2020-12 schema-validation
src/utilities/testing/index.ts:10: * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
src/utilities/testing/index.ts:11: * @standard JSON-Schema 2020-12 schema-validation
src/utilities/testing/index.ts:8: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/index.ts:9: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/utilities/testing/test-seed-factory.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
src/utilities/testing/test-seed-factory.test.ts:6: * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
src/utilities/testing/test-setup.test.ts:5: * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
src/utilities/testing/test-setup.test.ts:6: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/utilities/testing/test/seed/factory/index.ts:16: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/test/seed/factory/index.ts:17: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/utilities/testing/test/seed/factory/index.ts:18: * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
src/utilities/testing/test/seed/factory/index.ts:38: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/test/seed/factory/index.ts:57: * @standard ISO/IEC-29119:2022 software-testing test-fixture-categorization
src/utilities/testing/test/seed/factory/index.ts:724:   * @standard ISO/IEC-29119:2022 software-testing test-fixture
src/utilities/testing/test/setup/index.ts:5: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/testing/test/setup/index.ts:6: * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
src/utilities/think/index.ts:27: * @standard content-addressed memoization — the thought's address is the fold of its key ([[merge]])
src/utilities/trading/api/index.ts:39: * @standard ISO-3166-1:2020 country-codes alpha-2 region-scope
src/utilities/trading/api/index.ts:40: * @standard ISO-4217:2015 currency-codes fx-feeds
src/utilities/trading/api/index.ts:41: * @standard ISO-20022 financial-messages cross-references
src/utilities/trading/api/index.ts:42: * @standard RFC-9110 http-semantics REST-client
src/utilities/translation/index.ts:19: * @standard BCP-47 language tags
src/utilities/translation/index.ts:20: * @standard RFC 9562 §5.8 content-uuid (the messaging-uuid)
src/utilities/translation/index.ts:21: * @standard schema.org translationOfWork / workTranslation (collided to one word)
src/utilities/translation/source/index.ts:20: * @standard Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags
src/utilities/types/auth/index.ts:4: * @standard NIST INCITS-359-2012 role-based-access-control
src/utilities/types/events/index.ts:135: * @standard EN-16931:2017 BG-25 invoice-line
src/utilities/types/events/index.ts:632: * @standard IAS-2 §10 absorbed-cost
src/utilities/types/events/index.ts:633: * @standard ISA-95 §B.5 production-order-completion
src/utilities/types/events/index.ts:64: * @standard EN-16931:2017 BG-25 invoice-line
src/utilities/types/events/index.ts:655: * @standard IAS-2 §21 cost-formulas-variances
src/utilities/types/events/index.ts:679: * @standard IFRS-16 §44 §45(c) §46(a) lease-modification
src/utilities/types/events/index.ts:704: * @standard IFRS-15 §126 milestone-billing
src/utilities/types/events/index.ts:724: * @standard IFRS-15 §B14 §B18 cost-to-cost
src/utilities/types/events/index.ts:725: * @standard IFRS-15 §107 §108 contract-asset-contract-liability
src/utilities/types/events/index.ts:7: * @standard ISO-8601-1:2019 date-time event-timestamp
src/utilities/types/parties/index.ts:10: * @standard ISO-8601-1:2019 date-time issue-date due-date
src/utilities/types/parties/index.ts:8: * @standard EN-16931:2017 invoice-and-credit-note
src/utilities/types/parties/index.ts:9: * @standard ISO-4217:2015 currency-codes
src/utilities/types/receivables/index.ts:4: * @standard EN-16931:2017 §BG-7 buyer
src/utilities/types/receivables/index.ts:5: * @standard ISO-4217:2015 currency-codes
src/utilities/types/receivables/index.ts:6: * @standard ISO-8601-1:2019 date-time invoice-date due-date
src/utilities/types/sti/index.ts:15: * @standard ECMA-262 ECMAScript-2024 baseline
src/utilities/un/cefact/5305/index.ts:14: * @standard UN/CEFACT Trade Data Element 5305 duty-tax-fee-category-code
src/utilities/un/cefact/5305/index.ts:15: * @standard EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)
src/utilities/un/edifact/index.ts:4: * @standard UN-EDIFACT D.96A
src/utilities/un/edifact/index.ts:5: * @standard ISO-9735:2002 edifact-syntax-rules
src/utilities/un/edifact/types/index.ts:108: * @standard UN-EDIFACT D.96A BGM beginning-of-message
src/utilities/un/edifact/types/index.ts:10: * @standard ISO-9735:2002 edifact-syntax-rules
src/utilities/un/edifact/types/index.ts:131: * @standard UN-EDIFACT D.96A DTM date-time-period
src/utilities/un/edifact/types/index.ts:146: * @standard UN-EDIFACT D.96A NAD name-and-address
src/utilities/un/edifact/types/index.ts:178: * @standard UN-EDIFACT D.96A LIN line-item
src/utilities/un/edifact/types/index.ts:193: * @standard UN-EDIFACT D.96A IMD item-description
src/utilities/un/edifact/types/index.ts:206: * @standard UN-EDIFACT D.96A QTY quantity
src/utilities/un/edifact/types/index.ts:223: * @standard UN-EDIFACT D.96A PRI price-details
src/utilities/un/edifact/types/index.ts:237: * @standard UN-EDIFACT D.96A MOA monetary-amount
src/utilities/un/edifact/types/index.ts:251: * @standard UN-EDIFACT D.96A TAX tax-duty-fee
src/utilities/un/edifact/types/index.ts:25: * @standard ISO-9735:2002 syntax-identifier
src/utilities/un/edifact/types/index.ts:265: * @standard UN-EDIFACT D.96A invoic-line
src/utilities/un/edifact/types/index.ts:279: * @standard UN-EDIFACT D.96A INVOIC invoice
src/utilities/un/edifact/types/index.ts:297: * @standard UN-EDIFACT D.96A DESADV despatch-advice
src/utilities/un/edifact/types/index.ts:316: * @standard UN-EDIFACT D.96A PAYMUL multiple-payment-order
src/utilities/un/edifact/types/index.ts:32: * @standard UN-EDIFACT message-types
src/utilities/un/edifact/types/index.ts:337: * @standard UN-EDIFACT D.96A interchange
src/utilities/un/edifact/types/index.ts:41: * @standard UN-EDIFACT D.96A UNB interchange-header
src/utilities/un/edifact/types/index.ts:61: * @standard UN-EDIFACT D.96A UNH message-header
src/utilities/un/edifact/types/index.ts:78: * @standard UN-EDIFACT D.96A UNT message-trailer
src/utilities/un/edifact/types/index.ts:91: * @standard UN-EDIFACT D.96A UNZ interchange-trailer
src/utilities/un/edifact/types/index.ts:9: * @standard UN-EDIFACT D.96A invoice-message
src/utilities/un/edifact/validate.ts:5: * @standard UN-EDIFACT D.96A
src/utilities/un/edifact/validate.ts:6: * @standard ISO-9735:2002 edifact-syntax-rules
src/utilities/users/endpoints/externalUsersLogin.ts:21: * @standard OWASP-ASVS V2.2 authentication-throttling
src/utilities/utility/aging-dry-keys.test.ts:15: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/utility/aging-dry-keys.test.ts:16: * @standard ISO-8601-1:2019 date-time
src/utilities/utility/depreciation-methods.test.ts:12: * @standard ISO/IEC-29119:2022 software-testing
src/utilities/utility/depreciation-methods.test.ts:13: * @standard ISO-4217:2015 currency-codes
src/utilities/utility/span/index.ts:5: * @standard ISO 80000-3 — time: the day as a unit of measure
src/utilities/utility/span/index.ts:6: * @standard ISO-8601-1:2019 — date-time days-between arithmetic
src/utilities/utility/span/index.ts:7: * @standard W3C WebVTT — cue timings `HH:MM:SS.mmm`
src/utilities/uuid/format/index.ts:63: * @standard RFC 9562 §5.8 uuidv8 (custom formats)
src/utilities/uuid/format/index.ts:64: * @standard RFC 4122 §4.1.2 variant bits
src/utilities/uuid/format/index.ts:65: * @standard NIST FIPS 180-4 SHA-256 (the truncated digest source)
src/utilities/uuid/format/index.ts:66: * @standard ITU-T X.667 / ISO/IEC 9834-8 (uuid registration)
src/utilities/uuid/format/index.ts:91: * @standard RFC 9562 §5.9 Nil UUID
src/utilities/uuid/handle/index.ts:19: * @standard RFC-9562 uuid · RFC-4648 §5 base64url
src/utilities/uuid/matrix/generated.ts:10: * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + the horo digital-root ring
src/utilities/uuid/matrix/index.ts:50: * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant
src/utilities/uuid/predefined/index.ts:28: * @standard RFC-9562 §5.8 uuid version 8
src/utilities/uuid/share/index.ts:47: * @standard NIST SP 800-162 ABAC
src/utilities/uuid/share/index.ts:48: * @standard ISO/IEC 27001 Annex A.9.2.3 + A.9.4.1
src/utilities/uuid/share/index.ts:49: * @standard eIDAS §3 (sealed grants)
src/utilities/uuid/share/index.ts:50: * @standard GDPR Article 32(1)(b)
src/utilities/uuid/stream/index.ts:24: * @standard RFC-8785 JSON canonicalization (the comparison is order-independent)
src/utilities/xml/escape/index.ts:8: * @standard XML-1.0 §2.4 predefined-entities
tests/e2e/admin-evidence.e2e.spec.ts:25: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/admin-evidence.e2e.spec.ts:26: * @standard ISO/IEC-29119-3:2021 test-documentation
tests/e2e/admin-evidence.e2e.spec.ts:27: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/admin.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/admin.e2e.spec.ts:12: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/adminPayloadUiEmailLabels.ts:10: * @standard ECMA-402 internationalization-api
tests/e2e/adminPayloadUiEmailLabels.ts:7: * @standard ISO/IEC-29119:2022 software-testing test-fixture
tests/e2e/adminPayloadUiEmailLabels.ts:8: * @standard BCP-47 language-tag
tests/e2e/api.e2e.spec.ts:13: * @standard ISO/IEC-29119:2022 software-testing system-test-level
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
tests/e2e/smoke.e2e.spec.ts:5: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/smoke.e2e.spec.ts:6: * @standard W3C WebDriver-BiDi browser-automation
tests/e2e/standards/audit/saf-t-export-flow.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/audit/saf-t-export-flow.e2e.spec.ts:12: * @standard OECD SAF-T 2.0 audit-file
tests/e2e/standards/compliance/gdpr-data-subject-request.e2e.spec.ts:10: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/compliance/sox-404-evidence-trail.e2e.spec.ts:17: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:19: * @standard ISO/IEC-29119:2022 software-testing system-test-level
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:20: * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:21: * @standard Peppol-BIS-3.0 billing
tests/e2e/standards/en-16931/e-invoice-walkthrough.e2e.spec.ts:22: * @standard UN-CEFACT 5305 duty-tax-fee-category-code
tests/e2e/standards/ifrs/ifrs-16-leases.e2e.spec.ts:11: * @standard ISO/IEC-29119:2022 software-testing system-test-level
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
src/app/(api)/api/proof/route.ts:18: * @rfc 9110 http-semantics
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
src/app/(frontend)/[locale]/publications/[slug]/page.tsx:7: * @rfc 9110 http-semantics permanent-redirect
src/app/(frontend)/[locale]/publications/page.tsx:8: * @rfc 9110 http-semantics permanent-redirect
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
src/app/(frontend)/next/share/route.ts:12: * @rfc 9110 §8.3 content-type · RFC 9111 §5.2 cache-control
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
src/blocks/archive/block/config.ts:6: * @rfc 5005 web-feed-paging-and-archiving
src/blocks/archive/block/config.ts:7: * @rfc 3986 uniform-resource-identifier pagination-links
src/blocks/call/to/action/config.ts:6: * @rfc 3986 uniform-resource-identifier
src/blocks/form/Component.tsx:21: * @rfc 5322 internet-message-format email-field-validation
src/blocks/form/config.ts:6: * @rfc 5322 internet-message-format email-field-format
src/blocks/form/refactored-utilities.test.ts:6: * @rfc 3986 uniform-resource-identifier
src/blocks/form/refactored-utilities.test.ts:7: * @rfc 9110 http-semantics
src/blocks/media/block/config.ts:7: * @rfc 6838 mime-type
src/collections/audit-events/index.ts:44: * @rfc 5424 §6.2.1 syslog-severity-levels
src/collections/categories/index.ts:12: * @rfc 3986 uri slug-to-url
src/collections/media/index.ts:16: * @rfc 6838 mime-type media-type
src/collections/pages/index.ts:26: * @rfc 3986 uri slug-to-url
src/collections/posts/index.ts:36: * @rfc 3986 uri slug-to-url
src/collections/transaction-failures/index.ts:13: * @rfc 7807 problem-details-for-http-apis status-code
src/collections/users/index.ts:101: * @rfc 5322 internet-message-format email
src/collections/users/index.ts:102: * @rfc 5321 smtp envelope
src/collections/users/index.ts:103: * @rfc 6532 internationalized-email-addresses
src/components/card/index.tsx:8: * @rfc 3986 uniform-resource-identifier
src/components/ecommerce/plugin/index.ts:11: * @rfc 9110 http-semantics
src/components/ecommerce/plugin/index.ts:12: * @rfc 8615 well-known-uri webhook-discovery
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:11: * @rfc 9110 http-semantics
src/components/ecommerce/stripe/tenantConfirmOrder.ts:15: * @rfc 9110 http-semantics
src/components/ecommerce/stripe/tenantStripeWebhook.ts:7: * @rfc 9110 http-semantics webhook-delivery
src/components/ecommerce/stripe/tenantStripeWebhook.ts:8: * @rfc 8615 well-known-uri webhook-discovery
src/components/link/cms.tsx:6: * @rfc 3986 uniform-resource-identifier
src/components/link/field/index.ts:4: * @rfc 3986 uniform-resource-identifier
src/components/link/group/index.ts:4: * @rfc 3986 uniform-resource-identifier
src/components/live/preview/listener/index.tsx:6: * @rfc 6455 the-websocket-protocol
src/components/live/preview/listener/index.tsx:7: * @rfc 9110 http-semantics
src/components/media/Component.tsx:6: * @rfc 6838 mime-type
src/components/media/products/hooks/beforeChange.ts:10: * @rfc 6838 mime-type media-type
src/components/media/products/hooks/beforeChange.ts:9: * @rfc 3986 uri remote-media-source
src/components/media/products/index.ts:35: * @rfc 3986 uri slug-to-url
src/components/pagination/index.tsx:7: * @rfc 5005 web-feed-paging-and-archiving
src/components/pagination/index.tsx:8: * @rfc 3986 uniform-resource-identifier page-number-query
src/components/payload/redirect/index.tsx:5: * @rfc 9110 §15.4 redirection-3xx
src/components/payload/redirect/index.tsx:6: * @rfc 9110 §15.4.2 301-moved-permanently
src/components/payload/redirect/index.tsx:7: * @rfc 9110 §15.4.3 302-found
src/components/payload/redirect/index.tsx:8: * @rfc 9110 §15.5.5 404-not-found
src/components/payload/redirect/index.tsx:9: * @rfc 3986 uniform-resource-identifier
src/components/payload/sdk/index.ts:6: * @rfc 3986 uri base-url-resolution
src/components/payload/sdk/index.ts:7: * @rfc 9110 http-semantics
src/components/payload/sdk/index.ts:8: * @rfc 6265 http-state-management cookies-credentials-include
src/hooks/collections/cmspage/revalidatePage.ts:8: * @rfc 9110 §13 caching
src/hooks/collections/cmspage/revalidatePage.ts:9: * @rfc 9111 http-caching
src/hooks/collections/posts/revalidatePost.ts:8: * @rfc 9110 §13 caching
src/hooks/collections/posts/revalidatePost.ts:9: * @rfc 9111 http-caching
src/hooks/collections/subscription-plans-subscriptions/encryptSubscriptionData.ts:9: * @rfc 5116 authenticated-encryption-with-associated-data
src/hooks/collections/users/setCookieBasedOnDomain.ts:20: * @rfc 6265 http-state-management cookies
src/hooks/collections/users/setCookieBasedOnDomain.ts:21: * @rfc 6265bis cookie-domain-attribute
src/hooks/collections/users/setCookieBasedOnDomain.ts:22: * @rfc 9110 http-semantics host-header
src/i18n/index.ts:10: * @rfc 8259 json
src/i18n/index.ts:8: * @rfc 5646 tags-for-identifying-languages
src/i18n/index.ts:9: * @rfc 4647 matching-of-language-tags
src/i18n/localization/index.ts:9: * @rfc 5646 tags-for-identifying-languages
src/i18n/request/index.ts:10: * @rfc 9110 http-semantics accept-language-fallback
src/i18n/request/index.ts:8: * @rfc 5646 tags-for-identifying-languages
src/i18n/routing/index.ts:8: * @rfc 3986 uniform-resource-identifier locale-path-segment
src/i18n/routing/index.ts:9: * @rfc 9110 http-semantics
src/seed/content/load/index.ts:17: * @rfc 9110 http-semantics authorization
src/seed/index.ts:7: * @rfc 9110 http-semantics seed-endpoint
src/utilities/allow/public/read/tenant/index.ts:8: * @rfc 9110 §13 caching
src/utilities/bcp/47/language-tag.test.ts:6: * @rfc 5646 tags-for-identifying-languages
src/utilities/bcp/47/language-tag.test.ts:7: * @rfc 4647 matching-of-language-tags
src/utilities/bcp/47/language-tag.ts:18: * @rfc 5646 §2.1 syntax
src/utilities/bcp/47/language-tag.ts:5: * @rfc 5646 tags-for-identifying-languages
src/utilities/bcp/47/language-tag.ts:6: * @rfc 4647 matching-of-language-tags
src/utilities/bcp/47/locale-utils.test.ts:6: * @rfc 5646 tags-for-identifying-languages
src/utilities/bcp/47/locale-utils.test.ts:7: * @rfc 4647 matching-of-language-tags
src/utilities/bcp/47/locale-utils.ts:6: * @rfc 5646 tags-for-identifying-languages
src/utilities/bcp/47/locale-utils.ts:7: * @rfc 4647 matching-of-language-tags
src/utilities/billing/stripeWebhookHandlers.test.ts:6: * @rfc 9110 http-semantics webhook-delivery
src/utilities/billing/stripeWebhookHandlers.test.ts:7: * @rfc 8615 well-known-uri webhook-discovery
src/utilities/billing/stripeWebhookHandlers.ts:15: * @rfc 9110 http-semantics webhook-receiver
src/utilities/billing/stripeWebhookHandlers.ts:16: * @rfc 8259 json payload-encoding
src/utilities/billing/stripeWebhookHandlers.ts:17: * @rfc 2104 hmac signature-verification
src/utilities/billing/stripeWebhookHandlers.ts:37: * @rfc 9110 http-semantics
src/utilities/billing/test.ts:6: * @rfc 9110 http-semantics webhook-delivery
src/utilities/billing/test.ts:7: * @rfc 8615 well-known-uri webhook-discovery
src/utilities/cmspage/hooks/beforeChange.ts:8: * @rfc 3986 uri remote-media-source
src/utilities/country/client/berlin-group-psd2.ts:16: * @rfc 6749 oauth-2.0
src/utilities/country/client/berlin-group-psd2.ts:17: * @rfc 7519 jwt
src/utilities/crypto/index.ts:11: * @rfc 9562 §5.8 uuidv8 content-uuid · §4.1 variant
src/utilities/crypto/index.ts:12: * @rfc 8018 §5.2 PBKDF2
src/utilities/default/lexical/index.ts:6: * @rfc 3986 uniform-resource-identifier link-fields
src/utilities/email/cloudflare/index.ts:15: * @rfc 5321 smtp envelope
src/utilities/email/cloudflare/index.ts:16: * @rfc 5322 internet-message-format
src/utilities/email/cloudflare/index.ts:17: * @rfc 6376 dkim (signed by Cloudflare)
src/utilities/email/inbound/index.ts:14: * @rfc 5322 internet-message-format (Message-ID, In-Reply-To)
src/utilities/email/inbound/index.ts:15: * @rfc 8601 authentication-results
src/utilities/emit/domain/event/index.ts:14: * @rfc 9562 uuid event-id
src/utilities/erpax/api/surface/index.ts:10: * @rfc 3339 date-and-time-on-the-internet
src/utilities/erpax/api/surface/index.ts:9: * @rfc 3986 uri syntax-of-paths
src/utilities/error/codedError.ts:9: * @rfc 7807 problem-details-for-http-apis sister-type
src/utilities/error/errorCodes.ts:7: * @rfc 7807 problem-details-for-http-apis type-fragment
src/utilities/error/errorCodes.ts:8: * @rfc 9110 §15 status-codes
src/utilities/error/httpApiError.ts:4: * @rfc 7807 problem-details-for-http-apis
src/utilities/error/httpApiError.ts:5: * @rfc 9110 §15 status-codes
src/utilities/error/httpApiError.ts:6: * @rfc 8259 json
src/utilities/error/index.ts:10: * @rfc 9110 §10.3 error-responses
src/utilities/error/index.ts:8: * @rfc 7807 problem-details-for-http-apis
src/utilities/error/index.ts:9: * @rfc 9110 §15 status-codes
src/utilities/error/registry.ts:8: * @rfc 7807 problem-details-for-http-apis
src/utilities/error/registry.ts:9: * @rfc 9110 §15 status-codes
src/utilities/event/emitter/service/index.ts:9: * @rfc 9562 uuid event-id
src/utilities/fetch/remote/file/index.ts:10: * @rfc 9110 §15.4 redirection-3xx
src/utilities/fetch/remote/file/index.ts:11: * @rfc 3986 uri filename-extraction
src/utilities/fetch/remote/file/index.ts:12: * @rfc 6838 media-type-registration
src/utilities/fetch/remote/file/index.ts:9: * @rfc 9110 http-semantics
src/utilities/generate/meta/index.ts:8: * @rfc 3986 §5.3 reference-resolution
src/utilities/get/media/url/index.ts:11: * @rfc 3986 §2.1 percent-encoding
src/utilities/get/media/url/index.ts:12: * @rfc 3986 §3.4 query-component
src/utilities/get/preview/secret/index.ts:6: * @rfc 5869 hkdf
src/utilities/get/tenant/from/request/index.ts:5: * @rfc 6265 http-state-management cookies
src/utilities/iso/19011/types/index.ts:147:   * @rfc 9110 §5.6 trace-context-correlation-id
src/utilities/iso/19011/types/index.ts:41: * @rfc 5424 §6.2.1 syslog-severity-levels
src/utilities/iso/19011/types/index.ts:76:   * @rfc 9110 §5.6 trace-context-correlation-id
src/utilities/merge/open/graph/index.ts:6: * @rfc 3986 §5.3 reference-resolution
src/utilities/nist/sp/800/108/derive-secret.test.ts:8: * @rfc 2104 hmac
src/utilities/nist/sp/800/108/derive-secret.test.ts:9: * @rfc 5869 hkdf
src/utilities/nist/sp/800/108/kdf.ts:12: * @rfc 2104 hmac
src/utilities/nist/sp/800/108/kdf.ts:13: * @rfc 5869 hkdf hmac-based-key-derivation
src/utilities/nist/sp/800/38/aes-gcm.test.ts:7: * @rfc 5116 authenticated-encryption-with-associated-data
src/utilities/nist/sp/800/38/aes-gcm.ts:13: * @rfc 5116 authenticated-encryption-with-associated-data
src/utilities/posts/hooks/beforeChange.ts:6: * @rfc 3986 uri remote-media-source
src/utilities/remote/media/import/index.ts:5: * @rfc 3986 uniform-resource-identifier remote-source
src/utilities/remote/media/import/index.ts:6: * @rfc 6838 mime-type media-type
src/utilities/remote/media/import/index.ts:7: * @rfc 9110 http-semantics fetch
src/utilities/rfc/3986/generate-preview-path.test.ts:5: * @rfc 3986 uniform-resource-identifier
src/utilities/rfc/3986/generate-preview-path.ts:4: * @rfc 3986 uniform-resource-identifier preview-path
src/utilities/rfc/3986/get-url.test.ts:5: * @rfc 3986 uniform-resource-identifier
src/utilities/rfc/3986/get-url.test.ts:6: * @rfc 9110 http-semantics host-header forwarded-host
src/utilities/rfc/3986/get-url.test.ts:7: * @rfc 7239 forwarded
src/utilities/rfc/3986/get-url.ts:24: * @rfc 7239 forwarded x-forwarded-host x-forwarded-proto
src/utilities/rfc/3986/get-url.ts:4: * @rfc 3986 uniform-resource-identifier
src/utilities/rfc/3986/get-url.ts:5: * @rfc 9110 http-semantics host-header
src/utilities/rfc/3986/get-url.ts:6: * @rfc 7239 forwarded http-extension
src/utilities/rfc/3986/index.ts:4: * @rfc 3986 uniform-resource-identifier
src/utilities/rfc/3986/url-utils.test.ts:5: * @rfc 3986 uniform-resource-identifier
src/utilities/rfc/3986/url-utils.ts:4: * @rfc 3986 uniform-resource-identifier
src/utilities/rfc/6585/index.ts:4: * @rfc 6585 §4 too-many-requests-429
src/utilities/rfc/6585/rate-limit.test.ts:5: * @rfc 6585 §4 too-many-requests-429
src/utilities/rfc/6585/rate-limit.test.ts:6: * @rfc 9110 §15.5.29 too-many-requests-429
src/utilities/rfc/6585/rate-limit.test.ts:7: * @rfc 9110 §10.2.4 retry-after-header
src/utilities/rfc/6585/rate-limit.ts:10: * @rfc 9110 http-semantics
src/utilities/rfc/6585/rate-limit.ts:42: * @rfc 6585 §4 enforcement
src/utilities/rfc/6585/rate-limit.ts:8: * @rfc 6585 §4 too-many-requests-429
src/utilities/rfc/6585/rate-limit.ts:91: * @rfc 9110 §10.2.4 retry-after-header
src/utilities/rfc/6585/rate-limit.ts:9: * @rfc 9110 §15.5.29 too-many-requests-429 superseding-spec
src/utilities/rfc/9110/cache/index.ts:5: * @rfc 9110 §13 caching
src/utilities/rfc/9110/cache/index.ts:6: * @rfc 9111 http-caching
src/utilities/rfc/9110/cache/index.ts:7: * @rfc 7234 http-1.1-caching obsolete-but-cited
src/utilities/rfc/9110/cache/test.ts:5: * @rfc 9110 §13 caching
src/utilities/rfc/9110/cache/test.ts:6: * @rfc 9111 http-caching
src/utilities/rfc/9110/get/document/index.ts:4: * @rfc 9110 §13 caching
src/utilities/rfc/9110/get/document/index.ts:5: * @rfc 9111 http-caching
src/utilities/rfc/9110/get/document/test.ts:5: * @rfc 9110 §13 caching
src/utilities/rfc/9110/get/globals/index.ts:4: * @rfc 9110 §13 caching
src/utilities/rfc/9110/get/globals/index.ts:5: * @rfc 9111 http-caching
src/utilities/rfc/9110/get/globals/test.ts:5: * @rfc 9110 §13 caching
src/utilities/rfc/9110/get/redirects/index.ts:4: * @rfc 9110 §13 caching
src/utilities/rfc/9110/get/redirects/index.ts:5: * @rfc 9110 §15.4 redirection-3xx
src/utilities/rfc/9110/get/redirects/test.ts:5: * @rfc 9110 §15.4 redirection-3xx
src/utilities/rfc/9110/get/redirects/test.ts:6: * @rfc 9110 §15.4.2 301-moved-permanently
src/utilities/rfc/9110/get/redirects/test.ts:7: * @rfc 9110 §15.4.3 302-found
src/utilities/rfc/9110/index.ts:4: * @rfc 9110 §13 caching
src/utilities/sale/audit-file.ts:20: * @rfc 8259 json
src/utilities/shareds/documentPreviewAdmin.ts:14: * @rfc 3986 uri preview-url-construction
src/utilities/testing/config-discovery-advanced.test.ts:6: * @rfc 8259 json
src/utilities/testing/config-discovery.test.ts:6: * @rfc 8259 json
src/utilities/testing/config/discovery/index.ts:10: * @rfc 8259 json
src/utilities/testing/index.ts:12: * @rfc 8259 json
src/utilities/types/events/index.ts:6: * @rfc 9562 uuid event-id
src/utilities/users/endpoints/externalUsersLogin.ts:17: * @rfc 9110 http-semantics
src/utilities/users/endpoints/externalUsersLogin.ts:18: * @rfc 7519 jwt session-payload
src/utilities/users/endpoints/externalUsersLogin.ts:19: * @rfc 6265 http-state-management cookies
src/utilities/users/endpoints/externalUsersLogin.ts:20: * @rfc 6585 §4 too-many-requests rate-limiting
tests/e2e/admin.e2e.spec.ts:13: * @rfc 6265 cookies session
tests/e2e/admin.e2e.spec.ts:14: * @rfc 7519 jwt session-token
tests/e2e/adminPayloadUiEmailLabels.ts:9: * @rfc 5646 tags-for-identifying-languages
tests/e2e/api.e2e.spec.ts:14: * @rfc 9110 http-semantics status-codes
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
src/access/collections/search/readAccess.ts:14: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/access/collections/shared/adminOrPublishedStatus.ts:15: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/access/collections/shared/createMembershipAdminMutateAccess.ts:22: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/shared/isDocumentOwner.ts:10: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/access/collections/shared/isDocumentOwner.ts:11: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/shared/multiTenantRead.ts:12: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/shared/superAdminOnly.ts:8: * @compliance SOC-2 CC6.3 privileged-access-management
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:10: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:9: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/access/collections/shared/tenantScopedCollectionReadAccess.ts:18: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/access/collections/shared/tenantScopedCollectionReadAccess.ts:19: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/tenants/updateAndDeleteAccess.ts:12: * @compliance GDPR Art.28 processor-controls
src/access/collections/tenants/updateAndDeleteAccess.ts:13: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/users/createAccess.ts:16: * @compliance SOC-2 CC6.2 access-provisioning
src/access/collections/users/readAccess.ts:20: * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
src/access/collections/users/readAccess.ts:21: * @compliance SOC-2 CC6.1 logical-access-controls
src/access/collections/users/updateAndDeleteAccess.ts:15: * @compliance SOC-2 CC6.3 access-removal
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
src/blocks/affect/config.ts:8: * @compliance WCAG-2.1 §2.3.3 animation-from-interactions (honours prefers-reduced-motion)
src/blocks/affect/config.ts:9: * @compliance WCAG-2.1 §1.1.1 non-text-content (the figure carries a text caption)
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
src/collections/account-reconciliations/index.ts:26: * @compliance SOX §404 internal-controls reconciliation-sign-off
src/collections/activities/index.ts:10: * @compliance GDPR Art.5(1)(c) data-minimisation
src/collections/activities/index.ts:11: * @compliance GDPR Art.30 records-of-processing-activities
src/collections/ai-suggestions/index.ts:22: * @compliance GDPR Art.22 automated-individual-decision-making
src/collections/ai-suggestions/index.ts:23: * @compliance GDPR Art.22(3) right-to-human-intervention
src/collections/ai-suggestions/index.ts:24: * @compliance EU AI Act 2024 risk-classification + transparency
src/collections/ai-suggestions/index.ts:25: * @compliance SOX §404 internal-controls ai-assisted-decision TOM-AI-01
src/collections/api-audit-events/index.ts:25: * @compliance SOX §404 internal-controls external-system-traceability
src/collections/api-audit-events/index.ts:26: * @compliance EU 910/2014 eidas signature-evidence
src/collections/audit-committee-minutes/index.ts:4: * @compliance SOX §301 audit-committee-records
src/collections/audit-committees/index.ts:4: * @compliance SOX §301 audit-committee
src/collections/audit-events/index.ts:45: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/collections/audit-events/index.ts:46: * @compliance SOX §302 disclosure-controls
src/collections/audit-events/index.ts:47: * @compliance SOX §404 internal-controls evidence-preservation
src/collections/audit-events/index.ts:48: * @compliance GDPR Art.30 records-of-processing-activities
src/collections/audit-findings/index.ts:9: * @compliance SOX §404 internal-controls deficiency-tracking
src/collections/audit-reports/index.ts:16: * @compliance SOX §404 internal-controls
src/collections/audit-submissions/index.ts:16: * @compliance SOX §404 internal-controls
src/collections/bank-accounts/index.ts:14: * @compliance SOX §404 internal-controls cash-management
src/collections/bank-reconciliations/index.ts:20: * @compliance SOX §404 internal-controls TOM-CSH-01 cash-balance-proof
src/collections/bank-statements/index.ts:23: * @compliance SOX §404 internal-controls reconciliation-evidence
src/collections/bank-transactions/index.ts:46: * @compliance SOX §404 internal-controls bank-reconciliation
src/collections/batches/index.ts:24: * @compliance SOX §404 internal-controls traceability-control TOM-TRACE-01
src/collections/beneficial-owners/index.ts:5: * @compliance EU-AMLD-5 Directive-2018/843 ubo-register
src/collections/beneficial-owners/index.ts:6: * @compliance US-CTA Corporate-Transparency-Act-2021 beneficial-ownership
src/collections/beneficial-owners/index.ts:7: * @compliance FATF-Recommendation-24 transparency-of-legal-persons
src/collections/bills-of-materials/index.ts:23: * @compliance SOX §404 internal-controls bom-engineering-change-control
src/collections/biological-assets/index.ts:22: * @compliance SOX §404 internal-controls TOM-AGRI-01
src/collections/board-actions/index.ts:5: * @compliance SOX §404 governance
src/collections/bookable-resources/index.ts:18: * @compliance SOX §404 internal-controls revenue-completeness
src/collections/bookings/index.ts:22: * @compliance SOX §404 internal-controls revenue-completeness TOM-RES-01
src/collections/bookings/index.ts:23: * @compliance GDPR Art.6(1)(b) lawful-basis-contract guest-data
src/collections/budget-planning/index.ts:29: * @compliance SOX §404 internal-controls budget-approval-workflow
src/collections/business-combinations/index.ts:20: * @compliance SOX §404 internal-controls TOM-MA-01 PPA-process
src/collections/carbon-emissions/index.ts:22: * @compliance EU SFDR PAI 1 ghg-emissions
src/collections/carbon-emissions/index.ts:23: * @compliance EU CBAM Carbon Border Adjustment Mechanism (when applicable)
src/collections/carbon-emissions/index.ts:24: * @compliance EU Taxonomy DNSH climate-mitigation
src/collections/carriers/index.ts:16: * @compliance SOX §404 internal-controls carrier-master TOM-LOG-01
src/collections/closing-entries/index.ts:16: * @compliance SOX §404 period-close-integrity
src/collections/commitments/index.ts:30: * @compliance GDPR Art.6(1)(b) lawful-basis-contract-processing
src/collections/compliance-gaps/index.ts:6: * @compliance SOX §404 deficiency
src/collections/compliance-requirements/index.ts:5: * @compliance SOX §404 control-objective
src/collections/connections/index.ts:26: * @compliance GDPR Art 17 right-to-erasure Art 21 right-to-object (mute/block)
src/collections/consent-records/index.ts:10: * @compliance GDPR Art.7 conditions-for-consent
src/collections/consent-records/index.ts:11: * @compliance GDPR Art.7(3) right-to-withdraw-consent
src/collections/consent-records/index.ts:12: * @compliance ISO-27701:2025 record-of-consent
src/collections/consent-records/index.ts:9: * @compliance GDPR Art.6(1)(a) lawful-basis-consent
src/collections/consignment-arrangements/index.ts:26: * @compliance SOX §404 internal-controls revenue-deferral TOM-AR-04
src/collections/consignment-inventory/index.ts:22: * @compliance SOX §404 internal-controls inventory-segregation TOM-INV-03
src/collections/consignment-sales/index.ts:26: * @compliance SOX §404 internal-controls revenue-completeness TOM-AR-04
src/collections/consolidation-eliminations/index.ts:19: * @compliance SOX §404 internal-controls consolidation-control TOM-CON-01
src/collections/contracts/index.ts:34: * @compliance SOX §404 internal-controls contract-approval
src/collections/contracts/index.ts:35: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/control-tests/index.ts:8: * @compliance SOX §404 internal-controls testing-evidence
src/collections/cost-centers/index.ts:20: * @compliance SOX §302 disclosure-controls segment-disclosure
src/collections/cost-variances/index.ts:15: * @compliance SOX §404 internal-controls variance-disposition TOM-PROD-03
src/collections/credit-memos/index.ts:35: * @compliance SOX §404 internal-controls credit-memo-approval
src/collections/credit-memos/index.ts:36: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe
src/collections/csrd-disclosures/index.ts:23: * @compliance EU SFDR 2019/2088 sustainable-finance
src/collections/csrd-disclosures/index.ts:24: * @compliance EU Taxonomy Regulation 2020/852
src/collections/csrd-disclosures/index.ts:25: * @compliance OECD GRI Standards
src/collections/customs-declarations/index.ts:18: * @compliance EU UCC §6 customs-declaration
src/collections/customs-declarations/index.ts:19: * @compliance OECD BEPS Action 13 transfer-pricing-documentation
src/collections/data-processing-activities/index.ts:10: * @compliance GDPR Art.30(2) records-processor
src/collections/data-processing-activities/index.ts:11: * @compliance GDPR Art.5(1)(e) storage-limitation
src/collections/data-processing-activities/index.ts:12: * @compliance ISO-27701:2025 records-of-processing
src/collections/data-processing-activities/index.ts:9: * @compliance GDPR Art.30(1) records-controller
src/collections/data-subject-requests/index.ts:10: * @compliance GDPR Art.16 right-to-rectification
src/collections/data-subject-requests/index.ts:11: * @compliance GDPR Art.17 right-to-erasure
src/collections/data-subject-requests/index.ts:12: * @compliance GDPR Art.18 right-to-restriction
src/collections/data-subject-requests/index.ts:13: * @compliance GDPR Art.20 right-to-data-portability
src/collections/data-subject-requests/index.ts:14: * @compliance GDPR Art.21 right-to-object
src/collections/data-subject-requests/index.ts:15: * @compliance GDPR Art.12(3) one-month-response-deadline
src/collections/data-subject-requests/index.ts:9: * @compliance GDPR Art.15 right-of-access
src/collections/deferred-tax-items/index.ts:20: * @compliance SOX §404 internal-controls TOM-TAX-02
src/collections/depreciation-schedules/index.ts:14: * @compliance SOX §404 internal-controls
src/collections/earnings-per-share/index.ts:19: * @compliance SOX §404 internal-controls
src/collections/employees/index.ts:20: * @compliance SOX §404 internal-controls payroll-master
src/collections/employees/index.ts:21: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/employees/index.ts:22: * @compliance GDPR Art.9 special-categories-of-personal-data
src/collections/employees/index.ts:23: * @compliance GDPR Art.30 records-of-processing-activities
src/collections/entity-types/index.ts:12: * @compliance SOX §302 entity-type-determination
src/collections/evidence-attestations/index.ts:18: * @compliance SOX §404 internal-controls process-walk-through
src/collections/evidence-attestations/index.ts:19: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/collections/expense-reports/index.ts:13: * @compliance GDPR Art.5 PII receipt-images
src/collections/expense-reports/index.ts:14: * @compliance SOX §404 internal-controls four-eyes
src/collections/fair-value-measurements/index.ts:20: * @compliance SOX §404 internal-controls TOM-FV-01 valuation-process
src/collections/financial-statements/index.ts:26: * @compliance SOX §302 disclosure-controls
src/collections/financial-statements/index.ts:27: * @compliance SOX §404 internal-controls
src/collections/fiscal-periods/index.ts:27: * @compliance SOX §404 period-close-integrity access-control-evidence
src/collections/fiscal-periods/index.ts:28: * @compliance GDPR Art 5(1)(f) audit-trail-integrity
src/collections/fiscal-periods/index.ts:29: * @compliance eIDAS Regulation 910/2014 qualified-electronic-signature on-amendments
src/collections/fixed-assets/index.ts:33: * @compliance SOX §404 internal-controls capital-asset-register
src/collections/fx-transactions/index.ts:20: * @compliance SOX §404 internal-controls fx-control TOM-FX-01
src/collections/gl-accounts/index.ts:15: * @compliance SOX §404 internal-controls
src/collections/gl-postings/index.ts:34: * @compliance SOX §404 internal-controls
src/collections/goods-receipts/index.ts:28: * @compliance SOX §404 internal-controls three-way-match
src/collections/government-grants/index.ts:20: * @compliance EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)
src/collections/government-grants/index.ts:21: * @compliance OECD BEPS Action 13 country-by-country (when grants ≥ threshold)
src/collections/held-for-sale-classifications/index.ts:22: * @compliance SOX §404 internal-controls
src/collections/insurance-contracts/index.ts:22: * @compliance Solvency II / IAIS ICS — actuarial reserving link
src/collections/insurance-contracts/index.ts:23: * @compliance SOX §404 internal-controls TOM-INS-01
src/collections/intercompany-transactions/index.ts:19: * @compliance SOX §404 internal-controls intercompany-control TOM-IC-01
src/collections/intercompany-transactions/index.ts:20: * @compliance OECD BEPS Action 13 transfer-pricing-documentation
src/collections/internal-audit-function/index.ts:6: * @compliance SOX §404 internal-controls
src/collections/internal-controls/index.ts:5: * @compliance SOX §404 internal-controls
src/collections/inventory-movements/index.ts:17: * @compliance SOX §404 internal-controls inventory-cycle-count
src/collections/investment-properties/index.ts:22: * @compliance SOX §404 internal-controls
src/collections/invoices/index.ts:69: * @compliance SOX §404 internal-controls
src/collections/journal-entries/index.ts:32: * @compliance SOX §404 internal-controls
src/collections/kyc-checks/index.ts:6: * @compliance EU-AMLD-6 Directive-2018/1673 anti-money-laundering
src/collections/kyc-checks/index.ts:7: * @compliance USA-PATRIOT-Act §326 customer-identification-program
src/collections/kyc-checks/index.ts:8: * @compliance EU-Regulation-2015/847 wire-transfers
src/collections/leads/index.ts:13: * @compliance GDPR Art.5 data-minimisation
src/collections/leads/index.ts:14: * @compliance GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)
src/collections/lease-modifications/index.ts:26: * @compliance SOX §404 internal-controls liability-completeness
src/collections/lease-period-postings/index.ts:27: * @compliance SOX §404 internal-controls capital-asset-register
src/collections/leases/index.ts:56: * @compliance SOX §404 internal-controls capital-asset-register
src/collections/leave-requests/index.ts:24: * @compliance EU Working Time Directive 2003/88/EC minimum-leave
src/collections/leave-requests/index.ts:25: * @compliance US FMLA family-medical-leave-act
src/collections/leave-requests/index.ts:26: * @compliance BG Labour Code Art.155-176
src/collections/legal-entities/index.ts:33: * @compliance OECD BEPS Action 13 master-file-entity-list
src/collections/legal-entities/index.ts:34: * @compliance EU DAC-6 reportable-cross-border-arrangements
src/collections/lot-work-phases/index.ts:28: * @compliance SOX §404 internal-controls production-control
src/collections/lots/index.ts:30: * @compliance SOX §404 internal-controls production-control
src/collections/maintenance-work-orders/index.ts:22: * @compliance SOX §404 internal-controls capex-vs-opex-classification
src/collections/management-assessment-icfr/index.ts:4: * @compliance SOX §404(a) management-assessment-ICFR
src/collections/media/index.ts:21: * @compliance GDPR Art.5(1)(c) data-minimization no-pii-in-filenames
src/collections/media/index.ts:22: * @compliance GDPR Art.32 security-of-processing
src/collections/messages/index.ts:14: * @compliance GDPR Art 5(1)(e) storage-limitation retention
src/collections/mineral-resource-assets/index.ts:19: * @compliance SOX §404 internal-controls
src/collections/pages/index.ts:31: * @compliance WCAG-2.1 level-AA accessibility
src/collections/parties/index.ts:25: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/parties/index.ts:26: * @compliance GDPR Art.5 data-minimization
src/collections/payment-allocations/index.ts:23: * @compliance SOX §404 internal-controls cash-allocation TOM-AR-02
src/collections/payment-runs/index.ts:30: * @compliance SOX §404 internal-controls preparer-authoriser-segregation
src/collections/payroll-runs/index.ts:28: * @compliance SOX §302 disclosure-controls
src/collections/payroll-runs/index.ts:29: * @compliance SOX §404 internal-controls four-eyes
src/collections/payroll-runs/index.ts:30: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/payroll-runs/index.ts:31: * @compliance GDPR Art.30 records-of-processing-activities
src/collections/performance-obligations/index.ts:30: * @compliance SOX §404 internal-controls revenue-recognition
src/collections/performance-reviews/index.ts:10: * @compliance EU Equal Treatment Directive 2000/78
src/collections/performance-reviews/index.ts:9: * @compliance GDPR Art.5 PII processing
src/collections/period-end-adjustments/index.ts:21: * @compliance SOX §404 internal-controls
src/collections/period-locks/index.ts:12:  * @compliance SOX §404 period-close-integrity
src/collections/post-close-analytics-reports/index.ts:14: * @compliance SOX §404 close-monitoring
src/collections/posts/index.ts:42: * @compliance WCAG-2.1 level-AA accessibility
src/collections/prior-period-adjustments/index.ts:17: * @compliance SOX §404 internal-controls restatement-control TOM-PPA-01
src/collections/prior-period-adjustments/index.ts:18: * @compliance SOX §906 ceo-cfo-certification material-misstatement
src/collections/production-receipts/index.ts:17: * @compliance SOX §404 internal-controls production-control TOM-PROD-02
src/collections/projects/index.ts:27: * @compliance SOX §404 internal-controls
src/collections/properties/index.ts:23: * @compliance SOX §404 internal-controls real-estate-portfolio
src/collections/provisions/index.ts:35: * @compliance SOX §404 internal-controls liability-completeness
src/collections/quality-inspections/index.ts:15: * @compliance SOX §404 internal-controls quality-control TOM-QC-01
src/collections/quality-inspections/index.ts:16: * @compliance ISO 9001:2015 §8.7 quality-management-system
src/collections/recruiting-pipeline/index.ts:10: * @compliance GDPR Art.6(1)(b) recruitment-lawful-basis
src/collections/recruiting-pipeline/index.ts:11: * @compliance GDPR Art.5(1)(e) storage-limitation
src/collections/recruiting-pipeline/index.ts:12: * @compliance EU Equal Treatment Directive 2000/78
src/collections/recruiting-pipeline/index.ts:13: * @compliance ADA / EEOC US-equal-opportunity
src/collections/recurring-journals/index.ts:22: * @compliance SOX §404 internal-controls automated-controls
src/collections/regulatory-deferral-accounts/index.ts:16: * @compliance SOX §404 internal-controls
src/collections/regulatory-reports/index.ts:6: * @compliance local-regulatory-filing
src/collections/returns/index.ts:10: * @compliance SOX §404 internal-controls return-approval
src/collections/roles/index.ts:15: * @compliance SOC-2 CC6.1 logical-access-controls
src/collections/roles/index.ts:16: * @compliance SOX §404 internal-controls
src/collections/rounding-adjustments/index.ts:16: * @compliance SOX §404 internal-controls rounding-control TOM-RND-01
src/collections/sales-commissions/index.ts:17: * @compliance SOX §404 internal-controls commission-completeness
src/collections/sales/index.ts:32: * @compliance SOX §404 internal-controls
src/collections/share-based-payments/index.ts:18: * @compliance SOX §404 internal-controls TOM-EQU-01
src/collections/shares/index.ts:33: * @compliance GDPR Article 32(1)(b) ongoing-confidentiality
src/collections/shares/index.ts:34: * @compliance SOX §404 access-controls audit-evidenced-via-chain
src/collections/shipments/index.ts:8: * @compliance SOX §404 internal-controls dispatch-controls
src/collections/spaces/index.ts:15: * @compliance SOX §404 internal-controls space-allocation
src/collections/subscription-plans/index.ts:12: * @compliance SOX §404 internal-controls
src/collections/subscriptions/index.ts:18: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/subscriptions/index.ts:19: * @compliance SOX §404 internal-controls
src/collections/taggings/index.ts:33: * @compliance SOX §404 internal-controls
src/collections/tags/index.ts:24: * @compliance SOX §404 internal-controls
src/collections/tax-calculations/index.ts:22: * @compliance SOX §404 internal-controls tax-position
src/collections/tax-returns/index.ts:10: * @compliance SOX §404 internal-controls tax-position
src/collections/tenants/index.ts:29: * @compliance GDPR Art.4(7) data-controller
src/collections/tenants/index.ts:30: * @compliance GDPR Art.30 records-of-processing-activities
src/collections/tenants/index.ts:33: * @compliance SOC-2 CC6.1 logical-access-controls
src/collections/time-entries/index.ts:14: * @compliance SOX §404 internal-controls payroll-evidence
src/collections/time-entries/index.ts:15: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/tracking-events/index.ts:17: * @compliance SOX §404 internal-controls delivery-evidence TOM-LOG-02
src/collections/transaction-failures/index.ts:15: * @compliance SOX §404 internal-controls failure-disposition TOM-FAIL-01
src/collections/transaction-failures/index.ts:16: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/collections/transaction-failures/index.ts:17: * @compliance SOC-2 CC7.3 system-incident-response
src/collections/transfer-pricing-adjustments/index.ts:14: * @compliance OECD BEPS Action-13 country-by-country
src/collections/transfer-pricing-files/index.ts:17: * @compliance OECD BEPS Action 13 transfer-pricing-documentation
src/collections/transfer-pricing-files/index.ts:18: * @compliance OECD TPG 2022 transfer-pricing-guidelines
src/collections/transfer-pricing-files/index.ts:19: * @compliance EU DAC-4 country-by-country-reporting
src/collections/transfer-pricing-files/index.ts:20: * @compliance EU 2016/881 administrative-cooperation-tax
src/collections/transfer-pricing-files/index.ts:21: * @compliance OECD Pillar Two GloBE (15% global minimum tax)
src/collections/usage-records/index.ts:21: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/collections/usage-records/index.ts:22: * @compliance SOC-2 CC7.4 system-monitoring-and-detection
src/collections/users/index.ts:108: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/collections/users/index.ts:109: * @compliance GDPR Art.32 security-of-processing
src/collections/users/index.ts:110: * @compliance SOC-2 CC6.1 logical-access-controls
src/collections/users/index.ts:381:     * @compliance GDPR Art.12 transparent-information user-language-of-choice
src/collections/warehouse-locations/index.ts:16: * @compliance SOX §404 internal-controls inventory-segregation
src/collections/wip-snapshots/index.ts:21: * @compliance SOX §404 internal-controls revenue-recognition
src/collections/work-centers/index.ts:18: * @compliance SOX §404 internal-controls production-control
src/collections/work-orders/index.ts:71: * @compliance SOX §404 internal-controls production-control TOM-PROD-01
src/collections/work-phases/index.ts:26: * @compliance SOX §404 internal-controls production-control
src/collections/work-shifts/index.ts:39: * @compliance SOX §404 internal-controls payroll-and-production-control
src/collections/workflow-definitions/index.ts:17: * @compliance SOX §404 internal-controls multi-step-approval
src/collections/workflow-definitions/index.ts:18: * @compliance ISO-27002 §5.3 segregation-of-duties
src/collections/workflow-instances/index.ts:16: * @compliance SOX §404 internal-controls workflow-execution
src/components/admin/bar/index.tsx:8: * @compliance WCAG-2.1 §2.4.1 bypass-blocks
src/components/before/dashboard/index.tsx:7: * @compliance WCAG-2.1 §1.4.3 contrast-minimum
src/components/before/login/index.tsx:8: * @compliance WCAG-2.1 §3.3.1 error-identification
src/components/card/index.tsx:10: * @compliance WCAG-2.1 §2.5.5 target-size
src/components/card/index.tsx:9: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/components/collection/archive/index.tsx:7: * @compliance WCAG-2.1 §2.4.1 bypass-blocks
src/components/ecommerce/orders/index.ts:71: * @compliance EU-VAT-Directive 2006/112/EC supply-of-goods-or-services
src/components/ecommerce/plugin/index.ts:13: * @compliance PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data tokenized
src/components/ecommerce/plugin/index.ts:14: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
src/components/ecommerce/plugin/index.ts:15: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/components/ecommerce/plugin/index.ts:16: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/components/ecommerce/plugin/index.ts:21: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/components/ecommerce/plugin/index.ts:22: * @compliance SOC-2 CC6.1 logical-access-controls
src/components/ecommerce/stripe/payment/index.ts:10: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/components/ecommerce/stripe/payment/index.ts:8: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/components/ecommerce/stripe/payment/index.ts:9: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:5: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:6: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:7: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/components/ecommerce/stripe/tenantConfirmOrder.ts:5: * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
src/components/ecommerce/stripe/tenantConfirmOrder.ts:6: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/components/ecommerce/stripe/tenantConfirmOrder.ts:7: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/components/ecommerce/stripe/tenantStripeWebhook.ts:5: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography signature-verification
src/components/ecommerce/stripe/tenantStripeWebhook.ts:6: * @compliance PSD2 EU-2015/2366 strong-customer-authentication
src/components/ecommerce/transactions/index.ts:29: * @compliance PSD2 EU-2015/2366 payment-transaction
src/components/ecommerce/transactions/index.ts:30: * @compliance SOX §404 internal-controls cash-application
src/components/link/cms.tsx:8: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/components/link/cms.tsx:9: * @compliance WCAG-2.1 §2.4.9 link-purpose-link-only
src/components/link/field/index.ts:8: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/components/link/group/index.ts:6: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/components/media/Component.tsx:9: * @compliance WCAG-2.1 §1.1.1 non-text-content alt-text
src/components/media/products/index.ts:36: * @compliance WCAG-2.1 level-AA accessibility
src/components/page/range/index.tsx:8: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/components/pagination/index.tsx:9: * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
src/components/provider/index.tsx:4: * @compliance WCAG-2.1 §1.4.3 contrast-minimum
src/components/provider/index.tsx:5: * @compliance WCAG-2.1 §1.4.11 non-text-contrast
src/components/rich/text/index.tsx:7: * @compliance WCAG-2.1 §1.3.1 info-and-relationships
src/components/rich/text/index.tsx:8: * @compliance WCAG-2.1 §1.4.10 reflow
src/components/vocabulary/marketing/CountryShowcase.tsx:11: * @compliance WCAG-2.1 §1.3.1 info-and-relationships table-semantics
src/components/vocabulary/marketing/PricingTable.tsx:14: * @compliance WCAG-2.1 level-AA pricing-table-accessibility
src/globals/header/config.ts:7: * @compliance WCAG-2.1 §2.4.1 bypass-blocks skip-link
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:38: * @compliance SOX §404 internal-controls
src/hooks/collections/invoices/billAccountingHook.ts:21: * @compliance SOX §404 internal-controls
src/hooks/collections/invoices/invoiceAccountingHook.ts:25: * @compliance SOX §404 internal-controls
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.ts:34: * @compliance SOX §404 internal-controls
src/hooks/collections/posts/populateAuthors.ts:14: * @compliance GDPR Art.5(1)(c) data-minimization
src/hooks/collections/posts/populateAuthors.ts:15: * @compliance GDPR Art.32 security-of-processing
src/hooks/collections/roles/validateRoleDefinition.ts:12: * @compliance SOX §404 internal-controls
src/hooks/collections/sale/enforceSaleImmutability.ts:15: * @compliance SOX §404 internal-controls
src/hooks/collections/shared/auditTrailAfterChange.ts:23: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/hooks/collections/shared/auditTrailAfterChange.ts:24: * @compliance SOX §404 internal-controls evidence-preservation
src/hooks/collections/shared/autoPopulateCreatedBy.ts:8: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/hooks/collections/shared/autoPopulateCreatedBy.ts:9: * @compliance SOX §404 internal-controls
src/hooks/collections/shared/autoSetTimestamp.ts:9: * @compliance SOX §404 internal-controls verifiable-event-time
src/hooks/collections/shared/bankStatementImportedHook.ts:28: * @compliance SOX §404 internal-controls cash-management
src/hooks/collections/shared/depreciationSchedulePostingHook.ts:25: * @compliance SOX §404 internal-controls capital-asset-register
src/hooks/collections/shared/enforceSegregationOfDuties.ts:10: * @compliance SOX §404 internal-controls four-eyes-principle
src/hooks/collections/shared/enforceSegregationOfDuties.ts:11: * @compliance SOC-2 CC6.3 logical-access-controls
src/hooks/collections/shared/inventoryMovementPostingHook.ts:22: * @compliance SOX §404 internal-controls cycle-count
src/hooks/collections/shared/payrollDisbursementHook.ts:33: * @compliance SOX §404 internal-controls
src/hooks/collections/shared/payrollRunPostingHook.ts:48: * @compliance SOX §302 disclosure-controls
src/hooks/collections/shared/payrollRunPostingHook.ts:49: * @compliance SOX §404 internal-controls four-eyes
src/hooks/collections/shared/periodEndAdjustmentPostingHook.test.ts:15: * @compliance SOX §404 internal-controls four-eyes
src/hooks/collections/shared/periodEndAdjustmentPostingHook.ts:33: * @compliance SOX §404 internal-controls four-eyes
src/hooks/collections/shared/validateBalancedEntry.ts:27: * @compliance SOX §404 internal-controls
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:30: * @compliance SOX §404 internal-controls revenue-recognition
src/hooks/collections/subscription-plans-subscriptions/encryptSubscriptionData.ts:10: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/hooks/collections/users/emitOrderLifecycleEvents.ts:27: * @compliance SOX §404 internal-controls quote-to-cash
src/hooks/collections/users/setCookieBasedOnDomain.ts:25: * @compliance SOC-2 CC6.1 logical-access-controls
src/hooks/collections/users/validateAddressHook.ts:26: * @compliance GDPR Art.5(1)(c) data-minimisation
src/hooks/collections/utility/periodLock.ts:8: * @compliance SOX §404 period-close-integrity
src/jobs/bnb/rates/sync/index.ts:22: * @compliance SOX §404 internal-controls fx-revaluation-evidence
src/jobs/dunning/job/index.ts:18: * @compliance SOX §404 internal-controls
src/jobs/dunning/job/index.ts:19: * @compliance GDPR Art.6(1)(b) lawful-basis-contract
src/seed/erpax-product-pages.ts:34: * @compliance WCAG-2.1 level-AA accessible-marketing-pages
src/seed/etrima/index.ts:19: * @compliance GDPR Art.5(1)(c) data-minimisation — an employee is exported as number, name and hire date only
src/utilities/accounting/debit/index.ts:15: * @compliance SOX §404 internal-controls
src/utilities/accounting/reports/index.ts:27: * @compliance SOX §302 disclosure-controls
src/utilities/address/validation/index.ts:19: * @compliance GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires
src/utilities/ai/durable-objects.ts:22: * @compliance SOX §404 internal-controls atomic-state
src/utilities/allow/public/read/tenant/index.ts:9: * @compliance GDPR Art.5(1)(c) data-minimization
src/utilities/authenticated/index.ts:7: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/billing/stripeWebhookHandlers.test.ts:11: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data tokenized
src/utilities/billing/stripeWebhookHandlers.ts:23: * @compliance SOC-2 CC7.2 system-monitoring-event-logging
src/utilities/billing/stripeWebhookHandlers.ts:445: * @compliance SOX §404 internal-controls refund-control
src/utilities/billing/test.ts:11: * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data tokenized
src/utilities/business/chain/run.ts:12: * @compliance SOX §404 internal-controls process-evidence
src/utilities/business/chain/types.ts:22: * @compliance SOX §404 internal-controls process-evidence
src/utilities/chain/event/emitter/index.ts:15: * @compliance SOX §404 internal-controls process-evidence
src/utilities/cmspage/access/superAdminOrTenantAdmin.ts:9: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/config/address/formats/index.ts:28: * @compliance GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires
src/utilities/config/app/collections/index.ts:17: * @compliance SOX §404 internal-controls config-as-code
src/utilities/config/country/specifics/index.ts:20: * @compliance EU 2014/55 b2g-e-invoicing
src/utilities/country/api/client/index.ts:660: * @compliance EU 2006/112/EC vat-system-directive Art.214
src/utilities/country/api/client/index.ts:692: * @compliance AMLD-5 ubo-screening
src/utilities/country/api/client/index.ts:693: * @compliance EU 2580/2001 cfsp-restrictive-measures
src/utilities/country/api/client/index.ts:725: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/utilities/country/api/index.ts:26: * @compliance EU 2014/55 b2g-e-invoicing portals
src/utilities/country/api/index.ts:27: * @compliance AMLD-5 ubo-registry-access
src/utilities/country/client/berlin-group-psd2.ts:21: * @compliance EU 2015/2366 strong-customer-authentication
src/utilities/country/client/berlin-group-psd2.ts:222: * @compliance EU 2015/2366 §97 strong-customer-authentication
src/utilities/country/client/bg-bank-statement-pdf.ts:35: * @compliance SOX §404 internal-controls fx-revaluation-evidence
src/utilities/country/client/bg-holidays.ts:20: * @compliance Кодекс на труда чл.154 official-holidays
src/utilities/country/client/bg-hybrid-invoice.ts:20: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/utilities/country/client/bg-nap-mtls.ts:123: * @compliance EU 2014/55 b2g-e-invoicing-mandate
src/utilities/country/client/bg-nap-mtls.ts:18: * @compliance EU 910/2014 eidas qualified-electronic-seal
src/utilities/country/client/bg-nap-mtls.ts:19: * @compliance SOX §404 internal-controls process-walk-through
src/utilities/country/client/bg-pades-signer.ts:26: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/utilities/country/client/bg-pades-signer.ts:95: * @compliance EU 910/2014 eidas Art.28 qualified-seal evidence
src/utilities/country/client/bg-vat.ts:18: * @compliance EU 2006/112/EC vat-system-directive
src/utilities/country/client/sign-cms-node.ts:23: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/utilities/country/context/index.ts:30: * @compliance EU 2014/55 b2g-e-invoicing-mandate-resolution
src/utilities/default/lexical/index.ts:8: * @compliance WCAG-2.1 level-AA accessibility
src/utilities/depreciation/service/index.ts:29: * @compliance SOX §404 internal-controls capital-asset-register
src/utilities/emit/domain/event/index.ts:17: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/utilities/emit/domain/event/index.ts:18: * @compliance SOX §404 internal-controls
src/utilities/error/index.ts:13: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/utilities/error/registry.ts:12: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/utilities/etsi/en/319/142/index.ts:6: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/utilities/etsi/en/319/142/profile.ts:24: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/utilities/etsi/en/319/142/signature-dictionary.test.ts:9: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/utilities/etsi/en/319/142/signature-dictionary.ts:24: * @compliance EU 910/2014 eidas qualified-electronic-signature
src/utilities/eu/ai/act/index.ts:14: * @compliance GDPR Art.22 automated-individual-decision-making
src/utilities/event/emitter/service/index.ts:11: * @compliance SOC-2 CC7.2 system-monitoring
src/utilities/event/emitter/service/index.ts:12: * @compliance SOX §404 internal-controls
src/utilities/factory/recompute-parent-aggregates.ts:28: * @compliance SOX §404 internal-controls total-completeness
src/utilities/get/user/tenant/i/ds/index.ts:8: * @compliance SOX §404 internal-controls
src/utilities/gl/account/resolver/index.ts:28: * @compliance SOX §404 internal-controls per-tenant-coa
src/utilities/governed/index.ts:29: * @compliance SOX §302 corporate-responsibility
src/utilities/governed/index.ts:30: * @compliance SOX §906 criminal-certification
src/utilities/integrity/content/index.ts:47: * @compliance SOX §404 internal-controls (Byzantine tamper detection)
src/utilities/integrity/tamper-proof-uuid-field.ts:38: * @compliance SOX §404 (Byzantine tamper detection at the row level)
src/utilities/integrity/uuid-ref.ts:29: * @compliance SOX §404 (referential integrity without cascade rules)
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:19: * @compliance SOX §404 internal-controls
src/utilities/iso/14289/profile/index.ts:25: * @compliance EU 2014/55 b2g-procurement-accessibility
src/utilities/iso/14289/profile/index.ts:26: * @compliance EU 2019/882 european-accessibility-act
src/utilities/iso/19005/profile/index.ts:22: * @compliance EU 2014/55 b2g-e-invoicing-archival
src/utilities/iso/19011/types/index.ts:12: * @compliance SOX §404 internal-controls evidence-preservation
src/utilities/iso/19011/types/index.ts:13: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/utilities/iso/19011/types/index.ts:14: * @compliance GDPR Art.30 records-of-processing-activities
src/utilities/iso/27002/coverage.ts:13: * @compliance SOC-2 trust-services-criteria
src/utilities/iso/27002/types/index.ts:12: * @compliance SOC-2 trust-services-criteria
src/utilities/journal/entry/service/index.ts:18: * @compliance SOX §404 internal-controls
src/utilities/nist/incits/359/index.ts:14: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/nist/incits/359/index.ts:15: * @compliance SOC-2 CC6.3 access-removal
src/utilities/nist/incits/359/index.ts:16: * @compliance SOX §404 internal-controls
src/utilities/nist/sp/800/108/kdf.ts:17: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/utilities/nist/sp/800/38/aes-gcm.test.ts:10: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/utilities/nist/sp/800/38/aes-gcm.test.ts:11: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/utilities/nist/sp/800/38/aes-gcm.ts:16: * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
src/utilities/nist/sp/800/38/aes-gcm.ts:17: * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
src/utilities/notification/index.ts:20: * @compliance GDPR Art.7 transactional-email-consent
src/utilities/notification/subscriber.ts:15: * @compliance GDPR Art.7 transactional-consent
src/utilities/party/workflow.service.ts:9: * @compliance SOX §404 internal-controls
src/utilities/persist/api/audit/event/index.ts:18: * @compliance SOX §404 internal-controls external-system-traceability
src/utilities/receivable/allowance/index.ts:11: * @compliance SOX §404 internal-controls
src/utilities/receivable/workflow/index.ts:13: * @compliance SOX §404 internal-controls
src/utilities/remote/media/import/index.ts:10: * @compliance GDPR Art.5(1)(c) data-minimization
src/utilities/rfc/6585/rate-limit.ts:16: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/saf/t/types/index.ts:19: * @compliance SOX §404 internal-controls
src/utilities/scope/index.ts:9: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/shareds/versionedDrafts.ts:10: * @compliance SOX §404 internal-controls record-retention
src/utilities/shareds/versionedDrafts.ts:11: * @compliance GDPR Art.5(1)(e) storage-limitation maxPerDoc-cap
src/utilities/standard/collection/hook/index.ts:14: * @compliance SOX §404 internal-controls provenance
src/utilities/subscription/gate/index.ts:14: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/subscription/gate/index.ts:231: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/subscription/gate/test.ts:10: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/tenant/context/index.ts:44: * @compliance GDPR Art.12 transparent-information user-language-of-choice
src/utilities/tenant/remote/secret/index.ts:10: * @compliance PCI-DSS-4.0 §3.2 tokenized-payment-method
src/utilities/tenant/remote/secret/index.ts:11: * @compliance GDPR Art.32 security-of-processing
src/utilities/trading/api/index.ts:43: * @compliance PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2)
src/utilities/trading/api/index.ts:44: * @compliance EN-16931 + Peppol-BIS-3 e-invoicing access-points
src/utilities/types/events/index.ts:10: * @compliance SOX §404 internal-controls
src/utilities/types/events/index.ts:270: * @compliance SOX §404 internal-controls cycle-count
src/utilities/types/events/index.ts:411: * @compliance SOX §404 internal-controls
src/utilities/types/events/index.ts:499: * @compliance SOX §404 internal-controls quote-to-cash
src/utilities/types/events/index.ts:9: * @compliance SOC-2 CC4.1 monitoring-and-evaluation
src/utilities/users/endpoints/externalUsersLogin.ts:25: * @compliance GDPR Art.32 security-of-processing
src/utilities/users/endpoints/externalUsersLogin.ts:26: * @compliance SOC-2 CC6.1 logical-access-controls
src/utilities/utility/depreciation-methods.test.ts:17: * @compliance SOX §404 internal-controls capital-asset-register
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
src/app/(api)/api/subscriptions/create/route.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/app/(api)/api/subscriptions/create/route.ts:7: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/app/(api)/api/subscriptions/create/route.ts:8: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/collections/account-reconciliations/index.ts:23: * @accounting IFRS IAS-7 statement-of-cash-flows bank-reconciliation
src/collections/bank-accounts/index.ts:12: * @accounting IFRS IAS-7 statement-of-cash-flows cash-and-equivalents
src/collections/bank-reconciliations/index.ts:17: * @accounting IFRS IAS-7 §6 §44 cash-flow-reconciliation
src/collections/bank-reconciliations/index.ts:18: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/collections/bank-statements/index.ts:21: * @accounting IFRS IAS-7 statement-of-cash-flows
src/collections/bank-transactions/index.ts:43: * @accounting IFRS IAS-7 statement-of-cash-flows
src/collections/bank-transactions/index.ts:44: * @accounting US-GAAP ASC-230 cash-flows
src/collections/batches/index.ts:22: * @accounting IFRS IAS-2 §23-§27 cost-formula-specific-identification
src/collections/bills-of-materials/index.ts:19: * @accounting IFRS IAS-2 §10 §13 cost-of-conversion
src/collections/bills-of-materials/index.ts:20: * @accounting IFRS IAS-2 §13 systematic-allocation-of-fixed-overheads
src/collections/bills-of-materials/index.ts:21: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/collections/bookings/index.ts:17: * @accounting IFRS IFRS-15 §35 over-time-recognition (multi-night stay)
src/collections/bookings/index.ts:18: * @accounting IFRS IFRS-15 §38 point-in-time-recognition (single-use)
src/collections/bookings/index.ts:19: * @accounting IFRS IFRS-15 §B20-B27 right-of-return cancellation-policy
src/collections/bookings/index.ts:20: * @accounting US-GAAP ASC-606-10-25-27 over-time-criteria
src/collections/budget-planning/index.ts:25: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/budget-planning/index.ts:26: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/collections/budget-planning/index.ts:27: * @accounting US-GAAP ASC-270 interim-reporting
src/collections/carbon-emissions/index.ts:20: * @accounting IFRS S2 §29-32 climate-related-metrics
src/collections/closing-entries/index.ts:14:  * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/closing-entries/index.ts:15: * @accounting US-GAAP ASC-205 presentation
src/collections/consignment-arrangements/index.ts:20: * @accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
src/collections/consignment-arrangements/index.ts:21: * @accounting IFRS IFRS-15 §38 point-in-time-control-transfer
src/collections/consignment-arrangements/index.ts:22: * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
src/collections/consignment-arrangements/index.ts:23: * @accounting US-GAAP ASC-606-10-55-80 consignment-control
src/collections/consignment-arrangements/index.ts:24: * @accounting IFRS IAS-2 §6 inventory-held-at-other-location
src/collections/consignment-inventory/index.ts:17: * @accounting IFRS IAS-2 §6 inventories-held-at-other-location
src/collections/consignment-inventory/index.ts:18: * @accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
src/collections/consignment-inventory/index.ts:19: * @accounting US-GAAP ASC-330 inventory-location-tracked
src/collections/consignment-inventory/index.ts:20: * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
src/collections/consignment-sales/index.ts:19: * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
src/collections/consignment-sales/index.ts:20: * @accounting IFRS IFRS-15 §38 point-in-time-control-transfer
src/collections/consignment-sales/index.ts:21: * @accounting IFRS IFRS-15 §B77-B78 consignment-control
src/collections/consignment-sales/index.ts:22: * @accounting IFRS IAS-2 §34 cost-of-inventories-recognised-as-expense
src/collections/consignment-sales/index.ts:23: * @accounting US-GAAP ASC-606-10-25-30 control-passing
src/collections/consignment-sales/index.ts:24: * @accounting US-GAAP ASC-606-10-55-79 consignment-indicators
src/collections/consolidation-eliminations/index.ts:14: * @accounting IFRS IFRS-10 §B86 consolidated-financial-statements
src/collections/consolidation-eliminations/index.ts:15: * @accounting IFRS IAS-21 §39 foreign-currency-translation-on-consolidation
src/collections/consolidation-eliminations/index.ts:16: * @accounting US-GAAP ASC-810-10-45 consolidation-elimination
src/collections/consolidation-eliminations/index.ts:17: * @accounting US-GAAP ASC-830-30 foreign-currency-translation
src/collections/consolidations/index.ts:13:  * @accounting IFRS-10 consolidated-financial-statements
src/collections/consolidations/index.ts:14: * @accounting IAS-27 separate-financial-statements
src/collections/consolidations/index.ts:15: * @accounting US-GAAP ASC-810 consolidation
src/collections/cost-centers/index.ts:16: * @accounting IFRS IAS-1 §99 statement-of-comprehensive-income
src/collections/cost-centers/index.ts:17: * @accounting IFRS IFRS-8 operating-segments
src/collections/cost-centers/index.ts:18: * @accounting US-GAAP ASC-280 segment-reporting
src/collections/cost-variances/index.ts:12: * @accounting IFRS IAS-2 §21 standard-cost-method
src/collections/cost-variances/index.ts:13: * @accounting US-GAAP ASC-330-10-30 standard-cost-variance-recognition
src/collections/credit-memos/index.ts:31: * @accounting IFRS IFRS-15 §B22 refund-liability
src/collections/credit-memos/index.ts:32: * @accounting IFRS IFRS-15 §B47 contract-cancellation
src/collections/credit-memos/index.ts:33: * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
src/collections/csrd-disclosures/index.ts:20: * @accounting IFRS S1 general-sustainability-disclosure
src/collections/csrd-disclosures/index.ts:21: * @accounting IFRS S2 climate-disclosures
src/collections/currency-rates/index.ts:16: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/collections/currency-rates/index.ts:17: * @accounting US-GAAP ASC-830 foreign-currency-matters
src/collections/customer-segments/index.ts:10: * @accounting IFRS IFRS-15 §4 portfolio-practical-expedient
src/collections/customer-segments/index.ts:11: * @accounting IFRS IFRS-8 §22 disclosure-of-segment-information
src/collections/debt-schedule/index.ts:4: * @accounting IFRS-9 financial-instruments
src/collections/debt-schedule/index.ts:5: * @accounting IAS-1 current-non-current-classification
src/collections/debt-schedule/index.ts:6: * @accounting US-GAAP ASC-470 debt
src/collections/depreciation-schedules/index.ts:10: * @accounting IFRS IAS-16 property-plant-and-equipment depreciation
src/collections/depreciation-schedules/index.ts:11: * @accounting IFRS IAS-36 impairment-of-assets
src/collections/depreciation-schedules/index.ts:12: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/collections/disclosure-checklists/index.ts:4: * @accounting IFRS IAS-1 disclosure-requirements
src/collections/employees/index.ts:16: * @accounting IFRS IAS-19 employee-benefits
src/collections/employees/index.ts:17: * @accounting US-GAAP ASC-710 compensation-general
src/collections/employees/index.ts:18: * @accounting US-GAAP ASC-715 compensation-retirement-benefits
src/collections/entity-legal-structures/index.ts:4: * @accounting IFRS-10 §B86 reporting-entity
src/collections/expense-reports/index.ts:11: * @accounting IFRS IAS-19 employee-benefits
src/collections/expense-reports/index.ts:12: * @accounting IFRS IAS-21 §28 fx-on-reimbursement
src/collections/financial-statements/index.ts:20: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/financial-statements/index.ts:21: * @accounting IFRS IAS-34 §8 §10 interim-financial-reporting (when statementType ∈ Q1/Q2/Q3 the §10 condensed format applies)
src/collections/financial-statements/index.ts:22: * @accounting IFRS IFRS-18 §9 §10 §40 presentation-and-disclosure (effective 2027-01 — replaces IAS-1 with structured operating/investing/financing categories)
src/collections/financial-statements/index.ts:23: * @accounting IFRS IFRS-7 §31-§42 financial-instruments-disclosures (statement notes consume IFRS-7 risk-management disclosures)
src/collections/financial-statements/index.ts:24: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/collections/financial-statements/index.ts:25: * @accounting US-GAAP ASC-270 interim-reporting
src/collections/fiscal-periods/index.ts:25: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/fiscal-periods/index.ts:26: * @accounting US-GAAP ASC-210 balance-sheet
src/collections/fixed-assets/index.ts:29: * @accounting IFRS IAS-16 property-plant-and-equipment
src/collections/fixed-assets/index.ts:30: * @accounting IFRS IAS-36 impairment-of-assets
src/collections/fixed-assets/index.ts:31: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/collections/fx-transactions/index.ts:13: * @accounting IFRS IAS-21 §21 §23 §28 §29 effects-of-changes-in-foreign-exchange-rates
src/collections/fx-transactions/index.ts:14: * @accounting IFRS IAS-21 §39 foreign-currency-translation
src/collections/fx-transactions/index.ts:15: * @accounting IFRS IAS-32 §11 financial-instruments-presentation (every FX-revaluation row meets the IAS-32 financial-instrument definition)
src/collections/fx-transactions/index.ts:16: * @accounting IFRS IFRS-7 §22 hedging-disclosures (when FX-revaluation is part of a designated hedge per IFRS-9)
src/collections/fx-transactions/index.ts:17: * @accounting US-GAAP ASC-830-10-45 foreign-currency-translation
src/collections/fx-transactions/index.ts:18: * @accounting US-GAAP ASC-830-20 foreign-currency-transactions
src/collections/gl-accounts/index.ts:11: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/gl-accounts/index.ts:12: * @accounting US-GAAP ASC-210 balance-sheet
src/collections/gl-accounts/index.ts:13: * @accounting OECD SAF-T §2 general-ledger-accounts
src/collections/gl-postings/index.ts:31: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/gl-postings/index.ts:32: * @accounting OECD SAF-T §3 transactions
src/collections/goods-receipts/index.ts:23: * @accounting IFRS IAS-2 inventories goods-in-transit
src/collections/goods-receipts/index.ts:24: * @accounting IFRS-15 §38-42 revenue-recognition FOB-point-timing
src/collections/goods-receipts/index.ts:25: * @accounting US-GAAP ASC-330 inventory at-cost
src/collections/government-grants/index.ts:13: * @accounting IFRS IAS-20 §7 §8 §10 recognition
src/collections/government-grants/index.ts:14: * @accounting IFRS IAS-20 §12 §13 income-or-asset-presentation
src/collections/government-grants/index.ts:15: * @accounting IFRS IAS-20 §17 §18 §28 §32 disclosure
src/collections/government-grants/index.ts:16: * @accounting IFRS IAS-20 §39 disclosure-government-assistance
src/collections/government-grants/index.ts:17: * @accounting US-GAAP ASC-958-605 contributions
src/collections/government-grants/index.ts:18: * @accounting US-GAAP ASC-832 government-assistance-disclosure
src/collections/intercompany-transactions/index.ts:14: * @accounting IFRS IFRS-10 §B86 consolidated-financial-statements
src/collections/intercompany-transactions/index.ts:15: * @accounting IFRS IAS-24 related-party-disclosures
src/collections/intercompany-transactions/index.ts:16: * @accounting US-GAAP ASC-810-10 consolidation
src/collections/intercompany-transactions/index.ts:17: * @accounting US-GAAP ASC-850 related-party-disclosures
src/collections/inventory-movements/index.ts:13: * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
src/collections/inventory-movements/index.ts:14: * @accounting US-GAAP ASC-330 inventory cost-flow
src/collections/inventory-movements/index.ts:15: * @accounting US-GAAP ASC-606 cogs-recognition
src/collections/invoice-lines/index.ts:45: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/collections/invoice-lines/index.ts:46: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/collections/invoices/index.ts:67: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/collections/invoices/index.ts:68: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/collections/job-positions/index.ts:10: * @accounting IFRS IAS-19 employee-benefits (planned-headcount accruals)
src/collections/journal-entries/index.ts:28: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/journal-entries/index.ts:29: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/collections/journal-entries/index.ts:30: * @accounting OECD SAF-T §3 journal-entries
src/collections/lease-modifications/index.ts:19: * @accounting IFRS IFRS-16 §44 separate-lease-criterion
src/collections/lease-modifications/index.ts:20: * @accounting IFRS IFRS-16 §45 not-separate-lease-modification
src/collections/lease-modifications/index.ts:21: * @accounting IFRS IFRS-16 §46 partial-or-full-termination
src/collections/lease-modifications/index.ts:22: * @accounting IFRS IFRS-16 §B43 §B44 lease-modification-examples
src/collections/lease-modifications/index.ts:23: * @accounting US-GAAP ASC-842-10-25-8 lease-modification-classification
src/collections/lease-modifications/index.ts:24: * @accounting US-GAAP ASC-842-10-25-11 ASC-842-10-25-12 ASC-842-10-25-13
src/collections/lease-period-postings/index.ts:23: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/collections/lease-period-postings/index.ts:24: * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
src/collections/lease-period-postings/index.ts:25: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/collections/leases/index.ts:49: * @accounting IFRS IFRS-16 leases lessee-recognition
src/collections/leases/index.ts:50: * @accounting IFRS IFRS-16 §22-§35 initial-measurement-rou-asset
src/collections/leases/index.ts:51: * @accounting IFRS IFRS-16 §26-§28 initial-measurement-lease-liability
src/collections/leases/index.ts:52: * @accounting IFRS IFRS-16 §29-§31 subsequent-measurement-rou
src/collections/leases/index.ts:53: * @accounting US-GAAP ASC-842-20 lessee-accounting
src/collections/leases/index.ts:54: * @accounting US-GAAP ASC-842-20-25 finance-vs-operating-lease
src/collections/leave-requests/index.ts:21: * @accounting IFRS IAS-19 §11 §13 §14 short-term-employee-benefits
src/collections/leave-requests/index.ts:22: * @accounting IFRS IAS-19 §16 accumulating-paid-absences
src/collections/leave-requests/index.ts:23: * @accounting US-GAAP ASC-710-10-25 compensated-absences
src/collections/legal-entities/index.ts:25: * @accounting IFRS IFRS-10 §B86 consolidation-procedures
src/collections/legal-entities/index.ts:26: * @accounting IFRS IFRS-12 §10 §11 §B4-B6 disclosure-of-interests-in-other-entities
src/collections/legal-entities/index.ts:27: * @accounting IFRS IAS-27 §9 separate-financial-statements (parent-only FS use this same legal-entity registry)
src/collections/legal-entities/index.ts:28: * @accounting IFRS IFRS-18 §9 §10 presentation-and-disclosure (effective 2027-01 — entity-level taxonomy)
src/collections/legal-entities/index.ts:29: * @accounting IFRS IAS-21 §9 functional-currency
src/collections/legal-entities/index.ts:30: * @accounting IFRS IAS-1 §138 disclosure-of-name-and-domicile
src/collections/legal-entities/index.ts:31: * @accounting US-GAAP ASC-810-10-45 consolidation
src/collections/legal-entities/index.ts:32: * @accounting US-GAAP ASC-280 segment-reporting
src/collections/lot-variants/index.ts:27: * @accounting double-entry — every counter is a balanced number; the variant
src/collections/lots/index.ts:27: * @accounting double-entry — the lot total IS the sum of its variant postings;
src/collections/maintenance-work-orders/index.ts:18: * @accounting IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance
src/collections/maintenance-work-orders/index.ts:19: * @accounting IFRS IAS-2 §10 cost-of-purchase materials-issued
src/collections/maintenance-work-orders/index.ts:20: * @accounting US-GAAP ASC-360 ppe-maintenance
src/collections/opportunities/index.ts:11: * @accounting IFRS IFRS-15 §9 contract-existence-criteria
src/collections/pack-items/index.ts:31: * @accounting IFRS IAS-2 §10 finished-goods at dispatch
src/collections/packs/index.ts:35: * @accounting IFRS IAS-2 §10 finished-goods carried to dispatch
src/collections/parties/index.ts:22: * @accounting IFRS IFRS-9 financial-instruments accounts-receivable
src/collections/parties/index.ts:23: * @accounting US-GAAP ASC-310 receivables ASC-405 liabilities
src/collections/parties/index.ts:24: * @accounting US-IRS Form-1099 information-return
src/collections/payment-allocations/index.ts:19: * @accounting IFRS IFRS-15 §47 §53 transaction-price-allocation
src/collections/payment-allocations/index.ts:20: * @accounting US-GAAP ASC-606-10-32 transaction-price
src/collections/payment-allocations/index.ts:21: * @accounting IFRS IAS-7 §6 cash-flow-classification
src/collections/payment-runs/index.ts:27: * @accounting IFRS IAS-7 statement-of-cash-flows
src/collections/payment-runs/index.ts:28: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/collections/payroll-runs/index.ts:22: * @accounting IFRS IAS-19 employee-benefits short-term
src/collections/payroll-runs/index.ts:23: * @accounting IFRS IAS-19 §51 defined-contribution-plans
src/collections/payroll-runs/index.ts:24: * @accounting IFRS IAS-26 §13 §14 §17 retirement-benefit-plan-reporting (employer-side contributions feed the §17 plan-asset disclosures)
src/collections/payroll-runs/index.ts:25: * @accounting US-GAAP ASC-710 compensation-general
src/collections/payroll-runs/index.ts:26: * @accounting US-GAAP ASC-715 compensation-retirement-benefits
src/collections/performance-obligations/index.ts:22: * @accounting IFRS IFRS-15 §22 distinct-performance-obligation
src/collections/performance-obligations/index.ts:23: * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
src/collections/performance-obligations/index.ts:24: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/collections/performance-obligations/index.ts:25: * @accounting IFRS IFRS-15 §38 point-in-time-recognition
src/collections/performance-obligations/index.ts:26: * @accounting IFRS IFRS-15 §41-§43 progress-measurement
src/collections/performance-obligations/index.ts:27: * @accounting US-GAAP ASC-606-10-25-14 distinct-goods-services
src/collections/performance-obligations/index.ts:28: * @accounting US-GAAP ASC-606-10-25-31 progress-measurement
src/collections/period-end-adjustments/index.ts:18: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/collections/period-end-adjustments/index.ts:19: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/collections/period-end-adjustments/index.ts:20: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/collections/period-locks/index.ts:13: * @accounting IFRS IAS-1 reporting-period
src/collections/post-close-analytics-reports/index.ts:13:  * @accounting IFRS IAS-1 financial-statement-analysis
src/collections/prior-period-adjustments/index.ts:13: * @accounting IFRS IAS-8 §42-49 errors-of-prior-periods
src/collections/prior-period-adjustments/index.ts:14: * @accounting US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections
src/collections/prior-period-adjustments/index.ts:15: * @accounting US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments
src/collections/production-receipts/index.ts:14: * @accounting IFRS IAS-2 §10 §12 cost-of-conversion
src/collections/production-receipts/index.ts:15: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/collections/project-milestones/index.ts:12: * @accounting IFRS IFRS-15 §126 milestone-billing
src/collections/project-milestones/index.ts:13: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/collections/project-milestones/index.ts:14: * @accounting US-GAAP ASC-606-10-25-30 milestone-method
src/collections/project-tasks/index.ts:14: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/collections/project-tasks/index.ts:15: * @accounting IFRS IFRS-15 §B18 cost-to-cost
src/collections/projects/index.ts:21: * @accounting IFRS IFRS-15 §35 over-time-recognition
src/collections/projects/index.ts:22: * @accounting IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
src/collections/projects/index.ts:23: * @accounting IFRS IFRS-15 §126 milestone-billing
src/collections/projects/index.ts:24: * @accounting US-GAAP ASC-606-10-25-27 over-time-criteria
src/collections/projects/index.ts:25: * @accounting IFRS IAS-1 §125 estimation-uncertainty (project budgets)
src/collections/properties/index.ts:19: * @accounting IFRS IAS-16 property-plant-and-equipment owned-property
src/collections/properties/index.ts:20: * @accounting IFRS IFRS-16 §22 right-of-use-asset leased-property
src/collections/properties/index.ts:21: * @accounting US-GAAP ASC-360 property-plant-and-equipment
src/collections/provisions/index.ts:22: * @accounting IFRS IAS-37 §10 contingent-liability-definition
src/collections/provisions/index.ts:23: * @accounting IFRS IAS-37 §14 recognition-of-provisions
src/collections/provisions/index.ts:24: * @accounting IFRS IAS-37 §27-30 recognition-prohibition
src/collections/provisions/index.ts:25: * @accounting IFRS IAS-37 §86-92 disclosure-requirements
src/collections/provisions/index.ts:26: * @accounting IFRS IFRS-15 §B50 onerous-contract-disclosure
src/collections/provisions/index.ts:27: * @accounting US-GAAP ASC-440 commitments
src/collections/provisions/index.ts:28: * @accounting US-GAAP ASC-450-20-50 loss-contingency-disclosure
src/collections/provisions/index.ts:29: * @accounting IFRS IAS-37 §36 §37 §39 measurement-best-estimate
src/collections/provisions/index.ts:30: * @accounting IFRS IAS-37 §66 §67 onerous-contracts
src/collections/provisions/index.ts:31: * @accounting IFRS IAS-37 §70 §83 disclosure-requirements
src/collections/provisions/index.ts:32: * @accounting US-GAAP ASC-450-20-25 loss-contingencies
src/collections/provisions/index.ts:33: * @accounting US-GAAP ASC-410 asset-retirement-obligations
src/collections/recurring-journals/index.ts:17: * @accounting IFRS IAS-1 §27 accrual-basis-of-accounting
src/collections/recurring-journals/index.ts:18: * @accounting IFRS IAS-1 §29 §30 separate-presentation
src/collections/recurring-journals/index.ts:19: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/collections/recurring-journals/index.ts:20: * @accounting US-GAAP ASC-720 other-expenses
src/collections/related-party-transactions/index.ts:4: * @accounting IAS-24 related-party-disclosures
src/collections/related-party-transactions/index.ts:5: * @accounting US-GAAP ASC-850 related-party-disclosures
src/collections/returns/index.ts:5: * @accounting IFRS IFRS-15 §B22 right-of-return-revenue-reversal
src/collections/returns/index.ts:6: * @accounting IFRS IAS-2 inventories return-to-stock
src/collections/returns/index.ts:7: * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
src/collections/returns/index.ts:8: * @accounting US-GAAP ASC-330 inventory cost-flow
src/collections/rounding-adjustments/index.ts:12: * @accounting IFRS IAS-1 §51(e) level-of-rounding-disclosure
src/collections/rounding-adjustments/index.ts:13: * @accounting IFRS IAS-21 §39 foreign-currency-translation
src/collections/rounding-adjustments/index.ts:14: * @accounting US-GAAP ASC-205-10-45 presentation-rounding
src/collections/sales-commissions/index.ts:13: * @accounting IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining
src/collections/sales-commissions/index.ts:14: * @accounting IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation
src/collections/sales-commissions/index.ts:15: * @accounting US-GAAP ASC-340-40-25-1 incremental-costs
src/collections/sales/index.ts:29: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/collections/sales/index.ts:30: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/collections/segment-reporting/index.ts:4: * @accounting IFRS-8 operating-segments
src/collections/segment-reporting/index.ts:5: * @accounting US-GAAP ASC-280 segment-reporting
src/collections/subscription-plans/index.ts:10: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/collections/subscription-plans/index.ts:11: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/collections/subscriptions/index.ts:15: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/collections/subscriptions/index.ts:16: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/collections/subscriptions/index.ts:17: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/collections/tax-calculations/index.ts:20: * @accounting OECD SAF-T tax-table
src/collections/tax-codes/index.ts:18: * @accounting OECD SAF-T tax-table
src/collections/tax-jurisdictions/index.ts:30: * @accounting OECD SAF-T jurisdiction-codes
src/collections/tax-returns/index.ts:7: * @accounting OECD SAF-T 2.0 standard-audit-file-tax
src/collections/tax-returns/index.ts:8: * @accounting US-GAAP ASC-740 income-taxes
src/collections/tenants/index.ts:158:     * @accounting IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
src/collections/time-entries/index.ts:10: * @accounting IFRS IAS-19 employee-benefits short-term
src/collections/time-entries/index.ts:11: * @accounting US-GAAP ASC-710 compensation-general
src/collections/time-entries/index.ts:12: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress
src/collections/tracking-events/index.ts:16: * @accounting IFRS IFRS-15 §38 point-in-time-revenue-recognition
src/collections/usage-records/index.ts:18: * @accounting IFRS IFRS-15 §B16 §B17 §B18 §B19 usage-based-revenue
src/collections/usage-records/index.ts:19: * @accounting US-GAAP ASC-606-10-32-40 usage-based-pricing
src/collections/warehouse-locations/index.ts:13: * @accounting IFRS IAS-2 inventories location-tracked
src/collections/warehouse-locations/index.ts:14: * @accounting US-GAAP ASC-330 inventory location-tracked
src/collections/wip-snapshots/index.ts:17: * @accounting IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
src/collections/wip-snapshots/index.ts:18: * @accounting IFRS IFRS-15 §107 §108 §109 contract-asset-contract-liability
src/collections/wip-snapshots/index.ts:19: * @accounting US-GAAP ASC-606-10-45-1 contract-asset
src/collections/work-centers/index.ts:14: * @accounting IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead
src/collections/work-centers/index.ts:15: * @accounting IFRS IAS-2 §13 normal-capacity-overhead-absorption
src/collections/work-centers/index.ts:16: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/collections/work-orders/index.ts:68: * @accounting IFRS IAS-2 §10 §12 cost-of-conversion (the piece-rate wage = direct labour)
src/collections/work-orders/index.ts:69: * @accounting IFRS IAS-19 §11 short-term-employee-benefits piece-rate
src/collections/work-shifts/index.ts:36: * @accounting IFRS IAS-2 §12 cost-of-conversion direct-labour (the `wage` feed)
src/collections/work-shifts/index.ts:37: * @accounting US-GAAP ASC-330-10-30 inventory-cost
src/components/ecommerce/catalogue/index.ts:31: * @accounting IFRS IAS-2 inventories
src/components/ecommerce/catalogue/index.ts:32: * @accounting US-GAAP ASC-330 inventory
src/components/ecommerce/orders/index.ts:68: * @accounting IFRS IFRS-15 §10 contract-with-customer (order = contract or modification)
src/components/ecommerce/orders/index.ts:69: * @accounting IFRS IFRS-15 §31 transfer-of-control
src/components/ecommerce/orders/index.ts:70: * @accounting US-GAAP ASC-606 revenue-from-contracts
src/components/ecommerce/plugin/index.ts:17: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/components/ecommerce/plugin/index.ts:18: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/components/ecommerce/product/validation/index.ts:4: * @accounting IFRS IAS-2 inventories quantity-tracking
src/components/ecommerce/product/validation/index.ts:5: * @accounting US-GAAP ASC-330 inventory
src/components/ecommerce/stripe/tenantConfirmOrder.ts:10: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/components/ecommerce/stripe/tenantConfirmOrder.ts:11: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/components/ecommerce/transactions/index.ts:27: * @accounting IFRS IFRS-9 §3.1.1 recognition (cash received / paid)
src/components/ecommerce/transactions/index.ts:28: * @accounting IFRS IAS-7 §10 statement-of-cash-flows operating-activities
src/components/vocabulary/marketing/CountryShowcase.tsx:10: * @accounting IFRS / US-GAAP / FRS / JGAAP / ASBE / INDAS
src/components/vocabulary/marketing/PricingTable.tsx:12: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/components/vocabulary/marketing/PricingTable.tsx:13: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/hooks/collections/invoices-invoice-lines/itemInventory.ts:18: * @accounting IFRS IAS-2 inventories
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:34: * @accounting IFRS IAS-7 statement-of-cash-flows
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:35: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:36: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers settlement
src/hooks/collections/invoices/billAccountingHook.ts:17: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/hooks/collections/invoices/billAccountingHook.ts:18: * @accounting US-GAAP ASC-405 liabilities
src/hooks/collections/invoices/billAccountingHook.ts:19: * @accounting US-GAAP ASC-705 cost-of-sales-and-services
src/hooks/collections/invoices/invoiceAccountingHook.ts:20: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/hooks/collections/invoices/invoiceAccountingHook.ts:21: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/hooks/collections/invoices/invoiceAccountingHook.ts:22: * @accounting US-GAAP ASC-310 receivables
src/hooks/collections/invoices/invoiceAccountingHook.ts:23: * @accounting US-GAAP ASC-330 inventory cogs-recognition
src/hooks/collections/journal-entries/derivePosting.ts:18: * @accounting double-entry bookkeeping — the posting inherits the entry's balance, it cannot break it
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.test.ts:27: * @accounting IFRS IFRS-16 §29-§31 §36-§38 leases
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.test.ts:28: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.ts:29: * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.ts:30: * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.ts:31: * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
src/hooks/collections/shared/bankStatementImportedHook.ts:26: * @accounting IFRS IAS-7 statement-of-cash-flows
src/hooks/collections/shared/depreciationSchedulePostingHook.ts:20: * @accounting IFRS IAS-16 §62 depreciation-methods
src/hooks/collections/shared/depreciationSchedulePostingHook.ts:21: * @accounting IFRS IAS-36 impairment-of-assets
src/hooks/collections/shared/depreciationSchedulePostingHook.ts:22: * @accounting US-GAAP ASC-360-10-35 depreciation
src/hooks/collections/shared/inventoryMovementPostingHook.ts:18: * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
src/hooks/collections/shared/inventoryMovementPostingHook.ts:19: * @accounting IFRS IAS-2 §28 net-realisable-value
src/hooks/collections/shared/inventoryMovementPostingHook.ts:20: * @accounting US-GAAP ASC-330 inventory
src/hooks/collections/shared/payrollDisbursementHook.ts:31: * @accounting IFRS IAS-7 statement-of-cash-flows payroll-disbursement
src/hooks/collections/shared/payrollRunPostingHook.ts:39: * @accounting IFRS IAS-19 employee-benefits short-term
src/hooks/collections/shared/payrollRunPostingHook.ts:40: * @accounting IFRS IAS-19 §51 defined-contribution-plans
src/hooks/collections/shared/payrollRunPostingHook.ts:41: * @accounting IFRS IFRS-8 operating-segments
src/hooks/collections/shared/payrollRunPostingHook.ts:42: * @accounting US-GAAP ASC-710 compensation-general
src/hooks/collections/shared/payrollRunPostingHook.ts:43: * @accounting US-GAAP ASC-715 compensation-retirement-benefits
src/hooks/collections/shared/payrollRunPostingHook.ts:44: * @accounting US-GAAP ASC-280 segment-reporting
src/hooks/collections/shared/periodEndAdjustmentPostingHook.test.ts:12: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/hooks/collections/shared/periodEndAdjustmentPostingHook.test.ts:13: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/hooks/collections/shared/periodEndAdjustmentPostingHook.ts:28: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/hooks/collections/shared/periodEndAdjustmentPostingHook.ts:29: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/hooks/collections/shared/periodEndAdjustmentPostingHook.ts:30: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/hooks/collections/shared/validateBalancedEntry.ts:23: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/hooks/collections/shared/validateBalancedEntry.ts:24: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/hooks/collections/shared/validateBalancedEntry.ts:25: * @accounting OECD SAF-T §3 journal-entries
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:25: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:26: * @accounting IFRS IFRS-15 §IFRS-15.31 revenue-recognition
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:27: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:28: * @accounting US-GAAP ASC-606-10-25 contract-modifications
src/hooks/collections/users/emitOrderLifecycleEvents.ts:22: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/hooks/collections/users/emitOrderLifecycleEvents.ts:23: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/hooks/collections/users/emitOrderLifecycleEvents.ts:24: * @accounting IFRS IAS-2 inventories cogs-recognition
src/hooks/collections/users/emitOrderLifecycleEvents.ts:25: * @accounting US-GAAP ASC-330 inventory cogs-recognition
src/hooks/collections/utility/periodLock.ts:5: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/hooks/collections/utility/periodLock.ts:6: * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
src/hooks/collections/utility/periodLock.ts:7: * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
src/jobs/bnb/rates/sync/index.ts:21: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/jobs/dunning/job/index.ts:11: * @accounting IFRS IFRS-9 expected-credit-loss impairment
src/jobs/dunning/job/index.ts:12: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/jobs/dunning/job/index.ts:13: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/jobs/dunning/job/index.ts:14: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/payload.config.ts:531:       * @accounting IFRS IFRS-9 impairment-and-credit-losses
src/payload.config.ts:532:       * @accounting US-GAAP ASC-326 measurement-of-credit-losses
src/payload.config.ts:553:       * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/utilities/accounting/analysis/index.ts:4: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utilities/accounting/analysis/index.ts:5: * @accounting IFRS IAS-7 statement-of-cash-flows
src/utilities/accounting/analysis/index.ts:6: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/utilities/accounting/analysis/index.ts:7: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/utilities/accounting/debit/index.ts:10: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utilities/accounting/debit/index.ts:11: * @accounting IFRS Conceptual-Framework recognition-derecognition
src/utilities/accounting/debit/index.ts:12: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/utilities/accounting/debit/index.ts:13: * @accounting US-GAAP ASC-810 consolidation
src/utilities/accounting/reports/index.ts:15: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utilities/accounting/reports/index.ts:16: * @accounting IFRS IAS-7 statement-of-cash-flows
src/utilities/accounting/reports/index.ts:17: * @accounting IFRS IFRS-9 expected-credit-loss aging
src/utilities/accounting/reports/index.ts:18: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/utilities/accounting/reports/index.ts:19: * @accounting US-GAAP ASC-230 statement-of-cash-flows
src/utilities/accounting/reports/index.ts:20: * @accounting US-GAAP ASC-310 receivables ar-aging
src/utilities/accounting/reports/index.ts:21: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/utilities/accounting/reports/index.ts:22: * @accounting US-GAAP ASC-405 liabilities ap-aging
src/utilities/accounting/reports/index.ts:23: * @accounting OECD SAF-T 2.0 standard-audit-file-tax
src/utilities/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:17: * @accounting IFRS IAS-19 employee-benefits
src/utilities/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:18: * @accounting US-GAAP ASC-710 compensation-general
src/utilities/billing/stripeWebhookHandlers.test.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/billing/stripeWebhookHandlers.test.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/billing/stripeWebhookHandlers.ts:22: * @accounting IFRS-15 revenue-from-contracts-with-customers
src/utilities/billing/stripeWebhookHandlers.ts:442: * @accounting IFRS IFRS-15 §B22 customer-options-for-refund
src/utilities/billing/stripeWebhookHandlers.ts:443: * @accounting US-GAAP ASC-606-10-25-13 contract-modification-with-refund
src/utilities/billing/test.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/billing/test.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/config/country/specifics/index.ts:18: * @accounting IFRS IAS-1 §51 fiscal-period
src/utilities/config/country/specifics/index.ts:19: * @accounting US-GAAP ASC-270 interim-reporting fiscal-year
src/utilities/country/api/client/index.ts:439: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/utilities/country/api/client/index.ts:541: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/utilities/country/api/client/index.ts:620: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/utilities/country/api/eu/index.ts:72: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/utilities/country/client/bg-vat.ts:19: * @accounting IFRS IAS-1 presentation-rounding
src/utilities/depreciation/service/index.ts:24: * @accounting IFRS IAS-16 §62 depreciation-methods
src/utilities/depreciation/service/index.ts:25: * @accounting IFRS IAS-36 impairment-of-assets
src/utilities/depreciation/service/index.ts:26: * @accounting US-GAAP ASC-360-10-35 depreciation
src/utilities/depreciation/service/index.ts:27: * @accounting OECD SAF-T §3 fixed-asset-register
src/utilities/en/16931/types/index.ts:16: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/en/16931/types/index.ts:17: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/fiscal/period/resolver/span/index.ts:10: * @accounting IAS-1 §36 reporting period
src/utilities/gl/account/resolver/index.ts:25: * @accounting IFRS IAS-1 chart-of-accounts
src/utilities/gl/account/resolver/index.ts:26: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:14: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:15: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:16: * @accounting IFRS IAS-7 statement-of-cash-flows
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:17: * @accounting IFRS IAS-37 provisions-contingent-liabilities
src/utilities/invoices/invoice/lines/hooks/recomputeInvoiceTotals.ts:18: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/invoices/payments/hooks/recomputeInvoicePaid.ts:15: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/iso/20022/types/index.ts:14: * @accounting IFRS IAS-7 statement-of-cash-flows
src/utilities/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:12: * @accounting IFRS IAS-2 §10 §28 §36 inventories
src/utilities/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:13: * @accounting US-GAAP ASC-330 inventory
src/utilities/journal/entry/service/index.ts:14: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utilities/journal/entry/service/index.ts:15: * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
src/utilities/journal/entry/service/index.ts:16: * @accounting OECD SAF-T §3 journal-entries
src/utilities/journal/entry/service/index.ts:36:   * @accounting IFRS IFRS-8 operating-segments
src/utilities/journal/entry/service/index.ts:37:   * @accounting US-GAAP ASC-280 segment-reporting
src/utilities/party/aging.service.ts:10: * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
src/utilities/party/aging.service.ts:11: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/utilities/party/aging.service.ts:12: * @accounting US-GAAP ASC-310 receivables
src/utilities/party/aging.service.ts:13: * @accounting US-GAAP ASC-405 liabilities
src/utilities/product/price/index.ts:21: * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
src/utilities/product/price/index.ts:22: * @accounting US-GAAP ASC-830 foreign-currency-matters
src/utilities/receivable/aging/index.ts:10: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/utilities/receivable/aging/index.ts:11: * @accounting US-GAAP ASC-310 receivables
src/utilities/receivable/aging/index.ts:9: * @accounting IFRS IFRS-9 financial-instruments expected-credit-loss
src/utilities/receivable/allowance/index.ts:6: * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
src/utilities/receivable/allowance/index.ts:7: * @accounting US-GAAP ASC-326 §20 current-expected-credit-loss
src/utilities/receivable/allowance/index.ts:8: * @accounting US-GAAP ASC-310 receivables
src/utilities/receivable/analytics/index.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/receivable/analytics/index.ts:7: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/receivable/analytics/index.ts:8: * @accounting US-GAAP ASC-310 receivables
src/utilities/receivable/index.ts:7: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/receivable/workflow/index.ts:10: * @accounting IFRS IFRS-9 written_off impairment
src/utilities/receivable/workflow/index.ts:11: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/receivable/workflow/index.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/saf/t/types/index.ts:16: * @accounting IFRS IAS-1 presentation-of-financial-statements
src/utilities/saf/t/types/index.ts:17: * @accounting US-GAAP ASC-205 presentation
src/utilities/sale/fiscal/revenue/index.ts:7: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/sale/order-fiscalization.ts:12: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/sale/subscription-fiscalization.ts:16: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/utilities/subscription/gate/index.ts:10: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/subscription/gate/index.ts:11: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/utilities/subscription/gate/index.ts:9: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/utilities/subscription/gate/test.ts:6: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/subscription/gate/test.ts:7: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/subscription/gate/test.ts:8: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/utilities/tenant/context/index.ts:41: * @accounting IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
src/utilities/tenant/context/index.ts:42: * @accounting US-GAAP ASC-205 presentation-of-financial-statements
src/utilities/types/events/index.ts:265: * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
src/utilities/types/events/index.ts:266: * @accounting IFRS IAS-2 §28 net-realisable-value
src/utilities/types/events/index.ts:267: * @accounting US-GAAP ASC-330 inventory
src/utilities/types/events/index.ts:268: * @accounting US-GAAP ASC-330-10-30 inventory-valuation
src/utilities/types/events/index.ts:298:     * @accounting IFRS IAS-2 §25 cost-formulas
src/utilities/types/events/index.ts:299:     * @accounting US-GAAP ASC-330-10-30 inventory-valuation
src/utilities/types/events/index.ts:314: * @accounting IFRS IAS-16 §62 depreciation-methods
src/utilities/types/events/index.ts:315: * @accounting US-GAAP ASC-360-10-35 depreciation
src/utilities/types/events/index.ts:407: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
src/utilities/types/events/index.ts:408: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/types/events/index.ts:409: * @accounting US-GAAP ASC-340-40 deferred-contract-costs
src/utilities/types/events/index.ts:494: * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
src/utilities/types/events/index.ts:495: * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
src/utilities/types/events/index.ts:496: * @accounting IFRS IAS-2 inventories cogs-recognition
src/utilities/types/events/index.ts:497: * @accounting US-GAAP ASC-330 inventory cogs-recognition
src/utilities/types/parties/index.ts:11: * @accounting IFRS IFRS-9 expected-credit-loss
src/utilities/types/parties/index.ts:12: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/utilities/types/receivables/index.ts:7: * @accounting IFRS IFRS-9 IFRS-15
src/utilities/types/receivables/index.ts:8: * @accounting US-GAAP ASC-310 ASC-326 ASC-606
src/utilities/utility/aging-dry-keys.test.ts:17: * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
src/utilities/utility/aging-dry-keys.test.ts:18: * @accounting US-GAAP ASC-326 credit-losses-cecl
src/utilities/utility/calculations.ts:113: * @accounting IFRS IAS-16 §62 depreciation-methods units-of-production
src/utilities/utility/calculations.ts:114: * @accounting US-GAAP ASC-360-10-35 depreciation activity-method
src/utilities/utility/calculations.ts:49: * @accounting IFRS IAS-16 §62 depreciation-methods diminishing-balance
src/utilities/utility/calculations.ts:50: * @accounting US-GAAP ASC-360-10-35 depreciation declining-balance
src/utilities/utility/calculations.ts:66: * @accounting IFRS IAS-16 §62 depreciation-methods double-declining-balance
src/utilities/utility/calculations.ts:67: * @accounting US-GAAP ASC-360-10-35-7 declining-balance
src/utilities/utility/calculations.ts:90: * @accounting IFRS IAS-16 §62 depreciation-methods sum-of-years-digits
src/utilities/utility/calculations.ts:91: * @accounting US-GAAP ASC-360-10-35 depreciation
src/utilities/utility/depreciation-methods.test.ts:14: * @accounting IFRS IAS-16 §62 depreciation-methods
src/utilities/utility/depreciation-methods.test.ts:15: * @accounting US-GAAP ASC-360-10-35 depreciation
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
```

## @security

```text
src/access/collections/search/readAccess.test.ts:5: * @security ISO-27001 A.5.15 access-control
src/access/collections/search/readAccess.ts:13: * @security ISO-27001 A.5.15 access-control
src/access/collections/shared/abilityAccess.ts:13: * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
src/access/collections/shared/adminOrPublishedStatus.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/access/collections/shared/adminOrPublishedStatus.ts:13: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/adminOrPublishedStatus.ts:14: * @security ISO-27002 §8.3 information-access-restriction
src/access/collections/shared/anyone.test.ts:5: * @security ISO-27002 §5.15 access-control intentional-public-read
src/access/collections/shared/anyone.ts:4: * @security ISO-27002 §5.15 access-control intentional-public-read
src/access/collections/shared/appAccess.ts:18: * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
src/access/collections/shared/createMembershipAdminMutateAccess.ts:18: * @security ISO-27001 A.5.18 access-rights
src/access/collections/shared/createMembershipAdminMutateAccess.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/access/collections/shared/createMembershipAdminMutateAccess.ts:20: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/createMembershipAdminMutateAccess.ts:21: * @security ISO-27002 §5.3 segregation-of-duties
src/access/collections/shared/either.ts:7: * @security ISO-27001 A.5.15 access-control
src/access/collections/shared/isAdmin.ts:7: * @security ISO-27001 A.5.18 access-rights
src/access/collections/shared/isAdmin.ts:8: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/isDocumentOwner.ts:8: * @security ISO-27001 A.5.18 access-rights
src/access/collections/shared/isDocumentOwner.ts:9: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/multiTenantRead.ts:10: * @security ISO-27002 §5.3 segregation-of-duties
src/access/collections/shared/multiTenantRead.ts:166: * @security ISO-27001 A.5.15 access-control
src/access/collections/shared/multiTenantRead.ts:6: * @security ISO-27001 A.5.15 access-control
src/access/collections/shared/multiTenantRead.ts:7: * @security ISO-27001 A.5.18 access-rights
src/access/collections/shared/multiTenantRead.ts:8: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/access/collections/shared/multiTenantRead.ts:9: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/partyAccess.ts:11: * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
src/access/collections/shared/superAdminOnly.ts:5: * @security ISO-27001 A.5.18 access-rights
src/access/collections/shared/superAdminOnly.ts:6: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/superAdminOnly.ts:7: * @security ISO-27002 §8.2 privileged-access-rights
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:7: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/tenantScopedCollectionReadAccess.test.ts:8: * @security ISO-27002 §8.3 information-access-restriction
src/access/collections/shared/tenantScopedCollectionReadAccess.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/access/collections/shared/tenantScopedCollectionReadAccess.ts:16: * @security ISO-27002 §5.15 access-control
src/access/collections/shared/tenantScopedCollectionReadAccess.ts:17: * @security ISO-27002 §8.3 information-access-restriction
src/access/collections/tenants/updateAndDeleteAccess.ts:10: * @security ISO-27001 A.5.23 information-security-for-cloud-services tenant-isolation
src/access/collections/tenants/updateAndDeleteAccess.ts:11: * @security ISO-27002 §5.15 access-control
src/access/collections/users/createAccess.ts:13: * @security ISO-27001 A.5.18 access-rights
src/access/collections/users/createAccess.ts:14: * @security ISO-27002 §5.15 access-control
src/access/collections/users/createAccess.ts:15: * @security ISO-27002 §5.16 identity-management
src/access/collections/users/readAccess.ts:17: * @security ISO-27001 A.5.18 access-rights
src/access/collections/users/readAccess.ts:18: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/access/collections/users/readAccess.ts:19: * @security ISO-27002 §5.15 access-control
src/access/collections/users/updateAndDeleteAccess.ts:12: * @security ISO-27001 A.5.18 access-rights
src/access/collections/users/updateAndDeleteAccess.ts:13: * @security ISO-27002 §5.15 access-control
src/access/collections/users/updateAndDeleteAccess.ts:14: * @security ISO-27002 §5.3 segregation-of-duties
src/access/fields/shared/adminOnlyFieldAccess.ts:5: * @security ISO-27001 A.5.18 access-rights
src/access/fields/shared/adminOnlyFieldAccess.ts:6: * @security ISO-27002 §5.15 access-control
src/access/fields/shared/isCustomer.ts:7: * @security ISO-27002 §5.15 access-control
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
src/collections/account-reconciliations/index.ts:27: * @security ISO-27002 §5.3 segregation-of-duties preparer-vs-reviewer
src/collections/activities/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/ai-suggestions/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/ai-suggestions/index.ts:28: * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
src/collections/ai-suggestions/index.ts:29: * @security ISO-27002 §5.34 ai-output-validation
src/collections/audit-committee-minutes/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/audit-committees/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/audit-events/index.ts:49: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/audit-events/index.ts:50: * @security ISO-27002 §8.15 logging
src/collections/audit-evidence/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/audit-samples/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/audit-submissions/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/bank-accounts/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/bank-accounts/index.ts:16: * @security ISO-27002 §8.24 use-of-cryptography iban-bic-encryption
src/collections/bank-reconciliations/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/bank-statements/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/bank-transactions/index.ts:47: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/batches/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/beneficial-owners/index.ts:9: * @security ISO-27001 A.5.34 privacy-and-pii
src/collections/bills-of-materials/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/biological-assets/index.ts:23: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/board-actions/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/bookable-resources/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/bookings/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/budget-planning/index.ts:30: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/budget-planning/index.ts:31: * @security ISO-27002 §5.3 segregation-of-duties approval-vs-creation
src/collections/business-combinations/index.ts:21: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/carbon-emissions/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/carriers/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/carriers/index.ts:18: * @security ISO-27002 §8.24 use-of-cryptography api-credentials-encryption
src/collections/cases/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation party-scoped-read
src/collections/compliance-deadlines/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/compliance-frameworks/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/compliance-gaps/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/compliance-requirements/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/connections/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/consent-records/index.ts:14: * @security ISO-27001 A.5.34 privacy-and-pii
src/collections/consignment-arrangements/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/consignment-inventory/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/consignment-sales/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/consolidation-eliminations/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/contracts/index.ts:36: * @security ISO-27002 §5.3 segregation-of-duties
src/collections/cost-centers/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/cost-variances/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/credit-memos/index.ts:37: * @security ISO-27002 §5.3 segregation-of-duties issuer-vs-approver
src/collections/csrd-disclosures/index.ts:26: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/currency-rates/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/customer-segments/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/customs-declarations/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/data-processing-activities/index.ts:14: * @security ISO-27001 A.5.34 privacy-and-pii
src/collections/data-subject-requests/index.ts:17: * @security ISO-27001 A.5.34 privacy-and-pii
src/collections/debt-schedule/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/deferred-tax-items/index.ts:21: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/disclosure-checklists/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/earnings-per-share/index.ts:20: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/employees/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/employees/index.ts:25: * @security ISO-27002 §5.34 privacy-and-protection-of-pii
src/collections/employees/index.ts:26: * @security ISO-27002 §8.11 data-masking
src/collections/entity-legal-structures/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/expense-reports/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/fair-value-measurements/index.ts:21: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/financial-statements/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/financial-statements/index.ts:29: * @security ISO-27002 §5.3 segregation-of-duties certifier-vs-preparer
src/collections/fiscal-devices/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/fiscal-periods/index.ts:30: * @security ISO-27002 §5.3 segregation-of-duties closer-vs-creator locker-vs-creator
src/collections/fixed-assets/index.ts:34: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/fx-transactions/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/gl-accounts/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/gl-postings/index.ts:35: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/goods-receipts/index.ts:29: * @security ISO-27002 §5.3 segregation-of-duties receiver-vs-requester
src/collections/government-grants/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/groups/index.ts:14: * @security ISO-27001 A.5.15 access-control · A.5.18 access-rights
src/collections/held-for-sale-classifications/index.ts:23: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/insurance-contracts/index.ts:24: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/intercompany-transactions/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/internal-audit-function/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/internal-controls/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/internal-policies/index.ts:4: * @security ISO-27001 A.5.1 policies-for-information-security
src/collections/internal-policies/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/inventory-movements/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/investment-properties/index.ts:23: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/job-positions/index.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/journal-entries/index.ts:33: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/journal-entries/index.ts:34: * @security ISO-27002 §5.3 segregation-of-duties
src/collections/kyc-checks/index.ts:10: * @security ISO-27001 A.5.34 privacy-and-pii
src/collections/leads/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/lease-modifications/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/lease-period-postings/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/leases/index.ts:57: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/leave-requests/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/legal-entities/index.ts:36: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/lot-variants/index.ts:30: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/lot-work-phases/index.ts:29: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/lots/index.ts:31: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/maintenance-work-orders/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/management-assessment-icfr/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/mineral-resource-assets/index.ts:20: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/operators/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/opportunities/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/org-units/index.ts:11: * @security ISO-27001 A.5.15 access-control
src/collections/pack-items/index.ts:33: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/packages/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/packs/index.ts:37: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/payment-allocations/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/payment-runs/index.ts:31: * @security ISO-27002 §5.3 segregation-of-duties
src/collections/payroll-runs/index.ts:32: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/payroll-runs/index.ts:33: * @security ISO-27002 §5.3 segregation-of-duties
src/collections/payroll-runs/index.ts:34: * @security ISO-27002 §5.34 privacy-and-protection-of-pii
src/collections/payroll-runs/index.ts:35: * @security ISO-27002 §8.11 data-masking
src/collections/performance-reviews/index.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/period-end-adjustments/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/period-end-adjustments/index.ts:23: * @security ISO-27002 §5.3 segregation-of-duties approval-vs-creation
src/collections/prior-period-adjustments/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/production-receipts/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/project-milestones/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/project-tasks/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/projects/index.ts:28: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/properties/index.ts:24: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/provisions/index.ts:36: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/quality-inspections/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/receipts/index.ts:21: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/recruiting-pipeline/index.ts:15: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/recurring-journals/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/regulatory-deferral-accounts/index.ts:17: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/regulatory-reports/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/related-party-transactions/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/returns/index.ts:11: * @security ISO-27002 §5.3 segregation-of-duties
src/collections/risk-register/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/roles/index.ts:12: * @security ISO-27001 A.5.18 access-rights
src/collections/roles/index.ts:13: * @security ISO-27002 §5.15 access-control
src/collections/roles/index.ts:14: * @security ISO-27002 §5.16 identity-management
src/collections/rounding-adjustments/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/sales-commissions/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/sales/index.ts:33: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/sectors/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/segment-reporting/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/share-based-payments/index.ts:19: * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
src/collections/shares/index.ts:35: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/spaces/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/statutory-report-templates/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/subscriptions/index.ts:20: * @security ISO-27002 §8.24 use-of-cryptography
src/collections/taggings/index.ts:34: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/tags/index.ts:25: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/tax-calculations/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/tenants/index.ts:159:     * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-sandbox-config
src/collections/tenants/index.ts:31: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/collections/tenants/index.ts:32: * @security ISO-27002 §5.15 access-control
src/collections/terminals/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/time-entries/index.ts:16: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/tracking-events/index.ts:18: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/transaction-failures/index.ts:18: * @security ISO-27001 A.5.24 incident-management-planning
src/collections/transaction-failures/index.ts:19: * @security ISO-27002 §5.27 information-security-event-correction
src/collections/transfer-pricing-files/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/usage-records/index.ts:23: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/users/index.ts:105: * @security ISO-27001 A.5.16 identity-management
src/collections/users/index.ts:106: * @security ISO-27001 A.5.17 authentication-information
src/collections/users/index.ts:107: * @security ISO-27002 §8.5 secure-authentication
src/collections/users/index.ts:382:     * @security ISO-27002 §5.15 access-control per-user-feature-flags
src/collections/warehouse-locations/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/wip-snapshots/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/work-centers/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/work-orders/index.ts:72: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/work-phases/index.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/work-shifts/index.ts:40: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/workflow-definitions/index.ts:20: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/collections/workflow-instances/index.ts:17: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/ecommerce/access/utilities.ts:5: * @security ISO-27001 A.5.18 access-rights
src/components/ecommerce/access/utilities.ts:6: * @security ISO-27002 §5.15 access-control
src/components/ecommerce/orders/index.ts:73: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/ecommerce/plugin/index.ts:19: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-stripe-keys
src/components/ecommerce/plugin/index.ts:20: * @security ISO-27002 §5.17 authentication-information secret-management
src/components/ecommerce/stripe/payment/index.ts:12: * @security ISO-27001 A.5.17 authentication-information secret-management
src/components/ecommerce/stripe/payment/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/ecommerce/stripe/payment/index.ts:14: * @security ISO-27002 §8.24 use-of-cryptography
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:10: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/ecommerce/stripe/tenantAwareInitiatePayment.ts:9: * @security ISO-27001 A.5.17 authentication-information secret-management
src/components/ecommerce/stripe/tenantConfirmOrder.ts:12: * @security ISO-27001 A.5.17 authentication-information secret-management
src/components/ecommerce/stripe/tenantConfirmOrder.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/ecommerce/stripe/tenantStripeWebhook.ts:10: * @security ISO-27001 A.5.17 authentication-information webhook-secret
src/components/ecommerce/stripe/tenantStripeWebhook.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/ecommerce/stripe/tenantStripeWebhook.ts:12: * @security ISO-27002 §8.24 use-of-cryptography
src/components/ecommerce/transactions/index.ts:32: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/components/payload/sdk/index.ts:9: * @security ISO-27002 §8.5 secure-authentication
src/fields/relationship/auditFields.ts:12: * @security ISO-27002 §5.3 segregation-of-duties approver-visibility
src/globals/providers/config.ts:5: * @security ISO-27001 A.5.17 authentication-information · A.5.15 access-control
src/hooks/collections/invoices/billAccountingHook.ts:22: * @security ISO-27002 §5.3 segregation-of-duties
src/hooks/collections/posts/populateAuthors.ts:16: * @security ISO-27002 §8.11 data-masking
src/hooks/collections/roles/validateRoleDefinition.ts:10: * @security ISO-27001 A.5.18 access-rights
src/hooks/collections/roles/validateRoleDefinition.ts:11: * @security ISO-27002 §5.15 access-control
src/hooks/collections/shared/autoPopulateCreatedBy.ts:10: * @security ISO-27002 §5.15 access-control
src/hooks/collections/shared/enforceSegregationOfDuties.ts:9: * @security ISO-27002 §5.3 segregation-of-duties
src/hooks/collections/shared/payrollDisbursementHook.ts:34: * @security ISO-27002 §5.3 segregation-of-duties treasury-preparer
src/hooks/collections/shared/payrollRunPostingHook.ts:50: * @security ISO-27002 §5.3 segregation-of-duties
src/hooks/collections/subscription-plans-subscriptions/encryptSubscriptionData.ts:11: * @security ISO-27002 §8.24 use-of-cryptography
src/hooks/collections/subscription-plans-subscriptions/encryptSubscriptionData.ts:12: * @security ISO-27001 A.8.24 use-of-cryptography
src/hooks/collections/tenants/createRoleGroups.ts:14: * @security ISO-27002 §5.15 access-control · §5.18 access-rights
src/hooks/collections/users/firstUserSuperAdmin.ts:18: * @security ISO-27001 A.5.18 access-rights genesis-owner
src/hooks/collections/users/guardPrivilege.ts:23: * @security ISO-27002 §5.15 §5.18 access-control privilege-escalation
src/hooks/collections/users/refuseInactive.ts:8: * @security ISO-27001 A.5.18 access-rights — removal or adjustment
src/hooks/collections/users/setCookieBasedOnDomain.ts:23: * @security ISO-27001 A.5.17 authentication-information
src/hooks/collections/users/setCookieBasedOnDomain.ts:24: * @security ISO-27002 §8.5 secure-authentication
src/hooks/collections/users/stampAuth.ts:9: * @security ISO-27001 A.5.17 authentication-information · A.8.15 logging
src/hooks/collections/users/validateAddressHook.ts:27: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/hooks/collections/utility/periodLock.ts:9: * @security ISO-27002 §5.3 segregation-of-duties
src/hooks/fields/tenants/normalizeTenantSlug.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/hooks/fields/users/ensureUniqueUsername.ts:23: * @security ISO-27001 A.5.16 identity-management
src/hooks/fields/users/ensureUniqueUsername.ts:24: * @security ISO-27002 §5.16 identity-management
src/packages/admin/providers/settings.ts:14: * @security ISO-27001 A.5.17 authentication-information — secrets are readable by super-admins only
src/plugins/handles/index.ts:41: * @security ISO-27001 A.8.3 information-access-restriction — a handle is an address, not a key
src/utilities/ability/index.ts:34: * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
src/utilities/ability/index.ts:35: * @security ISO-27002 §5.18 access-rights
src/utilities/ability/roles/index.ts:20: * @security ISO-27001 A.5.15 access-control · ISO-27002 §5.3 segregation-of-duties
src/utilities/ai/durable-objects.ts:21: * @security ISO-27002 §5.3 segregation-of-duties race-free
src/utilities/allow/public/read/tenant/index.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/allow/public/read/tenant/index.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/allow/public/read/tenant/index.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/utilities/allow/public/read/tenant/test.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/allow/public/read/tenant/test.ts:8: * @security ISO-27002 §5.15 access-control
src/utilities/allow/public/read/tenant/test.ts:9: * @security ISO-27002 §8.3 information-access-restriction
src/utilities/auth/context/index.ts:12: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/authenticated/index.ts:4: * @security ISO-27001 A.5.16 identity-management
src/utilities/authenticated/index.ts:5: * @security ISO-27002 §5.15 access-control
src/utilities/authenticated/index.ts:6: * @security ISO-27002 §8.5 secure-authentication
src/utilities/authenticated/test.ts:5: * @security ISO-27002 §5.15 access-control
src/utilities/authenticated/test.ts:6: * @security ISO-27002 §8.5 secure-authentication
src/utilities/billing/stripeWebhookHandlers.test.ts:12: * @security ISO-27001 A.5.17 authentication-information webhook-signing-secret
src/utilities/billing/stripeWebhookHandlers.ts:24: * @security ISO-27001 A.5.14 information-transfer
src/utilities/billing/stripeWebhookHandlers.ts:25: * @security ISO-27002 §8.16 monitoring-activities
src/utilities/billing/test.ts:12: * @security ISO-27001 A.5.17 authentication-information webhook-signing-secret
src/utilities/cmspage/access/superAdminOrTenantAdmin.ts:7: * @security ISO-27001 A.5.18 access-rights
src/utilities/cmspage/access/superAdminOrTenantAdmin.ts:8: * @security ISO-27002 §5.15 access-control
src/utilities/country/client/berlin-group-psd2.ts:19: * @security ISO-27001 A.5.16 identity-management
src/utilities/country/client/berlin-group-psd2.ts:20: * @security ISO-27001 A.5.17 authentication-information
src/utilities/country/client/bg-nap-mtls.ts:16: * @security ISO-27001 A.5.16 identity-management
src/utilities/country/client/bg-nap-mtls.ts:17: * @security ISO-27001 A.8.24 use-of-cryptography
src/utilities/country/client/bg-pades-signer.ts:27: * @security ISO-27001 A.5.16 identity-management
src/utilities/country/client/bg-pades-signer.ts:28: * @security ISO-27001 A.8.24 use-of-cryptography
src/utilities/country/client/sign-cms-node.ts:21: * @security ISO-27001 A.5.16 identity-management
src/utilities/country/client/sign-cms-node.ts:22: * @security ISO-27001 A.8.24 use-of-cryptography
src/utilities/crypto/index.ts:13: * @security NIST SP-800-132 password-based-key-derivation
src/utilities/fetch/remote/file/index.ts:13: * @security ISO-27002 §8.23 web-filtering
src/utilities/get/preview/secret/index.ts:7: * @security ISO-27002 §5.17 authentication-information secret-management
src/utilities/get/tenant/from/request/index.ts:7: * @security ISO-27001 A.5.18 access-rights
src/utilities/get/tenant/from/request/index.ts:8: * @security ISO-27002 §5.15 access-control
src/utilities/get/user/tenant/i/ds/index.ts:6: * @security ISO-27001 A.5.18 access-rights
src/utilities/get/user/tenant/i/ds/index.ts:7: * @security ISO-27002 §5.15 access-control
src/utilities/gl/account/resolver/index.ts:29: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/iso/19011/types/index.ts:25: * @security ISO-27002 §8.15 logging
src/utilities/journal/entry/service/index.ts:19: * @security ISO-27002 §5.3 segregation-of-duties
src/utilities/nist/incits/359/conventions/index.ts:23: * @security ISO-27002 §5.15 access-control
src/utilities/nist/incits/359/conventions/test.ts:7: * @security ISO-27002 §5.15 access-control
src/utilities/nist/incits/359/index.ts:10: * @security ISO-27001 A.5.18 access-rights
src/utilities/nist/incits/359/index.ts:11: * @security ISO-27002 §5.15 access-control
src/utilities/nist/incits/359/index.ts:12: * @security ISO-27002 §5.16 identity-management
src/utilities/nist/incits/359/index.ts:13: * @security ISO-27002 §5.3 segregation-of-duties
src/utilities/nist/incits/359/payload.ts:5: * @security ISO-27001 A.5.18 access-rights
src/utilities/nist/incits/359/payload.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/nist/incits/359/predicates/index.ts:5: * @security ISO-27001 A.5.18 access-rights
src/utilities/nist/incits/359/predicates/index.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/nist/incits/359/predicates/test.ts:6: * @security ISO-27001 A.5.18 access-rights
src/utilities/nist/incits/359/predicates/test.ts:7: * @security ISO-27002 §5.15 access-control
src/utilities/nist/incits/359/types.ts:5: * @security ISO-27001 A.5.18 access-rights
src/utilities/nist/incits/359/types.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/nist/sp/800/108/kdf.ts:14: * @security ISO-27001 A.8.24 use-of-cryptography
src/utilities/nist/sp/800/108/kdf.ts:15: * @security ISO-27002 §8.24 use-of-cryptography
src/utilities/nist/sp/800/108/kdf.ts:16: * @security ISO-27002 §5.17 authentication-information secret-management
src/utilities/nist/sp/800/38/aes-gcm.test.ts:8: * @security ISO-27001 A.8.24 use-of-cryptography
src/utilities/nist/sp/800/38/aes-gcm.test.ts:9: * @security ISO-27002 §8.24 use-of-cryptography
src/utilities/nist/sp/800/38/aes-gcm.ts:14: * @security ISO-27001 A.8.24 use-of-cryptography
src/utilities/nist/sp/800/38/aes-gcm.ts:15: * @security ISO-27002 §8.24 use-of-cryptography
src/utilities/notification/index.ts:22: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/party/roles/index.ts:15: * @security ISO-27001 A.5.15 access-control · A.5.18 access-rights
src/utilities/party/workflow.service.ts:8: * @security ISO-27002 §5.3 segregation-of-duties
src/utilities/remote/media/import/index.ts:11: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/rfc/3986/generate-preview-path.test.ts:8: * @security ISO-27002 §5.15 access-control preview-secret
src/utilities/rfc/3986/generate-preview-path.ts:7: * @security ISO-27002 §5.15 access-control preview-secret
src/utilities/rfc/6585/rate-limit.ts:13: * @security ISO-27001 A.5.16 identity-management
src/utilities/rfc/6585/rate-limit.ts:14: * @security ISO-27001 A.5.17 authentication-information
src/utilities/rfc/6585/rate-limit.ts:15: * @security ISO-27002 §8.5 secure-authentication
src/utilities/roles/groups/index.ts:15: * @security ISO-27002 §5.18 access-rights · §5.15 access-control
src/utilities/roles/separation/index.ts:11: * @security SOX §404 four-eyes (the maker is not the checker)
src/utilities/scope/ability.ts:8: * @security ISO-27001 A.8.3 information-access-restriction
src/utilities/scope/collectionScopes.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/scope/collectionScopes.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/scope/collectionScopes.ts:7: * @security ISO-27002 §8.3 information-access-restriction
src/utilities/scope/constants.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/scope/constants.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/scope/filters.ts:5: * @security ISO-27002 §5.15 access-control
src/utilities/scope/filters.ts:6: * @security ISO-27002 §8.3 information-access-restriction
src/utilities/scope/index.ts:6: * @security ISO-27001 A.5.23 information-security-for-cloud-services tenant-isolation
src/utilities/scope/index.ts:7: * @security ISO-27002 §5.15 access-control
src/utilities/scope/index.ts:8: * @security ISO-27002 §8.3 information-access-restriction
src/utilities/scope/types.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/scope/types.ts:6: * @security ISO-27002 §5.15 access-control
src/utilities/site/tenant/where/index.ts:5: * @security ISO-27001 A.5.23 information-security-for-cloud-services
src/utilities/site/tenant/where/index.ts:6: * @security ISO-27002 §8.3 information-access-restriction
src/utilities/standard/collection/hook/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-field
src/utilities/subscription/gate/index.ts:13: * @security ISO-27002 §5.15 access-control
src/utilities/subscription/gate/index.ts:230: * @security ISO-27002 §5.15 access-control feature-entitlement
src/utilities/subscription/gate/test.ts:9: * @security ISO-27002 §5.15 access-control
src/utilities/tenant/context/index.ts:43: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-config
src/utilities/tenant/remote/secret/index.ts:6: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-keys
src/utilities/tenant/remote/secret/index.ts:7: * @security ISO-27001 A.5.17 authentication-information secret-management
src/utilities/tenant/remote/secret/index.ts:8: * @security ISO-27002 §5.17 secret-management
src/utilities/tenant/remote/secret/index.ts:9: * @security ISO-27002 §8.24 use-of-cryptography
src/utilities/tenants/default/index.ts:13: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/tenants/default/test.ts:5: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/types/auth/index.ts:5: * @security ISO-27001 A.5.16 identity-management
src/utilities/types/auth/index.ts:6: * @security ISO-27001 A.5.18 access-rights
src/utilities/types/auth/index.ts:7: * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
src/utilities/types/auth/index.ts:8: * @security ISO-27002 §5.15 access-control
src/utilities/users/access/isAccessingSelf.ts:4: * @security ISO-27002 §5.15 access-control self-service
src/utilities/users/endpoints/externalUsersLogin.ts:22: * @security ISO-27001 A.5.16 identity-management
src/utilities/users/endpoints/externalUsersLogin.ts:23: * @security ISO-27001 A.5.17 authentication-information
src/utilities/users/endpoints/externalUsersLogin.ts:24: * @security ISO-27002 §8.5 secure-authentication
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
src/access/collections/shared/createMembershipAdminMutateAccess.ts:23: * @audit ISO-19011:2018 audit-trail
src/app/(api)/api/proof/route.ts:19: * @audit ISO-19011:2018 audit-evidence the citation must lead to the evidence
src/app/(api)/api/subscriptions/create/route.ts:12: * @audit ISO-19011:2018 audit-trail
src/app/(api)/api/webhooks/stripe/route.ts:12: * @audit ISO-19011:2018 audit-trail
src/app/(frontend)/next/coherence/route.ts:32: * @audit ISO-19011:2018 reading logged to Analytics Engine (ANALYTICS_AI binding)
src/app/(frontend)/next/seed/route.ts:8: * @audit ISO-19011:2018 audit-trail seed-runs
src/collections/account-reconciliations/index.ts:24: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/collections/account-reconciliations/index.ts:25: * @audit ISO-19011:2018 audit-evidence preparer-reviewer-segregation
src/collections/activities/index.ts:12: * @audit ISO-19011:2018 audit-trail crm-activity
src/collections/ai-suggestions/index.ts:26: * @audit ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail
src/collections/api-audit-events/index.ts:24: * @audit ISO-19011:2018 audit-trail
src/collections/audit-committee-minutes/index.ts:5: * @audit ISO-19011:2018 audit-evidence
src/collections/audit-committees/index.ts:6: * @audit ISO-19011:2018 oversight
src/collections/audit-events/index.ts:51: * @audit ISO-19011:2018 audit-trail
src/collections/audit-evidence/index.ts:6: * @audit ISO-19011:2018 evidence
src/collections/audit-findings/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/collections/audit-reports/index.ts:15: * @audit ISO-19011:2018 reporting
src/collections/audit-samples/index.ts:5: * @audit ISO-19011:2018 sampling-methodology
src/collections/audit-submissions/index.ts:15: * @audit ISO-19011:2018 §6.4 audit-evidence
src/collections/bank-accounts/index.ts:13: * @audit ISO-19011:2018 audit-trail bank-account-master
src/collections/bank-reconciliations/index.ts:19: * @audit ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation
src/collections/bank-statements/index.ts:22: * @audit ISO-19011:2018 audit-trail
src/collections/bank-transactions/index.ts:45: * @audit ISO-19011:2018 audit-trail reconciliation-line-evidence
src/collections/batches/index.ts:23: * @audit ISO-19011:2018 audit-trail lot-genealogy-evidence
src/collections/beneficial-owners/index.ts:8: * @audit ISO-19011:2018 audit-trail ubo-evidence
src/collections/bills-of-materials/index.ts:22: * @audit ISO-19011:2018 audit-trail bom-version-control
src/collections/biological-assets/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-biological-assets
src/collections/bookable-resources/index.ts:17: * @audit ISO-19011:2018 audit-trail resource-master-changes
src/collections/bookings/index.ts:21: * @audit ISO-19011:2018 audit-trail booking-lifecycle
src/collections/budget-planning/index.ts:28: * @audit ISO-19011:2018 audit-trail
src/collections/business-combinations/index.ts:19: * @audit ISO 19011:2018 §6.4.6 audit-evidence-business-combination
src/collections/carbon-emissions/index.ts:21: * @audit ISAE 3410 greenhouse-gas-statements
src/collections/carriers/index.ts:15: * @audit ISO-19011:2018 audit-trail carrier-master
src/collections/cases/index.ts:19: * @audit ISO-19011:2018 audit-trail file·hear·rule·seal
src/collections/commitments/index.ts:31: * @audit ISO-19011:2018 audit-trail authorization-evidence
src/collections/compliance-gaps/index.ts:5: * @audit ISO-19011:2018 nonconformity
src/collections/connections/index.ts:27: * @audit ISO-19011:2018 audit-trail transparent-relationship-ledger
src/collections/consent-records/index.ts:13: * @audit ISO-19011:2018 audit-trail consent-evidence
src/collections/consignment-arrangements/index.ts:25: * @audit ISO-19011:2018 audit-trail consignment-arrangement-evidence
src/collections/consignment-inventory/index.ts:21: * @audit ISO-19011:2018 audit-trail consignment-on-hand-evidence
src/collections/consignment-sales/index.ts:25: * @audit ISO-19011:2018 audit-trail consignment-sale-evidence
src/collections/consolidation-eliminations/index.ts:18: * @audit ISO-19011:2018 audit-trail consolidation-evidence
src/collections/contracts/index.ts:37: * @audit ISO-19011:2018 audit-trail contract-lifecycle
src/collections/control-tests/index.ts:9: * @audit ISO-19011:2018 audit-trail
src/collections/cost-centers/index.ts:19: * @audit ISO-19011:2018 audit-trail
src/collections/cost-variances/index.ts:14: * @audit ISO-19011:2018 audit-trail variance-evidence
src/collections/credit-memos/index.ts:34: * @audit ISO-19011:2018 audit-trail
src/collections/csrd-disclosures/index.ts:22: * @audit ISAE 3000 limited-assurance (rises to reasonable-assurance under CSRD by 2028)
src/collections/currency-rates/index.ts:18: * @audit ISO-19011:2018 audit-trail rate-update
src/collections/customer-segments/index.ts:12: * @audit ISO-19011:2018 audit-trail crm-segmentation
src/collections/customs-declarations/index.ts:17: * @audit ISO-19011:2018 audit-trail customs-evidence
src/collections/data-processing-activities/index.ts:13: * @audit ISO-19011:2018 audit-trail ropa-evidence
src/collections/data-subject-requests/index.ts:16: * @audit ISO-19011:2018 audit-trail dsr-evidence
src/collections/deferred-tax-items/index.ts:19: * @audit ISO 19011:2018 §6.4.6 audit-evidence-deferred-tax
src/collections/depreciation-schedules/index.ts:13: * @audit ISO-19011:2018 audit-trail depreciation-evidence
src/collections/disclosure-checklists/index.ts:6: * @audit ISO-19011:2018 completeness
src/collections/earnings-per-share/index.ts:18: * @audit ISO 19011:2018 §6.4.6 audit-evidence-eps-computation
src/collections/employees/index.ts:19: * @audit ISO-19011:2018 audit-trail employee-master
src/collections/evidence-attestations/index.ts:17: * @audit ISO-19011:2018 audit-trail attestation-evidence
src/collections/expense-reports/index.ts:15: * @audit ISO-19011:2018 audit-trail expense-evidence
src/collections/fair-value-measurements/index.ts:19: * @audit ISO 19011:2018 §6.4.6 audit-evidence-fair-value
src/collections/financial-statements/index.ts:30: * @audit ISO-19011:2018 audit-trail
src/collections/fiscal-devices/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/collections/fiscal-periods/index.ts:31: * @audit ISO-19011:2018 audit-trail status-transition
src/collections/fixed-assets/index.ts:32: * @audit ISO-19011:2018 audit-trail
src/collections/fx-transactions/index.ts:19: * @audit ISO-19011:2018 audit-trail fx-revaluation-evidence
src/collections/gl-accounts/index.ts:14: * @audit ISO-19011:2018 audit-trail chart-of-accounts-change
src/collections/gl-postings/index.ts:33: * @audit ISO-19011:2018 audit-trail
src/collections/goods-receipts/index.ts:26: * @audit ISO-19011:2018 audit-trail receipt-evidence
src/collections/goods-receipts/index.ts:27: * @audit IFRS-15 §31 revenue-substantiation shipment-FOB-date
src/collections/government-grants/index.ts:19: * @audit ISO-19011:2018 audit-trail grant-evidence
src/collections/held-for-sale-classifications/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-disposal-classification
src/collections/insurance-contracts/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
src/collections/intercompany-transactions/index.ts:18: * @audit ISO-19011:2018 audit-trail intercompany-evidence
src/collections/internal-audit-function/index.ts:5: * @audit ISO-19011:2018 audit-programme
src/collections/inventory-movements/index.ts:16: * @audit ISO-19011:2018 audit-trail stock-ledger
src/collections/investment-properties/index.ts:21: * @audit ISO 19011:2018 §6.4.6 audit-evidence-investment-property
src/collections/invoices/index.ts:70: * @audit ISO-19011:2018 audit-trail
src/collections/job-positions/index.ts:11: * @audit ISO-19011:2018 audit-trail headcount-evidence
src/collections/journal-entries/index.ts:31: * @audit ISO-19011:2018 audit-trail
src/collections/kyc-checks/index.ts:9: * @audit ISO-19011:2018 audit-trail kyc-evidence
src/collections/leads/index.ts:15: * @audit ISO-19011:2018 audit-trail crm-pipeline
src/collections/lease-modifications/index.ts:25: * @audit ISO-19011:2018 audit-trail lease-modification-evidence
src/collections/lease-period-postings/index.ts:26: * @audit ISO-19011:2018 audit-trail period-evidence
src/collections/leases/index.ts:55: * @audit ISO-19011:2018 audit-trail
src/collections/leave-requests/index.ts:27: * @audit ISO-19011:2018 audit-trail leave-evidence
src/collections/legal-entities/index.ts:35: * @audit ISO-19011:2018 audit-trail entity-master
src/collections/lot-variants/index.ts:29: * @audit ISO-19011:2018 audit-trail variant-counter-changes
src/collections/lot-work-phases/index.ts:27: * @audit ISO-19011:2018 audit-trail routing-step-changes
src/collections/lots/index.ts:29: * @audit ISO-19011:2018 audit-trail lot-lifecycle confirmed·started·finished·closed
src/collections/maintenance-work-orders/index.ts:21: * @audit ISO-19011:2018 audit-trail work-order-evidence
src/collections/memories/index.ts:32: * @audit Conservation Law 8 content-uuid (per-memory contentUuid)
src/collections/memories/index.ts:33: * @audit Conservation Law 10 referential-harmony (relatedTo graph)
src/collections/messages/index.ts:13: * @audit ISO-19011:2018 audit-trail message-provenance
src/collections/mineral-resource-assets/index.ts:18: * @audit ISO 19011:2018 §6.4.6 audit-evidence-EE-assets
src/collections/operators/index.ts:14: * @audit ISO-19011:2018 audit-trail
src/collections/opportunities/index.ts:12: * @audit ISO-19011:2018 audit-trail crm-pipeline
src/collections/pack-items/index.ts:32: * @audit ISO-19011:2018 audit-trail dispatch line
src/collections/packages/index.ts:16: * @audit ISO-19011:2018 audit-trail packing-evidence
src/collections/packs/index.ts:36: * @audit ISO-19011:2018 audit-trail dispatch
src/collections/payment-allocations/index.ts:22: * @audit ISO-19011:2018 audit-trail allocation-evidence
src/collections/payment-runs/index.ts:29: * @audit ISO-19011:2018 audit-trail
src/collections/payroll-runs/index.ts:27: * @audit ISO-19011:2018 audit-trail payroll-evidence
src/collections/performance-obligations/index.ts:29: * @audit ISO-19011:2018 audit-trail po-satisfaction
src/collections/performance-reviews/index.ts:11: * @audit ISO-19011:2018 audit-trail performance-evidence
src/collections/period-end-adjustments/index.ts:24: * @audit ISO-19011:2018 audit-trail
src/collections/prior-period-adjustments/index.ts:16: * @audit ISO-19011:2018 audit-trail prior-period-restatement
src/collections/production-receipts/index.ts:16: * @audit ISO-19011:2018 audit-trail production-receipt-evidence
src/collections/project-milestones/index.ts:15: * @audit ISO-19011:2018 audit-trail milestone-evidence
src/collections/project-tasks/index.ts:16: * @audit ISO-19011:2018 audit-trail wbs-evidence
src/collections/projects/index.ts:26: * @audit ISO-19011:2018 audit-trail wip-evidence
src/collections/properties/index.ts:22: * @audit ISO-19011:2018 audit-trail property-master-changes
src/collections/provisions/index.ts:34: * @audit ISO-19011:2018 audit-trail provision-evidence
src/collections/quality-inspections/index.ts:14: * @audit ISO-19011:2018 audit-trail inspection-evidence
src/collections/receipts/index.ts:20: * @audit ISO-19011:2018 audit-trail
src/collections/recruiting-pipeline/index.ts:14: * @audit ISO-19011:2018 audit-trail recruiting-evidence
src/collections/recurring-journals/index.ts:21: * @audit ISO-19011:2018 audit-trail recurring-evidence
src/collections/regulatory-deferral-accounts/index.ts:15: * @audit ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral
src/collections/returns/index.ts:9: * @audit ISO-19011:2018 audit-trail rma-evidence
src/collections/rounding-adjustments/index.ts:15: * @audit ISO-19011:2018 audit-trail rounding-evidence
src/collections/sales-commissions/index.ts:16: * @audit ISO-19011:2018 audit-trail commission-evidence
src/collections/sales/index.ts:31: * @audit ISO-19011:2018 audit-trail
src/collections/sectors/index.ts:22: * @audit ISO-19011:2018 audit-trail transparent-societal-ledger
src/collections/share-based-payments/index.ts:17: * @audit ISO 19011:2018 §6.4.6 audit-evidence-equity-grants
src/collections/shares/index.ts:36: * @audit Conservation Law 59 uuid-based-sharing-with-rbac
src/collections/shipments/index.ts:7: * @audit ISO-19011:2018 audit-trail fulfillment-evidence
src/collections/spaces/index.ts:14: * @audit ISO-19011:2018 audit-trail space-master-changes
src/collections/standards/index.ts:29: * @audit Conservation Law 27 standards-as-live-objects
src/collections/standards/index.ts:30: * @audit Conservation Law 28 standards-supersession-tracking
src/collections/standards/index.ts:31: * @audit Conservation Law 38 mcp-tool-standardization
src/collections/taggings/index.ts:32: * @audit ISO-19011:2018 audit-trail tagging-provenance
src/collections/tags/index.ts:23: * @audit ISO-19011:2018 audit-trail label-changes
src/collections/tax-calculations/index.ts:21: * @audit ISO-19011:2018 audit-trail
src/collections/tax-returns/index.ts:9: * @audit ISO-19011:2018 audit-trail tax-filing-evidence
src/collections/tenants/index.ts:160:     * @audit ISO-19011:2018 audit-trail config-change
src/collections/terminals/index.ts:15: * @audit ISO-19011:2018 audit-trail
src/collections/test.ts:11: * @audit ISO-19011:2018 §6.4 audit-evidence (every registered collection node verified)
src/collections/time-entries/index.ts:13: * @audit ISO-19011:2018 audit-trail time-tracking-evidence
src/collections/tracking-events/index.ts:15: * @audit ISO-19011:2018 audit-trail shipment-tracking
src/collections/transaction-failures/index.ts:14: * @audit ISO-19011:2018 audit-trail failure-evidence
src/collections/transfer-pricing-files/index.ts:22: * @audit ISO-19011:2018 audit-trail tp-evidence
src/collections/translations/index.ts:40: * @audit Conservation Law 8 content-uuid
src/collections/translations/index.ts:41: * @audit Conservation Law 10 referential-harmony (relatedTo back to the source row)
src/collections/translations/index.ts:42: * @audit ISO 19011:2018 §6.4.6 (translation changes audit-trailed)
src/collections/usage-records/index.ts:20: * @audit ISO-19011:2018 audit-trail usage-evidence
src/collections/users/index.ts:383:     * @audit ISO-19011:2018 audit-trail user-config-change
src/collections/warehouse-locations/index.ts:15: * @audit ISO-19011:2018 audit-trail location-master-changes
src/collections/wip-snapshots/index.ts:20: * @audit ISO-19011:2018 audit-trail wip-evidence
src/collections/work-centers/index.ts:17: * @audit ISO-19011:2018 audit-trail capacity-resource-changes
src/collections/work-orders/index.ts:70: * @audit ISO-19011:2018 audit-trail production-execution
src/collections/work-phases/index.ts:25: * @audit ISO-19011:2018 audit-trail work-phase-definition-changes
src/collections/work-shifts/index.ts:38: * @audit ISO-19011:2018 audit-trail labour-recording
src/collections/workflow-definitions/index.ts:19: * @audit ISO-19011:2018 audit-trail workflow-evidence
src/collections/workflow-instances/index.ts:15: * @audit ISO-19011:2018 §6.4.6 audit-evidence-workflow
src/components/ecommerce/orders/index.ts:72: * @audit ISO-19011:2018 audit-trail
src/components/ecommerce/product/validation/index.ts:8: * @audit ISO-19011:2018 audit-trail
src/components/ecommerce/stripe/tenantConfirmOrder.ts:14: * @audit ISO-19011:2018 audit-trail
src/components/ecommerce/stripe/tenantStripeWebhook.ts:13: * @audit ISO-19011:2018 audit-trail
src/components/ecommerce/transactions/index.ts:31: * @audit ISO-19011:2018 audit-trail
src/components/media/products/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/hooks/collections/business-chain/wireChainProducersFor.ts:20: * @audit ISO 19011:2018 §6.4.6 producer→event traceability via BUSINESS_CHAINS
src/hooks/collections/cmspage/populatePublishedAt.ts:5: * @audit ISO-19011:2018 audit-trail publication-timestamp
src/hooks/collections/invoices-invoice-lines/itemInventory.ts:19: * @audit ISO-19011:2018 audit-trail on-hand-provenance
src/hooks/collections/invoices-payments/paymentAccountingHook.ts:37: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/hooks/collections/invoices/billAccountingHook.ts:20: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/hooks/collections/invoices/invoiceAccountingHook.ts:24: * @audit ISO-19011:2018 audit-trail double-entry-posting
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.test.ts:29: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/lease-period-postings/leasePeriodPostingHook.ts:33: * @audit ISO-19011:2018 audit-trail period-evidence
src/hooks/collections/parties/classifyTaxId.ts:13: * @audit ISO-19011:2018 audit-trail tax-id-classification-evidence
src/hooks/collections/sale/assignSaleUnpHook.ts:17: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/sale/deriveSaleOperatorCodeHook.ts:13: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/sale/emitSaleClosedHook.ts:9: * @audit ISO-19011:2018 audit-trail event-driven
src/hooks/collections/sale/enforceSaleImmutability.ts:14: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/sale/validateReferenceHook.ts:14: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/shared/auditTrailAfterChange.ts:22: * @audit ISO-19011:2018 §6.4.6 audit-evidence-collection
src/hooks/collections/shared/autoPopulateCreatedBy.ts:7: * @audit ISO-19011:2018 audit-trail authorship-attribution
src/hooks/collections/shared/autoSetTimestamp.ts:8: * @audit ISO-19011:2018 audit-trail status-transition-timestamp
src/hooks/collections/shared/bankStatementImportedHook.ts:27: * @audit ISO-19011:2018 audit-trail bank-statement-import
src/hooks/collections/shared/depreciationSchedulePostingHook.ts:24: * @audit ISO-19011:2018 audit-trail period-expense
src/hooks/collections/shared/enforceSegregationOfDuties.ts:12: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/shared/inventoryMovementPostingHook.ts:21: * @audit ISO-19011:2018 audit-trail stock-ledger-evidence
src/hooks/collections/shared/payrollDisbursementHook.test.ts:10: * @audit ISO-19011:2018 audit-trail
src/hooks/collections/shared/payrollDisbursementHook.ts:32: * @audit ISO-19011:2018 audit-trail payroll-disbursement
src/hooks/collections/shared/payrollRunPostingHook.ts:47: * @audit ISO-19011:2018 audit-trail payroll-evidence
src/hooks/collections/shared/periodEndAdjustmentPostingHook.test.ts:14: * @audit ISO-19011:2018 audit-trail period-end-evidence
src/hooks/collections/shared/periodEndAdjustmentPostingHook.ts:32: * @audit ISO-19011:2018 audit-trail period-end-adjustment-evidence
src/hooks/collections/shared/validateBalancedEntry.ts:26: * @audit ISO-19011:2018 audit-trail double-entry-invariant
src/hooks/collections/subscription-plans-subscriptions/emitSubscriptionLifecycleEvents.ts:29: * @audit ISO-19011:2018 audit-trail subscription-lifecycle
src/hooks/collections/taggings/taggingCounterAfterChange.ts:15: * @audit ISO-19011:2018 audit-trail denormalised-aggregate
src/hooks/collections/users/emitOrderLifecycleEvents.ts:26: * @audit ISO-19011:2018 audit-trail order-lifecycle
src/hooks/collections/users/firstUserSuperAdmin.ts:19: * @audit ISO-19011:2018 audit-trail genesis
src/hooks/collections/users/validateAddressHook.ts:25: * @audit ISO-19011:2018 audit-trail address-validation
src/hooks/collections/utility/periodLock.ts:10: * @audit ISO-19011:2018 audit-trail
src/hooks/fields/tenants/normalizeTenantSlug.ts:5: * @audit ISO-19011:2018 audit-trail routing-identity
src/jobs/audit/index.ts:12: * @audit ISO-19011:2018 §6.4 audit-evidence
src/jobs/bnb/rates/sync/index.ts:20: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/jobs/dunning/job/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/payload.config.ts:534:       * @audit ISO-19011:2018 audit-trail dunning-cycle
src/payload.config.ts:554:       * @audit ISO-19011:2018 audit-trail external-system-evidence
src/payload.config.ts:575:       * @audit ISO-19011:2018 §6.4 audit-evidence
src/plugins/naming/index.ts:21: * @audit Conservation Law 8 content-uuid (schema identifiers are uuids too)
src/seed/erpax-product-pages.ts:35: * @audit ISO-19011:2018 audit-trail seed-provenance
src/seed/index.ts:10: * @audit ISO-19011:2018 audit-trail seed-runs
src/utilities/accounting/analysis/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/utilities/accounting/debit/index.ts:14: * @audit ISO-19011:2018 audit-trail double-entry-invariant
src/utilities/accounting/index.ts:13: * @audit re-exports only; the truth lives in nested leaf atoms (debit / reports / analysis / margin)
src/utilities/accounting/reports/index.ts:26: * @audit ISO-19011:2018 audit-trail read-only-queries
src/utilities/address/validation/index.ts:20: * @audit ISO-19011:2018 audit-trail address-validation
src/utilities/agent/team/index.ts:19: * @audit Conservation Law 8 content-uuid · merge set-union (no coordination)
src/utilities/ai/durable-objects.ts:188: * @audit Conservation Law 8 content-uuid (per-leaf)
src/utilities/ai/durable-objects.ts:189: * @audit ISO 19011:2018 §6.4.6 tamper-evident audit-trail
src/utilities/ai/durable-objects.ts:23: * @audit ISO-19011:2018 audit-trail coordination-evidence
src/utilities/audit/trail/write-audit-event.test.ts:17: * @audit Conservation Law 8 content-addressable integrity (chainLeafUuid)
src/utilities/audit/trail/write-audit-event.test.ts:18: * @audit Conservation Law 53 self-referential-closure (pending reconciliation)
src/utilities/audit/trail/write-audit-event.ts:50: * @audit Conservation Law 8 content-addressable integrity
src/utilities/audit/trail/write-audit-event.ts:51: * @audit Conservation Law 53 self-referential-closure (pending-leaf reconciliation)
src/utilities/bank/accounts/payroll/runs/hooks/payroll-run-posting.test.ts:19: * @audit ISO-19011:2018 audit-trail
src/utilities/billing/stripeWebhookHandlers.ts:444: * @audit ISO-19011:2018 audit-trail refund-cash-leg
src/utilities/business/chain/context.ts:17: * @audit ISO-19011:2018 audit-trail seed-evidence
src/utilities/business/chain/run.ts:11: * @audit ISO-19011:2018 §6.4.6 audit-evidence
src/utilities/business/chain/types.ts:21: * @audit ISO-19011:2018 §6.4.6 audit-evidence-process
src/utilities/chain/event/emitter/index.ts:14: * @audit ISO-19011:2018 audit-trail event-emit
src/utilities/cmspage/access/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/cmspage/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/coherence/index.ts:20: * @audit computed from the input trace, never hand-asserted
src/utilities/config/app/collections/index.ts:16: * @audit ISO-19011:2018 audit-trail config-completeness
src/utilities/cost/bits/index.ts:17: * @audit Conservation Law 62 (coverage) — the all-directions cascade
src/utilities/country/api/client/index.ts:16: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/api/client/index.ts:621: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/api/client/index.ts:661: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/api/client/index.ts:694: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/api/client/index.ts:726: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/client/berlin-group-psd2.ts:18: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/client/bg-bank-statement-pdf.ts:34: * @audit ISO-19011:2018 audit-trail bank-statement-evidence
src/utilities/country/client/bg-holidays.ts:19: * @audit ISO-19011:2018 audit-trail business-day-evidence
src/utilities/country/client/bg-hybrid-invoice.ts:19: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/utilities/country/client/bg-nap-mtls.ts:15: * @audit ISO-19011:2018 audit-trail external-system-evidence
src/utilities/country/client/bg-pades-signer.ts:25: * @audit ISO-19011:2018 audit-trail signature-evidence
src/utilities/country/client/bg-vat.ts:20: * @audit ISO-19011:2018 audit-trail vat-calculation-evidence
src/utilities/country/client/pdf-text-extractor-default.ts:20: * @audit ISO-19011:2018 audit-trail document-extraction-evidence
src/utilities/country/client/sign-cms-node.ts:20: * @audit ISO-19011:2018 audit-trail signature-evidence
src/utilities/country/context/index.ts:29: * @audit ISO-19011:2018 audit-trail country-decision-evidence
src/utilities/depreciation/service/index.ts:28: * @audit ISO-19011:2018 audit-trail depreciation-evidence
src/utilities/digit/index.ts:6: * @audit the digit address is computed from the live matrix, never hand-maintained
src/utilities/diversity/index.ts:15: * @audit computed, never hand-asserted
src/utilities/emit/domain/event/index.ts:16: * @audit ISO-19011:2018 audit-trail event-log
src/utilities/en/16931/collection-alignment.test.ts:11: * @audit ISO-19011:2018 audit-trail
src/utilities/error/codedError.ts:11: * @audit ISO-19011:2018 audit-trail
src/utilities/error/index.ts:12: * @audit ISO-19011:2018 audit-trail error-tracing
src/utilities/error/registry.ts:11: * @audit ISO-19011:2018 audit-trail
src/utilities/etsi/en/319/142/profile.ts:25: * @audit ISO-19011:2018 audit-trail signature-evidence
src/utilities/etsi/en/319/142/signature-dictionary.test.ts:8: * @audit ISO-19011:2018 audit-trail signature-evidence
src/utilities/etsi/en/319/142/signature-dictionary.ts:23: * @audit ISO-19011:2018 audit-trail signature-evidence
src/utilities/event/emitter/service/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/utilities/factory/collection/base/index.ts:188: * @audit ISO 19011:2018 §6.4.6 — backwards-compat path for collections
src/utilities/factory/collection/test.ts:14: * @audit ISO 19011:2018 §6.4.6 — regression-guard for shared-field collision
src/utilities/factory/recompute-parent-aggregates.ts:27: * @audit ISO-19011:2018 audit-trail derived-total-provenance
src/utilities/field/index.ts:7: * @audit Flat namespace to eliminate circular imports and duplicate definitions.
src/utilities/gl/account/resolver/index.ts:27: * @audit ISO-19011:2018 audit-trail account-resolution
src/utilities/integrity/content/index.ts:46: * @audit ISO 19011:2018 §6.4.6 audit-evidence
src/utilities/integrity/envelope/index.ts:57: * @audit ISO 19011:2018 §6.4.6 (every encrypt/decrypt produces an audit-events row)
src/utilities/integrity/resource-bound.ts:33: * @audit Conservation Law 55 (tamper-reversibility-cost) — physical bound
src/utilities/integrity/signatures/index.ts:50: * @audit ISO 19011:2018 §6.4.6 (every verification produces an audit-events row)
src/utilities/integrity/tamper-proof-uuid-field.ts:37: * @audit ISO 19011:2018 §6.4.6
src/utilities/integrity/tamper-reverse-cost.test.ts:15: * @audit Conservation Law 55 tamper-reversibility-cost
src/utilities/integrity/tamper-reverse-cost.ts:49: * @audit Conservation Law 8 + Slice TTTTTTTT (uuid-linked chain)
src/utilities/integrity/tamper-reverse-cost.ts:50: * @audit Conservation Law 23 (self-observation — every dim witnesses every other)
src/utilities/integrity/tamper-reverse-cost.ts:51: * @audit Conservation Law 53 (self-referential closure — internal fallback can replay)
src/utilities/integrity/tamper-reverse-cost.ts:52: * @audit Conservation Law 54 (universal identity element — baseline per dim)
src/utilities/integrity/tamper-reverse-cost.ts:53: * @audit Conservation Law 55 (this module — tamper-reversibility-cost)
src/utilities/integrity/tenant-key-registry.ts:36: * @audit ISO 19011:2018 §6.4.6 (every key fetch produces an audit row)
src/utilities/integrity/type-uuid.ts:55: * @audit ISO 19011:2018 §6.4.6 (type evolution audit-trailed)
src/utilities/integrity/uuid-linked-chain.ts:42: * @audit Conservation Law 8 content-uuid (per-leaf)
src/utilities/integrity/uuid-linked-chain.ts:43: * @audit Conservation Law 9 storage-redundancy (linkable across stores)
src/utilities/integrity/uuid-linked-chain.ts:44: * @audit ISO 19011:2018 §6.4.6 tamper-evident audit evidence
src/utilities/integrity/uuid-ref.ts:28: * @audit ISO 19011:2018 §6.4.6
src/utilities/integrity/uuid-short.ts:43: * @audit ISO 19011:2018 §6.4.6 (UI surfaces audit-trailed for length compliance)
src/utilities/internal/controls/audit/findings/court-docket.ts:12: * @audit ISO-19011:2018 audit-trail self-assessment
src/utilities/invoices/hooks/deriveNumber.ts:9: * @audit ISO-19011:2018 audit-trail document-identity
src/utilities/invoices/hooks/gl-hooks-emit-events.test.ts:18: * @audit ISO-19011:2018 audit-trail event-driven-posting
src/utilities/invoices/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/invoices/invoice/lines/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/invoices/payments/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/iso/13616/iban-bg.ts:24: * @audit ISO-19011:2018 audit-trail bank-account-evidence
src/utilities/iso/14289/profile/index.ts:24: * @audit ISO-19011:2018 audit-trail accessibility-conformance-evidence
src/utilities/iso/14289/profile/test.ts:7: * @audit ISO-19011:2018 audit-trail accessibility-conformance-evidence
src/utilities/iso/19005/metadata.ts:12: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/utilities/iso/19005/profile/index.ts:21: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/utilities/iso/19005/profile/test.ts:8: * @audit ISO-19011:2018 audit-trail document-archival-evidence
src/utilities/iso/19011/types/index.ts:89: * @audit ISO-19011:2018 §6.4.6 audit-evidence
src/utilities/iso/20022/types/index.ts:15: * @audit ISO-19011:2018 audit-trail
src/utilities/iso/27002/coverage.ts:12: * @audit ISO-19011:2018 audit-trail control-coverage-evidence
src/utilities/items/inventory/movements/hooks/inventory-adjusted-event.test.ts:14: * @audit ISO-19011:2018 audit-trail
src/utilities/journal/entry/service/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/utilities/localize/index.ts:44: * @audit Conservation Law 8 (content-uuid) · 55 (tamper-reverse-cost) · 62 (coverage)
src/utilities/message/index.ts:12: * @audit the uuid is self-decoding — every channel is an independent verify level
src/utilities/naredba/n/18/unp/index.ts:20: * @audit ISO-19011:2018 audit-trail (УНП ties order ↔ fiscal-receipt ↔ payment)
src/utilities/navigation/index.ts:12: * @audit nav · group · route computed from the path only — never assigned
src/utilities/nist/incits/359/payload.ts:7: * @audit ISO-19011:2018 audit-trail role-assignment
src/utilities/notification/index.ts:21: * @audit ISO-19011:2018 audit-trail notification-evidence
src/utilities/notification/subscriber.ts:16: * @audit ISO-19011:2018 §6.4.6 audit-evidence-notification
src/utilities/party/aging.service.ts:14: * @audit ISO-19011:2018 audit-trail
src/utilities/party/workflow.service.ts:7: * @audit ISO-19011:2018 audit-trail state-transitions
src/utilities/persist/api/audit/event/index.ts:17: * @audit ISO-19011:2018 audit-trail
src/utilities/pixel/index.ts:14: * @audit colour computed from the uuid's digit, never painted on
src/utilities/posts/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/receivable/aging/index.ts:13: * @audit ISO-19011:2018 audit-trail
src/utilities/receivable/allowance/index.ts:10: * @audit ISO-19011:2018 audit-trail
src/utilities/receivable/workflow/index.ts:12: * @audit ISO-19011:2018 audit-trail state-transitions
src/utilities/remote/media/import/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/utilities/rodin/index.ts:25: * @audit every quantity computed from the residues / live matrix, never asserted
src/utilities/roles/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/roles/registry/index.ts:23: * @audit ISO-19011:2018 §6.4.6 audit-evidence-role-traceability
src/utilities/saf/t/types/index.ts:18: * @audit ISO-19011:2018 audit-trail tax-authority-audit-file
src/utilities/safety/mode/index.ts:45: * @audit Conservation Law 58 uuid-self-protection
src/utilities/safety/mode/test.ts:15: * @audit Conservation Law 58 uuid-self-protection
src/utilities/sale/audit-file.ts:19: * @audit ISO-19011:2018 §6.4 audit-evidence
src/utilities/sale/fiscal/receipt/index.ts:15: * @audit ISO-19011:2018 audit-trail
src/utilities/sale/fiscal/revenue/index.ts:8: * @audit ISO-19011:2018 audit-trail event-driven
src/utilities/sale/order-fiscalization.ts:13: * @audit ISO-19011:2018 audit-trail event-driven
src/utilities/sale/receipt-subscriber.ts:9: * @audit ISO-19011:2018 audit-trail event-driven
src/utilities/sale/reverse/index.ts:13: * @audit ISO-19011:2018 audit-trail
src/utilities/sale/submit-audit-file.ts:10: * @audit ISO-19011:2018 §6.4 audit-evidence
src/utilities/sale/subscription-fiscalization.ts:17: * @audit ISO-19011:2018 audit-trail event-driven
src/utilities/sale/virtual-device.ts:17: * @audit ISO-19011:2018 audit-trail
src/utilities/scope/collectionScopes.ts:8: * @audit ISO-19011:2018 audit-trail
src/utilities/scope/constants.ts:7: * @audit ISO-19011:2018 audit-trail draft-vs-published
src/utilities/scope/filters.ts:7: * @audit ISO-19011:2018 audit-trail draft-vs-published
src/utilities/shareds/versionedDrafts.ts:9: * @audit ISO-19011:2018 audit-trail content-versioning
src/utilities/standard/collection/hook/index.ts:12: * @audit ISO-19011:2018 audit-trail
src/utilities/subscription/plans/subscriptions/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/tamper/cost/index.ts:54: * @audit Conservation Law 55/60 (tamper cost cascades through the uuid-chain)
src/utilities/tamper/cost/index.ts:55: * @audit Conservation Law 62 (coverage) enlarged by the invariant (semantic) + replica axes
src/utilities/tenant/context/index.ts:45: * @audit ISO-19011:2018 audit-trail config-cascade-resolution
src/utilities/tenants/access/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/tenants/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/testing/config/discovery/index.ts:11: * @audit ISO-19011:2018 audit-trail config-discovery
src/utilities/testing/index.ts:13: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/utilities/testing/test-seed-factory.test.ts:7: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/utilities/testing/test/seed/factory/index.ts:19: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/utilities/testing/test/seed/factory/index.ts:39: * @audit ISO-19011:2018 audit-trail seed-validation
src/utilities/testing/test/seed/factory/index.ts:58: * @audit ISO-19011:2018 audit-trail seed-evidence-traceability
src/utilities/testing/test/setup/index.ts:7: * @audit ISO-19011:2018 audit-trail seed-cleanup
src/utilities/types/events/index.ts:269: * @audit ISO-19011:2018 audit-trail stock-ledger-evidence
src/utilities/types/events/index.ts:316: * @audit ISO-19011:2018 audit-trail period-expense
src/utilities/types/events/index.ts:410: * @audit ISO-19011:2018 audit-trail subscription-lifecycle
src/utilities/types/events/index.ts:498: * @audit ISO-19011:2018 audit-trail order-lifecycle
src/utilities/types/events/index.ts:8: * @audit ISO-19011:2018 audit-trail event-log
src/utilities/types/parties/index.ts:53: * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
src/utilities/un/edifact/types/index.ts:11: * @audit ISO-19011:2018 audit-trail
src/utilities/users/access/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/users/endpoints/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/users/hooks/index.ts:8: * @audit ISO-19011:2018 audit-trail collection-module-boundary
src/utilities/utility/aging-dry-keys.test.ts:19: * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
src/utilities/utility/calculations.ts:152: * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
src/utilities/utility/depreciation-methods.test.ts:16: * @audit ISO-19011:2018 audit-trail period-expense-evidence
src/utilities/uuid/format/index.test.ts:18: * @audit Conservation Law 61 uuid-carries-features
src/utilities/uuid/format/index.ts:67: * @audit Conservation Law 61 uuid-carries-features
src/utilities/uuid/matrix/generated.ts:11: * @audit aura gap=0 parity (.claude/skills/aura/scan.mjs)
src/utilities/uuid/share/index.test.ts:17: * @audit Conservation Law 59 uuid-based-sharing-with-rbac
src/utilities/uuid/share/index.ts:51: * @audit Conservation Law 59 uuid-based-sharing
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
src/blocks/form/Component.tsx:22: * @quality ISO-25010 usability form-rendering
src/utilities/horo/index.ts:24: * @quality ISO-25010 maintainability bounded-stable-state-space
src/utilities/types/sti/index.ts:16: * @quality ISO-25010 maintainability discriminated-subtype-safety
```
