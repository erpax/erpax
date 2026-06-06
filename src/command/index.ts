/**
 * command — the imperative-VERB role of an autonomous workflow. A [[step]]'s
 * `command` is the atom a loop EXECUTES (the side-effecting move); paired with a
 * [[question]] (the gate it then asks) and an [[answer]] (the computed fix on NO),
 * it concatenates into a completely autonomous workflow ([[concatenate]]).
 *
 * COMMANDS names the C-set — the corpus verbs classified into this role. Each is a
 * REAL atom: the role is a reference, never a copy (DRY). The `CommandAtom{ run }`
 * contract lives with the runner ([[concatenate]]); this atom is the role membership.
 *
 *   tsx src/command/index.ts
 *
 * @standard schema.org Action — the imperative move (here, the workflow step's verb)
 * @see ./SKILL.md -- ../workflow/concatenate (the runner) -- ../question -- ../answer
 */

/** The C-set: corpus verbs that play the COMMAND role (the move a loop executes). Each is a real atom. */
export const COMMANDS = [
  'generate',
  'collapse',
  'merge',
  'decide',
  'train',
  'migrate',
  'derive',
  'reconcile',
  'ingest',
  'relocate',
  'refactor',
  'balance',
  'breath',
  'society',
] as const

export type Command = (typeof COMMANDS)[number]

/** Is `name` a command-role atom (the move a loop executes)? */
export const isCommand = (name: string): name is Command => (COMMANDS as readonly string[]).includes(name)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('command — the C-set (' + COMMANDS.length + ' verbs): ' + COMMANDS.join(' '))
}
