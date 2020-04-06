const express = require("express") //server package
const app = express()
const PORT = 4000
const mongoose = require("mongoose") // db api package
const cors = require("cors")

mongoose.connect("mongodb://localhost/b49-todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let db = mongoose.connection
db.once('open', ()=> console.log("Connected to MongoDB"))

app.use(cors())
app.use(express.json())
app.use("/todos", require("./routes/todos"))

app.listen(4000, () => console.log(`Server is running in port ${PORT}`));