import { Box, CardMedia, Collapse, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import useWindowPosition from "../../hooks/useWindowPosition";
import ProfilePhotos from "../Home/ProfilePhotos.json";

function About() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const checked = useWindowPosition("about");

  let photos = ProfilePhotos;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % photos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, photos]);

  return (
    <section id="about">
      <Box
        className="about__background"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        flexDirection={"column"}
      >
        <Typography variant="h3">About the Site</Typography>
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <Grid
            container
            gap={4}
            alignItems="center"
            p={4}
            justifyContent={"center"}
          >
            <Box
              position="absolute"
              sx={{
                left: { xs: "0rem", md: "22rem" },
                top: { xs: "58rem", md: "70rem" },
                width: { xs: "0%", md: "27rem" },
                height: "28rem",
                background:
                  "linear-gradient(100deg,transparent 40%, rgba(36, 5, 119, 0.5) ,rgba(36, 5, 119, 0.9 ), rgba(36, 5, 119, 0.7))",
                borderRadius: "1.5rem",
              }}
            />

            <CardMedia
              component="img"
              alt={photos[currentIndex].name}
              image={photos[currentIndex].url}
              title={photos[currentIndex].name}
              sx={{
                width: { xs: "24rem", md: "40rem" },
                height: { md: "27rem" },
                objectFit: "contain",
              }}
            />

            <Grid item lg={4} className="about__content">
              <p>
                Here you could find Original Royelty music for your videos,
                commercials,Podcast or youtube videos. By clicking on the
                Products page you can listen to all kind of diffrent style of
                music and with a simple click it will be sent to your email
                account. This site was built by me using .NET ASP and ReactTS.
              </p>
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </section>
  );
}

export default About;
