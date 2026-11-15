/**
 * log — Payload's logger on Cloudflare Workers: pino's shape, written to the console as JSON lines.
 *
 * pino does not run in a Worker, so `buildConfig({ logger })` gets this object in production. Payload's
 * Cloudflare template ships one with the six level methods only, and two things broke on it:
 *   · plugins call pino's `child(bindings, { msgPrefix })` and set `level` on the child
 *     (@payloadcms/plugin-mcp's getLogger), so every authenticated MCP call threw
 *     "logger.child is not a function" and the gateway answered 500;
 *   · `JSON.stringify` writes an Error as `{}`, so every error was logged without its message.
 * Here `child` merges bindings and prefixes, `level` filters as pino's does, and errors are spelled out.
 */
import { plainError } from '@/utilities/error/plainError'

/** pino's levels, by severity. */
export const LEVELS = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60, silent: Infinity } as const
export type Level = keyof typeof LEVELS
type Method = Exclude<Level, 'silent'>
const METHODS: readonly Method[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']

/** Where each level is written. */
const SINK: Record<Method, (line: string) => void> = {
  trace: (line) => console.debug(line),
  debug: (line) => console.debug(line),
  info: (line) => console.log(line),
  warn: (line) => console.warn(line),
  error: (line) => console.error(line),
  fatal: (line) => console.error(line),
}

export interface WorkerLogger extends Record<Method, (objOrMsg: object | string, msg?: string) => void> {
  level: string
  child: (bindings?: Record<string, unknown>, options?: { msgPrefix?: string }) => WorkerLogger
  silent: () => void
}

/** A logger with these bindings, message prefix and level; `child` derives one that inherits them. */
export const workerLogger = (
  level: string = 'info',
  bindings: Record<string, unknown> = {},
  msgPrefix = '',
): WorkerLogger => {
  const logger = {
    level,
    child: (more: Record<string, unknown> = {}, options: { msgPrefix?: string } = {}) =>
      workerLogger(logger.level, { ...bindings, ...more }, msgPrefix + (options.msgPrefix ?? '')),
    silent: () => {},
  } as WorkerLogger
  for (const method of METHODS) {
    logger[method] = (objOrMsg, msg) => {
      if (LEVELS[method] < (LEVELS[logger.level as Level] ?? LEVELS.info)) return
      const fields =
        typeof objOrMsg === 'string' ? {} : Object.fromEntries(Object.entries(objOrMsg).map(([key, value]) => [key, plainError(value)]))
      const text = typeof objOrMsg === 'string' ? objOrMsg : (msg ?? (objOrMsg as { msg?: string }).msg)
      SINK[method](JSON.stringify({ level: method, ...bindings, ...fields, msg: text === undefined ? undefined : msgPrefix + text }))
    }
  }
  return logger
}
