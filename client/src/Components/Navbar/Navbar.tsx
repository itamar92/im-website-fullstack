import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import LoginControl from "../Login/LoginControl";
import { useAuthProvider } from "../../Context/AuthProvider";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { Stack } from "@mui/material";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const {role} = useAuthProvider();  
  const { openLoginDialog, openRegisterDialog, isLoggedIn, setLoggedOutUser } = useAuthProvider();
  const { openCart, cartQuantity } = useShoppingCart();
  const [scroll, setScroll] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  

  const handleMobileMenuClose = (id: string) => {
    if (id === "login") {
      openLoginDialog();
      setMobileMoreAnchorEl(null);
    }
    else if (id === "register") {
      openLoginDialog();
      setMobileMoreAnchorEl(null);
    }
    else if ( id === "logout"){
      setLoggedOutUser();
      setMobileMoreAnchorEl(null);
    }
     else {
      setMobileMoreAnchorEl(null);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <button onClick={openLoginDialog}>Sign In</button>
      </MenuItem>
      <MenuItem>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLoggedIn ? (
        <MenuItem onClick={() => handleMobileMenuClose("logout")}>Logout</MenuItem>
      ) : (
        <div>
          <MenuItem onClick={() => handleMobileMenuClose("login")}>
            Sign In
          </MenuItem>
          <MenuItem onClick={() => handleMobileMenuClose("register")}>
            Sign Up
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color={`${scroll ? "primary" : "transparent"}`}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledLink to="/#head" color="black">
                  Home
                </StyledLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledLink to="/#about" color="black">
                  About
                </StyledLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledLink to="/products" color="black">
                  Products
                </StyledLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledLink to="/#contact" color="black">
                  Contact
                </StyledLink>
              </MenuItem>
              {role.includes("Admin" || "Moderator") &&
              <MenuItem onClick={handleCloseNavMenu}>
                <StyledLink to="/admin" color="black">
                  Admin
                </StyledLink>
              </MenuItem>}
            </Menu>
          </Box>
          <StyledLink to="/#head">
            <Stack
              direction={"row"}
              alignItems="center"
              sx={{ ml: { xs: 0, md: 2 } }}
            >
              <GraphicEqIcon
                sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 1,
                  display: { xs: "flex", md: "flex" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                IM
              </Typography>
            </Stack>
          </StyledLink>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Songs…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mr: 5 }}>
            <Button onClick={handleCloseNavMenu}>
              <StyledLink to="/#head">Home</StyledLink>
            </Button>
            <Button onClick={handleCloseNavMenu}>
              <StyledLink to="/#about">About</StyledLink>
            </Button>
            <Button onClick={handleCloseNavMenu}>
              <StyledLink to="/products">Products</StyledLink>
            </Button>
            <Button onClick={handleCloseNavMenu}>
              <StyledLink to="/#contact">Contact</StyledLink>
            </Button>
            {role.includes("Admin" || "Moderator") &&
            <Button variant="outlined" color="secondary" onClick={handleCloseNavMenu}>
              <StyledLink to="/admin" >Admin</StyledLink>
            </Button>}
          </Box>
          <IconButton size="large" color="inherit" onClick={openCart}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {isLoggedIn ? (
            <IconButton
            onClick={handleMobileMenuOpen}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 3,
                justifyContent: "center",
                gap: 3,
              }}
            >
              <LoginControl />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 3,
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={openLoginDialog}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={openRegisterDialog}
              >
                Sign Up
              </Button>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

const activeNavB = styled(Button)(({theme}) => ({
  
}))


//#region SEARCH BAR
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
//#endregion

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
