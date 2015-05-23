var Player = (function (w, d) {

	'use strict';

	var config = {
		factor: 1,
		playerInstancesCount: 0,
		playerWidth: 20,
		playerHeight: 20
	};

	var Player = function (ctx, canvas, controller) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.controller = controller;
		this.x = Math.floor((this.canvas.width / 2) - (config.playerWidth / 2));
		this.y = this.setPlayerYPosition();
		this.canvasBoundries = this.getCanvasBoundries();
		
		// We wan't to have player on different positions
		config.playerInstancesCount++;
	};

	var fn = Player.prototype;

	fn.setPlayerYPosition = function () {
		var y = 0;

		if (config.playerInstancesCount < 1) {
			y = 100 - (config.playerHeight / 2);
		} else {
			y = this.canvas.height - 100 - (config.playerHeight / 2);
		}

		return y;
	};

	fn.getPlayerInstancesCount = function () {
		return playerInstancesCount;
	};

	fn.getX = function () {
		return this.x;
	};

	fn.getY = function () {
		return this.y;
	};

	fn.setX = function (newX) {
		this.x = newX;
	};

	fn.setY = function (newY) {
		this.y = newY;
	};

	fn.getCanvasBoundries = function () {
		var boundries = {};
		
		boundries.x = this.canvas.width;
		boundries.y = this.canvas.height;

		return boundries;
	};

	fn.update = function () {
		var orientationData,
			controllerFBData,
			controllerLRData,
			canvasBoundryY = this.canvasBoundries.y,
			canvasBoundryX = this.canvasBoundries.x;

		orientationData = this.controller.getOrientationData();

		if (orientationData) {
			controllerLRData = Math.floor(orientationData.leftToRight || 0);
			
			this.x += (controllerLRData / config.factor);

			if (this.x > canvasBoundryX - 20) {
				this.x = canvasBoundryX - 20;
			} else if (this.x < 0) {
				this.x = 0;
			}
		}
	};

	fn.draw = function () {
		this.ctx.fillRect(this.x, this.y, 20, 20);
	};

	return Player;

}(window, document));