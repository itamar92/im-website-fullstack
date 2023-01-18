import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "../../clientApi/axios";
import { useMusicProvider } from "../../Context/ProductsContext";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { IMusic } from "../../interface/IMusic";
import { IProduct } from "../../interface/IProduct";
import ProductCard from "./ProductCard";

function Products() {
 //const {increaseCartQuantity} = useShoppingCart();
  const {music, setMusic} = useMusicProvider();
  const products: IProduct = {
    "id": "1",
    "name": "Chunky soul",
    "artist": "Itamar Miron",
    "art": "/Image/Logo_IM icon Black.png",
    "media": "/Music/Chunky Soul.mp3",
    "price": 10
  }

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
  }, []);

  // const handleCart = (id:number ) => {
  //   increaseCartQuantity(id);
  // }
  return (
    <Container sx={{mt:10}}>
      <h1>Products</h1>
     
      
        <ProductCard product={music}  />
       
      
    </Container>
  );
}

export default Products;
