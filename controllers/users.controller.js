const { User } = require('../models/user.model');
const { filterObj } = require('../util/filterObject');
const { catchAsync } = require('../util/catchAsync');

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
    try {
        const { username, email } = req.body;
        const newUser = await User.create({
            username,
            email
        })

        res.status(201).json({
            status: 'success',
            data: { newUser }
        })

    } catch (error) {
        console.log(error);
    }
});
//Update user (PATCH)
exports.updateUser = catchAsync(async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = filterObj(req.body, 'username', 'email')
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

    } catch (error) {
        console.log(error);
    }
});
//Delete user (DELETE)
exports.deleteUser = catchAsync(async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: { id: id }});

        if(!user) {
            res.status(404).json({
                status: 'error',
                message: 'Cant delete user, invalid ID'
            })
        return
        };

        await user.destroy()

        res.status(204).json({ status: 'success'});

    } catch (error) {
        console.log(error);
    }
})