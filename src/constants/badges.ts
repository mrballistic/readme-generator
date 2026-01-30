import { BadgeConfig, BadgeType } from '../types';

export const BADGE_CONFIGS: Record<BadgeType, BadgeConfig> = {
  build: {
    type: 'build',
    label: 'Build',
    shieldsUrl: 'https://img.shields.io/github/actions/workflow/status/{user}/{repo}/main.yml?label=build',
  },
  license: {
    type: 'license',
    label: 'License',
    shieldsUrl: 'https://img.shields.io/github/license/{user}/{repo}',
  },
  version: {
    type: 'version',
    label: 'Version',
    shieldsUrl: 'https://img.shields.io/github/v/release/{user}/{repo}',
  },
  downloads: {
    type: 'downloads',
    label: 'Downloads',
    shieldsUrl: 'https://img.shields.io/github/downloads/{user}/{repo}/total',
  },
};
