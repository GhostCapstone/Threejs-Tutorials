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
  // var materials = [];
  // materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff0000 })); // right face
  // materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffff00 })); // left face
  // materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffffff })); // top face
  // materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x00ffff })); // bottom face
  // materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x0000ff })); // front face
  // materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff00ff })); // back face
  // var cubeMaterial = new THREE.MeshFaceMaterial(materials);
  var cubeMaterial = new THREE.MeshLambertMaterial({ map: cubeTexture}); 
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.rotation.y = Math.PI * 45 / 180;
  scene.add(cube);

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.y = 160;
  camera.position.z = 400;
  camera.lookAt(cube.position);
  scene.add(camera);

  var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyboxMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
  var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);

  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.set(0, 300, 200);
  scene.add(pointLight);
  console.log(pointLight);

  //  snowflakes
  var snowParticles = new THREE.Geometry;
  for(var p = 0; p < 2000; p++){
    var particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 -250, Math.random() * 500 - 250);
    snowParticles.vertices.push(particle);
  }
  var snowParticleTexture = new THREE.ImageUtils.loadTexture('./snowflake.png');
  var snowParticleMaterial = new THREE.ParticleBasicMaterial({
    map: snowParticleTexture, 
    transparent: true, 
    size:10,
    blending: THREE.AdditiveBlending
  });
  var snowParticleSystem = new THREE.ParticleSystem(snowParticles, snowParticleMaterial);
  scene.add(snowParticleSystem);

  // smoke
  var smokeParticles = new THREE.Geometry;
  for(var i = 0; i < 300; i++){
    var smokeParticle = new THREE.Vector3(Math.random() * 32 - 16, Math.random() * 230, Math.random() * 32 - 16);
    smokeParticles.vertices.push(smokeParticle);
  }
  var smokeParticleTexture = new THREE.ImageUtils.loadTexture('./smoke.png');
  var smokeParticleMaterial = new THREE.ParticleBasicMaterial({
    map: smokeParticleTexture, 
    transparent: true,
    size: 50, 
    blending: THREE.AdditiveBlending,
    color: 0x111111
  });
  var smokeParticleSystem = new THREE.ParticleSystem(smokeParticles, smokeParticleMaterial);
  smokeParticleSystem.sortParticles = true;
  smokeParticleSystem.position.x = -150;
  scene.add(smokeParticleSystem);

  var clock = new THREE.Clock;
  var render = function() {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    cube.rotation.y -= delta;
    // cube.rotation.x -= delta;
    // cube.rotation.z -= delta;

    var particleCount = smokeParticles.vertices.length;
    while(particleCount--){
      var p = smokeParticles.vertices[particleCount];
      p.y += delta * 50;

      if(p.y >= 230){
        p.y = Math.random() * 16;
        p.x = Math.random() * 32 -16;
        p.z = Math.random() * 32 -16;
      }
    }
    smokeParticles.__dirtyVertices = true;

    snowParticleSystem.rotation.x += delta / 50;
  	renderer.render(scene, camera);
  }
  render();
})(THREE);