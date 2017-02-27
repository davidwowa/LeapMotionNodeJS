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
		},
		servo : {
			driver : "servo",
			pin : 3,
			limits : {
				bottom : 20,
				top : 160
			}
		}
	},
	work : function(my) {
		//						every((1).second(), function() {
		//							console.log("work");
		//							my.led.toggle();
		//						});
		
		var angle = 0,
		increment = 20;

		my.leapmotion.on("frame", function(frame) {
			//			console.log(frame.toString());
			if (frame.hands.length === 2) {
				console.log("two hands");
				my.led.turnOn();
			} else {
				console.log("one hand");
				my.led.turnOff();

				angle += increment;

				my.servo.angle(angle);

				console.log("Current Angle: " + (my.servo.currentAngle()));

				if ((angle === 0) || (angle === 180)) {
					increment = -increment;
				}
			}
		});
		//		my.leapmotion.on("hand", function(hand) {
		//			console.log(hand.toString());
		//		});
//		var angle = 0,
//			increment = 20;
//
//		every((1).seconds(), function() {
//			angle += increment;
//
//			my.servo.angle(angle);
//
//			console.log("Current Angle: " + (my.servo.currentAngle()));
//
//			if ((angle === 0) || (angle === 180)) {
//				increment = -increment;
//			}
//		});

	}
}).start();

Cylon.api('http');