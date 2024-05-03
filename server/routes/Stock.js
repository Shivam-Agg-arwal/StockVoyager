const express=require('express');
const router=express.Router();

const {buyStock}=require('../controllers/Stock');

const{auth}=require('../middlewares/auth');

router.post('/buyStock',auth,buyStock);

module.exports=router;