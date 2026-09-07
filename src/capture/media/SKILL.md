---
name: media
description: "Use when turning Playwright test artifacts into Media records — screenshots and videos are uploaded to the Media collection and each video gets a WebVTT subtitle track built from its test step titles, so marketing pages can embed live, captioned evidence of documented capabilities."
atomPath: "capture/media"
coordinate: "capture/media · 7/descent · 1388dbc6"
contentUuid: "66725942-9491-5c26-9f02-5ef9e65e81e3"
diamondUuid: "11e615e0-4829-8516-bc39-883b1e41bd1d"
uuid: "1388dbc6-ff86-83b2-87ea-85477b30135f"
horo: 7
typography:
  partition: capture
  bondDegree: 96
standards:
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
signatures:
  computationUuid: "e09e8e27-5f0c-8fb2-8eec-73a3e36e943c"
  stages:
    - stage: path
      stageUuid: "265f8640-7dbd-8b19-836b-fdeee6b00254"
    - stage: trinity
      stageUuid: "8faaf704-5ff2-884f-9a87-787a717d8576"
    - stage: boundary
      stageUuid: "05fee23d-ade4-83dd-a542-eddc24b4e6f0"
    - stage: links
      stageUuid: "f09f9534-5e38-81b6-823c-769935bf9c7e"
    - stage: horo
      stageUuid: "2d5a179d-8d10-804b-866c-63a2a9202108"
    - stage: seal
      stageUuid: "092177d6-3cf9-83a8-ac08-d5489e56d441"
    - stage: uuid
      stageUuid: "86be1b83-13db-8819-abc0-105b68868458"
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
