const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'chats',
  {
    chat_id: {
      type: Sequelize.INTEGER,
      primaryKet: true,
      autoIncreament: true,
    },
    you_id: {
      type: Sequelize.INTEGER
    },
    uid: {
      type: Sequelize.INTEGER
    },
    chats: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    },
    you_uid: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  }, {
    define: {
      freezeTableName: true
    }
  }
)