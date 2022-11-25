const userRoute = require('./UserRouters');
const adminRoute = require('./AdminRouters');
const garbageRoute = require('./GarbageRouters');
const garTypeRoute = require('./GarTypeRouters');
const recogRoute = require('./RecogniteRouters');

function route(app){
  
  app.use('/user',userRoute);
  app.use('/admin',adminRoute);
  app.use('/garbage',garbageRoute);
  app.use('/gartype',garTypeRoute);
  app.use('/recognite',recogRoute);


}
module.exports = route;