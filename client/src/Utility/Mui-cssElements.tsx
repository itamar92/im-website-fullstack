import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";


  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  }));

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

export {StyledLink, Search}

