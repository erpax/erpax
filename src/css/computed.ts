/**
 * computed — shadcn + Payload admin CSS variables derived from diamond state.
 *
 * Token source (priority order for chroma):
 *   1. contentUuid → pixel(uuid).color (digit → A432 spectrum)
 *   2. horo → signalForStep(step).hex (CMYK channel)
 *   3. path → pixel(uuid({ path })).color (path IS the account code)
 *
 * Seal state sets success/warning; mode flips the neutral plane.
 *
 * @see ./SKILL.md — ../pixel — ../signal — ../design — ../accounting/coa
 */
import { accountCodeOf } from '@/accounting'
import { colorOf, GREEN } from '@/color'
import { digitalRootOfUuid } from '@/digit'
import { uuid, jcsCanonicalize } from '@/integrity'
import { isHoroStep, type HoroStep } from '@/horo'
import { pixel } from '@/pixel'
import { CMYK, signalForStep } from '@/signal'

export type CssMode = 'light' | 'dark'

export type UiSurfaceKind = 'frontend' | 'admin' | 'widget' | 'dashboard' | 'block'

/** One UI mount point — every token is computed from these facets, never hand-painted. */
export interface UiSurface {
  readonly contentUuid?: string
  readonly horo?: number
  readonly sealed?: boolean
  readonly path?: string
  readonly mode?: CssMode
  readonly kind?: UiSurfaceKind
}

/** shadcn CSS custom properties consumed by src/ui/* and globals.css @theme inline. */
export const SHADCN_TOKEN_KEYS = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'radius',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
  'success',
  'warning',
  'error',
] as const

export type ShadcnTokenKey = (typeof SHADCN_TOKEN_KEYS)[number]

export type ComputedCssTokens = Record<ShadcnTokenKey, string>

const CORPUS_ROOT_UUID = '826aff60-f962-578d-aaaf-8fb237567bea'

type Rgb = { readonly r: number; readonly g: number; readonly b: number }

function parseHex(hex: string): Rgb {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function toHex({ r, g, b }: Rgb): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  )
}

/** Mix two hex colours; t=0 → a, t=1 → b. */
export function mixHex(a: string, b: string, t: number): string {
  const A = parseHex(a)
  const B = parseHex(b)
  const w = Math.max(0, Math.min(1, t))
  return toHex({
    r: A.r + (B.r - A.r) * w,
    g: A.g + (B.g - A.g) * w,
    b: A.b + (B.b - A.b) * w,
  })
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex)
  const lin = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/** Pick readable text on a chroma surface. */
export function contrastForeground(bg: string, light = '#fafafa', dark = '#171717'): string {
  return relativeLuminance(bg) > 0.45 ? dark : light
}

function pathUuid(path: string): string {
  const code = accountCodeOf(path)
  return uuid(jcsCanonicalize({ path: code }))
}

function horoStepOf(n: number | undefined): HoroStep | undefined {
  if (n == null || !Number.isFinite(n)) return undefined
  if (isHoroStep(n)) return n
  const root = ((Math.trunc(n) - 1) % 9) + 1
  return isHoroStep(root) ? root : 1
}

/** Primary chroma — uuid → horo signal → path pixel. */
export function chromaOf(surface: UiSurface): string {
  if (surface.contentUuid) return pixel(surface.contentUuid).color
  const step = horoStepOf(surface.horo)
  if (step) return signalForStep(step).hex
  if (surface.path) return pixel(pathUuid(surface.path)).color
  return pixel(CORPUS_ROOT_UUID).color
}

function neutralPlane(chroma: string, mode: CssMode): { bg: string; fg: string; muted: string; border: string } {
  const substrate = CMYK.K
  const paper = '#fafafa'
  if (mode === 'dark') {
    const bg = mixHex(substrate, chroma, 0.12)
    const card = mixHex(substrate, chroma, 0.18)
    const _muted = mixHex(substrate, chroma, 0.28)
    const border = mixHex(substrate, chroma, 0.38)
    const fg = contrastForeground(bg)
    return { bg, fg, muted: card, border }
  }
  const bg = mixHex(paper, chroma, 0.04)
  const card = mixHex(paper, chroma, 0.08)
  const _muted = mixHex(paper, chroma, 0.14)
  const border = mixHex(paper, chroma, 0.22)
  const fg = contrastForeground(bg, '#fafafa', '#1a1a1a')
  return { bg, fg, muted: card, border }
}

function chartFromHoro(surface: UiSurface): readonly [string, string, string, string, string] {
  const step = horoStepOf(surface.horo) ?? 1
  const ring = [1, 2, 4, 8, 7, 5, 9] as const
  const idx = ring.indexOf(step)
  const picks = [
    colorOf(ring[(idx + 0) % 7] ?? 1),
    colorOf(ring[(idx + 1) % 7] ?? 2),
    colorOf(ring[(idx + 2) % 7] ?? 4),
    colorOf(ring[(idx + 3) % 7] ?? 8),
    colorOf(ring[(idx + 4) % 7] ?? 7),
  ] as const
  return picks
}

