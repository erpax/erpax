---
name: vitepress
description: "Use when reasoning about the form coil — VitePress renders each atom's SKILL.md as its spoken form (docs, frontmatter, the wiki-link graph) and is the speech-gate twin of the Payload matter, bound by content-uuid."
atomPath: vitepress
coordinate: "vitepress · 5/round · a794d258"
contentUuid: "27213637-b3a7-50e5-99cd-4c114e3a9d3b"
diamondUuid: "c368316a-a6a7-829c-bed1-ab817c7e9cca"
uuid: "a794d258-a99d-8a55-8689-9ced02b06a7f"
horo: 5
typography:
  partition: vitepress
  bondDegree: 77
standards: []
bindings: []
signatures:
  computationUuid: "c9a66121-eb4c-8fae-8b57-0558f3846f67"
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
      stageUuid: "e3979f8a-8334-8a63-a17e-6d7e5a404daa"
    - stage: seal
      stageUuid: "84f3767b-9c79-83c3-a4be-4e02277b60f2"
    - stage: uuid
      stageUuid: "042132e6-90fc-8792-b303-1a5e8e52912b"
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
