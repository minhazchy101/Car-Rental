import User from "../models/User.js"


export const changeRoleToOwner = async(req , res)=>{
    try {
        const {_id} = req.user
        await User.findByIdAndUpdate(_id , {role : "owner"})
    
     res.json({success : true , message : "Now You can List Cars..!"})
        
    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
        
    }
}

// Api

export const addCar = async(req , res)=>{
    try {
        const {_id} = req.user ;
        let car = JSON.parse(req.body.CarData)
        const imageFile = req.file
    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
    }
}