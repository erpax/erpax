---
name: audience
description: "Use when asking what each USER is being told that nothing can contradict — projects every unproven @invariant and confessed stub onto the reader it is addressed to (director, auditor, compliance-officer, accountant …), because a claim citing SOX §302 is addressed to whoever signs it. The readers are computed from the config; the role→standard map is declared in the open. Run: tsx src/rules/audience/index.ts"
---

# audience — a claim is addressed to someone

**Every catastrophe this corpus produced was a lie only one reader could see, addressed to a reader nobody asked.**

| the lie | who it was addressed to |
| --- | --- |
| the cash flow statement hardcoded to `-100000` / `50000`, under `@compliance SOX §302` | **§302 is the DIRECTOR's personal certification** that the report contains no untrue statement of material fact |
| the period lock: a commented-out query inside an **empty `try`**, under `@standard SOX:2002` | **§404 is the AUDITOR's control** — you cannot post to a closed period |
| the audit leaf: reversible base64 over the first 24 bytes, under *"tamper detection"* | the **auditor** and the **НАП inspector** are the only ones who would ever recompute it |
| 46 dead statutory pointers | the **compliance-officer**'s clause→code trace, and nobody walks it but them |

A developer reading those files sees plausible code. **The defect exists only from the seat of the person the claim is addressed to.** So this gate asks the question no other one asks: not *is the code correct*, but **what is each user being told that nothing can contradict?**

It is the law of [[perspective]] — one content, N views, derived never stored; the same invoice row is AR from the seller and AP from the buyer — turned on the **corpus itself**. One corpus, fourteen readers, each told a different story.

## The measurement (2026-07-16)

```
224 unproven claim(s) across 7 reader(s)

  69  auditor              45 file(s) · 39 confessed stub(s)
  59  audit-staff          35 file(s) · 30 confessed stub(s)
  34  director             22 file(s) · 17 confessed stub(s)
  23  accountant           14 file(s) · 12 confessed stub(s)
  21  finance              18 file(s) · 18 confessed stub(s)
  16  compliance-officer   13 file(s) · 11 confessed stub(s)
   2  payroll-officer       2 file(s) ·  2 confessed stub(s)
```

**The director faces 34 unproven claims, 17 of which are the code openly confessing it is not real** — in files citing the clause they personally sign. The auditor faces 69.

## Computed vs declared — the honest split

| | |
| --- | --- |
| **COMPUTED** the readers | `UserRole` is `User['roles']` in the generated types — the **config's own answer**, 14 roles, not a list anyone typed |
| **COMPUTED** the surface | a file's own citations, read from its **comments** via [[syntax]]. The file names its audience; this only listens |
| **COMPUTED** the claims | an `@invariant` with no proof beside it, and the code's own confession (*"simplified"*, *"placeholder"*, *"in production …"*) |
| **DECLARED** role → concern | **which standard answers to which reader.** No theorem derives that SOX §302 means *director*. It is written down here, once, in the open, so it can be argued with |

That split is deliberate. **A hand-picked list pretending to be a measurement is the frozen rosetta** ([[rules]]/cycle) — a basis typed once, blind to whatever grew after it. The map here is declared where a reader trips over it, never inferred and never implied.

**Honest boundary.** This proves a claim **faces** a reader with nothing to refute it — never that the claim is **false**. A stub is reported even where a proof exists, because a test does not make `investingCashFlow = -100000` true. The map covers 8 of the 14 roles: `super-admin`, `admin`, `user`, `customer`, `manager`, `viewer` answer to no standard, so nothing is projected onto them — that is a gap in the map, not proof of their innocence. And a file that addresses **nobody** is not judged: a claim in a corner no one reads is [[rules]]/refutable's problem, not this one's.

**Law — [[law]]: every claim has a reader. A claim addressed to someone who SIGNS, with nothing able to refute it, is the shape every catastrophe here took — and it is invisible from every seat except theirs.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: a citation is read by a person.

Composes: [[rules]]/refutable · [[syntax]] · [[perspective]] · [[law]].
