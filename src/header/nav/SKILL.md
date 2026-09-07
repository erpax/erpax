---
name: nav
description: "Use when reasoning about nav — A magnifying glass is a picture. To a screen reader, a link containing only a picture has an accessible name of *the empty string* — announced as \"link\", with nothing to say where…"
atomPath: "header/nav"
coordinate: "header/nav · 4/weave · 8e92501a"
contentUuid: "b68ef3bb-c73b-53a4-a7b0-ba531deb7804"
diamondUuid: "3f1add0c-7bd6-83b5-b9f4-12e768cfe796"
uuid: "8e92501a-0f19-8be6-a1a8-5abbb92b3471"
horo: 4
typography:
  partition: header
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "8f816199-36f0-864f-a8f5-3dd331b977dc"
  stages:
    - stage: path
      stageUuid: "e63646f2-1052-8fa1-8f0e-d022a14e316c"
    - stage: trinity
      stageUuid: "5a0bb43f-465f-88b3-aea2-eb8c4ffc0810"
    - stage: boundary
      stageUuid: "6879342a-b1ff-801a-a7c9-dc1d946d83a2"
    - stage: links
      stageUuid: "efc5f506-88ff-86a6-a89d-e09c5a95ea10"
    - stage: horo
      stageUuid: "3f041f36-dfdc-8d98-898d-0ff6d0d7010e"
    - stage: seal
      stageUuid: "685164cd-2085-8cfa-bde2-fc6eff1b8f89"
    - stage: uuid
      stageUuid: "6b84ea6a-cadf-800f-934d-0abfa0ece0b0"
version: 2
---
# header/nav — the icon link has a name, because an icon has none

A magnifying glass is a picture. To a screen reader, a link containing only a picture has an
accessible name of *the empty string* — announced as "link", with nothing to say where it goes. WCAG
2.2 §2.4.4 asks that a link's purpose be determinable from the link itself, and an icon-only link is
the single most common way to fail it.

The `sr-only` span is the fix, and it is the fragile part: it is invisible, so nothing on screen
changes if it is deleted, reworded into nonsense, or left untranslated. The proof beside this asks
for the link **by its accessible name**, which is the only way that regression is visible.

The rest is a `<nav>` landmark holding CMS-authored links, and a locale switcher.

**Honest boundary.** This proves the search link is nameable and that the navigation is a landmark. It
does not check the CMS links themselves — [[link]]/component owns those — and it does not verify the
translation is *correct* in any locale, only that a name exists where an icon would otherwise leave
none.

**Law — [[law]]: a link whose content is an icon carries its name in text a screen reader can read.
Deleting that text changes nothing visible and leaves an unnamed link — so the proof asks for the
link by name, never by position.**

## Standards

- **WCAG 2.2 §2.4.4** — link purpose in context.
- **WCAG 2.2 §1.3.1** — the `<nav>` landmark.

Composes: [[header]] · [[link]]/component · [[law]].
