const mongoose=require('mongoose');
const optionSchema=new mongoose.Schema({
    content:{
        type:String,
        Required:true
    },
    link_vote:{
        type:String,
        
    },
    question:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
    },
    votes:{
type:Number
    },


},
{
    timestamps:true,
});

const Option=mongoose.model('Option',optionSchema);
module.exports=Option;

