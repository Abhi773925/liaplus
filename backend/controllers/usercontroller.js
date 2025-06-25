const Userdetails=require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createuser=async(req,res)=>{
    try {
        const {name,email,role,password}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=await Userdetails.findOne({email});
        if(user){
                res.status(409).json({"messgae":"user already exist"});
        }
        if(!user){
            const user=new Userdetails({name,email,role,password:hashedPassword});
            const saveduser=await user.save();
            res.status(200).json(saveduser);
        }
        
    } catch (error) {
        res.status(500).json({"message":"Failed to add the user to the db"});
    }

}

const userlogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await Userdetails.findOne({email});
        if(!user){
            res.status(401).json({"message":"user not found"});
        }
         const checkpass=await bcrypt.compare(password,user.password);
         if(!checkpass){
            res.status(401).json({"message":"Invalid Credentials"});
         }
         res.status(200).json({"message":"User Logged in sucessfully"});
         
    
    } catch (error) {
        res.status(500).json({"message":"Failed to Retrive the User Credentials"});
    }
}
module.exports={createuser,userlogin};