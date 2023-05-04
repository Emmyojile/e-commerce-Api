const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');

//GET All USERS
exports.allUsers = async (req,res) => {
    try {
        const users = await User.find({})
        if(!users) {
            return res.status(StatusCodes.NOT_FOUND).json({msg:"There are no users in our database"})
        }

        return res.status(StatusCodes.OK).json({Total_users:users.length,users})
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}

//GOT SINGLE USER WITH USERNAME
exports.getSingleUser = async (req, res) => {
    try {
        const {username: username} = req.params

        const user = await User.findOne({username: username})

        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({msg:`${username} does not exist`})
        }

        return res.status(StatusCodes.OK).json({user})
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}  

//UPDATE USER 
exports.updateUser = async (req, res) => {
    try {
        const {id : _id} = req.params

        if(!_id){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:'Provide a valid id'})
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new : true})

        return res.status(StatusCodes.OK).json({updatedUser})
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.InternalServerError).json({msg:error.message})
    }
}

//DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(StatusCodes.OK).json({msg:'User deleted successfully'})
        
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}

//GET USER STATS
exports.userStats = async (req, res) => {
    try {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1} 
                }
            }
        ])

        return res.status(StatusCodes.OK).json({data});        
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}