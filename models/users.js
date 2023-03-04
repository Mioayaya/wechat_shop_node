const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'users',
  {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncreament: true
    },
    user_name: {
      type: Sequelize.STRING
    },
    user_sign: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    follows: {
      type: Sequelize.INTEGER
    },
    follow_shops: {
      type: Sequelize.INTEGER
    },
    fans: {
      type: Sequelize.INTEGER
    },
    shop_id: {
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
