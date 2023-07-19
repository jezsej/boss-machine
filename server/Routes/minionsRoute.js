const minionsRouter = require('express').Router();
const workRouter = require('./workRoutes');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');



minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);

    if (minion) {
        req.id = minion.id;
        next();
    } else {
        let err = new Error('Minion not found');
        err.status = 404;
        next(err);
    }
});

minionsRouter.use('/:minionId/work', workRouter);


minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);

    if (newMinion) {
        res.status(201).send(newMinion);
    } else {
        let err = new Error('Invalid minion');
        err.status = 400;
        next(err);
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(getFromDatabaseById('minions', req.id));
});

minionsRouter.put('/:minionId', (req, res, next) => {
    console.log(req.body);
    const updatedMinion = updateInstanceInDatabase('minions', req.body);

    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        let err = new Error('Invalid minion');
        err.status = 400;
        next(err);
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {

    const deleted = deleteFromDatabasebyId('minions', req.id);

    if (deleted) {
        res.status(204).send('Minion deleted');
    } else {
        let err = new Error('Invalid minion');
        err.status = 400;
        next(err);
    }
});

minionsRouter.use((err, req, res, next) => {

    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        res.status(500).send(err.message);
    }
});


module.exports = minionsRouter;