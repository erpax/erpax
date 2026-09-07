---
name: lang
description: "Use when reasoning about lang — is what a screen reader consults to choose a voice. Get it wrong and Bulgarian is read aloud with English phonemes — not degraded, *unintelligible*."
atomPath: "document/html/lang"
coordinate: "document/html/lang · 4/weave · 91e3f7b9"
contentUuid: "1f9bded4-674f-5858-8c38-94630f1e97d4"
diamondUuid: "5cb73b3e-f65c-8b96-9396-3f403ca773fe"
uuid: "91e3f7b9-8f9c-8535-b2c0-5b0c2bc51f0f"
horo: 4
typography:
  partition: document
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "80591934-1cc1-8a4c-840b-53d93710ec9d"
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
      stageUuid: "f989a561-8015-8922-a6ff-8a2139a450e7"
    - stage: seal
      stageUuid: "7d6af736-2760-8626-98c3-00b292b4a4c7"
    - stage: uuid
      stageUuid: "0c100d95-b78f-86b1-80ec-bbacf37484fb"
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
