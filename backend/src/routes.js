const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const CaseController = require('./controllers/CaseController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//ONGS
routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

//CASES
routes.get('/cases', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),CaseController.index);

routes.post('/cases', CaseController.create);

routes.delete('/cases/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}),CaseController.delete);

//CASES BY ONG
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

module.exports = routes;
