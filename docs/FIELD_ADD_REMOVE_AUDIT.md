# Field Add / Remove Audit

> Slice NNN (2026-05-10). For each major standard cited by the project, cross-reference the relevant collection against the spec's mandatory and strongly-recommended fields.

> **Iteration v4** — parser bug fixed (was missing dotted paths when `type:` came before `name:`). All schema fields including those in nested groups are now correctly indexed (1444 entries across 41 collections).

> See `docs/STANDARDS.md` §4 for the standards taxonomy and `docs/FIELD_STANDARDS_AUDIT.md` for the per-field classification.

## Summary

- **Standards rules applied:** 23
- **Collections audited:** 20
- **🔴 ADD — mandatory fields missing:** 9
- **🟡 ADD — strongly-recommended fields missing:** 54
- **⚪ REMOVE — redundant/non-standard fields:** 0

## Per-collection findings

### `audit-events`

**Standard:** SOX §404 + ISO 27002 §5.4 segregation-of-duties

🔴 **ADD — mandatory:**

- `eventId` — unique event id

🟡 **ADD — strongly-recommended:**

- `ipAddress|sourceIp` — request origin
- `userAgent` — client agent


### `bank-accounts`

**Standard:** Berlin Group NextGenPSD2 v1.3 account-access

🟡 **ADD — strongly-recommended:**

- `aspspId|aspsp|aspspName` — ASPSP id
- `consentId|consentRef` — PSD2 §10(b)
- `consentExpiresAt|consentValidUntil` — PSD2 §51
- `lastSyncedAt|lastFetchedAt|lastImportAt` — last sync


### `bank-statements`

**Standard:** ISO 20022 camt.053 bank-to-customer-statement

🟡 **ADD — strongly-recommended:**

- `statementPeriodEnd` — FrToDt.ToDtTm
- `reportSequence|electronicSequence|sequenceNumber` — LglSeqNb / ElctrncSeqNb


### `bank-transactions`

**Standard:** ISO 20022 camt.053 §Ntry transaction-line

🟡 **ADD — strongly-recommended:**

- `exchangeRate` — CcyXchg.XchgRate

**Standard:** IFRS IAS-7 statement-of-cash-flows

🟡 **ADD — strongly-recommended:**

- `cashFlowCategory` — IAS-7 §10 classification


### `beneficial-owners`

**Standard:** FATF R.24 + EU AMLD5 UBO

🟡 **ADD — strongly-recommended:**

- `placeOfBirth` — AMLD5 §3(6)(b)


### `consent-records`

**Standard:** GDPR Art.7 conditions-for-consent

🟡 **ADD — strongly-recommended:**

- `consentScope|dataCategories|scope` — Art.13(1)(c)
- `consentExpiresAt|consentValidUntil|expiresAt` — expiry
- `locale|language` — presentation language


### `customers`

**Standard:** IFRS IFRS-9 §5.5 expected-credit-loss

🟡 **ADD — strongly-recommended:**

- `creditRating|riskRating|creditScore` — IFRS-9 §5.5.13
- `eclProvision|allowanceForDoubtfulAccounts|expectedCreditLoss` — IFRS-9 §5.5.5
- `paymentBehaviorScore|dpd|daysPastDueAvg|paymentBehavior` — IFRS-9 §B5.5.17
- `lastPaymentDate|lastPaymentAt` — recency


### `data-processing-activities`

✅ All standards-rules applied are satisfied.


### `data-subject-requests`

**Standard:** GDPR Art.15-22 data-subject-rights

🟡 **ADD — strongly-recommended:**

- `verifiedAt|verificationMethod|verification` — identity verification


### `evidence-attestations`

**Standard:** eIDAS EU 910/2014 + ETSI EN 319 142 PAdES

🔴 **ADD — mandatory:**

- `signingCertificate|certificate|signerCert` — cert chain
- `digest|sha256|hash|messageDigest|signatureDigest` — message-digest

🟡 **ADD — strongly-recommended:**

- `tspToken|timestampToken|timestamp` — PAdES B-T
- `ocspResponse|crl|revocationStatus` — PAdES B-LT
- `signaturePolicy|policyOid` — signature-policy OID
- `signedBy|signer|signerDn` — signer DN


