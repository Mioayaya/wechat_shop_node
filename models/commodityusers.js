const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'commodityusers',
  {
    commodity_users_id: {
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
    shoucang: {
      type: Sequelize.INTEGER,
    }
  }, {
    timestamps: false
  }, {
    define: {
      freezeTableName: true
    }
  }
)