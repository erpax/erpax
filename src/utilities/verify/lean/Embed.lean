/-
  Embed — when a document is embedded again, and when an AI charge is admitted.

  Clay: none

  Semantic search keeps one vector per search document in Vectorize (VECTORIZE_DOCS), made by Workers
  AI (AI) and cached in KV (AI_CACHE) under the uuid cross of the model and the text. Two decisions
  govern its cost; the twin, src/utilities/semantic, runs them, and the admission runs inside the
  TENANT_QUOTA Durable Object so that deciding and counting are one atomic step.

  · STALE: a document is embedded again only when its content key changed. The key is the cross of
    the model and the text, so equal text under the same model is never paid for twice.
  · ADMIT: a charge of `cost` embeddings against `used` of a `quota` is admitted exactly when
    used + cost ≤ quota, and an admitted charge moves `used` to used + cost.

  What is proved, by `decide` over keys 0 … 5 and over used, cost and quota 0 … 12:
    1. A key equal to the stored one is not stale; a different or missing stored key is stale.
    2. An admitted charge never takes `used` past the quota.
    3. A charge that would pass the quota is refused, and then `used` does not move.
    4. Raising the quota never turns an admitted charge into a refused one.
    5. A charge of nothing is admitted whenever `used` is within the quota.
-/

namespace Embed

/-- Whether a document must be embedded again: its stored key is missing or differs. -/
def stale : Option Nat → Nat → Bool
  | none, _ => true
  | some stored, current => !(stored == current)

/-- Whether a charge is admitted. -/
def admit (used cost quota : Nat) : Bool := used + cost ≤ quota

/-- The count after the decision: moved by the cost when admitted, unchanged when refused. -/
def charge (used cost quota : Nat) : Nat := if admit used cost quota then used + cost else used

def upTo (n : Nat) : List Nat := List.range (n + 1)

theorem unchanged_text_is_not_stale : (upTo 5).all (fun k => !stale (some k) k) = true := by decide

theorem changed_or_missing_is_stale :
    (upTo 5).all (fun k => stale none k && (upTo 5).all (fun s => s == k || stale (some s) k)) = true := by decide

theorem admitted_never_passes_the_quota :
    (upTo 12).all (fun u => (upTo 12).all (fun c => (upTo 12).all (fun q =>
      !(u ≤ q) || charge u c q ≤ q))) = true := by decide

theorem refused_leaves_the_count :
    (upTo 12).all (fun u => (upTo 12).all (fun c => (upTo 12).all (fun q =>
      admit u c q || charge u c q == u))) = true := by decide

theorem more_quota_never_refuses_more :
    (upTo 12).all (fun u => (upTo 12).all (fun c => (upTo 11).all (fun q =>
      !admit u c q || admit u c (q + 1)))) = true := by decide

theorem nothing_is_admitted_within_quota : (upTo 12).all (fun u => (upTo 12).all (fun q => !(u ≤ q) || admit u 0 q)) = true := by decide

end Embed
