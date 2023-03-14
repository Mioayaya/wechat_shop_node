const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");

// 测试接口
router.get("/test",(req,res) => {
  res.json({name:'蔡徐坤'});
})

// 注册接口
router.post("/register",(req,res) => {  
  const avatarUrl = "https://cdn.luogu.com.cn/upload/usericon/1.png";
  const userData = {
    user_name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: avatarUrl
  }
  // 检查是否注册过了
  Users.findOne({
    where:{
      email:userData.email
    }
  }).then((user) => {
    if(!user) {
      bcrypt.hash(req.body.password,10,(err,hash) => {
        // 加密后的内容
        userData.password = hash;
        Users.create(userData).then(user => {
          res.json({status: user.email + "注册成功!"})
        }).catch(err => res.send("error: " + err))
      })    
    }else {
      res.json({status: "该邮箱已经注册过了~"});
    }
  }).catch(err => res.send("error: " + err));
})

// 登录接口
router.post("/login",(req,res) => {
  Users.findOne({
    where:{
      email: req.body.email
    }
  }).then(user => {
    if(user) {
    // 查到用户
      if(bcrypt.compareSync(req.body.password,user.password)){
        res.send(user);
        res.send("登录成功");
      }else{
        res.send("--密码错误--");
      }
    }else {
      res.status(400).json({error: "用户不存在"})
    }
  }).catch(err => res.send("error: " + err));
})

module.exports = router;