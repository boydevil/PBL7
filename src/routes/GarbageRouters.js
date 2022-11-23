const express = require('express');
const route = express.Router();
const garbageControler = require('../controller/GargabeController');


//Get ID
route.get('/detail/:id', garbageControler.Detail);
//Add User
route.post('/add', garbageControler.AddGar);
//Delete User
route.delete('/delete/:id', garbageControler.RemoveGar);
//GetItemByID_Type
route.get('/getitembyid_type/:id',garbageControler.GetItemByID_Type)
//GetNameType
route.get('/getnameoftype/:id',garbageControler.GetNameOfType)
//Update

//Get All
route.get('/',garbageControler.GettAllGar );

module.exports = route;