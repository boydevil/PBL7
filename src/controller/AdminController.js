const adminModel = require('../model/AdminModel');

class AdminController{
    GetAllAdmin(req,res){
        adminModel.GetAllAdmin(function(data){
            res.send({result: data});
        });
    };
    Detail(req, res) {
        adminModel.getById(req.params.id, function (response) {
          res.send({ result: response });
        });
    };
    AddAdmin(req, res) {
        console.log(req.body);
          var data = req.body;
          adminModel.Add(data, function (response) {
            res.send({ result: response });
          });
      };
}
module.exports = new AdminController;