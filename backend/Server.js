import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/profiles", profileRoutes)

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
