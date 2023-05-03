const express = require("express");
const router = express.Router();
const Historys = require("../models/historys");

router.post("/browse",async (req,res) => {
  const Now = new Date();
  const time = `${Now.getFullYear()}-${Now.getMonth()+1}-${Now.getDate()} ${Now.getHours()}:${Now.getMinutes()}:${Now.getSeconds()}`;
  const { uid,commodityId } = req.body;
  try {
    const history =  await Historys.findOne({      
      where: {
        uid,
        commodity_id: commodityId
      }
    })
    // 如果已经浏览过店铺
    if(history) {
      await Historys.update({
        time
      }, {
        attributes: { exclude: ['id'] },
        where: {
          h_id: history.h_id
        }
      })
    } else {
      // 如果没有浏览过
      const iHistory = {
        uid,
        commodity_id: commodityId,
        time
      }
      console.log(iHistory);
      await Historys.create(iHistory)
    }

    res.send({history,msg:'success'});    
  } catch(e) {
    res.send({err:e})
  }
})


module.exports = router;