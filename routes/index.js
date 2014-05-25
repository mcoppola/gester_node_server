
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
  if(req.params.newtab = true) {
    if (req.params.url){
      browser.newTab(req.params.url);
    } else {
      browser.newTab();
    }
    
  }
  if(req.params.go = true) {
    console.log("req.params.go");
    if (req.params.url){
      browser.go(req.params.url);
    } else {
      browser.go();
    }
  }
  res.json({done: true});

}