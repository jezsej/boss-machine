const workRouter = require('express').Router({ mergeParams: true });
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');


workRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);

    if (work) {

        if (work.minionId !== req.id) {
            let err = new Error('Minion referenced does not exist');
            err.status = 400;
            next(err);
        }

        req.workid = work.id;
        next();
    } else {
        let err = new Error('Work not found');
        err.status = 404;
        next(err);
    }
});


workRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('work').filter(work => work.minionId === req.id))
});

workRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);

    if (newWork) {
        res.status(201).send(newWork);
    } else {
        let err = new Error('Invalid work');
        err.status = 400;
        next(err);
    }
});

workRouter.delete('/:workId', (req, res, next) => {

    const deleted = deleteFromDatabasebyId('work', req.workid);

    if (deleted) {
        res.status(204).send('Work deleted');
    } else {
        let err = new Error('Something went wrong');
        err.status = 500;
        next(err);
    }
});

workRouter.put('/:workId', (req, res, next) => {

    const updatedWork = updateInstanceInDatabase('work', req.body);

    if (updatedWork) {
        res.send(updatedWork);
    } else {
        let err = new Error('Invalid work');
        err.status = 400;
        next(err);
    }
});

workRouter.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        err.status = 500;
        res.status(err.status).send(err.message);
    }
});

module.exports = workRouter;