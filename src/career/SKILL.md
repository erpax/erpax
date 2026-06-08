---
name: career
description: "Use when modelling a work career as a life-course trajectory — трудова кариера — a sequence of positions on the harmonic allocation ladder walked over time. Late career is a late band on that ring (the maintenance→disengagement stage before decompression/retirement) where accumulated experience peaks against skill obsolescence and the status sign can flip with age. Derive the stage from the sequence and time; never store it."
atomPath: career
coordinate: career · 1/base · 3cce1e87
contentUuid: "b1f927bc-1b64-5d95-86ec-9cc1f57561a5"
diamondUuid: "8740fe6c-3a74-8642-a8e3-81b38e966183"
uuid: "3cce1e87-031e-847b-8096-c9c0ad1bd63e"
horo: 1
bonds:
  in:
    - age
    - allocation
    - cohort
    - crisis
    - decompression
    - health
    - horo
    - law
    - market
    - positions
    - sequence
    - status
    - time
    - wellbeing
  out:
    - age
    - allocation
    - cohort
    - crisis
    - decompression
    - health
    - horo
    - law
    - market
    - positions
    - sequence
    - status
    - time
    - wellbeing
typography:
  partition: career
  bondDegree: 45
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - age
    - allocation
    - cohort
    - crisis
    - decompression
    - health
    - horo
    - law
    - market
    - positions
    - sequence
    - status
    - time
    - wellbeing
  matrix:
    - age
    - allocation
    - cohort
    - crisis
    - decompression
    - health
    - horo
    - law
    - market
    - positions
    - sequence
    - status
    - time
    - wellbeing
  backlinks:
    - age
    - allocation
    - cohort
    - crisis
    - decompression
    - health
    - horo
    - law
    - market
    - positions
    - sequence
    - status
    - time
    - wellbeing
signatures:
  computationUuid: "6c5ef82b-5c26-843e-a237-670c5bf1f4d0"
  stages:
    - stage: path
      stageUuid: "1f10997f-d335-85d2-8b50-538c4fff47ff"
    - stage: trinity
      stageUuid: "60507b89-692b-8b8b-b7cf-02761fb5d08a"
    - stage: boundary
      stageUuid: "5c1d2c4c-5f72-85cc-a4b6-6985355e50fd"
    - stage: links
      stageUuid: "02114f3f-0dd1-8208-8ccd-80b78d603ff7"
    - stage: horo
      stageUuid: "6e70b40e-8443-8cb0-a8c0-e39a686ec939"
    - stage: seal
      stageUuid: "79441d6a-951e-8437-9fb8-d33ae5406b3e"
    - stage: uuid
      stageUuid: "2fec4e8b-03ec-8de7-921e-3ccc441125b2"
version: 2
---
# career — the life-course work trajectory, a sequence of positions (трудова кариера)

A **career** (*трудова кариера*) is not a job but a **trajectory**: a [[sequence]] of [[positions]] on the [[allocation]] harmonic ladder, walked by one actor over [[time]] — the ordered prev/next [[horo]] ring of a working life. Life-course theory reads it as a path shaped by **timing, [[cohort]], linked lives, and agency** (Elder): the same position entered early vs late, in boom vs [[crisis]], yields different lives.

**Stages, and why late career is special.** The trajectory runs entry/establishment → mid/maintenance → **late** → disengagement (Super). **Late career is the maintenance→disengagement band** — the positions just before [[decompression]], which in erpax is literally the retirement transition (the dive's controlled return to the surface: pay off-gassing its accumulated leverage before the period may close). Here two forces cross: accumulated human and social capital and experience **peak**, while skill obsolescence and the [[health]] gradient pull the other way ([[age]]). And [[status]] peaks then can **flip sign** — ageism makes the older worker a *negative* social sign in the labour market, the very [[status]] sign-flip the [[market]] atom models, here flipped by [[age]]. Bridge employment and phased retirement are simply a **gentler [[decompression]] gradient** off the ladder.

**Derive the stage; never store it.** A career stage is not an enum to persist — it is **computed** from the actor's [[sequence]] position and [[time]] (`late ⟺ within N years of the decompression band`), the same derive-don't-store law [[health]] uses for clinical status. Every late-career worklist is a `where`, not a state machine.

**erpax: a career is one actor's path through the ladder.** Its pay is the [[decompression]] curve (verified-time-leveraged, asymptotic to the role's M-value); its contribution to [[wellbeing]] is large (work is a core wellbeing dimension) and **turns sharply** at the late-career → retirement edge — which is exactly why quality of life *in the late work career* is a distinct question, not a smooth extrapolation of mid-career.

**Job quality is the dominant late-career wellbeing lever (the evidence).** The strongest empirical finding on quality of life *in* late career is that **job quality** — not income, education, gender, or age — is the first-order determinant of an older worker's [[wellbeing]]: across 14 European countries a **wellbeing gradient** runs from worse to better job-quality clusters (higher CASP-12; SHARE, ages 50–64), and across 39 countries job quality's effect is of *similar magnitude to physical [[health]]* and far larger than household income (≈10–19% vs ≈2–5% of variance). Decisively for a weak, [[crisis]]-exposed CEE labour market, the gradient is **steeper where national unemployment is higher** — so in Bulgaria job quality is an *unusually strong* lever on late-career wellbeing. (Observational, not causal; and *prolonged* good job quality shows no extra cumulative benefit — it is the **current** job that grades wellbeing.)

## Standards
- **Life-course theory** — Glen Elder (timing · linked lives · agency · historical context).
- **Career-stage model** — Donald Super (growth → exploration → establishment → maintenance → disengagement).
- **ISCO-08 / ESCO / SFIA** — the occupational and competency coordinates of each [[positions|position]].
- **Active ageing / extended working life** — OECD & EU policy on late-career retention and phased exit.
- **Job quality ⇒ wellbeing (late-career evidence)** — Riva, Lucchini & Piazzoni (2022), *Applied Research in Quality of Life* 17(4): SHARE, ages 50–64, 14 countries — the *wellbeing gradient* (better job-quality cluster ⇒ higher CASP-12), steeper where national unemployment is higher. Green, Lee, Zou & Zhou (2024), *Socio-Economic Review* 22(2):835–857: across 39 countries job quality ≈ physical health and ≫ income/education/gender/age.

Composes: [[sequence]] · [[positions]] · [[allocation]] · [[horo]] · [[time]] · [[cohort]] · [[decompression]] · [[health]] · [[status]] · [[market]] · [[age]] · [[wellbeing]] · [[crisis]].

**Law — [[law]]: a career is not a job but a trajectory — one actor's ordered [[sequence]] of positions on the [[allocation]] [[horo]] ladder walked over time; its stage (late ⟺ within the [[decompression]] band) is derived from sequence-position and time, never stored.**
