#!/usr/bin/env node
/**
 * erpax — sign in to an erpax the way `wrangler login` signs in to Cloudflare.
 *
 *   pnpm erpax login  [--local | <origin>]   open the browser, sign in to that erpax, allow the CLI
 *   pnpm erpax token  [--local | <origin>]   print a current access token, refreshed when it has expired
 *   pnpm erpax whoami [--local | <origin>]   who the gateway serves you as, and how many tools
 *   pnpm erpax logout [--local | <origin>]   forget the sign-in
 *   pnpm erpax headers                       the connector's Authorization header (.mcp.json headersHelper)
 *
 * `--no-browser` prints the sign-in address instead of opening it (an SSH session, a headless machine).
 *
 * Development and production are one flow against a different origin: production is the connector's
 * default URL (.mcp.json), `--local` is http://localhost:3000, and ERPAX_MCP_URL sets the default. The
 * erpax itself is the authorization server: @payloadcms/plugin-mcp's built-in OAuth (dynamic client
 * registration, PKCE, refresh tokens; payloadcms.com/docs/plugins/mcp, "Sign in with Payload"). The
 * token is the signed-in user's own, Payload's access control decides what it may do, and it works for
 * MCP only. The OAuth client is the official MCP client's. Sign-ins are kept per origin in
 * ~/.config/erpax/credentials.json (mode 600).
 */
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const LOCAL = 'http://localhost:3000'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.ERPAX_LOGIN_PORT ?? 8975)
const REDIRECT = `http://127.0.0.1:${PORT}/callback`
const STORE = join(process.env.XDG_CONFIG_HOME ?? join(homedir(), '.config'), 'erpax', 'credentials.json')

/** The production origin: the connector's default URL in .mcp.json, written down once. */
export const productionOrigin = () => {
  const url = JSON.parse(readFileSync(join(ROOT, '.mcp.json'), 'utf8')).mcpServers.erpax.url
  return new URL(/:-([^}]+)\}/.exec(url)?.[1] ?? url).origin
}

/** The origin a command acts on: `--local`, an explicit origin, ERPAX_MCP_URL, or production. */
export const originOf = (arg) => {
  if (arg === '--local') return LOCAL
  if (arg) return new URL(arg).origin
  if (process.env.ERPAX_MCP_URL) return new URL(process.env.ERPAX_MCP_URL).origin
  return productionOrigin()
}

const readStore = () => {
  try {
    return JSON.parse(readFileSync(STORE, 'utf8'))
  } catch {
    return {}
  }
}
const writeStore = (store) => {
  mkdirSync(dirname(STORE), { recursive: true, mode: 0o700 })
  writeFileSync(STORE, `${JSON.stringify(store, null, 2)}\n`, { mode: 0o600 })
  chmodSync(STORE, 0o600)
}
const saveFor = (origin, patch) => {
  const store = readStore()
  store[origin] = { ...store[origin], ...patch }
  writeStore(store)
}

/**
 * The OAuthClientProvider the MCP client's `auth()` drives, keeping the registration and tokens under
 * one origin. The PKCE verifier and state live only as long as the sign-in.
 */
const providerFor = (origin, { onRedirect, state } = {}) => {
  let verifier
  return {
    get redirectUrl() {
      return REDIRECT
    },
    get clientMetadata() {
      return {
        client_name: 'erpax CLI',
        redirect_uris: [REDIRECT],
        grant_types: ['authorization_code', 'refresh_token'],
        response_types: ['code'],
        token_endpoint_auth_method: 'none',
      }
    },
    state: () => state ?? randomUUID(),
    clientInformation: () => readStore()[origin]?.client,
    saveClientInformation: (client) => saveFor(origin, { client }),
    tokens: () => readStore()[origin]?.tokens,
    saveTokens: (tokens) => saveFor(origin, { tokens, savedAt: Date.now() }),
    redirectToAuthorization: (url) => {
      if (!onRedirect) throw new Error(`not signed in to ${origin}: run pnpm erpax login`)
      onRedirect(url)
    },
    saveCodeVerifier: (codeVerifier) => {
      verifier = codeVerifier
    },
    codeVerifier: () => verifier,
  }
}

/** Where the gateway's protected-resource metadata lives (the 401's WWW-Authenticate link). */
const authOptions = (origin) => ({
  serverUrl: `${origin}/api/mcp`,
  resourceMetadataUrl: new URL(`${origin}/api/mcp/oauth-protected-resource`),
})

