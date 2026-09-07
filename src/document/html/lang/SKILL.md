---
name: lang
description: "Use when reasoning about lang — is what a screen reader consults to choose a voice. Get it wrong and Bulgarian is read aloud with English phonemes — not degraded, *unintelligible*."
atomPath: "document/html/lang"
coordinate: "document/html/lang · 1/base · 70f0cc70"
contentUuid: "a5db4f00-caad-5774-8623-e590dac9d52e"
diamondUuid: "4754b404-57d8-8d05-bd97-bc43eb25760d"
uuid: "70f0cc70-acf2-8621-8b6d-0c36244c6431"
horo: 1
typography:
  partition: document
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "f558993f-177f-8482-860c-0c563f155622"
  stages:
    - stage: path
      stageUuid: "4636507e-9fa9-8f97-b266-eeac1841e26d"
    - stage: trinity
      stageUuid: "c0a094ae-37ec-8d97-9b7b-0e370c7dce27"
    - stage: boundary
      stageUuid: "9cf42cf6-7a06-801c-8db3-d73da4409355"
    - stage: links
      stageUuid: "f9df28b8-1957-83bf-b117-457a58a2072b"
    - stage: horo
      stageUuid: "a519af89-e057-867b-be7d-d2ed26abe6ab"
    - stage: seal
      stageUuid: "7d6af736-2760-8626-98c3-00b292b4a4c7"
    - stage: uuid
      stageUuid: "f64c6c18-5f30-8210-a3f6-2ee4acb7a84a"
version: 2
---
# document/html/lang — the page must say what language it is in

`<html lang>` is what a screen reader consults to choose a voice. Get it wrong and Bulgarian is read
aloud with English phonemes — not degraded, *unintelligible*. WCAG 2.2 §3.1.1 asks for the language
of the page to be programmatically determinable, and it is one of the few criteria whose failure a
sighted reviewer cannot perceive at all.

Next's layout renders *inside* `<html>`, so a locale change under `[locale]` cannot update the
attribute from there. This effect does it from the client, on every locale change, and renders
nothing — it is behaviour, not markup.

**Honest boundary.** This proves the attribute follows the prop it is given. It does not prove the
prop is the *right* locale (routing owns that), and it does not set `lang` on sub-trees where a page
mixes languages — §3.1.2 (language of parts) is a separate criterion and is not claimed here.

**Law — [[law]]: a page declares its language, and the declaration follows the locale. A stale `lang`
is invisible to everyone who can see the page and disabling to everyone who cannot.**

## Standards

- **WCAG 2.2 §3.1.1** — language of page.
- **WHATWG HTML** — the `lang` attribute.

Composes: [[document]] · `intl` · [[law]].
