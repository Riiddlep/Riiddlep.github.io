export default interface ProductProps {
  id: number
  title: string
  price: number
  description: string
  pictures: string
  createdAt?: Date
  updatedAt?: Date
  category_id: string
  amount: number
}
