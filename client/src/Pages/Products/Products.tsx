import { Box, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import axios from "../../clientApi/axios";
import { useMusicProvider } from "../../Context/ProductsContext";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { IMusic } from "../../interface/IMusic";
import ProductCard from "./ProductCard";

function Products() {
  //const {increaseCartQuantity} = useShoppingCart();
  const { music, setMusic } = useMusicProvider();

  const getMusic = async () => {
    try {
      const response = await axios.get<IMusic[]>("music");
      console.log(response.data);
      setMusic(response.data);
      console.log(music);
    } catch (err: any) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  };

  useEffect(() => {
    getMusic();
    console.log(music);
  }, []);

  // const handleCart = (id:number ) => {
  //   increaseCartQuantity(id);
  // }
  return (
    <Container   sx={{ mt: 10, pb:{xs:30, md:20}}}>
      <Grid container justifyContent={'center'}>
      <h1>Products</h1>

      <Grid container justifyContent={'center'} direction={'row'} pt={2} gap={2}  >
        {music && music.map((item: IMusic) => <ProductCard key={item.id} product={item} />)}
      </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
