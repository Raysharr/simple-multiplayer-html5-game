var FootballField = (function (w, d) {

	'use strict';

	var config = {
		lineWidth: "10",
		x: 20,
		y: 20
	};

	var FootballField = function (ctx, canvas) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
	};

	var fn = FootballField.prototype;

	fn.draw = function () {
		var fieldWidth = this.canvasWidth - 2 * config.x,
		 	fieldHeight = this.canvasHeight - 2 * config.y;

		this.ctx.beginPath();
		this.ctx.lineWidth = config.lineWidth;
		this.ctx.rect(config.x, config.y, fieldWidth, fieldHeight); 
		this.ctx.stroke();
	};

	fn.getXPos = function () {
		return config.x;
	};

	fn.getYPos = function () {
		return config.y;
	};

	fn.getLineWidth = function () {
		return +config.lineWidth;
	};

	return FootballField;

}(window, document));