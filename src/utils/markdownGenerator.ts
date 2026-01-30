import { ReadmeFormData, BadgeType, LicenseType } from '../types';
import { BADGE_CONFIGS } from '../constants/badges';

export const escapeMarkdown = (text: string): string => {
  return text.replace(/([\\`*_{}[\]()#+\-.!])/g, '\\$1');
};

export const generateBadges = (
  repoName: string,
  badges: BadgeType[],
  license: LicenseType
): string => {
  if (badges.length === 0) return '';

  return badges
    .map((type) => {
      const config = BADGE_CONFIGS[type];
      const url = config.shieldsUrl
        .replace('{repo}', repoName || 'repo-name')
        .replace('{user}', 'username');

      return `![${config.label}](${url})`;
    })
    .join(' ');
};

export const generateTechStack = (techStack: string[]): string => {
  if (techStack.length === 0) return '';

  return techStack.map((tech) => `- ${tech}`).join('\n');
};

export const generateLicenseSection = (license: LicenseType): string => {
  if (license === 'None') return '';

  return `## License\n\nThis project is licensed under the ${license} License.`;
};

export const generateReadme = (formData: ReadmeFormData): string => {
  const {
    repoName,
    description,
    techStack,
    installCommand,
    usageExample,
    license,
    badges,
  } = formData;

  const sections: string[] = [];

  // Title
  sections.push(`# ${repoName || 'Project Name'}`);

  // Badges
  const badgesMarkdown = generateBadges(repoName, badges, license);
  if (badgesMarkdown) {
    sections.push(badgesMarkdown);
  }

  // Description
  if (description) {
    sections.push(description);
  }

  // Tech Stack
  const techStackMarkdown = generateTechStack(techStack);
  if (techStackMarkdown) {
    sections.push(`## Tech Stack\n\n${techStackMarkdown}`);
  }

  // Installation
  if (installCommand) {
    sections.push(`## Installation\n\n\`\`\`bash\n${installCommand}\n\`\`\``);
  }

  // Usage
  if (usageExample) {
    sections.push(`## Usage\n\n\`\`\`javascript\n${usageExample}\n\`\`\``);
  }

  // License
  const licenseMarkdown = generateLicenseSection(license);
  if (licenseMarkdown) {
    sections.push(licenseMarkdown);
  }

  return sections.join('\n\n');
};
