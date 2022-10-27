const express = require('express');
const app = express();

module.exports.home=function(req,res,err){
    return res.render('home')
}