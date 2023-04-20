const express = require("express");
const router = express.Router();
const Commodities = require("../models/commodities");

router.get("/home",async (req,res) => {
  
  const commodities = await Commodities.findAll({
    attributes: { exclude: ['id'] }
  });

  for (let i = 0; i < commodities.length; i++) {
    if(commodities[i].content_img_src) {
      commodities[i].content_img_src = commodities[i].content_img_src.split('#');
    }
    if(commodities[i].details_img_src) {
      commodities[i].details_img_src = commodities[i].details_img_src.split('#');
    }
  }

  res.send({commodities})

})

module.exports = router;