---
name: lang
description: "Use when reasoning about lang — is what a screen reader consults to choose a voice. Get it wrong and Bulgarian is read aloud with English phonemes — not degraded, *unintelligible*."
atomPath: "document/html/lang"
coordinate: "document/html/lang · 2/share · 64fd7282"
contentUuid: "9e92dd24-c700-528b-a390-1a053a51b3e3"
diamondUuid: "7a284819-cac9-8451-b19f-89a5d9443195"
uuid: "64fd7282-4d9a-8d4f-a7aa-39bb02d6d63c"
horo: 2
typography:
  partition: document
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "babfb5b3-6782-81e5-8f78-543500187c9e"
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
      stageUuid: "8725e0cc-0af8-8b4f-9a0b-e328182cbe63"
    - stage: seal
      stageUuid: "7d6af736-2760-8626-98c3-00b292b4a4c7"
    - stage: uuid
      stageUuid: "93e47593-1328-83ec-ab58-56474e5440a6"
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
