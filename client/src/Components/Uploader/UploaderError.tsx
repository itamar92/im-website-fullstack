import {
  createStyles,
  LinearProgress,
  styled,
  Typography,
  withStyles,
} from "@mui/material";
import React from "react";
import { FileError } from "react-dropzone";

export interface UploadErrorProps {
  errors: FileError[];
}

export function UploadError({ errors }: UploadErrorProps) {
  return (
    <React.Fragment>
     
      {errors.map((error) => (
        <div key={error.code}>
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </React.Fragment>
  );
}
