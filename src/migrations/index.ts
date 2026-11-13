import * as migration_20261113_153714_parties from './20261113_153714_parties';

export const migrations = [
  {
    up: migration_20261113_153714_parties.up,
    down: migration_20261113_153714_parties.down,
    name: '20261113_153714_parties'
  },
];
