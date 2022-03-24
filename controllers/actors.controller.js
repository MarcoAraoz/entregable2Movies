const { Actor } = require('../models/actor.model');
const { filterObj } = require('../util/filterObject');
const { catchAsync } = require('../util/catchAsync');

//Get all users (GET)
exports.getAllUsers = catchAsync( async (req, res, next) => {
    try {
        const actor = await Actor.findAll();

        res.status(200).json({
            status: 'success',
            data: {
                actor
            }
        })

    } catch (error) {
        console.log(error);
    }
});
//Get actor by id (GET)
exports.getActorById = catchAsync( async (req, res, next) => {
    try {
        const { id } = req.params;
        const actor = await Actor.findOne({where: { id: id }});

        if (!actor) {
            res.status(404).json({
                status: 'error',
                message: 'No actor found with the given ID'
            });
        return
        };

        res.status(200).json({
            status: 'success',
            data: {
                actor
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});
//Create new actor (POST)
exports.createActor = catchAsync( async (req, res, next) => {
    try {
        const { name, country, age } = req.body;
        const newActor = await Actor.create({
            name,
            country,
            age
        });

        res.status(201).json({
            status: 'success',
            data: { newActor }
        })
    
    } catch (error) {
        console.log(error);
    }
});
//Update actor (PATCH)
exports.updateActor = catchAsync( async (req, res, next) => {
    try {
        const {id} = req.params;

        const data = filterObj(req.body, 'name', 'country', 'age' );
        const actor = await Actor.findOne({where: { id: id }});

        if (!actor) {
            res.status(404).json({
                status: 'error',
                message: 'Cant update actor, invalid ID'
            })
        return
        }

        await actor.update({ ...data });

        res.status(204).json({ status: 'success'});
        
    } catch (error) {
        console.log(error);
    }
});
//Delete actor (DELETE)
exports.deleteActor = catchAsync( async (req, res, next) => {
    try {
       const {id}  = req.params;
       const actor = await Actor.findOne({where: {id: id}});

       if (!actor) {
           res.status(404).json({
               status: 'error',
               message: 'Cant delete actor, invalid ID'
           })
        return
       };

       await actor.destroy();

       res.status(204).json({ status: 'success'});

    } catch (error) {
        console.log(error);
    }
});