---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 1/base · 451a4447"
contentUuid: "0026db58-6b4a-5a5b-bee6-7a40cafcc510"
diamondUuid: "fa20c31d-cfb1-8bf3-9ae1-3d78c506258d"
uuid: "451a4447-7a18-8884-b601-56a23ec41df8"
horo: 1
typography:
  partition: scheduled
  bondDegree: 16
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "9a7a4def-9f21-854a-bee0-5e18d4ef1167"
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
      stageUuid: "0d87b5f8-893f-8471-8dd2-5ca858355842"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "183325f6-097e-8989-b410-396b3e3d2fc3"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
