/**
 * cli/progress-heartbeat — stderr tick so long CLI runs are not silent.
 */
export function startProgressHeartbeat(
  label: string,
  intervalMs = 30_000,
): () => void {
  const started = Date.now()
  const tick = (): void => {
    const sec = Math.floor((Date.now() - started) / 1000)
    process.stderr.write(`${label} — still running (${sec}s)\n`)
  }
  tick()
  const id = setInterval(tick, intervalMs)
  id.unref?.()
  return () => clearInterval(id)
}
