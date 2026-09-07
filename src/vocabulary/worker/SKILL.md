---
name: worker
description: "Use when modelling one worker — the singular model of the workers collection (the plural store); a person who performs labor for the organization. AND when naming the autonomous deployment face of a diamond — hook bodies, CLIs, guardians, agents, MCP handlers that run without a human in the loop."
atomPath: "vocabulary/worker"
coordinate: "vocabulary/worker · 5/round · e21322c6"
contentUuid: "6de2c184-0b51-5461-b3c1-8264fc082bb3"
diamondUuid: "bd480be0-50d9-83e2-b896-1d8d632cdf1d"
uuid: "e21322c6-d4df-8ae1-b63b-cebbb35732cc"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "85dad769-1fbd-8865-9c94-a3fcc4f6e6f4"
  stages:
    - stage: path
      stageUuid: "43f7c30b-ad28-8490-a716-1febe3e27477"
    - stage: trinity
      stageUuid: "2fc26074-4498-89be-b3da-f7c9f424ebe7"
    - stage: boundary
      stageUuid: "1c381fd9-0654-83e8-86db-ce57b78170ac"
    - stage: links
      stageUuid: "b16f63ca-462b-80b1-893b-1c996a36e171"
    - stage: horo
      stageUuid: "3a611019-a5fb-839b-af38-a23f956a674e"
    - stage: seal
      stageUuid: "d2a34c88-05b7-8963-987f-4b3c11c6680b"
    - stage: uuid
      stageUuid: "ec355a89-b54a-8769-86aa-dbd32c05b118"
version: 2
---
# worker — the model of one [[workers]] row

A person who performs labor for the organization. The singular model whose plural store is the [[workers]] collection ([[balance]]: every collection has its model).

Composes [[workers]] · [[employee]] · [[balance]].

## Deployment face — every [[diamond]] can run autonomously
Alongside the HR row model, **worker** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[plugin]] · [[pwa]]). The **worker face** is the autonomous executor: background [[agent]], service worker, cron, MCP tool handler, [[guardian]] ratchet, seal-and-push [[hooks]] body — anything that runs without a human in the loop. Examples: [[confirm]]/seal-and-push (Cursor `stop` hook), [[readme]] generator CLI, [[typography]] guardian. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

On Cloudflare, the worker face IS the serverless quantum host: `bindingDeploymentFaces` marks AI · queues · Durable Objects · cron triggers as worker-hosted; `proveServerlessQuantum()` ([[quantum/serverless]]) proves the worker facet ⊕ quantum laws fold to one sealed uuid. Cross-link: [[cloudflare]] bindings · [[quantum]] pipeline · `wrangler.jsonc`.

**Law — [[law]]: a worker is one person who performs labor for the organization — the singular model whose plural store is the [[workers]] collection ([[balance]]: every collection has its model).**

**Law — [[law]]: the worker deployment face is the autonomous executor of a [[diamond]] — hook, CLI, guardian, agent, or MCP handler that runs without a human in the loop.**
