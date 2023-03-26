const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User_Group = sequelize.define("usergroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey: true,
    allowNull: false,
  },
});
module.exports = User_Group;
