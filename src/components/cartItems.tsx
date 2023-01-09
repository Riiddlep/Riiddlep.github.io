import { Button } from '@mui/material'
import ProductProps from '../props/product.props'

type Props = {
  item: ProductProps
  addToCart: (clickedItem: ProductProps) => void
  removeFromCart: (id: number) => void
}

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <div>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button size="small" disableElevation variant="contained" onClick={() => removeFromCart(item.id)}>
            -
          </Button>
          <p>{item.amount}</p>
          <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}>
            +
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
