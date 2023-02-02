import * as React from 'react';
import { AlertColor } from '@mui/material';
import { Snack } from '../Components/Snack';

const SnackbarContext = React.createContext<{ showSnackbar: (state?: SnackbarState) => void }>({
  showSnackbar: () => undefined,
});

const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [snackState, setSnackState] = React.useState<SnackbarState | undefined>(undefined);

  const onClose = () => {
    setOpen(false);
    setSnackState(undefined);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar: (state) => {
          if (!state) return;
          setSnackState(state);
          setOpen(true);
        },
      }}
    >
      {children}
      {<Snack isOpen={Boolean(isOpen && snackState)} onClose={onClose} {...snackState} />}
    </SnackbarContext.Provider>
  );
};

interface SnackbarState {
  message: string;
  severity: AlertColor;
}

export type { SnackbarState };
export { SnackbarProvider, SnackbarContext };
