---
name: standard
description: "Use when the Payload API's access must derive from and be gated by its legal surface — the strictest tier a collection's standards demand, and the endpoints that fall below it."
atomPath: access/standard
---

# access/standard — the API access derived from its law

The navigational cross ([[mesh]] standardApiCross) reaches standard → collection → endpoint. This closes the last edge: standard → ACCESS POLICY. Every operation of every collection sits in a SUPERPOSITION of (operation × its cited standards); `requiredAccessTier` collapses that to the strictest floor those standards demand (SOX/§404 · Наредба Н-18 → auditor-grade; GDPR · accounting → role-scoped; ISO-27001 → tenant-isolated), and `accessComplianceGaps` flags any endpoint whose declared access sits below its floor — writes take the full floor, reads relax one rung.

The auditor's clause→code trace now reaches the PERMISSION: a create-invoices call is governed by every standard the invoices atom cites, and if its access is weaker than SOX demands, the gap is named before the write.

**Honest boundary.** The standard→tier map is DECLARED, arguable, in the open — no theorem derives that §404 means delete-restricted; a human contests it here. And this reads the DECLARED access factory lexically; the compiler-final read (boot the config, resolve the real `access` object) is the gate's production path — a factory name is evidence, not proof.

**Law — [[law]]: an API operation carries at least the access its collection's strictest standard demands; an endpoint below its legal floor is a gap named before it can be called.**

Composes: [[mesh]] · [[access]] · [[rules]]/audience · [[law]].
