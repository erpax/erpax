---
name: worker
description: "Use when modelling one worker — the singular model of the workers collection (the plural store); a person who performs labor for the organization. AND when naming the autonomous deployment face of a [[diamond]] — hook bodies, CLIs, guardians, agents, MCP handlers that run without a human in the loop."
atomPath: worker
coordinate: worker · 8/crest · 3e8ed105
contentUuid: "e7fb781b-a52a-5fb4-b008-4825d91a96b6"
diamondUuid: "28d9122c-380c-867a-8918-2266e15522d8"
uuid: "3e8ed105-9f77-8771-b1e4-a0c8bc07b653"
horo: 8
bonds:
  in:
    - agent
    - balance
    - bindings
    - cloudflare
    - confirm
    - deploy
    - diamond
    - employee
    - guardian
    - hooks
    - law
    - plugin
    - pwa
    - quantum
    - readme
    - serverless
    - typography
    - workers
  out:
    - agent
    - balance
    - bindings
    - cloudflare
    - confirm
    - deploy
    - diamond
    - employee
    - guardian
    - hooks
    - law
    - plugin
    - pwa
    - quantum
    - readme
    - serverless
    - typography
    - workers
typography:
  partition: worker
  bondDegree: 63
  neighbors:
    - agent
    - cloudflare
    - diamond
standards: []
bindings:
  - ai/AI
  - analytics_engine_datasets/ANALYTICS_AI
  - analytics_engine_datasets/ANALYTICS_API
  - analytics_engine_datasets/ANALYTICS_GL
  - analytics_engine_datasets/ANALYTICS_JOBS
  - browser/BROWSER
  - durable_objects/AUDIT_CHAIN_DO
  - durable_objects/ERPAX_DO
  - durable_objects/JOB_LOCK
  - durable_objects/RATE_LIMITER
  - durable_objects/TENANT_QUOTA
  - images/IMAGES
  - kv_namespaces/AI_CACHE
  - queues/QUEUE_AI_BATCH
  - queues/QUEUE_DUNNING_OUT
  - queues/QUEUE_EINVOICE_OUT
  - queues/QUEUE_EMAIL_OUT
  - queues/QUEUE_PERIOD_CLOSE
  - ratelimit/RATE_LIMITER_AI
  - ratelimit/RATE_LIMITER_API
  - send_email/EMAIL_SENDER
  - services/WORKER_SELF_REFERENCE
  - triggers/CRON
  - vectorize/VECTORIZE_DOCS
neighbors:
  wikilink:
    - agent
    - balance
    - cloudflare
    - confirm
    - diamond
    - employee
    - guardian
    - hooks
    - law
    - plugin
    - pwa
    - quantum
    - readme
    - serverless
    - typography
    - workers
  matrix:
    - agent
    - balance
    - bindings
    - cloudflare
    - confirm
    - deploy
    - diamond
    - employee
    - guardian
    - hooks
    - law
    - plugin
    - pwa
    - quantum
    - readme
    - serverless
    - typography
    - workers
  backlinks:
    - agent
    - balance
    - bindings
    - cloudflare
    - confirm
    - deploy
    - diamond
    - employee
    - guardian
    - hooks
    - law
    - plugin
    - pwa
    - quantum
    - readme
    - serverless
    - typography
    - workers
signatures:
  computationUuid: "b2343c2c-c365-8afb-bf00-c7c8d54b7ba5"
  stages:
    - stage: path
      stageUuid: "af000b27-4a0d-8dfa-b020-8759f185204b"
    - stage: trinity
      stageUuid: "a72768e1-50b3-818c-8e22-c3dd5cb530cd"
    - stage: boundary
      stageUuid: "c8215002-3bad-8829-a505-6e8ae7f9a192"
    - stage: links
      stageUuid: "a2aa273a-74af-81c5-a282-6a9a6e46d103"
    - stage: horo
      stageUuid: "62604a6e-2ffd-8f42-9f22-242aecbd290a"
    - stage: seal
      stageUuid: "b000a144-8c0c-8aa5-a042-299aac6d9e61"
    - stage: uuid
      stageUuid: "76495b14-4503-80da-ac05-67790c9e2258"
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
