---
name: ui
description: "Use when mounting shadcn/Radix primitives — the component catalog under src/ui/ (Tooltip, Dialog, Tabs, Collapsible, Sonner, etc.) wired to corpus-computed CSS and live quantum dimension surfaces."
atomPath: ui
coordinate: "ui · 8/crest · 82cba339"
contentUuid: "0bbf0503-ed1c-5fd2-af65-d35d44de0850"
diamondUuid: "0c873687-f868-860f-ab9b-d45abfbb8d6a"
uuid: "82cba339-2a15-8b6c-a959-da4461c68b28"
horo: 8
typography:
  partition: ui
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "cdd26181-b3d8-8fd9-a3bf-f2312409f7ff"
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
      stageUuid: "3c540ce4-1fc0-81d7-9edb-f03f9a5258e1"
    - stage: seal
      stageUuid: "1f63000f-f10c-8403-b937-958053aeb5dc"
    - stage: uuid
      stageUuid: "4c367c0d-ac6c-8727-b06d-e8983b9e187b"
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
