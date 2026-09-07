---
name: task
description: "Use when reasoning about task — The barrel binds the registry, the runner and the task types. A scheduled action declared here is enumerable: something can ask what runs, when, and what evidence it leaves."
atomPath: "scheduled/task"
coordinate: "scheduled/task · 4/weave · 3077b374"
contentUuid: "22677921-2dd7-5015-bc55-e2a54f8414dc"
diamondUuid: "bd65b6d9-7359-8eb4-94d1-eb0cbf488a0e"
uuid: "3077b374-04d5-8b78-af14-d9664c34b709"
horo: 4
typography:
  partition: scheduled
  bondDegree: 13
standards:
  - "RFC-5545"
bindings: []
signatures:
  computationUuid: "666243c9-924a-8a8a-ae38-41e0becea65c"
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
      stageUuid: "c697178b-fe96-809e-8854-c4743f400b9e"
    - stage: seal
      stageUuid: "37cea76d-9d9b-834c-96bb-7d409824d497"
    - stage: uuid
      stageUuid: "19e01e67-5278-8e05-83b1-c910ed5cfc20"
version: 2
---
# scheduled/task — a time-driven action is declared in a registry, not hidden in a cron line

The barrel binds the registry, the runner and the task types. A scheduled action declared here is
enumerable: something can ask what runs, when, and what evidence it leaves.

A schedule that lives only in the deployment is invisible to the audit that asks whether the
monthly obligation was met.


Composes: [[law]].
