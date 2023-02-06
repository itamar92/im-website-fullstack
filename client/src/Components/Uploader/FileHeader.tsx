import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File) => void;
}

export function FileHeader({ file, onDelete, onUpload }: FileHeaderProps) {
  return (
    <Grid container justifyContent={"space-between"} alignItems="center"  pb={1}>
      <Grid item>{file?.name}</Grid>
      <Grid item>
        <Stack direction={"row"} gap={2} pl={2}>
        <Button variant="contained" size="small" color="error" onClick={() => onDelete(file)}>
          Delete
        </Button>
        <Button variant="contained" size="small" color="secondary" onClick={() => onUpload(file)}>
          Upload
        </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
