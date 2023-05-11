const express = require("express");
const router = express.Router();
const Shops = require("../models/shops");
const Commodities = require("../models/commodities");
const Orders = require("../models/orders");

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

// 根据店铺id返回所有商品
router.get("/getcommodities",async (req,res) => {
  try {
    const { shopId } = req.query;
    const shopData = await Shops.findOne({
      where: {shop_id: shopId}
    })
    const commodities = await Commodities.findAll({
      attributes: { exclude: ['id']},
      where: { shop_id: shopId}
    })
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

  res.send({commoditiesL,commoditiesR,shopData});  
  } catch (err) {
    console.log({err});
  }
})

// 返回本店铺的所有订单
router.post("/orders",async (req,res) => {
  try {
    const { shopId } = req.body;
    const result = await getOrderList(shopId);
    res.send({orderList:result});
  } catch(e) {
    res.send({err:'someting was wrong!'});
  }
})

router.post("/fahuo",async (req,res) => {
  try {
    const { orderID,shopId } = req.body;
    await Orders.update({
      state: 2
    },{
      where: {order_id: orderID}
    })
    const result = await getOrderList(shopId);
    res.send({orderList:result});
  } catch {
    res.send({err:'something was wrong ~'});
  }
})

const getOrderList = async (shopId) => {
  const orderList = await Orders.findAll({
    attributes: { exclude: ['id']},
    where: { shop_id: shopId},
    order: [
      ['time','DESC']
    ]
  })

  const result = [];
  for(let i=0;i<orderList.length;i++) {
    const commodity = await Commodities.findOne({
      attributes: { exclude: ['id']},
      where: {
        commodity_id: orderList[i].commodity_id
      }
    })
    const itime = new Date(Number(orderList[i].time));
    const y = itime.getFullYear();
    const m = itime.getMonth()+1;
    const d = itime.getDate();      
    let h = itime.getHours();
    let min = itime.getMinutes();
    let s = itime.getSeconds();
    const lastTime = `${h}:${min}:${s}`;
    const time = `${y}-${m}-${d} ${lastTime}`;
    let state = '未完成';
    const STATE = ['待付款','待发货','待收货','待评价','已完成'];
    switch(orderList[i].state) {
      case 0: state = STATE[0];break;
      case 1: state = STATE[1];break;
      case 2: state = STATE[2];break;
      case 3: state = STATE[3];break;
      case 4: state = STATE[4];break;
    }
    const data = {
      ...orderList[i].dataValues,
      ...commodity.dataValues,
      time,
      state
    }
    result.push(data);    
  }
  return result;
}

module.exports = router;