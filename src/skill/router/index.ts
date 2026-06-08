/** skill/router — catch-all skill corpus router barrel. */
export { SKILL_INDEX } from './skills.index'
export { skillRouterPlugin } from './plugin'
export {
  connectFrontmatter,
  connectCorpus,
  upgradeSkillText,
  renderFrontmatter,
  materializeSkillFrontmatter,
  verifySkillFrontmatter,
  buildFrontmatterGraph,
  graphConnectivity,
  type ConnectedFrontmatter,
} from './upgrade'
