(function(THREE) {
  'use strict';
  var width = window.innerWidth;
  var height = window.innerHeight;

  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  var scene = new THREE.Scene();

  var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
  var cubeTexture = THREE.ImageUtils.loadTexture('./box.jpg')
  var materials = [];
  materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff0000 })); // right face
  materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffff00 })); // left face
  materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffffff })); // top face
  materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x00ffff })); // bottom face
  materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x0000ff })); // front face
  materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff00ff })); // back face
  var cubeMaterial = new THREE.MeshFaceMaterial(materials);
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.rotation.y = Math.PI * 45 / 180;
  scene.add(cube);

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.y = 160;
  camera.position.z = 400;
  camera.lookAt(cube.position);
  scene.add(camera);

  var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyboxMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.BackSide});
  var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);

  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.set(0, 300, 200);
  scene.add(pointLight);

  var clock = new THREE.Clock;
  var render = function() {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    cube.rotation.y -= delta;
    cube.rotation.x += delta;
    cube.rotation.z -= delta;
  	renderer.render(scene, camera);
  }
  render();
})(THREE);