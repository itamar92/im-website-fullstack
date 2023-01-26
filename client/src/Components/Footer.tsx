import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { GrSoundcloud } from "react-icons/gr";
import { Grid, IconButton } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2">
      {"Copyright © Itamar Miron  "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      mt={0}
      sx={{
        display: "flex",
        //flexDirection: "column",
        height: { xs: 200, md: 100 },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a237e",
      }}
    >
      <Box component="footer" sx={{mb:{xs:12, md:0}}}>
        <Grid
          container
          item
          alignItems={"center"}
          justifyContent="center"
          gap={2}
        >
          <Copyright />
          <Grid item>
            <IconButton
              LinkComponent={"a"}
              href="https://www.linkedin.com/in/itamar-miron-848753125"
              target={"_blank"}
              color={"inherit"}
            >
              <BsLinkedin />
            </IconButton>
            <IconButton
              LinkComponent={"a"}
              href="https://github.com/itamar92"
              target={"_blank"}
              color={"inherit"}
            >
              <FaGithub />
            </IconButton>
            <IconButton
              LinkComponent={"a"}
              href="https://www.facebook.com/imusicproductions"
              target={"_blank"}
              color={"inherit"}
            >
              <IoLogoFacebook />
            </IconButton>
            <IconButton
              LinkComponent={"a"}
              href="https://soundcloud.com/itamarmiron"
              target={"_blank"}
              color={"inherit"}
            >
              <GrSoundcloud />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
