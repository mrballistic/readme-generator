import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, useTheme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& h1, & h2, & h3': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
  '& pre': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  '& code': {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const theme = useTheme();

  if (!content) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body1">
          Your README preview will appear here...
        </Typography>
      </Box>
    );
  }

  return (
    <MarkdownContainer>
      <ReactMarkdown>{content}</ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownPreview;
