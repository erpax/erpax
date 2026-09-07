---
name: github
description: "Use when reasoning about the git remote as a read API onto the corpus — the same one-word atom tree the filesystem and the mcp gateway expose, served over https (raw paths, the contents API, git clone). The third face of the one corpus; a snapshot, never a separate source."
atomPath: github
coordinate: "github · 1/base · 500d4358"
contentUuid: "13e4b987-63fa-53b8-9ed0-d8141b90b864"
diamondUuid: "616868ab-8f4b-85f6-80d0-7d7e87f966bd"
uuid: "500d4358-b3ce-84c7-ab47-81d02a7d00c0"
horo: 1
typography:
  partition: github
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "0dfdcd07-09a2-86c5-bee0-adf2c9fa2307"
  stages:
    - stage: path
      stageUuid: "82ee52db-93b6-803c-9cfc-8228a7c6a397"
    - stage: trinity
      stageUuid: "467ea61e-b3e3-8e3a-b480-4d068370d16b"
    - stage: boundary
      stageUuid: "462be557-221c-8db0-b6e4-66e7089aa9f3"
    - stage: links
      stageUuid: "abb396f8-f532-88a1-b665-684edafa180e"
    - stage: horo
      stageUuid: "8618c083-f00a-8940-b06b-461d8cad27f7"
    - stage: seal
      stageUuid: "c2d35af5-91b0-802a-ae1b-91fc60c40b96"
    - stage: uuid
      stageUuid: "13fc7a5f-c136-84b9-b02e-3459f01451c0"
version: 2
---
# github — the repository as a read API

GitHub is a third **face** of the same corpus, never a second copy. The [[fs]] serves it by [[path]] (the local tree), the [[mcp]] gateway serves it by collection ([[api]] tools at `/api/mcp`), and **github serves it by URL** — `raw.githubusercontent.com/<ref>/<path>`, the contents API, a `git clone`. All three resolve the SAME one-word [[atom]] address: *everything is in the path*, so a path is an address on every face at once.

Because [[identity]] is content-addressed (same content ⇒ same [[uuid]] everywhere), the three faces cannot drift — they are one tree read three ways, and a fetch on any face is set-union [[merge]]-free with the others. A github ref is a [[snapshot]] of the live tree: immutable, content-pinned, publicly verifiable ([[proof]]).

## The cross — two API rings, one surface

The [[fs]] ring (path → content) and the [[mcp]] ring (collection → tool) are the two rings of the double-torus; **github is where they cross into the open** — the public read projection of both. The crossing is the index: one address, three readers ([[fs]] · [[mcp]] · github), no fourth source of truth.

## What is authored vs computed

Only the [[atom]] is authored, and only as its `SKILL.md` (the skill text — *md is SKILL, text in atoms is skill*). Everything github needs around it — the `.github/` workflows, the PR template, the plugin/mcp manifests, the type schema — is **computed** from the atoms ([[generate]]), never hand-kept. So github carries no entropy of its own: it is a window, and the [[law]] holds on the other side of the glass.

**Law — [[law]]: github is a read face of the one corpus — the same one-word [[atom]] tree the [[fs]] and [[mcp]] expose, served by URL as a content-pinned [[snapshot]]; only the atom's SKILL.md is authored, every config around it is computed.**

GitHub is an external read API that follows THE path — repo paths and blob/tree/raw URLs collapse through `toAtomPath(..., 'github')` in [[path]] and merge with [[fs]], docs [[url]], [[mcp]], and [[api]] at one canonical atom path in every [[dimension]].

@see [[path]] · [[fs]] · [[mcp]] · [[api]] · [[payload]] · [[snapshot]] · [[identity]] · [[merge]] · [[dimension]] · [[generate]]
