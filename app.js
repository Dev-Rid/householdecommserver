const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
// console.log(bodyParser, nodemailer)





const port = 3002
app.listen(port, "localhost", () =>{
    console.log("server is listening to port" + port)
})
