import { headers } from '../users/usersServices'
import { api } from '../serviceHelper'

interface Order {
  price: number
  user_id: number
}

export const fetchOrderData = async (id: number) => {
  return await api.get('/order/' + id)
}

export const postOrderData = async (order: Order) => {
  return await api.post('order/', order, { headers })
}
export const patchOrderData = async (id: number, order: any) => {
  return await api.patch('order/' + id, order, { headers })
}

export const deleteOrderData = async (id: number) => {
  return await api.delete('order/' + id, { headers })
}
