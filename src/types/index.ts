export type LicenseType =
  | "MIT"
  | "Apache-2.0"
  | "GPL-3.0"
  | "BSD-3-Clause"
  | "Unlicense"
  | "None";

export type BadgeType = "build" | "license" | "version" | "downloads";

export interface BadgeConfig {
  type: BadgeType;
  label: string;
  shieldsUrl: string; // Template for shields.io URL
}

export interface ReadmeFormData {
  repoName: string;
  description: string;
  techStack: string[]; // Array of tech names
  installCommand: string;
  usageExample: string;
  license: LicenseType;
  badges: BadgeType[];
}
