---
name: vendors
description: The vendors collection — Vendors — purchase-side party master
---

# vendors

[[identity]] — [[standard]] party registry for purchase-side operations. Master data for all vendor relationships: legal identity, tax classification, bank details, payment terms, and ledger defaults. Composes [[VendorScorecards]] · [[VendorQuotes]].

## Standards
- ISO-4217:2015 currency-codes
- ISO-3166-1:2020 country-codes via-addresses
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-17442-1:2020 lei
- ISO-20022 pain.001 customer-credit-transfer-initiation
- ISO-20022 pain.008 customer-direct-debit-initiation
- EN-16931:2017 §BG-4 seller
- US-GAAP ASC-405 liabilities
- US-IRS Form-1099 information-return
- GDPR Art.6(1)(b) lawful-basis-contract

Composes: [[VendorScorecards]] · [[VendorQuotes]].
