const {response} = require('express');


class RecogniteController{
    Upload_file (req, res,next){
        if (!req.file) {
          next(new Error('No file uploaded!'));
          return;
        }
        res.json({ secure_url: req.file.path });
}

}

module.exports = new RecogniteController;