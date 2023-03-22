const express=require('express')
const router=express.Router()
const user=require('../controller/user')
router.post('/signup',user.signup)
router.post('/login',user.login)
// router.post('/forgot',user.forgot)
module.exports=router