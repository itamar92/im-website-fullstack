import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  FormControl as form,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Slider,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { IMusic } from "../../interface/IMusic";
import LOGO from "../../assents/Logo_IM icon.png";
import { PlayCircle, VolumeUpRounded } from "@mui/icons-material";
import "./musicStyles.css";
import { useMusicProvider } from "../../Context/ProductsContext";
import { useDialog } from "../../hooks/useDialog";
import { useSnackbar } from "../../hooks/useSnackbar";
import { DialogAlert } from "../../Components/DialogAlert";

interface Props {
  isOpen: boolean;
  id?: number;
}

const EditProduct: React.FC<Props> = ({ isOpen, id }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { setEditCardOpen, music, updateMusic } = useMusicProvider();
  const [updateProduct, setUpdatedProduct] = useState<IMusic>();
  const { showDialogAlert } = useDialog();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  const theme = useTheme();
  const lightIconColor =
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.4)"
      : "rgba(0,0,0,0.4)";

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
          <audio id="audio_element" />
          <List dense={true}>
            <form onSubmit={handleSubmit}>
              <ListItem>
                <ListItemAvatar sx={{ borderRadius: "100%" }}>
                  <Avatar
                    src={LOGO}
                    alt="logo"
                    sx={{ width: 66, height: 66 }}
                  />
                </ListItemAvatar>
                {updateProduct && (
                  <Stack direction="column" alignItems="center">
                    <TextField
                      required
                      id="fileName"
                      name="filetName"
                      autoComplete="off"
                      value={updateProduct?.fileName}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updateProduct,
                          fileName: e.target.value,
                        })
                      }
                      placeholder={updateProduct?.fileName}
                      fullWidth
                      sx={{
                        height: 40,
                        "& .MuiInputBase-input": {
                          color: "white",
                          flexGrow: 1,
                          width: { xs: "13rem", md: "17rem" },
                        },
                        fontSize: 22,
                      }}
                    />
                    <TextField
                      required
                      id="description"
                      name="description"
                      autoComplete="off"
                      value={updateProduct?.description}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updateProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder={updateProduct?.description}
                      fullWidth
                      sx={{
                        "& .MuiInputBase-input": { color: "info.main" },
                        fontSize: 22,
                      }}
                    />
                  </Stack>
                )}
              </ListItem>
              <ListItem alignItems="center">
                <Stack direction="column" alignItems="center">
                  <IconButton>
                    <VolumeUpRounded htmlColor={lightIconColor} />
                  </IconButton>
                </Stack>

                <IconButton
                  size="large"
                  aria-label="Play"
                  sx={{ color: "#2dd7d7", pr: 1 }}
                >
                  <PlayCircle />
                </IconButton>

                <Slider
                  aria-label="time-indicator"
                  size="medium"
                  min={0}
                  step={1}
                  sx={{
                    color:
                      theme.palette.mode === "light"
                        ? "#3fff"
                        : "rgba(0,0,0,0.87)",
                    height: 4,
                    "& .MuiSlider-thumb": {
                      width: 8,
                      height: 8,
                      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                      "&:before": {
                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0px 0px 0px 8px ${
                          theme.palette.mode === "dark"
                            ? "rgb(255 255 255 / 16%)"
                            : "rgb(0 0 0 / 16%)"
                        }`,
                      },
                      "&.Mui-active": {
                        width: 20,
                        height: 20,
                      },
                    },
                    "& .MuiSlider-rail": {
                      opacity: 0.28,
                    },
                  }}
                />
              </ListItem>
              <ListItem
                alignItems="center"
                secondaryAction={
                  <Stack direction={"row"} gap={2}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={handleCardClose}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Stack>
                }
              >
                <TextField
                  required
                  id="price"
                  typeof={"number"}
                  name="price"
                  autoComplete="off"
                  value={updateProduct?.price}
                  // onChange={(e) =>
                  //   setUpdatedProduct({
                  //     ...updateProduct,
                  //     price:e.target.value,
                  //   })
                  // }
                  placeholder={`${updateProduct?.price}`}
                  sx={{
                    height: 40,
                    "& .MuiInputBase-input": { color: "white" },
                    fontSize: 22,
                  }}
                />
              </ListItem>
            </form>
            <DialogAlert
              isOpen={isDialogOpen}
              onClose={() => setDialogOpen(!isDialogOpen)}
              onAction1={() => handleDialogAlert()}
              onAction2={() => setDialogOpen(!isDialogOpen)}
              title={"Close without changes?"}
              message={"You cannot undone this"}
              buttonText={"Continue"}
            />
          </List>
        </Box>
      </Grid>
    </Dialog>
  );
};

export default EditProduct;
