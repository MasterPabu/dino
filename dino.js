// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 720;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg.png";

// dino image
var dinoReady = false;
var dinoImage = new Image();
dinoImage.onload = function () {
	dinoReady = true;
};

dinoImage.src = "images/dino.png";
var dino = {
	speed: 10, // movement in pixels per second
	x: 100,
	y: 450,
	jumping: false,
	vel_y: 0
};

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	keysDown[e.keyCode] = false;
}, false);

var keys = function () {
	if (keysDown[32]) { // Player holding space
		if(!dino.jumping) {
   			dino.jumping = true;
   			dino.vel_y = -dino.speed*2;
   		}
	}
};
var xpos = 0;
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, xpos, 0);
		ctx.drawImage(bgImage, bgImage.width - Math.abs(xpos), 0);
	}
	if (Math.abs(xpos) > bgImage.width) {
		xpos = 0;
	}
	xpos-=2;
	dino.y+=dino.vel_y;
	dino.x+=10;
	if (dino.y <= 0) {
		dino.y=0;
	}
	if (dinoReady) {
		ctx.drawImage(dinoImage, dino.x, dino.y);
	}
};
var offsetX = -10;
var main = function () {
	var now = Date.now();
	var delta = now - then;
	render();
	keys();
	then = now;
	requestAnimationFrame(main);
	ctx.translate(offsetX, 0);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
main();