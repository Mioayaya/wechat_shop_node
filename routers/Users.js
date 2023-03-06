const express = require("express");
const router = express.Router();
const User = require("../models/users");

// 测试接口
router.get("/test",(req,res) => {
  res.json({name:'蔡徐坤'})
})

// 注册接口
router.post("/register",(req,res) => {
  // console.log(req.body);
  const userData = {
    name: req.body.name,
    // ···
  }
})

module.exports = router;