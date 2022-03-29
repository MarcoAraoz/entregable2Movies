const express = require('express');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

} = require('../controllers/users.controller');

const router = express.Router()

//GET http://localhost:5000/api/v1/movies
router.get('/', getAllUsers)
//GET http://localhost:5000/api/v1/movies/:id
router.get('/:id', getUserById)
//POST http://localhost:5000/api/v1/movies
router.post('/', createUser)
//PATCH http://localhost:5000/api/v1/movies
router.patch('/:id', updateUser)
//DELETE http://localhost:5000/api/v1/movies
router.delete('/:id', deleteUser)
//Login User http://localhost:5000/api/v1/login
router.post('/login', )

module.exports = { usersRouter: router}