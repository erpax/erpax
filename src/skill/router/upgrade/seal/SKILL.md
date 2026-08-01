---
name: seal
description: "Use when SKILL.md frontmatter must render deterministically or fold content-uuid — renderFrontmatter, upgradeSkillText, parseSignaturesFromText, and contentUuidOf seal the diamond stage chain into YAML."
atomPath: "skill/router/upgrade/seal"
coordinate: "skill/router/upgrade/seal · 1/base · 62ef38e8"
contentUuid: "36a0ee10-a819-5832-b258-cdc6d4936e8e"
diamondUuid: "4130a29a-fb40-87f3-a2ed-b39c676825fe"
uuid: "62ef38e8-e716-865d-bc29-a396a9d5b31e"
horo: 1
typography:
  partition: skill
  bondDegree: 142
standards: []
bindings: []
signatures:
  computationUuid: "ffe8df90-4972-874c-a2af-6ba4da3b5bb0"
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
      stageUuid: "86cacd7f-39ac-8a0c-ad82-c9d1fba9f8b2"
    - stage: seal
      stageUuid: "b0fcc612-51cb-8ced-9429-9d346d7119b0"
    - stage: uuid
      stageUuid: "6750ab46-cb1a-883a-a8f7-77ce1453b1c2"
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
