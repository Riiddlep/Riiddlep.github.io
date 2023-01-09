import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import ProductProps from '../props/product.props'
import CartItem from '../components/cartItems'

type Props = {
  cartItems: ProductProps[]
  addToCart: (clickedItem: ProductProps) => void
  removeFromCart: (id: number) => void
}

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: ProductProps[]) => items.reduce((acc, item) => acc + item.amount * item.price, 0)

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  )
}

export default Cart
