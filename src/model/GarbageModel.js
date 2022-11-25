const db = require('../config/db');


const Garbage = function(garbage){
    this.ID_Nhom = garbage.ID_Nhom;
    this.ID_Garbage = garbage.ID_Garbage;
    this.Name = garbage.Name;
    this.ImageLink = garbage.ImageLink;

}
Garbage.GetAllGar = function(result){
    db.query('select * from Garbage', function(err,h){
        if(err){
            console.log(err);
            result(err);
        }else{
            result(h);
        }
    });
};
Garbage.getById = function (id, result) {
    db.query("select * from Garbage where ID_Garbage = ?", id, function (err, garbage) {
      if (err || garbage.length == 0) {
        result(err);
      } else {
        result(garbage);
        console.log('Get garbage thanh cong');

      }
    });
};
Garbage.Add = function (data, result) {
    db.query(
      "INSERT INTO Garbage (ID_Nhom,ID_Garbage,Name,Image_Link) VALUES (?,NULL,?,?);",
      [
        data.ID_Nhom,
        data.Name,
        data.Image_Link,
      ],
      function (err, garbage) {
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
Garbage.Remove_Gar = function (id, result) {
db.query("delete from Garbage where ID_Garbage = ?", id, function (err, garbage) {
    if (err) {
    result(null);
    } else {
    result(garbage);
    console.log('Delete thanh cong');
    }
});
};
Garbage.GetItemByID_Type = function(id, result){
  db.query('select * from Garbage inner join GarbageClassify on Garbage.ID_Nhom=GarbageClassify.ID_Nhom where GarbageClassify.ID_Nhom =? ',id,function (err, h) {
      if (err) {
          console.log(err);
          result(err);
      } else {
          result(h);
      }
  })
};
Garbage.GetNameOfType = function(id, result){
  db.query('select GarbageClassify.TenNhom from GarbageClassify inner join Garbage on Garbage.ID_Nhom=GarbageClassify.ID_Nhom where Garbage.ID_Garbage =? ',id,function (err, h) {
      if (err) {
          console.log(err);
          result(err);
      } else {
          result(h);
      }
  })
};
module.exports = Garbage;