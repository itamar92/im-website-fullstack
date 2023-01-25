import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import LOGO from "../../../src/assents/Logo_IM icon.png";
import LOGO2 from "../../../src/assents/IM_Header.png";
import About from "./About";
import Contact from "./Contact";
import "./homeStyles.css";
import Header from "./Header";

function Home() {
  // const useStyles = makeStyles((theme:any) => ({
  //   root: {
  //     minHeight: '100vh',
  //     backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
  //     backgroundRepeat: 'no-repeat',
  //     backgroundSize: 'cover',
  //   },
  // }));

  return (
    <div>
      <Header />
      <Box sx={{ mt: 10 }}>
        <About />
      </Box>
      <Box sx={{ mt: 20 }}/>
      <Contact />
      <Box sx={{ mb: 20 }}/>
    </div>
  );
}

export default Home;
