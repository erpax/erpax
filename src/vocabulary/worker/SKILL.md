---
name: worker
description: "Use when modelling one worker — the singular model of the workers collection (the plural store); a person who performs labor for the organization. AND when naming the autonomous deployment face of a [[diamond]] — hook bodies, CLIs, guardians, agents, MCP handlers that run without a human in the loop."
atomPath: "vocabulary/worker"
coordinate: "vocabulary/worker · 8/crest · 44cc6357"
contentUuid: "12e586b3-a0e3-5a63-b53b-725c0766e07d"
diamondUuid: "8e3306df-2da6-8d07-bfbf-6071ae775b65"
uuid: "44cc6357-b244-8962-ba80-24cc4ba4cab5"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "28ef4dc3-4719-8e6f-8eda-84c436bebe4c"
  stages:
    - stage: path
      stageUuid: "43f7c30b-ad28-8490-a716-1febe3e27477"
    - stage: trinity
      stageUuid: "2fc26074-4498-89be-b3da-f7c9f424ebe7"
    - stage: boundary
      stageUuid: "1c381fd9-0654-83e8-86db-ce57b78170ac"
    - stage: links
      stageUuid: "fd467e80-7568-89f9-a7b5-a2bae5d357ed"
    - stage: horo
      stageUuid: "33ac28a4-0db3-8777-8a1a-410e23d06a72"
    - stage: seal
      stageUuid: "80e3e7a0-25e7-8337-bf7e-74e5c8a23789"
    - stage: uuid
      stageUuid: "c96a8688-51ae-80b5-b31b-deb5615c1043"
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
