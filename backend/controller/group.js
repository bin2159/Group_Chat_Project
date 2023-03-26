const Group=require('../model/group')
const User=require('../model/user')
const User_Group=require('../model/usergroup')
const {Op}=require('sequelize')
const create=async(req,res,next)=>{
    try{
        let email=req.body.email
        email.push(req.user.email)
        let grpname=req.body.name
        let users= await User.findAll({
            where:{email:{
                [Op.in]:email
            }}
        })
        let grp=await Group.create({
            name:grpname,
        })
        for(let i=0;i<users.length;i++){
        let usergroup=await User_Group.create({
            userId:users[i].id,
            groupId:grp.id,
        })
        }
        res.status(200).json({success:true})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
 
}
const show=async (req,res,next)=>{
    try{

        let userid=req.user.id
        let usergroup=await User_Group.findAll({
            attributes:['groupId'],
            where:{userId:userid}
        })
        let usergrp=[]
        for(let i=0;i<usergroup.length;i++){
            usergrp.push(usergroup[i].groupId)
        }


        let group=await Group.findAll({
            attributes:['id','name'],
            where:{id:{[Op.in]:usergrp}}
                    })

        res.status(200).json(group)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
module.exports={create,show}