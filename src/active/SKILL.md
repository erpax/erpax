---
name: active
description: "Use when an entity can be active or inactive — archived customers, disabled accounts, deactivated users. Boolean or select (active/inactive); toggle switches lifecycle state without deletion. Antonym of status when status carries workflow states."
atomPath: active
coordinate: active · 7/descent · 40a6a4f3
contentUuid: "0f21399b-5fee-5018-bf3f-c6f004a25ec9"
diamondUuid: "0ea3f25f-198b-8857-9712-40bbab75a534"
uuid: "40a6a4f3-3ad4-862f-a0dd-af4dc94afe16"
horo: 7
bonds:
  in:
    - fields
    - ingredient
    - law
    - status
  out:
    - fields
    - ingredient
    - law
    - status
typography:
  partition: active
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - fields
    - law
    - status
  matrix:
    - fields
    - ingredient
    - law
    - status
  backlinks:
    - fields
    - ingredient
    - law
    - status
signatures:
  computationUuid: "31d636d2-3abd-8968-bc70-5b5d88fcacf9"
  stages:
    - stage: path
      stageUuid: "325ffae3-880b-8b7f-a2c1-117fceaafc72"
    - stage: trinity
      stageUuid: "bcc78f8b-158b-8af7-ae90-02783f13e5c7"
    - stage: boundary
      stageUuid: "95bce4e9-49cf-86c2-a278-2f85ec61970d"
    - stage: links
      stageUuid: "106a7536-5464-8191-afca-b0365154e245"
    - stage: horo
      stageUuid: "3552c6a3-0637-8474-9aa4-49112067b634"
    - stage: seal
      stageUuid: "ba501e96-d605-8950-8aa0-f57fefd3da22"
    - stage: uuid
      stageUuid: "c2521e8f-9a3b-8235-8756-6a7ec8702877"
version: 2
---
# active

Use when an entity can be active or inactive — archived customers, disabled accounts, deactivated users. Boolean or select (active/inactive); toggle switches lifecycle state without deletion. Antonym of status when status carries workflow states.

Composes: [[fields]] · [[status]].

**Law — [[law]]: active is the lifecycle toggle (active/inactive) that archives or disables an entity without deletion — the antonym of [[status]] when status carries workflow states.**
