const express = require("express");
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Commodities = require("../models/commodities");

const BASEURL = '/A_code/z_graduation_dissertation/front/imges/commodities';

// 设置Multer中间件
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const ID = await getNowId();    
    cb(null, `${BASEURL}/c_${ID+1}`); // 指定文件存储的路径
  },
  filename: function (req, file, cb) {
    const HZ = file.originalname.split('.')[1];   
    cb(null, `content_1.${HZ}`); // 保持原始文件名
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  const ID = await getNowId();  
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const tempPath = file.path; // 临时文件路径
  const folderPath = `${BASEURL}/c_${ID+1}`;
  if(!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const targetPath = path.join(folderPath, 'target/', 'content_1'); // 目标文件路径

  // 将临时文件移动到目标路径
  fs.rename(tempPath, targetPath, function (err) {
    res.status(200).json({ message: 'File uploaded successfully' });
  });
});

const getNowId = async () => {
  const commodity = await Commodities.findAll({
    attributes: { exclude: ['id']},
    order: [
      ['commodity_id','DESC']
    ],
    limit: 1
  })
  const { commodity_id } = commodity[0];
  return commodity_id;
}


module.exports = router;