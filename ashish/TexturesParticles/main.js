(function (THREE) {
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;
    var clock = new THREE.Clock;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width,height);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    // Create the cube
    var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x1ec876});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.rotation.y = Math.PI * 45 / 180; // convert to radians
    cube.rotation.x = Math.PI * 45 / 180;
    scene.add(cube);

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
        requestAnimationFrame(render); // callback render when next frame is ready
    }
    render();

    

}) (THREE);
