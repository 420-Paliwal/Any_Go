const userModel = require('../models/user.model');
const userService = require('../services/user.services')
const { validationResult } = require('express-validator')


module.exports.registerUser = async (req, res, next) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { fullname, email, password } = req.body
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
