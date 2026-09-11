---
name: admin
description: "Use when configuring the Payload Admin Panel or building custom admin React components — list/edit views, custom field/cell components, importMap, useField/useForm hooks, nav grouping, dashboards, or admin appearance."
atomPath: admin
coordinate: "admin · 2/share · cabacc6e"
contentUuid: "f944b7a3-9f8a-5903-b9be-34f389e1d4a4"
diamondUuid: "079ec131-fba6-8505-adcc-a4f8946221f8"
uuid: "cabacc6e-451d-822a-96a1-abc7adf9324e"
horo: 2
typography:
  partition: admin
  bondDegree: 39
standards:
  - "ECMA-262"
  - "EU-CSDDD-2024/1760"
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "e724a721-f238-8aec-8540-a22b4c0527e4"
  stages:
    - stage: path
      stageUuid: "b7196707-0f09-8c5d-8864-49c583aa4eca"
    - stage: trinity
      stageUuid: "c0c1fd9d-3c44-8742-a308-2b5b0eebac54"
    - stage: boundary
      stageUuid: "4ff0b2f0-86ab-8be6-af2c-13649ed108f3"
    - stage: links
      stageUuid: "5560dc16-93b3-8368-a58f-de5d0bb8deb4"
    - stage: horo
      stageUuid: "fb8be5df-d205-82ff-8598-b674f810a3ff"
    - stage: seal
      stageUuid: "c8b23457-e8e5-88d1-81a5-300a457c29dd"
    - stage: uuid
      stageUuid: "84bfef8d-64c0-87de-aaa2-ddf2c4f72147"
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

## erpax admin-ui plugin (`src/plugins/admin/ui`)

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
