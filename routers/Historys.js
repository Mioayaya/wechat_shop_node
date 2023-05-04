const express = require("express");
const router = express.Router();
const Historys = require("../models/historys");
const Commodiyies = require("../models/commodities");

router.post("/browse",async (req,res) => {
  const Now = new Date();  
  const time = Now.getTime();
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
        where: {
          history_id: history.history_id
        }
      })
    } else {
      // 如果没有浏览过
      const iHistory = {
        uid,
        commodity_id: commodityId,
        time
      }      
      await Historys.create(iHistory)
    }

    res.send({history,msg:'success'});    
  } catch(e) {
    res.send({err:e})
  }
})

router.get("/getall",async (req,res) => {
  try {
    const { uid } = req.query;
    const historys = await Historys.findAll({
      attributes: { exclude: ['id']},
      where: { uid }
    })
    let historyList = historys.sort((a,b) => b.time - a.time);
    const time = new Date();
    // 对时间格式化
    for(let i=0;i<historyList.length;i++) {
      const itime = new Date(Number(historyList[i].time));
      const y = itime.getFullYear();
      const m = itime.getMonth()+1;
      const d = itime.getDay();
      /*******************************/
      let h = itime.getHours();
      let min = itime.getMinutes();
      let s = itime.getSeconds();
      h = h>10?h:`0${h}`;
      min = min>10?min:`0${min}`;
      s = s>10?s:`0${s}`;
      const lastTime = `${h}:${min}:${s}`;
      /******************************/
      if(time-itime<1000*60*60*24) {
        historyList[i].time = `今天 ${lastTime}`;
      }else if(time-itime<1000*60*60*48) {
        historyList[i].time = `昨天 ${lastTime}`;
      }else {
        historyList[i].time = `${y}-${m}-${d} ${lastTime}`;
      }      
      const { cover_img_src,commodity_name,commodity_price } = await Commodiyies.findOne({
        attributes: { exclude: ['id']},
        where: {commodity_id: historyList[i].commodity_id}
      })
      historyList[i] = {
        ...historyList[i].dataValues,
        cover_img_src,
        commodity_name,
        commodity_price
      }            
    }
    res.send({msg:'success',historyList});
  } catch(err) {
    res.send({err});
  }

})


module.exports = router;