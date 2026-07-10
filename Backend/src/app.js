const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* global error handler - ensures multer/file errors return JSON, not an HTML crash page */
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message)
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong on the server."
    })
})

module.exports = app