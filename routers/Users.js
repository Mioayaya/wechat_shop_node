const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/test",(req,res) => {
  res.json({name:'蔡徐坤'})
})

module.exports = router;