const mongoose = require('mongoose')
const validator = require('validator')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    phone:{
        type:Number,
        required:[true, 'Please enter number']
    },
    avatar:{
        type:String
    }
})

module.exports = mongoose.model('employee',employeeSchema)