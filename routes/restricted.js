var express = require('express');
var router = express.Router();

function CheckUser(req,res,next){
  //if have User call the callback
  if(req.session.user){
    next();
  }else{
    req.session.error = "Acess denied";
    res.redirect("/login");
  }
};

function RenderPage(_req,res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
}

//route flow
router.get('/restricted',CheckUser,RenderPage);

module.exports = router;
