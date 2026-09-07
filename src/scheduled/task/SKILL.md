---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 1/base · f26a1baa"
contentUuid: "be5933c7-9e7c-525c-b018-996c6634dbe1"
diamondUuid: "f3231b1a-185c-818b-a397-84815b7b8baa"
uuid: "f26a1baa-b2a6-8eaa-a847-374c21121648"
horo: 1
typography:
  partition: scheduled
  bondDegree: 13
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "1cf11055-5157-8855-8c86-48101de2c85b"
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
      stageUuid: "cd6b636a-8274-88cd-9f2d-d06c8f62701e"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "2e754e7e-1b8e-8796-8b38-7d24a1f32df4"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
