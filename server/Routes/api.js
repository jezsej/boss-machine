const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRoute');
const ideasRouter = require('./ideasRoute');
const meetingsRouter = require('./meetingsRoute');



apiRouter.use('/minions', minionsRouter);

apiRouter.use('/ideas', ideasRouter);

apiRouter.use('/meetings', meetingsRouter);



module.exports = apiRouter;