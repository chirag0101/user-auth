const express = require('express');

const mongoose = require('mongoose');

const bodyParser=require('body-parser');

const dotenv=require('dotenv');                         //to hide id's,passwords,etc

const  app = express();

dotenv.config();                                                   //configuring the dotenv file with our project

const port=process.env.PORT || 3000;                //to hide the port num

const username=process.env.MONGODB_USERNAME;        //to extract data  from .env file
const password= process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.gy1in8s.mongodb.net/registrationFormDB`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

//schema of how the data will be saved
const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const Registration=mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/index.html");                    //sending index page to user
})

app.post("/register",async (req,res)=>{
    try{
        const {name,email,password}=req.body;       //extracting data from req.body

        const existingUser=await Registration.findOne({email:email});   //check if this user is already in db or not

        if(!existingUser){
            const registrationData = new Registration({
                name,
                email,
                password
            });
            await registrationData.save();
            res.redirect('/success');               //after saving redirect back to succes page    
        }else{
            console.log("User Exists!");
            res.redirect("/error");
        }
    }catch(error){
        console.log(error);
        res.redirect('/error');
    }
});

app.get("/success", (req,res)=>{
    res.sendFile(__dirname+ "/pages/success.html")             //if success then send sucess page
});

app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/pages/error.html");
})



app.listen(port,()=>{
    console.log("SERVER STARTED!");
});
