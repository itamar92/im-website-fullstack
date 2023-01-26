import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const baseColors = {
  darkBlue: "#1a237e",
  white: "FFF",
  turquoise: "#3af2e3",
  black: "black",
};

// declare module "@mui/material/styles" {
//   interface Palette {
//     baseColors: {
//       main: string;
//       white: string;
//       turquoise: string;
//       black: string;
//     };
//   }

//   interface PaletteOptions {
//     baseColors: {
//       main: string;
//       white: string;
//       turquoise: string;
//       black: string;
//     };
//   }
// }

const theme = createTheme({
  palette: {
    primary: {
      light: "#534bae",
      main: baseColors.darkBlue,
      dark: "#000051",
      contrastText: "#fff",
    },
    secondary: {
      light: "#666ad1",
      main: baseColors.turquoise,
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
