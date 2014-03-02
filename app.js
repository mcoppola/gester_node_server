// DEPENDENCIES ----------------------------------------------------------------- //

var express = require('express')
var http = require('http');
var path = require('path');
var routes = require('./routes');
var nunjucks = require('nunjucks');
var fs = require('fs');

var app = express();


var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/views'), {
  dev: true,
  autoescape: true
});

env.addFilter('log', function(data) {
  console.log(data);
});

// configure the app
app.configure( function(){
  env.express(app);
  app.set('views', __dirname + '/views');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next){
    return res.redirect('/');
  });
  app.use(express.errorHandler());
});

//  routes/index.js is where all the fun happens
app.get('/', routes.index);
app.get('/:user', routes.index);

// run the server
var port = 3000;
// Heroku
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  try {
    // Stagecoach option
    port = fs.readFileSync(__dirname + '/data/port', 'UTF-8').replace(/\s+$/, '');
  } catch (err) {
    console.log(err);
    console.log("I see no data/port file, defaulting to port " + port);
  }
}

http.createServer(app).listen(port, '127.0.0.1', function() {
  console.log("Express server listening on %s:%d in %s mode", '127.0.0.1', port, app.settings.env);
});