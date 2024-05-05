const express=require('express');
const router=express.Router();

const {addToGraph}=require('../controllers/PortfolioReading');

const{auth}=require('../middlewares/auth');

router.post('/addToGraph',auth,addToGraph);

module.exports=router;