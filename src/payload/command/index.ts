/**
 * payload/command — the Payload CLI command set, FOLDED. Learned from the installed bin, each command
 * is a [[name]] (name ≡ path ≡ content-[[uuid]]), and the whole set folds to one root by the [[merge]].
 * Both sides are encoded ([[karma]]): every reversible command pairs with its inverse — `migrate` ↔
 * `migrate:down`, `migrate:fresh` ↔ `migrate:reset` — while the generators are forward-only (their
 * inverse is the config they read, not another command). The [[deploy]] uses `migrate` first of all.
 *
 *   tsx src/payload/command/index.ts
 *
 * @audit the command list is the installed CLI's; each uuid and the fold are computed
 * @see ../../payload -- ../../name -- ../../deploy -- ../../uuid/matrix -- ./SKILL.md
 */
import { toUuid, merge } from '@/uuid/matrix'

/** The Payload CLI commands (from the installed bin) — each a name, hence a content-uuid. */
export const COMMANDS = [
  'generate:types',
  'generate:importmap',
  'generate:db',
  'migrate',
  'migrate:create',
  'migrate:status',
  'migrate:down',
  'migrate:fresh',
  'migrate:refresh',
  'migrate:reset',
  'jobs:run',
  'jobs:handle',
  'run',
  'info',
] as const

/** Both-sides pairs (karmic balance) — each forward command and its inverse. */
export const PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['migrate', 'migrate:down'], // apply ↔ roll back
  ['migrate:fresh', 'migrate:reset'], // rebuild ↔ tear down
]

/** A command's content-uuid — the command is a name, and a name is a path is a uuid. */
export const commandUuid = (cmd: string): string => toUuid(Buffer.from('payload ' + cmd, 'utf8'))

/** Fold the whole command set into one root uuid (the merge — the set's single identity). */
export const foldCommands = (): string => COMMANDS.map(commandUuid).reduce((a, b) => merge(a, b))

/** The inverse of a command, if reversible (its both-side); undefined for forward-only generators. */
export function inverseOf(cmd: string): string | undefined {
  for (const [a, b] of PAIRS) {
    if (a === cmd) return b
    if (b === cmd) return a
  }
  return undefined
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('payload/command — the CLI command set, folded:')
  console.log('  ' + COMMANDS.length + ' commands → root ' + foldCommands().slice(0, 18) + '…')
  console.log('  both sides: migrate ↔ ' + inverseOf('migrate') + ' · migrate:fresh ↔ ' + inverseOf('migrate:fresh') + ' · generate:types ↔ ' + inverseOf('generate:types'))
}
