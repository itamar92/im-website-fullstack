import  Container  from "@mui/material/Container";
import  Card  from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';


function Home() {
  return (
    <Container maxWidth='md' >
       <CardMedia
          
          component="img"
          height="140"
          image="src/assents/Logo_IM icon.png"
          alt="im-logo"
        />
     <h1>Home</h1>
      
    </Container>
    
  );
}

export default Home;