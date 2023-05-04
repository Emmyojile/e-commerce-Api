const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')


exports.register = async (req,res) => {
    try {
        const { username, email, password} = req.body

        if (!(username && email && password)){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Provide all the required parameters'})
        }

        const user = await User.findOne({$or: [{email}, {username}]})
        if (user) {
            if (user.email === email) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: `${email} already exists`})
            } else if (user.username === username) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: `This Username ${username} is already taken`})
            }
        }

        const newUser = await User.create({...req.body})
        return res.status(StatusCodes.CREATED).json({newUser})
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

exports.login = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide the valid information'})
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Email does not exist"})
        }

        const suppliedPassword = await user.comparePassword(password)
        if(!suppliedPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Incorrect password'})
        }
        const accessToken = user.createJWT()

        return res.status(StatusCodes.OK).json({user, accessToken})
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}