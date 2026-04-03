var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/user", (req,res) => {
  res.send(`${req.body.name}`);
});

router.post("/user", (req,res) => {
  res.send(`${req.body.name}`);
});

router.put("/user", (req,res) => {
  res.send("Got a PUT request at /users");
});

router.delete("/user",(req,res) => {
  res.send("Got a DELETE request at /user");
});

module.exports = router;
