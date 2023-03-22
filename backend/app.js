const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const Sequelize=require('./util/database')

const user=require('./routes/user')

const app=express()

app.use(cors())
app.use(bodyParser.json({extended:false}))

app.use('/user',user)
Sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT||3000)
})
.catch(err=>{
    console.log(err)
})