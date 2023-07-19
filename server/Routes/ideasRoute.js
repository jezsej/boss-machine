const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('../middleware/checkMillionDollarIdea');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');



ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);

    if (idea) {
        req.id = idea.id;
        next();
    } else {
        let err = new Error('Idea not found');
        err.status = 404;
        next(err);
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});


ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);

    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        let err = new Error('Invalid idea');
        err.status = 400;
        next(err);
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(getFromDatabaseById('ideas', req.id));
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);

    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        let err = new Error('Invalid idea');
        err.status = 400;
        next(err);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.id);

    if (deleted) {
        res.status(204).send('Idea deleted');
    } else {
        let err = new Error('Invalid idea');
        err.status = 400;
        next(err);
    }
});

ideasRouter.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        err.status = 500;
        res.status(err.status).send(err.message);
    }
});






module.exports = ideasRouter;