---
name: form
description: "Use when reasoning about form — A CMS form is data: an editor picks field types, and something must turn each stored into a component. is that map, and it is the whole of this atom's authority."
atomPath: "blocks/form"
coordinate: "blocks/form · 1/base · a5d66881"
contentUuid: "ed0c3cca-e0f2-5986-b457-082d2cc0c747"
diamondUuid: "ebcd2c86-3676-8f0a-aca0-118371f64f8b"
uuid: "a5d66881-ed41-82f7-9f3e-f61fe48c7899"
horo: 1
typography:
  partition: blocks
  bondDegree: 28
standards:
  - "ECMA-262"
  - "EU-CSDDD-2024/1760"
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "789792e7-2706-8a2b-ba6b-24a806a1155f"
  stages:
    - stage: path
      stageUuid: "f1522255-6ff1-8056-b4f4-f198d16a8ba5"
    - stage: trinity
      stageUuid: "1788a600-7486-89bc-9468-2c2661316927"
    - stage: boundary
      stageUuid: "1588eef3-ab57-8660-9e3c-b555b22bb8c7"
    - stage: links
      stageUuid: "3a327889-46d3-8f67-aee9-1679e759ccbb"
    - stage: horo
      stageUuid: "9318fe11-bfab-83fe-999f-da776d8fe438"
    - stage: seal
      stageUuid: "11f2fa17-de73-8595-9601-06f9cb27723f"
    - stage: uuid
      stageUuid: "88888461-06b1-81e7-85c2-23fdd11142e7"
version: 2
---
# blocks/form — nine field types, and the registry that decides which one an editor gets

A CMS form is data: an editor picks field types, and something must turn each stored `blockType`
into a component. `fields` is that map, and it is the whole of this atom's authority.

**A map, not a switch.** The registry is a value, so a field type either has an entry or it does not
— and that is a fact anything can check, including a proof. A `switch` with a silent default hides
the same question inside control flow, where the unhandled case is discovered by an editor whose
field renders as nothing.

Nine entries: checkbox · country · email · message · number · select · state · text · textarea. Each
is its own atom carrying its own law, and each is proven where it lives — the label/control binding
that breaks silently, the checkbox whose value must be written by hand because a Radix control fires
no native event, the ISO-shaped country and state data, the width whose absence must not read as
zero.

`FormField` is the shared wrapper the single-line fields compose through, so the label, the required
marker and the error placement are written once rather than nine times.

**Honest boundary.** This atom is the registry and the wrapper. Every claim about an individual field
belongs to that field's atom. It also does not validate a submission — `react-hook-form` and the
server own that, and a field rendering correctly says nothing about what the server will accept.

**Law — [[law]]: a dispatch over editor-authored data is a registry, not a switch. A map can be
asked what it covers; a switch answers only when something already went wrong.**

## Standards

- **WCAG 2.2 §1.3.1 · §3.3.1 · §4.1.2** — carried, per field, by the atoms this registry names.

Composes: `blocks` · [[law]].
