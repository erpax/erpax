---
name: reference
description: "Use when the statute→code trace must resolve — the gate that a `src/…` path cited in prose or comments actually exists. The corpus fails closed on dead atom links but left dead FILE-PATH pointers ungated, and they rotted: the Наредба Н-18 law pointed at src/standards/naredba-n-18/unp.ts long after the matter moved. A citation that leads nowhere is unreviewable (ISO-19011 §6.4), so a legally usable ERP cannot have one. Zero tolerance on the statutory surface; a down-only ratchet elsewhere."
---

# reference — the citation must lead to the evidence

The corpus already fails closed on a dead atom link ([[confirm]]). A dead **file-path** reference was ungated — and it rotted. `supto/SKILL.md` stated the Наредба Н-18 law and pointed at `src/standards/naredba-n-18/unp.ts`; the matter had moved to `src/naredba/n/18/unp.ts` in the folder-law restructuring, and **ten files** kept the stale pointer. Anyone tracing the statute to its implementation followed a 404.

That is a **legal** defect, not a cosmetic one. Наредба Н-18 requires the software to be documented and inspectable; ISO-19011 §6.4 requires a citation to lead to its evidence. **A law whose pointer is broken cannot be reviewed, so it cannot be relied on.**

## The two gates

| gate | ceiling | why |
| --- | --- | --- |
| `assertStatutoryTraceResolves` | **0** (the law) | Files citing BG statute (`@standard BG`, Наредба, СУПТО, ЗДДС, ЗСч). Legal auditability is not something you ratchet *toward* — the clause→code trace either lands or the citation is unreviewable. |
| `assertReferencesResolve` | ratchet | The whole tree. Cannot be zero today, so it fails closed on **getting worse**, and the ceiling ratchets DOWN as refs are repaired. |

`deadReferences()` scans every `src/…` path in prose and comments and resolves it the way a reader would — the literal path, the folder, or the implied `.ts`/`.tsx`/`.md`/`index.ts` spelling. Generated faces (`LLM.md`, `README.md`, `diamond.json`, `skills.index.ts`, `payload-types.ts`) are skipped: they regenerate, so their references are not hand-maintained.

## The measured state (2026-07-16) — erpax is NOT legally auditable yet

- **97 dead STATUTORY pointers.** The clause→code trace an inspector follows is broken in 97 places, including `audit/submissions` → `src/jobs/salesAuditFileJob.ts` (the **Приложение-38 monthly audit file**), `bg/identifier` → `src/services/bg-identifiers/` (ЕГН), `fiscal/devices/sales` → `src/services/sales/`, `invoices` → `src/standards/en-16931/types.ts`.
- **754 dead pointers tree-wide** — nearly all aimed at the dissolved `src/services/*` and `src/standards/*` structure whose references never followed the code.

**Saying erpax is legally usable while 97 statutory citations lead nowhere would be exactly the claim this gate exists to prevent.** The path to zero is per-case research (each stale target needs its *right* new home), not a blind rewrite — a pointer to the wrong existing file passes the gate and is worse than a dead one.

**Honest boundary.** This proves a reference **resolves**, never that it is the **right** reference — misattribution passes. It closes rot, not correctness. And a resolving trace is a precondition of legal review, never a substitute for it: Наредба Н-18 compliance requires НАП registration and declaration of the СУПТО, and legal counsel — no gate confers that ([[supto]]).

**Law — [[law]]: a citation must lead to its evidence. Every `src/…` path a law points at must exist, and on the statutory surface the ceiling is zero — a moved file carries its references in the same diff, or the law it implements becomes unreviewable.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **BG Наредба Н-18 §СУПТО** — the software must be documented and inspectable.

Composes: [[rules]] · [[confirm]] · [[supto]] · [[law]].
