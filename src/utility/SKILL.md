---
name: utility
description: "Use when dividing by anything that could be zero — pick the policy by what the zero MEANS (throw for money, collapse to 0 for an undefined ratio, coerce to 1 for an unset divisor) so ∞ or NaN never enters an account."
atomPath: utility
coordinate: "utility · 1/base · 4b9d9cbb"
contentUuid: "824f2ac0-db2b-5b40-a864-b1cd50dc4290"
diamondUuid: "7f3ac12d-c355-88a2-8072-287bf53d4630"
uuid: "4b9d9cbb-93a9-8fa7-9098-91f3b7f389f6"
horo: 1
typography:
  partition: utility
  bondDegree: 34
standards:
  - "IEEE-754"
bindings: []
signatures:
  computationUuid: "cccca4bd-4f60-8991-870d-78906135d98a"
  stages:
    - stage: path
      stageUuid: "3bd7aaa3-8111-88cb-a65d-18ce8b4fe6ba"
    - stage: trinity
      stageUuid: "6f5be1ef-b0c1-8ec7-8aaf-94da96b43125"
    - stage: boundary
      stageUuid: "4a32f96f-5757-8977-b642-681d36f0d2df"
    - stage: links
      stageUuid: "2fc1f84a-a345-8352-9056-1745bc6f7680"
    - stage: horo
      stageUuid: "ff7f335d-3ebe-84ad-95a1-807156c83137"
    - stage: seal
      stageUuid: "1ba2fdce-af5f-8292-b3ea-afe1aa151de9"
    - stage: uuid
      stageUuid: "1550df2a-744f-84f4-99c8-669a27124859"
version: 2
---
# utility — the operational guard organ (no naked zero)

FORM: **division ⊖ guard = a finite value** — every quotient passes a guard chosen by what the denominator's zero MEANS, so the operational tree NEVER mints ∞ or NaN into a ledger.

erpax runs **three** division-by-zero policies. The zero is not one thing; what it means decides the guard:

1. **THROW** — *money is a bug if /0.* `MoneyFormatter.divideCents` (`src/accounting/fields-money-fix.ts:119`) does `if (divisor === 0) throw new Error('Cannot divide by zero')`. A monetary divide-by-zero is never a value, it is a defect — fail loud, never silently mint ∞ into the books.
2. **COLLAPSE → 0** — *an undefined ratio is 0, not ∞.* `calculateRatio` (`calculations.ts:289-290` `denominator !== 0 ? n/d : 0`) and its callers `calculatePercentage` (L26), `calculateVariancePercent` (L40), the margins + `calculateROA`/`calculateROE` (L296-318), `calculateGrowthRate` (L273), the depreciation methods guarding `usefulLifeYears > 0 ? … : 0` (L85, L121, L145) and units-of-activity (L169), and `calculateWeightedAverageCost` guarding `totalQuantity > 0` (L187) — all return 0. Mirrored by `FinancialAnalysisEngine.safeDiv` (`src/accounting/financial-analysis.ts:545-546` `denominator === 0 ? 0 : n/d`), the single divisor for every ratio/turnover/KPI.
3. **COERCE → identity 1** — *0 means unset.* The etrima wage rule in [[work/orders]] (`src/work/orders/index.ts:181-185`): `machinesPerWorker` returns `n <= 0 ? 1`, so a null/0 divisor snaps to the multiplicative identity before it reaches `pieceRateWage` (L196) and `minutesRemaining` (L206). Dividing by 1 leaves the wage unchanged — the "no machines recorded" case is one worker on one machine, never a divide-by-zero.

THE INVARIANT: no bare division on a possibly-zero denominator escapes a guard; ∞ and NaN never enter an account. This is the operational face of [[zeropoint]] — there is no naked zero — serving [[accounting]], [[balance]], [[allocation]], and [[work/orders]].

Matter-twin: `src/utility/calculations.ts` (+ `period-lock.ts`, `index.ts` barrels both). Sibling guards live in [[accounting]] (`divideCents`, `safeDiv`) and [[work/orders]] (mpw).

Composes: [[zeropoint]] · [[accounting]] · [[balance]] · [[allocation]] · [[work/orders]] · [[number]]

**Law — [[law]]: no bare division on a possibly-zero denominator escapes a guard — the policy (THROW for money, COLLAPSE→0 for an undefined ratio, COERCE→1 for an unset divisor) is chosen by what the zero MEANS, so ∞ and NaN never enter an account ([[zeropoint]]: no naked zero).**

## Common mistakes

- **Wrong policy for the meaning.** Returning 0 from a money divide hides a bug; throwing on a ratio crashes a dashboard; throwing on an unset machine-count rejects a valid row. Choose THROW / COLLAPSE / COERCE by what the zero means, not by habit.
- **A bare `n / d` that bypasses the guard.** Route every quotient through `calculateRatio` / `safeDiv` / `machinesPerWorker`, never inline `/`.
- **Guarding the divisor but not the input.** `pieceRateWage` (L195) also short-circuits non-finite or non-positive `payPerHour`/`unitSeconds`/`produced` to 0 — a finite divisor does not save you from a NaN numerator.
