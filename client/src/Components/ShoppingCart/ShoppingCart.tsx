import { Box, Button, Drawer, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useMusicProvider } from "../../Context/ProductsContext";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { IMusic } from "../../interface/IMusic";
import { formatCurrency } from "../../Utility/formatCurrency";
import CartItem from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const { music } = useMusicProvider();
  let price: number = 3;
  const totalCart = cartItems.reduce((total, cartItem) => {
    let item = music.find((i: IMusic) => i.id === cartItem.id);
    return total + (price || 0) * cartItem.quantity;
  }, 0);

  const handleCheckOut = () => {
    closeCart();
  }
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      sx={{ "& .MuiPaper-root": { backgroundColor: "#000451 " } }}
    >
      <Box sx={{ width: { xs: "20rem", md: "26rem" } }}>
        <Typography
          display={"flex"}
          justifyContent={"center"}
          variant="h3"
          color={"white"}
          sx={{ "& .MuiTypography-root": { backgroundColor: "#0b0f3e" } }}
        >
          Cart
        </Typography>
        <Grid container direction={"row"} pt={2} gap={2}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          <Typography
            align="right"
            color={"white"}
            sx={{ ml: { xs: 26, md: 38 } }}
          >
            Total {formatCurrency(totalCart)}
          </Typography>
        </Grid>
        {cartItems.length >= 1 ? (
          <Button variant="contained" sx={{ ml: { xs: 25, md: 37 }, mt: 3 }} onClick={handleCheckOut}>
            <StyledLink to="/checkout">Checkout</StyledLink>
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Drawer>
  );
}
//

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
