import { Box, Grid, LinearProgress, LinearProgressProps, Typography, } from "@mui/material";
import { FileHeader } from "./FileHeader";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  progress: number;
  onUpload: (file: File) => void;
}

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  progress,
  onUpload,
}: SingleFileUploadWithProgressProps) {
  return (
    <Grid item pb={2}>
      <FileHeader file={file} onDelete={onDelete} onUpload={onUpload} />
      <LinearProgressWithLabel variant="determinate" value={progress} color="secondary" sx={{ pb: 1 }} />
    </Grid>
  );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="info">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
