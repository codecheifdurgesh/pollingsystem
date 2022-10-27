const Options=require('../../../models/options');
const Questions=require('../../../models/questions');
module.exports.index=function(req,res,err){
    return res.json(200,
        {
            message:"List of posts",
            posts:[]

        });
}

module.exports.deleteOption=async function(req,res,err){
    let option=await Options.findById(req.params.id);
    if(option){
       let questionId=option.question;
       console.log("id of the question is "+questionId);
        

        if(option.votes>0){
            return res.json(401,{
                message:"Option can not be deleted as it is having votes to it",
                data:option
            })
        }
        else{
            await option.remove();
             Questions.findByIdAndUpdate(questionId,{$pull:{options:{ $in: [req.params.id] }}},{ new: true },function(err,question){
                console.log("inside the update function");
                return res.json(200,{
                    message:"Option deleted succesfully",
                    data:[]
                });
            });
            
        }

    }
    else{
        return res.json(404,{
            message:"Unable to find the option",
            data:[]
        });
    }
}

module.exports.addVote=async function(req,res,err){
    let option=await Options.findById(req.params.id);
    console.log(option);
    option.votes=option.votes+1;
    await option.save();
    return res.json(200,{
        message:"vote has been added succesfully",
        data:option
    });
}


