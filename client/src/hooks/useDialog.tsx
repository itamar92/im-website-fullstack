import * as React from "react";
import {
  DialogAlertContext,
  DialogState,
} from "../Context/DialogAlertsContext";

const useDialog = () => {
  const dialogContext = React.useContext(DialogAlertContext);
  const showDialogAlert = (state: DialogState) =>
    dialogContext.showDialogAlert(state);
  return { showDialogAlert };
};

export { useDialog };
