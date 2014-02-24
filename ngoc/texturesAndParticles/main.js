(function(THREE) {
  "use strict";

  // var canvas = document.getElementById('canvas');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var r = new THREE.WebGLRenderer();
  r.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(r.domElement);

  var geometry = new THREE.CubeGeometry(1, 1, 1);
  // var material = new THREE.MeshBasicMaterial({
  //   color: 0x00FF00
  // });
  var cubeTexture = THREE.ImageUtils.loadTexture('./box.jpg');
  // var cubeMaterial = new THREE.MeshLambertMaterial({
  //   map: cubeTexture,
  //   color: 0x00FF00
  // });
	var materials = [];
	materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff0000 })); //right
	materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffff00 })); //left
	materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffffff })); //top
	materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x00ffff })); //bottom
	materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x0000ff })); //front
	materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff00ff })); //back
	var cubeMaterial = new THREE.MeshFaceMaterial(materials);
	var cube = new THREE.Mesh(geometry, cubeMaterial);
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