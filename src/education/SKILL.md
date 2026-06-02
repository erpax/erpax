---
name: education
description: Use when managing educational institutions — student enrollment, curriculum delivery, academic assessment, teaching schedules, institutional capacity, or education program outcomes in government/nonprofit schools (COFOG 09).
---

# education — the learning-delivery sector (COFOG 09)

The societal Education sector (COFOG **09**): institutions deliver a **curriculum** to **students** through **teaching capacity**, then **assess** the result. The same exchange [[duality]] every erpax sector holds — here the flow is **give → take** inverted: the institution *gives* instruction, the student *takes* enrollment and *gives* back assessment; the equilibrium is the **outcome** (a graded, certified attainment). Self-sufficient: references entities **OUT polymorphically** (a course *is accountable*, a tuition charge *is a transaction*; it never holds a GL account inward — see [[accounting]]).

## Sequence position
A sector is a fractal whole that recomposes the cycle (see [[fractal]], [[sequence]]). Its arc is **4·8** — the build→bind of the delivery flow: `1·2` (fields → collections) realize the entities; **4** (the material/flow cycle) moves a student *through* a program; at **8** the cohorts, terms, and institutions **merge** into one queryable record (see [[merge]]). Ordered by the [[sequence]] `0·3·6·9·1·2·4·8·7·5`.

## The form (hold the law, not the list)
- **One person, many roles.** student · teacher · guardian · examiner are NOT N FK columns — one [[identity]] relationship under N **role contexts** (the same party law [[commerce]] holds). The role IS the context.
- **The academic chain is monotonic; status is DERIVED.** application → enrollment → attendance → assessment → completion/certification. Track counters + grades; **never store** `enrolled?`/`graduated?` — derive them (`graduated ⟺ creditsEarned ≥ creditsRequired`). Every active/at-risk/eligible list is a `where`, not a state machine.
- **Capacity is a measured constraint.** seats · class-size · teaching-load · room-hours are the institutional limit; an over-subscribed section is a query against capacity, not a flag.
- **Assessment is a [[standard]]-bearing record.** a grade is a rate-on-a-scale; certification is a sealed ([[close]]) attainment — a [[versions]] point-in-time snapshot, immutable once awarded.

## The society's shared education (the agent twin)
Beyond the human sector, education is the [[society]]'s LEARNING LOOP — and it is ONE shared corpus, not per-agent silos. All agents draw from the same merged competency corpus (`services/skill-router/competencies`), [[holographic]]: each agent already holds the whole, and the same competency learned by two agents [[merge]]s to one. Learning is acquiring a competency from that shared corpus — the [[train]] gap-route; the loser of a [[competition]] acquiring the winner's approach to re-compete. The harmonic agents learn and lead FIRST because they interact with themselves ([[self]] / [[logic]] `harmonicFirst`): self-sufficient, needing no external coordination. So the same arc the institution runs — deliver → assess → certify — the society runs over its skills: acquire → compete → propagate, sound by [[logic]], selected by [[competition]].

## Purity (forget the corpus)
*Which* collections exist (students, courses, enrollments, grades, institutions, terms) and their exact fields are **matter** — they live in the Payload config / `payload-types.ts` ([[akashic]]), regenerable on demand. Before creating anything, **diff the live config** (DRY). Build entities from reusable field-objects ([[fields]], [[collections]]); wrap them with [[access]] (row-level by institution/guardian) and lifecycle [[hooks]] (credit roll-ups, certification seal); surface program/term lifecycle as period [[open]]/[[close]] and academic milestones as [[flow]] events.

## Common mistakes
- A role (teacher/examiner) as its own FK instead of one context-keyed party relationship.
- An education field pointing INTO [[accounting]] (`course.glAccount`) — invert: the tuition charge IS a transaction, the program IS accountable.
- Storing `status`/`graduated?` instead of deriving it from monotonic credit/assessment counters.
- Cataloguing the realized collections here — that's matter; diff the config instead.
- A mutable grade after award — assessment is sealed; correct via a new versioned record, never an in-place edit.
