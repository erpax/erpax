---
name: vitepress
description: "Use when reasoning about the form coil — VitePress renders each atom's SKILL.md as its spoken form (docs, frontmatter, the wiki-link graph) and is the speech-gate twin of the Payload matter, bound by content-uuid."
atomPath: vitepress
coordinate: "vitepress · 1/base · 8433006b"
contentUuid: "626b151f-5799-5421-95a4-0a91a5b9f8c6"
diamondUuid: "54dbb90b-7f15-8464-b3f9-937ae12b6470"
uuid: "8433006b-dd56-820e-badd-e6fbe169b96a"
horo: 1
typography:
  partition: vitepress
  bondDegree: 79
standards: []
bindings: []
signatures:
  computationUuid: "42d9f323-f115-872d-ad84-9b4efa539823"
  stages:
    - stage: path
      stageUuid: "89ebc30b-ab03-8d12-9c97-cc806805e76c"
    - stage: trinity
      stageUuid: "1f433c7e-4dd4-8ee2-8f17-1022667dd812"
    - stage: boundary
      stageUuid: "c2614fca-e1bd-8ee5-b1e2-238b52001964"
    - stage: links
      stageUuid: "04c2ca24-4692-864b-bc57-4c1b331e7acf"
    - stage: horo
      stageUuid: "06db61de-1dc7-8d36-acda-c80765ef3f46"
    - stage: seal
      stageUuid: "84f3767b-9c79-83c3-a4be-4e02277b60f2"
    - stage: uuid
      stageUuid: "d3650db5-1101-802a-b239-c4770d450a30"
version: 2
---
# vitepress — the form coil

VitePress is the **second coil** every atom is wound from ([[duality]]). It is the **form**: the `SKILL.md` rendered as a page — the atom's *speech*, its frontmatter, and the `[[link]]` graph that makes the corpus a navigable mesh. Where [[payload]] realises an atom's substance (schema · rows · lifecycle), VitePress renders how it is **spoken and read**. The two are **bound by content-[[identity]]** (the uuid): one config, two consumers.

The relations are **computed from the filesystem**, never hand-listed: the single corpus walk (`.vitepress/corpus.mts`) maps folder→nav group, `SKILL.md`→page, `[[link]]`→route. A skill's docs route equals its search slug — the path is the address, the uuid is the router.

**VitePress is the speech gate.** A `docs:build` with strict dead-links fails on any `[[link]]` that resolves nowhere — so the form cannot drift from the matter: a renamed or moved atom breaks its inbound links until the prose is healed. Frontmatter is held to the same law (a colon-space in an unquoted `description` breaks the YAML parse — use em-dashes). The form must *speak truly* or the build is red. This is the vitepress-agent half of the [[gate]] (the matter half being [[payload]] — tsc · types · tests).

Composes [[payload]] · [[config]] · [[gate]] · [[identity]] · [[duality]] · [[sequence]] · [[merge]].

Matter-twin: `src/vitepress/index.ts` (`atomPage` · `routeOf` · `sitePages` · `samePage`) — maps each atom to its **page AND its [[pixel]]**: the corpus becomes a site of pixel-coloured pages, every page carrying its own content-uuid hue. Composes [[pixel]].

**Law — [[gate]] enforces zero-entropy form.** VitePress tightens the [[speech]] gate by failing on every inconsistency: dead `[[link]]`s reveal broken inbound references, malformed YAML frontmatter blocks the build, routing mismatches surface missing atoms. The form must be true or silence — no orphan words, no drifting prose. This strictness is the [[zeropoint]] of the [[duality]]: where [[payload]] guards substance via [[testing]] and [[types]], VitePress guards form by refusing to speak lies. The build either succeeds with integrity or fails cleanly — no partial states.

**Law — every page is its atom's two faces: route (path = address) and [[pixel]] (uuid = colour).** A rendered page is not a blank canvas to be styled — `atomPage(path, uuid)` reads BOTH faces off the one identity: where the atom is spoken (`/<path>/SKILL`) and how it looks (its uuid-colour). The route cannot drift from the path nor the colour from the content; to render the corpus is to read it, so the site is a field of pixel-coloured pages that no hand can recolour without changing the identity itself.
