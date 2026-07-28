---
name: media
description: "Use when turning Playwright test artifacts into Media records — screenshots and videos are uploaded to the Media collection and each video gets a WebVTT subtitle track built from its test step titles, so marketing pages can embed live, captioned evidence of documented capabilities."
atomPath: "capture/media"
coordinate: "capture/media · 4/weave · 5e60252d"
contentUuid: "10a5370c-093f-5e55-83f7-16737d7311eb"
diamondUuid: "710fede2-2cf1-817d-9ced-9f5dc1fe068b"
uuid: "5e60252d-004f-8e94-943a-149887872c91"
horo: 4
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
  - "ISO 19011:2018 audit-trail test-evidence`"
  - "ISO/IEC 14496-30 timed-text-formats"
  - "ISO/IEC 14496-30 timed-text-formats`"
  - W3C WebVTT
  - "W3C WebVTT video-text-track-format"
  - "W3C WebVTT video-text-track-format`"
  - "W3C WebVTT`"
  - "WCAG-2.1 §1.2.2 captions-prerecorded"
  - "WCAG-2.1 §1.2.5 audio-description-prerecorded"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "e2ed81fa-3e09-8158-9ba7-5312a353d017"
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
      stageUuid: "7b186a02-fbac-8d7f-91d8-9f53a9463bf7"
    - stage: seal
      stageUuid: "092177d6-3cf9-83a8-ac08-d5489e56d441"
    - stage: uuid
      stageUuid: "c9001c32-a16d-8f91-b6d8-a1356029fde8"
version: 2
---
# capture/media — test artifacts into [[media]]

The test-artifact uploader. It walks a Playwright `test-results` directory, reads its `manifest.json`, and for each test uploads the recorded video, its screenshots, and a generated WebVTT subtitle track into the [[media]] collection — returning the resulting Media ids grouped by test. `buildWebVtt` turns a sequence of `{title, ts}` steps into a valid `WEBVTT` body with monotonic `HH:MM:SS.mmm` cues, each cue running to the next step's offset and the final cue closing at `durationMs` (or a `start + 3s` floor). The uploaded artifacts become provenance-bearing [[audit]] evidence (ISO 19011:2018) that the captioned marketing pages can embed.

Matter-twin: `src/capture/media/index.ts` (`uploadTestArtifacts` · `buildWebVtt`).

**Law — [[law]]: every recorded test artifact becomes a [[media]] record, and every video carries a WebVTT track built from its step titles — captured evidence is always captioned and provenance-bearing.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C WebVTT video-text-track-format`
- `@standard ISO/IEC 14496-30 timed-text-formats`
- `@standard ISO 19011:2018 audit-trail test-evidence`
- `@standard W3C WebVTT`
