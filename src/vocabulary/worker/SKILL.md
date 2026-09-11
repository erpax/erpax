---
name: worker
description: "Use when modelling one worker — the singular model of the workers collection (the plural store); a person who performs labor for the organization. AND when naming the autonomous deployment face of a diamond — hook bodies, CLIs, guardians, agents, MCP handlers that run without a human in the loop."
atomPath: "vocabulary/worker"
coordinate: "vocabulary/worker · 7/descent · 7bc166d7"
contentUuid: "60d42bf6-29e6-534c-8acc-5e9840706417"
diamondUuid: "c2b87569-dc52-8a63-913b-17ff1e0ba16e"
uuid: "7bc166d7-ff78-8b51-b946-b688e97da1f0"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "5a079a4a-f4f9-85b8-a277-0464ae8e8cc6"
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
      stageUuid: "3e254a08-b73e-8ed9-9b14-018ebdeca8fd"
    - stage: seal
      stageUuid: "d2a34c88-05b7-8963-987f-4b3c11c6680b"
    - stage: uuid
      stageUuid: "029fdde5-dbaa-8b34-898d-76bb90c921d1"
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
