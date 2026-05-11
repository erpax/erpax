import * as migration_20260509_220230 from './20260509_220230';

export const migrations = [
  {
    up: migration_20260509_220230.up,
    down: migration_20260509_220230.down,
    name: '20260509_220230'
  },
];
