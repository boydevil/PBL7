const express = require('express');
const route = express.Router();
const adminController = require('../controller/AdminController');


//Get ID
route.get('/detail/:id', adminController.Detail);
//Add Admin
route.post('/add', adminController.AddAdmin);

//GetAll
route.get('/',adminController.GetAllAdmin);


module.exports = route;