import * as React from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

const Snack: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  severity?: AlertColor;
}> = ({ isOpen, onClose, message, severity }) => (
  <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export { Snack };
