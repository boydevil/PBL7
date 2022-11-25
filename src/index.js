const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routes/index');


app.use(express.urlencoded({extended: false}));
app.use(express.json());

  
//Connect db
// db.connect();
route(app);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})