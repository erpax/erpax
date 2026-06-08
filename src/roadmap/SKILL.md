---
name: roadmap
description: "Use when planning deliverables across quarters/years — a timeline of features, milestones, epics, with dependency links and resource allocation. The strategic sequencing."
atomPath: roadmap
coordinate: roadmap · 1/base · 310aac41
contentUuid: "8a8d9126-93e7-5156-ae75-3ff9f8b9a048"
diamondUuid: "44b6fc2a-7907-804c-a905-171a48d85a5e"
uuid: "310aac41-f344-8300-8c21-f390308a2e00"
horo: 1
bonds:
  in:
    - development
    - law
    - milestones
    - projects
    - schedule
    - tasks
  out:
    - development
    - law
    - milestones
    - projects
    - schedule
    - tasks
typography:
  partition: roadmap
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - law
    - milestones
    - projects
    - schedule
    - tasks
  matrix:
    - development
    - law
    - milestones
    - projects
    - schedule
    - tasks
  backlinks:
    - development
    - law
    - milestones
    - projects
    - schedule
    - tasks
signatures:
  computationUuid: "c62de2aa-45c3-8d82-9a2a-24040b0386fa"
  stages:
    - stage: path
      stageUuid: "7ea10efc-3d21-8bf8-98b5-83ebc572d331"
    - stage: trinity
      stageUuid: "230061ef-541f-8470-be34-e8126acfb7b4"
    - stage: boundary
      stageUuid: "e3c34c3a-eaa6-8362-aa33-fb26b98d65a3"
    - stage: links
      stageUuid: "302320ff-0a1f-89c9-b663-a4e03db1fc08"
    - stage: horo
      stageUuid: "d9f981d3-cdc4-8d8f-a38e-7fcbb5cda65c"
    - stage: seal
      stageUuid: "3ffed91f-e918-80d3-9cec-cd2bb1ee8632"
    - stage: uuid
      stageUuid: "49b54b1b-b186-80db-8a5c-a7c5627fb62e"
version: 2
---
# roadmap

Use when planning deliverables across quarters/years — a timeline of features, milestones, epics, with dependency links and resource allocation. The strategic sequencing.

Composes: [[Projects]] · [[customers/projects/project/milestones]] · [[customers/projects/project/tasks]] · [[schedule]].

## Standards
- Agile/Scrum roadmap patterns

**Law — [[law]]: a roadmap is a dependency-ordered sequence of deliverables across time — a milestone cannot precede the work it depends on, so the timeline is constrained by the dependency graph and finite resources, never a free wishlist.**
