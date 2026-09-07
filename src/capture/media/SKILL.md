---
name: media
description: "Use when turning Playwright test artifacts into Media records — screenshots and videos are uploaded to the Media collection and each video gets a WebVTT subtitle track built from its test step titles, so marketing pages can embed live, captioned evidence of documented capabilities."
atomPath: "capture/media"
coordinate: "capture/media · 1/base · 21f18461"
contentUuid: "fb07d33e-f696-532b-aa42-ba27b6439993"
diamondUuid: "bb078213-2d9a-84ac-a1d2-f37e07398eb8"
uuid: "21f18461-7f1b-84c4-a213-925556d87823"
horo: 1
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
  computationUuid: "b11d615d-507c-83d2-be6d-b0b1586b662d"
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
      stageUuid: "3b451ee6-e6c7-84a7-81b5-1ba226bad8f7"
    - stage: seal
      stageUuid: "092177d6-3cf9-83a8-ac08-d5489e56d441"
    - stage: uuid
      stageUuid: "8c46e16e-a47d-8a83-8e0a-88950ce858a1"
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
