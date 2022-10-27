const express=require('express');
const app=express();

const router = express.Router();



const optionsApi=require('../../../controllers/api/v1/options');

router.get('/',optionsApi.index);


router.post('/:id/delete',optionsApi.deleteOption);
router.post('/:id/add_vote',optionsApi.addVote);



module.exports=router;