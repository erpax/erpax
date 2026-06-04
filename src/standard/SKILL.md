---
name: standard
description: Use when implementing or auditing a compliance standard in erpax — IFRS/US-GAAP/SAF-T/ISO/SOX/EN-16931/NIST. Standards are implemented via the skills (each skill is the answer-path holding a standard's form); @standard banners must be true, not decoration.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# standard

Implemented via the skills, never bespoke: each skill is the answer-path holding a standard's form — apply [[accounting]] for IFRS/SOX double-entry, [[currency]] for ISO-4217, [[supto]] for the BG Наредба-Н-18 retail-fiscal regime, [[identity]] for the audit chain, [[port]] for strict-standards. Every `@standard`/`@audit`/`@compliance` banner must be TRUE; a claimed-but-unimplemented standard is an [[aura]] gap. The [[sequence]] keeps many standards mutually compliant — apply the skill, the standard follows.

## Standards

The answer-path principle: applying this skill *implements* the standard. Each entry pins the current in-force version and the one-line form a skill must satisfy to comply.

### ISO 19011:2018 + ISA 500 / ISA 530 (audit evidence & sampling)

- **Version:** ISO 19011:2018 (3rd ed.) — current, no newer edition as of June 2026. Financial-audit evidence/sampling is governed by IAASB **ISA 500** (clarified/redrafted, in force) and **ISA 530** *Audit Sampling* (redrafted, in force); ISA 500 (Revised) is only at IAASB exposure-draft/consultation stage in June 2026 and is **not yet effective**. UK/FRC reissued ISA (UK) 500 and ISA (UK) 530 in September 2025; the international IAASB texts are unchanged.
- **Form:** Every business-relevant state transition (post, reverse, close, reconcile, lifecycle change) produces sufficient, appropriate, append-only audit evidence uniquely traceable to its source — an unalterable record carrying who/what/when/before/after so an auditor can re-derive the outcome (ISO 19011:2018 §6.4; ISA 500 sufficiency/appropriateness; ISA 530 traceable sampling population). Writes emit immutable audit-trail events, reversals link to origin, and nothing in the evidence chain can be silently edited or deleted.
- **Citation care:** ISO 19011 is management-system auditing guidance — it is **not** the authority for financial-statement evidence or statistical sampling. Where a banner means financial-audit evidence/sampling, cite **ISA 500 / ISA 530** explicitly rather than implying ISO 19011 covers it. Do **not** pre-cite "ISA 500 (Revised)" as effective. The `ISO-19011:2018` tag and `§6.4.6` clause pin are correct and need no edition fix.

### SOX 302/404/906 + COSO 2013 + PCAOB AS 2201 (ICFR & integrated audit)

- **Version:** Sarbanes-Oxley Act of 2002 (Pub. L. 107-204), §§302/404/906 unchanged (§906 = 18 U.S.C. §1350); **COSO** *Internal Control–Integrated Framework* **2013** (17 principles / 87 points of focus) — still the authoritative edition (only supplemental guidance since: ICSR 2023, GenAI Feb 2026); **PCAOB AS 2201** — current, not superseded, with amended ¶.09 and new ¶.99 effective 2026-12-15.
- **Form:** Every financially-material state change leaves an append-only, content-addressed audit trail under enforced segregation of duties (requester/approver, maker/checker, four-eyes), so management can certify disclosure controls (§302) and assert ICFR effectiveness (§404) — each assertion mapped to a COSO-2013 component/principle — and the auditor can walk the integrated-audit evidence chain end to end (AS 2201), the §906/18 U.S.C. §1350 officer certification backed by the same immutable record. No material posting without a traceable, dual-controlled, COSO-mapped evidence row.
- **Citation care:** Write **"AS 2201"** (space, no hyphen) — `AS 2201` is non-official; normalize all banners. COSO-2013 components must not carry fair-value citations (e.g. a stray "IFRS 13 §31" on a COSO component is mismatched — drop it). Banners may optionally note the AS 2201 2026-12-15 amendment date, but the standard is not superseded.

## Traditions (prefix removed)
A religion is a [[standard]] — a normative code the society audits its conduct against, exactly as IFRS/SOX govern the books — and the holy book is its source text: the **Torah** (*instruction* — the Law given at Sinai) and the **Ten Commandments** (Exodus 20); *sharia* (the path) and *fiqh*; **dharma** as duty/cosmic law and the Buddhist **Eightfold Path** / *Vinaya* precepts; the **Tao** as the Way; the **Golden Rule** shared across them all. Applying the skill implements the standard — the [[sacred]]/[[profane]] audit measures conduct against it, the [[akashic]] record is the evidence, [[proof]] the verification.

Composes: [[compliance/frameworks]] · [[internal/policies]] · [[Sectors]] · [[Standards]].
