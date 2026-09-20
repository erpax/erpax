/**
 * verify — the barrel for the kernel-checked half of the corpus.
 *
 * The matter lives in the children: `lean` holds the sources a kernel compiles, `inventory` holds
 * the parse of what the kernel REPORTED. This face exists so a consumer says `@/verify` and gets
 * the record, without reaching past a barrel into a child's file ([[convention]]/import).
 */
export const atomPath = 'verify' as const

export * from './inventory'
