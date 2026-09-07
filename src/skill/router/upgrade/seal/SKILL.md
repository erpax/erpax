---
name: seal
description: "Use when SKILL.md frontmatter must render deterministically or fold content-uuid — renderFrontmatter, upgradeSkillText, parseSignaturesFromText, and contentUuidOf seal the diamond stage chain into YAML."
atomPath: "skill/router/upgrade/seal"
coordinate: "skill/router/upgrade/seal · 2/share · b9bbadd2"
contentUuid: "ac757a64-517b-5282-b2d3-37caa280c363"
diamondUuid: "95d97020-82f5-8f4b-9a18-8b6603d070c3"
uuid: "b9bbadd2-b8f0-81a3-b918-36f9fd04c40d"
horo: 2
typography:
  partition: skill
  bondDegree: 194
standards: []
bindings: []
signatures:
  computationUuid: "ae690c4e-3be8-8fa9-bf2f-da0a40064c1b"
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
      stageUuid: "f3f240ca-fff8-8c45-88e9-bd8856fcd27a"
    - stage: seal
      stageUuid: "db8bcd25-63cd-838e-b33a-ebed47e0fb66"
    - stage: uuid
      stageUuid: "9709d3be-517c-8268-af00-704ceccdedef"
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
