import axios from 'axios'
import env from './environments/enviroments'
export const getAllUsers = () => {
  return axios.get(`${env.api}/users`).then((res) => res.data.data)
}
