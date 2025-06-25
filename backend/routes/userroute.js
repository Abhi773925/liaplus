const express=require('express');
const router=express.Router();
const {createuser,userlogin}=require('../controllers/usercontroller');
router.post('/createuser',createuser);
router.post('/loginuser',userlogin);
module.exports=router;