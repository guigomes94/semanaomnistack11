const express = require('express');
const OngController = require('./controllers/OngController');
const CaseController = require('./controllers/CaseController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//ONGS
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create);

//CASES
routes.get('/cases', CaseController.index)
routes.post('/cases', CaseController.create);
routes.delete('/cases/:id', CaseController.delete);

//CASES BY ONG
routes.get('/profile', ProfileController.index);

module.exports = routes;
