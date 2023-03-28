const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Group=sequelize.define('group',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    adminId:Sequelize.INTEGER
})
module.exports=Group