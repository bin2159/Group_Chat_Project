const express=require('express')
const router=express.Router()
const chat=require('../controller/chat')
router.get('/users',chat.user)
module.exports=router