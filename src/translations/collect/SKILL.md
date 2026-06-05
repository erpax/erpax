---
name: collect
description: Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue.
---

# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

@audit ported from the live tree, never hand-maintained
