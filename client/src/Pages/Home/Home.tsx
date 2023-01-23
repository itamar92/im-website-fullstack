import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import LOGO from "../../../src/assents/Logo_IM icon.png";
import LOGO2 from "../../../src/assents/IM_Header.png";
import About from "./About";
import Contact from "./Contact";
import "./homeStyles.css";

function Home() {
  console.log("home Component");
  return (
    <div className="header">
      <section id="head">
        <Box className="header__hero">
          <Grid
            container
            spacing={3}
            className="header__container"
            sx={{ mt: 2 }}
          >
            <Grid>
              <Grid>
                <CardMedia
                  component="img"
                  image={LOGO2}
                  alt="im-logo"
                  sx={{ borderImage: "round", borderRadius: 70 }}
                />
              </Grid>
              <h1>Get royalty free music for your Videos</h1>
              <h3 className="text_light">
                {" "}
                Original music | High quality | Various Styls
              </h3>
            </Grid>
          </Grid>
        </Box>
      </section>
      <Container maxWidth='lg' sx={{justifyItems:'center'}}>
        <Box  sx={{ mt: 10 }}>{""}</Box>
        <About />
        <Box sx={{ mt: 20 }}>{""}</Box>
        <Contact />
      </Container>
    </div>
  );
}

export default Home;
