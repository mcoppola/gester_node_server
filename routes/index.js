
var _ = require('underscore');
//var nav = require('../routes/navigation.js');

var img = {
  directory: "/public/images/",
  home: "home-slide.jpg",
}

exports.index = function(req, res){
  res.render('index.html', {
    title: "Home",
    username: req.params.user
  });
};

exports.menu = function(req, res){
  res.render('menu.html', {
    title: "Menu"
  });
};