
import imagekit from "../config/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js"
import fs from 'fs';


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
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file;

        // upload Image to Imagekit
        const fileBuffer = fs.readFileSync(imageFile.path) ;
         const response = await imagekit.upload({
            file : fileBuffer ,
            fileName :imageFile.originalname,
            folder : '/cars'
        })

        // optimizing through imagekit URL transformation 

        var optimizedImageUrl = imagekit.url({
            path : response.filePath ,
            transformation : [
                {width : '1280'},
                {quality : 'auto'},
                {format : 'webp'}
            ]
        })
        const image = optimizedImageUrl ;

        await Car.create({...car , owner: _id , image})

        res.json({success : true , message : "Car added"})
        


    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
    }
}

// API to list Owner Cars 

export const getOwnerCars = async(req , res)=>{
    try {
         const {_id} = req.user ;
         const cars = await Car.find({owner : _id})
         res.json({success : true , cars})


    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
    }
}

// API to toggle Car Available 

export const toggleCarAvailability = async(req , res)=>{
     try {
         const {_id} = req.user ;
         const {carID} = req.body ;
         const car = await Car.findById(carID)

        // checking is car belongs to the use
        if (car.owner.toString() !== _id.toString()) {
             return res.json({success : false , message : "UnAuthorized"})
        }
        car.isAvailable = !car.isAvailable ;
        await car.save()

         res.json({success : true , message : "Available toggle"})


    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
    }
}

// Delete Car

export const deleteCar = async(req , res)=>{
     try {
         const {_id} = req.user ;
         const {carID} = req.body ;
         const car = await Car.findById(carID)

        // checking is car belongs to the use
        if (car.owner.toString() !== _id.toString()) {
             return res.json({success : false , message : "UnAuthorized"})
        }
         car.owner = null ;
        car.isAvailable = false ;
        await car.save()

         res.json({success : true , message : "Car Remove"})


    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
    }
}

// API to get Dashboard Data 

export const getDashBoard = async (req , res)=>{
    try {
        const { _id , role } = req.user ;

        if (role != 'owner') {
            return res.json({success : false , message : "UnAuthorized"}) 
        }

        const cars = await Car.find({owner : _id})
        const bookings = await Booking.find({owner : _id }).populate('car').sort({createdAd : -1}) ;

        const pendingBookings = await Booking.find({owner : _id ,status : "pending"})
        const completedBookings = await Booking.find({owner : _id ,status : "confirmed"})

        // Calculate monthlyRevenue From booking where status is confirmed 

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

        const dashboardData = {
            totalCars : cars.length ,
            totalBookings : bookings.length,
            pendingBookings : pendingBookings.length,
            completedBookings : completedBookings.length,
            recentBookings : bookings.slice(0, 3),
            monthlyRevenue
        }

        res.json({success : true , dashboardData})

    } catch (error) {
        console.log(error)
     return res.json({success : false , message : error.message})
    }
}


// API to Update user image 

export const updateUserImage = async(req, res)=>{
    try {
         const {_id} = req.user ;

        const imageFile = req.file;

        // upload Image to Imagekit

        const fileBuffer = fs.readFileSync(imageFile.path) ;
         const response = await imagekit.upload({
            file : fileBuffer ,
            fileName :imageFile.originalname,
            folder : '/users'
        })

        // optimizing through imagekit URL transformation 

        var optimizedImageUrl = imagekit.url({
            path : response.filePath ,
            transformation : [
                {width : '400'},
                {quality : 'auto'},
                {format : 'webp'}
            ]
        })
        const image = optimizedImageUrl ;
        await User.findByIdAndUpdate(_id , {image})
        res.json({success : true , message : "Image Updated"})
    } catch (error) {
         console.log(error)
     return res.json({success : false , message : error.message})
    }
}