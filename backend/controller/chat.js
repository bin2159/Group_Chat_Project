const User=require('../model/user')
const Msg=require('../model/msg')
const user=async(req,res,next)=>{
    try{
        let users=await User.findAll()
        res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const send=async(req,res,next)=>{
    try{
        let msg=req.body.data
        let id=req.user.id
        await Msg.create({msg,userId:id})
        res.status(200).json({success:true,message:'Message Send'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
module.exports={user,send}