import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import ProductProps from '../props/product.props'

type Props = {
  props: ProductProps
  handleAddToCart: (clickedItem: ProductProps) => void
}
export default function ProductCard({ props, handleAddToCart }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src="https://www.asdetreflepro.nc/media/catalog/product/cache/88ae9e0a88a8d1796c5f681bed7cd4ce/t/n/tnu-00007.jpg"
        alt="laptop asus gaming"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          {props.price} $
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => handleAddToCart(props)}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}
