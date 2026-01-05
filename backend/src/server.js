require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 8000


app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN || "http://localhost:5173",
  credentials:true
}))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.json({message:"ok"})
})

app.use("/api/auth", require("./routes/authRoutes"))


app.listen(port, () => {
  connectDB()
  console.log(`Server is listening on port ${port}`)
})
