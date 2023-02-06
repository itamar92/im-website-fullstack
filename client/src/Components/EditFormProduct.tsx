import { VolumeUpRounded, PlayCircle } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Stack,
  TextField,
  IconButton,
  Slider,
} from "@mui/material";
import { IMusicUpdate } from "interface/IMusicUpdate";
import React from "react";
import theme from "theme";
import LOGO from "../assents/Logo_IM icon.png";

function EditFormProduct({
  initialState,
  onSubmit,
  onCancel,
  cancelButton,
}: EditFormProductProps) {
  const [product, setProduct] = React.useState<IMusicUpdate>(initialFormValue);
  const viewCancelButton =cancelButton;

  React.useEffect(() => {
    initialState && setProduct(initialState);
  }, [initialState]);

  return (
    <List dense>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(product);
        }}
      >
        <ListItem>
          <ListItemAvatar sx={{ borderRadius: "100%" }}>
            <Avatar src={LOGO} alt="logo" sx={{ width: 66, height: 66 }} />
          </ListItemAvatar>
          {product && (
            <Stack direction="column" alignItems="center">
              <TextField
                required
                id="fileName"
                name="filetName"
                autoComplete="off"
                value={product?.fileName}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    fileName: e.target.value,
                  })
                }
                placeholder={product.fileName}
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
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
                placeholder={product.description}
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
              <VolumeUpRounded sx={{ color: "white" }} />
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
                theme.palette.mode === "light" ? "#3fff" : "rgba(0,0,0,0.87)",
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
              {viewCancelButton ? (
                <Button variant="contained" color="info" onClick={onCancel}>
                  Cancel
                </Button>
              ) : (
                ""
              )}
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
            value={product?.price}
            // onChange={(e) =>
            //   setProduct({
            //     ...product,
            //     price:e.target.value,
            //   })
            // }
            placeholder={`${product?.price}`}
            sx={{
              height: 40,
              "& .MuiInputBase-input": { color: "white" },
              fontSize: 22,
            }}
          />
        </ListItem>
      </form>
    </List>
  );
}

const initialFormValue: IMusicUpdate = {
  fileName: "File Name",
  artist: "Itamar Miron",
  description: "Description",
  price: 3,
};

interface EditFormProductProps {
  onSubmit: (product: IMusicUpdate) => void;
  onCancel?: () => void;
  cancelButton: boolean;
  initialState?: IMusicUpdate;
}

export default EditFormProduct;
