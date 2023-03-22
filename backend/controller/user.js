const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const generatetoken=(id)=>{
    return jwt.sign({userid:id},'secretKey')
}
const signup = (req,res,next)=>{
try{
    const {name,email,phone,password}=req.body
    bcrypt.hash(password,10,async(err,hash)=>{
        if(err){
            throw new Error(err)
        }
        let user=await User.findOne({where:{email}})
        if(user){
            res.status(207).json({message:'Email Already Exist'})
        }
        else{
            await User.create({name,email,phone,password:hash})
            res.status(200).json({message:'Account Created Successfully'})
        }
    })
}
catch(error){
    res.status(500).json({message:error})
}
}
const login=async(req,res,next)=>{
    try{
        const {email ,password}=req.body
        let user=await User.findOne({where:{email}})
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(err){
                    throw new Error('Something Went Wrong')
                }
                if(response){
                    res.status(200).json({message:'Logged in successfully',token:generatetoken(user.id)})
                }
                else{
                    res.status(203).json({message:'Incorrect Password'})
                }
            })
        }
        else{
            res.status(208).json({message:'Email Not Found'})
        }
    }catch(err){
        res.status(500).json({message:err})
    }
}
const forgot=(req,res,next)=>{

}
module.exports={signup,login}