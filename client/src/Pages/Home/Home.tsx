import { Box } from "@mui/material";
import About from "./About";
import Contact from "./Contact";
import "./homeStyles.css";
import Header from "./Header";

function Home() {
  return (
    <div>
      <Header />
      <Box sx={{ mt: 10 }}>
        <About />
      </Box>
      <Box sx={{ mt: 20 }} />
      <Contact />
      <Box sx={{ mb: 20 }} />
    </div>
  );
}

export default Home;
