import { headers } from '../users/usersServices'
import { api } from '../serviceHelper'

interface Category {
  title: string
  description: string
}

export const fetchCategoryData = async () => {
  let categories: never[] = []
  await api.get('/category/').then((res: any) => {
    categories = res.data.categories
  })
  return categories
}

export const postCategoryData = async (category: Category) => {
  return await api.post('category/', category, { headers })
}

export const patchUserData = async (id: number, category: any) => {
  return await api.patch('category/' + id, category, { headers })
}

export const deleteCategoryData = async (id: number) => {
  return await api.delete('category/' + id, { headers })
}
