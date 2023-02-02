import * as React from "react";
import { DialogAlert } from "../Components/DialogAlert";

const DialogAlertContext = React.createContext<{
  showDialogAlert: (state?: DialogState) => void;
}>({
  showDialogAlert: () => undefined,
});

const DialogAlertProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [dialogState, setDialogState] = React.useState<DialogState | undefined>(
    undefined
  );

  const onClose = () => {
    setOpen(false);
    setDialogState(undefined);
  };

  const onAction1 = () => {
    return true;
  }
  const onAction2 = () => {
    setOpen(false);
    setDialogState(undefined);
  }

  return (
    <DialogAlertContext.Provider
      value={{
        showDialogAlert: (state) => {
          if (!state) return;
          setDialogState(state); setOpen(true);
        },
      }}
    >
      {children}
      {
        <DialogAlert
          isOpen={Boolean(isOpen && dialogState)}
          onClose={onClose}
          onAction1={onAction1}
          onAction2={onAction2}
          {...dialogState}
        />
      }
    </DialogAlertContext.Provider>
  );
};

interface DialogState {
  message: string;
  title: string;
  buttonText:string;
}

export type { DialogState };
export { DialogAlertProvider, DialogAlertContext };
