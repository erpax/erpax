/** topology — torus envelope barrel. */
export type { TorusBoundednessResult, TorusEnvelope, TorusTrace, TorusVertex } from './torus'
export {
  checkTorusBounded,
  CIRCUMFERENCE_SOFT_LIMIT_CHAIN_STEPS,
  TORUS_DEFAULT_ENVELOPE,
  TORUS_EDGES,
  TORUS_VERTICES,
  traceTorusRoundTrip,
} from './torus'
