---
name: media
description: "Use when turning Playwright test artifacts into Media records — screenshots and videos are uploaded to the Media collection and each video gets a WebVTT subtitle track built from its test step titles, so marketing pages can embed live, captioned evidence of documented capabilities."
atomPath: "capture/media"
coordinate: "capture/media · 7/descent · 4e2fea5f"
contentUuid: "6d977a29-0510-5b4e-af47-01b4694c10f1"
diamondUuid: "3973707a-95d3-8fbb-b468-f6d18e09c242"
uuid: "4e2fea5f-abdf-892b-bf0b-3b5d7c19043b"
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
  computationUuid: "835f5056-207a-8458-bff6-9dd5514db80f"
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
      stageUuid: "8c91a7d8-143b-8ada-b4e3-61cece0fcc2d"
    - stage: seal
      stageUuid: "092177d6-3cf9-83a8-ac08-d5489e56d441"
    - stage: uuid
      stageUuid: "63b61b6f-80da-8846-8009-14a7a9016c88"
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
