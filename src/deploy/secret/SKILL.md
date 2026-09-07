---
name: secret
description: "Use when a workflow references a secret the repository does not hold — the lane dies on its first step, and this says so before the push instead of inside a run someone has to open."
atomPath: "deploy/secret"
coordinate: "deploy/secret · 1/base · 3cd0a67e"
contentUuid: "5e9b457d-7417-59f8-ad83-6bf15cff8d7e"
diamondUuid: "3d904276-fd49-87c3-bdd6-18d80a631a2b"
uuid: "3cd0a67e-9976-81b5-b7be-ba808188c784"
horo: 1
typography:
  partition: deploy
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "45e425e0-cfb5-8a10-9103-2e38ac66fdc8"
  stages:
    - stage: path
      stageUuid: "6bd1ad6a-d076-8b6e-9727-d66a6dac1a7e"
    - stage: trinity
      stageUuid: "3bac39cc-464d-890e-a0b8-995417c7d1d1"
    - stage: boundary
      stageUuid: "513d98e3-ae9f-8695-b918-628a31c1a9a9"
    - stage: links
      stageUuid: "90a47ca8-501d-854e-bd25-16e8050d71af"
    - stage: horo
      stageUuid: "2c1343b6-76fd-8100-bd7e-d5e5d3156a89"
    - stage: seal
      stageUuid: "29445c3b-af67-8dc3-b71e-462c3491586d"
    - stage: uuid
      stageUuid: "9b9b2ecd-0de0-886b-b679-60295d3de75f"
version: 2
---
# deploy/secret — you should not learn a lane cannot run by pushing

Every Cloudflare deploy this repository has ever triggered died on its first step:

```
✖ Missing GitHub Actions secrets: CLOUDFLARE_API_TOKEN PAYLOAD_SECRET
```

The workflow's own guard is correct and it fires **too late** — after a push, after CI, inside a run somebody has to open and read. Nothing local knew, so nothing local said, and *"the deploy works"* stayed true-by-default until a human went looking. That is [[rules]]/unraised at the scale of a pipeline: the condition was checkable the whole time and no check asked.

It is checkable **before** the push, and cheaply. The workflows declare what they need; GitHub will list what the repository holds; the difference is the answer.

| | count (2026-09-02) |
| --- | ---: |
| `secrets.NAME` referenced across the workflows | 3 |
| configured | **0** |
| lanes that therefore cannot run | `cloudflare.yml` · `publish-packages.yml` |

`NPM_TOKEN` is in that list, which is the same finding from the other end: the publish lane's `npm error code ENEEDAUTH` was this, discovered by running it.

## Fails OPEN, deliberately

`configuredSecretNames` reports `known: false` — never `names: []` — when `gh` is unauthenticated, offline, or scoped without secrets access, and `missingSecrets` then reports nothing missing. A shell glob that errored and returned nothing once let this corpus read **absence of evidence as evidence of absence**, and a gate that cries wolf on every flight is a gate nobody reads. UNKNOWN is a third answer and it is the honest one.

**Honest boundary.** Secret VALUES are readable by nobody, which is the point of a secret — this proves a name is **configured**, never that it is **correct**. A wrong token still fails at the API call, and that is a better place to fail than before anything was tried. It reads repository and organisation secrets; an ENVIRONMENT-scoped secret is a separate endpoint and would read here as missing.

**Law — [[law]]: a pipeline states what it needs, and the machine can say whether it has it. Ask before the push — a lane whose first step cannot pass is not a lane, and finding that out from a red run is finding it out too late.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a precondition that is checkable must be checked.

Composes: [[deploy]]/pipeline · [[rules]]/unraised · [[law]].
