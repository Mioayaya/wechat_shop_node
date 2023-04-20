const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'commodities',
  {
    commodity_id: {
      type: Sequelize.INTEGER,
      primaryKet: true,
      autoIncreament: true,
    },  
    shop_id: {
      type: Sequelize.INTEGER
    },
    cover_img_src: {
      type: Sequelize.STRING
    },
    content_img_src: {
      type: Sequelize.STRING
    },
    details_img_src: {
      type: Sequelize.STRING
    },
    commodity_name: {
      type: Sequelize.STRING
    },
    commodity_price: {
      type: Sequelize.DOUBLE
    },
    pay_person: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  }, {
    define: {
      freezeTableName: true
    }
  }
)