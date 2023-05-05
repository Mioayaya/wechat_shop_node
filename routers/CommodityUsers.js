const express = require("express");
const router = express.Router();
const CommodityUsers = require("../models/commodityusers");

// 查询是否有shoucang
router.post('/has',async (req,res) => {
  try {
    const { uid,commodityId } = req.body;
    const infor = await CommodityUsers.findOne({
      where: {
        uid,
        commodity_id: commodityId
      }
    })
    if(infor) {
      // 如果有
      res.send({shoucang: infor.shoucang})
    } else {
      await CommodityUsers.create({
        uid,
        commodity_id: commodityId,
        shoucang: 0
      })
      res.send({shoucang: 0})
    }
  } catch(err) {
    res.send({err})
  }
})

// 收藏点击
router.post('/shoucang',async (req,res) => {
  try {
    const { uid,commodityId,shoucang } = req.body;
    await CommodityUsers.update({
      shoucang
    }, {
      where: {
        uid,
        commodity_id: commodityId
      }
    })
    if(shoucang) {
      res.send({msg:'收藏成功'});
    }else {
      res.send({msg:'取消收藏'});
    }
  } catch(err) {
    res.send(err);
  }
})
module.exports = router;