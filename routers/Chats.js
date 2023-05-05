const express = require("express");
const router = express.Router();
const Chats = require("../models/chats")

router.post('/send',async (req,res) => {
  try {
    const { youId,uid,chats } = req.body;
    const Now = new Date();
    await Chats.create({
      you_id: youId,
      uid,
      chats,
      time: Now.getTime(),
      you_uid: `${youId}${uid}`
    })
    res.send({msg:'发送成功'});
  } catch {
    res.send({err:'err-- soming was wrong'})
  }
})

router.post('/get',async (req,res) => {
  try {
    const { youId,uid } = req.body;
    const youUid = `${youId}${uid}`;
    const chatListA = await Chats.findAll({
      attributes: { exclude: ['id'] },
      where: { you_uid: youUid}
    })
    const chatList = chatListA.sort((a,b) => a.time - b.time);
    res.send({chatList});
  } catch {
    res.send({err:'err-- soming was wrong'})
  }
})

module.exports = router;