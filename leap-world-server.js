"use strict";
var http = require('http');
http.createServer(function handler(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var Cylon = require("cylon");
Cylon.robot({
	connections : {
		leapmotion : {
			adaptor : "leapmotion"
		},
		arduino : {
			adaptor : "firmata",
			//							port : "/dev/cu.usbmodem1411"
			port : "/dev/tty.usbmodem1411"
		}
	},
	devices : {
		leapmotion : {
			driver : "leapmotion"
		},
		led : {
			driver : "led",
			pin : 13,
			connection : "arduino"
		}
	},
	work : function(my) {
		console.log("work");

		//				every((1).second(), function() {
		//					console.log("work");
		//					my.led.toggle();
		//				});

		my.leapmotion.on("frame", function(frame) {
//			console.log(frame.toString());
			if (frame.hands.length === 2) {
				console.log("two hands");
				my.led.turnOn();
			} else {
				console.log("one hand");
				my.led.turnOff();
			}
		});
	//		my.leapmotion.on("hand", function(hand) {
	//			console.log(hand.toString());
	//		});
	}
}).start();