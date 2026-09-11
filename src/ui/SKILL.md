---
name: ui
description: "Use when mounting shadcn/Radix primitives — the component catalog under src/ui/ (Tooltip, Dialog, Tabs, Collapsible, Sonner, etc.) wired to corpus-computed CSS and live quantum dimension surfaces."
atomPath: ui
coordinate: "ui · 8/crest · 6b68deea"
contentUuid: "aad04f12-9c49-5234-be92-60b48998ae29"
diamondUuid: "d315b9cc-ffe8-81e8-874c-bf7bffb7e082"
uuid: "6b68deea-b631-8306-b87e-6aed37b0028c"
horo: 8
typography:
  partition: ui
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "449a118a-5d7b-806a-bd00-5f65d85f9332"
  stages:
    - stage: path
      stageUuid: "09079ab5-fd34-8e22-b520-35b73213abcb"
    - stage: trinity
      stageUuid: "5b00584f-c2a7-859d-a090-1cf35ea49e52"
    - stage: boundary
      stageUuid: "5a5324fa-122b-88c1-bc81-584ae4918974"
    - stage: links
      stageUuid: "4b68ab3a-9770-8c70-8f79-1dbe25414a96"
    - stage: horo
      stageUuid: "0180636d-21d0-80b8-b63e-403cb57ada26"
    - stage: seal
      stageUuid: "1f63000f-f10c-8403-b937-958053aeb5dc"
    - stage: uuid
      stageUuid: "fd2df276-5ab6-8d99-b7e9-09f37890c758"
version: 2
---
# ui

The **shadcn/ui barrel** — Radix primitives + `cn` utility exported from `src/ui/`. Every component is a thin wrapper over `@radix-ui/*` with corpus-computed theme tokens from [[css]] `ComputedCssProvider` (never hand-maintained hex).

## Catalog

46 components + `cn` — Accordion · Alert · AlertDialog · Avatar · Badge · Breadcrumb · Button · Calendar · Card · Carousel · Chart · Checkbox · Collapsible · Command · ContextMenu · Dialog · Drawer · DropdownMenu · Form · HoverCard · Input · Label · Menubar · NavigationMenu · Pagination · Popover · Progress · RadioGroup · Resizable · ScrollArea · Select · Separator · Sheet · Sidebar · Skeleton · Slider · Sonner (`Toaster`) · Switch · Table · Tabs · Textarea · Toggle · ToggleGroup · Tooltip.

Import: `import { Tabs, Tooltip, Toaster } from '@/ui'`.

## Quantum dimension surfaces

[[quantum]] projection axes bind to Radix in realtime:

| Component | Radix primitive | Quantum binding |
|-----------|-----------------|-----------------|
| `RadixDimensionPanel` | Tabs · Collapsible · Tooltip | One tab per axis (`1d-path` … `deployment`); live `coordinateAddress` · seal · eb · `analogResults` |
| `QuantumDimensionsProvider` | (context) | `buildDimensionSnapshot()` diff → `dimensionRealtimeEmit()` → Sonner toast |
| `Toaster` | Sonner | Per-dimension collapse transition notifications |

Admin: `ComputedCssAdminRoot` → `QuantumDimensionsProvider` → `RadixDimensionPanel` on `afterDashboard`. Frontend: `@/provider` wraps the same provider (emit off by default; toast on admin poll).

Matter-twin: `src/ui/index.ts` (barrel) · `src/quantum/RadixDimensionPanel.tsx` · `src/quantum/QuantumDimensionsProvider.tsx`.

**Law — [[law]]: UI theme is computed from diamond state via `ComputedCssProvider`; Radix primitives are the only interactive surfaces — no hand-rolled modals or tooltips off-catalog.**

**Law — [[law]]: quantum dimension panels use Tabs · Collapsible · Tooltip from this catalog; dimension collapse toasts route through Sonner (`Toaster`) already mounted in admin and frontend provider trees.**

@see [[css]] · [[quantum]] · [[dimension]] · [[ui]]
