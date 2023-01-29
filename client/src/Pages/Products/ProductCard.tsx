import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Slider,
  Stack,
  styled,
  Tooltip,
  useTheme,
} from "@mui/material";
import { IMusic } from "../../interface/IMusic";
import LOGO from "../../assents/Logo_IM icon.png";
import {
  PauseCircle,
  PlayCircle,
  VolumeOffRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import './musicStyles.css'

interface Props {
  product: IMusic;
  // addToCart: (product: IProduct) => void;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const audioRef = React.createRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [volumeSliderHeight, setVolumeHeight] = useState(0);
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  // let audioElement = document.getElementById("audio_element") as HTMLAudioElement;
  // let canvasElement = document.getElementById("canvas_element")as HTMLCanvasElement;

  // if(audioElement !== null || canvasElement !== null){
  //   const waveAnimation = new Wave(audioElement, canvasElement);
  //  waveAnimation.addAnimation(new waveAnimation.animations.Flower());
  // }

 

  const theme = useTheme();

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    color: "white",
  });

  const formatDuration = (duration: number) => {
    const date = new Date(duration * 1000);
    let formattedDuration = "";
    const hours = date.getUTCHours();
    if (hours > 0) {
      formattedDuration += `${hours}:`;
    }
    formattedDuration += `${date.getUTCMinutes()}:${date
      .getUTCSeconds()
      .toString()
      .padStart(2, "0")}`;
    return formattedDuration;
  };

  const lightIconColor =
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.4)"
      : "rgba(0,0,0,0.4)";

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current!.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current!.duration);
  };

  const handleVolumeOpen = () => {
    setIsVolumeOpen((prev) => !prev);
    !isVolumeOpen ? setVolumeHeight(50) : setVolumeHeight(0);
  };

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  useEffect(() => {
   
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        pb: 2,
        backgroundColor: "primary.dark",
        width: "40rem",
      }}
    >
      <audio id="audio_element"
        ref={audioRef}
        src={product.url}
        onPlay={handleTimeUpdate}
        onPause={handleTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      />
      <List dense={true}>
        <ListItem>
          <ListItemAvatar sx={{borderRadius:'100%'}} >
            {/* <canvas width={66} height={66} id="canvas_element"/> */}
            <Avatar className={isPlaying? "animation__spin":""} src={LOGO} alt="logo" sx={{ width: 66, height: 66}} />
          </ListItemAvatar>
          <ListItemText
            color="primary"
            primary={product.fileName}
            primaryTypographyProps={{
              fontSize: 22,
              color: "primary.contrastText",
            }}
            secondary={product.artist}
            secondaryTypographyProps={{ fontSize: 15, color: "info.main" }}
          />
        </ListItem>
        <ListItem
          alignItems="center"
          secondaryAction={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {isPlaying ? (
                <TinyText>{formatDuration(currentTime)}</TinyText>
              ) : (
                <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
              )}
            </Box>
          }
        >
          <Stack direction="column" alignItems="center">
            <Grow in={isVolumeOpen}>
              <Slider
                orientation="vertical"
                aria-label="Volume"
                defaultValue={0.3}
                value={volume}
                onChange={(_, value) => setVolume(value as number)}
                size="small"
                min={0}
                max={1}
                step={0.1}
                sx={{
                  WebkitAppearance: "slider-vertical",
                  transition: { height: 1 },
                  height: `${volumeSliderHeight}px`,
                  color:
                    theme.palette.mode === "light"
                      ? "#3fff"
                      : "rgba(0,0,0,0.87)",
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 14,
                    height: 14,
                    backgroundColor: "#fff",
                    "&:before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                }}
              />
            </Grow>
            <Tooltip title="volume">
              <IconButton onClick={handleVolumeOpen}>
                {volume === 0 ? (
                  <VolumeOffRounded htmlColor={lightIconColor} />
                ) : (
                  <VolumeUpRounded htmlColor={lightIconColor} />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
          <Tooltip title="play">
            <IconButton
              size="large"
              aria-label="Play"
              sx={{ color: "#2dd7d7", pr: 1 }}
              onClick={handlePlayPauseClick}
            >
              {isPlaying ? <PauseCircle /> : <PlayCircle />}
            </IconButton>
          </Tooltip>
          <Slider
            aria-label="time-indicator"
            size="medium"
            value={currentTime}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => setCurrentTime(value as number)}
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
            <Button
              variant="contained"
              color="info"
              onClick={() => increaseCartQuantity(product.id)}
            >
              Add to cart
            </Button>
          }
        >
          <Typography color={"white"} sx={{ pl: 6 }}>
            $3
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
};

export default ProductCard;

//#region
{
  /* <Grid
  container
  sx={{
    height: "100%",
    backgroundColor: "primary.dark",
    padding: "16px",
  }}
>
  <Grid container item ml={2}>
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1, px: 1 }}
      alignItems="center"
    >
      <Avatar src={LOGO} alt="logo" sx={{ width: 56, height: 56 }} />
      <Grid item xs={10}>
        <Typography variant="h5">{product.fileName}</Typography>
        <Typography variant="subtitle1" color={"secondary.light"}>
          {product.artist}
        </Typography>
      </Grid>
      <audio
        ref={audioRef}
        src={product.url}
        onPlay={handleTimeUpdate}
        onPause={handleTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      />
      <IconButton
        size="medium"
        sx={{ color: "#2dd7d7" }}
        onClick={handlePlayPauseClick}
      >
        {isPlaying ? <PauseCircle /> : <PlayCircle />}
      </IconButton>
    </Stack>
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1, px: 1, ml: { xs: 2, md: 8, lg: 10 } }}
      alignItems="center"
    >
      <IconButton onClick={handleMute}>
        {isMuted ? (
          <VolumeOffRounded htmlColor={lightIconColor} />
        ) : (
          <VolumeDownRounded htmlColor={lightIconColor} />
        )}
      </IconButton>
      <Slider
        aria-label="Volume"
        defaultValue={0.3}
        value={volume}
        onChange={(_, value) => setVolume(value as number)}
        size="small"
        min={0}
        max={1}
        step={0.1}
        sx={{
          width: "100px",
          color: theme.palette.mode === "light" ? "#3fff" : "rgba(0,0,0,0.87)",
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-thumb": {
            width: 14,
            height: 14,
            backgroundColor: "#fff",
            "&:before": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              boxShadow: "none",
            },
          },
        }}
      />
      <VolumeUpRounded htmlColor={lightIconColor} />
    </Stack>
    <Slider
      aria-label="time-indicator"
      size="medium"
      value={currentTime}
      min={0}
      step={1}
      max={duration}
      onChange={(_, value) => setCurrentTime(value as number)}
      sx={{
        color: theme.palette.mode === "light" ? "#3fff" : "rgba(0,0,0,0.87)",
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 1,
        mr: 2,
      }}
    >
      <TinyText>{formatDuration(currentTime)}</TinyText>
      <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
    </Box>
    <Stack
      spacing={2}
      direction="row"
      sx={{ ml: { xs: 10, md: 55 }, mt: -2 }}
      alignItems="center"
    >
      <Typography>$3</Typography>

      <Button variant="contained" color="info">
        {" "}
        Add to cart
      </Button>
    </Stack>
  </Grid>
</Grid>; */
}

//#endregion
