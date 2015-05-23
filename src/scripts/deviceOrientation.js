var DeviceOrientation = (function (w, d) {
	'use strict';

	/********************************************************
	**  CLASS PRIVATE VARIABLES
	********************************************************/
	var debug = false;
	var appHtml = [
		'<div class="tilt-LR widget"></div>',
		'<div class="tilt-FB widget"></div>',
		'<div class="direction widget"></div>'
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
	var DeviceOrientation = function (el) {
		if (el) this.el = el;
	};

	/********************************************************
	**  SHORTHAND REFERENCE TO CLASS PROTOTYPE
	********************************************************/
	var fn = DeviceOrientation.prototype;

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
			this.el.innerHTML = this.isDeviceOrientationSupported() ? appHtml : supportHtml;
			this.domElements = {
				tiltLR: $('.tilt-LR'),
				tiltFB: $('.tilt-FB'),
				direction: $('.direction')
			};
		}

		this.bindEvents();
	};

	fn.bindEvents = function () {
		var deviceOrientationHandler = (function (data) {
			this.setOrientationData(data);

			if (debug) {
				this.renderDeviceOrientationData(data.gamma, data.beta, data.alpha);
			}
		}).bind(this);

		w.addEventListener('deviceorientation', deviceOrientationHandler, false);
	};

	fn.getSupportText = function () {
		return (this.isDeviceOrientationSupported()) ? 'Device orientation is supported!!!' : 'Device orientation isnt supported!!!';
	};

	fn.isDeviceOrientationSupported = function () {
		return !!w.DeviceOrientationEvent;
	};

	fn.renderDeviceOrientationData = function (tiltLR, tiltFB, dir) {
		if (this.domElements) {
			this.domElements.tiltLR.innerHTML = Math.floor(tiltLR);
			this.domElements.tiltFB.innerHTML = Math.floor(tiltFB);
			this.domElements.direction.innerHTML = Math.floor(dir);
		}
	};

	fn.setOrientationData = function (data) {
		this.deviceOrientationData = {
			leftToRight: data.gamma,
			frontToBack: data.beta,
			direction: data.alpha
		};
	};

	fn.getOrientationData = function () {
		return this.deviceOrientationData;
	};

	return DeviceOrientation;
}(window, document));

