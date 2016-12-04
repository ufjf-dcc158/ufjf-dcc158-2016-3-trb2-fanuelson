module.exports = function(app){
  var core = require('../controllers/core.controllers.server.js');
  app.use("/", core.home);

}
