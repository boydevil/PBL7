const express = require('express');
const app = express();
const route = express.Router();
const userController =require('../controller/UserController');



//Get ID
route.get('/detail/:id', userController.Detail);
//Add User
route.post('/add', userController.AddUser);
//Delete User
route.delete('/delete/:id', userController.RemoveUser);
//Register
route.post('/register', userController.Register);
//Update
route.put('/update_user/:id', userController.UpdateUser);
//ChangePass
route.put('/update_pass/:id',userController.UpdatePassword);

//Login
route.post('/login',userController.Login);
//logout

//Get All User
route.get('/',userController.GetAllUser);

module.exports = route;



  