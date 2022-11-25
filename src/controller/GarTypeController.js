const {express} = require('express');
const garTypeModel = require('../model/GarTypeModel');

class GarTypeController{
    GetAllType(req,res){
        garTypeModel.GetAllType(function(data){
            res.send({result: data});
        });
    }
}
module.exports = new GarTypeController;