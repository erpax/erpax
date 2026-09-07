---
name: worker
description: "Use when modelling one worker — the singular model of the workers collection (the plural store); a person who performs labor for the organization. AND when naming the autonomous deployment face of a diamond — hook bodies, CLIs, guardians, agents, MCP handlers that run without a human in the loop."
atomPath: "vocabulary/worker"
coordinate: "vocabulary/worker · 4/weave · ab091cb2"
contentUuid: "a5925a33-13aa-5371-8f3c-723d8acf5345"
diamondUuid: "e3e2d09e-9a42-812c-87c3-542f8bba3825"
uuid: "ab091cb2-77b3-8ae3-9d69-49663a9d443f"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "84e33d41-a844-8d2e-95ec-0819f5ea1b90"
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
      stageUuid: "720d0613-24ac-878c-ae86-6f430f36d683"
    - stage: seal
      stageUuid: "d2a34c88-05b7-8963-987f-4b3c11c6680b"
    - stage: uuid
      stageUuid: "1e166461-1177-8590-b6ed-9a5d7d6eae3f"
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
