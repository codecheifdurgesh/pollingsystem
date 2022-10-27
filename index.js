const express=require('express');
const app=express();
const port=8000;
const  db=require('./config/mongoose');
const bodyparser=require('body-parser');


app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyparser.urlencoded({extended:false}));
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in rnning the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
  
});