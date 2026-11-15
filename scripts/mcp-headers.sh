#!/bin/sh
# The erpax connector's headers, for Claude Code's `headersHelper` (.mcp.json).
#
# An agent works on erpax data through the MCP gateway with an API key (Payload admin →
# API keys; the key's scopes and tenant decide what it may do). The key is read at connect time
# from ERPAX_API_KEY in the environment, else from the gitignored .env, so it never has to be in
# the environment the app was launched from. With no key this prints {} and the connector fails
# with 401, and the agent records the gap as Payload data (AGENTS.md, "Agents work through Payload").
cd "$(dirname "$0")/.." || exit 1
key="${ERPAX_API_KEY:-}"
if [ -z "$key" ] && [ -f .env ]; then
  key=$(sed -n 's/^ERPAX_API_KEY=//p' .env | tail -n 1 | tr -d "\"'\r")
fi
case "$key" in
  '') printf '{}\n' ;;
  *[!A-Za-z0-9._~+/=-]*) echo "mcp-headers: ERPAX_API_KEY has characters a key cannot have" >&2; printf '{}\n' ;;
  *) printf '{"Authorization":"Bearer %s"}\n' "$key" ;;
esac
