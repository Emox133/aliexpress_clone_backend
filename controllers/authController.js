const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/AppError')
const User = require('./../models/UserModel')

exports.signup = catchAsync(async(req, res, next) => {
    const registeredUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })

    res.status(201).json({
        message: 'success',
        registeredUser
    })
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body

    if(!email || !password) {
        return next(new AppError('Molimo vas unesite email i lozinku.', 400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user || !await user.comparePasswords(password, user.password)) {
        return next(new AppError('Netačan e-mail ili lozinka.', 401))
    }

    res.status(201).json({
        message: 'success',
        user
    })
})

exports.protectRoutes = catchAsync(async(req, res, next) => {
    
})