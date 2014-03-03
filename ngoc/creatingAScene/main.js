(function(THREE) {
  "use strict";
  var width = window.innerWidth;
  var height = window.innerHeight;
  
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene;
  var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  var geometry = new THREE.CubeGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  var render = function() {
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
  };

  render();
})(THREE);