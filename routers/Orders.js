const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");
const Users = require("../models/users");
const Commodities = require("../models/commodities");

// 支付接口
router.post("/create",async (req,res) => {
  const Now = new Date();
  const TIME = Now.getTime();
  try {
    const { uid,commodityId,price,shopId } = req.body;
    const user = await Users.findOne({
      where: uid
    })
    const restMoney = user.money;
    if(restMoney<price) {
      res.send({flag:'faild',msg: '余额不足'});
    } else {
      await Users.update({
        money: restMoney-price
      }, {
        where: {uid}
      })
      const iOrder = {
        commodity_id: commodityId,
        uid,
        state: 1,
        shop_id: shopId,
        time: TIME
      }
      await Orders.create(iOrder);
      res.send({flag:'true',msg: '支付成功'});
    }
  }catch(e) {
    res.send({e})
  }
})

// 查询当前用户的订单
router.get("/find",async (req,res) => {
  try { 
    const { uid } = req.query;
    const result = await getOrderList(uid);    
    res.send({result});
  }catch(err) {
    res.send({err});
  }
})

// 确认已收货
router.post("/shouhuo",async (req,res) => {
  try {
    const { orderID,uid } = req.body;    
    await Orders.update({
      state: 4
    }, {
      where: {order_id: orderID}
    })
    const result = await getOrderList(uid);
    res.send({result});

  } catch {
    res.send({err:'somethin was wrong opps!'})
  }
})

const getOrderList = async (uid) => {
  const orderList = await Orders.findAll({
    attributes: { exclude: ['id'] },
    where: {
      uid,        
    }
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
    const d = itime.getDay();      
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