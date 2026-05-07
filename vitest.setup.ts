// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'

// Payload requires a secret in tests when .env is absent (e.g. CI).
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'vitest-dev-secret-do-not-use-in-production-32b'
}
