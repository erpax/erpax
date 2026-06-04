/**
 * routing — size the model to the action's risk. Safety is the sandbox enforcement layer (it gates
 * the action regardless of which model ran), so routing freely sends low-risk work to a cheap/local
 * model and only high-risk work to a strong, aligned one. Pure functions over the action shape.
 *
 * @standard NIST AI RMF (risk-proportionate controls) — map risk → control strength
 * @see ../sandbox (the gate that makes cheap models safe) · ./SKILL.md
 */

export type RiskLevel = 'low' | 'medium' | 'high'
export type ModelTier = 'local' | 'standard' | 'strong'

/** Verbs that can cause irreversible harm — always high risk. */
const HIGH_RISK_VERBS: ReadonlySet<string> = new Set(['execute', 'write', 'delete', 'deploy', 'transfer'])
/** Mutation / outbound verbs — medium risk. */
const MEDIUM_RISK_VERBS: ReadonlySet<string> = new Set(['api', 'create', 'update', 'send'])

/**
 * The risk of an action — from its capability, whether it touches a credential, and whether it
 * fights harmony (off the horo ring). Credential access, a high-risk verb, or disharmony ⇒ high;
 * a mutation/api verb ⇒ medium; everything else (read/chat/analysis) ⇒ low.
 */
export function actionRisk(args: { capability: string; touchesCredential?: boolean; fightsHarmony?: boolean }): RiskLevel {
  if (args.touchesCredential || args.fightsHarmony || HIGH_RISK_VERBS.has(args.capability)) return 'high'
  if (MEDIUM_RISK_VERBS.has(args.capability)) return 'medium'
  return 'low'
}

/** Route a risk level to a model tier: high → strong (aligned), medium → standard, low → local/any. */
export function routeModel(risk: RiskLevel): ModelTier {
  return risk === 'high' ? 'strong' : risk === 'medium' ? 'standard' : 'local'
}

/** Route an action directly to its model tier (the risk signal composed with the tier map). */
export function routeAction(args: { capability: string; touchesCredential?: boolean; fightsHarmony?: boolean }): ModelTier {
  return routeModel(actionRisk(args))
}
