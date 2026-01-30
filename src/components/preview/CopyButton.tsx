import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '../../utils/clipboard';

interface CopyButtonProps {
  content: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setOpen(true);
      setError(false);
    } else {
      setOpen(true);
      setError(true);
    }
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopy}
        fullWidth
      >
        Copy to Clipboard
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error ? 'Failed to copy!' : 'Copied to clipboard!'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CopyButton;
