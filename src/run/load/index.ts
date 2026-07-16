/**
 * load — does the app run at all?
 *
 * Twelve gates read STRUCTURE. None can say the sentence that matters: a user cannot open this app. Only
 * loading it says that — and it fails, at src/fixed/assets:34, in every loader tried:
 *
 *   tsx / node ESM        ReferenceError: Cannot access 'createAccountingCollection' before initialization
 *   vitest / Vite         the same TDZ, same line
 *   next dev / turbopack  a different defect: src/pages collides with Next's reserved Pages Router dir
 *
 * The harness has been swallowing it. Every suite prints "payload migrate timed out … Skipping" and carries
 * on, so every file labelled `payload-integration` runs with NO booted Payload. See this atom's SKILL.
 *
 * The proof is test.ts, and it is RED ON PURPOSE. This face exists so the question is addressable and can be
 * run on demand rather than only by the suite.
 *
 * Composes [[rules]]/cycle · [[law]].
 */

/** Canonical atom path. */
export const atomPath = 'load' as const

export interface LoadVerdict {
  readonly loads: boolean
  readonly collections: number
  readonly error?: string
}

/** Boot payload.config for real and report what happened. No catch-and-continue: the failure IS the answer. */
export async function bootVerdict(): Promise<LoadVerdict> {
  try {
    const mod: Record<string, unknown> = await import('@payload-config')
    const d = mod.default as { then?: unknown } | undefined
    const cfg = (typeof d?.then === 'function' ? await d : d) as { collections?: unknown[] } | undefined
    return { loads: true, collections: cfg?.collections?.length ?? 0 }
  } catch (e) {
    return { loads: false, collections: 0, error: String((e as Error).message).split('\n')[0] }
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  bootVerdict().then((v) => {
    console.log(v.loads ? `load — OK · ${v.collections} collections` : `load — FAILED · ${v.error}`)
    process.exit(v.loads ? 0 : 1)
  })
}
