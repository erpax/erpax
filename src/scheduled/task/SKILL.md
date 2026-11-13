---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 1/base · fe19e6d9"
contentUuid: "3d0fcbc1-69cd-59a8-a2ff-d1c28cf10e14"
diamondUuid: "743c11a5-1a00-812a-9e58-dea1f87a3c3e"
uuid: "fe19e6d9-fb1b-8a40-8b7a-642423213453"
horo: 1
typography:
  partition: scheduled
  bondDegree: 3
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "593c4296-1d8a-8c55-aba5-c90cb90c00b3"
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
      stageUuid: "15156bd2-4160-866e-a4d7-f95e4ed2e184"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "464fcece-09e5-8d97-b0af-bfb123ed30ba"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
