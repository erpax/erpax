---
name: seal
description: "Use when SKILL.md frontmatter must render deterministically or fold content-uuid — renderFrontmatter, upgradeSkillText, parseSignaturesFromText, and contentUuidOf seal the diamond stage chain into YAML."
atomPath: "skill/router/upgrade/seal"
coordinate: "skill/router/upgrade/seal · 5/round · 5fef4ffa"
contentUuid: "b7e11a78-cb58-59c3-bd17-ee710dff6b3f"
diamondUuid: "07b9d61a-bef4-89ed-81c5-169a47d63011"
uuid: "5fef4ffa-c4b5-8465-b330-b56dca0b1260"
horo: 5
typography:
  partition: skill
  bondDegree: 156
standards: []
bindings: []
signatures:
  computationUuid: "922119bf-7b43-8ad6-9601-29f46575a181"
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
      stageUuid: "bdb3c018-1e76-885c-8a31-d65adfc9c6fe"
    - stage: seal
      stageUuid: "db8bcd25-63cd-838e-b33a-ebed47e0fb66"
    - stage: uuid
      stageUuid: "337f7a2e-5679-827e-8db8-ba23d97ef919"
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
