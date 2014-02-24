(function(THREE) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var renderer = new THREE.WebGLRendere({ antialias: true });
    renderer.setSize(width,height);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

})(THREE);
