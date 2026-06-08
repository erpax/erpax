---
name: seal
description: "Use when SKILL.md frontmatter must render deterministically or fold content-uuid — renderFrontmatter, upgradeSkillText, parseSignaturesFromText, and contentUuidOf seal the diamond stage chain into YAML."
atomPath: skill/router/upgrade/seal
version: 1
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
