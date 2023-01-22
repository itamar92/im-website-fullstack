import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import LOGO from "../../../src/assents/Logo_IM icon.png";
import About from "./About";
import Contact from "./Contact";
import "./homeStyles.css";

function Home() {
  console.log("home Component");
  return (
    <div className="header">
      <Container>
    <section id="head" >
      <header >
      <Grid container spacing={3} className="header__container"   >
          <Grid item xs={12} md={5} lg={5}  >
            <h1>Get royalty free music for your Videos</h1>
            <h3 className="text_light">
                {" "}
                Original music | High quality | Various Styls
              </h3>
          </Grid>
          <Grid item xs={12} md={7} lg={7}  >
            <CardMedia component="img" image={LOGO} alt="im-logo" />
          </Grid>
        </Grid>
      </header>
      </section>
      <Box  sx={{mt:10}}>{""}</Box>
      <About/>
      <Box sx={{mt:20}}>{""}</Box>
      <Contact/>
      </Container>
      </div>
  );
}

export default Home;
