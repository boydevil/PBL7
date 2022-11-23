const db = require('../config/db');


const GarType = function(garType){
    this.ID_Nhom = garclassify.ID_Nhom;
    this.TenNhom = garclassify.TenNhom;
    this.ImageLink = garclassify.ImageLink;
   
}
GarType.GetAllType = function(result){
    db.query('select * from GarbageClassify',function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    })
};

module.exports = GarType;