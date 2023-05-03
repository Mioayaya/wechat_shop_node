const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'historys',
  {
    history_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncreament: true
    },
    uid: {
      type: Sequelize.INTEGER,
    },
    commodity_id: {
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