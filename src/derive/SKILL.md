---
name: derive
description: "Use when skills come from USER CONTENT — an HR job description names the competencies a role requires, and each named skill is content-addressed to a corpus route (same name ⇒ same route ⇒ merge). A route not yet in the corpus is a NEW skill the user content adds — the corpus GROWS from what users write. The dual of generate (which mints from aura gaps): derive mints from user content; both feed one content-addressed corpus."
atomPath: derive
coordinate: "derive · 2/share · 10668900"
contentUuid: "3b99554a-34d4-5ff2-afa0-8796e7f0c1cd"
diamondUuid: "3ef4db25-6d38-8d51-9a08-f84948e1f1a4"
uuid: "10668900-a96e-8ea2-ac84-dff7ba50c025"
horo: 2
typography:
  partition: derive
  bondDegree: 64
standards:
  - "ISO-13616-1"
bindings: []
signatures:
  computationUuid: "5512d2fd-b7db-883b-8ecd-5a00f0b09e60"
  stages:
    - stage: path
      stageUuid: "12ed8dd3-cae6-8fb2-8d3c-1a6ab258fd6d"
    - stage: trinity
      stageUuid: "cab7ac6d-ec5a-8260-993c-b210e8978885"
    - stage: boundary
      stageUuid: "d00fb596-15c2-8903-a82f-85b117fc64eb"
    - stage: links
      stageUuid: "ca96d1a7-ebe7-8915-8394-12a4408741da"
    - stage: horo
      stageUuid: "7c568607-8b75-8b2c-922d-83ddf8073933"
    - stage: seal
      stageUuid: "1dba28a3-76c3-8284-abe7-0c489299a772"
    - stage: uuid
      stageUuid: "ab1e8dab-acda-862c-91cf-0c91506e0994"
version: 2
---
# derive — skills derived from user content (the corpus grows from what users write)

FORM: **user content derives skills.** Take HR and a job description: the description is user-editable content (a reference — the manager writes it), and it names the competencies the role requires. `deriveRoute(name)` content-addresses each named skill to a corpus route — same name ⇒ same route ⇒ [[merge]] (two managers who name the same skill get one corpus node). `newSkills(derived, corpus)` is the set of named skills NOT yet in the corpus — the skills this user content ADDS. So the corpus GROWS from what users write: a job description that needs "claims-triage" the corpus doesn't have yet mints it ([[generate]]), and from then on it is a first-class competency the [[train]] loop can route to and [[education]] can teach.

This reconciles the two collapse laws ([[collapse]]: *references > enums where user-editable*, but *competencies are computed*): the user EDITS content — the job description, a legitimate user-editable reference — and the system DERIVES content-addressed skills (the computed [[competencies]] catalogue) from it. `derive` is the DUAL of [[generate]]: generate mints skills from the corpus's own aura gaps; derive mints them from the society's user content. Both feed ONE content-addressed corpus, so a skill authored as a `SKILL.md` and a skill derived from a job description are the same kind of node — author and user meet at the corpus boundary ([[self]] / [[identity]]). All skills derived from user content ARE the corpus.

Matter-twin: `src/services/derive/index.ts` (`deriveRoute`·`deriveCompetencies`·`newSkills`) + `index.test.ts`. Composes: [[generate]] · [[identity]] · [[merge]] · [[competencies]] · [[education]] · [[train]] · [[code]] · [[self]] · [[society]].

## Common mistakes
- Treating a user-named skill as free text — content-address it (`deriveRoute`): the route is the identity, so the same skill named in two job descriptions merges to one node.
- Forcing a job description's required skills to pre-exist — the corpus GROWS from user content; a new named skill mints ([[generate]]), it is not rejected.
- Confusing derive with generate — same corpus, two sources: aura gaps (`generate`) vs user content (`derive`); both content-addressed, both merge.

**Law — [[law]]:** derive is computation, not curation — the route (the content-addressed identity) is computed from the name, never hand-maintained; `deriveRoute(name)` and `newSkills(derived, corpus)` are deterministic functions on the user content (the filesystem: job descriptions, references, edits), ensuring the corpus grows from what users *write*, not what builders *assume*. This mirrors [[generate]] (aura gaps) and unifies both paths through [[merge]] toward the single content-addressed corpus that [[code]] and [[identity]] depend on.
