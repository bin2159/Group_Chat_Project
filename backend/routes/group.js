const express=require('express')
const router=express.Router()
const group=require('../controller/group')
const userauth=require('../middleware/userauth')
router.post('/create',userauth.auth,group.create)
router.get('/show',userauth.auth,group.show)
router.patch('/edit/:id',userauth.auth,group.edit)
router.get('/users/:id',userauth.auth,group.users)
router.get('/users1/',userauth.auth,group.users1)
router.get('/nusers/:id',userauth.auth,group.nusers)
router.get('/nusers1/',userauth.auth,group.nusers1)
router.get('/editU',userauth.auth,group.addU)
router.get('/delete',userauth.auth,group.deleteg)
router.get('/remove',userauth.auth,group.remove)
module.exports=router