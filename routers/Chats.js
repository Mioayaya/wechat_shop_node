const express = require("express");
const router = express.Router();
const Seq = require('sequelize');
const Op = Seq.Op;
const Chats = require("../models/chats");

router.post('/send',async (req,res) => {
  try {
    const { youId,uid,chats,youAvatar,uidAvatar } = req.body;
    const Now = new Date();   
    const time =  Now.getTime();
    const chatData = {
      you_id: youId,
      uid,
      chats,
      time,
      you_avatar: youAvatar,
      uid_avatar: uidAvatar
    }
    await Chats.create(chatData)

    res.send({msg:'发送成功',chatData});
    
  } catch {
    res.send({err:'err-- soming was wrong'})
  }
})

router.post('/get',async (req,res) => {
  try {
    const { youId,uid } = req.body;

    const chatListA = await Chats.findAll({
      attributes: { exclude: ['id'] },
      where: {
        [Op.or]: [
          {
            you_id: youId,
            uid: uid
          },
          {
            you_id: uid,
            uid: youId
          }
        ]        
      }
    })
    const chatList = chatListA.sort((a,b) => a.time - b.time);    
    res.send({chatList});
  } catch {
    res.send({err:'err-- soming was wrong'})
  }
})

router.post('/chatList', async (req,res) => {
  try {
    const { uid } = req.body;
    const chatListB = await Chats.findAll({
      attributes: { exclude: ['id'] },
      where: {
        [Op.or]: [
          {
            uid: uid
          },
          {
            you_id: uid,
          }
        ]        
      }
    })

    const chatListA = chatListB.sort((a,b) => b.time - a.time);

    const map = new Map();
    const chatList = []
    for(let i=0;i<chatListA.length;i++) {
      if(!map.has(chatListA[i].uid) && !map.has(chatListA[i].you_id)) {        
        if(chatListA[i].uid === uid) {
          map.set(chatListA[i].you_id,true)                  
        }else if(chatListA[i].you_id === uid) {
          map.set(chatListA[i].uid,true)
        }

        chatList.push(chatListA[i]);
      }
    }
    res.send({chatList})
  }catch {
    res.send({err:'err-- soming was wrong'})
  }
})

module.exports = router;