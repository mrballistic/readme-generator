import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TextInput from './inputs/TextInput';
import TechStackInput from './inputs/TechStackInput';
import LicenseDropdown from './inputs/LicenseDropdown';
import BadgeSelector from './inputs/BadgeSelector';
import type { ReadmeFormData, BadgeType, LicenseType } from '../types';

interface FormSectionProps {
  formData: ReadmeFormData;
  onChange: (data: ReadmeFormData) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ formData, onChange }) => {
  const handleChange = (key: keyof ReadmeFormData, value: string | string[] | BadgeType[] | LicenseType) => {
    onChange({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Paper elevation={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        README Details
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextInput
          label="Repository Name"
          value={formData.repoName}
          onChange={(val) => handleChange('repoName', val)}
          placeholder="my-cool-project"
        />
        <TextInput
          label="GitHub Username"
          value={formData.githubUsername}
          onChange={(val) => handleChange('githubUsername', val)}
          placeholder="octocat"
        />
        <TextInput
          label="Workflow File"
          value={formData.workflowName}
          onChange={(val) => handleChange('workflowName', val)}
          placeholder="main.yml"
        />
        <TextInput
          label="Project Description"
          value={formData.description}
          onChange={(val) => handleChange('description', val)}
          placeholder="A brief description of what this project does."
          multiline
          rows={3}
        />
        <TechStackInput
          value={formData.techStack}
          onChange={(val) => handleChange('techStack', val)}
        />
        <TextInput
          label="Installation Command"
          value={formData.installCommand}
          onChange={(val) => handleChange('installCommand', val)}
          placeholder="npm install"
        />
        <TextInput
          label="Usage Example"
          value={formData.usageExample}
          onChange={(val) => handleChange('usageExample', val)}
          placeholder="npm start"
          multiline
          rows={2}
        />
        <LicenseDropdown
          value={formData.license}
          onChange={(val) => handleChange('license', val)}
        />
        <BadgeSelector
          selectedBadges={formData.badges}
          onChange={(val) => handleChange('badges', val)}
        />
      </Box>
    </Paper>
  );
};

export default FormSection;
