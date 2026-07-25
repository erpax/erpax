// Greenfield: migrations are regenerated from the live config only at deploy time (no backward
// compatibility). In dev/test the schema is PUSHED from config against a fresh D1. See payload.config.ts.
export const migrations: { up: (a: unknown) => Promise<void>; down: (a: unknown) => Promise<void>; name: string }[] = []
