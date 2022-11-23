const express = require('express');
const route = express.Router();
const garTypeController =require('../controller/GarTypeController');



route.get('/',garTypeController.GetAllType);

module.exports = route;

