// IN THIS FILE
// we're making data and pushing it into the index.html template.
var _ = require('underscore');
//var nav = require('../routes/navigation.js');

var title = 'title';


var img = {
  directory: "/public/images/",
  home: "home-slide.jpg",
}

exports.index = function(req, res){
  /*if (!req.username) {
    req.username = 'mcoppola';
  }*/
  console.log("req: " + req.data);
  res.render('index.html', {
    title: "Home",
    username: req.username
  });
};
