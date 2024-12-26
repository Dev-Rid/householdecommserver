const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const cors = require("cors")

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
// console.log(bodyParser, nodemailer)






const port = 3002
app.listen(port, "localhost", () =>{
    console.log("server is listening to port" + port)
})
