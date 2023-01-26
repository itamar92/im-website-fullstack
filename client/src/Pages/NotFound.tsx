import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container sx={{height:'100vh', textAlign:'center', pt:20}} >
      <Typography variant="h2" color={"white"}>
        {" "}
        Sorry
      </Typography>
      <Typography variant="h4" color={"white"}>
        {" "}
        The page cannot be found
      </Typography>
      <StyledLink to="/">
        <Button variant="contained" sx={{mt:5}}>
        Back to Home
        </Button>
      </StyledLink>
    </Container>
  );
}

export default NotFound;

const StyledLink: React.FC<
  React.PropsWithChildren<{ to: string; color?: string }>
> = ({ children, to, color = "white" }) => {
  return (
    <Box
      sx={{
        [`>*`]: {
          textDecoration: "none",
          color,
          ":hover": { color: "#2dd7d7" },
          "&:active": {
            color: "light-blue",
          },
        },
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};

