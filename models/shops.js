const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'shops',
  {
    shop_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncreament: true
    },
    uid: {
      type: Sequelize.INTEGER,
    },
    shop_name: {
      type: Sequelize.STRING,
    },
    shop_sign: {
      type: Sequelize.STRING,
    },
    shop_fans: {
      type: Sequelize.STRING,
    }
  }, {
    timestamps: false
  }, {
    define: {
      freezeTableName: true
    }
  }
)