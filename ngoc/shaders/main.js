(function(THREE) {
  'use strict';

  // key listener
  document.addEventListener('keyup', function (e) {
      if (e.keyCode == 'A'.charCodeAt(0)) {
          currentSequence = (currentSequence == 'standing' ? 'walking': 'standing');
      }
  });

  // setup
  var width = window.innerWidth;
  var height = window.innerHeight;
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  var scene = new THREE.Scene();

  // cube
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

  // camera
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.y = 160;
  camera.position.z = 400;
  camera.lookAt(cube.position);
  scene.add(camera);

  // skybox
  var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyboxMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
  var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);

  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.set(0, 300, 200);
  scene.add(pointLight);

  // snowflakes
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

  /* models and animation */
  var loader = new THREE.JSONLoader;
  var currentSequence = 'standing';
  var animation;

  //load model
  var pivot;
  var skinnedMesh;
  loader.load('./model.js', function(geometry, materials){
    skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
    skinnedMesh.position.y = 50;
    skinnedMesh.scale.set(15, 15, 15);
    scene.add(skinnedMesh);

    var item = new THREE.Mesh(new THREE.CubeGeometry(100, 10, 10), new THREE.MeshBasicMaterial({color: 0xFF0000}));
    item.position.x = 50;
    pivot = new THREE.Object3D();
    pivot.scale.set(0.15, 0.15, 0.15);
    pivot.add(item);
    // pivot.useQuaternion = true;
    skinnedMesh.add(pivot);

    animate(skinnedMesh);
  });

  // animate model
  function animate(skinnedMesh) {
    var materials = skinnedMesh.material.materials;
 
    for (var k in materials) {
        materials[k].skinning = true;
    }
 
    THREE.AnimationHandler.add(skinnedMesh.geometry.animation);
    animation = new THREE.Animation(skinnedMesh, "ArmatureAction", THREE.AnimationHandler.CATMULLROM);
    animation.play(false, 0);
  }


  // frame animation and rendering
  var clock = new THREE.Clock;
  var render = function() {
    // setup
    requestAnimationFrame(render);
    var delta = clock.getDelta();

    // cube rotation
    cube.rotation.y -= delta;
    // cube.rotation.x -= delta;
    // cube.rotation.z -= delta;

    // snowflake rotation
    snowParticleSystem.rotation.x += delta / 50;

    //smoke particle animation
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

    // model animation
    pivot.position = new THREE.Vector3().setFromMatrixPosition(skinnedMesh.bones[2].skinMatrix);
    pivot.quaternion.setFromRotationMatrix(skinnedMesh.bones[2].skinMatrix);
    if (animation) {
      animation.update(delta);
      if (currentSequence == 'standing') {
          if (animation.currentTime > 4) {
              animation.stop();
              animation.play(false, 0); // play the animation not looped, from 0s
          }
      } else if (currentSequence == 'walking') {
          if (animation.currentTime <= 4 || animation.currentTime > 8) {
              animation.stop();
              animation.play(false, 4); // play the animation not looped, from 4s
          }
      }
    }

  	renderer.render(scene, camera);
  }
  render();
})(THREE);