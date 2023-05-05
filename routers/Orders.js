const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");
const Users = require("../models/users");

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

module.exports = router;