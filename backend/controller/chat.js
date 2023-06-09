const User=require('../model/user')
const Msg=require('../model/msg')
const {Op}=require('sequelize')
const S3service=require('../service/awss3')
const user=async(req,res,next)=>{
    try{
        let userId=req.user.id
        let users=await User.findAll({
            where:{id:{[Op.not]:userId}}
        })
        res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const send=async(req,res,next)=>{
    try{
        let msg=req.body.data.msg
        let id=req.user.id
        let groupid=req.body.data.groupid
        if(groupid==0){
            groupid=null
        }
        await Msg.create({msg,userId:id,groupId:groupid})
        res.status(200).json({success:true,message:'Message Send'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const msg=async(req,res,next)=>{
    try{
        let groupid=req.query.groupid
        if(groupid==0){
            groupid=null
        }
        let msg1=await Msg.findAll({
            limit:1,
            order:[['id','DESC']],
            where:{groupId:{[Op.eq]:groupid}}
        })
        let id
        if(msg1==[]){
            id=msg1[msg1.length-1].id-20
        }
        else{
            id=-1
        }
        
        let msgs=await Msg.findAll({
            attributes:['id','msg'],
            where:{id:{[Op.gt]:id},groupId:{[Op.eq]:groupid}},
            include:{model:User,attributes:['name']}

        })
        res.status(200).json(msgs)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}

const lastmsgs=async(req,res,next)=>{
    try{
        let groupid=req.query.groupid
        if(groupid==0){
            groupid=null
        }
        const msgid=req.query.msgid
        let msg=await Msg.findAll({
            attributes:['id','msg'],
            where:{id:{[Op.gt]:msgid},groupId:groupid},
            include:{model:User,attributes:['name']}
        })
        res.status(200).json(msg)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const suser=async(req,res,next)=>{
    let data=req.query.data
    let user=await User.findAll({
        where:{[Op.or]:[{
            name:{[Op.iLike]: '%'+data+'%'}
        }]}
    })
    res.status(200).json(user)
}
const upload=async(req,res,next)=>{
    try{
        let userId=req.user.id
        let groupid=req.query.gpid
        if(groupid==0){
            groupid=null
        }
        const file =req.files.file
        const filename=`${userId}/${new Date()}${file.name}`
        const fileUrl=await S3service.uploadToS3(file,filename)
        await Msg.create({msg:fileUrl,userId:userId,groupId:groupid})
        res.status(200).json({success:true,message:'Message Send'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const user1=async(req,res,next)=>{
    try{
        let data=req.query.data
        let userId=req.user.id
        let users=await User.findAll({
            where:{id:{[Op.not]:userId},name:{[Op.like]: `%${data}%`}}
        })
        res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
module.exports={user,send,msg,lastmsgs,suser,upload,user1}
// ,
//             email:{[Op.ilike]:'%'+data+'%'},
//             phone:{[Op.ilike]:'%'+data+'%'}