---
name: seal
description: "Use when SKILL.md frontmatter must render deterministically or fold content-uuid — renderFrontmatter, upgradeSkillText, parseSignaturesFromText, and contentUuidOf seal the diamond stage chain into YAML."
atomPath: "skill/router/upgrade/seal"
coordinate: "skill/router/upgrade/seal · 4/weave · 8f7690ea"
contentUuid: "83861cc7-a743-55e7-b3cb-5310046a43ac"
diamondUuid: "66ac59dd-1d12-8810-acbd-694477b6578d"
uuid: "8f7690ea-491a-8a33-be74-310c09828928"
horo: 4
typography:
  partition: skill
  bondDegree: 194
standards: []
bindings: []
signatures:
  computationUuid: "ea2f099f-4078-8a54-9c4c-311eccfd459d"
  stages:
    - stage: path
      stageUuid: "59e7d341-09aa-858a-bcac-69d9fcff9503"
    - stage: trinity
      stageUuid: "a0f18af8-c296-85d9-9e8f-990eb0beec73"
    - stage: boundary
      stageUuid: "462325d9-125a-8a7a-be19-6310477c2b65"
    - stage: links
      stageUuid: "94fc16b7-f991-89a9-adea-e68824180673"
    - stage: horo
      stageUuid: "7244ba32-b81b-8dab-b4ce-da65d26248d6"
    - stage: seal
      stageUuid: "db8bcd25-63cd-838e-b33a-ebed47e0fb66"
    - stage: uuid
      stageUuid: "0875dab0-6239-8f50-9222-aa0bcbfcd148"
version: 2
---
# seal — frontmatter render · content-uuid seal

Child atom of [[upgrade]] — renders connected frontmatter as deterministic YAML and folds the content-uuid over prose. Shared by [[upgrade]] and [[upgrade]]/quantum: stage signatures (`signatures.stages[]`), `contentUuidOf`, and `upgradeSkillText` splice computed frontmatter without hand-pinning.

## Exports

| Function | Role |
| --- | --- |
| `renderFrontmatter` | Emit deterministic YAML from `ConnectedFrontmatter` |
| `upgradeSkillText` | Splice computed frontmatter onto SKILL body (idempotent) |
| `contentUuidOf` | v5-style content-uuid from bytes |
| `parseSignaturesFromText` | Parse `signatures:` block from frontmatter |
| `signaturesFromStages` | Diamond stages → frontmatter signature chain |
| `stripFrontmatter` | Remove YAML frontmatter block |

**Law — [[law]]: frontmatter seals are computed — render deterministically, fold content-uuid over prose; never hand-pin signatures or contentUuid.**

@see ../index.ts · [[diamond]] · [[integrity]] · [[upgrade]]/quantum
