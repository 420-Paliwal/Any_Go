const userModel = require('../models/user.model');
const userService = require('../services/user.services')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    
        if (isUserAlreadyExist) {
           return res.status(400).json({
                message: "User Already Exist"
            })
        }

    const hashedpassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email, 
        password: hashedpassword
     })

     const jwttoken = await user.generateAuthToken();

     res.status(201).json({jwttoken, user})

}

module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password')
    if(!user){
        return res.status(401).json({message : 'Invalid email or password'})
    }

    const isMartch = await user.comparePassword(password)

    if(!isMartch){
        return res.status(401).json({message : 'Invalid email or password'})
    }
    const jwttoken = await user.generateAuthToken()

    res.cookie('token', jwttoken)
    res.status(200).json({jwttoken, user})
}

module.exports.getUserProfile = async(req,res,next) => {
    return res.status(200).json({user: req.user})
}

module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1] 
  res.clearCookie('token')
 await blacklistTokenModel.create({token})
 res.status(200).json({message : 'Logout successfully'})
}
