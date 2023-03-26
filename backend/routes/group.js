const express=require('express')
const router=express.Router()
const group=require('../controller/group')
const userauth=require('../middleware/userauth')
router.post('/create',userauth.auth,group.create)
router.get('/show',userauth.auth,group.show)
module.exports=router