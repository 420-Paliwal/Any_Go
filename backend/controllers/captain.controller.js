const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        // console.log(" token error hai bhai")
        return res.status(400).json({
            error: error.array()
        });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        res.status(400).json({
            message: "Captain Already Exist"
        })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = await captain.generateAuthToken();
    res.status(201).json({token, captain })

}

module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({
            error: error.array()
        });
    }

    const {email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password')

    if(!captain){
        return res.status(401).json({message : 'Invalid email or password'})
    }
    
    const isMatch = await captain.comparePassword(password);
    
    if(!isMatch){
        return res.status(401).json({message : 'Invalid email or password'})
    }

    const token = await captain.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token, captain})

}

module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json({captain: req.captain})
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({token})
    res.status(200).json({ message: 'Logout successfully' })    
}