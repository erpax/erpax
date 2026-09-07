---
name: form
description: "Use when reasoning about form — A CMS form is data: an editor picks field types, and something must turn each stored into a component. is that map, and it is the whole of this atom's authority."
atomPath: "blocks/form"
coordinate: "blocks/form · 4/weave · 22e72a69"
contentUuid: "d5315787-a106-5cf1-9e7f-f42c7ce26775"
diamondUuid: "71f43e31-b73e-88fc-a6ce-34728a02b325"
uuid: "22e72a69-1617-8860-96c3-af6236bad77c"
horo: 4
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
  computationUuid: "5131b300-e7b1-8f49-8714-b810b2652ba1"
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
      stageUuid: "2e37e56a-6385-8976-aa87-14c36e955fd2"
    - stage: seal
      stageUuid: "11f2fa17-de73-8595-9601-06f9cb27723f"
    - stage: uuid
      stageUuid: "1b78d133-827b-849f-9a44-3343dd8a3d0c"
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
