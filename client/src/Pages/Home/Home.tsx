import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import LOGO from "../../../src/assents/Logo_IM icon.png";
import About from "./About";
import "./homeStyles.css";

function Home() {
  return (
    <div className="header">
    <section id="head" >
      <header>
      <Grid container className="header__container"   >
          <Grid item xs={12} md={12} lg={4}  >
            <h1>Get royalty free music for your Videos</h1>
            <h3 className="text_light">
                {" "}
                Original music | High quality | Various Styls
              </h3>
          </Grid>
          <Grid item xs={12} md={9} lg={6} >
            <CardMedia component="img" image={LOGO} alt="im-logo" />
          </Grid>
        </Grid>
      </header>
      </section>
      <Box sx={{mt:20}}>{""}</Box>
      <About/>
      </div>
  );
}

export default Home;
