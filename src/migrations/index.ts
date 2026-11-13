import * as migration_20261113_153714_parties from './20261113_153714_parties';
import * as migration_20261113_161539_lifecycle from './20261113_161539_lifecycle';
import * as migration_20261113_164414_markdown from './20261113_164414_markdown';

export const migrations = [
  {
    up: migration_20261113_153714_parties.up,
    down: migration_20261113_153714_parties.down,
    name: '20261113_153714_parties',
  },
  {
    up: migration_20261113_161539_lifecycle.up,
    down: migration_20261113_161539_lifecycle.down,
    name: '20261113_161539_lifecycle',
  },
  {
    up: migration_20261113_164414_markdown.up,
    down: migration_20261113_164414_markdown.down,
    name: '20261113_164414_markdown'
  },
];