function radiusOf(surface: UiSurface): string {
  const digit = surface.horo ?? (surface.contentUuid ? digitalRootOfUuid(surface.contentUuid) : 7)
  const rem = 0.5 + (digit % 9) * 0.025
  return `${rem}rem`
}

/**
 * Derive the full shadcn token map for a UI surface.
 * Same surface inputs ⇒ same tokens (merge-safe, tamper-evident).
 */
export function computedCssForUi(surface: UiSurface = {}): ComputedCssTokens {
  const mode: CssMode = surface.mode ?? 'light'
  const chroma = chromaOf(surface)
  const plane = neutralPlane(chroma, mode)
  const primaryFg = contrastForeground(chroma)
  const accent = surface.horo != null && horoStepOf(surface.horo)
    ? signalForStep(horoStepOf(surface.horo)!).hex
    : mixHex(chroma, colorOf(4), 0.35)

  const sealed = surface.sealed
  const success = sealed === false ? CMYK.Y : GREEN
  const warning = sealed === false ? CMYK.Y : mixHex(GREEN, CMYK.Y, 0.5)
  const error = colorOf(1)
  const destructive = error

  const [c1, c2, c3, c4, c5] = chartFromHoro(surface)
  const secondary = mixHex(plane.muted, chroma, 0.2)
  const mutedFg = mixHex(plane.fg, plane.bg, 0.45)

  return {
    background: plane.bg,
    foreground: plane.fg,
    card: plane.muted,
    'card-foreground': plane.fg,
    popover: plane.bg,
    'popover-foreground': plane.fg,
    primary: chroma,
    'primary-foreground': primaryFg,
    secondary,
    'secondary-foreground': plane.fg,
    muted: mixHex(plane.muted, plane.bg, 0.5),
    'muted-foreground': mutedFg,
    accent,
    'accent-foreground': contrastForeground(accent),
    destructive,
    'destructive-foreground': contrastForeground(destructive, '#fef2f2', destructive),
    border: plane.border,
    input: plane.border,
    ring: mixHex(chroma, plane.fg, 0.55),
    'chart-1': c1,
    'chart-2': c2,
    'chart-3': c3,
    'chart-4': c4,
    'chart-5': c5,
    radius: radiusOf(surface),
    sidebar: mixHex(plane.bg, chroma, mode === 'dark' ? 0.08 : 0.03),
    'sidebar-foreground': plane.fg,
    'sidebar-primary': chroma,
    'sidebar-primary-foreground': primaryFg,
    'sidebar-accent': secondary,
    'sidebar-accent-foreground': plane.fg,
    'sidebar-border': plane.border,
    'sidebar-ring': mixHex(chroma, plane.fg, 0.55),
    success,
    warning,
    error,
  }
}

/** CSS custom-property names (--background, --primary, …). */
export function computedCssVarName(key: ShadcnTokenKey): string {
  return `--${key}`
}

/** Inline style object for React — shadcn tokens only. */
export function computedCssStyleObject(tokens: ComputedCssTokens): Record<string, string> {
  const style: Record<string, string> = {}
  for (const key of SHADCN_TOKEN_KEYS) {
    style[computedCssVarName(key)] = tokens[key]
  }
  return style
}

/** Payload admin elevation + status aliases mapped onto computed tokens. */
export function payloadAdminAliases(tokens: ComputedCssTokens): Record<string, string> {
  return {
    '--theme-elevation-0': tokens.background,
    '--theme-elevation-50': tokens.muted,
    '--theme-elevation-100': tokens.secondary,
    '--theme-elevation-150': tokens.border,
    '--theme-elevation-500': tokens['muted-foreground'],
    '--theme-elevation-600': tokens['muted-foreground'],
    '--theme-elevation-800': tokens.foreground,
    '--theme-success-100': mixHex(tokens.success, tokens.background, 0.82),
    '--theme-success-200': mixHex(tokens.success, tokens.background, 0.65),
    '--theme-success-800': mixHex(tokens.success, tokens.foreground, 0.35),
    '--theme-warning-100': mixHex(tokens.warning, tokens.background, 0.82),
    '--theme-warning-150': mixHex(tokens.warning, tokens.border, 0.45),
    '--theme-warning-600': mixHex(tokens.warning, tokens.foreground, 0.4),
    '--theme-warning-800': mixHex(tokens.warning, tokens.foreground, 0.25),
  }
}

/** Full runtime injection map — shadcn + Payload admin. */
export function computedCssInjection(tokens: ComputedCssTokens): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of SHADCN_TOKEN_KEYS) {
    out[computedCssVarName(key)] = tokens[key]
  }
  Object.assign(out, payloadAdminAliases(tokens))
  return out
}

/** Default corpus surface — root skills diamond. */
export const DEFAULT_UI_SURFACE: UiSurface = {
  contentUuid: CORPUS_ROOT_UUID,
  path: 'skills',
  horo: 1,
  sealed: true,
  kind: 'frontend',
}
