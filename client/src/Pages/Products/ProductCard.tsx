import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IProduct } from '../../interface/IProduct';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  product: IProduct;
  addToCart: (product: IProduct) => void;
}

const ProductCard: React.FC<Props> = ({ product, addToCart }) => {
  //const classes = useStyles();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card sx={{width:'345px'}}>
      <CardActionArea onClick={togglePlay}>
        <CardMedia
          sx={{height:'145px'}}
          image={product.art}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
      <audio ref={audioRef} src={product.media} onEnded={togglePlay} />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCartIcon />}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
