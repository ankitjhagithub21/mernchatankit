require('dotenv').config()
const { server, app } = require("./socket/socket");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000


app.use(cors({
  origin:process.env.ORIGIN || "http://localhost:5173",
  credentials:true
}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({message:"ok"})
})

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB()
});
