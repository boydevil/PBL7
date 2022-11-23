const {express} = require('express');
const garbageModel = require('../model/GarbageModel');

class GarbageControler{
    GettAllGar(req,res){
        garbageModel.GetAllGar(function(data){
            res.send({result: data});
        });
    }
    Detail(req, res) {
        garbageModel.getById(req.params.id, function (response) {
          res.send({ result: response });
        });
    };
    AddGar(req, res) {
        console.log(req.body);
          var data = req.body;
          garbageModel.Add(data, function (response) {
            res.send({ result: response });
          });
    };
    RemoveGar(req, res) {
        var id = req.params.id;
        garbageModel.Remove_Gar(id, function (response) {
            res.send({result: response });
        });
    };
    GetItemByID_Type(req, res) {
        var id = req.params.id;
        garbageModel.GetItemByID_Type(id, function (response) {
            res.send({ result: response });
        });
    };
    GetNameOfType(req, res) {
        var id = req.params.id;
        console.log(id);
        garbageModel.GetNameOfType(id, function (response) {
            res.send({ result: response });
        });
    };
}
module.exports = new GarbageControler;