const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./User')

//access post request
app.use(bodyParser.json())

const Users = mongoose.model("users")

const mongoURL = "mongodb+srv://certaindeath7:cIzUQAJMnWZ5xcj4@cluster0-l25ij.mongodb.net/Validation?retryWrites=true&w=majority"
//connect to db
mongoose.connect(mongoURL,{ 
    useNewUrlParser:true,
    useUnifiedTopology: true 
})

//create POST route
app.post('/send', (req,res)=>{
    const customer = new Users({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    })
    customer.save()
    .then(response=>{
        console.log(response)
        res.send("successfully updated")
    }).catch(err=>{
        console.log(err)
    })
    res.send("posted")
})


//create GET route
app.get('/',(req, res)=>{
    Users.find({}).then(response=>{
        res.send(response)
    }).catch(err=>{
        console.log(err)
    })
})

mongoose.connection.on("connected", ()=>{
    console.log("connected")
})

mongoose.connection.on("error", (err)=>{
    console.log("error", err)
})



app.listen(3000, ()=>{
    console.log("server running")
})