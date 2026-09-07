---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 8/crest · 838c26dc"
contentUuid: "b4bc8922-f4ac-5784-8a91-08ddc927654d"
diamondUuid: "0df7a8b1-64c8-82df-8436-a07c5e7e29f7"
uuid: "838c26dc-697d-80ea-865d-ef37c906598d"
horo: 8
typography:
  partition: scheduled
  bondDegree: 13
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "94273154-df3f-8713-bc75-6d4edbcf62a1"
  stages:
    - stage: path
      stageUuid: "3d0774e6-498a-8a9b-944a-b72f44a401af"
    - stage: trinity
      stageUuid: "256dc650-5c8a-81e8-8e15-d0b4e40c78ed"
    - stage: boundary
      stageUuid: "fb3f402a-bd15-8062-b38c-6328948709e0"
    - stage: links
      stageUuid: "6f108009-3855-81cd-b4cd-d36ad7d62c1e"
    - stage: horo
      stageUuid: "d686dd4c-fdc1-8af5-a1c0-4b9ad809ca3f"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "2d705814-e428-80fb-8355-f5c8221e4ed7"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
