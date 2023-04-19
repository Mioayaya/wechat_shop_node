const express = require("express");
const router = express.Router();
const Shops = require("../models/shops");

// 查询店铺信息，id、name都可以
router.post("/search",(req,res) => {
  const shopData = {
    shop_id: req.body.id,
    shop_name: req.body.name
  }  

  if(shopData.shop_id) {
    Shops.findOne({ 
      where: {shop_id: shopData.shop_id}
    }).then( shop => {
      if(shop) {
        res.send({
          isSuccess: true,
          shop
        })
      }else {
        res.send({
          isSuccess: false,
          shop,
          meg: '该店铺不存在'
        })
      }
    }).catch(err => res.send({isSuccess: false,err}))
  }else if(shopData.shop_name) {
    Shops.findOne({ 
      where: {shop_name: shopData.shop_name}
    }).then( shop => {
      if(shop) {
        res.send({
          isSuccess: true,
          shop
        })
      }else {
        res.send({
          isSuccess: false,
          shop,
          meg: '该店铺不存在'
        })
      }
    }).catch(err => res.send({isSuccess: false,err}))
  }
})

module.exports = router;