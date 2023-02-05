import { Box, Grid, Paper, Typography } from "@mui/material";
import EditFormProduct from "Components/EditFormProduct";
import { useMusicProvider } from "Context/ProductsContext";
import { useSnackbar } from "hooks/useSnackbar";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import productsService from "Services/products.service";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploaderError";
// import "../../interceptors/axiosProducts";
import axios from "axios";

export function MultipleFileUploadField() {
  const [files, setFiles] = useState<File | null>();
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [newProduct, setNewProduct] = useState({});
  const { showSnackbar } = useSnackbar();
  const { getLastProductId, getMusic } = useMusicProvider();

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    setFiles(accFiles[0]);
    setRejectedFiles(rejFiles);
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

  const onUpload2 = async () => {
    if (files) {
      let formData = new FormData();
      formData.append("file", files);
      try {
        await axios.post("music/add-music", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            if (progressEvent.total) {
              const percentage =
                (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(Math.round(percentage));
            }
          },
        });
        if (progress == 100)
          showSnackbar({
            message: "upload complete!",
            severity: "success",
          });
        getMusic();
        let newItemId = getLastProductId() + 1;
        console.log("new item Id", newItemId);
        const newProductAdd = await productsService.getId(newItemId);
        setNewProduct(newProductAdd);
      } catch (error: any) {
        if (error.response.status === 400)
          showSnackbar({ message: "File already exist", severity: "error" });
        else showSnackbar({ message: `${error}`, severity: "error" });
      }
    }
  };

  const onUpload = async () => {
    console.log(files);
    if (files) {
      const response = await productsService.upload(
        files,
        (event) => {
          if (event.total) {
            const percentage = (event.loaded / event.total) * 100;
            setProgress(Math.round(percentage));
            if (progress == 100)
              showSnackbar({
                message: "upload complete!",
                severity: "success",
              });
            console.log(progress);
          }
        },
        (error) => {
          showSnackbar({ message: `${error}`, severity: "error" });
          console.log(error);
        }
      );
      return console.log("response", response);
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
              onUpload={onUpload2}
              file={files as File}
            />
          )}
          {progress == 100 && (
            <Box sx={{ backgroundColor: "#000451" }}>
              <EditFormProduct
                onSubmit={handleSubmit}
                cancelButton={false}
                initialState={newProduct}
              />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
