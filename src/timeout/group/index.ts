/**
 * timeout/group — a timeout ends the command, not only the shell around it.
 *
 * `spawnSync(cmd, { shell: true, timeout, killSignal })` signals exactly one pid: the shell. Everything the
 * shell started is reparented to init and keeps running. Measured 2026-09-13: a laddered `erpax land`
 * reported "timed out at 5min" while its child finished a `git push` nobody saw and polled GitHub for
 * fifteen more minutes.
 *
 * spawnGroupSync keeps spawnSync's synchronous contract and its return shape, and runs the command under a
 * supervisor that leads it into its own process group and ends the whole group on the bound or on a signal.
 * The supervisor then dies by the same signal, so every caller reading `r.signal` — including the
 * OOM-versus-timeout reading by elapsed time — is unchanged.
 *
 * @law a bound ends the whole command it bounds
 * @invariant on timeout no process from the command's group survives
 * @invariant a timeout reads as r.signal === 'SIGKILL', as it did before
 * @invariant a child's own signal is re-raised, so an OOM still reads as a signal inside the bound
 * @invariant a normal exit passes its status through unchanged
 * @standard ISO/IEC 25010:2023 §5.6 maintainability — a stopped operation leaves no work running
 * @see ./SKILL.md
 */
import { spawnSync, type SpawnSyncOptions, type SpawnSyncReturns } from 'node:child_process'

/**
 * The supervisor, as source for `node -e`: no file, no loader, no type stripping, so it runs the same on
 * the Node CI installs as on a newer local one. argv: [bound in ms, command].
 */
const SUPERVISOR = `
const { spawn } = require('node:child_process')
const [ms, cmd] = process.argv.slice(1)
const child = spawn(cmd, { shell: true, stdio: 'inherit', detached: true })
const endGroup = () => { try { process.kill(-child.pid, 'SIGKILL') } catch {} }
let timedOut = false
const timer = setTimeout(() => { timedOut = true; endGroup() }, Number(ms))
const numbers = { SIGINT: 2, SIGTERM: 15, SIGHUP: 1 }
for (const s of Object.keys(numbers)) process.on(s, () => { clearTimeout(timer); endGroup(); process.exit(128 + numbers[s]) })
child.on('exit', (code, signal) => {
  clearTimeout(timer)
  if (timedOut) return process.kill(process.pid, 'SIGKILL')
  if (signal) { endGroup(); process.removeAllListeners(signal); return process.kill(process.pid, signal) }
  process.exit(code === null ? 1 : code)
})
`

/** Past the bound, the caller's own backstop — only reached if the supervisor itself wedges. */
const BACKSTOP_MS = 10_000

export type GroupSpawnOptions = Omit<SpawnSyncOptions, 'shell' | 'timeout' | 'killSignal'> & {
  /** the bound, in ms — on it the whole group is killed and the result reads r.signal === 'SIGKILL' */
  readonly timeout: number
}

/**
 * spawnGroupSync(cmd, opts) — spawnSync(cmd, { shell: true, timeout, killSignal: 'SIGKILL' }), except that
 * the timeout ends every process in the command's group rather than only the shell.
 */
export function spawnGroupSync(cmd: string, opts: GroupSpawnOptions): SpawnSyncReturns<Buffer | string> {
  const { timeout, ...rest } = opts
  // No process groups on Windows: the single-process kill is all there is, and it is kept as it was.
  if (process.platform === 'win32') return spawnSync(cmd, { ...rest, shell: true, timeout, killSignal: 'SIGKILL' })
  return spawnSync(process.execPath, ['-e', SUPERVISOR, String(timeout), cmd], {
    ...rest,
    timeout: timeout + BACKSTOP_MS,
    killSignal: 'SIGKILL',
  })
}
