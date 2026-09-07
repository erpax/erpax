---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 2/share · 0de619e5"
contentUuid: "e1a6d79d-979e-5abc-a839-1ceed9525c15"
diamondUuid: "10d0f9dd-11cf-8bc8-baae-b9e1f1c3f3d5"
uuid: "0de619e5-ae13-8ce2-a552-58dd303bd0b4"
horo: 2
typography:
  partition: scheduled
  bondDegree: 13
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "bfaa534e-2520-8473-914b-d6d2afbb45c3"
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
      stageUuid: "cc3d32f0-8c5c-86c7-854a-723a39488e1c"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "bcac592d-1353-86c5-b87f-ff66d4acd581"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
