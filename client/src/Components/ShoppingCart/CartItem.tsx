import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
  IconButton
} from "@mui/material";
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import React from "react";
import { useMusicProvider } from "../../Context/ProductsContext";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { IMusic } from "../../interface/IMusic";
import LOGO from "../../assents/Logo_IM icon.png";
import { formatCurrency } from "../../Utility/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const { music } = useMusicProvider();
  const item = music.find((i: IMusic) => i.id === id);
  if (item == null) return null;

  let price: number = 3;
  return (
    <Box >
      <Grid item xs={8} md={12} >
        <ListItem>
          <img
            src={LOGO}
            style={{ width: "6.5rem", height: "5rem", objectFit: "cover" }}
          />
           <ListItemText
            color="primary"
            primary={item.fileName}
            primaryTypographyProps={{
              fontSize: 18,
              color: "primary.contrastText",
            }}
            secondary={formatCurrency(price)}
            secondaryTypographyProps={{ fontSize: 15, color: "info.main" }}
            sx={{mr:{xs:9.5, md:0}}}
          />
          {quantity > 1 && (
            <ListItemText
            color="primary"
            primary={`X${quantity}`}
            
            primaryTypographyProps={{
              fontSize: '.65rem',
              color: "info.main",
              p:1
            }}/>
          )}
           <ListItemText
            color="primary"
            primary={formatCurrency(price*quantity)}
            primaryTypographyProps={{
              fontSize: 18,
              color: "white",
              p:2
            }}
            sx={{pl:1, mr:{xs:5, md:0}}}/>
          <IconButton color="error" sx={{ ml:2}} onClick={()=> removeFromCart(item.id)}>
          <CancelPresentationOutlinedIcon  />
          </IconButton>
           
        </ListItem>
       
      </Grid>
    </Box>
  );
}
