const express = require("express")
const app = express()
// Routes
const analiticsRoutes = require("./routes/analitics")
const authRoutes = require("./routes/auth")
const categoryRoutes = require("./routes/category")
const orderRoutes = require("./routes/order")
const positionRoutes = require("./routes/position")
const keys = require("./config/keys")
// 
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
// 
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongo is connected"))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())

app.use("/api/analitics", analiticsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/position", positionRoutes)
// 
module.exports = app