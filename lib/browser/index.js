var zerorpc = require("zerorpc");
var childProcess = require('child_process');

function Browser (){
  this.client;
}
Browser.start = function() {
	// Start python server
	childProcess.exec('python ./lib/browser/python/browserListener.py', function (err, stdout, stderr) {
		if (err) {
			console.log(err);
		} else {
			console.log(stdout);
		}
	});

	// Bind the server as the client
	this.connect();

	// Set error handeling
	this.client.on("error", function(error) {
	    console.error("RPC client error:", error);
	});

	// Run the init method
	this.client.invoke("init", function(err, res, more) {
		if (err) { console.log(err) }
    });
}

Browser.connect = function() {
	this.client = new zerorpc.Client();
    this.client.connect("tcp://127.0.0.1:4242");
}


module.exports = Browser;

