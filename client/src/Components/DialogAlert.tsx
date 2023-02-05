import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogAlert: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  buttonText?: string;
  onAction1?: () => void;
  onCancel?: () => void;
}> = ({
  isOpen,
  onClose,
  onAction1,
  onCancel,
  message,
  title,
  buttonText,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle sx={{ m: 0, pr: 5, pt: 2 }}>
      {title}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onCancel}>
        Cancel
      </Button>
      <Button autoFocus onClick={onAction1}>
        {buttonText}
      </Button>
    </DialogActions>
  </Dialog>
);

export { DialogAlert };
