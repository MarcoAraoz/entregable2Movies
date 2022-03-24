const { Movie } = require('../models/movie.model');
const { filterObj } = require('../util/filterObject');
const { catchAsync } = require('../util/catchAsync');

//Get all movies (GET)
exports.getAllMovies = catchAsync( async ( req, res, next) => {
    try {
        const movie = await Movie.findAll();

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        })
    } catch (error) {
        console.log(error);
    }
});
//Get movie by id (GET)
exports.getMovieById = catchAsync(async (req, res, next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findOne({where: {id: id}});

        if (!movie) {
            res.status(404).json({
                status: 'error',
                message: 'No movie found with the given ID'
            })
        return
        }

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});
//Create new movie (POST)
exports.createMovie = catchAsync(async (req, res, next) => {
    try {
        const { title, description, duration, genre } = req.body;
        const newMovie = await Movie.create({
            title,
            description,
            duration,
            genre
        })

        res.status(201).json({
            status: 'success',
            data: { newMovie }
        })

    } catch (error) {
        console.log(error);
    }
});
//Update movie (PATCH)
exports.updateMovie = catchAsync(async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = filterObj(req.body, 'title', 'description', 'duration', 'genre' )
        const movie = await Movie.findOne({where: { id: id }});

        if (!movie) {
            res.status(404).json({
                status: 'error',
                message: 'Cant update actor, invalid ID'
            })
        return
        }

        await movie.update({ ...data })

        res.status(204).json({ status: 'success'});

    } catch (error) {
        console.log(error);
    }
});
//Delete movie (DELETE)
exports.deleteMovie = catchAsync(async (req, res, next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findOne({where: { id: id }});

        if(!movie) {
            res.status(404).json({
                status: 'error',
                message: 'Cant delete movie, invalid ID'
            })
        return
        };

        await movie.destroy()

        res.status(204).json({ status: 'success'});

    } catch (error) {
        console.log(error);
    }
})