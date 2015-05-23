var Game = (function (w, d) {

	'use strict';

	var Game = function () {};
	
	var fn = Game.prototype;

	fn.init = function () {
		var el = d.querySelector('#device-orientation-playground');
		
		this.deviceOrientation = new DeviceOrientation(el);
		this.deviceOrientation.init();

		this.canvas = d.querySelector('#game-canvas');
		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = w.innerWidth;
		this.canvas.height = w.innerHeight;

		this.player = new Player(this.ctx, this.canvas, this.deviceOrientation);
		this.footballField = new FootballField(this.ctx, this.canvas);

		this.bindEvents();
	};

	fn.bindEvents = function () {};

	fn.update = function () {};

	fn.animate = function () {
		this.draw();
		w.requestAnimFrame(this.animate.bind(this));
	};

	fn.draw = function () {
		// Clearing all canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.player.update();
		this.player.draw();

		this.footballField.draw();
	};

	return Game;

}(window, document));