const mongoose=require('mongoose');
const userdetails= new  mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }
    ,password:{
        type:String,
        require:true
    }
});
const Userdetails=mongoose.model('Userdetails',userdetails);
module.exports=Userdetails;