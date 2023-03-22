const jwt=require('jsonwebtoken')
const User=require('../model/user')
const auth= async (req,res,next)=>{
    try{
        let token=req.header('Authorization')
        let userId=jwt.verify(token,'secretKey')
        let user=await User.findOne({where:{id:userId.userid}})
        req.user=user
        next()
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false})
    }
}
module.exports={auth}
