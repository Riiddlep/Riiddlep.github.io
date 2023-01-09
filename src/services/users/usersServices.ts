import { api } from '../serviceHelper'
interface User {
  firstname: string
  lastname: string
  email: string
  password: string
}
interface Login {
  email: string
  password: string
}
export const submitContact = async (event: any) => {
  event.preventDefault()
  const register = {
    firstname: event.target.firstname.value,
    lastname: event.target.lastname.value,
    email: event.target.email.value,
    password: event.target.password.value
  }
  registerUserData(register)
}
export const loginContact = async (event: any) => {
  event.preventDefault()
  const login = {
    email: event.target.email.value,
    password: event.target.password.value
  }

  loginUserData(login)
}

export const fetchUserData = async (id?: number) => {
  return await api.get('/user/' + id)
}

export const registerUserData = async (register: User) => {
  await api.post('user/register', register)
}
export const headers = { withCredentials: true }
export const loginUserData = async (login: Login) => {
  await api.post('user/login', login, headers).then((response) => {
    console.log(response)
  })
}

export const patchUserData = async (id: number, users: any) => {
  return await api.patch('user/' + id, users, headers)
}
export const deleteUserData = async (id: number) => {
  return await api.delete('user/' + id, headers)
}
