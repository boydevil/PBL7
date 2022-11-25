const db = require('../config/db');
const jwt = require("jsonwebtoken");


const User = function(user){
    this.ID_User = user.ID_User;
    this.HoTen = user.HoTen;
    this.Gmail = user.Gmail;
    this.Password = user.Password;
    this.NumberPhone = user.NumberPhone;
    this.Address = user.Address;
}
User.GetAllUser = function (result){
    db.query("select * from User", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};
User.getById = function (id, result) {
    db.query("select * from user where ID_User = ?", id, function (err, user) {
      if (err || user.length == 0) {
        result(err);
      } else {
        result(user);
        console.log('Get user thanh cong');
      }
    });
};
User.Add = function (data, result) {
    db.query(
      "INSERT INTO User (ID_User,HoTen,Gmail,Password,NumberPhone,Address) VALUES (NULL,?,?,?,?,?);",
      [
        data.HoTen,
        data.Gmail,
        data.Password,
        data.NumberPhone,
        data.Address,
      ],
      function (err, user) {
        console.log(err, data);
        if (err) {
          result(null);
        } else {
          result(data);
          console.log('Add thanh cong');
        }
      }
    );
  };
User.Remove_User = function (id, result) {
  db.query("delete from user where ID_User = ?", id, function (err, user) {
    if (err) {
      result(null);
    } else {
      result(user);
      console.log('Delete thanh cong');
    }
  });
};
User.Register =function(data, result) {
  db.query("select * from User where Gmail = ?", data.Gmail, (err, user) => {
    console.log(user);
    if (user.length==0) {
      db.query(
        "INSERT INTO User (ID_User,HoTen,Gmail,Password,NumberPhone,Address) VALUES (NULL,?,?,?,?,?);",
        [
          data.HoTen,
          data.Gmail,
          data.Password,
          data.NumberPhone,
          data.Address,
        ],
        function (err, user) {
          if (err) {
            console.log(err);
            result(403, "Registration failed");          
          } else {
            result(200, "Registration successfuly");
          }
        }
      );
    } else {
      result(400, "Email have already!");
    }
  });
};
User.UpdateUser = function (data,id, result) {
  db.query(
    "update User set HoTen=?,Gmail=?,NumberPhone=?,Address=? where ID_User = ?",
    [
      data.HoTen,
      data.Gmail,
      data.NumberPhone,
      data.Address,
      id
    ],
    function (err, u) {
      console.log(err);
      if (err) {
        result(null);
      } else {
        result(data);
        console.log('Update thanh cong');
      }
    }
  );
};
User.UpdatePassword = function (data,id, result) {
  console.log(data);
  db.query("select * from User where ID_User = ? and Password= ?",
  [id, data.OldPassword], 
  function(err, user){
    console.log(user);
    if (user.length) {
          if (data.OldPassword == data.NewPassword) {
            result(400, "OldPassword and NewPassWord re the same" );
          }
          else if (data.NewPassword != data.ConfPassword) {
            result(400, "Password and ConfirmPassWord is not match" );
          }
          else {
            db.query(
            "update User set Password=? where ID_User = ?",
            [
              data.NewPassword,
              id
            ],
            function (err, user) {
              if (err) {
                console.log(err);
                console.log("Update Password failed");
                result(403, "Update Password failed");          
              } else {
                console.log("Update successfuly");
                result(200, "Update successfuly");
              }
            }
          );
          }
        } else {
          result(400, "Wrong Password !!!");
        }
  });
};



// //TOKEN
// User.generateAccessToken = function(user) {
//   return jwt.sign(
//     {
//       id: user.ID,
//     },
//     process.env.JWT_ACCESS_KEY,
//     {
//       expiresIn: "30s",
//     }
//   );
// };
// User.generateRefreshToken = function(user){
//   return jwt.sign(
//     {
//       id: user.ID,
//     },
//     process.env.JWT_REFRESH_KEY,
//     {
//       expiresIn: "30d",
//     }
//   );
// };
// User.checkRefreshToken = function(refreshToken, result) {
//   db.query(
//     "select * from refreshtoken where token = ?",
//     refreshToken,
//     (err, token) => {
//       if (err) {
//         console.log(err);
//       } else {
//         if (token.length == 0) {
//           result(403, "Refresh token is not valid!");
//         }
//       }
//     }
//   );
// };
// User.deleteRefreshToken =function (refreshToken, result){
//   db.query(
//     "delete from refreshtoken where token = ?",
//     refreshToken,
//     (err, token) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("ok");
//       }
//     }
//   );
// };
// User.deleteAllRefreshToken = function(){
//   db.query("delete from refreshtoken", (err, token) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// };
// User.addRefreshToken = function(refreshtoken){
//   console.log("refresh token nek", refreshtoken);
//   db.query(
//     "INSERT INTO refreshtoken (token) VALUES (?)",
//     refreshtoken,
//     (err, token) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("da add refresh token");
//       }
//     }
//   );
// };



User.Login = function(data, result){
  console.log("data",data);
  db.query("Select * from user where Gmail = ?", data.Gmail, (err, user) => {
    console.log("user: ", user);
    if (err || user.length == 0) {
      result(400, "Wrong gmail or password!");
    } else {
        if (user[0].Password == data.Password) {
          console.log('access');
          // const accessToken = User.generateAccessToken(user[0]);
          // const refreshToken = User.generateRefreshToken(user[0]);
          // User.addRefreshToken(refreshToken);
          // result(200, ...user, accessToken, refreshToken);
          result(200, "Access");

        } else {
          result(400, "Wrong information!");
        }
    }
  });
};
module.exports = User;
