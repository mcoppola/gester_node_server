var zerorpc = require("zerorpc");
var async = require('async');
var spawn = require('child_process').spawn;

function Browser (){
  this.client;
}
Browser.start = function() {
	
	// Start browser server and set streams
	var broswerP = spawn('python', ['./lib/browser/python/browserListener.py']);
	broswerP.stdout.on('data', function (data) {
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

	// Schedule command listeners for motion and gestures
	var client = this.client;
	var switchTabLocal = function(d) {
		client.invoke("switchTab", d, function(err, res, more) {
			if (err) { console.log(err) }
			if (res) { console.log(res) }
		});
	}
	var toggleKeyboard = function() {
		client.invoke("toggleKeyboard", function(err, res, more) {
			if (err) { console.log(err) }
			if (res) { console.log(res) }
		});
	}
	var goBack = function() {
		client.invoke("goBack", function(err, res, more) {
			if (err) { console.log(err) }
			if (res) { console.log(res) }
		});
	}
	var goForward = function() {
		client.invoke("goForward", function(err, res, more) {
			if (err) { console.log(err) }
			if (res) { console.log(res) }
		});
	}
	var go = function(url) {
		client.invoke("go", url, function(err, res, more) {
			if (err) { console.log(err) }
			if (res) { console.log(res) }
		});
	}
	var scroll = function(d) {
		client.invoke("scroll", d, function(err, res, more) {
			if (err) { console.log(err) }
			if (res) { console.log(res) }
		});
	}
	// Start Arduino Listener
	var acelP = spawn('python', ['./lib/browser/python/acel.py']);
	
	acelP.stdout.on('data', function(data) {
		data = data.toString();
		data = data.replace(" ", "").replace(/^\s*\n/gm, "");

		if (data.indexOf("xLeft") > -1) {
			switchTabLocal(-1);
		} else if (data.indexOf("xRight") > -1) {
			switchTabLocal(1);
		} else if ((data.indexOf("yUp") > -1) || (data.indexOf("yDn") > -1) ) {
			toggleKeyboard();
		} else if (data.indexOf("LEFTSWIPE") > -1) {
			goBack();
		} else if (data.indexOf("RIGHTSWIPE") > -1) {
			goForward();
		} else if (data.indexOf("UPSWIPE") > -1) {
			go("http://127.0.0.1:3000/");
		} else if (data.indexOf("SUP") > -1) {
			scroll(1);
		} else if (data.indexOf("SDN") > -1) {
			scroll(-1);
		}
	});

	acelP.stderr.on('data', function(data) {
		console.log('acelP stderr: ' +	 data);
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
Browser.scroll = function(d) {
	this.client.invoke("scroll", -1, function(err, res, more) {
		if (err) { console.log(err) }
		if (res) { console.log(res) }
	});
}
Browser.toggleKeyboard = function() {
	client.invoke("toggleKeyboard", function(err, res, more) {
		if (err) { console.log(err) }
		if (res) { console.log(res) }
	});
}

Browser.connect = function() {
	this.client = new zerorpc.Client();
    this.client.connect("tcp://127.0.0.1:4242");
}

Browser.quit = function() {
	var closeSocket = function() { this.client.close() }
	this.client.invoke("quit", function(err, res, more) {
		if (err) { console.log(err) }
		if (res) { console.log(res) }
		//closeSocket()
		console.log("Broswer closed");
	});
	if (this.client) {
		this.client.close();
	}
}

module.exports = Browser;

