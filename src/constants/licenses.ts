import { LicenseType } from '../types';

export const LICENSE_OPTIONS: { value: LicenseType; label: string }[] = [
  { value: 'MIT', label: 'MIT' },
  { value: 'Apache-2.0', label: 'Apache 2.0' },
  { value: 'GPL-3.0', label: 'GPL 3.0' },
  { value: 'BSD-3-Clause', label: 'BSD 3-Clause' },
  { value: 'Unlicense', label: 'Unlicense' },
  { value: 'None', label: 'None' },
];
