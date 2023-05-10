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
          res.send({isSuccess: true,msg: '注册成功!'});
        }).catch(err => res.send({isSuccess: false,msg: '注册失败',err}))
      })    
    }else {
      res.send({isSuccess: false,msg: '该邮箱已经注册过了~'});      
    }
  }).catch(err => res.send({isSuccess: false,msg: '注册失败',err}));
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
        res.send({isSuccess: true,userData:user,msg:'登录成功'});
      }else{
        res.send({isSuccess: false,msg:'密码错误'});
      }
    }else {
      res.send({isSuccess: false,msg:'用户不存在'});      
    }
  }).catch(err => res.send("error: " + err));
})

// 返回用户信息接口
router.get("/infor",(req,res) => {  
  const { uid } = req.query;
  Users.findOne({
    where: {uid}
  }).then((user) => {
    if(user) {
      const userData = user;
      delete userData.dataValues.password;      
      res.send({userData});
    }else {
      res.send({userData:null,err:'用户不存在'});
    }
  }).catch(err => res.send({err}));
})

// recharge
router.post("/recharge",async (req,res) => {
  try {
    const { uid,money } = req.body;
    const user = await Users.findOne({
      where: {uid}
    })
    await Users.update({
      money: user.money + money,
    }, { 
      where: { uid }
    })
    res.send({msg:'充值成功'})
  } catch(err) {
    res.send({msg:'充值失败'},err)
  }
})

// 返回所有用户信息
router.get("/getall",async (req,res) => {
  try {
    const userList = await Users.findAll({
      attributes: { exclude: ['id']},
    })
    res.send({userList});
  }catch {
    res.send({err:'error someting was wrong T_T'})
  }
})

router.get("/search",async (req,res) => {
  try {
    const { uid } = req.query;
    const userData = await Users.findOne({
      where: {uid}
    })
    res.send({userData});
  } catch {
    res.send({err:'error someting was wrong T_T'});
  }
})

module.exports = router;