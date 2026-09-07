---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 1/base · bbb7e700"
contentUuid: "42878f68-bdd5-5d18-832f-b4ebf91609af"
diamondUuid: "d7a94ccc-ac65-8399-8274-255222b98b2d"
uuid: "bbb7e700-ebf0-8379-83b6-fcac4df44d51"
horo: 1
typography:
  partition: scheduled
  bondDegree: 13
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "e120b428-63d0-8eff-9a9a-29d9f88d8c0d"
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
      stageUuid: "b38a49f4-ec1a-8f30-a7a3-e80db432bcfc"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "368554ad-8161-891e-839b-b48ec2ded5ad"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
