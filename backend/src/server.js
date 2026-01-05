require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 8000

connectDB()

app.get('/', (req, res) => {
  res.json({message:"ok"})
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
