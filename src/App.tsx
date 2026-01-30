import { useState, useMemo } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Box,
  Typography,
  useMediaQuery,
  AppBar,
  Toolbar,
} from '@mui/material';
import { createAppTheme } from './theme';
import FormSection from './components/FormSection';
import PreviewSection from './components/PreviewSection';
import type { ReadmeFormData } from './types';
import { generateReadme } from './utils/markdownGenerator';

const INITIAL_FORM_DATA: ReadmeFormData = {
  repoName: '',
  githubUsername: '',
  workflowName: 'main.yml',
  description: '',
  techStack: [],
  installCommand: '',
  usageExample: '',
  license: 'MIT',
  badges: [],
};

function App() {
  const [formData, setFormData] = useState<ReadmeFormData>(INITIAL_FORM_DATA);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const markdown = useMemo(() => generateReadme(formData), [formData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
              README Generator
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" fontWeight="800" gutterBottom sx={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)' 
                : 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Professional Documentation in Seconds
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormSection 
                formData={formData} 
                onChange={setFormData} 
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PreviewSection 
                markdown={markdown} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
