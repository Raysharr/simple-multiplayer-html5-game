// shim layer with setTimeout fallback
window.requestAnimFrame = (function (w) {
  return  w.requestAnimationFrame       || 
          w.webkitRequestAnimationFrame || 
          w.mozRequestAnimationFrame    || 
          w.oRequestAnimationFrame      || 
          w.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            w.setTimeout(callback, 1000 / 60);
          };
})(window);