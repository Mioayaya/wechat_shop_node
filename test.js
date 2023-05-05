const Seq = require('sequelize');
const Op = Seq.Op;

// 根据名字搜索商品信息
router.get("/searchbyname",async (req,res) => {
  try {    
    const { commodityName } = req.query;    
    const commodity = await Commodities.findAll({
      attributes: { exclude: ['id']},
      where: { commodity_name: {
        [Op.like]: `%${commodityName}%`
      } }
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