---
name: media
description: "Use when turning Playwright test artifacts into Media records — screenshots and videos are uploaded to the Media collection and each video gets a WebVTT subtitle track built from its test step titles, so marketing pages can embed live, captioned evidence of documented capabilities."
atomPath: capture/media
coordinate: capture/media · 5/round · f992f1b1
contentUuid: "b993623b-f131-5c09-b708-fab89cbaa37f"
diamondUuid: "32cee6b0-997c-8c1c-8f2a-3b125ce81fcc"
uuid: "f992f1b1-f565-8a98-913b-8d0055f057f7"
horo: 5
bonds:
  in:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - capture
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
  out:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
typography:
  partition: capture
  bondDegree: 90
  neighbors: []
standards:
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "ISO 19011:2018 audit-trail test-evidence"
  - "ISO-19011"
  - "ISO-19011:2018 audit-trail test-recording-provenance"
  - "ISO/IEC 14496-30 timed-text-formats"
  - W3C WebVTT
  - "W3C WebVTT video-text-track-format"
  - "WCAG-2.1 §1.2.2 captions-prerecorded"
  - "WCAG-2.1 §1.2.5 audio-description-prerecorded"
bindings: []
neighbors:
  wikilink:
    - audit
    - law
    - media
  matrix:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
  backlinks:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
signatures:
  computationUuid: "19036ec8-fa2f-8c4a-9620-2368a39e0c33"
  stages:
    - stage: path
      stageUuid: "265f8640-7dbd-8b19-836b-fdeee6b00254"
    - stage: trinity
      stageUuid: "8faaf704-5ff2-884f-9a87-787a717d8576"
    - stage: boundary
      stageUuid: "99e0769b-2c8f-8bda-90d2-7a46f95ad667"
    - stage: links
      stageUuid: "f09f9534-5e38-81b6-823c-769935bf9c7e"
    - stage: horo
      stageUuid: "ae0caea3-926a-8de3-9b49-3655ab58a822"
    - stage: seal
      stageUuid: "b7bc2d43-ca92-8b40-9868-12545ae8e6be"
    - stage: uuid
      stageUuid: "d566a5d6-d96e-8d74-92e6-34c6e09d560e"
version: 2
---
# capture/media — test artifacts into [[media]]

The test-artifact uploader. It walks a Playwright `test-results` directory, reads its `manifest.json`, and for each test uploads the recorded video, its screenshots, and a generated WebVTT subtitle track into the [[media]] collection — returning the resulting Media ids grouped by test. `buildWebVtt` turns a sequence of `{title, ts}` steps into a valid `WEBVTT` body with monotonic `HH:MM:SS.mmm` cues, each cue running to the next step's offset and the final cue closing at `durationMs` (or a `start + 3s` floor). The uploaded artifacts become provenance-bearing [[audit]] evidence (ISO 19011:2018) that the captioned marketing pages can embed.

Matter-twin: `src/capture/media/index.ts` (`uploadTestArtifacts` · `buildWebVtt`).

**Law — [[law]]: every recorded test artifact becomes a [[media]] record, and every video carries a WebVTT track built from its step titles — captured evidence is always captioned and provenance-bearing.**
