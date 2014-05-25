var zerorpc = require("zerorpc");
//var childProcess = require('child_process');
var async = require('async');
var spawn = require('child_process').spawn;

function Browser (){
  this.client;
}
Browser.start = function() {
	// Start python server and set streams

	var broswerP = spawn('python', ['./lib/browser/python/browserListener.py']);
	broswerP.stdout.on('data', function(data) {
	   console.log('browserP stdout: ' + data);
	});

	broswerP.stderr.on('data', function (data) {
	  console.log('browserP stderr: ' + data);
	});

	broswerP.on('close', function (code) {
	  console.log('browserP exited with code ' + code);
	});

	this.connect();

	this.client.on("error", function(error) {
	    console.error("RPC client error:", error);
	});

}
Browser.newTab = function(url) {
	this.client.invoke("newTab", url, function(err, res, more) {
		if (err) { console.log(err) }
		if (res) { console.log(res) }
	});
}
Browser.go = function(url) {
	this.client.invoke("go", url, function(err, res, more) {
		if (err) { console.log(err) }
		if (res) { console.log(res) }
	});
}
Browser.switchTab = function(d) {
	this.client.invoke("switchTab", d, function(err, res, more) {
		if (err) { console.log(err) }
		if (res) { console.log(res) }
	});
}


Browser.connect = function() {
	this.client = new zerorpc.Client();
    this.client.connect("tcp://127.0.0.1:4242");
}


module.exports = Browser;

