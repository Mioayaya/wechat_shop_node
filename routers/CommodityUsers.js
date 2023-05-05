const express = require("express");
const router = express.Router();
const CommodityUsers = require("../models/commodityusers");
const Commodities = require("../models/commodities");

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
      const Now = new Date();  
      const time = Now.getTime();
      await CommodityUsers.create({
        uid,
        commodity_id: commodityId,
        shoucang: 0,
        time
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
    const Now = new Date();  
    const time = Now.getTime();
    const { uid,commodityId,shoucang } = req.body;
    await CommodityUsers.update({
      shoucang,
      time
    }, {
      where: {
        uid,
        commodity_id: commodityId,        
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

// 获取收藏列表
router.get('/getcollect',async (req,res) => {
  try {
    const { uid } = req.query;
    const collectList = [];
    const collectIdListA = await CommodityUsers.findAll({ 
      attributes: { exclude: ['id'] },
      where: {
        uid,
        shoucang: 1
      }
    })

    const collectIdList = collectIdListA.sort((a,b) => b.time - a.time);

    for(let i=0;i<collectIdList.length;i++) {
      const commodity = await Commodities.findOne({
        attributes: { exclude: ['id'] },
        where: {
          commodity_id: collectIdList[i].commodity_id
        }
      })
      collectList.push(commodity);
    }

    res.send({collectIdList,collectList});
  }catch(err) {
    res.send({err});
  }
})
module.exports = router;