### `financial-statements`

✅ All standards-rules applied are satisfied.


### `fixed-assets`

**Standard:** IFRS IAS-16 property-plant-and-equipment

🟡 **ADD — strongly-recommended:**

- `revaluedAmount|revaluationReserve|revaluationSurplus` — §31
- `impairmentLoss|impairmentReserve` — IAS-36 §59


### `gl-accounts`

**Standard:** IFRS IAS-1 §54 + OECD SAF-T 2.0 §2 chart-of-accounts

🟡 **ADD — strongly-recommended:**

- `groupingCategory|groupingCode` — SAF-T grouping
- `openingBalance` — Opening balance
- `closingBalance` — Closing balance
- `taxonomyReference|xbrlTag|ifrsConceptId` — IFRS Taxonomy
- `costCenter` — Cost-centre dimension


### `inventory-movements`

**Standard:** IFRS IAS-2 inventories

🔴 **ADD — mandatory:**

- `valuationMethod|costMethod|costingMethod` — §25 cost formula

🟡 **ADD — strongly-recommended:**

- `netRealisableValue|nrv` — §28 NRV
- `reversalAmount` — §33


### `invoice-lines`

**Standard:** EN-16931:2017 §BG-25 invoice-line

🔴 **ADD — mandatory:**

- `id|lineId` — BT-126

🟡 **ADD — strongly-recommended:**

- `chargeAmount|pricing.charge` — BT-141
- `grossPrice|listPrice|pricing.grossPrice|pricing.listPrice` — BT-148
- `priceBaseQuantity|pricing.baseQuantity` — BT-149


### `invoices`

**Standard:** EN-16931:2017 §BT-1 / §BG-2 invoice

🔴 **ADD — mandatory:**

- `lineItems|lines` — BG-25

🟡 **ADD — strongly-recommended:**

- `paymentReference|reference|notes.paymentReference` — BT-83
- `contractReference|contract` — BT-12

**Standard:** IFRS IFRS-15 §22 performance-obligations

🔴 **ADD — mandatory:**

- `lineItems|lines` — PObs

🟡 **ADD — strongly-recommended:**

- `contractReference|contract` — §9
- `contractAsset|contractLiability|deferredRevenue|amounts.deferredRevenue` — §B22


### `journal-entries`

**Standard:** OECD SAF-T 2.0 §3 transactions

🟡 **ADD — strongly-recommended:**

- `reversalEntry|originalEntry|reversalOf` — CorrectionEntryID


### `kyc-checks`

**Standard:** FATF R.10 + EU AMLD5 CDD

🟡 **ADD — strongly-recommended:**

- `sourceOfFunds` — Art.13(1)(d)
- `sourceOfWealth` — Art.18
- `sanctionsResult|sanctionsList|sanctionsHits` — sanctions screening
- `reviewDueAt|nextReviewDate` — Art.13(1)(d)


### `leases`

**Standard:** IFRS IFRS-16 leases

🟡 **ADD — strongly-recommended:**

- `purchaseOption|purchaseOptionPrice` — §27(d)


### `payments`

**Standard:** ISO 20022 pain.001 customer-credit-transfer-initiation

🔴 **ADD — mandatory:**

- `debtorAccount|fromAccount|sourceBankAccount` — DbtrAcct.Id
- `creditorAccount|toAccount|targetBankAccount` — CdtrAcct.Id

🟡 **ADD — strongly-recommended:**

- `chargeBearer|payment.chargeBearer` — ChrgBr
- `categoryPurpose|payment.categoryPurpose` — CtgyPurp
- `priority|payment.priority` — InstrPrty
- `localInstrument|payment.localInstrument` — LclInstrm.Cd

**Standard:** PCI-DSS 4.0 card-data-tokenisation

🟡 **ADD — strongly-recommended:**

- `cardLast4|payment.cardLast4` — §3.4 truncation
- `cardBrand|cardNetwork|payment.cardBrand` — authorised display
- `cardExpMonth|payment.cardExpMonth` — exp month
- `cardExpYear|payment.cardExpYear` — exp year
- `paymentToken|stripePaymentMethodId|payment.token` — PCI-DSS token

