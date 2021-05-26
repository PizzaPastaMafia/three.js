let scene, camera, renderer, space, sun, earth, earth_clouds, saturn, saturn_ring;

function init(){

    /* SCENE */

    scene = new THREE.Scene();

    /* CAMERA */

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );

    /* RENDERER */

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    /* MESH */

    // SPACE

    const spaceGeometry = new THREE.SphereGeometry(100,32,32);
    const spaceTexture = new THREE.TextureLoader().load('../images/space/space.jpg');
    const spaceMaterial = new THREE.MeshBasicMaterial( {map: spaceTexture, side: THREE.DoubleSide} );
    space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    //scene.add(space);
    
    // SUN
    
    const sunGeometry = new THREE.SphereGeometry(40,32,32);
    const sunTexture = new THREE.TextureLoader().load('../images/sun/sun.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial( {map: sunTexture} );
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // insert sun algorithm
    
    // EARTH
    
    const earthGeometry = new THREE.SphereGeometry(5,32,32);
    const earthTexture = new THREE.TextureLoader().load('../images/earth/earth.jpg');
    const earthMaterial = new THREE.MeshBasicMaterial( {map: earthTexture} );
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    const earth_cloudsGeometry = new THREE.SphereGeometry(5.1,32,32);
    const earth_cloudsTexture = new THREE.TextureLoader().load('../images/earth/clouds.png');
    const earth_cloudsMaterial = new THREE.MeshBasicMaterial( {map: earth_cloudsTexture, transparent: true} );
    earth_clouds = new THREE.Mesh(earth_cloudsGeometry, earth_cloudsMaterial);
    scene.add(earth_clouds);
    
    var earthPivot = new THREE.Object3D();
    earthPivot.add( earth );
    
    scene.add( earthPivot );
    
    earth.position.x = 55;
    earth_clouds.position.x = 55;
    
    // MARS
    
    const marsGeometry = new THREE.SphereGeometry(5,32,32);
    const marsTexture = new THREE.TextureLoader().load('../images/mars/mars.jpg');
    const marsMaterial = new THREE.MeshBasicMaterial( {map: marsTexture} );
    mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);
    
    mars.position.x = 75;

    // SATURN



    // ORBIT CONTROLS
    
    camera.position.z=80;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // controls.target.set(60,60,60);

    window.requestAnimationFrame(animate);
}


function animate(){
    window.requestAnimationFrame(animate);
    mars.rotation.y += 0.01;
    earth.rotation.y += 0.005;
    earth_clouds.rotation.y += 0.004;
    
    //earthPivot.rotation.x += 0.001;
    // ...

    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();