import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import React from "react";
import ProfilePic from "../../assents/Profile_Pic1.jpg";
import ProfilePhotos from "../Home/ProfilePhotos.json";

function About() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
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
        <Grid
          container
          gap={4}
          alignItems="center"
          p={4}
          justifyContent={"center"}
        >
          {/* <Grid item lg={4} className="about__me"></Grid> */}
          {/* <CardMedia component='img' image={ProfilePic} sx={{width:'40rem',border: '10px solid rgb(36, 5, 119,0.5)'}} className='profile__img'/> */}
          <Box
            position="absolute"
            left="25rem"
            sx={{
              width: "27rem",
              height: "27rem",
              background:
                "linear-gradient(135deg,transparent 30%, rgba(36, 5, 119, 0.5) ,rgba(36, 5, 119, 0.5 ), rgba(36, 5, 119, 0.3))",
            }}
          />
            
          
          <CardMedia
            component="img"
            alt={photos[currentIndex].name}
            image={photos[currentIndex].url}
            title={photos[currentIndex].name}
            sx={{ width: "40rem", height: "27rem" }}
          />

          <Grid item lg={4} className="about__content">
            <p>
              Here you could find Original Royelty music for your videos,
              commercials,Podcast or youtube videos. By clicking on the Products
              page you can listen to all kind of diffrent style of music and
              with a simple click it will be sent to your email account. This
              site was built by me using .NET ASP and ReactTS.
            </p>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
}

export default About;
