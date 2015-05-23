var DeviceMotion = (function (w, d) {
	'use strict';

	/********************************************************
	**  CLASS PRIVATE VARIABLES
	********************************************************/
	var debug = false;
	var appHtml = [
		'<div class="acceleration widget"></div>',
		'<div class="acceleration-including-gravity widget"></div>',
		'<div class="rotation-rate widget"></div>',
		'<div class="interval widget"></div>'
	].join('');

	/********************************************************
	**  HELPER FUNCTIONS
	********************************************************/
	var $ = function (id) {
		return d.querySelector(id);
	};

	/********************************************************
	**  CONSTRUCTOR FUNCTION
	********************************************************/
	var DeviceMotion = function (el) {
		if (el) this.el = el;
	};

	/********************************************************
	**  SHORTHAND REFERENCE TO CLASS PROTOTYPE
	********************************************************/
	var fn = DeviceMotion.prototype;

	/********************************************************
	**  PRIVATE METHODS
	********************************************************/

	/********************************************************
	**  PUBLIC METHODS
	********************************************************/
	fn.init = function () {
		if (this.el) {
			var supportText = this.getSupportText();
			var supportHtml = [
				'<div class="support-el">',
					supportText,
				'</div>'
			].join('');
			this.el.innerHTML = this.isDeviceMotionSupported() ? appHtml : supportHtml;
			this.domElements = {
				acceleration: $('.acceleration'),
				accelerationIncludingGravity: $('.acceleration-including-gravity'),
				rotationRate: $('.rotation-rate'),
				interval: $('.interval')
			};
		}

		this.bindEvents();
	};

	fn.bindEvents = function () {
		var deviceMotionHandler = (function (data) {
			this.setDeviceMotionData(data);

			if (debug) {
				this.renderDeviceMotionData(
					data.acceleration,
					data.accelerationIncludingGravity,
					data.rotationRate,
					data.interval
				);
			}
		}).bind(this);

		w.addEventListener('devicemotion', deviceMotionHandler, false);
	};

	fn.getSupportText = function () {
		return (this.isDeviceMotionSupported()) ? 'Device motion is supported!!!' : 'Device motion isnt supported!!!';
	};

	fn.isDeviceMotionSupported = function () {
		return !!w.DeviceMotionEvent;
	};

	fn.renderDeviceMotionData = function (acceleration, accelerationIncludingGravity, dir) {
		if (this.domElements) {
			this.domElements.acceleration.innerHTML = Math.floor(acceleration);
			this.domElements.accelerationIncludingGravity.innerHTML = Math.floor(accelerationIncludingGravity);
			this.domElements.rotationRate.innerHTML = Math.floor(rotationRate);
			this.domElements.interval.innerHTML = Math.floor(interval);
		}
	};

	fn.setDeviceMotionData = function (data) {
		this.deviceMotionData = {
			acceleration: data.acceleration,
			accelerationIncludingGravity: data.accelerationIncludingGravity,
			rotationRate: data.rotationRate,
			interval: data.interval
		};
	};

	fn.getDeviceMotionData = function () {
		return this.deviceMotionData;
	};

	return DeviceMotion;
}(window, document));

