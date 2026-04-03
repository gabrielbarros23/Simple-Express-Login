var express = require('express');
var router = express.Router();

function Redirect(req,res){
  res.redirect("/")
}

function LogOut(req,res){
  req.session.destroy(Redirect(req,res));
}

router.get('/logout',LogOut);

module.exports = router;
