const express=require('express');
const app=express();

const router = express.Router();

const questionApi=require('../../../controllers/api/v1/questions');


router.post('/create',questionApi.createQuestion);
router.post('/:id/options/create',questionApi.createOption);
router.post('/:id/delete',questionApi.deleteQuestion);
router.post('/:id',questionApi.showQuestion);

router.get('/',questionApi.index);






module.exports=router;