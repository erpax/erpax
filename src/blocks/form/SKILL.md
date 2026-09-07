---
name: form
description: "Use when reasoning about form — A CMS form is data: an editor picks field types, and something must turn each stored into a component. is that map, and it is the whole of this atom's authority."
atomPath: "blocks/form"
coordinate: "blocks/form · 7/descent · 4c2e99a5"
contentUuid: "94946dd4-de5c-5c93-b305-2a4aa1917676"
diamondUuid: "17c8b6ac-6e7e-837e-b61c-b24ce676c247"
uuid: "4c2e99a5-d872-8784-b2f7-ef13ffd98fc9"
horo: 7
typography:
  partition: blocks
  bondDegree: 30
standards:
  - "ECMA-262"
  - "EU-CSDDD-2024/1760"
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "20fa06cf-854f-80ae-8bf9-1dd771984fd6"
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
      stageUuid: "c8d9034e-eee5-852b-8eba-525b909b32c9"
    - stage: seal
      stageUuid: "11f2fa17-de73-8595-9601-06f9cb27723f"
    - stage: uuid
      stageUuid: "62efabe8-cd39-83b9-9a16-27034c0dcb35"
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
