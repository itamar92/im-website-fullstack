import { IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useMusicProvider } from "../../Context/ProductsContext";
import { IMusic } from "../../interface/IMusic";
import ProductCard from "./ProductCard";
import { useAuthProvider } from "../../Context/AuthProvider";

function Products() {
  const { music, setMusic } = useMusicProvider();
  const { role } = useAuthProvider();

  return (
    <Container sx={{ mt: 10, pb: { xs: 30, md: 20 } }}>
      <Grid container justifyContent={"center"}>
        <h1>Products</h1>

        <Grid
          container
          justifyContent={"center"}
          direction={"row"}
          pt={2}
          gap={2}
        >
           {role.includes("Admin" || "Moderator") ? (
          <Paper elevation={3} sx={{ pb: 2,
        backgroundColor: "primary.dark",width: "40rem" }}>
            <List>
              <ListItem>
                <IconButton color="secondary" size="large">
                   <AddBoxOutlinedIcon fontSize="large" />
                </IconButton>
              
              <ListItemText  primary="Add New"
            primaryTypographyProps={{
              fontSize: 22,
              color: "primary.contrastText",
            }}/>
                </ListItem>
            </List>
          </Paper>) : ""}
          {music &&
            music.map((item: IMusic) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
