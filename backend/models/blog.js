const mongoose=require('mongoose');
const blogdetails=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    }
    ,content:{
        type:String,
        require:true
    }
    ,author:{
        type:String,
        require:true
    },
    timestamp:{
        type:Number,
        require:true,
        default:Date.now()
    },
    image:{
        type:String,
        require:true
    }
});

const Blog=mongoose.model("Blog",blogdetails);
module.exports=Blog;