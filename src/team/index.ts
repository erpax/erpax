/**
 * team — society hub: content-addressed agent teams + secure comms.
 *
 * Re-exports the agent team algebra ([[agent/team]]) and the fail-closed
 * realtime gate ([[team/comms]]) as one diamond — spawn → share → cover in parallel.
 *
 *   tsx src/team/index.ts
 *
 * @see ../agent/team — ./comms — ./SKILL.md
 */
export {
  BASIC_TEAM_SIZES,
  TEAM_DISCIPLINE,
  basicTeams,
  formTeam,
  isBasicTeam,
  mergeTeams,
  shareSkills,
  spawnTeam,
  teamCovers,
  teamGrouping,
  teamSkills,
  teamUuid,
  type BasicTeamSize,
  type Team,
  type TeamCoverage,
} from '@/agent/team'

export {
  MAX_TEAM_COMMS_DEPTH,
  enforceTeamCommsEmit,
  teamCommsBeforeChange,
  waveInSecureComms,
  waveCorrelationUuid,
  type TeamCommsEmit,
  type TeamCommsVerdict,
  type SecureWaveEnvelope,
} from '@/team/comms'

if (import.meta.url === 'file://' + process.argv[1]) {
  import('@/agent/team').then(({ spawnTeam, teamSkills, shareSkills }) => {
    const tribe = shareSkills(
      spawnTeam(
        'demo',
        { name: 'scout', purpose: 'cover gap', skills: ['localize'] },
        [
          { name: 'a', purpose: 'north' },
          { name: 'b', purpose: 'south' },
        ],
        'tenant-demo',
      ),
      'tenant-demo',
    )
    console.log('team — members=' + tribe.members.length + ' · skills=' + teamSkills(tribe).join('+'))
  })
}
