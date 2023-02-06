import React, { useEffect, useState } from "react";
import { Box, Dialog, Grid } from "@mui/material";
import { IMusic } from "../../interface/IMusic";
import "./musicStyles.css";
import { useMusicProvider } from "../../Context/ProductsContext";
import { useSnackbar } from "../../hooks/useSnackbar";
import { DialogAlert } from "../../Components/DialogAlert";
import EditFormProduct from "Components/EditFormProduct";
import { IMusicUpdate } from "interface/IMusicUpdate";

interface Props {
  isOpen: boolean;
  id?: number;
}

const EditProduct: React.FC<Props> = ({ isOpen, id }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { setEditCardOpen, music, updateMusic } = useMusicProvider();
  const [updateProduct, setUpdatedProduct] = useState<IMusic>();
  const { showSnackbar } = useSnackbar();

  let filteredProduct = music.filter((item: IMusic) => {
    return item.id === id;
  });
  useEffect(() => {
    if (filteredProduct !== undefined && filteredProduct.length !== 0) {
      setUpdatedProduct({
        ...filteredProduct[0],
        fileName: filteredProduct[0].fileName,
        artist: filteredProduct[0].artist,
        description: filteredProduct[0].description,
        price: 3,
      });
    }
  }, [id]);

  const handleSubmit = (updateProduct: IMusicUpdate) => {
    if (updateProduct !== undefined) updateMusic(updateProduct);
    showSnackbar({ severity: "success", message: "Product updated !" });
    setEditCardOpen(!isOpen);
  };

  const handleDialogAlert = () => {
    setDialogOpen(!isDialogOpen);
    setEditCardOpen(!isOpen);
  };

  const handleCardClose = () => {
    setDialogOpen(!isDialogOpen);
  };

  const onUnload = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  });

  return (
    <Dialog
      onClose={handleCardClose}
      open={isOpen}
      sx={{
        "& .MuiPaper-root": { backgroundColor: "#000451 ", borderRadius: 3 },
      }}
    >
      <Grid container justifyContent={"center"} direction={"row"} pt={2}>
        <Box
          flexGrow={1}
          sx={{
            pb: 2,
            width: "42rem",
          }}
        >
          <EditFormProduct
            onSubmit={handleSubmit}
            initialState={updateProduct}
            cancelButton={true}
            onCancel={handleCardClose}
          />

          <DialogAlert
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(!isDialogOpen)}
            onAction1={() => handleDialogAlert()}
            onCancel={() => setDialogOpen(!isDialogOpen)}
            title={"Close without changes?"}
            message={"You cannot undone this"}
            buttonText={"Continue"}
          />
        </Box>
      </Grid>
    </Dialog>
  );
};

export default EditProduct;
