const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')

const corsOptions = {
  origin: ["http://localhost:8080","http://172.10.22.81:5173"]
};
app.use(cors(corsOptions));

router(app)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})