const express=require('express');
const app=express();
const port=8000;
const  db=require('./config/mongoose');

app.get('/',function(req,res){
    return res.send("hello world server is up and running");
})
app.listen(port,function(err){
    if(err){
        console.log(`Error in rnning the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
  
});