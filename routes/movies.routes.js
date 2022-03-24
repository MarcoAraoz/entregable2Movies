const express = require('express');

const { 
    getAllMovies, 
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies.controller')

const router = express.Router();

//GET http://localhost:5000/api/v1/movies
router.get('/', getAllMovies)
//GET http://localhost:5000/api/v1/movies/:id
router.get('/:id', getMovieById)
//POST http://localhost:5000/api/v1/movies
router.post('/', createMovie )
//PATCH http://localhost:5000/api/v1/movies
router.patch('/:id', updateMovie)
//DELETE http://localhost:5000/api/v1/movies
router.delete('/:id', deleteMovie)


module.exports = { moviesRouter: router }