const express = require("express");
const router = express.Router();
const Seq = require('sequelize');
const Op = Seq.Op;
const Commodities = require("../models/commodities");
const Shops = require("../models/shops");

router.get("/home",async (req,res) => {

  const commodities = await Commodities.findAll({
    attributes: { exclude: ['id'] }
  });

  const commoditiesL = [];
  const commoditiesR = [];

  for (let i = 0; i < commodities.length; i++) {
    if(commodities[i].content_img_src) {
      commodities[i].content_img_src = commodities[i].content_img_src.split('#');
    }
    if(commodities[i].details_img_src) {
      commodities[i].details_img_src = commodities[i].details_img_src.split('#');
    }

    i%2===0?commoditiesL.push(commodities[i]):commoditiesR.push(commodities[i]);
  }

  res.send({commoditiesL,commoditiesR})

})

// 根据id搜索商品信息
router.get("/search",async (req,res) => {
  try {    
    const { commodityid } = req.query;    
    const commodity = await Commodities.findOne({
      attributes: { exclude: ['id']},
      where: { commodity_id: commodityid }
    })    
    if(commodity.content_img_src) {
      commodity.content_img_src = commodity.content_img_src.split('#');
    }
    if(commodity.details_img_src) {
      commodity.details_img_src = commodity.details_img_src.split('#');
    }    
    res.send({msg:'sucess',commodity});
  } catch(e) {
    res.send({e})
  }
})

// 根据名字搜索商品信息
router.get("/searchbyname",async (req,res) => {
  try {    
    const { commodityName } = req.query;    
    const commodities = await Commodities.findAll({
      attributes: { exclude: ['id']},
      where: { commodity_name: {
        [Op.like]: `%${commodityName}%`
      } }
    })  
    
    for (let i = 0; i < commodities.length; i++) {
      if(commodities[i].content_img_src) {
        commodities[i].content_img_src = commodities[i].content_img_src.split('#');
      }
      if(commodities[i].details_img_src) {
        commodities[i].details_img_src = commodities[i].details_img_src.split('#');
      }      
    }
    
    res.send({msg:'sucess',commodities});
  } catch(e) {
    res.send({e})
  }
})

module.exports = router;