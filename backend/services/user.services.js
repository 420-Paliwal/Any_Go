const userModel = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if ( !firstname || !email || !password){
        console.log('Creating user...', { firstname, lastname, email, password });
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname:{
            firstname, lastname
        },
        email, password
    });

    return user;
}