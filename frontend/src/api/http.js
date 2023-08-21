import axios from "axios"
import {useUserStore} from '../store/user'
const http = axios.create({
  baseURL: "http://localhost:3000",
  baseURL: "http://10.79.212.64:3000",
    // 查询ip更改
  headers: {
    "Content-type": "application/json"
  },
  timeout: 5000 // 设置超时时间为5秒钟
})
// 拦截 axios 请求，在每次发送请求之前，从 pinia 获取 token
http.interceptors.request.use( // Request Interceptor
  config => {

    const { token } = useUserStore()
    if (token) config.headers.Authorization = `Bearer ${token}`  // add jwt token to headers
    return config
  },
  error => Promise.reject(error)
)

// http.post(`feed/${post.id}/like`, { value: 666 })
//   .then(res => {
//     console.log("1144512312")
//   })
//   .catch(error => {
//     console.log(82790123)
//   })

export default http