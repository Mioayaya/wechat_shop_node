const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'chats',
  {
    chat_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncreament: true,
    },
    you_id: {
      type: Sequelize.INTEGER
    },
    you_avatar: {
      type: Sequelize.STRING
    },
    uid: {
      type: Sequelize.INTEGER
    },
    uid_avatar: {
      type: Sequelize.STRING
    },
    chats: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,    
  }, {
    define: {
      freezeTableName: true
    }
  }
)