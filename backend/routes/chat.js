const express=require('express')
const router=express.Router()
const chat=require('../controller/chat')
const userauth=require('../middleware/userauth')
router.get('/users',chat.user)
router.post('/send',userauth.auth,chat.send)
router.get('/msg',chat.msg)
router.get('/lmsg',chat.lmsg)
module.exports=router