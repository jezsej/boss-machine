const meetingsRouter = require('express').Router();

const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase } = require('../db');




meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', req.body);

    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        let err = new Error('Invalid meeting');
        err.status = 400;
        next(err);
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');

    if (deleted) {
        res.status(204).send('Meetings deleted');
    } else {
        let err = new Error('Something went wrong');
        err.status = 500;
        next(err);
    }
});

meetingsRouter.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        err.status = 500;
        res.status(err.status).send(err.message);
    }
});

module.exports = meetingsRouter;