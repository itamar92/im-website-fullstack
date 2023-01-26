import {
  Box,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import React from "react";
import LOGO2 from "../../../src/assents/IM_Header.png";

function Header() {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <section id="head">
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        flexDirection={"column"}
        sx={{ background: "#211e25" }}
      >
        <CardMedia
          component="img"
          image={LOGO2}
          sx={{ mb: { md: -18 }, width: { xs: "100%", md: "75%" } }}
        />
        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedSize={50}
        >
          <Container sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ color: "secondary.main" }}>
              Experience{" "}
            </Typography>
            <Typography variant="h3" sx={{ color: "white" }}>
              {" "}
              the Sound of IM Music
            </Typography>

            <IconButton LinkComponent={"a"} href="#about">
              <KeyboardArrowDownOutlinedIcon
                sx={{ color: "#3af2e3", fontSize: "4rem" }}
              />
            </IconButton>
          </Container>
        </Collapse>
      </Box>
    </section>
  );
}

export default Header;
