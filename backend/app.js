const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const Sequelize=require('./util/database')

const user=require('./routes/user')
const chat=require('./routes/chat')

const app=express()

app.use(cors({
    origin:"http://127.0.0.1:5500"
}))
app.use(bodyParser.json({extended:false}))

app.use('/user',user)
app.use('/chat',chat)
Sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT||3000)
})
.catch(err=>{
    console.log(err)
})