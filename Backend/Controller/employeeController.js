const catchAsyncError = require("../MiddleWares/catchAsyncError");
const Employee = require('../Model/employeeModel')

//create employee
exports.createEmployee = catchAsyncError(async (req, res, next) => {
    const { name, email, phone } = req.body;

    let avatar;
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/upload/${req.file.originalname}`;
    }

    const employee = await Employee.create({
        name,
        email,
        phone,
        avatar
    });

    res.status(200).json({
        success: true,
        employee
    });
});

//get all employees
exports.getAllEmployees = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, avatar } = req.query;

    const queryObject = {};
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (email) {
        queryObject.email = { $regex: email, $options: 'i' };
    }
    if (phone) {
        queryObject.phone = phone;
    }

    const employees = await Employee.find(queryObject);
    res.status(200).json({
        success: true,
        count:employees.length,
        employees
    });
});

//get by id
exports.getEmployeeById = catchAsyncError(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
        success: true,
        employee
    });
});


//delete 
exports.deleteEmployee = catchAsyncError(async(req, res, next) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        employee
    });
})

//update employees details
exports.updateEmployee = catchAsyncError(async(req, res, next) => {
    const { name, email, phone } = req.body;
    let avatar;
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/upload/${req.file.originalname}`;
    }
    const updateData = { name, email, phone, avatar };
    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!employee) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ employee });
})