const express = require('express');

const {
    getAllActors,
    getActorById,
    createActor,
    updateActor,
    deleteActor 
} = require('../controllers/actors.controller');

const router = express.Router()

//GET http://localhost:5000/api/v1/actors
router.get('/', getAllActors);
//GET http://localhost:5000/api/v1/actors/:id
router.get('/:id', getActorById);
//POST http://localhost:5000/api/v1/actors
router.post('/', createActor);
//PATCH http://localhost:5000/api/v1/actors/:id
router.patch('/:id', updateActor);
//DELETE http://localhost:5000/api/v1/actors
router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };