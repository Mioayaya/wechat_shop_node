const express = require("express");
const router = express.Router();
const Commodities = require("../models/commodities");

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

module.exports = router;