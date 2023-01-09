import { api } from '../serviceHelper'
import { headers } from '../users/usersServices'

interface OrderHasProduct {
  quantity: number
  order_id: number
  product_id: number
}

export const fetchOrderHasProducttData = async () => {
  let products: never[] = []
  await api.get('product/').then((res: any) => {
    products = res.data.products
  })
  return products
}
export const createOrderHasProducttData = async (product: OrderHasProduct) => {
  return await api.post('product', product)
}

export const patchOrderHasProductData = async (id: number, product: any) => {
  return await api.patch('product/' + id, product, headers)
}
export const deleteOrderHasProductData = async (id: number) => {
  return await api.delete('product/' + id, headers)
}
