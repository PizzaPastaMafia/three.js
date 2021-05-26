let scene, camera, renderer, space, sun, earth, earth_clouds, earth_ring, saturn, saturn_ring, jupiter;

function init(){

    /* SCENE */

    scene = new THREE.Scene();

    /* CAMERA */

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000000
    );

    /* RENDERER */

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    /* MESH */

    // SPACE

    const spaceGeometry = new THREE.SphereGeometry(99999,32,32);
    const spaceTexture = new THREE.TextureLoader().load('../images/space/space.jpg');
    const spaceMaterial = new THREE.MeshBasicMaterial( {map: spaceTexture, side: THREE.DoubleSide} );
    space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    scene.add(space);
    
    // SUN

    const sunTexture = new THREE.TextureLoader().load( "../images/sun/sun.jpg");
    
    const sun_lay1Geometry = new THREE.SphereGeometry(39.9,32,32,0,6.3,0,3.3);
    
    const sun_lay1Material = new THREE.MeshBasicMaterial( { map: sunTexture, transparent: true, opacity: 0.3} );
    const sun_lay1 = new THREE.Mesh( sun_lay1Geometry, sun_lay1Material );
    scene.add(sun_lay1);

    const sun_lay2Geometry = new THREE.SphereGeometry(39.7,32,32,0,6.3,0,3.3);
    
    const sun_lay2Material = new THREE.MeshBasicMaterial( { map: sunTexture, transparent: true, opacity: 0.4} );
    const sun_lay2 = new THREE.Mesh( sun_lay2Geometry, sun_lay2Material );
    scene.add(sun_lay2);

    sun_lay2.rotation.y = 5;
    
    const sun_lay3Geometry = new THREE.SphereGeometry(39.5,32,32,0,6.3,0,3.3);
    
    const sun_lay3Material = new THREE.MeshBasicMaterial( { map: sunTexture, transparent: true, opacity: 0.6} );
    const sun_lay3 = new THREE.Mesh( sun_lay3Geometry, sun_lay3Material );
    scene.add(sun_lay3);
    
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

    const earth_ringGeometry = new THREE.RingGeometry(2.9,3,60,1,0,6.3);
    const earth_ringMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
    const earth_ring = new THREE.Mesh( earth_ringGeometry, earth_ringMaterial );
    scene.add( earth_ring );

    earth_ring.rotation.x =30;
    
    var earthPivot = new THREE.Object3D();
    earthPivot.add( earth );
    
    scene.add( earthPivot );
    
    earth.position.x = 55;
    earth.rotation.x = 0.4;
    earth_clouds.rotation.x = 0.4;
    earth_clouds.position.x = 55;
    
    // MARS
    
    const marsGeometry = new THREE.SphereGeometry(5,32,32);
    const marsTexture = new THREE.TextureLoader().load('../images/mars/mars.jpg');
    const marsMaterial = new THREE.MeshBasicMaterial( {map: marsTexture} );
    mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);
    
    mars.position.x = 75;
    mars.rotation.x = -0.3;

    // JUPITER
    
    const jupiterGeometry = new THREE.SphereGeometry(5,32,32);
    const jupiterTexture = new THREE.TextureLoader().load('../images/jupiter/jupiter.jpg');
    const jupiterMaterial = new THREE.MeshBasicMaterial( {map: jupiterTexture} );
    jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    scene.add(jupiter);
    
    jupiter.position.x = 100;
    jupiter.rotation.x = -0.3;
    

    // SATURN

    const saturnTexture = new THREE.TextureLoader().load( "../images/saturn/saturn.jpg" );
	const saturn_ringTexture = new THREE.TextureLoader().load( "../images/saturn/ring2.png" );
    
    const saturnGeometry = new THREE.SphereGeometry(6,32,32,0,6.3,0,3.3);
	const saturnMaterial = new THREE.MeshBasicMaterial( { map: saturnTexture} );
	saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
	scene.add( saturn );
	
    const saturn_ringGeometry = new THREE.TorusGeometry(11,2,2,200,6.3);
    const saturn_ringMaterial = new THREE.MeshBasicMaterial( { map: saturn_ringTexture, transparent: true} );
	saturn_ring = new THREE.Mesh( saturn_ringGeometry, saturn_ringMaterial );
	scene.add(saturn_ring);

    saturn.position.x = 130;
    saturn_ring.position.x = 130;
    saturn.rotation.x = -0.3;

    saturn_ring.rotation.z = Math.PI / 8;
    saturn_ring.rotation.x = 4.86;
    saturn_ring.rotation.y = 0.45;

    saturn.rotation.z = -0.15;

    sun_lay1.rotation.x += 0.001;
    sun_lay1.rotation.y += 0.001;
    sun_lay2.rotation.x -= 0.0008;
    sun_lay2.rotation.y -= 0.0008;
    sun_lay3.rotation.y += 0.0006;

    sun_lay3.rotation.y = 3;

    // ORBIT CONTROLS
    
    camera.position.z=80;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // controls.target.set(60,60,60);

    window.requestAnimationFrame(animate);
}


function animate(){
    window.requestAnimationFrame(animate);
    mars.rotation.y += 0.00001;
    earth.rotation.y += 0.0001;
    earth_clouds.rotation.y += 0.0001;
    
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