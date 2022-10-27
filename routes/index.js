const express=require('express');
const app=express();
const homeController=require('../controllers/index');
const router = express.Router();


router.use('/api',require('./api'));
router.get('/',homeController.home);



module.exports=router;