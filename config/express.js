var express = require("express");
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ejs = require('ejs');
var config = require('./config');

module.exports = function(){
  var app = express();
  if(process.env.NODE_ENV == "devel"){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV == "prod"){
    app.use(compression());
  }
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.set('views', './app/ejs');
    app.set('view engine', 'ejs');
    app.use('/app-web', express.static('./app/web-app'));
    require('../app/routes/jogador.routes.server.js')(app);
    require('../app/routes/partida.routes.server')(app);
    require('../app/routes/core.routes.server.js')(app);
  return app;
}
