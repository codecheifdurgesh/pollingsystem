const express=require('express');
const app=express();

const router = express.Router();

router.use('/posts',require('./posts'));
router.use('/questions',require('./questions'));
router.use('/options',require('./options'));




module.exports=router;