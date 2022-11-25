const db = require('../config/db');


const Admin = function(admin){
    this.ID_Admin = admin.ID_Admin;
    this.UserName = admin.UserName;
    this.Password = admin.Password;
}
Admin.GetAllAdmin = function(result){
    db.query("select * from Admin", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};

Admin.getById = function (id, result) {
    db.query("select * from Admin where ID_Admin = ?", id, function (err, admin) {
      if (err || admin.length == 0) {
        result(err);
      } else {
        result(admin);
        console.log('Get admin thanh cong');
      }
    });
};

Admin.Add = function (data, result) {
    db.query(
      "INSERT INTO Admin (ID_Admin,Username,Password) VALUES (NULL,?,?);",
      [
        data.Username,
        data.Password,
      ],
      function (err, admin) {
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
module.exports = Admin;