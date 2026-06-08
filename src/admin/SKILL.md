---
name: admin
description: "Use when configuring the Payload Admin Panel or building custom admin React components — list/edit views, custom field/cell components, importMap, useField/useForm hooks, nav grouping, dashboards, or admin appearance."
atomPath: admin
coordinate: admin · 5/round · 83ab5c03
contentUuid: "321e959e-d01e-5941-b4f7-7edbe94cc495"
diamondUuid: "2b0ced02-50ee-8d89-993a-781d33f57afc"
uuid: "83ab5c03-440c-8a97-879d-81b20c1a45bd"
horo: 5
bonds:
  in:
    - access
    - auth
    - components
    - hooks
    - law
    - optimize
    - pages
    - port
    - round
    - search
    - spec
    - tag
  out:
    - access
    - auth
    - components
    - hooks
    - law
    - optimize
    - pages
    - port
    - round
    - search
    - spec
    - tag
typography:
  partition: admin
  bondDegree: 0
  neighbors: []
standards:
  - "ECMA-262"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-CSDDD-2024/1760"
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "W3C-WAI-ARIA-1.2"
bindings: []
neighbors:
  wikilink:
    - auth
    - hooks
    - law
    - optimize
  matrix:
    - access
    - auth
    - components
    - hooks
    - law
    - optimize
    - pages
    - port
    - round
    - search
    - spec
    - tag
  backlinks:
    - access
    - auth
    - components
    - hooks
    - law
    - optimize
    - pages
    - port
    - round
    - search
    - spec
    - tag
signatures:
  computationUuid: "06bc15bd-32a7-89f3-a896-5a0676a71f59"
  stages:
    - stage: path
      stageUuid: "b7196707-0f09-8c5d-8864-49c583aa4eca"
    - stage: trinity
      stageUuid: "5ed3a8fb-ce3c-8728-ade9-5833b7dbbf03"
    - stage: boundary
      stageUuid: "812d0615-4499-8469-bde5-09d83baec3e9"
    - stage: links
      stageUuid: "5560dc16-93b3-8368-a58f-de5d0bb8deb4"
    - stage: horo
      stageUuid: "f6747a37-8b9b-84db-809f-f6c8df56147e"
    - stage: seal
      stageUuid: "b250497a-b378-8f84-817b-0c79bbb7797c"
    - stage: uuid
      stageUuid: "004730dc-ba3d-837d-9b4a-576492b0bc55"
version: 2
---
# admin — the Admin Panel & custom components (position 5 of the material cycle)

The admin is a Next.js App-Router React app, auto-generated from the config and fully customizable. Configure via `config.admin` and per-collection/field `admin`.

## config.admin options
| Option | Purpose |
|---|---|
| `user` | Slug of the auth collection that logs into admin (see [[auth]]). |
| `components` | Override/extend UI: `Nav`, `views`, `graphics`, `actions`, `beforeDashboard`, `afterDashboard`, providers. |
| `livePreview` | Live preview config (url, breakpoints). |
| `meta` | Title, icons, OpenGraph. |
| `dateFormat`, `theme`, `avatar` | Appearance. |
| `importMap` | Generated map of custom component paths (run `payload generate:importmap`). |

## Custom components
Reference by **string path** (not import) in config; Payload resolves via the import map. Types: field components (`admin.components.Field`/`Cell`/`Label`), views, providers. Client components use Payload React hooks: `useField`, `useForm`, `useFormFields`, `useDocumentInfo`, `useAuth`, `usePayloadAPI`, `useConfig`, `useLocale`. (Distinct from server [[hooks]].)

## Per-field/collection admin
`admin.hidden`, `readOnly`, `position: 'sidebar'`, `description`, `condition`, `components`, `disableListColumn`, `useAsTitle`, `defaultColumns`, `group` (nav grouping), `listSearchableFields`.

## erpax admin-ui plugin (`src/plugins/admin-ui`)

Registered last in `payload.config.ts` so it sees the full assembled config.

| Surface | Path | Behavior |
|---|---|---|
| List cells | `src/admin/ui/cells/*` | Path account code, seal badge, horo digit, content-uuid chip on every factory collection |
| Dashboard | `src/admin/ui/dashboard/CorpusEntropyDashboard` | `afterDashboard` — corpus entropy/seal rollup (eb) from `deriveModel` |
| Nav | `src/admin/ui/nav/CorpusNavLinks` | `beforeNavLinks` — nested groups from `navigationGroupsFromPaths` → admin collection links |
| Relationship UI | `src/admin/ui/fields/MatrixBondField` | `bidirectionalCrossOf` bond graph under relationship fields |
| Party entanglement | `src/admin/ui/fields/EntanglementWarningField` | `fieldEntanglementOf` warnings on invoice `parties.*` |
| Medical modality | `src/admin/ui/fields/MedicalModalityPickerField` | `medical/device` registry on `bookable-resources.medicalModality` |
| Field visibility | `src/admin/ui/field-visibility.ts` | `admin.condition` from `@/access` computed cross (e.g. invoice `fiscal` group) |

After adding components: `pnpm payload generate:importmap`.

## Common mistakes
- Adding a custom component but not regenerating the import map (`payload generate:importmap`) → component not found.
- Importing the whole `@payloadcms/ui` in a custom component (bloats bundle — import the specific element, see [[optimize]]).
- Confusing admin React hooks with server lifecycle [[hooks]].

**Law — [[law]]: the Admin Panel is a React app auto-generated from the config; custom components are referenced by string path and resolved via the regenerated import map — never imported directly.**
