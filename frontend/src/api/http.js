import axios from "axios"

const http = axios.create({
  baseURL: "http://localhost:3000",
    // 查询ip更改
  headers: {
    "Content-type": "application/json"
  }
})

export default http