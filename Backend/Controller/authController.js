const catchAsyncError = require('../MiddleWares/catchAsyncError')
const User = require('../Model/userModel')
const sendToken = require('../utils/jwt')

exports.signUp = catchAsyncError(async(req, res, next)=>{
    const { name, email, password } = req.body;

    let avatar;
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/upload/${req.file.originalname}`
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar
    })

    sendToken(user, 201, res)
})

exports.getUser = catchAsyncError(async(req, res, next) =>{
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
})


exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let avatar;
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/upload/${req.file.originalname}`;
    }
    const updateData = { name, email, avatar };
    if (password) {
        const user = await User.findById(req.params.id).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = password;
        await user.save();

        updateData.password = user.password;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
});