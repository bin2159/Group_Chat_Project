const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Msg=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    msg:Sequelize.TEXT
})
module.exports=Msg