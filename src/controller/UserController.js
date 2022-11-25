const {response} = require('express');
const UserModel = require('../model/UserModel');
require("dotenv").config();
// const jwt = require("jsonwebtoken");


class UserController{
    GetAllUser(req,res){
        UserModel.GetAllUser(function(data){
            res.send({result: data});
        });
    };
    Detail(req, res) {
        UserModel.getById(req.params.id, function (response) {
          res.send({ result: response });
        });
    };
    AddUser(req, res) {
      console.log(req.body);
        var data = req.body;
        UserModel.Add(data, function (response) {
          res.send({ result: response });
        });
    };
    RemoveUser(req, res) {
      var id = req.params.id;
      UserModel.Remove_User(id, function (response) {
        res.send({result: response });
      });
    };
    Register(req, res){
      try {
        if (req.body.Password != req.body.confpass) {
          return res
            .status(400)
            .json({ msg: "Password and ConfirmPassWord is not match" });
        }
        var data = req.body;
        UserModel.Register(data, (sta, msg) => {
          return res.status(sta).json({ msg });
        });
      } catch (err) {
        return res.status(400).json(err);
      }
    };
    UpdateUser = function (req, res) {
      var ID_User = req.params.id;
      var data = req.body;
      UserModel.UpdateUser(data,ID_User,
        function (response) {
          res.send({result: response });
        });
    };
    UpdatePassword(req, res){
      try {
        var id = req.params.id;
        var data = req.body;
        UserModel.UpdatePassword(data,id, (sta, msg) => {
          return res.status(sta).json({ msg });
        });
      } catch (err) {
        return res.status(400).json(err);
      }
    };
    Login(req, res){
      try {
        var data = req.body;
        UserModel.Login(
          data,(sta, msg) => {
            return res.status(sta).json({ msg });
          }

          // (sta, user, accessToken, refreshToken) => {
          //   res.cookie("refreshToken", refreshToken, {
          //     httpOnly: true,
          //     path: "/",
          //   });
          //   user.Password = "";
          //   if (sta == 400) {
          //     return res.status(400).json({ msg: user });
          //   } else {
          //     return res.status(400).json({ msg: user });

          //     return res.status(sta).json({ ...user, accessToken });
          //   }
          // }
        );
      } catch (err) {
        res.status(500).json(err);
      }
    };



    // RefreshToken(req, res){
    //   const refreshToken = req.cookies.refreshToken;
    //   if (!refreshToken)
    //     return res.status(401).json("You're not authenticated trong refresh");
    //   UserModel.checkRefreshToken(refreshToken, (sta, respon) => {
    //     return res.status(sta).json(respon);
    //   });
    //   jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    //     if (err) console.log(err);
    //     UserModel.deleteRefreshToken(refreshToken);
    //     const newAccessToken = UserModel.generateAccessToken(user);
    //     const newRefreshToken = UserModel.generateRefreshToken(user);
    //     UserModel.addRefreshToken(newRefreshToken);
    //     res.cookie("refreshToken", newRefreshToken, {
    //       httpOnly: true,
    //       secure: false,
    //       path: "/",
    //       sameSite: "strict",
    //     });
    //     return res.status(200).json({ accessToken: newAccessToken });
    //   });
    // };
}
module.exports = new UserController;

  