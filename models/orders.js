const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'orders',
  {
    order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncreament: true
    },
    commodity_id: {
      type: Sequelize.INTEGER,
    },
    uid: {
      type: Sequelize.INTEGER,
    },
    shop_id: {
      type: Sequelize.INTEGER,
    },
    state: {
      type: Sequelize.INTEGER,
    },
    time: {
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