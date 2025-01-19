const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const cors = require("cors")
require("dotenv").config()

const path = require("path")

// console.log(process.env.EMAIL_USER, pnorocess.env.EMAIL_PASS)

// my app port
const port = 3007

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
// console.log(bodyParser, nodemailer)
app.use(express.static(path.join(__dirname, "build")))



// || Serve Static Files ||
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})



// || Email endpoint || 
app.post("/send-email", (req, res) => {
    // const { name, email, message, orderDetails } = req.body
    const { name, email, phoneNumber, secondNumber, yourState, deliveryAddress, quantity } = req.body
    console.log("Request Body:", req.body);
    
    // configure nodemailer (SMTP configuration)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        } 
    })


    // Email option
    const mailOptions = {
        from: email,                                                                                                                                                
        to: "ridwanabiola2000@gmail.com",
        subject: `New Order from ${name}`,
        // text: `You received a new order: \n\n${orderDetails}\n\nMessage: ${message}`
        text: `You received a new order from: ${name}\n\nname: ${name}\n\nphoneNumber: ${phoneNumber}\n\nsecondNumber: ${secondNumber}\n\nyourState: ${yourState}\n\ndeliveryAddress: ${deliveryAddress}\n\nquantity: ${quantity}`
        
    }


    
    // testing my connection
    // transporter.verify((error, success) =>{
    //     if (error) {
    //         console.error("SMPT verification failed", error)
    //     } else {
    //         console.log("SMTP verification successful")
    //     }
    // })

    try{
        // send Email
        transporter.sendMail(mailOptions)
        res.status(200).json({ success: true, message: "Order Email sent successfully!" })

        // res.status(200).send("Order Email sent successfully!")
    } catch (error) {
        console.log("Error sending email:", error)
        res.status(500).send("Failed to send email. Please try again later.")
    }

})


app.listen(port, "localhost", () =>{
    console.log("server is listening to port " + port)
})
