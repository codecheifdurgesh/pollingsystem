const Questions=require('../../../models/questions');
const Options=require('../../../models/options');
const Question = require('../../../models/questions');
const router = require('../../../routes/api/v1/questions');
module.exports.index=function(req,res,err){
    return res.json(200,
        {
            message:"List of posts",
            posts:[]

        });
}

module.exports.createQuestion=function(req,res,err){
    console.log(req.body);
    Questions.create({content:req.body.content},function(err,question){
        if(err){
            console.log("Error in creating the question");
            return  res.json(500,{
                message:"Internal server error"
             })
        }
        else{
            return res.json(200,{
                message:"Question created succesfully",
                question:question
            });
        }
    })


}

module.exports.createOption=async function(req,res,err){
    console.log("inside the option adding api");
    console.log(req.params.id);
    let question=await Questions.findById(req.params.id);
    console.log(question);
    let option=await Options.create({
        content:req.body.content,
        question:req.params.id,
        votes:0
    });

    option.link_vote=`http://localhost:8000/options/${option._id}/add_vote`;
    await option.save();

    await question.options.push(option);
    await question.save();

    

    return res.json(200,{
        message:"option added successfully",
        question:question,
        option:option
    });
}

module.exports.deleteQuestion=async function(req,res,err){
    let question=await Questions.findById(req.params.id);
    var flag=true;
    if(question){
        let options=question.options;
        for(let e of options){
            console.log(e);
            let op=await Options.findById(e);
            console.log(op);
            console.log(op.votes);
            if(op.votes>0){
                console.log("votes is greater")
                flag=false;
                break;
            }
        }
        if(flag==false){
            return res.json(401,{
                message:"You can delete the question, it has options that are having votes",
                data:question
            });
        }
        else{
            await Options.deleteMany({question:req.params.id});
            await question.remove();
            return res.json(200,{
                message:"Question deleted succesfully",
                data:question
            });
        }


    }
    else{
        return res.json(404,{
            message:"Unable to find the question",
            data:[]
        })
    }
}

module.exports.showQuestion=async function(req,res,err){
    let question=await Question.findById(req.params.id)
    .sort('-createdAt')
    .populate('options');
    if(question){
    return res.json(200,{
        message:"Found the question",
        data:question

    });
}
else{
    return res.json(404,{
        message:"Question not found",
        data:{}
    })
}
}