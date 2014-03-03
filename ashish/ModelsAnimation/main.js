(function (THREE) {
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;
    var animation;
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

    // import a model
    var loader = new THREE.JSONLoader();
/*
    loader.load('./model.js', function(geometry, materials) {
        var skinnedMesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(materials));
        skinnedMesh.position.y = 50;
        skinnedMesh.scale.set(15, 15, 15);
        scene.add(skinnedMesh);

        animate(skinnedMesh);
    });
    */

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


    // Add some smoke
    var smokeParticles = new THREE.Geometry();
    for (var i = 0; i < 300; i++) {
        var smokeParticle = new THREE.Vector3(Math.random() * 32 - 16, Math.random() * 230, Math.random() * 32 - 16);
        smokeParticles.vertices.push(smokeParticle);

    }
    var smokeTexture = THREE.ImageUtils.loadTexture('./smoke.png');
    var smokeMaterial = new THREE.ParticleBasicMaterial({ map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x111111 });
    var smoke = new THREE.ParticleSystem( smokeParticles, smokeMaterial);
    smoke.sortParticles = true;
    smoke.position.x = -150;

    scene.add(smoke);
    // add the camera
    var camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt(cube.position);

    scene.add(camera);

    // add controls
    var controls = new THREE.OrbitControls(camera, render.domElement);

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
        controls.update();
        cube.rotation.y -= delta;
        cube.rotation.x -= delta;
        particleSystem.rotation.y += delta;

        var particleCount = smokeParticles.vertices.length;
        while (particleCount--) {
            var p = smokeParticles.vertices[particleCount];
            p.y += delta * 50;

            if (p.y >= 230) {
                p.y = Math.random() * 16;
                p.x = Math.random() * 32 - 16;
                p.z = Math.random() * 32 - 16;
            }
        }

        smokeParticles.__dirtyVertices = true;
        requestAnimationFrame(render); // callback render when next frame is ready
    }
    render();

    

}) (THREE);
