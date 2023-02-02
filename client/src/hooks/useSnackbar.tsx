import * as React from 'react';
import { SnackbarContext, SnackbarState } from '../Context/SnackbarContext';

const useSnackbar = () => {
  const snackContext = React.useContext(SnackbarContext);
  const showSnackbar = (state: SnackbarState) => snackContext.showSnackbar(state);
  return { showSnackbar };
};

export { useSnackbar };
