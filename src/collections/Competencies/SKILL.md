---
name: competencies
description: Use when mapping the one actor-capability taxonomy — agents load it, employees hold it, jobs require it, the skill-router resolves it. The ESCO/SFIA/ISCO/O*NET-merged competency vocabulary; the held-vs-required join.
---

# competencies — the ONE actor-capability taxonomy

The **form**: every actor-capability — a skill an **agent** loads, a competency an **employee** holds, a requirement a **job** demands, and a node of the `SKILL.md` corpus — is the *same* concept named once. User = Employee = Agent are projections of one [[party|party]]; this collection is the shared vocabulary that joins them. Same content ⇒ same id, so the agent capability, the employee's held skill, and the job's required skill are the identical row ([[merge]], [[identity]]). `skillRoute` makes a competency literally a skill-corpus node — the antimatter `SKILL.md` and the matter row are [[duality|duals]].

The law it holds: **a competency is a coordinate shared across standards, not a per-standard list.** The external anchors (`escoUri`, `sfiaCode`, `onetCode`, `iscoOccupation`) are *merge keys* — one node, many cross-walks, no duplication. Proficiency is one SFIA 1-7 scale reused for both held and required, so the gap is pure subtraction: **gap = required − held**. This is the held-vs-required join-table: actor (`users.competencies`) on one side, job (`job-positions.requiredCompetencies`) on the other, scored on the shared scale.

Sequence position **1** — the base of the doubling helix: the identity origin every actor projects from, the root vocabulary the rest of People/HR doubles out of (sequence ring 0·3·6·9·**1**·2·4·8·7·5). It is the [[fractal]] self-same point — the corpus skill the agent loads and the competency the employee holds are one form at two scales; the whole taxonomy is recoverable from any single content-uuid node ([[holographic]]).

Single-folder [[collections|collection]] node: `index.ts` (schema + [[standard]] banners), co-located `seed.ts`. ESCO mono-hierarchy (`parent` self-referential, one `subClassification` per concept), [[fields]] from the base-accounting factories, [[hooks]] via `standardCollectionHooks`, [[access]] via `accountingCollectionAccess`.

Composes: [[identity]] (content-uuid, same content ⇒ same id) · [[merge]] (ESCO/SFIA/ISCO/O*NET cross-walks union into one node) · [[duality]] (held↔required, skill-corpus↔competency-row) · [[fractal]]/[[holographic]] (skill = competency at two scales) · [[accounting]] (held/required as a balanced gap) · [[standard]] (the banners must be true).

## Standards
- ESCO v1.2 skills-pillar mono-hierarchy, four sub-classifications, reusability tiers
- SFIA 8 responsibility-levels 1-7 shared scale (gap = required − held)
- ISCO-08 occupation backbone (ESCO occupations roll up 1:1 to a unit group)
- ISO 30405:2016 recruitment essential-vs-optional requirement
- O*NET-SOC crosswalk anchor (`onetCode`)
- GDPR Art 9 special-category-data competency records
- ISO-27001 A.5.23 cloud-service-tenant-isolation

## Common mistakes
- A separate collection per standard (esco-skills, sfia-skills) — one `competencies`, standards as [[merge]] keys on one node.
- Storing held and required on different scales — one SFIA 1-7 scale both ways, so the gap is subtraction.
- Treating the agent skill and the employee competency as different things — they are the same content-uuid node ([[identity]]).
