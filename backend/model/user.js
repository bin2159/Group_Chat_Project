const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:Sequelize.STRING,
    phone:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING
    })
module.exports=User