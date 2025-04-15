const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const captainModel = require('../models/captain.model')
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.authUser = async (req, res, next) => {
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    //  console.log(token)
     if (!token) {
         return res.status(401).json({ message: 'Unauthorized token authMiddleware' })
     }

     const isBlacklisted = await  blacklistTokenModel.findOne({token: token })
     
     if(isBlacklisted){
        return res.status(401).json({ message: 'Already Blacklisted' })
     }

     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const user = await userModel.findById(decoded._id)
        req.user = user
        return next()
     }catch(err){
         return res.status(401).json({ message: 'Unauthorized' })
     }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token authMiddleware' })
    }

    const isBlacklisted = await  blacklistTokenModel.findOne({token: token })
     
    if(isBlacklisted){
       return res.status(401).json({ message: 'Already Blacklisted' })
    }
     

    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET)

       const captain = await captainModel.findById(decoded._id)
       if(!captain) {
           return res.status(401).json({ message: 'Unauthorized' })
       }
       req.captain = captain
       return next()
    }catch{
        return res.status(401).json({ message: 'Unauthorized' })
    }
}