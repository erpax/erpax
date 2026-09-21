---
name: staffing
description: "Use when reasoning about staffing — Six atoms already computed the five faces of a position. **Nothing joined them.**"
atomPath: staffing
coordinate: "staffing · 2/share · 1d6af325"
contentUuid: "328cd125-ac8a-5965-8926-43fabf60e4e9"
diamondUuid: "75140d27-0ce5-8318-9729-5bb2158fbb5a"
uuid: "1d6af325-a3c8-84dd-9430-174518f34a89"
horo: 2
typography:
  partition: staffing
  bondDegree: 36
standards:
  - ESCO
  - "ESCO v1.2 / ISCO-08 — occupation and competency classification"
  - "EU 2003/88 Art. 6 — maximum weekly working time (48h) less statutory leave"
  - "NIST INCITS-359 — role-based access control"
  - SFIA
  - SFIA 8 — responsibility levels 1..7
bindings: []
signatures:
  computationUuid: "5fdb1f38-dd48-80da-b8a0-8b1324b5d1e0"
  stages:
    - stage: path
      stageUuid: "e021809f-7038-8884-93a1-2aeb641cae1c"
    - stage: trinity
      stageUuid: "0d8d6b14-9fd9-861c-a794-9c7f0f212c4b"
    - stage: boundary
      stageUuid: "530b1937-2875-8338-88c8-a305afb30eff"
    - stage: links
      stageUuid: "3aa3f958-04f2-8fe3-9298-f120c4e3188c"
    - stage: horo
      stageUuid: "e7cd2ead-787f-8f63-a60d-72e2220a76b7"
    - stage: seal
      stageUuid: "80b88db1-5335-8ed3-b891-1ea1a852e34f"
    - stage: uuid
      stageUuid: "e884f73f-a352-81a3-88e8-f02288e632b4"
version: 2
---
# staffing — a position is declared once, and everything a bank needs from it is derived

Six atoms already computed the five faces of a position. **Nothing joined them.**

| face | atom |
| --- | --- |
| job description | [[position]] — `jobDescription()`, computed, never hand-written |
| competency shortfall | [[competency]]/gap — required − held |
| the plan that closes it | [[train]] — `trainingPlan()`, mandatory first |
| access capability | [[cross]] — the `read < write < sign < admin` lattice |
| cost | [[allocation]] — `anchor × tier` |

So every caller performed the join by hand, which means every caller performed it slightly
differently and **no gate could see the difference**. A fold nobody performs is not a fold — it is
six functions and a convention.

## Why this is the [[rules]]/ask law, applied to hiring

`ask` measured 847 bare questions across the config and named the cure: *if the law, the tenant,
the sequence or the clock determines a value, the system computes it and the user **confirms***.
A position is the purest case. Given the position and the bank's own anchor rate, the title, the
SFIA responsibility, the hourly and annual cost, the missing competencies, the order training must
run in, and the capability the role confers are **all determined** — by SFIA, by the ledger, by the
lattice. **Two inputs. Five faces.** Everything else was never a question.

## The fold decides nothing of its own

Every face is delegated, and the tests assert exactly that: `staff(...).description` must equal
`jobDescription(...)`, the gap must equal `competencyGap(...)`, the rate must equal
`positionHourlyRate(...)`. That is the property that makes it safe to put in front of a bank — a
change to the rate law, the gap maths or the lattice reaches here **without being restated**, which
is the whole reason the hand-rolled join was dangerous.

It also cross-checks what a hand-rolled join loses: `proficient` must be false exactly when a
mandatory step remains, and the plan must be empty exactly when every required level is met. Two
faces that can disagree are two faces someone will one day read separately.

An **empty seat holds nothing** — never everything. `staff()` with no `held` lines returns
`proficient: false` and a plan the length of the requirement, because the alternative reading (no
gaps recorded ⇒ nothing missing) is the default-ALLOW-by-omission that [[rules]]/unraised names.

**Honest boundary.** `FTE_HOURS` is **declared** at 1,720 — a contract term, not a derivation; a
bank on a 35-hour week has a different one, and burying it in a formula would make every annual
figure a claim nobody could argue with. The annual cost excludes employer on-costs, which are a
payroll matter and not this one. `unresolvedCompetencies` reports whether a competency route
**reaches executable matter** — never whether that matter is correct, complete, or fit for a
regulated bank. And the capability is an **input**: this fold carries it onto the position, it does
not derive who may hold what.

**Law — [[law]]: declare the position once. A description, a requirement, an access grant and a
budget that are typed separately will disagree, and the day they disagree nobody will be looking —
so derive all four from the one declaration, and let them fail together or not at all.**

## Standards

- **SFIA 8** — responsibility levels 1..7.
- **ESCO v1.2 / ISCO-08** — occupation and competency classification.
- **NIST INCITS-359** — role-based access control.

Composes: [[position]] · [[competency]]/gap · [[train]] · [[cross]] · [[allocation]] · [[rules]]/ask · [[law]].
