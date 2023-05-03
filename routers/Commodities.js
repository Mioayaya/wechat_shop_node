const express = require("express");
const router = express.Router();
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

router.get("/test",async (req,res) => {
  try {
    // 商店id
    const { id } = req.query;
    const shop = await Shops.findOne({
      where: {shop_id:id}
    })
        
    const commoditityList = await Commodities.findAll({
      attributes: { exclude: ['id'] },
      where: {shop_id:shop.shop_id}
    })
        
    res.send({commoditityList})
  } catch(e) {
    res.send({err:e})
  }
})

module.exports = router;