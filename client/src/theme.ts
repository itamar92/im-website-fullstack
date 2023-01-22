import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#534bae",
      main: "#1a237e",
      dark: "#000051",
      contrastText: "#fff",
    },
    secondary: {
      light: "#666ad1",
      main: "#303f9f",
      dark: "#001970",
      contrastText: "#000",
    },
    info:{
      main: "#93aac2",
      
     
    }
  },
  typography:{
    fontFamily: 'Poppins',
    
  }
});

export default theme;
