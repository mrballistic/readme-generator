import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import MarkdownPreview from './preview/MarkdownPreview';
import CopyButton from './preview/CopyButton';

interface PreviewSectionProps {
  markdown: string;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ markdown }) => {
  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Live Preview
        </Typography>
        <Box sx={{ width: 'auto' }}>
          <CopyButton content={markdown} />
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <MarkdownPreview content={markdown} />
      </Box>
    </Paper>
  );
};

export default PreviewSection;
