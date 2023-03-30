const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const Sequelize=require('./util/database')

const user=require('./routes/user')
const chat=require('./routes/chat')
const group=require('./routes/group')
const User=require('./model/user')
const Msg=require('./model/msg')
const Group = require('./model/group')
const User_Group=require('./model/usergroup')

const app=express()

app.use(cors({
    origin:"http://127.0.0.1:5501"
}))
app.use(bodyParser.json({extended:false}))

app.use('/user',user)
app.use('/chat',chat)
app.use('/group',group)

User.hasMany(Msg)
Msg.belongsTo(User)
User.belongsToMany(Group,{through:User_Group})
Group.belongsToMany(User,{through:User_Group})
Group.hasMany(Msg)
Msg.belongsTo(Group)

Sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT||3000)
})
.catch(err=>{
    console.log(err)
})