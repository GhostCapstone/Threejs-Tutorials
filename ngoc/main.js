(function() {
  "use strict";

  // var canvas = document.getElementById('canvas');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var r = new THREE.WebGLRenderer();
  r.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(r.domElement);
})();