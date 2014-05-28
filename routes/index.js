
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
    if (req.query.url){
      browser.go(req.query.url);
    } else {
      browser.go();
    }
  }
  if (req.query.switchTab) {
    if (req.query.delta) {
      browser.switchTab(req.query.delta);
    } 
  }
  if (req.query.home) {
    browser.go("http://127.0.0.1:3000/")
  }
  if (req.query.scroll) {
    if(req.query.delta) {
      browser.scroll(req.query.delta);
    } else {
      browser.scroll();
    }
    
  }
  res.json({done: true});

}