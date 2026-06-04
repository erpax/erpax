/**
 * ingest — idempotent, content-addressed ingest. Each record carries a content-uuid, so a record is
 * upserted only if its uuid is unseen (new or changed); re-fetching unchanged data is a no-op. The
 * fetch and the DB write are runtime boundaries; the plan is pure. Serves the GW sync and any source.
 *
 * @standard idempotent upsert by content-address (re-runnable, no cursor needed)
 * @see ../google-workspace/fusion (fuseWorkspaceResource — the content-address) · ./SKILL.md
 */

/** A record addressed by its content-uuid, bound for a target collection. */
export interface AddressedRecord {
  readonly uuid: string
  readonly target: string
  readonly record: Record<string, unknown>
}

export interface IngestPlan {
  /** new or changed records to write (unique by uuid). */
  readonly upsert: readonly AddressedRecord[]
  /** unchanged records already in the store — skipped. */
  readonly skip: readonly AddressedRecord[]
}

/**
 * Plan an idempotent ingest: a record is upserted iff its uuid is not in `seen` (new or changed
 * content ⇒ new uuid). The batch is deduped against itself too — the same uuid appearing twice in
 * one pull yields a single upsert. Re-running with unchanged data ⇒ every uuid seen ⇒ all skip.
 */
export function planIngest(records: readonly AddressedRecord[], seen: ReadonlySet<string>): IngestPlan {
  const upsert: AddressedRecord[] = []
  const skip: AddressedRecord[] = []
  const planned = new Set<string>()
  for (const r of records) {
    if (seen.has(r.uuid)) {
      skip.push(r)
    } else if (!planned.has(r.uuid)) {
      planned.add(r.uuid)
      upsert.push(r)
    }
    // a duplicate-within-batch (uuid already planned, not in seen) collapses to the first — neither list
  }
  return { upsert, skip }
}