const openBrowser = (url) => {
  const [command, ...args] =
    process.platform === 'darwin' ? ['open', url] : process.platform === 'win32' ? ['cmd', '/c', 'start', '', url] : ['xdg-open', url]
  spawn(command, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref()
}

/** Sign in: the browser opens the erpax's own sign-in and Allow page; the code returns to a loopback server. */
export const login = async (origin, { browser = true } = {}) => {
  const { auth } = await import('@modelcontextprotocol/client')
  const state = randomUUID()
  saveFor(origin, { tokens: undefined, savedAt: undefined })
  const server = createServer()
  const callback = new Promise((resolve, reject) => {
    server.on('request', (req, res) => {
      const url = new URL(req.url ?? '/', REDIRECT)
      if (url.pathname !== '/callback') return void res.writeHead(404).end()
      const code = url.searchParams.get('code')
      const ok = Boolean(code) && url.searchParams.get('state') === state
      res.writeHead(ok ? 200 : 400, { 'content-type': 'text/plain; charset=utf-8' })
      res.end(ok ? `Signed in to ${origin}. You can close this tab.` : 'The sign-in did not complete. Run pnpm erpax login again.')
      if (ok) resolve({ code, iss: url.searchParams.get('iss') ?? undefined })
      else reject(new Error(url.searchParams.get('error_description') ?? url.searchParams.get('error') ?? 'the callback did not match this sign-in'))
    })
  })
  await new Promise((resolve, reject) => server.once('error', reject).listen(PORT, '127.0.0.1', resolve))
  try {
    const provider = providerFor(origin, {
      state,
      onRedirect: (url) => {
        console.log(browser ? `Opening the browser to sign in to ${origin}. If it does not open, visit:\n  ${url}` : `Sign in to ${origin} at:\n  ${url}`)
        if (browser) openBrowser(url.href)
      },
    })
    const started = await auth(provider, authOptions(origin))
    if (started === 'REDIRECT') {
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('no sign-in within 5 minutes')), 300_000).unref())
      const { code, iss } = await Promise.race([callback, timeout])
      await auth(provider, { ...authOptions(origin), authorizationCode: code, iss })
    }
    console.log(`✓ signed in to ${origin}`)
  } finally {
    server.close()
  }
}

/** A current access token for the origin, refreshed with its refresh token when it has expired. */
export const tokenFor = async (origin) => {
  const entry = readStore()[origin]
  const tokens = entry?.tokens
  if (!tokens?.access_token) return undefined
  const expiresAt = tokens.expires_in ? entry.savedAt + (tokens.expires_in - 60) * 1000 : Infinity
  if (Date.now() < expiresAt) return tokens.access_token
  if (!tokens.refresh_token) return undefined
  const { auth } = await import('@modelcontextprotocol/client')
  const result = await auth(providerFor(origin), authOptions(origin)).catch(() => undefined)
  return result === 'AUTHORIZED' ? readStore()[origin]?.tokens?.access_token : undefined
}

export const logout = (origin) => {
  const store = readStore()
  delete store[origin]
  writeStore(store)
  console.log(`✓ signed out of ${origin}`)
}

/** An agent user's API key, from the environment or the gitignored .env: the sign-in for a machine. */
export const apiKey = () => {
  if (process.env.ERPAX_API_KEY) return process.env.ERPAX_API_KEY
  const env = join(ROOT, '.env')
  if (!existsSync(env)) return undefined
  return /^ERPAX_API_KEY=["']?([^"'\r\n]*)/m.exec(readFileSync(env, 'utf8'))?.[1] || undefined
}

/** The Authorization value for an origin: the signed-in user's token, else an agent's API key. */
export const authorizationFor = async (origin) => {
  const token = await tokenFor(origin)
  if (token) return `Bearer ${token}`
  const key = apiKey()
  return key ? `users API-Key ${key}` : undefined
}

/** Who the gateway serves this sign-in as: an MCP conversation with the Authorization value. */
export const whoami = async (origin) => {
  const authorization = await authorizationFor(origin)
  if (!authorization) throw new Error(`not signed in to ${origin}: run pnpm erpax login`)
  const { Client, StreamableHTTPClientTransport } = await import('@modelcontextprotocol/client')
  const client = new Client({ name: 'erpax CLI', version: '1.0.0' })
  await client.connect(new StreamableHTTPClientTransport(new URL(`${origin}/api/mcp`), { requestInit: { headers: { authorization } } }))
  try {
    const { tools } = await client.listTools()
    const via = authorization.startsWith('Bearer') ? 'signed in' : 'API key'
    console.log(`${origin} · ${via} · ${client.getServerVersion()?.name ?? 'MCP'} · ${tools.length} tools`)
    if (tools.some((t) => t.name === 'auth')) {
      const me = await client.callTool({ name: 'auth', arguments: { slug: 'users' } })
      console.log((me.content ?? []).map((part) => part.text ?? '').join('\n'))
    }
  } finally {
    await client.close()
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2)
  const browser = !args.includes('--no-browser')
  const [command, arg] = args.filter((a) => a !== '--no-browser')
  try {
    if (command === 'login') await login(originOf(arg), { browser })
    else if (command === 'whoami') await whoami(originOf(arg))
    else if (command === 'logout') logout(originOf(arg))
    else if (command === 'token') {
      const token = await tokenFor(originOf(arg))
      if (!token) throw new Error(`not signed in to ${originOf(arg)}: run pnpm erpax login${arg ? ` ${arg}` : ''}`)
      console.log(token)
    } else if (command === 'headers') {
      // Claude Code's headersHelper: the sign-in's short-lived token, never a stored API key (a key a
      // machine holds is read where it is used, not echoed). Signed out, it prints {} and Claude Code
      // offers its own OAuth sign-in to the same server.
      const token = await tokenFor(originOf(arg)).catch(() => undefined)
      console.log(JSON.stringify(token ? { Authorization: `Bearer ${token}` } : {}))
    } else {
      console.error('usage: pnpm erpax login|whoami|token|logout [--local | <origin>] [--no-browser] · pnpm erpax headers')
      process.exit(2)
    }
  } catch (error) {
    console.error(`✖ ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}
