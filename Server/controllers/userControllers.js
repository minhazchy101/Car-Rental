import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (userId)=>{
    const payload = userId ;
    return jwt.sign(payload , process.env.JWT_SECRET)
}



export const registerUser = async(req , res)=>{
    try {
       const {name , email , password } = req.body 

       if (!name || !email || !password || password.length < 8) {
        return res.json({success : false , message : "Fill all the fields"})
       }
       const userExists = await User.findOne({email})
       if (userExists) {
        return res.json({success : false , message : "User already exits" })
       }
       const hashedPassword = await bcrypt.hash(password, 10)
       const user = await User.create({name , email , password : hashedPassword})

       const token = generateToken(user._id.toString())

       res.json({success : true , token , message : 200})


    } catch (error) {
        console.log(error)
     return   res.json({success : false , message : error.message})
    }

}

// login USer

export const loginUser = async(req , res)=>{
    try {
        const {email , password} = req.body ;
        const user = await User.findOne({email})
        if (!user) {
             return  res.json({success : false , message : "User Not Found"})
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if (!isMatch) {
             return  res.json({success : false , message : "Invalid Credentials"})
        }
        const token = generateToken(user._id.toString())

       res.json({success : true , token , message : 200})
    } catch (error) {
        console.log(error)
     return   res.json({success : false , message : error.message})
    }
}

// get user Data using token

export const getUserData = async (req, res)=>{
  
    try {
        const {user} = req ;
        res.json({success : true , user})
        
        
    } catch (error) {
       console.log(error)
     return res.json({success : false , message : error.message})
      
    }
}