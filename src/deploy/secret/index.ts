import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
/**
 * deploy/secret — a lane that cannot run is not a lane, and you should not learn that by pushing.
 *
 * Every Cloudflare deploy this repo has ever triggered died on its first step:
 *
 *     ✖ Missing GitHub Actions secrets: CLOUDFLARE_API_TOKEN PAYLOAD_SECRET
 *
 * The workflow's own guard is right to be there and it fires too late — after a push, after CI,
 * inside a run someone has to open and read. Nothing local knew, so nothing local said. That is
 * the shape [[rules]]/unraised names: the condition was checkable the whole time and no check
 * asked, so "the deploy works" read as true until a human went looking.
 *
 * It is checkable BEFORE the push, and cheaply: the workflows declare what they need
 * (`secrets.NAME`), and GitHub will list what the repository holds. The difference is the answer.
 *
 * @see ./SKILL.md
 */

/** One `secrets.NAME` reference — the name, and the workflow that cannot run without it. */
export interface SecretRequirement {
  readonly name: string
  readonly workflow: string
}

/**
 * What GitHub holds, and WHETHER WE KNOW.
 *
 * `known: false` is not `names: []`. A shell glob that errored and returned nothing once let this
 * corpus read absence of evidence as evidence of absence ([[rules]]/unraised); an unauthenticated
 * `gh`, no network, or a token without the secrets scope must report UNKNOWN and never "missing".
 */
export interface SecretInventory {
  readonly known: boolean
  readonly names: ReadonlySet<string>
  readonly why: string
}

/** Always injected by Actions — referencing it requires nothing of anyone. */
const PROVIDED = new Set(['GITHUB_TOKEN'])

const SECRET_REF = /\bsecrets\.([A-Za-z_][A-Za-z0-9_]*)/g

/** Every secret the workflows in this repo reference, deduped per workflow. */
export function requiredSecrets(cwd: string = process.cwd()): SecretRequirement[] {
  const dir = join(cwd, '.github', 'workflows')
  if (!existsSync(dir)) return []
  const out: SecretRequirement[] = []
  const seen = new Set<string>()
  for (const file of readdirSync(dir).sort()) {
    if (!/\.ya?ml$/.test(file)) continue
    let text = ''
    try {
      text = readFileSync(join(dir, file), 'utf8')
    } catch {
      continue
    }
    for (const m of text.matchAll(SECRET_REF)) {
      const name = m[1]!
      if (PROVIDED.has(name)) continue
      const key = `${file} ${name}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ name, workflow: file })
    }
  }
  return out
}

const ghJson = (path: string, cwd: string): unknown => {
  const raw = execFileSync('gh', ['api', path, '--paginate'], {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    maxBuffer: 1 << 24,
  })
  return JSON.parse(raw) as unknown
}

const namesFrom = (payload: unknown): string[] => {
  const secrets = (payload as { secrets?: { name?: string }[] } | null)?.secrets
  return Array.isArray(secrets) ? secrets.flatMap((s) => (s?.name ? [s.name] : [])) : []
}

/**
 * The secret NAMES this repository can see — its own, plus the organisation secrets shared with it.
 *
 * Values are never readable, by anyone, which is the whole point of a secret; so this proves a name
 * is CONFIGURED, never that it is correct. A wrong token still fails at the API call — that is a
 * different failure, and it at least fails where it is used rather than before anything is tried.
 */
export function configuredSecretNames(cwd: string = process.cwd()): SecretInventory {
  const names = new Set<string>()
  let sawAny = false
  for (const path of ['repos/{owner}/{repo}/actions/secrets', 'repos/{owner}/{repo}/actions/organization-secrets']) {
    try {
      for (const n of namesFrom(ghJson(path, cwd))) names.add(n)
      sawAny = true
    } catch {
      /* one endpoint may 404 (no org) while the other answers — only ALL failing is unknown */
    }
  }
  return sawAny
    ? { known: true, names, why: 'listed from the GitHub Actions API' }
    : { known: false, names, why: 'gh could not list secrets — unauthenticated, offline, or missing scope' }
}

export interface SecretVerdict {
  readonly known: boolean
  readonly missing: readonly SecretRequirement[]
  readonly why: string
}

/**
 * The requirements nothing configured can satisfy.
 *
 * Fails OPEN when the inventory is unknown — an offline machine must not manufacture a missing
 * secret, and a gate that cries wolf on every plane flight is one nobody reads.
 */
export function missingSecrets(cwd: string = process.cwd()): SecretVerdict {
  const inventory = configuredSecretNames(cwd)
  if (!inventory.known) return { known: false, missing: [], why: inventory.why }
  const missing = requiredSecrets(cwd).filter((r) => !inventory.names.has(r.name))
  return { known: true, missing, why: inventory.why }
}

/** One line per lane that cannot run, or the reason we cannot say. */
export function formatSecretVerdict(v: SecretVerdict): string {
  if (!v.known) return `secrets — UNKNOWN (${v.why}); not treating that as missing`
  if (v.missing.length === 0) return '✓ secrets — every workflow reference is configured'
  const byWorkflow = new Map<string, string[]>()
  for (const m of v.missing) byWorkflow.set(m.workflow, [...(byWorkflow.get(m.workflow) ?? []), m.name])
  return [
    `✖ ${v.missing.length} workflow secret(s) referenced and NOT configured — those lanes die on their first step:`,
    ...[...byWorkflow].map(([wf, names]) => `    ${wf} — ${names.join(' · ')}`),
    '  Repo → Settings → Secrets and variables → Actions',
  ].join('\n')
}

/** @index-cross.foldback child=deploy/secret parent=deploy — this cross folds back into its parent. */
