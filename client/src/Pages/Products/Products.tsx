import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { SetStateAction, useState } from "react";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { IProduct } from "../../interface/IProduct";
import ProductCard from "./ProductCard";

function Products() {
 //const {increaseCartQuantity} = useShoppingCart();
  
  const products: IProduct = {
    "id": "1",
    "name": "Chunky soul",
    "artist": "Itamar Miron",
    "art": "/Image/Logo_IM icon Black.png",
    "media": "/Music/Chunky Soul.mp3",
    "price": 10
  }

  // const handleCart = (id:number ) => {
  //   increaseCartQuantity(id);
  // }
  return (
    <Container sx={{mt:10}}>
      <h1>Products</h1>
      {/* <Grid item md={2} xs={1} lg={3} gap={3}>

      </Grid> */}
      
        <ProductCard product={products}  />
       
      
    </Container>
  );
}

export default Products;
