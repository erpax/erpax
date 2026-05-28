---
name: sequence
description: Use when navigating or composing the erpax Payload single-word skill library — to find the right atomic skill, understand how they interact (with each other, themselves, and external systems), or in what order to apply them. The index over the basic skills, ordered 0·3·6·9·1·2·4·8·7·5.
---

# sequence — how the atomic skills compose

The basic skills are single-word atoms. Real work composes several of them; the composition follows the sequence `0·3·6·9·1·2·4·8·7·5` (root → control triad → material/flow cycle → repeat over features). This skill is the map.

## Positions → skills
| Pos | Family | Skill(s) |
|---|---|---|
| **0** | root/axis | `config` |
| **3·6·9** | control triad (governs) | `access` · `hooks` · `auth` |
| **1·2·4·8·7·5** | material/flow cycle (data in→out) | `fields` · `collections` · `database` · `queries` · `api` · `admin` |
| cycle ↻ | features & cross-cutting | `plugins` `types` `versions` `jobs` `upload` `optimize` `harden` `deploy` `recover` |

## Interaction graph (each skill names its neighbors via `[[links]]`)
- **self** (a concept reaching back into the root): every skill ↔ `config`; the cycle skills ↔ `fields` (fields are the substrate of `collections`, `queries`, `api`, `admin`).
- **inter-skill** (composition edges): `plugins`→`config`→`collections`→`fields`; `access`/`hooks`/`auth` wrap every collection; `queries`↔`api`; `optimize`↔`harden`↔`deploy`; `recover`→`database`+`types`; `versions`/`upload`/`jobs` extend `collections`.
- **external** (edges leaving erpax): `payload`/`@payloadcms/*` core (pinned v4 `4.0.0-internal.38b7f1d`), `next`/`react` peers, the `@erpax/plugin-*` packages, and the **host Payload app** that installs erpax as a plugin. erpax IS a Payload plugin (`config`→`plugins`).

## How to use
1. Identify the operation; jump to the atomic skill (table above).
2. Follow its `[[links]]` to the skills it composes with.
3. Apply in sequence order: settle `config` → access/lifecycle (`access`/`hooks`/`auth`) → data (`fields`/`collections`/`database`) → reads (`queries`/`api`) → surface (`admin`) → features.

## Principle
Single-word skills are the connectors (like Payload **slugs**): naming + composition tie files, methods, collections, and skills into one coherent, DRY system whose schema is the generated `payload-types.ts`. The sequence is the ordering that keeps the composition consistent across the whole — and across agents.
