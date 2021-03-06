// DEPENDENCIES ----------------------------------------------------------------- //

var express = require('express'),
	http = require('http'),
	path = require('path'),
	routes = require('./routes'),
	nunjucks = require('nunjucks'),
	fs = require('fs'),
	less = require('less'),
  browser = require('./lib/browser/index.js');

var app = express();


var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/views'), {
  dev: true,
  autoescape: true
});

env.addFilter('log', function(data) {
  console.log(data);
});


/*fs.readFile('public/css/style.less',function(error,data){
    data = data.toString();
    less.render(data, function (e, css) {
        fs.writeFile('public/css/style.css', css, function(err){
        });
    });
});*/

// configure the app
app.configure( function(){
  env.express(app);
  app.set('views', __dirname + '/views');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(function(req, res, next){
    return res.redirect('/');
  });
  app.use(express.errorHandler());
});

// routs
app.get('/', routes.index);
app.get('/home/:user', routes.index);
app.get('/menu', routes.menu);
app.get('/tabs', routes.tabs);
app.get('/tabs/:count', routes.tabs);

// browser api
app.get('/api', routes.api);


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



var server = http.createServer(app);
var shutdown = function () {
  console.log("Shutdown");
  browser.quit();
  server.close();
}

process.on('SIGTERM', shutdown);
process.on ('SIGINT', shutdown);

// Start server
server.listen(port, '127.0.0.1', function() {
  console.log("Express server listening on %s:%d in %s mode", '127.0.0.1', port, app.settings.env);
});

// Start browser
browser.start();