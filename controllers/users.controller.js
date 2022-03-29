// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

const { User } = require('../models/user.model');

const { filterObj } = require('../util/filterObject');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

//dotenv.config({ path: './config.env' });

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Find user given an email and has status active
    const user = await User.findOne({
      where: { email, status: 'active' }
    });
  
    // Compare entered password vs hashed password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, 'Credentials are invalid'));
    }
  
    // Create JWT
    const token = await jwt.sign(
      { id: user.id }, // Token payload
      process.env.JWT_SECRET, // Secret key
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
  
    res.status(200).json({
      status: 'success',
      data: { token }
    });
  });
//Get all users (GET)
exports.getAllUsers = catchAsync( async ( req, res, next) => {
    try {
        const user = await User.findAll();

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
    }
});
//Get user by id (GET)
exports.getUserById = catchAsync(async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}});

        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'No user found with the given ID'
            })
        return
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});
//Create new user (POST)
exports.createUser = catchAsync(async (req, res, next) => {

    const { username, email, password, role } = req.body;
                                    
    //const salt = await bcrypt.genSalt(12);
    //const hashedPassword = await bcrypt.hash(password, salt);
                                    
    const newUser = await User.create({
    username,
    email,
    password, //: hashedPassword,
    role
    });

    //newUser.password = undefined;

    res.status(201).json({
    status: 'success',
    data: { newUser }
    });
});
//Update user (PATCH)
exports.updateUser = catchAsync(async (req, res, next) => {
    
        const { user } = req;

        const data = filterObj(req.body, 'username', 'email');
        const user = await User.findOne({where: { id: id }});

        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'Cant update user, invalid ID'
            })
        return
        }

    await user.update({ ...data })

    res.status(204).json({ status: 'success'});
});
//Delete user (DELETE)
exports.deleteUser = catchAsync(async (req, res, next) => {
        const { user } = req;

        if(!user) {
            res.status(404).json({
                status: 'error',
                message: 'Cant delete user, invalid ID'
            })
        return
        };

    await user.update({status: 'deleted'})

    res.status(204).json({ status: 'success'});
});
