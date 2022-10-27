module.exports.index=function(req,res,err){
    return res.json(200,
        {
            message:"List of posts",
            posts:[]

        });
}