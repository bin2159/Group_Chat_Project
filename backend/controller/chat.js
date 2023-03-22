const User=require('../model/user')
const user=async(req,res,next)=>{
    try{
        let users=await User.findAll()
        res.status(200).json(users)
    }
    catch(error){
        console.log(error)
    }
}
module.exports={user}