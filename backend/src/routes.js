const express = require('express');
const ongController = require('./controllers/OngControllers');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const incidentController = require('./controllers/IncidentController');

const routes = express.Router();

routes.get('/ong', ongController.index);
routes.post("/ong", ongController.create);

routes.get('/profile', profileController.index);

routes.post('/sessions', sessionController.create);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;