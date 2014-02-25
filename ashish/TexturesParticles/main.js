(function (THREE) {
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;
    var clock = new THREE.Clock();
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width,height);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    // Make an array of materials
    var cubeTexture = THREE.ImageUtils.loadTexture('./box.jpg'); // box.png
    var materials = [];
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff0000 })); // right face
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffff00 })); // left face
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffffff })); // top face
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x00ffff })); // bottom face
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x0000ff })); // front face
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff00ff })); // back face
    
    // Create the cube
    var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);


    var cubeMaterial = new THREE.MeshFaceMaterial(materials);
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.rotation.y = Math.PI * 45 / 180; // convert to radians
    cube.rotation.x = Math.PI * 45 / 180;
    scene.add(cube);

    // Make some particle effects
    var particles = new THREE.Geometry();
    for (var p = 0; p < 2000; p++) {
        // randomly generate a particle
       var particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
       particles.vertices.push(particle);
    }
    var particleTexture = THREE.ImageUtils.loadTexture('./snowflake.png');
    var particleMaterial = new THREE.ParticleBasicMaterial({ map: particleTexture, transparent: true, size: 5 });
    var particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
    scene.add(particleSystem);
    // add the camera
    var camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt(cube.position);

    scene.add(camera);

    // add a skybox
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide } );
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    scene.add(skybox);
    
    // add a pointlight
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 300, 200);

    scene.add(pointLight);

    // Draw it
    function render() {
        var delta = clock.getDelta();
        renderer.render(scene, camera);
        
        cube.rotation.y -= delta;
        cube.rotation.x -= delta;
        particleSystem.rotation.y += delta;
        requestAnimationFrame(render); // callback render when next frame is ready
    }
    render();

    

}) (THREE);
