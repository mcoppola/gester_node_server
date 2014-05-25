
var _ = require('underscore');
var browser = require('../lib/browser/index.js');
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
exports.tabs = function(req, res){
  res.render('tabs.html', {
    title: "Tabs",
    tabs: req.params.count
  });
};
exports.api = function(req, res){
  console.log(req.query);
  if (req.query.newTab) {
    if (req.query.url){
      browser.newTab(req.query.url);
    } else {
      browser.newTab();
    }
    
  }
  if (req.query.go) {
    console.log("req.jquery.go");
    if (req.query.url){
      console.log("req.jquery.url");
      browser.go(req.query.url);
    } else {
      browser.go();
    }
  }
  res.json({done: true});

}