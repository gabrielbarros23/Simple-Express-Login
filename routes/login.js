var express = require('express');
var router = express.Router();
var hash = require('pbkdf2-password')()

//placeholder database
var users = {
  tj: {name: "tj"}
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
hash({password: 'foobar'}, function (err,pass,salt,hash){
    if(err) throw err;
    users.tj.salt = salt;
    users.tj.hash = hash;
})

function authenticate(name,pass,fn){
  if(!module.parent) console.log("authenticating, %s:%s",name,pass);
  var user = users[name];

  // query the db for the given username
  if(!user) return fn(null,null);

  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({password:pass,salt:user.salt},function (err,pass,salt,hash){
    if(err) return fn(err);

    //if success call the callback with User object
    if(hash == user.hash){
      return fn(null,user);
    }else{
      fn(null,null);
    } 
  })
}

//login validate
router.post("/login", (req,res) => {
  if(!req.body) {res.sendStatus(400)};

  authenticate(req.body.username, req.body.password, function(err,user){
    //callback  after the anthenticate function  
    if(err) return next(err);

    // if success
    if(user){
      req.session.regenerate(function () {
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect(req.get('Referrer') || '/');
      })
    }else{
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect(req.get('Referrer') || '/');
    }
  })
});

//render page
router.get("/login", (req,res) => {
  res.render("login");
});

module.exports = router;
