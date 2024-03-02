const express = require('express');

const mongoose = require('mongoose');

const bodyParser=require('body-parser');

const dotenv=require('dotenv');                         //to hide id's,passwords,etc

const  app = express();

dotenv.config();                                                   //configuring the dotenv file with our project

const port=process.env.PORT || 3000;                //to hide the port num

const username=process.env.MONGODB_USERNAME;        //to extract data  from .env file
const password= process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.gy1in8s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/index.html");                    //sending index page to user
})

app.post("/register",(req,res)=>{
    try{
        const {name,email,password}=req.body;       //extracting data from req.body
    }catch{

    }
})

app.listen(port,()=>{
    console.log("SERVER STARTED!");
});
