/** test — corpus test helpers barrel. */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export {
  isNamedField,
  fieldWithValidate,
  validatorOf,
  type NamedField,
  type FieldWithValidate,
  type FieldValidator,
} from './payload-field'

/** Broad on purpose — err toward integration, so a real integration suite is never starved of its DB. */
const NEEDS_PAYLOAD =
  /getPayload|req\.payload|from ['"]payload['"]|@\/payload\b|createLocalReq|loginAsTestUser|@\/collections\b|initTestPayload|initPayload|\.db\(\)|payloadInstance|getTestPayload|bootTestPayload|bootVerdict|currentLoader|runAllInvariants|buildConfig|payload\.config|BasePayload/

/**
 * Does a suite boot Payload — directly, or through its OWN atom's code? A suite imports local helpers
 * (`./index` → bootVerdict) that boot Payload without the test file naming it, so the suite PLUS every
 * sibling `.ts`/`.tsx` in its directory is read. An unreadable directory counts as integration.
 *
 * One classifier, two readers: vitest.config.mts routes each suite into its project with it, and
 * `erpax test waves` groups a batch with it — a batch pays the Payload boot only when it holds one.
 */
export function needsPayload(suite: string, root: string = process.cwd()): boolean {
  const dir = join(root, suite.slice(0, suite.lastIndexOf('/')))
  let siblings: string[]
  try {
    siblings = readdirSync(dir)
  } catch {
    return true
  }
  for (const e of siblings) {
    if (!e.endsWith('.ts') && !e.endsWith('.tsx')) continue
    try {
      if (NEEDS_PAYLOAD.test(readFileSync(join(dir, e), 'utf8'))) return true
    } catch {
      return true
    }
  }
  return false
}
