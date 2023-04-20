# 遇到的问题

## 1.使用 Sequelize .findAll时 报 id unknow 
- 数据库未设置 id 字段，默认findAll是添加id，`{ attributes: { exclude: ['id'] } }`去除即可

