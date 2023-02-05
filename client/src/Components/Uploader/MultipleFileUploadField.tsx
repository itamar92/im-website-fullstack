import { Box, Grid, Paper, Typography } from "@mui/material";
import EditFormProduct from "Components/EditFormProduct";
import { useMusicProvider } from "Context/ProductsContext";
import { useSnackbar } from "hooks/useSnackbar";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import productsService from "Services/products.service";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploaderError";
import http from "../../interceptors/axios";

export function MultipleFileUploadField() {
  const [files, setFiles] = useState<File | null>();
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [newProduct, setNewProduct] = useState({});
  const { showSnackbar } = useSnackbar();

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    setFiles(accFiles[0]);
    setRejectedFiles(rejFiles);
    console.log(files);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 30 * 1024 * 1024, // 30MB
    maxFiles: 1,
  });
  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    if (!files) {
      showSnackbar({
        message: "you need to upload a file first",
        severity: "error",
      });
      return;
    }
  };

  const onUpload = async () => {
    if (files) {
      try {
        let formData = new FormData();
        formData.append("musicFile", files);
        console.log(formData.values);
        const response = await http.post("music/add-music", {formData }, {
          headers:{"Content-Type": "multipart/form-data"}});
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

      // const response = await productsService.upload(
      //   files,
      //   (event) => {
      //     if (event.total) {
      //       const percentage = (event.loaded / event.total) * 100;
      //       setProgress(Math.round(percentage));
      //       if (progress == 100)
      //         showSnackbar({
      //           message: "upload complete!",
      //           severity: "success",
      //         });
      //         console.log(progress);
      //     }
      // }
      // (error) => {
      //   showSnackbar({ message: `${error}`, severity: "error" });
      //   console.log(error);
      // }
      // );
      // return console.log("response", response);
    }
    return console.log("No File");
  };

  const handleDelete = () => {
    setFiles(null);
    setProgress(0);
  };

  return (
    <Grid
      container
      item
      display={"flex"}
      justifyContent={"center"}
      justifyItems={"center"}
      sx={{ pt: 20, height: "100vh" }}
    >
      <Grid item>
        <Paper
          elevation={3}
          {...getRootProps()}
          sx={{
            border: `2px dashed gray`,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.dark",
            height: "10rem",
            outline: "none",
            p: 2,
            pb: 4,
          }}
        >
          <input {...getInputProps()} />
          <Typography color={"gray"}>
            Drag 'n' drop some files here, or click to select files
          </Typography>
        </Paper>

        {rejectedFiles.map((fileWrapper, index) => (
          <Grid item key={index}>
            <UploadError errors={fileWrapper.errors} />
          </Grid>
        ))}
        <Box sx={{ pt: 4 }}>
          {Boolean(files) && (
            <SingleFileUploadWithProgress
              onDelete={handleDelete}
              progress={progress}
              onUpload={onUpload}
              file={files as File}
            />
          )}
          {progress == 100 && (
            <Box sx={{ backgroundColor: "#000451" }}>
              <EditFormProduct onSubmit={handleSubmit} cancelButton={false} />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
