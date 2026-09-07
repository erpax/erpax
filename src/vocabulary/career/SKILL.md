---
name: career
description: "Use when modelling a work career as a life-course trajectory — трудова кариера — a sequence of positions on the harmonic allocation ladder walked over time. Late career is a late band on that ring (the maintenance→disengagement stage before decompression/retirement) where accumulated experience peaks against skill obsolescence and the status sign can flip with age. Derive the stage from the sequence and time; never store it."
atomPath: "vocabulary/career"
coordinate: "vocabulary/career · 8/crest · e3939779"
contentUuid: "8e8979b9-4658-5363-bf7b-ba40cb111432"
diamondUuid: "a5ec20bf-aa3a-86b7-91cc-d0f111d2fcc2"
uuid: "e3939779-3784-8197-8685-0ab7e914003d"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "a460a99d-3e69-803a-9038-6026850fa62e"
  stages:
    - stage: path
      stageUuid: "adcfe4be-b41d-80f7-ac09-ba010b6c9b02"
    - stage: trinity
      stageUuid: "76021817-3bbf-89f4-8a8c-41fecb10d347"
    - stage: boundary
      stageUuid: "22c332f9-8c63-83a7-91d1-e965619004bd"
    - stage: links
      stageUuid: "20e25282-1d3e-849e-a94a-9f0953d20194"
    - stage: horo
      stageUuid: "54cc79fe-89d8-82ee-ab28-a4ee12862ec7"
    - stage: seal
      stageUuid: "3a624c56-2377-8f88-b163-52a69ffb2ec5"
    - stage: uuid
      stageUuid: "d91370da-ec94-8a5d-ab14-f39b7621ddd5"
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
