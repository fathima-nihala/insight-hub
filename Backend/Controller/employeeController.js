const catchAsyncError = require("../MiddleWares/catchAsyncError");
const Employee = require('../Model/employeeModel')

exports.createEmployee = catchAsyncError(async(req, res, next)=>{
    const {name, email, phone, avatar} = req.body;
    const user = await Employee.create({
        
    })
})