const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const Sequelize=require('./util/database')

const user=require('./routes/user')
const chat=require('./routes/chat')
const User=require('./model/user')
const Msg=require('./model/msg')

const app=express()

app.use(cors({
    origin:"http://127.0.0.1:5500"
}))
app.use(bodyParser.json({extended:false}))

app.use('/user',user)
app.use('/chat',chat)

User.hasMany(Msg)
Msg.belongsTo(User)

Sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT||3000)
})
.catch(err=>{
    console.log(err)
})