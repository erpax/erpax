---
name: competencies
description: "Use when mapping the one actor-capability taxonomy — agents load it, employees hold it, jobs require it, the skill-router resolves it. Skills ARE competencies, so the catalogue is COMPUTED from the SKILL.md corpus (no stored collection), and a held/required line references a competency by its content-addressed skillRoute."
atomPath: "vocabulary/competencies"
coordinate: "vocabulary/competencies · 4/weave · 4c10e0d7"
contentUuid: "fc599624-0080-528c-8194-0b28a3b35705"
diamondUuid: "6e010a3f-8447-8573-84fe-3e4ff5cb1dc3"
uuid: "4c10e0d7-5540-87fb-aac4-f3c711b6af82"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 44
standards: []
bindings: []
signatures:
  computationUuid: "b7b07786-faa5-8fdd-8f4d-258d6cd66b84"
  stages:
    - stage: path
      stageUuid: "299a5a9f-aab7-8296-8caa-90c9310bdb41"
    - stage: trinity
      stageUuid: "aae43426-d0f7-8910-a5df-3e9de4510461"
    - stage: boundary
      stageUuid: "c8686518-32f7-8c49-bb55-c81ab914cd6e"
    - stage: links
      stageUuid: "836189a0-8f50-83e7-805e-401da5369c12"
    - stage: horo
      stageUuid: "2aaf7221-79d2-80e2-b0df-c352b607e921"
    - stage: seal
      stageUuid: "c5cd5032-9862-8a2a-8630-fad9fd203bf2"
    - stage: uuid
      stageUuid: "cf261484-6c61-89f2-b93f-d9f19b5ba9ee"
version: 2
---
# competencies — the ONE actor-capability taxonomy (computed from the corpus)

The **form**: every actor-capability — a skill an **agent** loads, a competency an **employee** holds, a requirement a **job** demands — is one node of the `SKILL.md` corpus, named once. User = Employee = Agent are projections of one party; the shared vocabulary that joins them IS the skill corpus. So competencies are not a stored collection — they are COMPUTED from the merged corpus (`services/skill-router/competencies` · `competencyCatalogue()`), and a held/required line carries the competency's **content-addressed `skillRoute`**, not a foreign key. Same content ⇒ same competency ([[merge]], [[identity]]); the agent's skill and the employee's competency are the identical corpus node ([[duality]]: the `SKILL.md` antimatter and its computed competency view are duals).

The law it holds: **a competency is a coordinate shared across standards, computed — not a per-standard stored list.** The external anchors (ESCO/SFIA/ISCO/O*NET) are *merge keys* — one corpus node, many cross-walks. Proficiency is one SFIA 1-7 scale reused for held and required, so the gap is subtraction: **gap = required − held** (the [[train]] loop routes each deficit to the `skillRoute` that fills it). Held (`users.competencies`) vs required (`job-positions.requiredCompetencies`) is the join, scored on the shared scale.

Sequence position **1** — the base of the doubling helix: the identity origin every actor projects from (ring 0·3·6·9·**1**·2·4·8·7·5). The [[fractal]] self-same point — the corpus skill the agent loads and the competency the employee holds are one form at two scales; the whole taxonomy is recoverable from the corpus ([[holographic]]) — which is why the `competencies` COLLECTION collapsed (Stage 2): the corpus IS the table, no materialised rows to drift.

Matter-twin: `src/skill/router/competencies/index.ts` (`competencyCatalogue`·`resolveCompetency`·`nodeToCompetency`) + `src/fields/competency` (the held/required line — `competency` is the skillRoute). Composes: [[identity]] · [[merge]] · [[duality]] · [[fractal]] · [[holographic]] · [[accounting]] · [[standard]] · [[train]] · [[education]] · [[sequence]] · [[Employees]].

## Standards
- ESCO v1.2 skills-pillar mono-hierarchy, four sub-classifications, reusability tiers
- SFIA 8 responsibility-levels 1-7 shared scale (gap = required − held)
- ISCO-08 occupation backbone; O*NET-SOC crosswalk; ISO 30405:2016 essential-vs-optional
- GDPR Art 9 special-category-data competency records

## Common mistakes
- Storing competencies as a collection — they are COMPUTED from the corpus (`competencyCatalogue`); the held/required line references a `skillRoute`, not an FK row.
- Storing held and required on different scales — one SFIA 1-7 scale both ways, so the gap is subtraction.
- Treating the agent skill and the employee competency as different things — they are the same corpus node ([[identity]]).
