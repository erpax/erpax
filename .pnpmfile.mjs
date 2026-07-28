/**
 * No-op pnpmfile — pnpm@11 may resolve this path when present in the install
 * graph; a missing file fails `pnpm exec` in CI. Keep an empty hooks export.
 * @see scripts/payload-verify-types.sh (prefers ./node_modules/.bin/payload)
 */
export default {}
