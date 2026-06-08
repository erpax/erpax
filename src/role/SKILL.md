---
name: role
description: "Use when reasoning about role — Represents additional information about a relationship or property. For example a Role can be used to say that a 'member' role linking some SportsTeam to a player occurred during a"
atomPath: role
coordinate: role · 2/share · 141c641a
contentUuid: "0eb45aff-b7b2-590d-9213-09cdf1ebfb6e"
diamondUuid: "b5dc4105-502f-8527-b009-6e79bfb1edb1"
uuid: "141c641a-dd39-8bf8-b1e6-045edbb893c3"
horo: 2
bonds:
  in:
    - biological
    - chemical
    - educational
    - employee
    - law
    - link
    - name
    - organization
    - performance
    - reference
  out:
    - biological
    - chemical
    - educational
    - employee
    - law
    - link
    - name
    - organization
    - performance
    - reference
typography:
  partition: role
  bondDegree: 0
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - biological
    - chemical
    - educational
    - employee
    - law
    - link
    - name
    - organization
    - performance
  matrix:
    - biological
    - chemical
    - educational
    - employee
    - law
    - link
    - name
    - organization
    - performance
    - reference
  backlinks:
    - biological
    - chemical
    - educational
    - employee
    - law
    - link
    - name
    - organization
    - performance
    - reference
signatures:
  computationUuid: "b3e5a1ed-4ad1-8a06-be5f-9ce8197bb9c6"
  stages:
    - stage: path
      stageUuid: "44cb6f75-f63f-8182-80ee-0c8eaa491acd"
    - stage: trinity
      stageUuid: "e7fbba7e-517c-895c-ac45-d54ab3d63b4f"
    - stage: boundary
      stageUuid: "5bf2c4f3-61ce-8e97-abb7-4fc49dc10f20"
    - stage: links
      stageUuid: "d95b886b-020c-8fef-ac48-7471ed97d487"
    - stage: horo
      stageUuid: "35c60532-d1c9-89d3-bb48-60facf15856c"
    - stage: seal
      stageUuid: "c44821e4-53cd-82b7-8c59-857a340de8c6"
    - stage: uuid
      stageUuid: "ac997f2a-9446-84e1-9f4e-7a3298fac9b2"
version: 2
---
# role

Represents additional information about a relationship or property. For example a Role can be used to say that a 'member' role linking some SportsTeam to a player occurred during a particular time period. Or that a Person's 'actor' role in a Movie was for some particular characterName. Such properties can be attached to a Role entity, which is then associated with the main entities using ordinary properties like 'member' or 'actor'. See also blog post.

Entangled with — [[employee]] · [[link]] · [[organization]] · [[performance]] · [[biological]] · [[chemical]] · [[educational]] · [[name]]

Attested in schema.org — EmployeeRole · LinkRole · OrganizationRole · PerformanceRole · Role · biologicalRole · chemicalRole · educationalRole · roleName

**Law — [[law]]: role is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
