---
name: competencies
description: "Use when mapping the one actor-capability taxonomy — agents load it, employees hold it, jobs require it, the skill-router resolves it. Skills ARE competencies, so the catalogue is COMPUTED from the SKILL.md corpus (no stored collection), and a held/required line references a competency by its content-addressed skillRoute."
atomPath: competencies
coordinate: competencies · 5/round · e475a942
contentUuid: "ba8f2f46-7ccd-5e4b-9404-54516c873cb1"
diamondUuid: "80e64ee7-a59e-8bdc-ab2f-116f0abb0540"
uuid: "e475a942-187f-8003-bc0b-1c73928b519d"
horo: 5
bonds:
  in:
    - accounting
    - collapse
    - derive
    - duality
    - education
    - employees
    - fractal
    - holographic
    - identity
    - merge
    - sequence
    - standard
    - train
    - training
  out:
    - accounting
    - collapse
    - derive
    - duality
    - education
    - employees
    - fractal
    - holographic
    - identity
    - merge
    - sequence
    - standard
    - train
    - training
typography:
  partition: competencies
  bondDegree: 42
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - duality
    - education
    - employees
    - fractal
    - holographic
    - identity
    - merge
    - sequence
    - standard
    - train
  matrix:
    - accounting
    - collapse
    - derive
    - duality
    - education
    - employees
    - fractal
    - holographic
    - identity
    - merge
    - sequence
    - standard
    - train
    - training
  backlinks:
    - accounting
    - collapse
    - derive
    - duality
    - education
    - employees
    - fractal
    - holographic
    - identity
    - merge
    - sequence
    - standard
    - train
    - training
signatures:
  computationUuid: "9de848f8-f44f-87bf-b668-aa0007f42348"
  stages:
    - stage: path
      stageUuid: "db860e3d-9d24-8b5a-b88d-49e6e2abfa32"
    - stage: trinity
      stageUuid: "e33229fd-f6c5-8b3f-b16c-1bb8553747f3"
    - stage: boundary
      stageUuid: "c8014664-2d43-8804-ae0a-f6d5f741930d"
    - stage: links
      stageUuid: "f7945035-3f2a-8209-a997-a272da461822"
    - stage: horo
      stageUuid: "84e056f8-8bc9-8c5e-ab10-8ff0279d07e2"
    - stage: seal
      stageUuid: "ba46ad8e-d5df-8dd1-b877-1749bc777e20"
    - stage: uuid
      stageUuid: "29cdf694-693d-89d9-8495-24fed80d6594"
version: 2
---
# competencies — the ONE actor-capability taxonomy (computed from the corpus)

The **form**: every actor-capability — a skill an **agent** loads, a competency an **employee** holds, a requirement a **job** demands — is one node of the `SKILL.md` corpus, named once. User = Employee = Agent are projections of one party; the shared vocabulary that joins them IS the skill corpus. So competencies are not a stored collection — they are COMPUTED from the merged corpus (`services/skill-router/competencies` · `competencyCatalogue()`), and a held/required line carries the competency's **content-addressed `skillRoute`**, not a foreign key. Same content ⇒ same competency ([[merge]], [[identity]]); the agent's skill and the employee's competency are the identical corpus node ([[duality]]: the `SKILL.md` antimatter and its computed competency view are duals).

The law it holds: **a competency is a coordinate shared across standards, computed — not a per-standard stored list.** The external anchors (ESCO/SFIA/ISCO/O*NET) are *merge keys* — one corpus node, many cross-walks. Proficiency is one SFIA 1-7 scale reused for held and required, so the gap is subtraction: **gap = required − held** (the [[train]] loop routes each deficit to the `skillRoute` that fills it). Held (`users.competencies`) vs required (`job-positions.requiredCompetencies`) is the join, scored on the shared scale.

Sequence position **1** — the base of the doubling helix: the identity origin every actor projects from (ring 0·3·6·9·**1**·2·4·8·7·5). The [[fractal]] self-same point — the corpus skill the agent loads and the competency the employee holds are one form at two scales; the whole taxonomy is recoverable from the corpus ([[holographic]]) — which is why the `competencies` COLLECTION collapsed (Stage 2): the corpus IS the table, no materialised rows to drift.

Matter-twin: `src/services/skill-router/competencies.ts` (`competencyCatalogue`·`resolveCompetency`·`nodeToCompetency`) + `src/fields/competency` (the held/required line — `competency` is the skillRoute). Composes: [[identity]] · [[merge]] · [[duality]] · [[fractal]] · [[holographic]] · [[accounting]] · [[standard]] · [[train]] · [[education]] · [[sequence]] · [[Employees]].

## Standards
- ESCO v1.2 skills-pillar mono-hierarchy, four sub-classifications, reusability tiers
- SFIA 8 responsibility-levels 1-7 shared scale (gap = required − held)
- ISCO-08 occupation backbone; O*NET-SOC crosswalk; ISO 30405:2016 essential-vs-optional
- GDPR Art 9 special-category-data competency records

## Common mistakes
- Storing competencies as a collection — they are COMPUTED from the corpus (`competencyCatalogue`); the held/required line references a `skillRoute`, not an FK row.
- Storing held and required on different scales — one SFIA 1-7 scale both ways, so the gap is subtraction.
- Treating the agent skill and the employee competency as different things — they are the same corpus node ([[identity]]).
