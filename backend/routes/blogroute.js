const {createblog,fetchblog,deleteblog,updateblog,getblogbyid, checkuserrole}=require("../controllers/blogcontroller");
const express=require('express');
const router=express.Router();
router.post('/createblog',createblog);
router.get("/getblog",fetchblog);
router.delete('/deleteblog', deleteblog);
router.put('/updateblog',updateblog);
router.get("/get",getblogbyid);
router.get("/checkuserrole",checkuserrole)
module.exports=router;