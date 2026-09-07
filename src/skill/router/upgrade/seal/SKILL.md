---
name: seal
description: "Use when SKILL.md frontmatter must render deterministically or fold content-uuid — renderFrontmatter, upgradeSkillText, parseSignaturesFromText, and contentUuidOf seal the diamond stage chain into YAML."
atomPath: "skill/router/upgrade/seal"
coordinate: "skill/router/upgrade/seal · 7/descent · 09118a95"
contentUuid: "ef878654-8bf0-5bc5-9650-2e0d707dedc4"
diamondUuid: "0efccb95-9bab-8e96-9d5b-8e39d566dbef"
uuid: "09118a95-7550-8c7f-9981-8a3f2400518b"
horo: 7
typography:
  partition: skill
  bondDegree: 194
standards: []
bindings: []
signatures:
  computationUuid: "80dce526-6b9b-8442-8b94-8356987597c3"
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
      stageUuid: "f84cf054-7a8f-8ad1-95eb-a7cc5b9fa66a"
    - stage: seal
      stageUuid: "db8bcd25-63cd-838e-b33a-ebed47e0fb66"
    - stage: uuid
      stageUuid: "9131d471-14f5-884b-a7de-16a31d661c68"
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
