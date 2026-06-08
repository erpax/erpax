---
name: reason
description: "Use when documenting why a state changed — reason for rejection, reason for deletion/archival, reason for payment hold, audit finding reason code. Text or select; audit trail metadata. Captures intent."
atomPath: reason
coordinate: reason · 2/share · aa416bf4
contentUuid: "e72d6d2b-2630-57b3-a4a9-b918c1bd4cc8"
diamondUuid: "289f8254-2b46-8c46-ad7e-0199c960a443"
uuid: "aa416bf4-0d28-800f-ac27-e19b14ad960d"
horo: 2
bonds:
  in:
    - audit
    - fields
    - status
  out:
    - audit
    - fields
    - status
typography:
  partition: reason
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - audit
    - fields
    - status
  matrix:
    - audit
    - fields
    - status
  backlinks:
    - audit
    - fields
    - status
signatures:
  computationUuid: "26caadbb-85cf-83eb-920d-a1f76d515f91"
  stages:
    - stage: path
      stageUuid: "146b542d-84b6-8fd5-8b79-13cf4f441812"
    - stage: trinity
      stageUuid: "95cd828b-b82e-888e-a8c9-f913221bba30"
    - stage: boundary
      stageUuid: "cfabada3-320c-8b2a-8924-5accc5c6965d"
    - stage: links
      stageUuid: "6383aa9d-c6e7-8338-bad1-ac28cf20b1fe"
    - stage: horo
      stageUuid: "0fef76ad-bf46-84de-9b54-36fddbdf120d"
    - stage: seal
      stageUuid: "7adb6f1c-9e6b-8158-9dae-168497d31853"
    - stage: uuid
      stageUuid: "539dd666-059c-8a4a-ad24-8e89e5fe8a52"
version: 2
---
# reason

Use when documenting why a state changed — reason for rejection, reason for deletion/archival, reason for payment hold, audit finding reason code. Text or select; audit trail metadata. Captures intent.

Composes: [[fields]] · [[audit]] · [[status]].
