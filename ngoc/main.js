(function(THREE) {
  "use strict";

  // var canvas = document.getElementById('canvas');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var r = new THREE.WebGLRenderer();
  r.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(r.domElement);

  var geometry = new THREE.CubeGeometry(6, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00FF00
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;


  render(r, scene, camera);

  function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    r.render(scene, camera);
  }
})(THREE);