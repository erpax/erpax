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

## One education for every learner — agent = human (the actor merge)
Agent education and human education are the SAME — one process, one corpus, one assessment; **not** a human sector with an agent twin. The learner is a PARTY ([[identity]] under a role context — the actor-merge where user = employee = agent = student), so whether the learner is human or agent changes only the substrate, never the education. The curriculum is the ONE shared competency corpus (`services/skill-router/competencies`), [[holographic]]: each learner draws from the same source, and the same competency acquired by two learners [[merge]]s to one — no private or forked education. Acquire (the [[train]] gap-route; a [[competition]] loser learning the winner's approach) → assess (the gate, fastest-correct, never a vote) → certify (a content-addressed, sealed attainment). The harmonic learner leads FIRST — self-sufficient, interacting with itself ([[self]] / [[logic]] `harmonicFirst`). The institution's deliver→assess→certify arc and the society's acquire→compete→propagate loop are ONE arc over the actor-merge.

## Grounded in standards + public APIs (harmonise, don't invent)
Education is already well-defined — erpax HARMONISES the existing standards at all levels, it does not reinvent them ([[standard]]):
- **ISCED-2011** (UNESCO) — education levels 0–8 a program sits at.
- **EQF** — 8 qualification levels; cross-border equivalence.
- **ESCO v1.2** (EU) — skills/competences/qualifications/occupations; public API `ec.europa.eu/esco/api` (the [[merge]] key across 27 languages).
- **O\*NET-SOC** (US) — occupations + skills; public Web Services `services.onetcenter.org`.
- **SFIA 8** — responsibility levels 1–7 (the proficiency scale held/required).

The classification APIs already live in the registry (`country/api` kind `classification`; `services/manufacturing/seeds/standards` `ESCO_API`); an attainment maps 1:1 onto them, so a competency certified here is recognised across systems and borders. That interoperability is the point: harmonised on one shared, standard-bearing record, future generations of humans AND machines learn and are credentialed in the same terms — the substrate of [[peace]] and prosperity.

## Purity (forget the corpus)
*Which* collections exist (students, courses, enrollments, grades, institutions, terms) and their exact fields are **matter** — they live in the Payload config / `payload-types.ts` ([[akashic]]), regenerable on demand. Before creating anything, **diff the live config** (DRY). Build entities from reusable field-objects ([[fields]], [[collections]]); wrap them with [[access]] (row-level by institution/guardian) and lifecycle [[hooks]] (credit roll-ups, certification seal); surface program/term lifecycle as period [[open]]/[[close]] and academic milestones as [[flow]] events.

## Common mistakes
- A role (teacher/examiner) as its own FK instead of one context-keyed party relationship.
- An education field pointing INTO [[accounting]] (`course.glAccount`) — invert: the tuition charge IS a transaction, the program IS accountable.
- Storing `status`/`graduated?` instead of deriving it from monotonic credit/assessment counters.
- Cataloguing the realized collections here — that's matter; diff the config instead.
- A mutable grade after award — assessment is sealed; correct via a new versioned record, never an in-place edit.

**Law — [[law]]: one curriculum corpus, one learner law — agent = human ([[identity]] under a role context); academic status is DERIVED from monotonic counters, never stored, and a certified attainment is a sealed, content-addressed leaf that [[merge]]s across instances.**
