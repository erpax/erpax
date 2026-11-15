/**
 * secret — `PAYLOAD_SECRET`, the one root secret.
 *
 * Every internal key derives from it (src/utilities/nist/sp/800/108: the cron and inbound-mail tokens,
 * preview links, field encryption), and on Cloudflare it is a Worker secret, encrypted at rest. A second
 * path that sealed `PAYLOAD_SECRET` under `ERPAX_SEAL_KEY`, or derived it from that key and the cross,
 * only moved the root into another secret that had to be kept the same way; it is gone. The value
 * comes from the environment, else from `.env` (local development).
 *
 * @invariant a real environment variable always beats the file
 * @see ../nist/sp/800/108 (every internal key, derived from this one)
 */
import fs from 'node:fs'

/**
 * Read a key from a dotenv file, without a parser and without mutating the environment. An absent or
 * unreadable file, or an empty value, is undefined: this is a fallback, never a throw.
 */
export function dotenvValue(key: string, file = '.env'): string | undefined {
  let text: string
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    return undefined
  }
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (trimmed.length === 0 || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1 || trimmed.slice(0, eq).trim() !== key) continue
    const raw = trimmed.slice(eq + 1).trim()
    const unquoted = /^(['"]).*\1$/.test(raw) ? raw.slice(1, -1) : raw
    return unquoted.length > 0 ? unquoted : undefined
  }
  return undefined
}

/** `PAYLOAD_SECRET`: the environment variable, else `.env`. */
export function resolvePayloadSecret(): string | undefined {
  return process.env.PAYLOAD_SECRET?.trim() || dotenvValue('PAYLOAD_SECRET')
}
