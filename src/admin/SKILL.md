---
name: admin
description: "Use when configuring the Payload Admin Panel or building custom admin React components — list/edit views, custom field/cell components, importMap, useField/useForm hooks, nav grouping, dashboards, or admin appearance."
atomPath: admin
coordinate: "admin · 1/base · 4c0140ef"
contentUuid: "00f26c2b-f2a3-5ce3-851c-05d533f5f892"
diamondUuid: "54893056-aa3c-8d27-ac40-8256a6bf2248"
uuid: "4c0140ef-05e9-8a85-80c4-8e3be5b14006"
horo: 1
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
  computationUuid: "f5b06410-e7bd-83cd-9f1b-6ab5029768cc"
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
      stageUuid: "12e47817-fef1-893e-8877-c641cd49c841"
    - stage: seal
      stageUuid: "c8b23457-e8e5-88d1-81a5-300a457c29dd"
    - stage: uuid
      stageUuid: "750ddc08-e34a-8f6b-9b31-def63bd5f8f1"
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
