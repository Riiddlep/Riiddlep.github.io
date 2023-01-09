import { api } from '../serviceHelper'
import { headers } from '../users/usersServices'

interface Product {
  title: string
  price: number
  description: string
  category_id: number
}

export const fetchProductData = async () => {
  let products: never[] = []
  await api.get('product/').then((res: any) => {
    products = res.data.products
  })
  return products
}
export const createProductData = async (product: Product) => {
  return await api.post('product', product)
}

export const patchProductData = async (id: number, product: any) => {
  return await api.patch('product/' + id, product, headers)
}
export const deleteProductData = async (id: number) => {
  return await api.delete('product/' + id, headers)
}
