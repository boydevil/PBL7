const express = require('express');
const route = express.Router();
const recogController  = require('../controller/RecogniteController');
const cloudinary  = require('../controller/CloudController');


//nhan img
route.post('/receive_photo',cloudinary.single("file"),recogController.Upload_file);


// //nhan result tu AI
// route.post('/receive_result', );


module.exports = route;


